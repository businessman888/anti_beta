import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AnthropicClientService } from './anthropic-client.service';
import { AiUsageLoggerService } from './ai-usage-logger.service';
import { AiRouterService } from './ai-router.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AnthropicClientService, AiUsageLoggerService, AiRouterService],
  exports: [AnthropicClientService, AiUsageLoggerService, AiRouterService],
})
export class AiCoreModule {}
