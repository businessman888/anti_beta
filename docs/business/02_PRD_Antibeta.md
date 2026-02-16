# PRODUCT REQUIREMENTS DOCUMENT (PRD) - ANTIBETA

**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Autor:** NEO - Agente Especialista em Documentação Técnica  
**Status:** Aprovado para Desenvolvimento

---

## ÍNDICE

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Objetivos de Negócio](#2-objetivos-de-negócio)
3. [Público-Alvo e Personas](#3-público-alvo-e-personas)
4. [Proposta de Valor](#4-proposta-de-valor)
5. [Escopo do MVP](#5-escopo-do-mvp)
6. [Requisitos Funcionais Detalhados](#6-requisitos-funcionais-detalhados)
7. [Requisitos Não-Funcionais](#7-requisitos-não-funcionais)
8. [Jornada do Usuário](#8-jornada-do-usuário)
9. [Modelo de Monetização](#9-modelo-de-monetização)
10. [Métricas de Sucesso](#10-métricas-de-sucesso)
11. [Roadmap de Fases](#11-roadmap-de-fases)
12. [Dependências e Riscos](#12-dependências-e-riscos)

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 Problema

Homens jovens da Geração Z (19-25 anos) enfrentam crises de masculinidade, falta de direção e baixa autoestima, manifestadas através de:

- **Vícios comportamentais:** Pornografia, masturbação excessiva, redes sociais (3-6h/dia)
- **Falta de disciplina:** Rotinas desorganizadas, ausência de metas claras
- **Baixo desenvolvimento físico:** Sedentarismo, alimentação ruim, sono inadequado
- **Dificuldades sociais:** Timidez, medo de rejeição, falta de habilidades com mulheres
- **Ausência de orientação:** Sem mentores ou estrutura de accountability

**Dor central:** "Eu sei que preciso mudar, mas não sei por onde começar e sempre desisto sozinho."

### 1.2 Solução

**Antibeta** é um aplicativo mobile gamificado que combina:

1. **IA Personalizada:** 3 agentes especializados (Planejamento, Conversação, Scanner)
2. **Sistema de Metas:** Hierarquia anual → mensal → semanal → diário
3. **Gamificação:** Ranking por cohort, 36 badges, sistema de pontos
4. **Accountability:** Quiz diário, tracking automático, notificações estratégicas
5. **Conhecimento Aplicado:** Dicas baseadas em progresso real, recomendações de livros

### 1.3 Visão de Produto

"Ser o coach de bolso mais eficaz para transformação masculina, combinando ciência comportamental, IA e gamificação para criar homens disciplinados, confiantes e bem-sucedidos."

---

## 2. OBJETIVOS DE NEGÓCIO

### 2.1 Objetivos Primários (12 meses)

| Objetivo | Meta | Prazo |
|----------|------|-------|
| **Aquisição** | 10.000 usuários ativos mensais (MAU) | 12 meses |
| **Conversão** | Taxa de conversão trial → pago ≥ 35% | 6 meses |
| **Retenção** | Retenção D7 ≥ 25%, D30 ≥ 12% | 6 meses |
| **Receita** | MRR de R$ 150.000 (~$30k USD) | 12 meses |
| **Churn** | Churn mensal ≤ 25% | 9 meses |

### 2.2 Objetivos Secundários

- **NPS (Net Promoter Score):** ≥ 50 (excelente para apps de hábitos)
- **App Store Rating:** ≥ 4.5 estrelas
- **Engajamento:** 60% dos usuários ativos completam ≥3 metas diárias
- **Viral Coefficient:** 0.3 (cada usuário traz 0.3 novos usuários organicamente)

### 2.3 KPIs de Produto

| KPI | Definição | Meta |
|-----|-----------|------|
| **DAU/MAU** | Usuários ativos diários / mensais | ≥ 30% |
| **Task Completion Rate** | % de tarefas diárias completadas | ≥ 65% |
| **Voice Conversation Usage** | % de usuários que usam agente por voz | ≥ 40% |
| **Badge Unlock Rate** | Badges desbloqueados/usuário/mês | ≥ 2 |
| **Testo Level Growth** | Crescimento médio de testo/mês | +15% |

---

## 3. PÚBLICO-ALVO E PERSONAS

### 3.1 Segmento Primário

**Demografia:**
- **Gênero:** Masculino (100%)
- **Idade:** 19-25 anos (Geração Z)
- **Classe Social:** B, C, D (renda R$ 1.500 - R$ 5.000/mês)
- **Localização:** Brasil (foco inicial), urbano

**Psicografia:**
- Alta conectividade digital (6-8h/dia em telas)
- Consome conteúdo de "masculinidade" (podcasts, YouTube, TikTok)
- Busca transformação pessoal mas falta disciplina
- Sensível a gamificação e status social
- Valoriza autenticidade e resultados concretos

### 3.2 Persona Primária: "Lucas, o Perdido"

**Dados Demográficos:**
- 22 anos, estudante universitário ou trabalhador em período integral
- Renda própria ou mesada: R$ 2.000/mês
- Mora com pais ou república
- Solteiro, poucos relacionamentos passados

**Comportamento:**
- Passa 4-5h/dia em redes sociais (Instagram, TikTok, YouTube)
- Consome pornografia 3-5x/semana
- Se masturba diariamente
- Dorme 5-6h/noite, acorda cansado
- Alimentação baseada em fast food e delivery
- Não treina regularmente (tentou 2-3x e desistiu)

**Dores:**
- "Não consigo falar com mulheres sem travar"
- "Acordo sem energia, sem propósito"
- "Sei que preciso mudar mas sempre desisto"
- "Me sinto fraco comparado a outros caras"

**Objetivos:**
- Conseguir namorada ou melhorar com mulheres
- Ganhar massa muscular, ficar "grande"
- Ter mais energia e disciplina
- Sentir-se confiante e respeitado

**Canais:**
- Instagram, TikTok (algoritmo de masculinidade)
- YouTube (podcasts de desenvolvimento masculino)
- Reddit (r/NoFap, r/seduction, r/GetDisciplined)

### 3.3 Persona Secundária: "Rafael, o Frustrado Profissionalmente"

**Dados Demográficos:**
- 24 anos, trabalhando em emprego que odeia
- Renda: R$ 3.500/mês
- Mora sozinho ou com roommate
- Em relacionamento, mas insatisfeito

**Comportamento:**
- Viciado em redes sociais e videogames (escape)
- Bebe álcool 2-3x/semana (socialização forçada)
- Treina esporadicamente (1-2x/semana)
- Sono irregular (23h-7h, qualidade ruim)

**Dores:**
- "Estou preso em um emprego de merda"
- "Meu relacionamento está morno, sem paixão"
- "Não consigo focar em construir algo maior"
- "Sinto que estou desperdiçando minha vida"

**Objetivos:**
- Mudar de carreira ou empreender
- Melhorar relacionamento ou encontrar alguém melhor
- Criar rotina disciplinada
- Sentir-se produtivo e realizado

---

## 4. PROPOSTA DE VALOR

### 4.1 Value Proposition Canvas

**Jobs to be Done:**
1. **Funcional:** "Preciso de um plano claro e personalizado para melhorar minha vida"
2. **Emocional:** "Quero me sentir confiante e respeitado pelos outros"
3. **Social:** "Quero provar para mim mesmo que não sou fraco"

**Pains (Dores):**
1. Falta de accountability (sempre desiste sozinho)
2. Overwhelm (muita informação, não sabe por onde começar)
3. Vícios arraigados (pornografia, redes sociais, procrastinação)
4. Baixa autoestima e medo de rejeição
5. Ausência de feedback sobre progresso real

**Gains (Ganhos):**
1. Transformação física visível (músculos, postura)
2. Confiança em interações sociais e românticas
3. Disciplina para outras áreas da vida (trabalho, estudos)
4. Sensação de progresso e conquista (gamificação)
5. Pertencimento a uma comunidade de "alphas"

**Pain Relievers (Aliviadores):**
1. **IA Personalizada:** Plano sob medida, não genérico
2. **Tough Love:** Confrontação que motiva ação (não auto-ajuda piegas)
3. **Gamificação:** Progresso visível (badges, ranking) mata procrastinação
4. **Accountability Automático:** Quiz diário + notificações estratégicas
5. **Baixo Custo:** R$ 29,90/mês (preço de 1 pizza)

**Gain Creators (Criadores de Ganho):**
1. **Aumento de Testosterona:** Métrica gamificada + práticas baseadas em ciência
2. **Scanner de Conversas:** Análise real de interações com mulheres
3. **Agente Conversacional:** Coach disponível 24/7 por voz
4. **Ranking por Cohort:** Competição justa entre iniciantes
5. **Sistema de Metas Progressivo:** Baby steps evitam overwhelm

### 4.2 Diferenciação vs Concorrentes

| Feature | Antibeta | Habitica | Strava | Tinder | Coaching 1-on-1 |
|---------|----------|----------|--------|--------|-----------------|
| **Personalização IA** | ✅ 3 agentes | ❌ | ❌ | ❌ | ✅ (caro) |
| **Foco Masculinidade** | ✅ | ❌ | ❌ | ❌ | ⚠️ (depende) |
| **Gamificação** | ✅ Deep | ✅ Basic | ✅ Sports | ❌ | ❌ |
| **Tracking Testosterona** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Conversação Voz** | ✅ | ❌ | ❌ | ❌ | ✅ (caro) |
| **Scanner Conversas** | ✅ (Fase 2) | ❌ | ❌ | ❌ | ⚠️ |
| **Preço/mês** | R$ 30-50 | R$ 25 | Grátis | R$ 50+ | R$ 500+ |

**Unique Selling Proposition (USP):**

> "O único app que combina IA personalizada, tracking de testosterona e gamificação para transformar homens 'beta' em 'alphas' disciplinados — por menos de R$ 1/dia."

---

## 5. ESCOPO DO MVP

### 5.1 Features OBRIGATÓRIAS (Fase 1 - 3 meses)

#### 5.1.1 Onboarding e Perfil

**FR-001: Quiz de Onboarding Personalizado**
- **Descrição:** 28 perguntas estruturadas em 5 seções
- **Critérios de Aceite:**
  - [ ] Máximo 5 perguntas por tela
  - [ ] Barra de progresso visual (0-100%)
  - [ ] Validação obrigatória em 12 perguntas core
  - [ ] Auto-save a cada seção completada
  - [ ] Tempo médio de conclusão: 8-12 minutos
  - [ ] Taxa de conclusão: >75%

**FR-002: Geração de Plano Anual**
- **Descrição:** Agente de IA gera meta anual + 12 metas mensais
- **Critérios de Aceite:**
  - [ ] Geração em <30s após conclusão do onboarding
  - [ ] Meta anual clara e mensurável
  - [ ] 12 metas mensais derivadas e progressivas
  - [ ] Preview de 3 dias da Semana 1 mostrado ao usuário

**FR-003: Paywall Pós-Preview**
- **Descrição:** Usuário vê preview de 3 dias, restante bloqueado
- **Critérios de Aceite:**
  - [ ] Integração com Superwall
  - [ ] Teste A/B de copy do paywall
  - [ ] 3 tiers visíveis: Básico (R$ 29,90), Pro (R$ 39,90), Alpha (R$ 49,90)
  - [ ] Taxa de conversão trial→pago: >35%

#### 5.1.2 Sistema de Metas

**FR-004: Visualização de Metas Diárias**
- **Descrição:** Home dashboard com cards de metas do dia
- **Critérios de Aceite:**
  - [ ] Card de nível de testosterona (barra 0-100%)
  - [ ] Card de treino (nome + botão "Ver Treino")
  - [ ] Card de alimentação (4-6 refeições com checkboxes)
  - [ ] Card de hidratação (slider 0-2L)
  - [ ] Card de práticas de testo (1-3 práticas com checkboxes)
  - [ ] Card de quiz diário (se ainda não respondido)
  - [ ] Todas as tasks atualizadas em tempo real

**FR-005: Tela de Treino Detalhado**
- **Descrição:** Navegação para tela com exercícios, séries, reps
- **Critérios de Aceite:**
  - [ ] Lista de 4-6 exercícios
  - [ ] Cada exercício: nome, séries, reps, checkbox
  - [ ] Cronômetro global (tempo total)
  - [ ] Botão "Concluir Treino" enabled só quando todos marcados
  - [ ] Ao concluir: salva tempo executado + marca treino completo na home

**FR-006: Plano de Treino Mensal**
- **Descrição:** Agente gera plano de treino adaptado (ABC, ABCD, etc.)
- **Critérios de Aceite:**
  - [ ] Baseado em frequência do onboarding (3x, 4x, 5x/semana)
  - [ ] Exercícios adaptados a acesso (academia/casa/calistenia)
  - [ ] Progressão de carga/volume ao longo do mês
  - [ ] Gera novo plano ao fim de cada mês

**FR-007: Plano Alimentar Semanal**
- **Descrição:** Agente gera 3-4 receitas que se alternam na semana
- **Critérios de Aceite:**
  - [ ] 4-6 refeições/dia baseado em objetivo (bulking/cutting)
  - [ ] Receitas com ingredientes, quantidades, macros
  - [ ] Adaptado a renda (R$ 1.500 vs R$ 5.000+)
  - [ ] Foco em aumento de proteína e testosterona
  - [ ] Gera novo plano toda semana

**FR-008: Sistema de Hierarquia de Metas**
- **Descrição:** Visualização de metas anual → mensal → semanal → diário
- **Critérios de Aceite:**
  - [ ] Botão "Ver Metas" na home
  - [ ] Tela de metas anuais (ano atual + futuros bloqueados)
  - [ ] Drill-down: ano → mês → semana → dia
  - [ ] Metas futuras exibidas mas bloqueadas (paywall se free tier)

#### 5.1.3 Tracking e Progresso

**FR-009: Cálculo de Nível de Testosterona**
- **Descrição:** Fórmula matemática baseada em múltiplas variáveis
- **Critérios de Aceite:**
  - [ ] Fórmula: NoFap(15%) + Treino(20%) + Alimentação(15%) + Sono(15%) + Hidratação(5%) + Práticas(10%) + Vícios(5%) + Redes(5%)
  - [ ] Atualização em tempo real ao completar tasks
  - [ ] Histórico semanal/mensal visível
  - [ ] Animação de mudança de nível

**FR-010: Quiz Diário de Vícios**
- **Descrição:** 5-8 perguntas sim/não ao final do dia (21h)
- **Critérios de Aceite:**
  - [ ] Perguntas personalizadas baseadas no onboarding
  - [ ] Notificação às 21h (horário configurável)
  - [ ] Lembretes às 22h e 23h se não respondido
  - [ ] Impacta cálculo de testosterona
  - [ ] Taxa de resposta diária: >80%

**FR-011: Tracking de Tela (Android)**
- **Descrição:** Monitoramento passivo de tempo em apps
- **Critérios de Aceite:**
  - [ ] Permissão PACKAGE_USAGE_STATS solicitada no onboarding
  - [ ] Tracking de Instagram, TikTok, YouTube, Twitter/X
  - [ ] Notificações em 1h, 2h, 3h+ de uso
  - [ ] Impacta cálculo de testosterona (penalidade por >2h)
  - [ ] **iOS:** Auto-relato via quiz diário (pergunta adicional)

#### 5.1.4 Gamificação

**FR-012: Sistema de Badges**
- **Descrição:** 36 badges em 6 categorias (6 por categoria)
- **Critérios de Aceite:**
  - [ ] Badges: Treino (6), NoFap (6), Alimentação (6), Sono (6), Social (6), Testosterona (6)
  - [ ] Raridades: Comum (12), Raro (12), Épico (9), Lendário (6)
  - [ ] Notificação push instantânea ao desbloquear
  - [ ] Modal de conquista com animação
  - [ ] Galeria de badges na tela de perfil

**FR-013: Ranking por Cohort**
- **Descrição:** Ranking híbrido (testo 60% + pontos 40%)
- **Critérios de Aceite:**
  - [ ] Cohort baseado em mês de início (ex: "Fevereiro 2026")
  - [ ] Fórmula: Score = (Testo% × 0.6) + (Pontos Atividade × 0.4)
  - [ ] Atualização diária (cron 1h da manhã)
  - [ ] Tela mostra: Top 10 + posição do usuário
  - [ ] Tab secundária: Ranking Global (todos os cohorts)
  - [ ] Realtime updates via Supabase WebSocket

**FR-014: Sistema de Pontos**
- **Descrição:** Pontos acumulados por atividades
- **Critérios de Aceite:**
  - [ ] Meta diária 100%: +10pts
  - [ ] Treino completo: +15pts
  - [ ] Semana 100%: +50pts bonus
  - [ ] Streak NoFap: +5pts/dia
  - [ ] Badge desbloqueado: +20pts (comum), +50pts (raro), +100pts (épico), +250pts (lendário)
  - [ ] Máximo teórico: 300-400pts/semana

#### 5.1.5 Agente Conversacional

**FR-015: Conversação por Voz (Voz → Voz)**
- **Descrição:** Pipeline STT → Claude → TTS
- **Critérios de Aceite:**
  - [ ] Gravação de áudio (5-60s) via Expo AV
  - [ ] Upload para Supabase Storage
  - [ ] Deepgram STT (transcrição PT-BR)
  - [ ] Claude 3.5 Haiku com contexto completo do usuário
  - [ ] Google Cloud TTS Neural2 PT-BR (voz masculina grave)
  - [ ] Latência total: <2s (p95)
  - [ ] Histórico de últimas 10 conversas visível

**FR-016: Limites de Uso por Tier**
- **Descrição:** Rate limiting de conversações de voz
- **Critérios de Aceite:**
  - [ ] Básico: 10 conversas/mês
  - [ ] Pro: 30 conversas/mês
  - [ ] Alpha: 60 conversas/mês
  - [ ] Modal de upgrade ao atingir 80% do limite
  - [ ] Hard block ao atingir 100% com CTA de upgrade

**FR-017: Personalidade "Tough Love"**
- **Descrição:** Tom confrontador mas humanizado
- **Critérios de Aceite:**
  - [ ] System prompt validado com exemplos
  - [ ] Respostas usam dados do usuário (compliance, testo, ranking)
  - [ ] Não usa linguagem motivacional genérica
  - [ ] Oferece soluções práticas baseadas em padrões
  - [ ] NPS do agente: >60

#### 5.1.6 Dicas Semanais e Mensais

**FR-018: Dica Semanal Estruturada**
- **Descrição:** Gerada automaticamente domingo 22h
- **Critérios de Aceite:**
  - [ ] Formato bullet points (leitura <60s)
  - [ ] Conteúdo: Análise de progresso + pontos de atenção + recomendação + livro sugerido
  - [ ] Card na home com preview
  - [ ] Notificação segunda 8h: "Suas dicas da semana"
  - [ ] Taxa de leitura: >70%

**FR-019: Dica Mensal Interativa**
- **Descrição:** Gerada último dia do mês, formato conversacional
- **Critérios de Aceite:**
  - [ ] Fluxo de 3-5 telas com perguntas
  - [ ] Reflexão sobre mês anterior
  - [ ] Plano de ação para próximo mês
  - [ ] Tempo de consumo: 3-5 minutos
  - [ ] Taxa de conclusão: >60%

#### 5.1.7 Notificações

**FR-020: Sistema de Notificações Estratégicas**
- **Descrição:** 8 tipos de notificações com timing otimizado
- **Critérios de Aceite:**
  - [ ] Notificação matinal (7h): Metas do dia
  - [ ] Lembretes de hidratação (a cada 2h se meta não atingida)
  - [ ] Lembrete de treino (2h antes do horário usual)
  - [ ] Quiz diário (21h) + 2 lembretes (22h, 23h)
  - [ ] Notificação de tracking de tela (1h, 2h, 3h+)
  - [ ] Badge desbloqueado (instantâneo)
  - [ ] Ranking update (instantâneo via WebSocket)
  - [ ] Dica semanal/mensal disponível
  - [ ] Máximo: 8 notificações/dia (exceto urgências)
  - [ ] Opt-out configurável por tipo

#### 5.1.8 Autenticação e Perfil

**FR-021: Sign-Up e Autenticação**
- **Descrição:** Supabase Auth com email/senha
- **Critérios de Aceite:**
  - [ ] Sign-up com email + senha (mínimo 8 caracteres)
  - [ ] Confirmação de email obrigatória
  - [ ] Login com JWT (refresh automático)
  - [ ] Logout em todos os dispositivos
  - [ ] Esqueci senha (reset via email)

**FR-022: Perfil de Usuário**
- **Descrição:** Visualização e edição de dados
- **Critérios de Aceite:**
  - [ ] Nome, idade, foto de perfil
  - [ ] Configurações de notificações
  - [ ] Histórico de assinatura
  - [ ] Botão "Cancelar Assinatura"
  - [ ] Botão "Deletar Conta" (com confirmação dupla)

#### 5.1.9 Monetização

**FR-023: Integração com Superwall**
- **Descrição:** Paywall configurável com A/B testing
- **Critérios de Aceite:**
  - [ ] 3 tiers: Básico (R$ 29,90), Pro (R$ 39,90), Alpha (R$ 49,90)
  - [ ] Trial de 7 dias grátis
  - [ ] Pagamento via Stripe (web) ou In-App Purchase (mobile)
  - [ ] Cancelamento a qualquer momento
  - [ ] Taxa de conversão trial→pago: >35%

**FR-024: Gestão de Assinaturas**
- **Descrição:** Backend valida status de assinatura
- **Critérios de Aceite:**
  - [ ] Webhook de Stripe/Apple/Google processa eventos
  - [ ] Tabela `user_subscriptions` atualizada em tempo real
  - [ ] Features bloqueadas se assinatura expirar
  - [ ] Email de lembrete 3 dias antes de renovar
  - [ ] Email de "Sentimos sua falta" 7 dias após cancelar

---

### 5.2 Features EXCLUÍDAS do MVP (Fase 2 - 6-9 meses)

**FR-025: Scanner de Conversas (Fase 2)**
- OCR de prints de conversas
- Análise de temperatura beta
- Sugestões de respostas alpha
- Limites: 5/15/30 análises/mês por tier

**FR-026: Auxiliar de Teclado (Fase 2)**
- Clipboard monitoring (iOS + Android)
- Análise de mensagem antes de enviar
- Sugestão inline

**FR-027: Bloqueio de Apps (Fase 2 - Android apenas)**
- Bloqueio automático após limite de tempo
- Whitelist de apps produtivos

**FR-028: Social Features (Fase 2)**
- Compartilhar badges
- Desafios entre amigos
- Leaderboard de grupos

---

## 6. REQUISITOS FUNCIONAIS DETALHADOS

### 6.1 Fluxo de Onboarding

**Tela 1: Bem-vindo**
- Título: "Bem-vindo ao Antibeta"
- Subtítulo: "Vamos criar seu plano personalizado de transformação"
- CTA: "Começar Quiz"

**Telas 2-7: Quiz (28 perguntas)**
- Seção 1 (5 perguntas): Identificação e Contexto
- Seção 2 (8 perguntas): Diagnóstico Comportamental e Vícios
- Seção 3 (5 perguntas): Estado Físico e Atividades
- Seção 4 (6 perguntas): Relacionamentos e Interações Sociais
- Seção 5 (4 perguntas): Metas e Objetivos

**Tela 8: Processamento**
- Loading animado: "Analisando suas respostas..."
- "Gerando seu plano personalizado..."
- Tempo estimado: 20-30s

**Tela 9: Preview do Plano**
- "Seu Plano de Transformação está pronto!"
- Mostra:
  - Meta anual
  - Mês 1: objetivo geral
  - Semana 1: objetivos semanais
  - Dias 1-3: metas detalhadas (visíveis)
  - Dias 4-7: bloqueados com blur + cadeado
- CTA: "Desbloquear Plano Completo"

**Tela 10: Paywall (Superwall)**
- 3 cards de tiers
- Benefícios de cada tier
- "Garantia de 7 dias grátis"
- CTA: "Começar Trial Grátis"

### 6.2 Fluxo de Uso Diário

**Manhã (7h):**
1. Notificação: "Bom dia, Alpha! Suas metas de hoje..."
2. Usuário abre app
3. Home carrega metas do dia
4. Usuário visualiza: treino, alimentação, hidratação, práticas testo
5. Marca primeira meta (ex: café da manhã) → barra de testo atualiza

**Dia:**
6. Usuário clica em "Ver Treino"
7. Navega para tela de treino
8. Inicia cronômetro
9. Completa exercícios (checkboxes)
10. Clica "Concluir Treino" → volta para home
11. Card de treino mostra "Concluído" + tempo executado

**Noite (21h):**
12. Notificação: "Quiz diário disponível"
13. Usuário abre app
14. Responde 5-8 perguntas sim/não
15. Barra de testo recalcula instantaneamente
16. Se desbloqueou badge → modal de conquista

**Fim de Semana (Domingo 22h):**
17. Cron job gera plano da próxima semana
18. Notificação segunda 8h: "Seu plano da semana está pronto"

### 6.3 Fluxo de Conversação com Agente

**Passo 1: Acesso**
- Usuário clica em ícone de microfone (botão flutuante na home)
- Se atingiu limite do tier → modal "Limite atingido. Fazer upgrade?"
- Senão → abre tela do agente

**Passo 2: Gravação**
- Usuário segura botão de microfone
- Waveform animado durante gravação
- Solta botão → upload automático

**Passo 3: Processamento**
- Loading: "Analisando..."
- Tempo: 1-2s

**Passo 4: Resposta**
- Áudio reproduzido automaticamente
- Texto exibido simultaneamente (acessibilidade)
- Botão "Enviar Nova Mensagem"

**Passo 5: Histórico**
- Tab "Histórico" mostra últimas 10 conversas
- Cada conversa: timestamp + preview do texto

### 6.4 Fluxo de Ranking

**Visualização:**
- Tab "Meu Cohort" (default)
  - Header: "Ranking Fevereiro 2026"
  - Top 10 em cards destacados
  - Posição do usuário (#34 de 487)
  - Badges desbloqueados do usuário
- Tab "Global"
  - Top 10 absolutos (todos os cohorts)
  - Posição global do usuário

**Atualização em Tempo Real:**
- Usuário completa semana 100%
- Backend recalcula ranking
- WebSocket envia update
- Notificação: "Você subiu 5 posições! Agora é #29"
- Animação de subida na tela de ranking

---

## 7. REQUISITOS NÃO-FUNCIONAIS

### 7.1 Performance

| Métrica | Requisito | Como Medir |
|---------|-----------|------------|
| **Tempo de carregamento inicial** | <2s (p95) | Mixpanel |
| **Latência de API** | <500ms (p95) | Railway logs |
| **Latência de IA (voz)** | <2s total (p95) | Custom metric |
| **Tamanho do app** | <100MB (iOS), <120MB (Android) | App Store Connect / Play Console |
| **Uso de bateria** | <5%/hora de uso ativo | Firebase Performance |
| **Uso de dados móveis** | <10MB/dia de uso normal | Network profiler |

### 7.2 Escalabilidade

- Suportar **10k usuários simultâneos** sem degradação
- Auto-scaling de backend (1-5 replicas)
- Connection pooling no Supabase (max 100 conexões)
- Rate limiting por usuário (1000 req/hora)

### 7.3 Disponibilidade

- **99.5% uptime** (máximo 3.6h downtime/mês)
- Backups diários automáticos (Supabase)
- Disaster recovery plan documentado
- Rollback de deploy em <5min

### 7.4 Segurança

- **HTTPS obrigatório** em todas as conexões
- **JWT tokens** com expiração de 1h
- **Row Level Security (RLS)** no Supabase
- **Criptografia AES-256** de dados em repouso
- **Rate limiting** por IP e por usuário
- **Validação de input** em 100% dos endpoints
- **Penetration testing** antes do lançamento

### 7.5 Usabilidade

- **Tempo de onboarding:** <12 minutos (p95)
- **Taxa de conclusão do onboarding:** >75%
- **NPS:** >50
- **App Store Rating:** >4.5 estrelas
- **Crash-free rate:** >99.5%

### 7.6 Compatibilidade

- **iOS:** 14.0+
- **Android:** 10+ (API 29+)
- **Devices:** iPhone 8+, Android devices with 2GB+ RAM
- **Orientação:** Portrait apenas (landscape bloqueado)

### 7.7 Acessibilidade

- **VoiceOver/TalkBack** compatível
- **Contraste mínimo:** WCAG AA (4.5:1)
- **Tamanho de fonte:** Configurável (Small, Medium, Large)
- **Legendas em áudio:** Texto exibido simultaneamente

---

## 8. JORNADA DO USUÁRIO

### 8.1 Jornada de Aquisição

```
1. Descoberta
   - Instagram ad: "Você é beta ou alpha? Descubra em 1 min"
   - YouTube pre-roll: Depoimento de transformação
   - Reddit post: "App que mudou minha vida"
   
2. Interesse
   - Landing page: VSL (Video Sales Letter) de 90s
   - Prova social: "1.247 homens já se transformaram"
   - CTA: "Baixar App Grátis"

3. Download
   - App Store / Google Play
   - 7 dias grátis destacado
   - Rating: 4.7 estrelas

4. Onboarding
   - Quiz de 28 perguntas (8-12min)
   - Preview do plano personalizado
   - Paywall: 35% convertem aqui

5. Ativação
   - Primeiro dia de uso
   - Completa pelo menos 1 meta
   - Recebe primeira notificação motivacional
```

### 8.2 Jornada de Uso (Primeira Semana)

**Dia 1 (Segunda):**
- Manhã: Notificação de boas-vindas
- Completa 3/5 metas (60%)
- Usa agente conversacional 1x (pergunta sobre treino)
- Nível de testo: 35% → 42%

**Dia 2-3:**
- Completa 4/5 metas (80%)
- Responde quiz diário
- Nível de testo: 42% → 51%

**Dia 4:**
- Completa treino inteiro pela primeira vez
- Desbloqueia badge "Primeira Rep" (+20pts)
- Sobe no ranking: #127 → #98
- Nível de testo: 51% → 58%

**Dia 5-7:**
- Mantém compliance de 70%+
- Completa semana inteira
- Desbloqueia badge "Semana Perfeita" (+20pts)
- Nível de testo: 58% → 67%
- Dica semanal gerada e visualizada

### 8.3 Jornada de Retenção (Primeiro Mês)

**Semana 1:** Descoberta e exploração (novelty effect)
**Semana 2:** Formação de hábito (crucial - maior risco de churn)
**Semana 3:** Primeiros resultados visíveis (motivação intrínseca)
**Semana 4:** Consolidação (usuário viciado no sistema)

**Triggers de Retenção:**
- Dia 7: Dica semanal personalizada
- Dia 14: Email "Você está no top 30% do seu cohort!"
- Dia 21: Badge épico desbloqueado
- Dia 30: Feedback mensal + novo plano de treino

---

## 9. MODELO DE MONETIZAÇÃO

### 9.1 Estrutura de Preços

| Tier | Preço Mensal | Preço Anual | Economia | Features |
|------|--------------|-------------|----------|----------|
| **Básico** | R$ 29,90 | R$ 239,90 (R$ 19,99/mês) | 33% | 10 conversas/mês, 5 scans/mês |
| **Pro** | R$ 39,90 | R$ 319,90 (R$ 26,66/mês) | 33% | 30 conversas/mês, 15 scans/mês |
| **Alpha** | R$ 49,90 | R$ 399,90 (R$ 33,33/mês) | 33% | 60 conversas/mês, 30 scans/mês |

**Trial:** 7 dias grátis em todos os tiers

### 9.2 Projeção de Receita (12 meses)

**Premissas:**
- Crescimento de usuários: 500 → 10.000 em 12 meses
- Taxa de conversão trial→pago: 35%
- Distribuição de tiers: 60% Básico, 30% Pro, 10% Alpha
- Mix mensal/anual: 70% mensal, 30% anual
- Churn mensal: 25%

| Mês | Novos Trials | Conversões | Usuários Pagantes | MRR (R$) | MRR (USD) |
|-----|--------------|------------|-------------------|----------|-----------|
| 1 | 500 | 175 | 175 | R$ 5.670 | $1,134 |
| 3 | 1.200 | 420 | 800 | R$ 25.920 | $5,184 |
| 6 | 2.500 | 875 | 2.500 | R$ 81.000 | $16,200 |
| 12 | 5.000 | 1.750 | 7.000 | R$ 226.800 | $45,360 |

**ARR no mês 12:** R$ 2,7M (~$540k USD)

### 9.3 Estratégias de Upsell

**Trial → Básico:**
- Paywall no onboarding (pós-preview)
- Email Day 5: "Faltam 2 dias de trial. Continue sua transformação"
- Push Day 6: "Não perca seu progresso. Assine agora"

**Básico → Pro:**
- Modal ao atingir 80% de limite de conversas
- Email mid-month: "Você está usando o Antibeta muito. Quer mais conversas?"
- Desconto temporário: "Upgrade para Pro por R$ 34,90 (15% off)"

**Pro → Alpha:**
- Badge exclusivo "Alpha Supremo" (só para tier Alpha)
- Ranking separado "Leaderboard Alpha" (só tier Alpha visível)
- Prioridade em novas features (Fase 2 early access)

---

## 10. MÉTRICAS DE SUCESSO

### 10.1 Métricas de Aquisição

| Métrica | Meta Mês 3 | Meta Mês 6 | Meta Mês 12 |
|---------|------------|------------|-------------|
| **Downloads** | 2.000 | 8.000 | 30.000 |
| **CAC (Custo de Aquisição)** | <R$ 30 | <R$ 25 | <R$ 20 |
| **Taxa de instalação** (ad → install) | >15% | >20% | >25% |
| **CPI (Cost Per Install)** | <R$ 5 | <R$ 4 | <R$ 3 |

### 10.2 Métricas de Ativação

| Métrica | Meta |
|---------|------|
| **Taxa de conclusão do onboarding** | >75% |
| **Time-to-First-Value** | <5 minutos (completar 1ª meta) |
| **Taxa de conversão (trial → pago)** | >35% |
| **Tempo no paywall** | >30s (indica interesse) |

### 10.3 Métricas de Engajamento

| Métrica | Meta |
|---------|------|
| **DAU/MAU** | >30% |
| **Sessões/usuário/dia** | >3 |
| **Tempo de sessão médio** | >5 minutos |
| **Taxa de conclusão de tarefas** | >65% |
| **Taxa de resposta quiz diário** | >80% |
| **Uso de agente conversacional** | >40% de usuários ativos |

### 10.4 Métricas de Retenção

| Métrica | Meta |
|---------|------|
| **Retenção D1** | >60% |
| **Retenção D7** | >25% |
| **Retenção D30** | >12% |
| **Churn mensal** | <25% |
| **% de usuários que completam mês 1** | >50% |

### 10.5 Métricas de Receita

| Métrica | Meta Mês 12 |
|---------|-------------|
| **MRR** | R$ 150.000 (~$30k USD) |
| **ARR** | R$ 1.8M (~$360k USD) |
| **ARPU (Average Revenue Per User)** | R$ 21,43/mês |
| **LTV (Lifetime Value)** | R$ 86 (4 meses × R$ 21,43) |
| **LTV:CAC** | >3:1 |

### 10.6 Métricas de Satisfação

| Métrica | Meta |
|---------|------|
| **NPS (Net Promoter Score)** | >50 |
| **App Store Rating** | >4.5 estrelas |
| **Review volume** | >100 reviews/mês (mês 12) |
| **Response rate to NPS surveys** | >40% |

---

## 11. ROADMAP DE FASES

### 11.1 Fase 0: Pré-Desenvolvimento (Mês -1)

- [ ] Finalizar designs no Figma
- [ ] Validar system prompts dos agentes de IA
- [ ] Setup de infraestrutura (Railway, Supabase, APIs)
- [ ] Criar landing page e Instagram/TikTok para pré-lançamento
- [ ] Definir KPIs e dashboard de analytics

### 11.2 Fase 1: MVP Development (Meses 1-3)

**Sprint 1-2 (Semanas 1-4): Fundação**
- [ ] Setup de projeto (React Native + NestJS)
- [ ] Autenticação (Supabase Auth)
- [ ] Onboarding (28 perguntas)
- [ ] Geração de plano anual (Agente de Planejamento)
- [ ] Paywall (Superwall)

**Sprint 3-4 (Semanas 5-8): Core Features**
- [ ] Sistema de metas (hierarquia completa)
- [ ] Home dashboard
- [ ] Tela de treino detalhado
- [ ] Plano de treino mensal
- [ ] Plano alimentar semanal
- [ ] Cálculo de testosterona

**Sprint 5-6 (Semanas 9-12): Gamificação e IA**
- [ ] Sistema de badges (36 badges)
- [ ] Ranking por cohort
- [ ] Agente conversacional (voz)
- [ ] Quiz diário
- [ ] Dicas semanais/mensais
- [ ] Sistema de notificações

**Milestone:** **Lançamento Closed Beta** (50 usuários convidados)

### 11.3 Fase 2: Open Beta e Iteração (Meses 4-6)

**Sprint 7-8 (Semanas 13-16): Polimento**
- [ ] Correção de bugs críticos do beta
- [ ] Otimização de performance
- [ ] A/B testing de paywall
- [ ] Implementação de feedback dos beta testers
- [ ] Tracking de tela (Android)

**Sprint 9-10 (Semanas 17-20): Growth Features**
- [ ] Onboarding otimizado (reduzir tempo)
- [ ] Push notifications inteligentes
- [ ] Email marketing automation
- [ ] Referral program (MVP)

**Sprint 11-12 (Semanas 21-24): Preparação para Lançamento**
- [ ] App Store Optimization (ASO)
- [ ] Press kit e materiais de marketing
- [ ] Parcerias com influencers
- [ ] Campanha de ads (Meta, Google, TikTok)

**Milestone:** **Lançamento Público** (App Store + Google Play)

### 11.4 Fase 3: Scanner e Social (Meses 7-9)

**Sprint 13-14 (Semanas 25-28): Scanner de Conversas**
- [ ] OCR integration (Google Vision API)
- [ ] Agente Scanner (análise de temperatura beta)
- [ ] UI/UX do scanner
- [ ] Limites por tier (5/15/30 scans)

**Sprint 15-16 (Semanas 29-32): Social Features**
- [ ] Compartilhamento de badges
- [ ] Desafios entre amigos
- [ ] Grupos privados
- [ ] Leaderboard de grupos

**Sprint 17-18 (Semanas 33-36): Otimizações Avançadas**
- [ ] Auxiliar de teclado (clipboard monitoring)
- [ ] Bloqueio de apps (Android)
- [ ] Self-hosted TTS (reduzir custo)
- [ ] Batch processing de planos (Anthropic Batch API)

**Milestone:** **10.000 MAU** alcançados

---

## 12. DEPENDÊNCIAS E RISCOS

### 12.1 Dependências Críticas

| Dependência | Impacto | Mitigação |
|-------------|---------|-----------|
| **Anthropic API** | Alto - Core do produto | Fallback para OpenAI GPT-4 se Anthropic ficar instável |
| **Supabase** | Alto - Banco de dados | Backups diários + plano de migração para PostgreSQL self-hosted |
| **Deepgram** | Médio - Conversação voz | Fallback para Whisper API (OpenAI) |
| **Google Cloud TTS** | Médio - Conversação voz | Fallback para ElevenLabs ou self-hosted Coqui |
| **Superwall** | Baixo - Paywall | Implementação customizada de paywall se necessário |
| **Railway** | Médio - Hosting | Migração para AWS/GCP se Railway tiver problemas |

### 12.2 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Custo de IA explodir com escala** | Alta | Alto | Implementar hard caps por tier + Batch API + self-hosted LLM (longo prazo) |
| **Latência de voz >2s** | Média | Médio | Otimizar pipeline (streaming TTS, parallel processing STT+LLM) |
| **Supabase atingir limites** | Média | Alto | Monitorar usage, escalar para Pro/Enterprise tier, ou migrar para self-hosted |
| **Crash rate >1%** | Baixa | Alto | CI/CD com testes automatizados, Sentry monitoring, gradual rollout |
| **Vazamento de dados** | Baixa | Crítico | RLS no Supabase, penetration testing, security audits trimestrais |

### 12.3 Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Taxa de conversão <20%** | Média | Alto | A/B testing agressivo de paywall, otimizar preview do plano |
| **Churn >35%** | Média | Alto | Melhorar onboarding, notificações inteligentes, gamificação mais profunda |
| **CAC >R$ 40** | Alta | Médio | Focar em orgânico (SEO, conteúdo viral), referral program |
| **Concorrente copycat** | Alta | Médio | Construir moat via qualidade de IA e comunidade, iterar mais rápido |
| **Controvérsia de "masculinidade tóxica"** | Média | Alto | Posicionamento cuidadoso (desenvolvimento pessoal, não misoginia), moderação de conteúdo |

### 12.4 Riscos Regulatórios

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **LGPD/GDPR compliance** | Baixa | Crítico | Deletar PII após 30 dias, opt-out claro, DPO contratado |
| **App Store rejection** | Média | Alto | Review de guidelines antes de submit, versão "sanitizada" se necessário |
| **Problemas com IAP** | Baixa | Médio | Testes extensivos de In-App Purchase, fallback para Stripe web |
| **Bloqueio de API de tracking (Android)** | Baixa | Baixo | Plano B: auto-relato via quiz (como iOS) |

### 12.5 Plano de Contingência

**Se conversão do paywall for <20%:**
1. A/B test de 5 variações de copy
2. Aumentar período de trial para 14 dias
3. Reduzir preço do tier básico para R$ 19,90

**Se churn for >35%:**
1. Implementar reactivation campaign (email + push)
2. Adicionar feature "pause subscription" (1 mês grátis)
3. Oferecer desconto de 50% no 2º mês

**Se CAC for >R$ 40:**
1. Pausar ads pagos
2. Pivotar para estratégia de conteúdo orgânico (SEO, YouTube)
3. Implementar referral program agressivo (1 mês grátis por indicação)

---

## APROVAÇÕES

| Stakeholder | Nome | Cargo | Assinatura | Data |
|-------------|------|-------|------------|------|
| Product Owner | [Nome] | Founder/CEO | _________ | __/__/__ |
| Tech Lead | [Nome] | CTO | _________ | __/__/__ |
| Design Lead | [Nome] | Head of Design | _________ | __/__/__ |

---

**Documento criado por NEO - Agente Especialista em Documentação Técnica**  
**Antibeta © 2025 - Sistema Multi-Agente de Desenvolvimento Masculino**
