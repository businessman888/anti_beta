import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PollyClient, SynthesizeSpeechCommand, OutputFormat, Engine, TextType } from '@aws-sdk/client-polly';
import {
    TranscribeClient,
    StartTranscriptionJobCommand,
    GetTranscriptionJobCommand,
    TranscriptionJobStatus,
    DeleteTranscriptionJobCommand,
} from '@aws-sdk/client-transcribe';

@Injectable()
export class AwsService {
    private readonly logger = new Logger(AwsService.name);
    private readonly s3: S3Client;
    private readonly polly: PollyClient;
    private readonly transcribe: TranscribeClient;
    private readonly bucket: string;
    private readonly region: string;

    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>('aws.region', 'us-east-1');
        const credentials = {
            accessKeyId: this.configService.get<string>('aws.accessKeyId', ''),
            secretAccessKey: this.configService.get<string>('aws.secretAccessKey', ''),
        };

        this.bucket = this.configService.get<string>('aws.s3Bucket', 'anti-beta-agent-audio');

        this.logger.log(`[AWS] Region: ${this.region}, Bucket: ${this.bucket}`);

        this.s3 = new S3Client({ region: this.region, credentials });
        this.polly = new PollyClient({ region: this.region, credentials });
        this.transcribe = new TranscribeClient({ region: this.region, credentials });
    }

    /**
     * Upload a file buffer to private S3 bucket.
     * Returns the S3 key.
     */
    async uploadAudio(buffer: Buffer, key: string, contentType: string): Promise<string> {
        try {
            await this.s3.send(
                new PutObjectCommand({
                    Bucket: this.bucket,
                    Key: key,
                    Body: buffer,
                    ContentType: contentType,
                }),
            );
            this.logger.log(`Uploaded audio to S3: ${key} (${(buffer.length / 1024).toFixed(1)}KB)`);
            return key;
        } catch (error: any) {
            this.logger.error(`Falha ao enviar áudio para S3:`, {
                bucket: this.bucket,
                key,
                contentType,
                bufferSize: buffer?.length ?? 0,
                errorName: error?.name,
                errorCode: error?.$metadata?.httpStatusCode,
                errorMessage: error?.message,
            });
            console.error('[AwsService.uploadAudio] Raw AWS Error:', error);
            const awsMsg = error?.message || 'Erro desconhecido';
            throw new InternalServerErrorException(`Falha ao salvar áudio: ${awsMsg}`);
        }
    }

    /**
     * Generate a short-lived presigned URL for a private S3 object.
     */
    async generatePresignedUrl(key: string, expiresInSeconds = 900): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            return await getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds });
        } catch (error) {
            this.logger.error(`Falha ao gerar Presigned URL: ${error}`);
            throw new InternalServerErrorException('Falha ao gerar link de áudio.');
        }
    }

    /**
     * Speech-to-Text using Amazon Transcribe.
     * Flow: Upload audio to S3 → Start TranscriptionJob → Poll → Fetch result → Return transcript.
     */
    async transcribeAudio(audioBuffer: Buffer, mimetype: string, userId: string): Promise<string> {
        const jobId = crypto.randomUUID();
        const extension = this.getExtensionFromMime(mimetype);
        const inputKey = `inputs/${userId}/${jobId}.${extension}`;
        const jobName = `anti-beta-${jobId}`;

        try {
            // 1. Upload input audio to S3
            await this.uploadAudio(audioBuffer, inputKey, mimetype);

            const s3Uri = `s3://${this.bucket}/${inputKey}`;

            // 2. Start Transcription Job
            await this.transcribe.send(
                new StartTranscriptionJobCommand({
                    TranscriptionJobName: jobName,
                    LanguageCode: 'pt-BR',
                    MediaFormat: extension as any,
                    Media: { MediaFileUri: s3Uri },
                    Settings: {
                        ShowSpeakerLabels: false,
                    },
                }),
            );

            this.logger.log(`[${userId}] Transcribe job started: ${jobName}`);

            // 3. Poll for completion (max ~45s with 1.5s intervals)
            const transcript = await this.pollTranscriptionJob(jobName, userId);

            // 4. Cleanup: delete input audio from S3 and the transcription job
            this.cleanupTranscription(inputKey, jobName).catch((e) =>
                this.logger.warn(`Cleanup failed: ${e}`),
            );

            return transcript;
        } catch (error) {
            if (error instanceof InternalServerErrorException) throw error;
            this.logger.error(`Falha no Transcribe STT: ${error}`);
            // Attempt cleanup on error
            this.cleanupTranscription(inputKey, jobName).catch(() => { });
            throw new InternalServerErrorException(
                'Falha ao transcrever áudio. Tente novamente.',
            );
        }
    }

    private async pollTranscriptionJob(jobName: string, userId: string): Promise<string> {
        const maxAttempts = 30; // 30 * 1.5s = 45s max wait
        const intervalMs = 1500;

        for (let i = 0; i < maxAttempts; i++) {
            await this.sleep(intervalMs);

            const { TranscriptionJob: job } = await this.transcribe.send(
                new GetTranscriptionJobCommand({ TranscriptionJobName: jobName }),
            );

            if (!job) continue;

            if (job.TranscriptionJobStatus === TranscriptionJobStatus.COMPLETED) {
                const transcriptUri = job.Transcript?.TranscriptFileUri;
                if (!transcriptUri) {
                    throw new InternalServerErrorException('Transcribe completou mas não retornou URI.');
                }

                // Fetch the transcript JSON from the URI
                const transcript = await this.fetchTranscriptFromUri(transcriptUri);
                this.logger.log(`[${userId}] Transcribe concluído em ${(i + 1) * 1.5}s`);
                return transcript;
            }

            if (job.TranscriptionJobStatus === TranscriptionJobStatus.FAILED) {
                this.logger.error(`Transcribe job failed: ${job.FailureReason}`);
                throw new InternalServerErrorException(
                    'Não consegui entender o áudio. Fale mais claro e tente novamente.',
                );
            }
        }

        throw new InternalServerErrorException(
            'Timeout na transcrição do áudio. Tente um áudio mais curto.',
        );
    }

    private async fetchTranscriptFromUri(uri: string): Promise<string> {
        try {
            const response = await fetch(uri);
            const data = await response.json();
            const transcript: string =
                data?.results?.transcripts?.[0]?.transcript || '';

            if (!transcript.trim()) {
                throw new InternalServerErrorException(
                    'Não consegui entender o áudio. Fale mais claro e tente novamente.',
                );
            }

            return transcript;
        } catch (error) {
            if (error instanceof InternalServerErrorException) throw error;
            this.logger.error(`Falha ao buscar transcript: ${error}`);
            throw new InternalServerErrorException('Falha ao recuperar transcrição.');
        }
    }

    private async cleanupTranscription(inputKey: string, jobName: string): Promise<void> {
        // Delete S3 input file
        await this.s3.send(
            new DeleteObjectCommand({ Bucket: this.bucket, Key: inputKey }),
        ).catch(() => { });

        // Delete Transcribe job
        await this.transcribe.send(
            new DeleteTranscriptionJobCommand({ TranscriptionJobName: jobName }),
        ).catch(() => { });
    }

    /**
     * Synthesize speech using Amazon Polly Neural with voice "Thiago" (pt-BR).
     * Applies SSML for conversational tone with authority.
     */
    async synthesizeSpeech(text: string): Promise<Buffer> {
        const ssml = `<speak><amazon:domain name="conversational"><prosody pitch="-5%" rate="95%">${this.escapeXml(text)}</prosody></amazon:domain></speak>`;

        try {
            const result = await this.polly.send(
                new SynthesizeSpeechCommand({
                    Text: ssml,
                    TextType: TextType.SSML,
                    OutputFormat: OutputFormat.MP3,
                    VoiceId: 'Thiago',
                    Engine: Engine.NEURAL,
                    LanguageCode: 'pt-BR',
                }),
            );

            if (!result.AudioStream) {
                throw new Error('Polly retornou stream vazio');
            }

            // Convert readable stream to Buffer
            const chunks: Uint8Array[] = [];
            const stream = result.AudioStream as AsyncIterable<Uint8Array>;
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            this.logger.error(`Falha no Polly TTS: ${error}`);
            throw new InternalServerErrorException('Falha ao gerar áudio de resposta. Tente novamente.');
        }
    }

    private escapeXml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    private getExtensionFromMime(mime: string): string {
        const map: Record<string, string> = {
            'audio/mp4': 'mp4',
            'audio/m4a': 'mp4',
            'audio/x-m4a': 'mp4',
            'audio/mpeg': 'mp3',
            'audio/wav': 'wav',
            'audio/webm': 'webm',
            'audio/ogg': 'ogg',
            'audio/aac': 'mp4',
            'audio/flac': 'flac',
        };
        return map[mime] || 'mp4';
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

