import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AnthropicService, AgentUserContext } from './anthropic.service';

export interface ChatInteractionResponse {
    transcribedUserText: string;
    agentResponseText: string;
}

@Injectable()
export class ConversationalService {
    private readonly logger = new Logger(ConversationalService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly anthropic: AnthropicService,
    ) { }

    /**
     * Process text-based chat interactions:
     * 1. Fetch user context from Supabase (Prisma)
     * 2. LLM (Claude Haiku 4.5 with Prompt Caching via Anthropic)
     */
    async processChatInteraction(
        userId: string,
        userText: string,
    ): Promise<ChatInteractionResponse> {
        this.logger.log(`[${userId}] Processando chat: "${userText}"`);

        // ========== 1. Buscar contexto do usuário no Supabase ==========
        const userContext = await this.fetchUserContext(userId);

        // ========== 2. LLM: Claude Haiku 4.5 (Prompt Caching) ==========
        this.logger.log(`[${userId}] Enviando para Claude...`);
        const agentResponse = await this.anthropic.generateMentorResponse(
            userText,
            userContext,
        );
        this.logger.log(`[${userId}] Claude respondeu: "${agentResponse.substring(0, 50)}..."`);

        return {
            transcribedUserText: userText,
            agentResponseText: agentResponse,
        };
    }

    /**
     * Fetches unified user context from Supabase/Prisma
     * for Claude's prompt caching.
     */
    private async fetchUserContext(userId: string): Promise<AgentUserContext> {
        try {
            // Fetch user profile (testoLevel, name, activityPoints)
            const profile = await this.prisma.userProfile.findUnique({
                where: { userId },
                select: {
                    testoLevel: true,
                    activityPoints: true,
                    user: { select: { name: true } },
                },
            });

            // Fetch weekly compliance (daily_stats for current week)
            const today = new Date();
            const dayOfWeek = today.getDay();
            const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            const startOfWeek = new Date(today);
            startOfWeek.setDate(diff);
            startOfWeek.setHours(0, 0, 0, 0);

            const weekStats = await this.prisma.dailyStats.findMany({
                where: {
                    userId,
                    date: { gte: startOfWeek },
                },
                orderBy: { date: 'desc' },
            });

            const distinctDays = new Set(
                weekStats.map((s) => s.date.toISOString().split('T')[0]),
            );

            // Days elapsed this week (Monday=1 ... Sunday=7)
            const totalWeekDays = dayOfWeek === 0 ? 7 : dayOfWeek;

            // Latest nofap streak
            const latestNofapStreak = weekStats.length > 0 ? weekStats[0].nofapStreak : 0;

            // Determine ranking based on testoLevel
            const testoLevel = profile?.testoLevel ?? 0;
            const activityPoints = profile?.activityPoints ?? 0;
            const ranking = this.calculateRanking(testoLevel);

            return {
                userName: profile?.user?.name ?? null,
                testoLevel,
                activityPoints,
                weeklyCompliance: distinctDays.size,
                totalWeekDays,
                nofapStreak: latestNofapStreak,
                ranking,
            };
        } catch (error) {
            this.logger.warn(`Falha ao buscar contexto do usuário: ${error}`);
            // Return default context so the agent can still respond
            return {
                userName: null,
                testoLevel: 0,
                activityPoints: 0,
                weeklyCompliance: 0,
                totalWeekDays: 7,
                nofapStreak: 0,
                ranking: 'Beta',
            };
        }
    }

    private calculateRanking(testoLevel: number): string {
        if (testoLevel >= 800) return 'Alpha Elite';
        if (testoLevel >= 600) return 'Alpha';
        if (testoLevel >= 400) return 'Sigma';
        if (testoLevel >= 200) return 'Ascendente';
        return 'Beta';
    }
}

