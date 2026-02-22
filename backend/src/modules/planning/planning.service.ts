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

        const systemPrompt = this.buildSystemPrompt();
        const userPrompt = this.buildUserPrompt(answers);

        try {
            const response = await this.anthropic.messages.create({
                model: 'claude-sonnet-4-6',
                max_tokens: 8192,
                temperature: 1,
                system: systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: userPrompt,
                    },
                ],
            });

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
                this.logger.error('Failed to parse AI response as JSON', content.text);
                throw new Error('Failed to parse plan from AI response');
            }

            // Save plan to database if userId is provided
            if (userId) {
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
        } catch (error) {
            this.logger.error('Plan generation failed:', error);
            throw error;
        }
    }

    private buildSystemPrompt(): string {
        return `Você é o Agente de Planejamento do Antibeta, especializado em criar planos de transformação masculina personalizados.

CONTEXTO:
O Antibeta é um app de desenvolvimento pessoal masculino focado em transformar homens "beta" em "alpha" através de metas estruturadas em treino, alimentação, mindset, hábitos e habilidades sociais.

SUA TAREFA:
Gerar um plano trimestral (3 meses) personalizado baseado nas respostas do quiz de onboarding do usuário. O plano deve ser progressivo, realista e baseado em ciência.

ESTRUTURA DO OUTPUT (JSON ESTRITO):
Retorne APENAS um JSON válido (sem texto adicional, sem markdown) com a seguinte estrutura:

{
  "meta_trimestral": "string - objetivo principal dos 3 meses",
  "insights": {
    "foco_principal": "string - área que mais precisa de atenção",
    "ritmo": "string - Modo Leve / Moderado / Intenso / Extremo",
    "complexidade": "string - Baixa / Média / Alta / Alta Precisão"
  },
  "meses": [
    {
      "numero": 1,
      "titulo": "string - nome do mês (ex: Fundamentos)",
      "objetivo": "string - objetivo principal do mês",
      "semanas": [
        {
          "numero": 1,
          "foco": "string - foco da semana (ex: Iniciação)",
          "dias": [
            {
              "dia": 1,
              "tarefas": [
                {
                  "categoria": "treino | alimentacao | habito | mindset | social",
                  "titulo": "string",
                  "descricao": "string - instrução específica e acionável",
                  "concluida": false
                }
              ]
            }
          ]
        },
        {
          "numero": 2,
          "foco": "string",
          "objetivos_principais": ["string", "string"]
        },
        {
          "numero": 3,
          "foco": "string",
          "objetivos_principais": ["string", "string"]
        },
        {
          "numero": 4,
          "foco": "string",
          "objetivos_principais": ["string", "string"]
        }
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

REGRAS IMPORTANTES:
1. O MÊS 1 deve ter a SEMANA 1 detalhada com 7 dias e 4-5 tarefas por dia
2. As semanas 2, 3 e 4 do mês 1 devem ter apenas foco e objetivos principais (2 itens cada)
3. Os meses 2 e 3 devem ter apenas título, objetivo e 3 pontos-chave cada
4. As tarefas devem ser ESPECÍFICAS e ACIONÁVEIS (não genéricas)
5. Adapte a dificuldade ao perfil do usuário (sedentário recebe treinos mais leves, etc)
6. Considere restrições físicas, disponibilidade de tempo e acesso a academia
7. Para vícios (porn, masturbação, redes sociais), inclua estratégias práticas de redução gradual
8. Inclua sempre: treino/atividade física, alimentação, hábito positivo, mindset/leitura, e algo social
9. Seja direto, sem rodeios, com linguagem motivacional do tipo "tough love"
10. Retorne SOMENTE o JSON, sem nenhum texto antes ou depois`;
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
