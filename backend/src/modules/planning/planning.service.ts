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

  async generatePlan(dto: GeneratePlanDto) {
    const { answers, userId } = dto;

    this.logger.log(`Generating plan for user: ${userId || 'anonymous'}`);
    this.logger.log(`Quiz answers received: ${Object.keys(answers).length} fields`);

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

      // Save plan to database if userId is provided
      if (userId) {
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

        return {
          id: plan.id,
          userId: plan.userId,
          planData: plan.planData,
          createdAt: plan.createdAt,
        };
      }

      // Return plan without saving if no userId
      return {
        id: 'temp',
        userId: 'anonymous',
        planData: planJson,
        createdAt: new Date(),
      };
    } catch (error: any) {
      this.logger.error(`Plan generation failed: ${error?.message || error}`);
      if (error?.status) {
        this.logger.error(`Anthropic API error status: ${error.status}`);
      }
      throw error;
    }
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
          "dias": [
            {
              "dia": 1,
              "tarefas": [
                {
                  "categoria": "treino | alimentacao | habito | mindset | social",
                  "titulo": "string curto",
                  "descricao": "max 15 palavras, ação específica",
                  "concluida": false
                }
              ]
            }
          ]
        },
        { "numero": 2, "foco": "string", "objetivos_principais": ["string", "string"] },
        { "numero": 3, "foco": "string", "objetivos_principais": ["string", "string"] },
        { "numero": 4, "foco": "string", "objetivos_principais": ["string", "string"] }
      ]
    },
    {
      "numero": 2,
      "titulo": "string",
      "objetivo": "string",
      "pontos_chave": ["string", "string", "string"]
    },
    {
      "numero": 3,
      "titulo": "string",
      "objetivo": "string",
      "pontos_chave": ["string", "string", "string"]
    }
  ]
}

REGRAS:
1. MÊS 1, SEMANA 1: 7 dias com EXATAMENTE 3 tarefas por dia (uma de treino/físico, uma de mindset/hábito, uma social/alimentação)
2. Semanas 2-4 do mês 1: apenas foco e 2 objetivos_principais
3. Meses 2 e 3: apenas título, objetivo e 3 pontos_chave
4. Tarefas ESPECÍFICAS e ACIONÁVEIS, descrições CURTAS (max 15 palavras)
5. Adapte ao perfil do usuário
6. Considere restrições físicas e acesso a academia
7. Linguagem direta, motivacional, tough love
8. SOMENTE JSON, sem texto antes ou depois, sem code blocks`;
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
