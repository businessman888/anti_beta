import {
    Controller,
    Post,
    UseGuards,
    Body,
    Req,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ConversationalService, ChatInteractionResponse } from './conversational.service';

export class ChatRequestDto {
    text: string;
}

@ApiTags('conversational')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('conversational')
export class ConversationalController {
    private readonly logger = new Logger(ConversationalController.name);

    constructor(private readonly conversationalService: ConversationalService) { }

    @Post('chat')
    @ApiOperation({
        summary: 'Interação de texto com o Agente Alpha',
        description: 'Recebe texto do usuário, processa com Claude (Tough Love) e retorna a resposta textual diretamente.',
    })
    @ApiCreatedResponse({
        description: 'Interação processada com sucesso',
    })
    @ApiBadRequestResponse({ description: 'Texto não fornecido ou inválido' })
    async handleChatInteraction(
        @Body() body: ChatRequestDto,
        @Req() req: any,
    ): Promise<ChatInteractionResponse> {
        if (!body.text || body.text.trim().length === 0) {
            throw new BadRequestException('O texto da mensagem é obrigatório.');
        }

        const userId: string = req.user?.id;
        if (!userId) {
            throw new BadRequestException('Usuário não identificado.');
        }

        this.logger.log(`[${userId}] Chat interaction recebida: "${body.text.substring(0, 50)}..."`);

        return this.conversationalService.processChatInteraction(
            userId,
            body.text,
        );
    }
}

