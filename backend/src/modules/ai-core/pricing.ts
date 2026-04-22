/**
 * Anthropic Pricing — USD per 1,000,000 tokens (2026 rates).
 *
 * Output prices confirmed by user (2026-04-22):
 *   - Sonnet 4.6: $15 / MTok output
 *   - Haiku 4.5:  $5  / MTok output
 *
 * Input / cache prices derived from Anthropic's standard ratio pattern
 * (input ≈ output / 5; cache_read = 10% of input; cache_write = 125% of input).
 * Adjust here if your 2026 rate sheet differs.
 */

export type ModelName = 'claude-sonnet-4-6' | 'claude-haiku-4-5-20251001';

export interface ModelPricing {
  inputPerMTok: number;
  outputPerMTok: number;
  cacheReadPerMTok: number;
  cacheWritePerMTok: number;
}

export const MODEL_PRICING: Record<ModelName, ModelPricing> = {
  'claude-sonnet-4-6': {
    inputPerMTok: 3.0,
    outputPerMTok: 15.0,
    cacheReadPerMTok: 0.3,
    cacheWritePerMTok: 3.75,
  },
  'claude-haiku-4-5-20251001': {
    inputPerMTok: 1.0,
    outputPerMTok: 5.0,
    cacheReadPerMTok: 0.1,
    cacheWritePerMTok: 1.25,
  },
};

export interface UsageBreakdown {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
}

export function calculateCostUsd(model: ModelName, usage: UsageBreakdown): number {
  const p = MODEL_PRICING[model];
  if (!p) return 0;
  const cost =
    (usage.inputTokens * p.inputPerMTok +
      usage.outputTokens * p.outputPerMTok +
      usage.cacheCreationTokens * p.cacheWritePerMTok +
      usage.cacheReadTokens * p.cacheReadPerMTok) /
    1_000_000;
  return cost;
}
