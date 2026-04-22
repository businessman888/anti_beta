import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlanningModule } from './modules/planning/planning.module';
import { ScannerModule } from './modules/scanner/scanner.module';
import { InsightsModule } from './modules/insights/insights.module';
import { AwsModule } from './modules/aws/aws.module';
import { ConversationalModule } from './modules/conversational/conversational.module';
import { AiCoreModule } from './modules/ai-core/ai-core.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    PrismaModule,
    AiCoreModule,
    AwsModule,
    PlanningModule,
    ScannerModule,
    InsightsModule,
    ConversationalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

