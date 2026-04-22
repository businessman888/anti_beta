import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { AiRouterService } from '../ai-core/ai-router.service';

const TOUGH_LOVE_SYSTEM_PROMPT = `Você é o Coach Alpha — um mentor masculino direto, focado e exigente, no estilo "tough love".
Seu papel é ser um líder rigoroso para homens focados em autoaperfeiçoamento físico, mental e hormonal.

REGRAS ABSOLUTAS:
- Suas respostas devem ter NO MÁXIMO 2 a 3 frases. Seja cirúrgico.
- Não use linguagem gentil, motivacional vazia ou de auto-ajuda barata.
- Não diga "eu entendo", "tudo bem", "não se preocupe". Isso é coisa de beta.
- Vá direto ao ponto. Se o cara tá reclamando, confronte. Se tá mandando bem, reconheça rápido e peça mais.
- Use dados concretos do contexto do usuário quando disponíveis (testosterona, activity points, compliance, ranking).
- Fale como um irmão mais velho durão, não como um terapeuta.
- Responda sempre em português brasileiro, informal mas autoritário.`;

/**
 * UserContext contém os dados do Supabase injetados no prompt.
 */
export interface AgentUserContext {
    userName: string | null;
    testoLevel: number;
    activityPoints: number;
    weeklyCompliance: number;
    totalWeekDays: number;
    nofapStreak: number;
    ranking: string;
}

@Injectable()
export class AnthropicService {
    private readonly logger = new Logger(AnthropicService.name);

    constructor(private readonly aiRouter: AiRouterService) {}

    /**
     * Generates a "tough love" mentor response using Claude Haiku via the
     * router (with usage logging + cross-tier fallback to Sonnet on failure).
     */
    async generateMentorResponse(
        userMessage: string,
        context: AgentUserContext,
        userId?: string,
    ): Promise<string> {
        const contextBlock = this.buildContextBlock(context);

        try {
            const { message: response, modelUsed, fallbackUsed } = await this.aiRouter.call({
                featureName: 'chat_agent',
                userId: userId ?? null,
                request: {
                    max_tokens: 256,
                    temperature: 0.8,
                    system: [
                        {
                            type: 'text',
                            text: TOUGH_LOVE_SYSTEM_PROMPT,
                            cache_control: { type: 'ephemeral' },
                        },
                        {
                            type: 'text',
                            text: contextBlock,
                            cache_control: { type: 'ephemeral' },
                        },
                    ],
                    messages: [{ role: 'user', content: userMessage }],
                },
            });

            const text =
                response.content[0] && 'text' in response.content[0]
                    ? response.content[0].text
                    : '';

            if (!text) {
                throw new Error('Claude retornou resposta vazia');
            }

            if (fallbackUsed) {
                this.logger.warn(`chat_agent served by fallback model ${modelUsed}`);
            }

            return text.trim();
        } catch (error) {
            this.logger.error(`Falha no Claude: ${error}`);
            throw new InternalServerErrorException(
                'O mentor está indisponível no momento. Tente novamente.',
            );
        }
    }

    private buildContextBlock(ctx: AgentUserContext): string {
        const compliancePercent = ctx.totalWeekDays > 0
            ? Math.round((ctx.weeklyCompliance / ctx.totalWeekDays) * 100)
            : 0;

        return `CONTEXTO DO USUÁRIO (dados reais do Supabase):
- Nome: ${ctx.userName || 'Soldado'}
- Nível de Testosterona (testo_level): ${ctx.testoLevel.toFixed(1)}
- Pontos de Atividade (activityPoints): ${ctx.activityPoints}
- Ranking Atual: ${ctx.ranking}
- Compliance Semanal: ${ctx.weeklyCompliance}/${ctx.totalWeekDays} dias (${compliancePercent}%)
- Streak NoFap: ${ctx.nofapStreak} dias`;
    }
}
