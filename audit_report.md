# Audit Report — Plan Generation Stress Test

**Modelo:** `claude-sonnet-4-6`
**Data:** 2026-04-22T17:48:04.432Z
**Perfis testados:** 5
**Gasto total real:** **$0.1773 USD**

## Resumo por perfil

| Perfil | Input | Output | Cache write | Cache read | Custo USD | Latência (ms) | Parsed | Meses | Tarefas Sem 1 |
|---|---:|---:|---:|---:|---:|---:|:-:|---:|---:|
| iniciante_sedentario | 1448 | 1927 | 0 | 0 | $0.0332 | 29073 | ✅ | 3 | 21 |
| intermediario_focado | 1442 | 1862 | 0 | 0 | $0.0323 | 27132 | ✅ | 3 | 21 |
| avancado_hardcore | 1444 | 1885 | 0 | 0 | $0.0326 | 28743 | ✅ | 3 | 21 |
| reabilitacao_recaida | 1478 | 2772 | 0 | 0 | $0.0460 | 35432 | ✅ | 3 | 21 |
| tempo_escasso_executivo | 1453 | 1919 | 0 | 0 | $0.0331 | 28818 | ✅ | 3 | 21 |

## Médias (apenas execuções com parse OK)

| Métrica | Valor |
|---|---:|
| Tokens de input médios | 1453 |
| Tokens de output médios | 2073 |
| Cache write médio | 0 |
| Cache read médio | 0 |
| Custo médio por plano | **$0.0355** |
| Latência média | 29840 ms |

## Projeção de custo (1 plano por usuário, custo único de onboarding)

| Volume | Custo projetado |
|---|---:|
| 1.000 usuários | **$35.45** |
| 10.000 usuários | **$354.54** |

## Verificação de qualidade

- Esperado por plano: `meta_trimestral` + 3 `meses` + Semana 1 com 7 dias × 3 tarefas (21 tarefas).
- Planos com parse OK: 5 / 5.
- Planos com 3 meses: 5 / 5.
- Planos com >= 21 tarefas na semana 1: 5 / 5.

## Notas operacionais

- Cache write na primeira chamada é custo extra (~25% acima do input).
- Chamadas subsequentes dentro de 5 minutos com mesmo system prompt leem do cache (~10% do input).
- O cache_creation aparece apenas na primeira chamada de cada janela de 5 min; depois vira cache_read.
- Para um único usuário gerando UM plano, o cache não amortiza — só ajuda quando há picos de geração concorrente.
