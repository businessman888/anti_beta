import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AwsService } from '../aws/aws.service';
import { DeepgramService } from '../speech/deepgram.service';
import { AnthropicService, AgentUserContext } from './anthropic.service';
import { VoiceInteractionResponseDto } from './dto/voice-interaction-response.dto';

@Injectable()
export class ConversationalService {
    private readonly logger = new Logger(ConversationalService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aws: AwsService,
        private readonly deepgram: DeepgramService,
        private readonly anthropic: AnthropicService,
    ) { }

    /**
     * Full voice interaction pipeline:
     * 1. STT (Deepgram Nova-2)
     * 2. Fetch user context from Supabase (Prisma)
     * 3. LLM (Claude 3.5 Haiku with Prompt Caching)
     * 4. TTS (Polly Neural, voice Thiago, SSML)
     * 5. Upload to S3 + Presigned URL
     */
    async processVoiceInteraction(
        userId: string,
        audioBuffer: Buffer,
        mimetype: string,
    ): Promise<VoiceInteractionResponseDto> {
        // ========== 1. STT: Deepgram Nova-2 (~200ms) ==========
        this.logger.log(`[${userId}] Iniciando STT...`);
        const transcribedText = await this.deepgram.transcribeAudio(audioBuffer, mimetype);
        this.logger.log(`[${userId}] STT concluído: "${transcribedText.substring(0, 50)}..."`);

        // ========== 2. Buscar contexto do usuário no Supabase ==========
        const userContext = await this.fetchUserContext(userId);

        // ========== 3. LLM: Claude 3.5 Haiku (Prompt Caching) ==========
        this.logger.log(`[${userId}] Enviando para Claude...`);
        const agentResponse = await this.anthropic.generateMentorResponse(
            transcribedText,
            userContext,
        );
        this.logger.log(`[${userId}] Claude respondeu: "${agentResponse.substring(0, 50)}..."`);

        // ========== 4. TTS: Polly Neural (Thiago + SSML) ==========
        this.logger.log(`[${userId}] Gerando TTS...`);
        const audioResponseBuffer = await this.aws.synthesizeSpeech(agentResponse);

        // ========== 5. Upload do áudio de resposta ao S3 ==========
        const audioId = crypto.randomUUID();
        const s3Key = `outputs/${userId}/${audioId}.mp3`;
        await this.aws.uploadAudio(audioResponseBuffer, s3Key, 'audio/mpeg');

        // ========== 6. Gerar Presigned URL ==========
        const presignedUrl = await this.aws.generatePresignedUrl(s3Key);

        return {
            transcribedUserText: transcribedText,
            agentResponseText: agentResponse,
            agentAudioUrl: presignedUrl,
        };
    }

    /**
     * Fetches unified user context from Supabase/Prisma
     * for Claude's prompt caching.
     */
    private async fetchUserContext(userId: string): Promise<AgentUserContext> {
        try {
            // Fetch user profile (testoLevel, name)
            const profile = await this.prisma.userProfile.findUnique({
                where: { userId },
                select: {
                    testoLevel: true,
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
            const ranking = this.calculateRanking(testoLevel);

            return {
                userName: profile?.user?.name ?? null,
                testoLevel,
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
