import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { PrismaService } from '../../prisma/prisma.service';
import { GeneratePlanDto } from './dto/generate-plan.dto';

@Injectable()
export class PlanningService {
  private readonly logger = new Logger(PlanningService.name);
  private readonly anthropic: Anthropic;

  constructor(private readonly prisma: PrismaService) {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  // In-memory tracking of generation status per user
  private generationStatus = new Map<string, 'generating' | 'done' | 'error'>();
  private generationErrors = new Map<string, string>();

  async generatePlan(dto: GeneratePlanDto) {
    const { answers, userId } = dto;

    if (!userId) {
      throw new Error('userId is required for plan generation');
    }

    this.logger.log(`Starting async plan generation for user: ${userId}`);
    this.logger.log(`Quiz answers received: ${Object.keys(answers).length} fields`);

    // Mark as generating
    this.generationStatus.set(userId, 'generating');
    this.generationErrors.delete(userId);

    // Fire-and-forget: generate in background
    this.generatePlanInBackground(userId, answers).catch((err) => {
      this.logger.error(`Background plan generation failed for ${userId}: ${err?.message}`);
    });

    // Return immediately
    return { status: 'generating', userId };
  }

  private async generatePlanInBackground(userId: string, answers: Record<string, any>) {
    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(answers);

    try {
      this.logger.log('Calling Anthropic API...');

      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 16384,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      this.logger.log(`Anthropic API responded. Stop reason: ${response.stop_reason}`);

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from AI');
      }

      // Extract JSON from response (may be wrapped in markdown code blocks)
      let planJson: any;
      try {
        const jsonMatch = content.text.match(/```json\s*([\s\S]*?)\s*```/);
        const rawJson = jsonMatch ? jsonMatch[1] : content.text;
        planJson = JSON.parse(rawJson);
      } catch (parseError) {
        this.logger.error('Failed to parse AI response as JSON');
        this.logger.error('Raw AI response (first 500 chars):', content.text.substring(0, 500));
        throw new Error('Failed to parse plan from AI response');
      }

      this.logger.log('Plan JSON parsed successfully');

      // Save plan to database
      try {
        this.logger.log(`Saving plan to database for user ${userId}...`);
        const plan = await this.prisma.plan.upsert({
          where: { userId },
          create: {
            userId,
            planData: planJson,
          },
          update: {
            planData: planJson,
          },
        });

        this.logger.log(`Plan saved for user ${userId}, plan id: ${plan.id}`);
        this.generationStatus.set(userId, 'done');
      } catch (dbError: any) {
        this.logger.error(`Failed to save plan to DB: ${dbError?.message}`);
        this.generationStatus.set(userId, 'error');
        this.generationErrors.set(userId, 'Erro ao salvar plano no banco de dados');
      }
    } catch (error: any) {
      this.logger.error(`Plan generation failed: ${error?.message || error}`);
      if (error?.status) {
        this.logger.error(`Anthropic API error status: ${error.status}`);
      }
      this.generationStatus.set(userId, 'error');
      this.generationErrors.set(userId, error?.message || 'Erro ao gerar plano');
    }
  }

  async getPlanStatus(userId: string): Promise<{ hasPlan: boolean; generating: boolean; error?: string }> {
    this.logger.log(`Checking plan status for user: ${userId}`);

    const genStatus = this.generationStatus.get(userId);
    const genError = this.generationErrors.get(userId);

    const plan = await this.prisma.plan.findUnique({
      where: { userId },
      select: { id: true },
    });

    // Clean up status tracking once client has seen the result
    if (genStatus === 'done' || genStatus === 'error') {
      this.generationStatus.delete(userId);
      if (genStatus === 'error') {
        this.generationErrors.delete(userId);
      }
    }

    return {
      hasPlan: !!plan,
      generating: genStatus === 'generating',
      ...(genError ? { error: genError } : {}),
    };
  }

  async getPlanByUserId(userId: string) {
    this.logger.log(`Fetching plan for user: ${userId}`);
    try {
      const plan = await this.prisma.plan.findUnique({
        where: { userId },
      });

      if (!plan) {
        this.logger.log(`No plan found for user: ${userId}`);
        return null;
      }

      return plan;
    } catch (error: any) {
      this.logger.error(`Error fetching plan for user ${userId}: ${error.message}`);
      return null;
    }
  }

  async completeTask(userId: string, taskId: string) {
    this.logger.log(`Marking task ${taskId} as completed for user ${userId}`);
    try {
      return await this.prisma.dailyCompletion.create({
        data: {
          userId,
          taskId,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        this.logger.warn(`Task ${taskId} already completed today for user ${userId}`);
        return { message: 'Already completed today' };
      }
      this.logger.error(`Error completing task ${taskId} for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async getDailyCompletions(userId: string) {
    this.logger.log(`Fetching daily completions for user: ${userId}`);
    const today = new Date();
    // Use the start of the day in local time or UTC depending on requirements
    // For now, let's just use what Prisma/Postgres CURRENT_DATE provides

    return this.prisma.dailyCompletion.findMany({
      where: {
        userId,
        completedAt: {
          equals: today,
        },
      },
    });
  }

  private buildSystemPrompt(): string {
    return `Você é o Agente de Planejamento do Antibeta, especializado em criar planos de transformação masculina personalizados.

CONTEXTO:
O Antibeta é um app de desenvolvimento pessoal masculino focado em transformar homens "beta" em "alpha" através de metas estruturadas em treino, alimentação, mindset, hábitos e habilidades sociais.

SUA TAREFA:
Gerar um plano trimestral (3 meses) personalizado baseado nas respostas do quiz. O plano deve ser progressivo, realista e baseado em ciência.

ESTRUTURA DO OUTPUT (JSON ESTRITO):
Retorne APENAS um JSON válido (sem texto, sem markdown, sem code blocks) com esta estrutura:

{
  "meta_trimestral": "string curto - objetivo principal",
  "insights": {
    "foco_principal": "string curto",
    "ritmo": "Leve | Moderado | Intenso | Extremo",
    "complexidade": "Baixa | Média | Alta"
  },
  "meses": [
    {
      "numero": 1,
      "titulo": "string curto",
      "objetivo": "string curto",
      "semanas": [
        {
          "numero": 1,
          "foco": "string curto",
          "dica_alfa_semanal": "string - frase motivacional curta",
          "hidratacao": { "meta_litros": 2.0 },
          "biohacking": [
            { "titulo": "Banho gelado", "concluida": false },
            { "titulo": "Exposição solar (15 min)", "concluida": false }
          ],
          "treino_dia": {
            "titulo": "string curto (ex: Peito e Tríceps)",
            "exercicios": 6,
            "duracao": "45 min"
          },
          "refeicoes": [
            { "titulo": "Café da manhã", "horario": "07:00", "concluida": false },
            { "titulo": "Almoço", "horario": "12:00", "concluida": false },
            { "titulo": "Jantar", "horario": "19:00", "concluida": false }
          ],
          "dias": [
            {
              "dia": 1,
              "tarefas": [
                {
                  "categoria": "treino | alimentacao | habito | mindset | social",
                  "titulo": "string curto",
                  "descricao": "max 15 palavras",
                  "concluida": false
                }
              ]
            }
          ]
        },
        { "numero": 2, "foco": "string", "objetivos_principais": ["string"] },
        { "numero": 3, "foco": "string", "objetivos_principais": ["string"] },
        { "numero": 4, "foco": "string", "objetivos_principais": ["string"] }
      ]
    },
    {
      "numero": 2,
      "titulo": "string",
      "objetivo": "string",
      "pontos_chave": ["string"]
    },
    {
      "numero": 3,
      "titulo": "string",
      "objetivo": "string",
      "pontos_chave": ["string"]
    }
  ]
}

REGRAS:
1. MÊS 1, SEMANA 1: Deve conter o cronograma DETALHADO (treino_dia, refeicoes, hidratacao, biohacking, dica_alfa_semanal) e os 7 dias com 3 tarefas cada.
2. Semanas 2-4 do mês 1: apenas foco e 2 objetivos_principais.
3. Meses 2 e 3: apenas título, objetivo e 3 pontos_chave.
4. Tarefas ESPECÍFICAS e ACIONÁVEIS, descrições CURTAS (max 15 palavras).
5. Adapte ao perfil do usuário.
6. SOMENTE JSON, sem texto antes ou depois, sem code blocks.`;
  }

  private buildUserPrompt(answers: Record<string, any>): string {
    return `Gere o plano trimestral personalizado para o seguinte usuário:

PERFIL DO USUÁRIO:
- Nome: ${answers.name || 'Usuário'}
- Idade: ${answers.age || 'Não informado'}
- Situação profissional: ${answers.professionalSituation || 'Não informado'}
- Horas disponíveis por dia: ${answers.dailyAvailability || 'Não informado'}
- Renda atual: ${answers.currentIncome || 'Não informado'}
- Autoestima (1-10): ${answers.selfEsteem ?? 'Não informado'}
- Frequência de pornografia: ${answers.pornographyFrequency || 'Não informado'}
- Frequência de masturbação: ${answers.masturbationFrequency || 'Não informado'}
- Tempo em redes sociais: ${answers.socialMediaTime || 'Não informado'}
- Uso de substâncias: ${JSON.stringify(answers.substanceUse || {})}
- Horas de sono: ${answers.sleepHours || 'Não informado'}
- Qualidade do sono (1-10): ${answers.sleepQuality ?? 'Não informado'}
- Alimentação: ${answers.diet || 'Não informado'}
- Atividade física: ${answers.physicalActivity || 'Não informado'}
- Tipos de treino: ${JSON.stringify(answers.workoutTypes || [])}
- Condição física (1-10): ${answers.physicalCondition ?? 'Não informado'}
- Restrições físicas: ${JSON.stringify(answers.physicalRestrictions || [])}
- Descrição de restrições: ${answers.restrictionDescription || 'Nenhuma'}
- Acesso a academia: ${answers.gymAccess || 'Não informado'}
- Habilidades sociais (1-10): ${answers.communicationSkills ?? 'Não informado'}
- Status de relacionamento: ${answers.relationshipStatus || 'Não informado'}
- Interações românticas recentes: ${answers.romanticInteractions || 'Não informado'}
- Dificuldades de interação: ${JSON.stringify(answers.interactionDifficulties || [])}
- Frequência de socialização: ${answers.socializingFrequency || 'Não informado'}
- Círculo social (1-10): ${answers.socialCircle ?? 'Não informado'}
- Objetivos principais: ${JSON.stringify(answers.primaryObjectives || [])}
- Expectativa de timeline: ${answers.timelineExpectation || 'Não informado'}
- Nível de comprometimento (1-10): ${answers.commitmentLevel ?? 'Não informado'}
- Contexto adicional: ${answers.additionalContext || 'Nenhum'}

Gere o plano trimestral no formato JSON especificado.`;
  }
}
