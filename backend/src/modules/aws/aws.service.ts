import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PollyClient, SynthesizeSpeechCommand, OutputFormat, Engine, TextType } from '@aws-sdk/client-polly';

@Injectable()
export class AwsService {
    private readonly logger = new Logger(AwsService.name);
    private readonly s3: S3Client;
    private readonly polly: PollyClient;
    private readonly bucket: string;

    constructor(private configService: ConfigService) {
        const region = this.configService.get<string>('aws.region', 'us-east-1');
        const credentials = {
            accessKeyId: this.configService.get<string>('aws.accessKeyId', ''),
            secretAccessKey: this.configService.get<string>('aws.secretAccessKey', ''),
        };

        this.bucket = this.configService.get<string>('aws.s3Bucket', 'anti-beta-agent-audio');

        this.s3 = new S3Client({ region, credentials });
        this.polly = new PollyClient({ region, credentials });
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
            this.logger.log(`Uploaded audio to S3: ${key}`);
            return key;
        } catch (error) {
            this.logger.error(`Falha ao enviar áudio para S3: ${error}`);
            throw new InternalServerErrorException('Falha ao salvar áudio. Tente novamente.');
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
}
