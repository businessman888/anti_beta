import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ScannerService } from './scanner.service';
import { AnalyzeImageDto } from './dto/analyze-image.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('scanner')
@Controller('scanner')
export class ScannerController {
    constructor(private readonly scannerService: ScannerService) { }

    @Post('analyze')
    @ApiOperation({ summary: 'Analyze a conversation print using AI' })
    async analyze(@Body() dto: AnalyzeImageDto) {
        return this.scannerService.analyzeImage(dto);
    }
}
