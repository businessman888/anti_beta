import { ApiProperty } from '@nestjs/swagger';

export class SystemStatusDto {
    @ApiProperty({ example: 'ok', description: 'Status atual da API' })
    status: string;

    @ApiProperty({ example: '2024-02-16T10:00:00Z', description: 'Timestamp da verificação' })
    timestamp: string;

    @ApiProperty({ example: 'API Operacional', description: 'Mensagem de status' })
    message: string;
}
