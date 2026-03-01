import { ApiProperty } from '@nestjs/swagger';

export class VoiceInteractionResponseDto {
    @ApiProperty({ description: 'Texto transcrito da fala do usuário (STT)' })
    transcribedUserText: string;

    @ApiProperty({ description: 'Resposta textual do mentor Alpha' })
    agentResponseText: string;

    @ApiProperty({ description: 'URL assinada (Presigned) do áudio de resposta do mentor' })
    agentAudioUrl: string;
}
