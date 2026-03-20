import { Controller, Post, Get, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { GeneratePlanDto, PlanResponseDto } from './dto/generate-plan.dto';

@ApiTags('planning')
@Controller('planning')
export class PlanningController {
    private readonly logger = new Logger(PlanningController.name);

    constructor(private readonly planningService: PlanningService) { }

    @Post('generate-plan')
    @ApiOperation({ summary: 'Iniciar geração assíncrona do plano trimestral personalizado' })
    @ApiCreatedResponse({
        description: 'Geração iniciada com sucesso',
    })
    @ApiBadRequestResponse({ description: 'Dados de quiz inválidos' })
    async generatePlan(@Body() dto: GeneratePlanDto) {
        this.logger.log('Received plan generation request');
        return this.planningService.generatePlan(dto);
    }

    @Get('status/:userId')
    @ApiOperation({ summary: 'Verificar se o usuário já possui um plano' })
    async getPlanStatus(@Param('userId') userId: string) {
        return this.planningService.getPlanStatus(userId);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Recuperar o plano de um usuário específico' })
    async getPlanByUser(@Param('userId') userId: string) {
        return this.planningService.getPlanByUserId(userId);
    }

    @Post('complete')
    @ApiOperation({ summary: 'Marcar uma tarefa/refeição como concluída' })
    async completeTask(@Body() body: { userId: string; taskId: string }) {
        return this.planningService.completeTask(body.userId, body.taskId);
    }

    @Get('completions/:userId')
    @ApiOperation({ summary: 'Recuperar conclusões diárias' })
    async getCompletions(@Param('userId') userId: string) {
        return this.planningService.getDailyCompletions(userId);
    }
}
