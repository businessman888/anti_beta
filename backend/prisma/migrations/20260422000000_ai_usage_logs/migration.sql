-- CreateTable
CREATE TABLE "ai_usage_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "feature_name" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "input_tokens" INTEGER NOT NULL DEFAULT 0,
    "output_tokens" INTEGER NOT NULL DEFAULT 0,
    "cache_creation_tokens" INTEGER NOT NULL DEFAULT 0,
    "cache_read_tokens" INTEGER NOT NULL DEFAULT 0,
    "estimated_cost_usd" DECIMAL(12,8) NOT NULL DEFAULT 0,
    "latency_ms" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'success',
    "error_message" TEXT,
    "fallback_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_usage_logs_user_id_created_at_idx" ON "ai_usage_logs"("user_id", "created_at");
CREATE INDEX "ai_usage_logs_feature_name_created_at_idx" ON "ai_usage_logs"("feature_name", "created_at");
CREATE INDEX "ai_usage_logs_model_name_created_at_idx" ON "ai_usage_logs"("model_name", "created_at");

-- View: usage summary for last 24h, grouped by user + feature
CREATE OR REPLACE VIEW ai_usage_summary_24h AS
SELECT
    user_id,
    feature_name,
    model_name,
    COUNT(*)::int                                AS call_count,
    COUNT(*) FILTER (WHERE status = 'error')::int AS error_count,
    COUNT(*) FILTER (WHERE fallback_used)::int    AS fallback_count,
    SUM(input_tokens)::bigint                     AS total_input_tokens,
    SUM(output_tokens)::bigint                    AS total_output_tokens,
    SUM(cache_creation_tokens)::bigint            AS total_cache_creation_tokens,
    SUM(cache_read_tokens)::bigint                AS total_cache_read_tokens,
    SUM(estimated_cost_usd)::decimal(14,8)        AS total_cost_usd,
    ROUND(AVG(latency_ms))::int                   AS avg_latency_ms,
    MAX(latency_ms)                               AS max_latency_ms,
    MIN(created_at)                               AS first_call_at,
    MAX(created_at)                               AS last_call_at
FROM ai_usage_logs
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY user_id, feature_name, model_name;

-- View: usage summary for last 7 days, grouped by user + feature
CREATE OR REPLACE VIEW ai_usage_summary_7d AS
SELECT
    user_id,
    feature_name,
    model_name,
    COUNT(*)::int                                AS call_count,
    COUNT(*) FILTER (WHERE status = 'error')::int AS error_count,
    COUNT(*) FILTER (WHERE fallback_used)::int    AS fallback_count,
    SUM(input_tokens)::bigint                     AS total_input_tokens,
    SUM(output_tokens)::bigint                    AS total_output_tokens,
    SUM(cache_creation_tokens)::bigint            AS total_cache_creation_tokens,
    SUM(cache_read_tokens)::bigint                AS total_cache_read_tokens,
    SUM(estimated_cost_usd)::decimal(14,8)        AS total_cost_usd,
    ROUND(AVG(latency_ms))::int                   AS avg_latency_ms,
    MAX(latency_ms)                               AS max_latency_ms,
    MIN(created_at)                               AS first_call_at,
    MAX(created_at)                               AS last_call_at
FROM ai_usage_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY user_id, feature_name, model_name;
