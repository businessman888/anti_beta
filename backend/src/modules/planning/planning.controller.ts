import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { GeneratePlanDto, PlanResponseDto } from './dto/generate-plan.dto';

@ApiTags('planning')
@Controller('planning')
export class PlanningController {
    private readonly logger = new Logger(PlanningController.name);

    constructor(private readonly planningService: PlanningService) { }

    @Post('generate-plan')
    @ApiOperation({ summary: 'Gerar plano trimestral personalizado baseado nas respostas do quiz' })
    @ApiCreatedResponse({
        description: 'Plano gerado com sucesso',
        type: PlanResponseDto,
    })
    @ApiBadRequestResponse({ description: 'Dados de quiz inválidos' })
    async generatePlan(@Body() dto: GeneratePlanDto): Promise<PlanResponseDto> {
        this.logger.log('Received plan generation request');
        return this.planningService.generatePlan(dto);
    }
}
