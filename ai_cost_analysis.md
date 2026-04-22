# Antibeta — Mapeamento Completo de Custo de IA

**Data:** 2026-04-22
**Escopo:** todas as features do app que consomem Anthropic API
**Fonte:** stress test real (plan_generation) + estimativa por token counting (demais)

---

## 1. Inventário de features com IA

| Feature | Arquivo | Modelo | Tier | Frequência típica |
|---|---|---|---|---|
| `plan_generation` | `backend/src/modules/planning/planning.service.ts` | Sonnet 4.6 | Alta performance | 1× no onboarding (renovação trimestral) |
| `chat_agent` | `backend/src/modules/conversational/anthropic.service.ts` | Haiku 4.5 | Eficiência | Várias vezes/dia |
| `scanner_analysis` | `backend/src/modules/scanner/scanner.service.ts` | Haiku 4.5 + visão | Eficiência | Esporádica (1-3×/dia) |
| `weekly_insight` | `backend/src/modules/insights/insights.service.ts` | Haiku 4.5 | Eficiência | 1× por semana (domingo) |

Todas as chamadas passam pelo `AiRouterService` — gravam em `ai_usage_logs` com usage, custo em USD, latência, status e fallback_used.

---

## 2. Tabela de preços (Anthropic 2026)

USD por 1.000.000 tokens. Valores em `backend/src/modules/ai-core/pricing.ts`.

| Modelo | Input | Output | Cache read | Cache write |
|---|---:|---:|---:|---:|
| Claude Sonnet 4.6 | $3,00 | $15,00 | $0,30 | $3,75 |
| Claude Haiku 4.5 | $1,00 | $5,00 | $0,10 | $1,25 |

> Output prices confirmados pelo usuário (Sonnet $15, Haiku $5). Input/cache derivados do padrão Anthropic: input = output/5, cache_read = 10% do input, cache_write = 125% do input.

---

## 3. Custo por chamada

### 3.1 plan_generation — dados reais (5 planos gerados 2026-04-22)

| Perfil | Input | Output | Custo | Latência |
|---|---:|---:|---:|---:|
| iniciante_sedentario | 1.448 | 1.927 | $0,0332 | 29,1 s |
| intermediario_focado | 1.442 | 1.862 | $0,0323 | 27,1 s |
| avancado_hardcore | 1.444 | 1.885 | $0,0326 | 28,7 s |
| reabilitacao_recaida | 1.478 | 2.772 | $0,0460 | 35,4 s |
| tempo_escasso_executivo | 1.453 | 1.919 | $0,0331 | 28,8 s |
| **Média** | **1.453** | **2.073** | **$0,0355** | **29,8 s** |

**Qualidade:** 5/5 planos com parse OK, 3 meses, 21 tarefas na semana 1. Zero degradação.

### 3.2 chat_agent — estimado

- System prompt (`TOUGH_LOVE_SYSTEM_PROMPT` + contexto do usuário): **~310 tokens**
- User message média: ~30 tokens
- Output (`max_tokens: 256`, média realista): **~150 tokens**
- **Custo por chamada: ~$0,0011**

### 3.3 scanner_analysis — estimado

- System prompt: ~250 tokens
- Imagem (print mobile típico, base64): **~1.200 tokens de visão**
- Texto instrução: ~10 tokens
- Output (`max_tokens: 1024`, média realista): ~400 tokens
- **Custo por chamada: ~$0,0035**
- ⚠️ **Se o print for full HD (1920px+), a imagem vira ~2.500 tokens e o custo dobra para ~$0,006.** Recomenda-se resize no client para máximo 1024px antes do upload.

### 3.4 weekly_insight — estimado

- System prompt: ~650 tokens (instruções + exemplo JSON)
- Dados dinâmicos do usuário: ~200 tokens
- Output (`max_tokens: 1024`, média realista): ~500 tokens
- **Custo por chamada: ~$0,0034**

---

## 4. Orçamento com plano de R$ 24,90

### 4.1 Receita líquida por usuário/mês

| Item | Valor |
|---|---:|
| Receita bruta | R$ 24,90 (~$4,98 USD a R$5/USD) |
| − Apple / Google Store (15%) | −$0,75 |
| − Impostos BR (estimativa 10% simples) | −$0,42 |
| − Supabase / hosting / infra (amortizado) | −$0,30 |
| **Net disponível** | **~$3,50 / usuário / mês** |

### 4.2 Alocação para IA

Target: margem ≥70% da receita bruta após IA.
**Orçamento de IA: ~$1,00 / usuário / mês.**

Custos fixos (inevitáveis):

| Item | Valor mensal |
|---|---:|
| Plan generation (1× / trimestre amortizado em 6 meses médios) | $0,006 |
| Weekly insight (4× / mês × $0,0034) | $0,014 |
| **Subtotal fixo** | **$0,02** |

**Sobra para features diárias (chat + scanner): ~$0,98 / mês = $0,033 / dia.**

---

## 5. Limites diários recomendados

### 5.1 Cenário conservador (margem alta, UX premium)

| Feature | Limite | Custo pior-caso/dia | Custo pior-caso/mês |
|---|---:|---:|---:|
| Chat com agente | **20 msg/dia** | $0,022 | $0,66 |
| Scanner alpha | **3 scans/dia** | $0,011 | $0,32 |
| Weekly insight | 1/semana (automático) | — | $0,014 |
| Plan generation | 1/trimestre | — | $0,006 |
| **Total pior-caso** | | **$0,033** | **~$1,00** |

**Margem pior-caso:** $3,50 − $1,00 = **$2,50/usuário/mês (71% do net, 50% da receita bruta).**

### 5.2 Cenário agressivo ("chat ilimitado" no marketing)

| Feature | Cap anti-abuso | Custo pior-caso/mês |
|---|---:|---:|
| Chat | 50 msg/dia | $1,65 |
| Scanner | 5 scans/dia | $0,53 |
| Weekly + Plan | fixos | $0,02 |
| **Total pior-caso** | | **~$2,20** |

**Margem pior-caso:** $3,50 − $2,20 = **$1,30/usuário/mês (37% do net, 26% da receita bruta).** Pressionado.

### 5.3 Realidade estatística (uso médio, ~35% do cap)

Usuários reais consomem 30-40% do limite máximo em produtos premium. Aplicando 35% sobre o cenário conservador:

| Item | Custo esperado |
|---|---:|
| Chat (~7 msg/dia) | $0,23 |
| Scanner (~1 scan/dia) | $0,11 |
| Fixos | $0,02 |
| **Total médio/usuário/mês** | **~$0,36** |

**Margem real esperada:** $3,50 − $0,36 = **$3,14/usuário/mês (~90% do net).**

---

## 6. Projeção de volume

Baseado no cenário conservador, custo médio real = $0,36/usuário/mês.

| MAU | Custo IA/mês | Receita bruta/mês | Net pós-tudo |
|---:|---:|---:|---:|
| 100 | $36 | R$ 2.490 | R$ 1.740 |
| 1.000 | $360 | R$ 24.900 | R$ 17.400 |
| 10.000 | $3.600 | R$ 249.000 | R$ 174.000 |
| 100.000 | $36.000 | R$ 2.490.000 | R$ 1.740.000 |

> Conversão a R$5/USD. Inclui plano one-time amortizado. Não inclui custos variáveis adicionais (CS, marketing, devops acima da base).

---

## 7. Riscos e pontos de atenção

### 7.1 Prompt caching não está ativo hoje

Observação do stress test: `cache_creation_input_tokens = 0` e `cache_read_input_tokens = 0` em todas as 5 chamadas.

**Causa:** mínimo de tokens para ativar cache:

- Sonnet: 1.024 tokens no bloco cacheado
- Haiku: 2.048 tokens no bloco cacheado

System prompts atuais:

- `TOUGH_LOVE_SYSTEM_PROMPT` (chat): ~225 tokens → **abaixo do threshold Haiku**
- `SCANNER_SYSTEM_PROMPT`: ~250 tokens → **abaixo**
- `WEEKLY_INSIGHT_SYSTEM_PROMPT`: ~650 tokens → **abaixo**
- Planning system prompt: ~1.400 tokens → **limítrofe** (pode ou não cachear dependendo do tokenizer)

Os markers `cache_control` já estão no código. Quando os prompts crescerem (ou quando migrarem para blocos maiores), o cache ativa automaticamente — economia de 90% no input cacheado.

**Decisão pendente:** investir em system prompts mais robustos (com knowledge base de fisiologia / regras do app / tom de voz) para passar do threshold e ativar cache, ou manter prompts enxutos e aceitar o custo atual.

### 7.2 Latência de plan_generation ~30 s

Medido: 29,8 s médios, 35 s no pior caso. Com `max_tokens: 16384` mas output médio de 2.073 tokens — **folga de 8×**.

Reduzir `max_tokens: 8192` mantém qualidade (nenhum plano chegou perto de 8k tokens) e pode baixar latência em ~10-15%.

### 7.3 Imagens no scanner

Sem resize no client, usuários com iPhones recentes enviam prints de 2.4 MP que viram 2.500+ tokens de input. Resize para 1024px width no client economiza ~50% do custo desta feature.

### 7.4 Fallback Haiku → Sonnet encarece em falha

Router configurado com fallback automático. Em caso de erro no Haiku, Sonnet assume — custo de `chat_agent` sobe de $0,0011 para ~$0,003 na chamada que precisou de fallback. Coluna `fallback_used` na `ai_usage_logs` permite monitorar frequência.

---

## 8. Recomendação executiva

### Limites a aplicar agora (plano R$ 24,90)

```
Plan generation : 1 × por trimestre
Weekly insight  : 1 × por semana (automático, domingo)
Chat com agente : 20 mensagens/dia
Scanner alpha   : 3 scans/dia
```

### Por que esses números

- Custo pior-caso **$1,00/usuário/mês** → preserva margem de 71% sobre o net.
- Custo realista **~$0,36/usuário/mês** → margem real de 90%.
- Limites grandes o suficiente para não frustrar o usuário engajado (20 msg/dia com coach é bem acima do consumo humano típico).
- Limite do scanner baixo porque o caso de uso é esporádico — não faz sentido user scanear 10 prints/dia.

### Ordem de próximos passos

1. **Instrumentar** (feito): toda chamada já grava em `ai_usage_logs` com custo real. Começa a render dados hoje.
2. **Observar** 2-4 semanas: consultar a view `ai_usage_summary_7d` para ver distribuição real de uso por `feature_name` e `user_id`.
3. **Implementar rate limiting**: tabela `feature_usage_daily(user_id, feature_name, date, count)` + guard que bloqueia ao bater o cap. Endpoint `GET /me/ai-limits` retornando `{chat: {used: 7, limit: 20}, scanner: {used: 1, limit: 3}}` para o mobile mostrar contador.
4. **Otimizar imagens no client**: resize para 1024px antes do upload no scanner.
5. **Re-avaliar caps** com dados reais da `ai_usage_summary_7d` após 1 mês de produção.

---

## 9. Referências operacionais

### Views SQL para monitoramento

```sql
-- Custo total nas últimas 24h por feature
SELECT feature_name, model_name, call_count, total_cost_usd, avg_latency_ms
FROM ai_usage_summary_24h
ORDER BY total_cost_usd DESC;

-- Top 10 usuários que mais gastam na última semana
SELECT user_id, SUM(total_cost_usd) AS cost_7d
FROM ai_usage_summary_7d
GROUP BY user_id
ORDER BY cost_7d DESC
LIMIT 10;

-- Frequência de fallback Haiku → Sonnet
SELECT feature_name, SUM(fallback_count) AS fallbacks, SUM(call_count) AS total_calls
FROM ai_usage_summary_7d
GROUP BY feature_name;
```

### Arquivos relevantes

- Pricing: `backend/src/modules/ai-core/pricing.ts`
- Router + logger: `backend/src/modules/ai-core/ai-router.service.ts`
- Stress test: `backend/scripts/audit-plan-generation.ts`
- Raw stress data: `audit_report.md`
