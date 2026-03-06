import { Injectable, Logger, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService implements OnModuleInit {
    private readonly logger = new Logger(AwsService.name);
    private readonly s3: S3Client;
    private readonly bucket: string;
    private readonly region: string;

    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>('aws.region', 'us-east-1');
        const accessKeyId = this.configService.get<string>('aws.accessKeyId', '');
        const secretAccessKey = this.configService.get<string>('aws.secretAccessKey', '');

        this.bucket = this.configService.get<string>('aws.s3Bucket', 'anti-beta-agent-audio');

        const credentials = { accessKeyId, secretAccessKey };

        this.s3 = new S3Client({ region: this.region, credentials });
    }

    onModuleInit() {
        const accessKeyId = this.configService.get<string>('aws.accessKeyId', '');
        const secretAccessKey = this.configService.get<string>('aws.secretAccessKey', '');

        this.logger.log(`[AWS] Diagnostics on boot:`);
        this.logger.log(`  Region: ${this.region}`);
        this.logger.log(`  Bucket: ${this.bucket}`);
        this.logger.log(`  AccessKeyId loaded: ${!!accessKeyId} (length: ${accessKeyId?.length ?? 0})`);
        this.logger.log(`  SecretAccessKey loaded: ${!!secretAccessKey} (length: ${secretAccessKey?.length ?? 0})`);
        this.logger.log(`  process.env.AWS_ACCESS_KEY_ID exists: ${!!process.env.AWS_ACCESS_KEY_ID}`);
        this.logger.log(`  process.env.AWS_SECRET_ACCESS_KEY exists: ${!!process.env.AWS_SECRET_ACCESS_KEY}`);
        this.logger.log(`  process.env.AWS_S3_BUCKET_NAME exists: ${!!process.env.AWS_S3_BUCKET_NAME}`);

        if (!accessKeyId || !secretAccessKey) {
            this.logger.error(
                `[AWS] FATAL: AWS credentials are missing! AccessKeyId present: ${!!accessKeyId}, SecretAccessKey present: ${!!secretAccessKey}. ` +
                `Check that AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set in Railway env vars and that app.config.ts is loaded via ConfigModule.forRoot({ load: [appConfig] }).`,
            );
            throw new Error(
                'AWS credentials not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.',
            );
        }
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
}
