import { Injectable, Logger } from '@nestjs/common';
import type Anthropic from '@anthropic-ai/sdk';
import { AnthropicClientService } from './anthropic-client.service';
import { AiUsageLoggerService } from './ai-usage-logger.service';
import { ModelName } from './pricing';

export type Tier = 'high_performance' | 'efficiency';

export const TIER_MODEL: Record<Tier, ModelName> = {
  high_performance: 'claude-sonnet-4-6',
  efficiency: 'claude-haiku-4-5-20251001',
};

/**
 * Map of feature → tier. Plan generation needs long-horizon reasoning (Sonnet);
 * everything else runs on Haiku for cost efficiency.
 */
export const FEATURE_TIER: Record<string, Tier> = {
  plan_generation: 'high_performance',
  weekly_insight: 'efficiency',
  chat_agent: 'efficiency',
  scanner_analysis: 'efficiency',
  daily_quiz: 'efficiency',
  weekly_alpha_tip: 'efficiency',
};

export interface RouterCallOptions {
  featureName: string;
  userId?: string | null;
  /** Override the tier-mapped model (rare; used for forced tests). */
  modelOverride?: ModelName;
  /**
   * If true and the efficiency model fails, retry once on the high-performance
   * model. Sonnet→Haiku fallback is intentionally NOT supported (would degrade
   * plan quality).
   */
  enableCrossTierFallback?: boolean;
  /** Anthropic params except `model` (router picks the model). */
  request: Omit<Anthropic.MessageCreateParamsNonStreaming, 'model'>;
}

export interface RouterCallResult {
  message: Anthropic.Message;
  modelUsed: ModelName;
  fallbackUsed: boolean;
  latencyMs: number;
}

@Injectable()
export class AiRouterService {
  private readonly logger = new Logger(AiRouterService.name);

  constructor(
    private readonly clientService: AnthropicClientService,
    private readonly usageLogger: AiUsageLoggerService,
  ) {}

  async call(opts: RouterCallOptions): Promise<RouterCallResult> {
    const tier = FEATURE_TIER[opts.featureName] ?? 'efficiency';
    const primaryModel: ModelName = opts.modelOverride ?? TIER_MODEL[tier];

    const fallbackEligible =
      (opts.enableCrossTierFallback ?? tier === 'efficiency') &&
      tier === 'efficiency';

    try {
      return await this.invoke(primaryModel, opts, false);
    } catch (primaryError: any) {
      if (!fallbackEligible) {
        throw primaryError;
      }

      this.logger.warn(
        `[${opts.featureName}] Primary model ${primaryModel} failed (${primaryError?.message}). Falling back to Sonnet.`,
      );
      try {
        return await this.invoke('claude-sonnet-4-6', opts, true);
      } catch (fallbackError: any) {
        this.logger.error(
          `[${opts.featureName}] Fallback Sonnet also failed: ${fallbackError?.message}`,
        );
        throw fallbackError;
      }
    }
  }

  private async invoke(
    model: ModelName,
    opts: RouterCallOptions,
    fallbackUsed: boolean,
  ): Promise<RouterCallResult> {
    const start = Date.now();
    try {
      const message = await this.clientService.client.messages.create({
        ...opts.request,
        model,
      });
      const latencyMs = Date.now() - start;

      const usage: any = message.usage ?? {};
      // fire-and-forget logging
      void this.usageLogger.log({
        userId: opts.userId ?? null,
        featureName: opts.featureName,
        modelName: model,
        inputTokens: usage.input_tokens ?? 0,
        outputTokens: usage.output_tokens ?? 0,
        cacheCreationTokens: usage.cache_creation_input_tokens ?? 0,
        cacheReadTokens: usage.cache_read_input_tokens ?? 0,
        latencyMs,
        status: 'success',
        fallbackUsed,
      });

      return { message, modelUsed: model, fallbackUsed, latencyMs };
    } catch (error: any) {
      const latencyMs = Date.now() - start;
      void this.usageLogger.log({
        userId: opts.userId ?? null,
        featureName: opts.featureName,
        modelName: model,
        inputTokens: 0,
        outputTokens: 0,
        latencyMs,
        status: 'error',
        errorMessage: String(error?.message ?? error).slice(0, 500),
        fallbackUsed,
      });
      throw error;
    }
  }
}
