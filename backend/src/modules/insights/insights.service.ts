import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiRouterService } from '../ai-core/ai-router.service';

const WEEKLY_INSIGHT_SYSTEM_PROMPT = `Você é um assistente estrito que sempre retorna apenas um JSON limpo, sem markdown. Recomende apenas livros reais que existem.

Você é o Coach Alpha, um treinador pragmático e direto focado no desenvolvimento masculino.

Regras de Tough Love:
- Se a 'mediaSono' estiver baixa ou 'diasNoFapAtuais' estiverem caindo (houve recaída), seja direto e duro na sugestão.
- Se a disciplina geral (treino e alimentação) for boa, encoraje a avançar ao próximo nível.
- Identifique o pilar MAIS FRACO do usuário e foque a recomendação nele.

Tarefa:
Gere um relatório semanal completo com:
1. "pointsOfImprovement": exatamente 3 pontos curtos de melhoria prática
2. "nextObjectiveTitle": nome do próximo objetivo (ex: "Nível Monge", "Disciplina Espartana")
3. "nextObjectivePercent": porcentagem de 10 a 100 para o próximo objetivo
4. "focusTitle": título curto e impactante do foco semanal (ex: "Protocolo de emergência", "Modo disciplina total")
5. "focusDescription": descrição de 1-2 frases do que o usuário deve focar esta semana, baseado no pilar mais fraco
6. "tacticalRecommendation": uma dica tática prática e específica de 1-2 frases que o usuário pode aplicar imediatamente
7. "bookTitle": título de um livro real relacionado ao ponto fraco do usuário (deve ser um livro que existe de verdade)
8. "bookAuthor": autor real do livro
9. "bookReason": uma frase curta explicando por que esse livro é relevante para o momento atual do usuário (comece com "Por quê:")

Responda APENAS com um objeto JSON válido (sem markdown, sem crases, sem texto solto) com essa exata estrutura:
{
  "pointsOfImprovement": ["Ponto 1...", "Ponto 2...", "Ponto 3..."],
  "nextObjectiveTitle": "Ex: Nível Monge",
  "nextObjectivePercent": 70,
  "focusTitle": "Título do foco",
  "focusDescription": "Descrição do foco semanal",
  "tacticalRecommendation": "Dica tática específica",
  "bookTitle": "Nome do Livro",
  "bookAuthor": "Nome do Autor",
  "bookReason": "Por quê: explicação curta"
}`;

const EMPTY_INSIGHT = {
    id: 'waiting_insight',
    status: 'INSUFFICIENT_DATA',
    pointsOfImprovement: [],
    nextObjectiveTitle: 'Aguardando consistência...',
    nextObjectivePercent: 0,
    compliancePercent: 0,
    treinoPercent: 0,
    hidratacaoPercent: 0,
    nofapStreakDays: 0,
    focusTitle: '',
    focusDescription: '',
    tacticalRecommendation: '',
    bookTitle: '',
    bookAuthor: '',
    bookReason: '',
};

@Injectable()
export class WeeklyInsightsService {
    private readonly logger = new Logger(WeeklyInsightsService.name);

    constructor(
        private prisma: PrismaService,
        private readonly aiRouter: AiRouterService,
    ) {}

    async getWeeklyInsight(userId: string) {
        try {
            return await this._generateWeeklyInsight(userId);
        } catch (error) {
            this.logger.error(`Unhandled error in getWeeklyInsight for user ${userId}: ${error?.message || error}`);
            return { ...EMPTY_INSIGHT };
        }
    }

    private async _generateWeeklyInsight(userId: string) {
        const now = new Date();
        const day = now.getDay();

        // Identifica segunda-feira atual (ou mais recente)
        const startOfWeek = new Date(now);
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);
        startOfWeek.setHours(0, 0, 0, 0);

        // 1. Verifica se já existe um relatório nesta semana
        let existingInsight: any = null;
        try {
            existingInsight = await this.prisma.weeklyInsight.findUnique({
                where: {
                    userId_weekStartDate: {
                        userId,
                        weekStartDate: startOfWeek,
                    },
                },
            });
        } catch (dbError) {
            this.logger.warn(`DB error fetching existing insight (possibly missing columns): ${dbError?.message}`);
            // Table or columns might not exist yet — fall through to stats-based response
        }

        if (existingInsight) {
            return existingInsight;
        }

        // 2. Coletando as atividades da semana atual
        const stats = await this.prisma.dailyStats.findMany({
            where: {
                userId,
                date: { gte: startOfWeek },
            },
            orderBy: { date: 'asc' },
        });

        // 3. Regra de 4 Dias
        const distinctDays = new Set(stats.map(s => s.date.toISOString().split('T')[0]));

        if (distinctDays.size < 4) {
            return { ...EMPTY_INSIGHT };
        }

        // Se NÃO for domingo e não tem relatório anterior, não gera um novo.
        if (day !== 0) {
            return {
                ...EMPTY_INSIGHT,
                status: 'waiting',
                pointsOfImprovement: ['Aguarde o progresso da semana para receber seus pontos de melhoria.'],
                nextObjectiveTitle: 'Coletando dados Alpha...',
            };
        }

        let completionsCount = 0;
        try {
            const completions = await this.prisma.dailyCompletion.findMany({
                where: {
                    userId,
                    completedAt: { gte: startOfWeek },
                },
            });
            completionsCount = completions.length;
        } catch (e) {
            this.logger.warn(`Error fetching completions: ${e?.message}`);
        }

        // 4. Calcular métricas de progresso
        const mediaTreino = Math.round(stats.reduce((acc, curr) => acc + curr.treinoProgress, 0) / stats.length);
        const mediaHidratacao = Math.round(stats.reduce((acc, curr) => acc + curr.hidratacaoProgress, 0) / stats.length);
        const nofapStreakDays = stats[stats.length - 1]?.nofapStreak || 0;

        const allPillars = stats.map(s => {
            const total = s.nofapProgress + s.treinoProgress + s.alimentacaoProgress +
                s.sonoProgress + s.hidratacaoProgress + s.praticasProgress +
                s.redesProgress + s.viciosProgress;
            return total / 8;
        });
        const compliancePercent = Math.round(allPillars.reduce((a, b) => a + b, 0) / allPillars.length);

        const contextData = {
            diasRegistrados: distinctDays.size,
            complianceGeral: compliancePercent,
            mediaNofap: Math.round(stats.reduce((acc, curr) => acc + curr.nofapProgress, 0) / stats.length),
            mediaTreino,
            mediaAlimentacao: Math.round(stats.reduce((acc, curr) => acc + curr.alimentacaoProgress, 0) / stats.length),
            mediaSono: Math.round(stats.reduce((acc, curr) => acc + curr.sonoProgress, 0) / stats.length),
            mediaHidratacao,
            mediaPraticas: Math.round(stats.reduce((acc, curr) => acc + curr.praticasProgress, 0) / stats.length),
            mediaRedes: Math.round(stats.reduce((acc, curr) => acc + curr.redesProgress, 0) / stats.length),
            mediaVicios: Math.round(stats.reduce((acc, curr) => acc + curr.viciosProgress, 0) / stats.length),
            diasNoFapAtuais: nofapStreakDays,
            tarefasConcluidas: completionsCount,
        };

        // 5. Apenas dados dinâmicos no user prompt — instruções estão no system (cacheado)
        const userPrompt = `Analise os dados da semana de desempenho deste usuário:\n${JSON.stringify(contextData, null, 2)}`;

        let insightResult;
        try {
            const { message: msg } = await this.aiRouter.call({
                featureName: 'weekly_insight',
                userId,
                request: {
                    max_tokens: 1024,
                    temperature: 0.7,
                    system: [
                        {
                            type: 'text',
                            text: WEEKLY_INSIGHT_SYSTEM_PROMPT,
                            cache_control: { type: 'ephemeral' },
                        },
                    ],
                    messages: [{ role: 'user', content: userPrompt }],
                },
            });

            const responseText = msg.content[0] && 'text' in msg.content[0] ? msg.content[0].text : '';
            const cleanedJsonStr = responseText.replace(/```json|```/g, '').trim();
            insightResult = JSON.parse(cleanedJsonStr);
        } catch (e) {
            this.logger.error('Erro no Claude:', e);
            return {
                ...EMPTY_INSIGHT,
                status: 'error',
                compliancePercent,
                treinoPercent: mediaTreino,
                hidratacaoPercent: mediaHidratacao,
                nofapStreakDays,
            };
        }

        // 6. Salvar no banco
        try {
            const createdInsight = await this.prisma.weeklyInsight.create({
                data: {
                    userId,
                    weekStartDate: startOfWeek,
                    pointsOfImprovement: insightResult.pointsOfImprovement,
                    nextObjectiveTitle: insightResult.nextObjectiveTitle,
                    nextObjectivePercent: insightResult.nextObjectivePercent,
                    compliancePercent,
                    treinoPercent: mediaTreino,
                    hidratacaoPercent: mediaHidratacao,
                    nofapStreakDays,
                    focusTitle: insightResult.focusTitle || '',
                    focusDescription: insightResult.focusDescription || '',
                    tacticalRecommendation: insightResult.tacticalRecommendation || '',
                    bookTitle: insightResult.bookTitle || '',
                    bookAuthor: insightResult.bookAuthor || '',
                    bookReason: insightResult.bookReason || '',
                },
            });
            return createdInsight;
        } catch (dbError) {
            this.logger.warn(`Could not save insight to DB (migration pending?): ${dbError?.message}`);
            // Return the AI result even if we can't persist it
            return {
                id: 'generated_insight',
                status: 'generated',
                pointsOfImprovement: insightResult.pointsOfImprovement,
                nextObjectiveTitle: insightResult.nextObjectiveTitle,
                nextObjectivePercent: insightResult.nextObjectivePercent,
                compliancePercent,
                treinoPercent: mediaTreino,
                hidratacaoPercent: mediaHidratacao,
                nofapStreakDays,
                focusTitle: insightResult.focusTitle || '',
                focusDescription: insightResult.focusDescription || '',
                tacticalRecommendation: insightResult.tacticalRecommendation || '',
                bookTitle: insightResult.bookTitle || '',
                bookAuthor: insightResult.bookAuthor || '',
                bookReason: insightResult.bookReason || '',
            };
        }
    }
}
