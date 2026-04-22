import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { calculateCostUsd, ModelName } from './pricing';

export interface AiUsageLogInput {
  userId?: string | null;
  featureName: string;
  modelName: ModelName | string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens?: number;
  cacheReadTokens?: number;
  latencyMs: number;
  status?: 'success' | 'error';
  errorMessage?: string | null;
  fallbackUsed?: boolean;
}

@Injectable()
export class AiUsageLoggerService {
  private readonly logger = new Logger(AiUsageLoggerService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Persists usage to ai_usage_logs. Never throws — logging failures must never
   * break the user-facing AI call.
   */
  async log(input: AiUsageLogInput): Promise<void> {
    const cacheCreationTokens = input.cacheCreationTokens ?? 0;
    const cacheReadTokens = input.cacheReadTokens ?? 0;
    const cost = calculateCostUsd(input.modelName as ModelName, {
      inputTokens: input.inputTokens,
      outputTokens: input.outputTokens,
      cacheCreationTokens,
      cacheReadTokens,
    });

    try {
      await this.prisma.aiUsageLog.create({
        data: {
          userId: input.userId ?? null,
          featureName: input.featureName,
          modelName: input.modelName,
          inputTokens: input.inputTokens,
          outputTokens: input.outputTokens,
          cacheCreationTokens,
          cacheReadTokens,
          estimatedCostUsd: cost,
          latencyMs: input.latencyMs,
          status: input.status ?? 'success',
          errorMessage: input.errorMessage ?? null,
          fallbackUsed: input.fallbackUsed ?? false,
        },
      });
    } catch (err: any) {
      this.logger.warn(
        `Failed to persist ai_usage_log (feature=${input.featureName}): ${err?.message}`,
      );
    }
  }
}
