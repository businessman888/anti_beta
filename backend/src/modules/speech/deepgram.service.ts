import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, DeepgramClient } from '@deepgram/sdk';

@Injectable()
export class DeepgramService {
    private readonly logger = new Logger(DeepgramService.name);
    private readonly deepgram: DeepgramClient;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('deepgram.apiKey', '');
        this.deepgram = createClient(apiKey);
    }

    /**
     * Transcribe an audio buffer using Deepgram Nova-2.
     * Returns the transcribed text.
     */
    async transcribeAudio(buffer: Buffer, mimetype: string): Promise<string> {
        try {
            const { result } = await this.deepgram.listen.prerecorded.transcribeFile(buffer, {
                model: 'nova-2',
                language: 'pt-BR',
                smart_format: true,
                punctuate: true,
                mimetype,
            });

            const transcript =
                result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

            if (!transcript) {
                this.logger.warn('Deepgram retornou transcrição vazia');
                throw new InternalServerErrorException(
                    'Não consegui entender o áudio. Fale mais claro e tente novamente.',
                );
            }

            this.logger.log(`Deepgram STT concluído: "${transcript.substring(0, 60)}..."`);
            return transcript;
        } catch (error) {
            if (error instanceof InternalServerErrorException) throw error;
            this.logger.error(`Falha no Deepgram STT: ${error}`);
            throw new InternalServerErrorException(
                'Falha ao transcrever áudio. Tente novamente.',
            );
        }
    }
}
