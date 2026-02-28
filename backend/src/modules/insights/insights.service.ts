import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class WeeklyInsightsService {
    private anthropic: Anthropic;

    constructor(private prisma: PrismaService) {
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }

    async getWeeklyInsight(userId: string) {
        const today = new Date();
        // Identifica segunda-feira atual (ou mais recente)
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        const startOfWeek = new Date(today.setDate(diff));
        startOfWeek.setHours(0, 0, 0, 0);

        // 1. Verifica se já existe um relatório nesta semana
        const existingInsight = await this.prisma.weeklyInsight.findUnique({
            where: {
                userId_weekStartDate: {
                    userId,
                    weekStartDate: startOfWeek,
                },
            },
        });

        if (existingInsight) {
            return existingInsight;
        }

        // 2. Coletando os últimos 7 dias de atividades
        const sevenDaysAgo = new Date(startOfWeek);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const stats = await this.prisma.dailyStats.findMany({
            where: {
                userId,
                date: { gte: sevenDaysAgo },
            },
            orderBy: { date: 'asc' },
        });

        const completions = await this.prisma.dailyCompletion.findMany({
            where: {
                userId,
                completedAt: { gte: sevenDaysAgo },
            },
        });

        // 3. Regra de Consistência (min. 3 dias)
        // Coleta dias distintos na tabela daily_stats
        const distinctDays = new Set(stats.map(s => s.date.toISOString().split('T')[0]));
        if (distinctDays.size < 3) {
            throw new BadRequestException(
                'Dados insuficientes para gerar o relatório semanal. Continue preenchendo o app diariamente (Mínimo de 3 dias necessários).',
            );
        }

        // 4. Preparar contexto pro Claude
        const contextData = {
            diasRegistrados: distinctDays.size,
            mediaNofap: stats.reduce((acc, curr) => acc + curr.nofapProgress, 0) / stats.length,
            mediaTreino: stats.reduce((acc, curr) => acc + curr.treinoProgress, 0) / stats.length,
            mediaAlimentacao: stats.reduce((acc, curr) => acc + curr.alimentacaoProgress, 0) / stats.length,
            mediaSono: stats.reduce((acc, curr) => acc + curr.sonoProgress, 0) / stats.length,
            mediaHidratacao: stats.reduce((acc, curr) => acc + curr.hidratacaoProgress, 0) / stats.length,
            mediaPraticas: stats.reduce((acc, curr) => acc + curr.praticasProgress, 0) / stats.length,
            mediaRedes: stats.reduce((acc, curr) => acc + curr.redesProgress, 0) / stats.length,
            mediaVicios: stats.reduce((acc, curr) => acc + curr.viciosProgress, 0) / stats.length,
            diasNoFapAtuais: stats[stats.length - 1]?.nofapStreak || 0,
            tarefasConcluidas: completions.length,
        };

        // 5. Prompt para Claude
        const prompt = `Você é o Coach Alpha, um treinador pragmático e direto focado no desenvolvimento masculino. 
Analise os dados da semana de desempenho deste usuário:
${JSON.stringify(contextData, null, 2)}

Regras de Tough Love:
- Se a 'mediaSono' estiver baixa ou 'diasNoFapAtuais' estiverem caindo (houve recaída), seja direto e duro na sugestão.
- Se a disciplina geral (treino e alimentação) for boa, encoraje a avançar ao próximo nível.

Tarefa:
Gere exatamente 3 pontos curtos de melhoria prática ("pointsOfImprovement") e defina o "nextObjectiveTitle" e uma porcentagem ("nextObjectivePercent" entre 10 a 100) para basear o próximo objetivo.

Responda APENAS com um objeto JSON válido (sem markdown, sem crases, sem texto solto) com a seguinte exata estrutura:
{
  "pointsOfImprovement": ["Ponto 1...", "Ponto 2...", "Ponto 3..."],
  "nextObjectiveTitle": "Ex: Nível Monge",
  "nextObjectivePercent": 70
}`;

        let insightResult;
        try {
            const msg = await this.anthropic.messages.create({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1024,
                temperature: 0.7,
                system: "Você é um assistente estrito que sempre retorna apenas um JSON limpo, sem markdown.",
                messages: [{ role: 'user', content: prompt }],
            });

            const responseText = 'text' in msg.content[0] ? msg.content[0].text : '';

            // Sanitizar caso a IA coloque blocos ```json
            const cleanedJsonStr = responseText.replace(/```json|```/g, '').trim();
            insightResult = JSON.parse(cleanedJsonStr);
        } catch (e) {
            console.error('Erro no Claude:', e);
            throw new BadRequestException('Não foi possível gerar as dicas Alpha neste momento.');
        }

        // 6. Salvar no banco
        const createdInsight = await this.prisma.weeklyInsight.create({
            data: {
                userId,
                weekStartDate: startOfWeek,
                pointsOfImprovement: insightResult.pointsOfImprovement,
                nextObjectiveTitle: insightResult.nextObjectiveTitle,
                nextObjectivePercent: insightResult.nextObjectivePercent,
            },
        });

        return createdInsight;
    }
}
