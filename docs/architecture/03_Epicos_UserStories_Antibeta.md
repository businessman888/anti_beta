# ÉPICOS E USER STORIES - ANTIBETA

**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Autor:** NEO - Agente Especialista em Documentação Técnica  
**Metodologia:** Scrum + Lean Inception

---

## ÍNDICE

1. [Visão Geral e Metodologia](#1-visão-geral-e-metodologia)
2. [Product Backlog - Épicos](#2-product-backlog---épicos)
3. [Sprint Planning - User Stories Detalhadas](#3-sprint-planning---user-stories-detalhadas)
4. [Critérios de Aceitação](#4-critérios-de-aceitação)
5. [Definition of Done](#5-definition-of-done)
6. [Estimativas e Priorização](#6-estimativas-e-priorização)

---

## 1. VISÃO GERAL E METODOLOGIA

### 1.1 Estrutura Hierárquica

```
TEMA
  └─ ÉPICO
      └─ USER STORY
          └─ TASK (técnica)
              └─ SUBTASK
```

**Exemplo:**
```
TEMA: Gamificação
  └─ ÉPICO: Sistema de Badges
      └─ US: Como usuário, quero desbloquear badges ao atingir marcos
          └─ TASK: Implementar lógica de desbloqueio
              └─ SUBTASK: Criar trigger no Supabase
              └─ SUBTASK: Endpoint POST /badges/unlock
```

### 1.2 Formato de User Story

```
Como [persona],
Eu quero [ação/feature],
Para que [benefício/valor].

Critérios de Aceitação:
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

Estimativa: X story points
Prioridade: Alta/Média/Baixa
Sprint: #N
```

### 1.3 Estimativa (Planning Poker - Fibonacci)

| Story Points | Complexidade | Tempo Estimado |
|--------------|--------------|----------------|
| 1 | Trivial | 1-2h |
| 2 | Simples | 2-4h |
| 3 | Moderada | 4-8h (1 dia) |
| 5 | Complexa | 1-2 dias |
| 8 | Muito Complexa | 2-3 dias |
| 13 | Extremamente Complexa | 3-5 dias |
| 21 | Épico (deve ser quebrado) | >1 semana |

**Velocity Target:** 40-50 story points por sprint (2 semanas)

---

## 2. PRODUCT BACKLOG - ÉPICOS

### TEMA 1: AUTENTICAÇÃO E ONBOARDING

#### ÉPICO 1.1: Autenticação de Usuários
**Descrição:** Sistema completo de sign-up, login, recuperação de senha  
**Valor de Negócio:** Crítico - Porta de entrada do produto  
**Estimativa Total:** 13 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-001: Sign-up com email e senha
- US-002: Login com credenciais
- US-003: Recuperação de senha
- US-004: Logout

---

#### ÉPICO 1.2: Quiz de Onboarding Personalizado
**Descrição:** 28 perguntas em 5 seções para mapear perfil do usuário  
**Valor de Negócio:** Crítico - Diferencial competitivo (personalização)  
**Estimativa Total:** 21 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-005: Tela de boas-vindas e início do quiz
- US-006: Seção 1 - Identificação e Contexto (5 perguntas)
- US-007: Seção 2 - Diagnóstico Comportamental (8 perguntas)
- US-008: Seção 3 - Estado Físico (5 perguntas)
- US-009: Seção 4 - Relacionamentos (6 perguntas)
- US-010: Seção 5 - Metas e Objetivos (4 perguntas)
- US-011: Validação e persistência de respostas
- US-012: Barra de progresso e navegação

---

#### ÉPICO 1.3: Geração de Plano Personalizado
**Descrição:** IA analisa onboarding e gera plano anual + mês 1 semana 1  
**Valor de Negócio:** Crítico - Core value proposition  
**Estimativa Total:** 13 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-013: Integração com Agente de Planejamento (Claude)
- US-014: Geração de meta anual
- US-015: Breakdown em 12 metas mensais
- US-016: Geração de Semana 1 detalhada (7 dias)
- US-017: Preview de 3 dias para usuário

---

### TEMA 2: MONETIZAÇÃO

#### ÉPICO 2.1: Sistema de Paywall
**Descrição:** Superwall integration com 3 tiers e trial de 7 dias  
**Valor de Negócio:** Crítico - Receita  
**Estimativa Total:** 13 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-018: Integração com Superwall SDK
- US-019: Configuração de 3 tiers (Básico, Pro, Alpha)
- US-020: Trial de 7 dias grátis
- US-021: Bloqueio de features por tier
- US-022: Webhook de conversão (Stripe/Apple/Google)

---

#### ÉPICO 2.2: Gestão de Assinaturas
**Descrição:** Backend valida status, gerencia upgrades/downgrades  
**Valor de Negócio:** Alto - Retenção e upsell  
**Estimativa Total:** 8 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-023: Tabela de assinaturas no Supabase
- US-024: Middleware de validação de tier
- US-025: Flow de upgrade de tier
- US-026: Cancelamento de assinatura

---

### TEMA 3: SISTEMA DE METAS

#### ÉPICO 3.1: Hierarquia de Metas
**Descrição:** Anual → Mensal → Semanal → Diário  
**Valor de Negócio:** Crítico - Core do produto  
**Estimativa Total:** 21 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-027: Modelo de dados (goals_annual, monthly, weekly, daily)
- US-028: Visualização de metas anuais
- US-029: Drill-down: ano → mês → semana → dia
- US-030: Geração progressiva de planos semanais
- US-031: Geração de planos mensais + feedback

---

#### ÉPICO 3.2: Dashboard de Metas Diárias
**Descrição:** Home com cards de treino, alimentação, hidratação, práticas  
**Valor de Negócio:** Alto - Engajamento diário  
**Estimativa Total:** 21 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-032: Card de nível de testosterona
- US-033: Card de metas do dia (overview)
- US-034: Card de treino com navegação
- US-035: Card de alimentação com checkboxes
- US-036: Card de hidratação com slider
- US-037: Card de práticas de testosterona
- US-038: Card de quiz diário

---

#### ÉPICO 3.3: Plano de Treino Mensal
**Descrição:** Agente gera treino adaptado (ABC, ABCD, etc.)  
**Valor de Negócio:** Alto - Diferencial vs apps genéricos  
**Estimativa Total:** 13 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-039: Tela de treino detalhado
- US-040: Lista de exercícios com séries/reps
- US-041: Cronômetro global de treino
- US-042: Conclusão de treino e registro de tempo
- US-043: Geração de plano mensal pela IA

---

#### ÉPICO 3.4: Plano Alimentar Semanal
**Descrição:** Agente gera 3-4 receitas que se alternam  
**Valor de Negócio:** Médio - Complemento ao treino  
**Estimativa Total:** 8 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-044: Modelo de dados (meal_plans, meals)
- US-045: Geração de plano semanal pela IA
- US-046: Visualização de receitas com ingredientes
- US-047: Checkboxes de refeições completadas

---

### TEMA 4: TRACKING E PROGRESSO

#### ÉPICO 4.1: Cálculo de Nível de Testosterona
**Descrição:** Fórmula baseada em 8 variáveis ponderadas  
**Valor de Negócio:** Alto - Métrica gamificada central  
**Estimativa Total:** 8 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-048: Implementar fórmula de cálculo
- US-049: Atualização em tempo real ao completar tasks
- US-050: Histórico semanal/mensal
- US-051: Animação de mudança de nível

---

#### ÉPICO 4.2: Quiz Diário de Vícios
**Descrição:** 5-8 perguntas personalizadas ao final do dia  
**Valor de Negócio:** Alto - Accountability e dados para IA  
**Estimativa Total:** 8 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-052: Modelo de perguntas personalizadas
- US-053: Tela de quiz com perguntas sim/não
- US-054: Notificações de lembrete (21h, 22h, 23h)
- US-055: Persistência e impacto no nível de testo

---

#### ÉPICO 4.3: Tracking de Tela (Android)
**Descrição:** Monitoramento passivo de tempo em apps  
**Valor de Negócio:** Médio - Diferencial para accountability  
**Estimativa Total:** 13 story points  
**Prioridade:** P2 (Medium)

**User Stories:**
- US-056: Permissão PACKAGE_USAGE_STATS
- US-057: Background service de tracking
- US-058: Notificações em thresholds (1h, 2h, 3h+)
- US-059: Impacto no nível de testosterona
- US-060: iOS - Auto-relato via quiz diário

---

### TEMA 5: GAMIFICAÇÃO

#### ÉPICO 5.1: Sistema de Badges
**Descrição:** 36 badges em 6 categorias com 4 raridades  
**Valor de Negócio:** Alto - Motivação e retenção  
**Estimativa Total:** 13 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-061: Modelo de dados (badges, user_badges)
- US-062: Lógica de desbloqueio automático
- US-063: Notificação push instantânea
- US-064: Modal de conquista com animação
- US-065: Galeria de badges no perfil

---

#### ÉPICO 5.2: Ranking por Cohort
**Descrição:** Ranking híbrido (testo + pontos) segmentado por mês de início  
**Valor de Negócio:** Alto - Social proof e competição  
**Estimativa Total:** 13 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-066: Modelo de cohorts e cálculo de score
- US-067: Tela de ranking (Meu Cohort + Global)
- US-068: Realtime updates via WebSocket
- US-069: Notificação de mudança de posição
- US-070: Cron job de recálculo diário

---

#### ÉPICO 5.3: Sistema de Pontos
**Descrição:** Pontuação por atividades (metas, treinos, streaks, badges)  
**Valor de Negócio:** Médio - Complemento ao ranking  
**Estimativa Total:** 5 story points  
**Prioridade:** P2 (Medium)

**User Stories:**
- US-071: Tabela de pontos por atividade
- US-072: Incremento automático ao completar ações
- US-073: Visualização de histórico de pontos

---

### TEMA 6: AGENTES DE IA

#### ÉPICO 6.1: Agente Conversacional (Voz)
**Descrição:** Pipeline STT → Claude → TTS com personalidade Tough Love  
**Valor de Negócio:** Crítico - Diferencial competitivo único  
**Estimativa Total:** 21 story points  
**Prioridade:** P0 (Blocker)

**User Stories:**
- US-074: Gravação de áudio (Expo AV)
- US-075: Upload para Supabase Storage
- US-076: Integração Deepgram STT
- US-077: Integração Claude 3.5 Haiku
- US-078: Prompt Engineering (Tough Love)
- US-079: Integração Google Cloud TTS
- US-080: Reprodução de resposta em áudio
- US-081: Histórico de conversas
- US-082: Rate limiting por tier

---

#### ÉPICO 6.2: Dicas Semanais e Mensais
**Descrição:** Semanal estruturada + mensal interativa  
**Valor de Negócio:** Médio - Engajamento e retenção  
**Estimativa Total:** 13 story points  
**Prioridade:** P2 (Medium)

**User Stories:**
- US-083: Geração de dica semanal (cron domingo 22h)
- US-084: Card de dica na home
- US-085: Tela de visualização de dica
- US-086: Geração de dica mensal interativa
- US-087: Fluxo de perguntas e plano de ação

---

#### ÉPICO 6.3: Scanner de Conversas (Fase 2)
**Descrição:** OCR + análise de temperatura beta  
**Valor de Negócio:** Alto - Feature exclusiva  
**Estimativa Total:** 21 story points  
**Prioridade:** P3 (Low - Fase 2)

**User Stories:**
- US-088: Upload de screenshot
- US-089: Integração Google Vision API (OCR)
- US-090: Agente Scanner (Claude)
- US-091: Tela de análise detalhada
- US-092: Rate limiting por tier (5/15/30)

---

### TEMA 7: NOTIFICAÇÕES

#### ÉPICO 7.1: Sistema de Notificações Estratégicas
**Descrição:** 8 tipos de notificações com timing otimizado  
**Valor de Negócio:** Alto - Retenção e engagement  
**Estimativa Total:** 13 story points  
**Prioridade:** P1 (High)

**User Stories:**
- US-093: Integração OneSignal
- US-094: Notificação matinal (metas do dia)
- US-095: Lembretes de hidratação
- US-096: Lembrete de treino
- US-097: Quiz diário + lembretes
- US-098: Tracking de tela
- US-099: Badge desbloqueado
- US-100: Ranking update
- US-101: Dica disponível
- US-102: Configurações de notificações

---

### TEMA 8: PERFIL E CONFIGURAÇÕES

#### ÉPICO 8.1: Perfil de Usuário
**Descrição:** Visualização e edição de dados pessoais  
**Valor de Negócio:** Baixo - Hygiene feature  
**Estimativa Total:** 5 story points  
**Prioridade:** P2 (Medium)

**User Stories:**
- US-103: Tela de perfil
- US-104: Edição de nome, foto, idade
- US-105: Histórico de assinatura
- US-106: Deletar conta

---

## 3. SPRINT PLANNING - USER STORIES DETALHADAS

### SPRINT 1 (Semanas 1-2): Fundação

**Objetivo:** Autenticação + Onboarding funcional + Geração de plano  
**Capacity:** 45 story points

---

#### US-001: Sign-up com Email e Senha

**Como** novo usuário,  
**Eu quero** criar uma conta com email e senha,  
**Para que** eu possa acessar o aplicativo.

**Critérios de Aceitação:**
- [ ] Tela de sign-up com campos: email, senha, confirmar senha
- [ ] Validação: email válido, senha mínimo 8 caracteres
- [ ] Integração com Supabase Auth
- [ ] Email de confirmação enviado
- [ ] Redirecionamento para onboarding após confirmação
- [ ] Mensagens de erro claras (email já cadastrado, senha fraca, etc.)

**Estimativa:** 3 story points  
**Prioridade:** P0  
**Dependências:** Setup de Supabase Auth

**Tasks Técnicas:**
- [ ] Setup Supabase Auth no projeto
- [ ] Criar tela de SignUp (React Native)
- [ ] Implementar validações de formulário (React Hook Form)
- [ ] Integração com Supabase signUp()
- [ ] Testes unitários de validação
- [ ] Testes de integração com Supabase

---

#### US-002: Login com Credenciais

**Como** usuário cadastrado,  
**Eu quero** fazer login com email e senha,  
**Para que** eu possa acessar minhas metas e progresso.

**Critérios de Aceitação:**
- [ ] Tela de login com campos: email, senha
- [ ] Validação de campos obrigatórios
- [ ] Integração com Supabase Auth
- [ ] JWT token armazenado localmente (AsyncStorage)
- [ ] Redirecionamento para home se já tiver completado onboarding
- [ ] Redirecionamento para onboarding se ainda não completou
- [ ] Mensagens de erro (credenciais inválidas, email não confirmado)

**Estimativa:** 2 story points  
**Prioridade:** P0  
**Dependências:** US-001

**Tasks Técnicas:**
- [ ] Criar tela de Login
- [ ] Integração com Supabase signInWithPassword()
- [ ] Armazenamento de JWT no AsyncStorage
- [ ] Navegação condicional (onboarding vs home)
- [ ] Testes de fluxo de login

---

#### US-005: Tela de Boas-vindas e Início do Quiz

**Como** novo usuário que acabou de se cadastrar,  
**Eu quero** ver uma tela de boas-vindas que explica o quiz,  
**Para que** eu entenda o que será perguntado e por quê.

**Critérios de Aceitação:**
- [ ] Tela com título: "Bem-vindo ao Antibeta"
- [ ] Subtítulo: "Vamos criar seu plano personalizado de transformação"
- [ ] Texto explicativo: "Responda 28 perguntas (8-12 minutos) para recebermos um plano exclusivo para você"
- [ ] Botão CTA: "Começar Quiz"
- [ ] Animação de entrada suave

**Estimativa:** 1 story point  
**Prioridade:** P0  
**Dependências:** US-002

---

#### US-006: Seção 1 - Identificação e Contexto (5 perguntas)

**Como** usuário no onboarding,  
**Eu quero** responder perguntas sobre meu perfil básico,  
**Para que** o app possa me conhecer melhor.

**Critérios de Aceitação:**
- [ ] Tela 1: Nome completo (input text)
- [ ] Tela 2: Idade (number picker 18-40)
- [ ] Tela 3: Situação profissional (6 opções múltipla escolha)
- [ ] Tela 4: Horas disponíveis/dia (slider 0-8h, incrementos 0.5h)
- [ ] Tela 5: Renda mensal (7 opções + "Prefiro não informar")
- [ ] Navegação: botão "Próxima" e "Voltar"
- [ ] Barra de progresso: 0% → 17.8% (5/28 perguntas)
- [ ] Auto-save ao avançar cada pergunta

**Estimativa:** 3 story points  
**Prioridade:** P0  
**Dependências:** US-005

**Tasks Técnicas:**
- [ ] Componente QuestionScreen reutilizável
- [ ] Componentes de input: TextInput, NumberPicker, Slider, MultipleChoice
- [ ] Lógica de navegação entre perguntas
- [ ] Progress bar component
- [ ] Auto-save no Supabase (tabela user_onboarding)

---

#### US-007: Seção 2 - Diagnóstico Comportamental (8 perguntas)

**Como** usuário no onboarding,  
**Eu quero** responder perguntas sobre meus vícios e hábitos,  
**Para que** o app possa identificar áreas de melhoria.

**Critérios de Aceitação:**
- [ ] P6: Autoestima (Likert 1-10)
- [ ] P7: Frequência pornografia (5 opções)
- [ ] P8: Frequência masturbação (5 opções)
- [ ] P9: Horas em redes sociais (5 opções)
- [ ] P10: Uso de substâncias (seleção múltipla + frequência)
- [ ] P11: Horas de sono (slider 3-12h)
- [ ] P12: Qualidade do sono (Likert 1-10)
- [ ] P13: Alimentação atual (4 opções)
- [ ] Barra de progresso: 17.8% → 46.4%
- [ ] Validação: P6, P12 são obrigatórias

**Estimativa:** 5 story points  
**Prioridade:** P0  
**Dependências:** US-006

---

#### US-013: Integração com Agente de Planejamento (Claude)

**Como** sistema backend,  
**Eu quero** enviar respostas do onboarding para Claude,  
**Para que** o agente possa analisar e gerar um plano personalizado.

**Critérios de Aceitação:**
- [ ] Endpoint POST /ai/generate-plan
- [ ] Input: user_id (busca respostas do onboarding no Supabase)
- [ ] Integração com Anthropic API (Claude 3.5 Haiku)
- [ ] System prompt do Agente de Planejamento configurado
- [ ] Prompt caching habilitado (contexto do onboarding)
- [ ] Output: JSON estruturado com meta anual + 12 meses + semana 1
- [ ] Timeout: 30s (gera erro se exceder)
- [ ] Retry logic (3 tentativas se API falhar)
- [ ] Logging de custo (tokens in/out)

**Estimativa:** 8 story points  
**Prioridade:** P0  
**Dependências:** US-011 (onboarding completo)

**Tasks Técnicas:**
- [ ] Setup Anthropic SDK no NestJS
- [ ] Criar módulo AIModule
- [ ] Service: PlanningAgentService
- [ ] Método generateAnnualPlan(userId)
- [ ] Buscar dados do onboarding (Supabase)
- [ ] Construir prompt com contexto
- [ ] Enviar para Claude 3.5 Haiku
- [ ] Parsear JSON de resposta
- [ ] Validar estrutura do JSON
- [ ] Salvar plano no Supabase (goals_annual, goals_monthly, goals_weekly, goals_daily, tasks_daily)
- [ ] Testes unitários do service
- [ ] Testes de integração com Claude API (mock)

---

#### US-017: Preview de 3 Dias para Usuário

**Como** usuário que completou o onboarding,  
**Eu quero** ver um preview do meu plano personalizado,  
**Para que** eu decida se quero assinar.

**Critérios de Aceitação:**
- [ ] Tela "Seu Plano de Transformação"
- [ ] Mostra meta anual em destaque
- [ ] Mostra objetivo do Mês 1
- [ ] Mostra objetivos da Semana 1
- [ ] Cards dos Dias 1-3: metas detalhadas (treino, alimentação, etc) visíveis
- [ ] Cards dos Dias 4-7: blur + ícone de cadeado + texto "Desbloqueie o plano completo"
- [ ] Botão CTA: "Desbloquear Plano Completo"
- [ ] Scroll suave entre dias

**Estimativa:** 5 story points  
**Prioridade:** P0  
**Dependências:** US-016

**Tasks Técnicas:**
- [ ] Tela PlanPreviewScreen
- [ ] Componente GoalCard (reutilizável)
- [ ] Componente LockedDayCard
- [ ] Lógica de renderização condicional (dias 1-3 vs 4-7)
- [ ] Animação de blur e cadeado
- [ ] Navegação para paywall ao clicar no CTA

---

#### US-018: Integração com Superwall SDK

**Como** sistema mobile,  
**Eu quero** integrar o Superwall SDK,  
**Para que** eu possa exibir paywalls configuráveis.

**Critérios de Aceitação:**
- [ ] Superwall SDK instalado no React Native
- [ ] Configuração de API key
- [ ] Paywall configurado no dashboard do Superwall (3 tiers)
- [ ] Trigger de paywall funcionando (evento "plan_preview_unlock")
- [ ] Callback de conversão configurado
- [ ] Teste A/B de copy habilitado

**Estimativa:** 5 story points  
**Prioridade:** P0  
**Dependências:** Nenhuma (paralelo)

**Tasks Técnicas:**
- [ ] npm install @superwall/react-native-superwall
- [ ] Configurar Superwall.configure() no App.tsx
- [ ] Criar paywalls no dashboard Superwall
- [ ] Implementar Superwall.trigger('plan_preview_unlock')
- [ ] Implementar callback onPurchase
- [ ] Testar fluxo completo (sandbox)

---

**Sprint 1 Total:** 45 story points ✅

---

### SPRINT 2 (Semanas 3-4): Core Features - Metas e Dashboard

**Objetivo:** Sistema de metas completo + Home dashboard  
**Capacity:** 48 story points

---

#### US-027: Modelo de Dados (goals_annual, monthly, weekly, daily)

**Como** desenvolvedor backend,  
**Eu quero** criar o schema completo de metas,  
**Para que** o sistema possa armazenar a hierarquia anual → diário.

**Critérios de Aceitação:**
- [ ] Tabela goals_annual criada
- [ ] Tabela goals_monthly criada (FK para goals_annual)
- [ ] Tabela goals_weekly criada (FK para goals_monthly)
- [ ] Tabela goals_daily criada (FK para goals_weekly)
- [ ] Tabela tasks_daily criada (FK para goals_daily)
- [ ] Tabela workout_plans criada
- [ ] Tabela workouts criada (FK para workout_plans)
- [ ] Tabela meal_plans criada
- [ ] Tabela meals criada (FK para meal_plans)
- [ ] Tabela testo_practices criada (pré-populada com 30 práticas)
- [ ] Row Level Security (RLS) configurado
- [ ] Migrations testadas

**Estimativa:** 5 story points  
**Prioridade:** P0  
**Dependências:** Supabase configurado

**Tasks Técnicas:**
- [ ] Escrever migration SQL (Prisma ou SQL direto)
- [ ] Criar models no Prisma (se usado)
- [ ] Configurar RLS policies
- [ ] Seed de testo_practices (30 registros)
- [ ] Rodar migration em dev
- [ ] Validar schema

---

#### US-032: Card de Nível de Testosterona

**Como** usuário,  
**Eu quero** ver meu nível de testosterona na home,  
**Para que** eu saiba meu progresso geral.

**Critérios de Aceitação:**
- [ ] Card destacado no topo da home
- [ ] Barra de progresso 0-100% com animação
- [ ] Cor da barra varia: 0-30% vermelho, 31-60% amarelo, 61-85% laranja, 86-100% verde
- [ ] Texto: "Nível de Testo: XX%"
- [ ] Ícone de fogo 🔥 se >75%
- [ ] Ao tocar, expande e mostra breakdown dos componentes (NoFap 15%, Treino 20%, etc)
- [ ] Animação suave ao atualizar valor

**Estimativa:** 5 story points  
**Prioridade:** P0  
**Dependências:** US-027, US-048 (cálculo de testo)

**Tasks Técnicas:**
- [ ] Componente TestoLevelCard
- [ ] Integração com API GET /tracking/testo-level
- [ ] Animação de barra (Reanimated)
- [ ] Modal de breakdown ao tocar
- [ ] Lógica de cores baseada em threshold

---

#### US-033: Card de Metas do Dia (Overview)

**Como** usuário,  
**Eu quero** ver um resumo das minhas metas do dia,  
**Para que** eu saiba o que preciso fazer hoje.

**Critérios de Aceitação:**
- [ ] Card com título "Metas de Hoje"
- [ ] Mostra 5 categorias: Treino, Alimentação, Hidratação, Práticas Testo, Quiz
- [ ] Cada categoria: ícone + nome + status (pendente/em progresso/concluído)
- [ ] Ícone de check verde se concluída
- [ ] Botão "Ver Todas as Metas" (navega para tela detalhada)
- [ ] Percentual de conclusão: "3/5 metas (60%)"

**Estimativa:** 3 story points  
**Prioridade:** P0  
**Dependências:** US-027

---

#### US-034: Card de Treino com Navegação

**Como** usuário,  
**Eu quero** ver qual treino tenho hoje e acessá-lo rapidamente,  
**Para que** eu possa executar meu treino.

**Critérios de Aceitação:**
- [ ] Card com título do treino (ex: "Treino A - Peito e Tríceps")
- [ ] Subtítulo: número de exercícios (ex: "6 exercícios")
- [ ] Status: "Pendente" (botão azul) ou "Concluído ✅ 45min" (verde)
- [ ] Botão "Ver Treino" (navega para WorkoutScreen)
- [ ] Se não houver treino hoje: "Dia de descanso 😴"

**Estimativa:** 3 story points  
**Prioridade:** P0  
**Dependências:** US-027, US-039 (tela de treino)

---

#### US-039: Tela de Treino Detalhado

**Como** usuário,  
**Eu quero** ver meus exercícios com séries e reps,  
**Para que** eu possa executar o treino.

**Critérios de Aceitação:**
- [ ] Header: nome do treino + ícone de voltar
- [ ] Lista de 4-6 exercícios
- [ ] Cada exercício: nome, séries, reps, descanso, checkbox
- [ ] Cronômetro global no topo (00:00)
- [ ] Cronômetro inicia ao marcar primeiro exercício
- [ ] Botão "Concluir Treino" (disabled se algum exercício não marcado)
- [ ] Ao concluir: modal de confirmação + salva tempo total
- [ ] Marca treino como concluído na home
- [ ] Atualiza barra de testo

**Estimativa:** 8 story points  
**Prioridade:** P0  
**Dependências:** US-027, US-040

**Tasks Técnicas:**
- [ ] Tela WorkoutScreen
- [ ] Componente ExerciseItem
- [ ] Lógica de cronômetro (useEffect + setInterval)
- [ ] Lógica de validação (todos exercícios marcados?)
- [ ] Endpoint PATCH /workouts/:id/complete
- [ ] Atualização do card na home (Zustand state update)
- [ ] Recálculo de testo no backend

---

#### US-048: Implementar Fórmula de Cálculo de Testosterona

**Como** sistema backend,  
**Eu quero** calcular o nível de testosterona do usuário,  
**Para que** ele veja seu progresso gamificado.

**Critérios de Aceitação:**
- [ ] Fórmula implementada: NoFap(15%) + Treino(20%) + Alimentação(15%) + Sono(15%) + Hidratação(5%) + Práticas(10%) + Ausência Vícios(5%) + Tempo Tela(5%)
- [ ] Cálculo roda ao completar qualquer task
- [ ] Endpoint GET /tracking/testo-level retorna % atual
- [ ] Histórico semanal/mensal armazenado (tabela testo_history)
- [ ] Cron job diário (1h) para snapshot

**Estimativa:** 5 story points  
**Prioridade:** P0  
**Dependências:** US-027

**Tasks Técnicas:**
- [ ] Service: TestoCalculatorService
- [ ] Método calculateLevel(userId, date)
- [ ] Buscar dados de tasks_daily, daily_quiz_responses, tracking de tela
- [ ] Aplicar fórmula ponderada
- [ ] Salvar resultado em user_profiles.testo_level_percent
- [ ] Salvar histórico em testo_history
- [ ] Endpoint GET /tracking/testo-level
- [ ] Testes unitários da fórmula (cenários diversos)

---

**Sprint 2 Total:** 48 story points ✅

---

### SPRINT 3 (Semanas 5-6): Gamificação

[User Stories detalhadas para US-061 a US-073, seguindo mesma estrutura]

---

### SPRINT 4 (Semanas 7-8): Agente Conversacional

[User Stories detalhadas para US-074 a US-082, seguindo mesma estrutura]

---

### SPRINT 5 (Semanas 9-10): Notificações e Polimento

[User Stories detalhadas para US-093 a US-102, seguindo mesma estrutura]

---

### SPRINT 6 (Semanas 11-12): Testes e Lançamento Beta

[User Stories de bug fixes, testes E2E, deploy, etc]

---

## 4. CRITÉRIOS DE ACEITAÇÃO

### 4.1 Critérios Gerais (Todas as User Stories)

- [ ] **Código:** Passa em code review (mínimo 1 aprovação)
- [ ] **Testes:** Coverage mínimo 70% (unitários + integração)
- [ ] **Performance:** Não degrada métricas (<500ms API, <2s tela)
- [ ] **Acessibilidade:** VoiceOver/TalkBack funcionando
- [ ] **Responsividade:** Funciona em iPhone SE, iPhone 15 Pro Max, Android (5.5" a 6.7")
- [ ] **Dark Mode:** Implementado (tema padrão)
- [ ] **Documentação:** Componentes documentados (JSDoc/TSDoc)

### 4.2 Critérios Específicos por Tipo

**Frontend (React Native):**
- [ ] Componente reutilizável criado
- [ ] PropTypes/TypeScript interfaces definidos
- [ ] Snapshot tests criados (Jest)
- [ ] Animações suaves (60fps)

**Backend (NestJS):**
- [ ] Endpoint documentado (Swagger)
- [ ] DTO validation (class-validator)
- [ ] Error handling completo
- [ ] Logs estruturados (Winston)

**IA/Agentes:**
- [ ] System prompt versionado
- [ ] Prompt caching habilitado
- [ ] Retry logic implementado
- [ ] Custo trackado (Mixpanel event)

---

## 5. DEFINITION OF DONE

Uma User Story está **Done** quando:

### 5.1 Code Complete
- [ ] Código escrito e commitado na branch feature/
- [ ] Passa em todos os testes automatizados (CI)
- [ ] Code review aprovado por Tech Lead
- [ ] Merged na branch develop

### 5.2 Tested
- [ ] Testes unitários escritos e passando
- [ ] Testes de integração escritos e passando
- [ ] Testado manualmente em device real (iOS + Android)
- [ ] Testado por QA (se aplicável)
- [ ] Não introduz regressões (smoke tests passando)

### 5.3 Documented
- [ ] README atualizado (se necessário)
- [ ] API documentada no Swagger (se backend)
- [ ] Componente documentado (se frontend)

### 5.4 Deployed
- [ ] Deploy em ambiente de staging
- [ ] Validado pelo Product Owner em staging
- [ ] Pronto para production (gated behind feature flag se necessário)

### 5.5 Accepted
- [ ] Todos os critérios de aceitação atendidos
- [ ] Demo feita para stakeholders (se épico completo)
- [ ] Product Owner aprova formalmente

---

## 6. ESTIMATIVAS E PRIORIZAÇÃO

### 6.1 Velocity Tracking

| Sprint | Planejado (SP) | Entregue (SP) | Velocity Real |
|--------|----------------|---------------|---------------|
| Sprint 1 | 45 | TBD | TBD |
| Sprint 2 | 48 | TBD | TBD |
| Sprint 3 | 45 | TBD | TBD |
| Sprint 4 | 50 | TBD | TBD |
| Sprint 5 | 42 | TBD | TBD |
| Sprint 6 | 35 | TBD | TBD |

**Velocity Esperada:** 40-50 SP por sprint (time de 2-3 devs full-stack)

### 6.2 Priorização (MoSCoW)

**Must Have (MVP Blocker - P0):**
- Autenticação
- Onboarding (28 perguntas)
- Geração de plano
- Paywall
- Sistema de metas (hierarquia completa)
- Dashboard de metas diárias
- Cálculo de testosterona
- Agente conversacional (voz)
- Badges
- Ranking

**Should Have (MVP Nice-to-Have - P1):**
- Plano de treino mensal
- Plano alimentar semanal
- Quiz diário
- Notificações estratégicas
- Dicas semanais/mensais

**Could Have (Pós-MVP - P2):**
- Tracking de tela (Android)
- Perfil de usuário (edição avançada)
- Sistema de pontos detalhado

**Won't Have (Fase 2 - P3):**
- Scanner de conversas
- Auxiliar de teclado
- Bloqueio de apps
- Social features

### 6.3 Burn-down Projetado (MVP - 12 semanas)

```
Story Points Restantes
│
265 ├─┐
    │ └─┐
220 │   └─┐
    │     └─┐
175 │       └─┐
    │         └─┐
130 │           └─┐
    │             └─┐
85  │               └─┐
    │                 └─┐
40  │                   └─┐
    │                     └─┐
0   └─────────────────────────┘
    S1  S2  S3  S4  S5  S6
```

**Total MVP:** ~265 story points  
**Duração:** 6 sprints (12 semanas)  
**Buffer:** 2 semanas (risco e imprevistos)  
**Lançamento Beta:** Semana 14

---

## ANEXOS

### A. Template de User Story

```markdown
## US-XXX: [Título Descritivo]

**Como** [persona],  
**Eu quero** [ação/feature],  
**Para que** [benefício/valor].

**Critérios de Aceitação:**
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

**Estimativa:** X story points  
**Prioridade:** P0/P1/P2/P3  
**Sprint:** #N  
**Dependências:** US-XXX, US-YYY

**Tasks Técnicas:**
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

**Notas:**
- Observações técnicas
- Riscos identificados
- Links úteis (Figma, docs, etc)
```

### B. Quadro Kanban (Estrutura Sugerida)

**Colunas:**
1. **Backlog** - User stories não priorizadas
2. **To Do** - User stories do sprint atual
3. **In Progress** - Em desenvolvimento ativo
4. **Code Review** - Aguardando aprovação
5. **Testing** - QA manual ou automatizado
6. **Done** - Atende Definition of Done

**Swim Lanes (opcional):**
- Frontend
- Backend
- IA/Agentes
- DevOps

---

**Documento criado por NEO - Agente Especialista em Documentação Técnica**  
**Antibeta © 2025 - Sistema Multi-Agente de Desenvolvimento Masculino**
