import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Req,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiBadRequestResponse,
    ApiServiceUnavailableResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ConversationalService } from './conversational.service';
import { VoiceInteractionResponseDto } from './dto/voice-interaction-response.dto';

@ApiTags('conversational')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('conversational')
export class ConversationalController {
    private readonly logger = new Logger(ConversationalController.name);

    constructor(private readonly conversationalService: ConversationalService) { }

    @Post('voice-interaction')
    @ApiOperation({
        summary: 'Interação de voz completa com o Agente Alpha',
        description:
            'Recebe áudio do usuário, transcreve (Deepgram), processa com Claude (Tough Love), gera áudio de resposta (Polly Neural) e retorna tudo.',
    })
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({
        description: 'Interação processada com sucesso',
        type: VoiceInteractionResponseDto,
    })
    @ApiBadRequestResponse({ description: 'Arquivo de áudio não fornecido ou inválido' })
    @ApiServiceUnavailableResponse({ description: 'Serviço AWS ou LLM temporariamente indisponível' })
    @UseInterceptors(
        FileInterceptor('audio', {
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB max
            },
            fileFilter: (_req, file, callback) => {
                const allowedMimes = [
                    'audio/mp4',
                    'audio/m4a',
                    'audio/x-m4a',
                    'audio/mpeg',
                    'audio/wav',
                    'audio/webm',
                    'audio/ogg',
                    'audio/aac',
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(
                        new BadRequestException(
                            `Formato de áudio não suportado: ${file.mimetype}. Use mp4, m4a, mp3, wav, webm, ogg ou aac.`,
                        ),
                        false,
                    );
                }
            },
        }),
    )
    async handleVoiceInteraction(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any,
    ): Promise<VoiceInteractionResponseDto> {
        if (!file) {
            throw new BadRequestException('Arquivo de áudio é obrigatório. Envie no campo "audio".');
        }

        if (!file.buffer || file.buffer.length === 0) {
            this.logger.error(`[UPLOAD] Buffer vazio ou corrompido: originalname=${file.originalname}, size=${file.size}, mimetype=${file.mimetype}`);
            throw new BadRequestException('Arquivo de áudio chegou vazio ou corrompido. Tente gravar novamente.');
        }

        const userId: string = req.user?.id;
        if (!userId) {
            throw new BadRequestException('Usuário não identificado.');
        }

        this.logger.log(
            `[${userId}] Voice interaction recebida: ${file.originalname} (${(file.size / 1024).toFixed(1)}KB, ${file.mimetype}, buffer=${file.buffer.length} bytes)`,
        );

        return this.conversationalService.processVoiceInteraction(
            userId,
            file.buffer,
            file.mimetype,
        );
    }
}
