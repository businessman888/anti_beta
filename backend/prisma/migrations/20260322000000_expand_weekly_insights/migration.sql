-- AlterTable
ALTER TABLE "weekly_insights" ADD COLUMN "compliance_percent" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "weekly_insights" ADD COLUMN "treino_percent" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "weekly_insights" ADD COLUMN "hidratacao_percent" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "weekly_insights" ADD COLUMN "nofap_streak_days" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "weekly_insights" ADD COLUMN "focus_title" TEXT NOT NULL DEFAULT '';
ALTER TABLE "weekly_insights" ADD COLUMN "focus_description" TEXT NOT NULL DEFAULT '';
ALTER TABLE "weekly_insights" ADD COLUMN "tactical_recommendation" TEXT NOT NULL DEFAULT '';
ALTER TABLE "weekly_insights" ADD COLUMN "book_title" TEXT NOT NULL DEFAULT '';
ALTER TABLE "weekly_insights" ADD COLUMN "book_author" TEXT NOT NULL DEFAULT '';
ALTER TABLE "weekly_insights" ADD COLUMN "book_reason" TEXT NOT NULL DEFAULT '';
