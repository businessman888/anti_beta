/**
 * Stress test: gera 5 planos trimestrais com perfis distintos e produz
 * `audit_report.md` com tokens, custo USD, latência e projeção 1k/MAU.
 *
 * Uso:
 *   npx ts-node scripts/audit-plan-generation.ts
 *
 * Requer: ANTHROPIC_API_KEY no env. Faz chamadas REAIS — gera custo real.
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { calculateCostUsd, ModelName } from '../src/modules/ai-core/pricing';
import { PlanningService } from '../src/modules/planning/planning.service';

interface PerProfileResult {
  profileName: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  costUsd: number;
  latencyMs: number;
  parsedOk: boolean;
  parseError?: string;
  qualitySignals: {
    hasMetaTrimestral: boolean;
    monthCount: number;
    week1HasDailyTasks: boolean;
    totalDailyTasksWeek1: number;
  };
}

const PROFILES: { name: string; answers: Record<string, any> }[] = [
  {
    name: 'iniciante_sedentario',
    answers: {
      name: 'Carlos', age: 32, professionalSituation: 'CLT',
      dailyAvailability: '1h', currentIncome: '5k-10k', selfEsteem: 4,
      pornographyFrequency: 'diaria', masturbationFrequency: 'diaria',
      socialMediaTime: '5h+', substanceUse: { alcool: 'fim_semana' },
      sleepHours: '6h', sleepQuality: 5, diet: 'fastfood', physicalActivity: 'nenhuma',
      workoutTypes: [], physicalCondition: 3, physicalRestrictions: [],
      gymAccess: 'nao', communicationSkills: 4, relationshipStatus: 'solteiro',
      socializingFrequency: 'baixa', socialCircle: 3,
      primaryObjectives: ['perder_peso', 'autoestima'], timelineExpectation: '3 meses',
      commitmentLevel: 6, additionalContext: 'Quer começar do zero',
    },
  },
  {
    name: 'intermediario_focado',
    answers: {
      name: 'Lucas', age: 27, professionalSituation: 'autonomo',
      dailyAvailability: '2h', currentIncome: '10k-20k', selfEsteem: 6,
      pornographyFrequency: 'semanal', masturbationFrequency: 'semanal',
      socialMediaTime: '2h', substanceUse: {},
      sleepHours: '7h', sleepQuality: 7, diet: 'balanceada', physicalActivity: 'moderada',
      workoutTypes: ['musculacao'], physicalCondition: 6, physicalRestrictions: [],
      gymAccess: 'sim', communicationSkills: 6, relationshipStatus: 'namorando',
      socializingFrequency: 'media', socialCircle: 6,
      primaryObjectives: ['hipertrofia', 'disciplina'], timelineExpectation: '6 meses',
      commitmentLevel: 8, additionalContext: 'Quer subir o nível',
    },
  },
  {
    name: 'avancado_hardcore',
    answers: {
      name: 'Rafael', age: 35, professionalSituation: 'empresario',
      dailyAvailability: '3h+', currentIncome: '20k+', selfEsteem: 8,
      pornographyFrequency: 'nunca', masturbationFrequency: 'nunca',
      socialMediaTime: '<1h', substanceUse: {},
      sleepHours: '8h', sleepQuality: 9, diet: 'cetogenica', physicalActivity: 'intensa',
      workoutTypes: ['musculacao', 'crossfit', 'corrida'], physicalCondition: 9,
      physicalRestrictions: [], gymAccess: 'sim', communicationSkills: 8,
      relationshipStatus: 'casado', socializingFrequency: 'alta', socialCircle: 8,
      primaryObjectives: ['performance_maxima', 'lideranca'], timelineExpectation: '12 meses',
      commitmentLevel: 10, additionalContext: 'Otimização de performance total',
    },
  },
  {
    name: 'reabilitacao_recaida',
    answers: {
      name: 'João', age: 24, professionalSituation: 'desempregado',
      dailyAvailability: '4h+', currentIncome: '0-5k', selfEsteem: 2,
      pornographyFrequency: 'multiplas_vezes_dia', masturbationFrequency: 'multiplas_vezes_dia',
      socialMediaTime: '8h+', substanceUse: { maconha: 'diaria', alcool: 'semanal' },
      sleepHours: '4h', sleepQuality: 3, diet: 'irregular', physicalActivity: 'nenhuma',
      workoutTypes: [], physicalCondition: 2, physicalRestrictions: ['dor_lombar'],
      restrictionDescription: 'dor lombar crônica', gymAccess: 'nao',
      communicationSkills: 2, relationshipStatus: 'solteiro',
      socializingFrequency: 'isolado', socialCircle: 1,
      primaryObjectives: ['parar_vicios', 'reconstruir_vida'], timelineExpectation: '12 meses',
      commitmentLevel: 7, additionalContext: 'Quer sair da depressão',
    },
  },
  {
    name: 'tempo_escasso_executivo',
    answers: {
      name: 'Marcos', age: 41, professionalSituation: 'executivo_corporativo',
      dailyAvailability: '30min', currentIncome: '50k+', selfEsteem: 7,
      pornographyFrequency: 'nunca', masturbationFrequency: 'mensal',
      socialMediaTime: '1h', substanceUse: { alcool: 'social' },
      sleepHours: '6h', sleepQuality: 6, diet: 'restaurante', physicalActivity: 'baixa',
      workoutTypes: ['caminhada'], physicalCondition: 5, physicalRestrictions: ['joelho'],
      restrictionDescription: 'lesão antiga no joelho', gymAccess: 'sim',
      communicationSkills: 9, relationshipStatus: 'casado',
      socializingFrequency: 'alta', socialCircle: 9,
      primaryObjectives: ['energia', 'longevidade'], timelineExpectation: '6 meses',
      commitmentLevel: 7, additionalContext: 'Pouco tempo, quer máxima eficiência',
    },
  },
];

const MODEL: ModelName = 'claude-sonnet-4-6';

async function runProfile(
  client: Anthropic,
  systemPrompt: string,
  profile: { name: string; answers: Record<string, any> },
): Promise<PerProfileResult> {
  // Build user prompt inline (mirrors PlanningService.buildUserPrompt — kept local
  // so we never need to instantiate Nest DI for the audit script).
  const a = profile.answers;
  const userPrompt = `Gere o plano trimestral personalizado para o seguinte usuário:

PERFIL DO USUÁRIO:
- Nome: ${a.name || 'Usuário'}
- Idade: ${a.age || 'Não informado'}
- Situação profissional: ${a.professionalSituation || 'Não informado'}
- Horas disponíveis por dia: ${a.dailyAvailability || 'Não informado'}
- Renda atual: ${a.currentIncome || 'Não informado'}
- Autoestima (1-10): ${a.selfEsteem ?? 'Não informado'}
- Frequência de pornografia: ${a.pornographyFrequency || 'Não informado'}
- Frequência de masturbação: ${a.masturbationFrequency || 'Não informado'}
- Tempo em redes sociais: ${a.socialMediaTime || 'Não informado'}
- Uso de substâncias: ${JSON.stringify(a.substanceUse || {})}
- Horas de sono: ${a.sleepHours || 'Não informado'}
- Qualidade do sono (1-10): ${a.sleepQuality ?? 'Não informado'}
- Alimentação: ${a.diet || 'Não informado'}
- Atividade física: ${a.physicalActivity || 'Não informado'}
- Tipos de treino: ${JSON.stringify(a.workoutTypes || [])}
- Condição física (1-10): ${a.physicalCondition ?? 'Não informado'}
- Restrições físicas: ${JSON.stringify(a.physicalRestrictions || [])}
- Descrição de restrições: ${a.restrictionDescription || 'Nenhuma'}
- Acesso a academia: ${a.gymAccess || 'Não informado'}
- Habilidades sociais (1-10): ${a.communicationSkills ?? 'Não informado'}
- Status de relacionamento: ${a.relationshipStatus || 'Não informado'}
- Interações românticas recentes: ${a.romanticInteractions || 'Não informado'}
- Dificuldades de interação: ${JSON.stringify(a.interactionDifficulties || [])}
- Frequência de socialização: ${a.socializingFrequency || 'Não informado'}
- Círculo social (1-10): ${a.socialCircle ?? 'Não informado'}
- Objetivos principais: ${JSON.stringify(a.primaryObjectives || [])}
- Expectativa de timeline: ${a.timelineExpectation || 'Não informado'}
- Nível de comprometimento (1-10): ${a.commitmentLevel ?? 'Não informado'}
- Contexto adicional: ${a.additionalContext || 'Nenhum'}

Gere o plano trimestral no formato JSON especificado.`;

  const start = Date.now();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16384,
    temperature: 0.7,
    system: [
      { type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } },
    ],
    messages: [{ role: 'user', content: userPrompt }],
  });
  const latencyMs = Date.now() - start;

  const usage: any = response.usage ?? {};
  const inputTokens = usage.input_tokens ?? 0;
  const outputTokens = usage.output_tokens ?? 0;
  const cacheCreationTokens = usage.cache_creation_input_tokens ?? 0;
  const cacheReadTokens = usage.cache_read_input_tokens ?? 0;

  const costUsd = calculateCostUsd(MODEL, {
    inputTokens, outputTokens, cacheCreationTokens, cacheReadTokens,
  });

  // Quality signals: parse JSON, count months, count week-1 daily tasks
  let parsedOk = false;
  let parseError: string | undefined;
  const quality = {
    hasMetaTrimestral: false,
    monthCount: 0,
    week1HasDailyTasks: false,
    totalDailyTasksWeek1: 0,
  };
  try {
    const txt = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const jsonMatch = txt.match(/```json\s*([\s\S]*?)\s*```/);
    const raw = jsonMatch ? jsonMatch[1] : txt;
    const plan = JSON.parse(raw);
    parsedOk = true;
    quality.hasMetaTrimestral = !!plan.meta_trimestral;
    quality.monthCount = Array.isArray(plan.meses) ? plan.meses.length : 0;
    const week1 = plan.meses?.[0]?.semanas?.[0];
    if (week1 && Array.isArray(week1.dias)) {
      quality.week1HasDailyTasks = true;
      quality.totalDailyTasksWeek1 = week1.dias.reduce(
        (acc: number, d: any) => acc + (Array.isArray(d.tarefas) ? d.tarefas.length : 0),
        0,
      );
    }
  } catch (e: any) {
    parseError = e?.message || String(e);
  }

  return {
    profileName: profile.name,
    inputTokens,
    outputTokens,
    cacheCreationTokens,
    cacheReadTokens,
    costUsd,
    latencyMs,
    parsedOk,
    parseError,
    qualitySignals: quality,
  };
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY ausente no env. Abortando.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Build the system prompt straight from the planning service so the audit
  // mirrors production exactly.
  const planning = new PlanningService(null as any, null as any);
  const systemPrompt = planning.buildSystemPrompt();

  console.log(`Iniciando stress test (${PROFILES.length} planos, modelo ${MODEL})...`);

  const results: PerProfileResult[] = [];
  for (const profile of PROFILES) {
    console.log(`  → Gerando para perfil: ${profile.name}`);
    try {
      const r = await runProfile(client, systemPrompt, profile);
      results.push(r);
      console.log(
        `    OK (in=${r.inputTokens} out=${r.outputTokens} cache_w=${r.cacheCreationTokens} cache_r=${r.cacheReadTokens} | $${r.costUsd.toFixed(4)} | ${r.latencyMs}ms | parsedOk=${r.parsedOk})`,
      );
    } catch (err: any) {
      console.error(`    ERRO: ${err?.message ?? err}`);
      results.push({
        profileName: profile.name,
        inputTokens: 0,
        outputTokens: 0,
        cacheCreationTokens: 0,
        cacheReadTokens: 0,
        costUsd: 0,
        latencyMs: 0,
        parsedOk: false,
        parseError: err?.message ?? String(err),
        qualitySignals: { hasMetaTrimestral: false, monthCount: 0, week1HasDailyTasks: false, totalDailyTasksWeek1: 0 },
      });
    }
  }

  // Aggregate
  const ok = results.filter(r => r.parsedOk);
  const avgInput = ok.length ? ok.reduce((a, r) => a + r.inputTokens, 0) / ok.length : 0;
  const avgOutput = ok.length ? ok.reduce((a, r) => a + r.outputTokens, 0) / ok.length : 0;
  const avgCacheW = ok.length ? ok.reduce((a, r) => a + r.cacheCreationTokens, 0) / ok.length : 0;
  const avgCacheR = ok.length ? ok.reduce((a, r) => a + r.cacheReadTokens, 0) / ok.length : 0;
  const avgCost = ok.length ? ok.reduce((a, r) => a + r.costUsd, 0) / ok.length : 0;
  const avgLatency = ok.length ? ok.reduce((a, r) => a + r.latencyMs, 0) / ok.length : 0;
  const totalCost = results.reduce((a, r) => a + r.costUsd, 0);

  // Projection: 1 plan generation per active user (one-time onboarding cost)
  const proj1k = avgCost * 1000;
  const proj10k = avgCost * 10_000;

  const reportPath = path.resolve(__dirname, '..', '..', 'audit_report.md');
  const md = buildMarkdownReport(
    results, { avgInput, avgOutput, avgCacheW, avgCacheR, avgCost, avgLatency, totalCost, proj1k, proj10k },
  );
  fs.writeFileSync(reportPath, md, 'utf8');
  console.log(`\nRelatório salvo em: ${reportPath}`);
  console.log(`Gasto total real: $${totalCost.toFixed(4)} USD`);
}

function buildMarkdownReport(
  results: PerProfileResult[],
  agg: {
    avgInput: number; avgOutput: number; avgCacheW: number; avgCacheR: number;
    avgCost: number; avgLatency: number; totalCost: number; proj1k: number; proj10k: number;
  },
): string {
  const rows = results.map(r => {
    const qs = r.qualitySignals;
    return `| ${r.profileName} | ${r.inputTokens} | ${r.outputTokens} | ${r.cacheCreationTokens} | ${r.cacheReadTokens} | $${r.costUsd.toFixed(4)} | ${r.latencyMs} | ${r.parsedOk ? '✅' : '❌'} | ${qs.monthCount} | ${qs.totalDailyTasksWeek1} |`;
  }).join('\n');

  return `# Audit Report — Plan Generation Stress Test

**Modelo:** \`${MODEL}\`
**Data:** ${new Date().toISOString()}
**Perfis testados:** ${results.length}
**Gasto total real:** **$${agg.totalCost.toFixed(4)} USD**

## Resumo por perfil

| Perfil | Input | Output | Cache write | Cache read | Custo USD | Latência (ms) | Parsed | Meses | Tarefas Sem 1 |
|---|---:|---:|---:|---:|---:|---:|:-:|---:|---:|
${rows}

## Médias (apenas execuções com parse OK)

| Métrica | Valor |
|---|---:|
| Tokens de input médios | ${agg.avgInput.toFixed(0)} |
| Tokens de output médios | ${agg.avgOutput.toFixed(0)} |
| Cache write médio | ${agg.avgCacheW.toFixed(0)} |
| Cache read médio | ${agg.avgCacheR.toFixed(0)} |
| Custo médio por plano | **$${agg.avgCost.toFixed(4)}** |
| Latência média | ${agg.avgLatency.toFixed(0)} ms |

## Projeção de custo (1 plano por usuário, custo único de onboarding)

| Volume | Custo projetado |
|---|---:|
| 1.000 usuários | **$${agg.proj1k.toFixed(2)}** |
| 10.000 usuários | **$${agg.proj10k.toFixed(2)}** |

## Verificação de qualidade

- Esperado por plano: \`meta_trimestral\` + 3 \`meses\` + Semana 1 com 7 dias × 3 tarefas (21 tarefas).
- Planos com parse OK: ${results.filter(r => r.parsedOk).length} / ${results.length}.
- Planos com 3 meses: ${results.filter(r => r.qualitySignals.monthCount === 3).length} / ${results.length}.
- Planos com >= 21 tarefas na semana 1: ${results.filter(r => r.qualitySignals.totalDailyTasksWeek1 >= 21).length} / ${results.length}.

## Notas operacionais

- Cache write na primeira chamada é custo extra (~25% acima do input).
- Chamadas subsequentes dentro de 5 minutos com mesmo system prompt leem do cache (~10% do input).
- O cache_creation aparece apenas na primeira chamada de cada janela de 5 min; depois vira cache_read.
- Para um único usuário gerando UM plano, o cache não amortiza — só ajuda quando há picos de geração concorrente.
`;
}

main().catch(err => {
  console.error('Stress test crashed:', err);
  process.exit(1);
});
