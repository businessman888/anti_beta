# Contexto de Implementação — Módulo de Planning com IA

> **Data:** 22/02/2026  
> **Sessão:** Implementação do backend de geração de plano + integração mobile  
> **Status:** ✅ Código completo, pendente deploy no Railway

---

## 1. Objetivo da Sessão

Implementar o fluxo completo de **geração de plano personalizado via IA** após o usuário completar o quiz de onboarding. O plano é gerado pelo Claude Sonnet 4.6 (Anthropic) e cobre 3 meses de transformação.

---

## 2. Arquitetura do Fluxo

```
Quiz (Step 27) → POST /planning/generate-plan → Claude Sonnet 4.6 → DB (plans) → Mobile
     ↓                    ↓                            ↓                         ↓
OnboardingScreen    PlanningController         Prompt c/ quiz answers      PlanLoadingScreen
                    PlanningService            JSON estruturado            PlanGeneratedScreen
                                                                          HomeScreen (goals)
```

---

## 3. Backend — Arquivos Criados/Modificados

### 3.1 Novos Arquivos

| Arquivo | Caminho | Descrição |
|---------|---------|-----------|
| `prisma.service.ts` | `backend/src/prisma/prisma.service.ts` | Wrapper do `PrismaClient` como injectable NestJS com `onModuleInit`/`onModuleDestroy` |
| `prisma.module.ts` | `backend/src/prisma/prisma.module.ts` | Módulo global que exporta `PrismaService` para toda a aplicação |
| `planning.module.ts` | `backend/src/modules/planning/planning.module.ts` | Módulo NestJS do feature planning |
| `planning.controller.ts` | `backend/src/modules/planning/planning.controller.ts` | Controller com endpoint `POST /planning/generate-plan` documentado com Swagger |
| `planning.service.ts` | `backend/src/modules/planning/planning.service.ts` | Serviço principal: constrói prompts, chama Claude Sonnet 4.6, parseia JSON, salva no DB |
| `generate-plan.dto.ts` | `backend/src/modules/planning/dto/generate-plan.dto.ts` | DTOs: `GeneratePlanDto` (input com answers + userId) e `PlanResponseDto` (output) |

### 3.2 Arquivos Modificados

| Arquivo | Mudança |
|---------|---------|
| `app.module.ts` | Importou `ConfigModule.forRoot()`, `PrismaModule`, `PlanningModule` |
| `schema.prisma` | Adicionou modelo `Plan` com relação 1:1 ao `User` |
| `tsconfig.build.json` | Excluiu `prisma.config.ts` do build NestJS |

### 3.3 Modelo Prisma — Plan

```prisma
model Plan {
  id        String   @id @default(uuid())
  userId    String   @unique @map("user_id")
  planData  Json     @map("plan_data")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("plans")
}
```

> A tabela `plans` foi criada manualmente no Supabase via SQL (devido a referências cross-schema `auth.users` → `public.users`).

### 3.4 Integração com Anthropic

- **SDK:** `@anthropic-ai/sdk`
- **Modelo:** `claude-sonnet-4-6` (corrigido de `claude-sonnet-4.6`)
- **Max tokens:** 8192
- **Temperature:** 1
- **Variável de ambiente:** `ANTHROPIC_API_KEY` (já configurada no `.env`)

### 3.5 Estrutura do Prompt

**System Prompt** define:
- Papel: "Agente de Planejamento do Antibeta"
- Escopo: plano trimestral (3 meses)
- Mês 1: detalhado (4 semanas × 7 dias × tarefas por categoria)
- Meses 2 e 3: resumidos (título + objetivo + pontos_chave)

**User Prompt** constrói contexto a partir das respostas do quiz:
- Dados pessoais (nome, idade, profissão)
- Disponibilidade e renda
- Hábitos (substâncias, sono, dieta, exercício)
- Saúde mental e social
- Objetivos e nível de comprometimento

**Output JSON esperado:**
```json
{
  "meta_trimestral": "string",
  "insights": {
    "foco_principal": "string",
    "ritmo": "string",
    "complexidade": "string"
  },
  "meses": [
    {
      "numero": 1,
      "titulo": "string",
      "objetivo": "string",
      "semanas": [
        {
          "numero": 1,
          "foco": "string",
          "dias": [
            {
              "dia": 1,
              "tarefas": [
                {
                  "categoria": "treino|alimentacao|habito|mindset|social",
                  "titulo": "string",
                  "descricao": "string",
                  "concluida": false
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 4. Mobile — Arquivos Criados/Modificados

### 4.1 Novos Arquivos

| Arquivo | Caminho | Descrição |
|---------|---------|-----------|
| `planStore.ts` | `mobile/src/store/planStore.ts` | Zustand store: `generatePlan()`, `getDailyGoals(day,week,month)`, `getMonth()`, estado de loading/error |
| `planService.ts` | `mobile/src/services/api/planService.ts` | Chamada axios `POST /planning/generate-plan` |
| `PlanLoadingScreen.tsx` | `mobile/src/screens/onboarding/PlanLoadingScreen.tsx` | Tela de loading com ícone pulsante, mensagens rotativas, barra de progresso, tratamento de erro |

### 4.2 Arquivos Modificados

| Arquivo | Mudança |
|---------|---------|
| `OnboardingScreen.tsx` | Step 27: chama `usePlanStore.generatePlan(allAnswers)`, navega para `PlanLoading`, botão "Finalizar" no último step |
| `PlanGeneratedScreen.tsx` | Reescrito para usar dados reais do `planStore`: insights (foco, ritmo, complexidade), títulos dos meses, semanas do mês 1, pontos-chave dos meses 2-3 |
| `HomeScreen.tsx` | `DailyGoalsCard` usa `usePlanStore.getDailyGoals()` quando plano existe, fallback para mock data |
| `AppNavigator.tsx` | Adicionou rota `PlanLoading` entre `Onboarding` e `PlanGenerated` |
| `navigation.ts` | Adicionou `PlanLoading: undefined` ao `RootStackParamList` |
| `client.ts` | Timeout aumentado de 10s para 90s (geração de IA pode demorar) |

### 4.3 Tipos do planStore

```typescript
interface PlanState {
  plan: PlanData | null;
  planId: string | null;
  isGenerating: boolean;
  error: string | null;
  generatePlan: (quizAnswers: Record<string, any>, userId?: string) => Promise<void>;
  setPlan: (plan: PlanData) => void;
  clearPlan: () => void;
  getDailyGoals: (day?: number, week?: number, month?: number) => PlanTask[];
  getMonth: (monthNumber: number) => PlanMonth | null;
}
```

### 4.4 Fluxo de Navegação Atualizado

```
Onboarding (step 27 "Finalizar")
  → PlanLoading (animação + aguarda API)
    → PlanGenerated (mostra plano real)
      → "ATIVAR MEU PLANO" → setOnboardingCompleted(true)
        → MainTabs (HomeScreen com DailyGoals reais)
```

---

## 5. Banco de Dados (Supabase)

### SQL executado manualmente:

```sql
CREATE TABLE public.plans (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Configuração Prisma 7

### Pontos importantes:
- **Prisma 7.4.0** remove `url` do `schema.prisma` — conexão vai no `prisma.config.ts`
- `prisma.config.ts` na raiz do backend configura `datasource.url` via `process.env.DATABASE_URL`
- `prisma generate` local pode falhar por conflitos de config — **não afeta Railway** (client já foi gerado)
- `tsconfig.build.json` exclui `prisma.config.ts` do build NestJS

### Arquivo `prisma.config.ts`:
```typescript
import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
```

---

## 7. Variáveis de Ambiente Necessárias

### Backend (`.env` / Railway)
```
ANTHROPIC_API_KEY=sk-ant-... # Já configurado
DATABASE_URL=postgresql://...  # Já configurado
```

### Mobile (`.env`)
```
EXPO_PUBLIC_API_URL=https://[app].railway.app  # URL do backend no Railway
```

---

## 8. Verificação e Status

| Item | Status |
|------|--------|
| `npx nest build` | ✅ Compila sem erros |
| Tabela `plans` no Supabase | ✅ Criada |
| Prisma Client gerado com modelo `Plan` | ✅ |
| `planStore.ts` criado | ✅ |
| `PlanLoadingScreen.tsx` criado | ✅ |
| `OnboardingScreen` step 27 wired | ✅ |
| `PlanGeneratedScreen` com dados reais | ✅ |
| `HomeScreen` com DailyGoals reais | ✅ |
| Deploy no Railway | ⏳ Pendente push |
| Teste E2E no Expo Go | ⏳ Pendente deploy |

---

## 9. Próximos Passos

1. **Deploy:** Push do código → Railway rebuild automático
2. **Teste E2E:** Completar quiz → verificar loading → verificar plano gerado com dados reais
3. **GoalsScreen:** Atualizar views Daily/Weekly/Monthly/Annual para usar dados do `planStore`
4. **Background Job:** Implementar geração em background do plano completo do primeiro ano após onboarding
5. **Scheduler:** Transição automática de meses e geração de plano do próximo mês
