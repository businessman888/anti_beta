import { Controller, Get, Param } from '@nestjs/common';
import { WeeklyInsightsService } from './insights.service';

@Controller('insights')
export class WeeklyInsightsController {
    constructor(private readonly insightsService: WeeklyInsightsService) { }

    @Get('weekly/:userId')
    async getWeeklyInsight(@Param('userId') userId: string) {
        return this.insightsService.getWeeklyInsight(userId);
    }
}
