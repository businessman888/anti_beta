# Contexto: Relatório Alpha Semanal & Histórico de Testo

Este documento detalha a implementação da funcionalidade de "Relatório Alpha Semanal" (Weekly Insights) e o Gráfico de Histórico, centralizados na `TestoScreen` do aplicativo e integrados ao backend NestJS.

## Visão Geral

A funcionalidade tem como objetivo compilar os dados do usuário (obtidos via Quiz Diário e Checklist de Hábitos) ao longo da semana e gerar - via IA (Claude) - um relatório de melhorias prático e direto ("Tough Love"), além de definir um objetivo e uma porcentagem de progresso para a próxima semana. A tela também inclui um gráfico dinâmico desenhado em SVG que reflete a pontuação do usuário ao longo de 7 ou 30 dias.

## 1. Banco de Dados (PostgreSQL + Prisma)

Foi criada a tabela `weekly_insights` para fazer o cache do relatório gerado e evitar múltiplas chamadas à API da Anthropic durante a semana.

**Modelo Prisma (`schema.prisma`):**
```prisma
model WeeklyInsight {
  id                    String   @id @default(uuid()) @db.Uuid
  userId                String   @map("user_id") @db.Uuid
  weekStartDate         DateTime @map("week_start_date") @db.Date
  pointsOfImprovement   Json     @map("points_of_improvement") // Array of strings
  nextObjectiveTitle    String   @map("next_objective_title")
  nextObjectivePercent  Int      @map("next_objective_percent")
  createdAt             DateTime @default(now()) @map("created_at")

  @@unique([userId, weekStartDate])
  @@map("weekly_insights")
}
```

*Nota:* Foi essencial o uso dos decoradores `@map` para garantir o padrão `snake_case` no Supabase e evitar erros de coluna não encontrada (e.g., Error P2022).

## 2. Backend (NestJS)

O backend possui o `InsightsModule`, composto por um controller protegido e um service que se comunica com a IA.

### 2.1 Insights Controller (`insights.controller.ts`)
- **Rota:** `GET /insights/weekly`
- **Autenticação:** Protegido pelo `JwtAuthGuard` (localizado em `src/shared/guards/jwt-auth.guard.ts`), que valida o token JWT nativamente diretamente contra a API do Supabase Auth e anexa o usuário ao `Request` (`req.user`). O ID do usuário não trafega pela URL por questões de segurança.

### 2.2 Insights Service (`insights.service.ts`)
1. **Identificação da Semana:** Determina a segunda-feira da semana atual (`startOfWeek`).
2. **Cache:** Verifica se já existe um `WeeklyInsight` salvo para aquele usuário e aquela semana. Se existir, retorna os dados imediatamente.
3. **Regra de Dia da Semana:** Se *não* for Domingo (`day !== 0`) e o relatório ainda não existir, a API **não** aciona a geração por IA. Em vez disso, ela retorna um objeto JSON de fallback com status `'waiting'` para informar o front-end que a semana ainda está em andamento.
4. **Coleta de Dados:** Se for Domingo, recupera os dados dos últimos 7 dias nas tabelas `daily_stats` e `daily_completions`.
5. **Regra de Consistência:** Exige um mínimo de 3 dias distintos de dados na semana. Se não for atingido, a API retorna um fallback informando o usuário sobre dados insuficientes.
6. **Integração IA:** Utiliza `@anthropic-ai/sdk` com o modelo `claude-3-5-haiku-20241022` formatando um JSON estruturado.
7. **Tratamento de Erros:** Engloba a chamada da IA com um `try/catch`. Caso o modelo da Anthropic falhe, também retorna um fallback JSON ("Erro no servidor de IA") no lugar de estourar um HTTP 500 fatal.
8. **Persistência:** Salva ou atualiza a instrução no Prisma e envia para o mobile.

## 3. Frontend (React Native - Expo)

O consumo da API e o mapeamento UI foram incorporados à arquitetura existente do app.

### 3.1 Gerenciamento de Estado (`progressStore.ts`)
- **Tipagem:** 
  ```typescript
  export interface WeeklyInsight {
      id: string;
      status?: string;
      pointsOfImprovement: string[];
      nextObjectiveTitle: string;
      nextObjectivePercent: number;
  }
  ```
- **Fetch:** A função `fetchWeeklyInsights()` consome diretamente o endpoint `/insights/weekly` do backend (sem ID na rota), contando que o `apiClient` está injetando o Header de `Authorization` dinamicamente com o token da sessão local (`authStore`).
- **Safety Checks:** Aplica validações como `Array.isArray()` no array `pointsOfImprovement` na resposta, garantindo resiliência no lado do cliente.

### 3.2 UI (`TestoScreen.tsx`)
- **Renderização Dinâmica:** Os modais (Card de "Melhorias" e Botão Dropdown "Próximo Objetivo") observam os estados `isInsightLoading`, `insightError` e a constância do array `weeklyInsight` retornados pela `progressStore`.
- **Loading UI:** Substitui o layout por `ActivityIndicator` acompanhado da frase `"Analisando sua semana..."` durante o fetch.
- **Gráfico de Histórico:** O React Native SVG desenha um `<Path />` percorrendo a array `historyStats` retornada (Seja mensal ou semanal, trocado pelas Tab bars no topo do gráfico). Esse progresso é mapeado em Y sendo o limite numérico (100) refletido visualmente. E logo abaixo é calculado o delta em String (e.g. `+24% na semana`).
