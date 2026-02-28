import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { WeeklyInsightsService } from './insights.service';

@Controller('insights')
export class WeeklyInsightsController {
    constructor(private readonly insightsService: WeeklyInsightsService) { }

    @Get('weekly')
    async getWeeklyInsight(@Req() req: any) {
        const user = req.user;
        if (!user || !user.id) {
            throw new UnauthorizedException('Usuário não autenticado');
        }

        return this.insightsService.getWeeklyInsight(user.id);
    }
}
