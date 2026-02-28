import { Module } from '@nestjs/common';
import { WeeklyInsightsService } from './insights.service';
import { WeeklyInsightsController } from './insights.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WeeklyInsightsController],
  providers: [WeeklyInsightsService],
  exports: [WeeklyInsightsService],
})
export class InsightsModule { }
