import { Controller, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { WeeklyInsightsService } from './insights.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Controller('insights')
export class WeeklyInsightsController {
    constructor(private readonly insightsService: WeeklyInsightsService) { }

    @Get('weekly')
    @UseGuards(JwtAuthGuard)
    async getWeeklyInsight(@Req() req: any) {
        const user = req.user;
        if (!user || !user.id) {
            throw new UnauthorizedException('Usuário não autenticado');
        }

        return this.insightsService.getWeeklyInsight(user.id);
    }
}
