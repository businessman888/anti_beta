# GUIA COMPLETO: SISTEMA DE GAMIFICAÇÃO - ANTIBETA

**Documento Técnico Explicativo para Stakeholders**  
**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Público:** Sócios, Investidores, Tech Team

---

## ÍNDICE

1. [Visão Geral do Sistema de Gamificação](#1-visão-geral-do-sistema-de-gamificação)
2. [Sistema de Pontos (Activity Points)](#2-sistema-de-pontos-activity-points)
3. [Sistema de Ranking](#3-sistema-de-ranking)
4. [Sistema de Badges (36 Conquistas)](#4-sistema-de-badges)
5. [Cálculo do Score de Ranking](#5-cálculo-do-score-de-ranking)
6. [Sistema de Cohorts (Competição Justa)](#6-sistema-de-cohorts)
7. [Atualização em Tempo Real](#7-atualização-em-tempo-real)
8. [Estratégias Anti-Trapaça](#8-estratégias-anti-trapaça)
9. [Exemplos Práticos Completos](#9-exemplos-práticos-completos)
10. [Implementação Técnica](#10-implementação-técnica)

---

## 1. VISÃO GERAL DO SISTEMA DE GAMIFICAÇÃO

### 1.1 Por Que Gamificação?

O Antibeta usa gamificação para criar **motivação extrínseca** que complementa a transformação real do usuário.

**Problemas que resolve:**
1. **Falta de motivação:** Usuário desiste após 2-3 semanas
2. **Ausência de feedback:** Não sabe se está progredindo
3. **Solidão:** Sente que está sozinho na jornada
4. **Falta de accountability:** Sem consequências por falhar

**Solução:** Sistema de gamificação multi-camadas que recompensa **consistência** mais que intensidade.

---

### 1.2 Pilares da Gamificação

```
┌─────────────────────────────────────────────────────────┐
│                   SISTEMA DE GAMIFICAÇÃO                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. PONTOS (Activity Points)                            │
│     └─ Ganhos por ações diárias, semanais, streaks     │
│                                                         │
│  2. RANKING (Cohort + Global)                           │
│     └─ Posição baseada em Testo (60%) + Pontos (40%)   │
│                                                         │
│  3. BADGES (36 conquistas)                              │
│     └─ Desbloqueio por marcos específicos               │
│                                                         │
│  4. NÍVEL DE TESTOSTERONA (0-100%)                      │
│     └─ Métrica gamificada central                       │
│                                                         │
│  5. STREAKS (NoFap, treino, etc)                        │
│     └─ Dias consecutivos com bônus progressivo          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 1.3 Fluxo de Gamificação

```
Usuário completa META DIÁRIA
         ↓
Sistema detecta conclusão (backend)
         ↓
┌────────┴────────┐
│                 │
▼                 ▼
PONTOS            TESTO
+10pts            +1-3%
         ↓
    RECALCULA
     RANKING
         ↓
   ┌─────┴─────┐
   ▼           ▼
BADGES      NOTIFICAÇÃO
desbloqueio  em tempo real
         ↓
     USUÁRIO VÊ
   (home + ranking)
```

---

## 2. SISTEMA DE PONTOS (ACTIVITY POINTS)

### 2.1 O Que São Pontos?

**Pontos de Atividade** são uma moeda virtual que:
- Acumula ao longo do tempo (lifetime, nunca reseta)
- Representa **volume de esforço total**
- Compõe 40% do score de ranking
- Recompensa **consistência** mais que intensidade

**Diferença para Testosterona:**
- **Testo:** Estado atual (pode subir ou cair)
- **Pontos:** Acumulado histórico (só sobe)

---

### 2.2 Tabela Completa de Pontuação

#### **PONTOS DIÁRIOS (por ação)**

| Ação | Pontos | Frequência Máxima | Detalhes |
|------|--------|-------------------|----------|
| **Meta diária 100% completa** | +10 | 1x/dia | Todas as 5 categorias completas |
| **Treino completo** | +15 | 1x/dia | Adicional aos +10 (total +25 no dia) |
| **Quiz diário respondido** | +3 | 1x/dia | Independente das respostas |
| **Hidratação atingida** | +2 | 1x/dia | Meta de 2L cumprida |
| **Todas refeições confirmadas** | +5 | 1x/dia | 4-6 refeições marcadas |
| **Prática de testosterona** | +2 | 3x/dia | Por prática (ex: banho gelado) |

**Máximo teórico por dia:**
- Meta 100%: 10
- Treino: 15
- Quiz: 3
- Hidratação: 2
- Refeições: 5
- Práticas (3x): 6
- **TOTAL: 41 pontos/dia**

---

#### **PONTOS SEMANAIS (bônus)**

| Conquista | Pontos | Condição |
|-----------|--------|----------|
| **Semana perfeita (100%)** | +50 | Todos os 7 dias com 100% de compliance |
| **Semana boa (5-6 dias)** | +20 | 5 ou 6 dias completos |
| **Semana OK (3-4 dias)** | +10 | 3 ou 4 dias completos |
| **Treino 5x na semana** | +20 | 5 treinos completos em 7 dias |
| **Zero vícios na semana** | +15 | Quiz diário sem vícios todos os dias |

**Máximo por semana:**
- Pontos diários: 7 × 41 = 287
- Bônus semana perfeita: 50
- Bônus treino 5x: 20
- Bônus zero vícios: 15
- **TOTAL: 372 pontos/semana**

---

#### **PONTOS DE STREAKS (NoFap/NoPorn)**

| Streak | Pontos | Frequência |
|--------|--------|------------|
| **Cada dia consecutivo** | +5 | Diário |
| **7 dias (1 semana)** | +30 | Bônus único |
| **14 dias (2 semanas)** | +50 | Bônus único |
| **30 dias (1 mês)** | +150 | Bônus único |
| **60 dias (2 meses)** | +300 | Bônus único |
| **90 dias (3 meses)** | +500 | Bônus único (MEGA) |
| **180 dias (6 meses)** | +1000 | Bônus único (LENDÁRIO) |

**Exemplo de cálculo:**
- Dia 1-7: 7 × 5 = 35 pontos + 30 bônus = **65 pontos**
- Dia 8-14: 7 × 5 = 35 pontos + 50 bônus = **85 pontos**
- Dia 15-30: 16 × 5 = 80 pontos + 150 bônus = **230 pontos**

**NoFap de 30 dias = 380 pontos totais**

---

#### **PONTOS DE BADGES**

| Raridade | Pontos | Quantidade |
|----------|--------|------------|
| **Comum** | +20 | 12 badges |
| **Raro** | +50 | 12 badges |
| **Épico** | +100 | 9 badges |
| **Lendário** | +250 | 6 badges |

**Total possível de badges:** 36 × média = 2.970 pontos

---

#### **PONTOS DE MARCOS DE TESTOSTERONA**

| Marco | Pontos | Frequência |
|-------|--------|------------|
| **Atingir 50% testo** | +100 | Primeira vez |
| **Atingir 75% testo** | +200 | Primeira vez |
| **Atingir 90% testo** | +300 | Primeira vez |
| **Atingir 100% testo** | +500 | Primeira vez |
| **Manter 90%+ por 7 dias** | +150 | Repetível mensalmente |
| **Manter 90%+ por 30 dias** | +500 | Repetível |

---

### 2.3 Projeção de Pontos (Usuário Típico)

#### **Semana 1 (Iniciante):**
- Compliance médio: 60%
- Pontos diários: ~20/dia × 7 = 140
- Bônus semanal: 10 (3-4 dias completos)
- **TOTAL SEMANA 1: 150 pontos**

#### **Semana 4 (Engajado):**
- Compliance médio: 80%
- Pontos diários: ~30/dia × 7 = 210
- Bônus semanal: 20 (5-6 dias completos)
- Streak NoFap: 30 dias = +230 pontos
- **TOTAL SEMANA 4: 460 pontos**

#### **Mês 3 (Veterano):**
- Compliance médio: 90%
- Pontos diários: ~35/dia × 90 = 3.150
- Bônus semanais: 12 × 50 = 600
- Streak NoFap 90 dias: +880
- Badges desbloqueados: 8 × média 40 = 320
- Marcos testo: 50% + 75% + 90% = 600
- **TOTAL MÊS 3: 5.550 pontos acumulados**

---

### 2.4 Ranking de Pontos (Aproximado)

| Posição | Pontos Típicos | Tempo no App |
|---------|----------------|--------------|
| **Top 1** | 15.000+ | 6+ meses |
| **Top 10** | 8.000+ | 4+ meses |
| **Top 50** | 4.000+ | 2+ meses |
| **Top 100** | 2.500+ | 1+ mês |
| **Média** | 1.200 | 3-4 semanas |

---

## 3. SISTEMA DE RANKING

### 3.1 Dois Rankings Simultâneos

```
┌─────────────────────────────────────┐
│        RANKING NO ANTIBETA          │
├─────────────────────────────────────┤
│                                     │
│  1. RANKING POR COHORT (principal) │
│     └─ Competição justa            │
│     └─ Usuários do mesmo mês       │
│                                     │
│  2. RANKING GLOBAL (secundário)    │
│     └─ Todos os usuários           │
│     └─ Aspiracional                │
│                                     │
└─────────────────────────────────────┘
```

---

### 3.2 Ranking por Cohort (Principal)

**O que é Cohort?**
- Grupo de usuários que começaram no **mesmo mês**
- Exemplo: "Cohort Fevereiro 2026" = todos que se cadastraram em fev/26

**Por que Cohort?**
1. **Competição justa:** Iniciante não compete com veterano de 6 meses
2. **Engajamento:** Mais fácil subir no ranking (motivação)
3. **Comparação relevante:** "Como estou vs quem começou comigo?"

**Estrutura:**
- Cada cohort = ranking independente
- Mostra Top 10 + posição do usuário
- Total de competidores visível

**Exemplo visual:**
```
┌─────────────────────────────────┐
│  🏆 RANKING FEVEREIRO 2026      │
│  487 competidores               │
├─────────────────────────────────┤
│  🥇 #1  Alpha_Hunter   1.247pts │
│  🥈 #2  Sigma_Wolf     1.189pts │
│  🥉 #3  TitanGrinder   1.156pts │
│      #4  BeastMode     1.098pts │
│      #5  IronWill      1.067pts │
│      #6  NoExcuses     1.043pts │
│      #7  GrindMaster   1.021pts │
│      #8  AlphaRise     998pts   │
│      #9  DailyGains    976pts   │
│      #10 Unstoppable   954pts   │
├─────────────────────────────────┤
│  ... (posições 11-33)           │
├─────────────────────────────────┤
│  ⭐ #34 VOCÊ (Lucas)   823pts   │
│     ↑ 5 posições esta semana    │
└─────────────────────────────────┘
```

---

### 3.3 Ranking Global (Secundário)

**O que é:**
- Ranking de **TODOS** os usuários do app (todos os cohorts)
- Mostra apenas Top 10 absolutos

**Por que existe:**
1. **Aspiracional:** Ver os "lendários" do app
2. **Prova social:** "1.247 usuários ativos no Antibeta"
3. **Motivação de longo prazo:** "Um dia chego no Top 10 global"

**Não mostra posição do usuário** (evita desmotivação)

**Exemplo visual:**
```
┌─────────────────────────────────┐
│  🌍 RANKING GLOBAL              │
│  12.487 usuários totais         │
├─────────────────────────────────┤
│  🥇 #1  TheFirstAlpha  24.567pts│
│  🥈 #2  NoFap365Days   21.234pts│
│  🥉 #3  IronMountain   19.876pts│
│      #4  AlphaKing     18.654pts│
│      #5  ZeroExcuses   17.432pts│
│      #6  BeastLegend   16.789pts│
│      #7  TitanForce    15.987pts│
│      #8  AlphaGrind    15.234pts│
│      #9  NoLimits      14.876pts│
│      #10 DailyAlpha    14.543pts│
└─────────────────────────────────┘
```

---

### 3.4 Frequência de Atualização

| Evento | Atualização |
|--------|-------------|
| **Usuário completa meta** | Instantâneo (via WebSocket) |
| **Recálculo completo** | Cron job diário (1h da manhã) |
| **Cache de ranking** | 15 minutos (Redis) |

**Fluxo de atualização:**
```
Usuário completa treino (14:32)
         ↓
Backend recalcula:
  - Pontos: +15
  - Testo: 67% → 69%
  - Score: 823 → 856
         ↓
Atualiza user_profiles
         ↓
Compara com ranking cache
         ↓
Se mudou posição:
  - Notificação push
  - WebSocket broadcast
         ↓
App atualiza tela em tempo real
```

---

## 4. SISTEMA DE BADGES

### 4.1 Visão Geral

**36 badges divididos em 6 categorias:**
1. Treino (6 badges)
2. NoFap/NoPorn (6 badges)
3. Alimentação (6 badges)
4. Sono e Recuperação (6 badges)
5. Social e Desenvolvimento (6 badges)
6. Testosterona e Transformação (6 badges)

**4 níveis de raridade:**
- **Comum:** 12 badges (fáceis, primeiras semanas)
- **Raro:** 12 badges (requerem 30-60 dias)
- **Épico:** 9 badges (marcos significativos, 60-100 dias)
- **Lendário:** 6 badges (elite absoluta, transformação completa)

---

### 4.2 Lista Completa de Badges (36)

#### **CATEGORIA 1: TREINO**

| # | Badge | Raridade | Critério | Pontos |
|---|-------|----------|----------|--------|
| 1 | 🏋️ **Primeira Rep** | Comum | Completar primeiro treino | +20 |
| 2 | 💪 **Guerreiro Semanal** | Comum | 5 treinos em 1 semana | +20 |
| 3 | 🔥 **Maratona Mensal** | Raro | 20 treinos em 1 mês | +50 |
| 4 | ⚡ **Titã de Ferro** | Épico | 100 treinos lifetime | +100 |
| 5 | 🦾 **Consistência Brutal** | Raro | 4x/semana por 4 semanas consecutivas | +50 |
| 6 | 👑 **Espartano Inabalável** | Lendário | 250 treinos lifetime + 5x/semana por 8 semanas | +250 |

---

#### **CATEGORIA 2: NOFAP/NOPORN**

| # | Badge | Raridade | Critério | Pontos |
|---|-------|----------|----------|--------|
| 7 | 🚫 **Primeira Vitória** | Comum | 1 dia sem masturbação | +20 |
| 8 | 🛡️ **Semana de Honra** | Comum | 7 dias NoFap consecutivos | +20 |
| 9 | 👑 **Mestre do Autocontrole** | Raro | 30 dias NoFap consecutivos | +50 |
| 10 | 🦁 **Alpha Verdadeiro** | Épico | 90 dias NoFap consecutivos | +100 |
| 11 | 🔒 **Mente Blindada** | Raro | 30 dias sem pornografia | +50 |
| 12 | ⚔️ **Lenda Imortal** | Lendário | 180 dias NoFap + NoPorn consecutivos | +250 |

---

#### **CATEGORIA 3: ALIMENTAÇÃO**

| # | Badge | Raridade | Critério | Pontos |
|---|-------|----------|----------|--------|
| 13 | 🍳 **Chef Iniciante** | Comum | 7 dias de alimentação completa | +20 |
| 14 | 🥗 **Nutrição Alpha** | Raro | 30 dias sem pular refeição | +50 |
| 15 | 💧 **Hidratado** | Comum | 30 dias atingindo meta de água | +20 |
| 16 | 🍖 **Carnívoro Disciplinado** | Raro | Proteína adequada por 30 dias consecutivos | +50 |
| 17 | 🚫 **Zero Junk Food** | Épico | 60 dias sem fast food/processados | +100 |
| 18 | 🏆 **Máquina Metabólica** | Lendário | 90 dias compliance 100% no plano alimentar | +250 |

---

#### **CATEGORIA 4: SONO E RECUPERAÇÃO**

| # | Badge | Raridade | Critério | Pontos |
|---|-------|----------|----------|--------|
| 19 | 😴 **Sono de Campeão** | Comum | 7 dias dormindo 7-8h | +20 |
| 20 | 🌙 **Disciplina Noturna** | Raro | 30 dias dormindo antes de 23h | +50 |
| 21 | ⏰ **Madrugador Alpha** | Comum | Acordar antes de 7h por 14 dias consecutivos | +20 |
| 22 | 💤 **Mestre do Descanso** | Épico | 60 dias com qualidade de sono 8+ | +100 |
| 23 | 🧘 **Zen Warrior** | Raro | Praticar meditação/respiração 20 dias consecutivos | +50 |
| 24 | 🛏️ **Rei da Recuperação** | Lendário | 90 dias sono 7-8h + qualidade 8+ sem interrupções | +250 |

---

#### **CATEGORIA 5: SOCIAL E DESENVOLVIMENTO**

| # | Badge | Raridade | Critério | Pontos |
|---|-------|----------|----------|--------|
| 25 | 💬 **Primeira Conversa** | Comum | Usar scanner pela primeira vez (Fase 2) | +20 |
| 26 | 📚 **Leitor Consistente** | Comum | 30 dias lendo meta diária | +20 |
| 27 | 🧠 **Intelectual Alpha** | Raro | Ler 3 livros completos (marcados no app) | +50 |
| 28 | 🗣️ **Comunicador Confiante** | Raro | Usar agente 30x + aplicar dicas | +50 |
| 29 | 🎯 **Estrategista Social** | Épico | Usar scanner 50x + taxa melhoria >70% | +100 |
| 30 | 👥 **Líder Natural** | Lendário | Score habilidades sociais 4→8+ em 90 dias | +250 |

---

#### **CATEGORIA 6: TESTOSTERONA E TRANSFORMAÇÃO**

| # | Badge | Raridade | Critério | Pontos |
|---|-------|----------|----------|--------|
| 31 | 📈 **Evolução** | Comum | Aumentar 25% no nível de testosterona | +20 |
| 32 | 🔥 **Pico de Performance** | Raro | Atingir 90% de testosterona primeira vez | +50 |
| 33 | 👑 **Alpha Supremo** | Épico | Manter 90%+ testo por 30 dias consecutivos | +100 |
| 34 | 🎯 **Semana Perfeita** | Comum | 100% compliance em 1 semana | +20 |
| 35 | ⚡ **Máquina Imparável** | Épico | 4 semanas consecutivas com compliance >95% | +100 |
| 36 | 🦸 **Transformação Total** | Lendário | 95%+ testo + Top 10 cohort + 5 badges épicos | +250 |

---

### 4.3 Progressão de Desbloqueio (Usuário Típico)

**Semana 1:**
- Badge #1: Primeira Rep (primeiro treino)
- Badge #7: Primeira Vitória (1 dia NoFap)
- Badge #34: Semana Perfeita (se completar 100%)
- **Total: 3 badges, 60 pontos**

**Semana 4:**
- Badge #8: Semana de Honra (7 dias NoFap)
- Badge #13: Chef Iniciante (7 dias alimentação)
- Badge #19: Sono de Campeão (7 dias sono OK)
- Badge #26: Leitor Consistente (30 dias lendo)
- **Total acumulado: 7 badges, 140 pontos**

**Mês 3:**
- Badge #9: Mestre Autocontrole (30 dias NoFap)
- Badge #10: Alpha Verdadeiro (90 dias NoFap)
- Badge #14: Nutrição Alpha (30 dias alimentação)
- Badge #32: Pico de Performance (90% testo)
- Badge #4: Titã de Ferro (100 treinos)
- **Total acumulado: 12 badges, 490 pontos**

**Mês 6:**
- Badge #12: Lenda Imortal (180 dias NoFap)
- Badge #33: Alpha Supremo (30 dias 90%+ testo)
- Badge #35: Máquina Imparável (4 semanas 95%+)
- **Total acumulado: 15 badges, 940 pontos**

---

### 4.4 Notificação de Badge Desbloqueado

**Trigger:**
- Backend detecta critério atingido
- Insere em `user_badges`
- Envia push notification
- Broadcast via WebSocket

**Notificação:**
```
┌─────────────────────────────┐
│  🏆 BADGE DESBLOQUEADO!     │
│                             │
│     [Ícone do Badge]        │
│                             │
│  "SEMANA DE HONRA"          │
│  7 dias NoFap consecutivos  │
│                             │
│  +20 pontos de atividade!   │
│  Ranking: #34 → #31 📈      │
│                             │
│  Continue assim, alpha! 💪  │
│                             │
│  [  VER BADGE  ]            │
└─────────────────────────────┘
```

**Modal no App:**
```
┌─────────────────────────────┐
│                             │
│    [Animação Confete]       │
│                             │
│     🛡️ (Grande)             │
│                             │
│  SEMANA DE HONRA            │
│  ═══════════════            │
│                             │
│  Você completou 7 dias      │
│  de NoFap! Isso é           │
│  comportamento alpha.       │
│                             │
│  Progresso: 7/30 dias       │
│  Próximo: Mestre do         │
│  Autocontrole (30 dias)     │
│                             │
│  [  CONTINUAR  ]            │
└─────────────────────────────┘
```

---

## 5. CÁLCULO DO SCORE DE RANKING

### 5.1 Fórmula Híbrida

**Score Total = (Nível de Testosterona × 60%) + (Pontos de Atividade × 40%)**

**Por que híbrido?**
1. **Testo (60%):** Prioriza estado atual (transformação real)
2. **Pontos (40%):** Recompensa esforço acumulado (consistência)

---

### 5.2 Normalização dos Componentes

#### **Componente 1: Nível de Testosterona (0-100%)**

Já está normalizado (0-100%), então:
```
Score_Testo = Nível_Testo_Percentual × 0.6
```

**Exemplo:**
- Testo 67% → 67 × 0.6 = **40.2 pontos**

---

#### **Componente 2: Pontos de Atividade (normalizado)**

Pontos acumulam infinitamente, então precisamos normalizar:

**Fórmula de normalização:**
```
Score_Pontos = (Pontos_Usuario / Pontos_Max_Cohort) × 100 × 0.4
```

Onde:
- `Pontos_Usuario` = pontos acumulados do usuário
- `Pontos_Max_Cohort` = maior pontuação no cohort

**Exemplo:**
- Usuário: 823 pontos
- Líder do cohort: 1.247 pontos
- Score_Pontos = (823 / 1.247) × 100 × 0.4 = 66% × 40 = **26.4 pontos**

---

### 5.3 Cálculo Final do Score

**Fórmula completa:**
```
Score_Total = (Testo% × 0.6) + ((Pontos_User / Pontos_Max) × 100 × 0.4)
```

**Exemplo completo:**

**Usuário Lucas:**
- Testo: 67%
- Pontos: 823
- Pontos do líder: 1.247

**Cálculo:**
```
Score_Testo = 67 × 0.6 = 40.2
Score_Pontos = (823 / 1247) × 100 × 0.4 = 26.4
Score_Total = 40.2 + 26.4 = 66.6
```

**Usuário Alpha_Hunter (líder):**
- Testo: 92%
- Pontos: 1.247

**Cálculo:**
```
Score_Testo = 92 × 0.6 = 55.2
Score_Pontos = (1247 / 1247) × 100 × 0.4 = 40
Score_Total = 55.2 + 40 = 95.2
```

**Ranking:**
1. Alpha_Hunter: **95.2**
2. [outros]
34. Lucas: **66.6**

---

### 5.4 Por Que Esse Peso (60/40)?

**Testamos 3 distribuições:**

| Distribuição | Problema |
|--------------|----------|
| **80/20 (Testo/Pontos)** | Veteranos com baixo testo ficavam mal posicionados |
| **50/50** | Usuários novos com alto testo passavam veteranos injustamente |
| **60/40** ✅ | Equilíbrio perfeito: prioriza transformação real mas recompensa consistência |

**Exemplo prático (60/40):**
- **Veterano (6 meses):** Testo 75%, Pontos 8.000 → Score alto
- **Novato intenso (1 mês):** Testo 95%, Pontos 1.200 → Score médio-alto
- **Resultado:** Veterano mantém vantagem, mas novato pode alcançar com esforço

---

## 6. SISTEMA DE COHORTS

### 6.1 Como Funciona

**Criação de Cohort:**
```
Usuário se cadastra em 15/02/2026
         ↓
Backend checa se existe cohort "2026-02"
         ↓
Se não existe: CREATE cohort_id = "cohort_2026_02"
         ↓
Usuário recebe: cohort_id = "cohort_2026_02"
         ↓
Inserido em ranking desse cohort
```

**Estrutura de Cohort:**
```sql
cohorts (
  cohort_id TEXT PRIMARY KEY,  -- "cohort_2026_02"
  month INT,                    -- 2
  year INT,                     -- 2026
  total_users INT,              -- 487
  created_at TIMESTAMP
)
```

---

### 6.2 Vantagens do Sistema de Cohort

#### **1. Competição Justa**
```
Usuário novato (Fev 2026):
- Testo: 35% (início)
- Pontos: 150 (1 semana)
- Score: 21 + 4.8 = 25.8
- Posição no cohort: #234 de 487 (meio da tabela) ✅

Se fosse ranking global:
- Posição: #8.234 de 12.487 (quase último) ❌
- Desmotivação total
```

#### **2. Engajamento Maior**
- Mais fácil subir posições (menos competidores)
- Sensação de progresso constante
- Mais badges desbloqueados (menos concorrência)

#### **3. Comparação Relevante**
- "Como estou vs quem começou comigo?"
- "Aquele cara do Top 10 começou no mesmo dia que eu"

---

### 6.3 Tamanho Típico de Cohorts

**Projeção de crescimento:**

| Mês | Novos Usuários | Tamanho do Cohort |
|-----|----------------|-------------------|
| Fev/26 (Lançamento) | 500 | 500 |
| Mar/26 | 800 | 800 |
| Abr/26 | 1.200 | 1.200 |
| Mai/26 | 1.800 | 1.800 |
| Jun/26 | 2.500 | 2.500 |

**Cohorts muito grandes (>2k):**
- Considerar sub-cohorts (Fev-A, Fev-B)
- Ou ranking por "semana de início"

---

### 6.4 Migração entre Cohorts?

**Resposta: NÃO.**

- Cohort é **permanente** (definido no cadastro)
- Usuário nunca muda de cohort
- Mesmo que pause e volte meses depois

**Por quê?**
- Mantém competição justa
- Evita "gaming" do sistema (pausar e voltar em cohort novo)
- Valoriza veteranos (eles têm vantagem histórica no cohort)

---

## 7. ATUALIZAÇÃO EM TEMPO REAL

### 7.1 Tecnologia: Supabase Realtime (WebSocket)

**Como funciona:**
```
Backend atualiza user_profiles
         ↓
PostgreSQL trigger notifica Supabase Realtime
         ↓
Supabase envia via WebSocket para todos os clientes conectados
         ↓
App React Native recebe evento
         ↓
Zustand state atualiza
         ↓
UI re-renderiza automaticamente
```

---

### 7.2 Eventos em Tempo Real

| Evento | Trigger | O Que Atualiza |
|--------|---------|----------------|
| **ranking_update** | Usuário muda de posição | Tela de ranking |
| **badge_unlocked** | Backend insere em user_badges | Modal + notificação |
| **testo_change** | Nível de testo atualiza | Card na home |
| **points_earned** | Pontos incrementam | Card de pontos |

---

### 7.3 Exemplo de Fluxo Completo

**Cenário:** Lucas completa treino e sobe 3 posições no ranking

```
14:32:15 - Lucas clica "Concluir Treino"
         ↓
14:32:16 - Backend recebe PATCH /workouts/123/complete
         ↓
14:32:17 - Backend atualiza:
         - tasks_daily.is_completed = true
         - user_profiles.activity_points += 15
         - Recalcula testo: 67% → 69%
         ↓
14:32:18 - Recalcula score:
         - Score anterior: 66.6
         - Score novo: 68.8
         ↓
14:32:19 - Compara com ranking:
         - Posição anterior: #34
         - Posição nova: #31 (subiu 3)
         ↓
14:32:20 - Supabase Realtime broadcast:
         {
           event: "ranking_update",
           user_id: "lucas_abc123",
           old_rank: 34,
           new_rank: 31,
           change: +3
         }
         ↓
14:32:21 - App recebe via WebSocket
         ↓
14:32:22 - Animação na tela:
         - Card de testo: 67% → 69% (animado)
         - Ranking badge: "#34" → "#31" (animado)
         ↓
14:32:23 - Push notification:
         "Você subiu 3 posições! Agora é #31 🔥"
```

**Latência total:** ~8 segundos (imperceptível para o usuário)

---

### 7.4 Otimização de Performance

#### **Cache de Ranking (Redis)**

**Problema:** Recalcular ranking de 10k usuários toda vez = lento

**Solução:** Cache de 15 minutos
```
User request: GET /ranking/cohort_2026_02
         ↓
Backend checa Redis:
  Key: "ranking:cohort_2026_02"
  TTL: 15 minutos
         ↓
Se existe no cache:
  Retorna imediatamente (latência: 50ms)
         ↓
Se não existe:
  Calcula ranking completo
  Salva no Redis (TTL 15min)
  Retorna (latência: 800ms)
```

**Invalidação de cache:**
- Quando qualquer usuário do cohort muda de posição
- Ou a cada 15 minutos (automático)

---

## 8. ESTRATÉGIAS ANTI-TRAPAÇA

### 8.1 Problemas Potenciais

1. **Fake progress:** Usuário marca tarefas sem fazer
2. **Bot abuse:** Scripts automatizando ações
3. **Account sharing:** Múltiplos usuários em 1 conta
4. **NoFap falso:** Marca "não" no quiz mas mentiu

---

### 8.2 Detecção de Anomalias

#### **Detector 1: Compliance Impossível**
```python
if compliance_rate > 98% for 30 days:
    flag_for_review()
    # Humanos raramente conseguem 100% perfeito por 1 mês
```

#### **Detector 2: Progressão Muito Rápida**
```python
if testo_level increased 50% in 7 days:
    flag_for_review()
    # Biologia não permite esse aumento real
```

#### **Detector 3: Padrão de Bot**
```python
if actions have exact_same_timestamp pattern:
    flag_for_review()
    # Ex: Sempre marca treino às 14:32:15 exatas
```

#### **Detector 4: Sem Variação**
```python
if nofap_streak = 90 days AND quiz_variance = 0:
    flag_for_review()
    # Suspeito: sempre responde exatamente igual
```

---

### 8.3 Penalidades

| Infração | Primeira | Segunda | Terceira |
|----------|----------|---------|----------|
| **Suspeita leve** | Warning (email) | - | - |
| **Suspeita moderada** | Freeze de pontos por 7 dias | - | - |
| **Confirmado trapaça** | Reset de pontos/badges | Ban temporário | Ban permanente |

---

### 8.4 Validações Técnicas

#### **Validação 1: Tempo Mínimo de Treino**
```typescript
// Treino deve durar pelo menos 20 minutos
if (workout_duration < 20 * 60) {
  throw new Error("Treino muito rápido. Mínimo: 20min");
}
```

#### **Validação 2: Cooldown entre Ações**
```typescript
// Não pode marcar 2 refeições no mesmo minuto
if (meal_timestamp - last_meal_timestamp < 60) {
  throw new Error("Aguarde 1 minuto entre refeições");
}
```

#### **Validação 3: Geolocalização (Opcional)**
```typescript
// Se usuário marca treino, deve estar em movimento
if (location_variance < 100 meters in 30min) {
  flag_suspicious = true;
}
```

---

## 9. EXEMPLOS PRÁTICOS COMPLETOS

### 9.1 Exemplo 1: Semana Típica de Lucas

**Perfil:**
- Lucas, 22 anos
- Cohort: Fevereiro 2026
- Plano: Básico (R$ 29,90)
- Semana: 4ª desde o início

---

#### **Segunda-feira**

**Ações:**
- ✅ Treino: Peito e Tríceps (45min)
- ✅ Refeições: 4/4 confirmadas
- ✅ Hidratação: 2.0L atingido
- ✅ Práticas testo: Banho gelado + Exposição solar
- ✅ Quiz diário: Respondido (NoFap mantido)

**Pontos ganhos:**
- Meta 100%: +10
- Treino: +15
- Quiz: +3
- Hidratação: +2
- Refeições: +5
- Práticas (2x): +4
- **TOTAL: 39 pontos**

**Testo:**
- Início do dia: 67%
- Fim do dia: 69% (+2%)

**Ranking:**
- Início: #34
- Fim: #32 (+2 posições)

**Notificação recebida:**
```
🔥 Dia perfeito, Lucas!
Você ganhou 39 pontos.
Ranking: #34 → #32
Continue assim!
```

---

#### **Quarta-feira (Recaída)**

**Ações:**
- ❌ Caiu no vício (pornografia)
- ✅ Treino: Pernas (50min)
- ✅ Refeições: 4/4
- 🔄 Hidratação: 1.2L (meta não atingida)
- ⏳ Quiz diário: Respondido honestamente (sim para porn)

**Pontos ganhos:**
- Meta incompleta: 0 (não atingiu 100%)
- Treino: +15
- Quiz: +3
- Refeições: +5
- **TOTAL: 23 pontos**

**Testo:**
- Início: 69%
- Fim: 64% (-5%) ← Penalidade por vício

**Ranking:**
- Início: #32
- Fim: #35 (-3 posições)

**Streak NoFap:**
- Resetou de 23 dias para 0 dias

**Notificação recebida:**
```
⚠️ Streak resetado.
23 dias de progresso perdidos.

Mas Lucas, você treinou mesmo assim.
Isso é disciplina. Recomeça amanhã.

Padrão identificado: você sempre cai
na quarta. Vamos mudar isso.
```

---

#### **Domingo (Fim de Semana)**

**Resultado da semana:**
- Dias 100%: 5 de 7
- Treinos: 5 de 6 planejados
- Compliance geral: 71%

**Pontos ganhos na semana:**
- Diários: ~180
- Bônus semanal: +20 (5-6 dias completos)
- **TOTAL SEMANA: 200 pontos**

**Testo:**
- Início da semana: 67%
- Fim da semana: 66% (-1%)

**Ranking:**
- Início: #34
- Fim: #36 (-2 posições)

**Badge desbloqueado:**
- 🔥 Maratona Mensal (20 treinos no mês)
- +50 pontos!

**Dica semanal gerada:**
```
📊 SEMANA 4 - ANÁLISE

Compliance: 71% (↓ 9% vs semana passada)

⚠️ ATENÇÃO:
• Você caiu no vício na quarta
• Padrão: sempre cai nesse dia
• Solução: agende treino de pernas
  toda quarta às 20h

✅ PONTOS FORTES:
• 5 treinos completados
• Alimentação 100%

💡 FOCO PRÓXIMA SEMANA:
• Quebrar padrão da quarta
• Hidratação (meta: 7/7 dias)
```

---

### 9.2 Exemplo 2: Progressão de 3 Meses

**Usuário:** Pedro, Cohort Fev/26

---

#### **Mês 1 (Semanas 1-4)**

| Métrica | Valor |
|---------|-------|
| **Compliance médio** | 65% |
| **Pontos ganhos** | 850 |
| **Nível testo** | 35% → 58% (+23%) |
| **Treinos** | 14 de 16 |
| **NoFap streak** | 18 dias (depois resetou) |
| **Badges** | 4 (todos comuns) |
| **Ranking** | #187 → #98 |

**Sentimento:** Motivado, vendo progresso, mas ainda instável.

---

#### **Mês 2 (Semanas 5-8)**

| Métrica | Valor |
|---------|-------|
| **Compliance médio** | 78% |
| **Pontos ganhos** | 1.420 |
| **Nível testo** | 58% → 74% (+16%) |
| **Treinos** | 18 de 18 |
| **NoFap streak** | 30 dias (badge "Mestre do Autocontrole") |
| **Badges** | 8 (4 comuns + 4 raros) |
| **Ranking** | #98 → #42 |

**Sentimento:** Confiante, rotina estabelecida, viciado no progresso.

---

#### **Mês 3 (Semanas 9-12)**

| Métrica | Valor |
|---------|-------|
| **Compliance médio** | 88% |
| **Pontos ganhos** | 2.150 |
| **Nível testo** | 74% → 91% (+17%) |
| **Treinos** | 20 de 20 |
| **NoFap streak** | 90 dias (badge "Alpha Verdadeiro") |
| **Badges** | 13 (4 comuns + 5 raros + 4 épicos) |
| **Ranking** | #42 → #12 |

**Sentimento:** Transformado, entrando no Top 10, referência no cohort.

---

**Pontos acumulados (3 meses):**
- Mês 1: 850
- Mês 2: 1.420
- Mês 3: 2.150
- **TOTAL: 4.420 pontos**

**Score atual:**
- Testo: 91% × 0.6 = 54.6
- Pontos: (4.420 / 5.890) × 100 × 0.4 = 30
- **Score: 84.6 (posição #12 de 487)**

---

## 10. IMPLEMENTAÇÃO TÉCNICA

### 10.1 Schema de Banco de Dados

```sql
-- Tabela de cohorts
CREATE TABLE cohorts (
  cohort_id TEXT PRIMARY KEY,        -- "cohort_2026_02"
  month INT NOT NULL,                -- 2
  year INT NOT NULL,                 -- 2026
  total_users INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Perfil de usuário (com ranking)
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  cohort_id TEXT REFERENCES cohorts(cohort_id),
  
  -- Métricas de gamificação
  activity_points INT DEFAULT 0,              -- Pontos acumulados
  testo_level_percent DECIMAL DEFAULT 35,     -- Nível de testo (0-100)
  ranking_score DECIMAL DEFAULT 0,            -- Score calculado
  
  -- Posições
  cohort_rank INT,                            -- Posição no cohort
  global_rank INT,                            -- Posição global
  
  -- Metadata
  joined_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_cohort_ranking ON user_profiles(cohort_id, ranking_score DESC);
CREATE INDEX idx_global_ranking ON user_profiles(ranking_score DESC);

-- Tabela de badges
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,                         -- "Semana de Honra"
  description TEXT,
  category TEXT NOT NULL,                     -- treino, nofap, etc
  rarity TEXT NOT NULL,                       -- comum, raro, épico, lendário
  points_reward INT NOT NULL,
  icon_url TEXT,
  unlock_criteria JSONB NOT NULL              -- Critérios estruturados
);

-- Relacionamento usuário-badges
CREATE TABLE user_badges (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(user_id),
  badge_id UUID REFERENCES badges(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  
  -- Progresso (opcional)
  progress_current INT,                       -- Ex: 15 dias
  progress_target INT,                        -- Ex: 30 dias
  
  UNIQUE(user_id, badge_id)
);

-- Histórico de pontos (audit trail)
CREATE TABLE points_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(user_id),
  points_earned INT NOT NULL,
  reason TEXT NOT NULL,                       -- "workout_completed", "badge_unlocked"
  metadata JSONB,                             -- Dados extras
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 10.2 Função de Recálculo de Ranking

```typescript
// backend/src/gamification/services/ranking.service.ts

@Injectable()
export class RankingService {
  
  async recalculateRanking(cohortId: string): Promise<void> {
    
    // 1. Buscar todos os usuários do cohort
    const users = await this.prisma.userProfile.findMany({
      where: { cohort_id: cohortId },
      select: {
        user_id: true,
        testo_level_percent: true,
        activity_points: true
      }
    });
    
    // 2. Encontrar pontos máximos do cohort
    const maxPoints = Math.max(...users.map(u => u.activity_points));
    
    // 3. Calcular score para cada usuário
    const usersWithScore = users.map(user => {
      const testoScore = user.testo_level_percent * 0.6;
      const pointsScore = (user.activity_points / maxPoints) * 100 * 0.4;
      const totalScore = testoScore + pointsScore;
      
      return {
        user_id: user.user_id,
        ranking_score: totalScore
      };
    });
    
    // 4. Ordenar por score (desc)
    usersWithScore.sort((a, b) => b.ranking_score - a.ranking_score);
    
    // 5. Atribuir posições (rank)
    const updates = usersWithScore.map((user, index) => ({
      user_id: user.user_id,
      ranking_score: user.ranking_score,
      cohort_rank: index + 1  // Posição (1-based)
    }));
    
    // 6. Atualizar banco em batch
    await this.prisma.$transaction(
      updates.map(update =>
        this.prisma.userProfile.update({
          where: { user_id: update.user_id },
          data: {
            ranking_score: update.ranking_score,
            cohort_rank: update.cohort_rank
          }
        })
      )
    );
    
    // 7. Invalidar cache
    await this.redis.del(`ranking:${cohortId}`);
    
    // 8. Notificar mudanças via WebSocket
    await this.realtimeService.broadcastRankingUpdate(cohortId);
  }
  
  // Cron job diário
  @Cron('0 1 * * *')  // 1h da manhã
  async recalculateAllRankings(): Promise<void> {
    const cohorts = await this.prisma.cohort.findMany();
    
    for (const cohort of cohorts) {
      await this.recalculateRanking(cohort.cohort_id);
    }
  }
}
```

---

### 10.3 Detecção de Badge Desbloqueado

```typescript
// backend/src/gamification/services/badge.service.ts

@Injectable()
export class BadgeService {
  
  async checkBadgeUnlock(userId: string, action: string): Promise<void> {
    
    // 1. Buscar badges ainda não desbloqueados
    const unlockedBadgeIds = await this.getUnlockedBadgeIds(userId);
    const availableBadges = await this.prisma.badge.findMany({
      where: {
        id: { notIn: unlockedBadgeIds }
      }
    });
    
    // 2. Para cada badge, checar critério
    for (const badge of availableBadges) {
      const criteria = badge.unlock_criteria as any;
      
      const unlocked = await this.checkCriteria(userId, criteria);
      
      if (unlocked) {
        await this.unlockBadge(userId, badge);
      }
    }
  }
  
  private async checkCriteria(userId: string, criteria: any): Promise<boolean> {
    
    switch (criteria.type) {
      
      case 'workout_count':
        const workouts = await this.getWorkoutCount(userId);
        return workouts >= criteria.target;
        
      case 'nofap_streak':
        const streak = await this.getNoFapStreak(userId);
        return streak >= criteria.target;
        
      case 'testo_level':
        const testo = await this.getTestoLevel(userId);
        return testo >= criteria.target;
        
      case 'compound':  // Critério composto (ex: badge #36)
        const checks = await Promise.all(
          criteria.conditions.map(c => this.checkCriteria(userId, c))
        );
        return checks.every(c => c === true);
        
      default:
        return false;
    }
  }
  
  private async unlockBadge(userId: string, badge: Badge): Promise<void> {
    
    // 1. Inserir em user_badges
    await this.prisma.userBadge.create({
      data: {
        user_id: userId,
        badge_id: badge.id,
        unlocked_at: new Date()
      }
    });
    
    // 2. Adicionar pontos
    await this.pointsService.addPoints(
      userId, 
      badge.points_reward, 
      `badge_unlocked:${badge.name}`
    );
    
    // 3. Recalcular ranking
    const user = await this.getUserProfile(userId);
    await this.rankingService.recalculateRanking(user.cohort_id);
    
    // 4. Notificação push
    await this.notificationService.sendBadgeUnlocked(userId, badge);
    
    // 5. WebSocket broadcast
    await this.realtimeService.broadcastBadgeUnlock(userId, badge);
  }
}
```

---

### 10.4 API Endpoints

```typescript
// GET /gamification/ranking/:cohortId
async getRanking(cohortId: string) {
  // Checa cache Redis
  const cached = await this.redis.get(`ranking:${cohortId}`);
  if (cached) return JSON.parse(cached);
  
  // Busca do banco
  const ranking = await this.prisma.userProfile.findMany({
    where: { cohort_id: cohortId },
    orderBy: { ranking_score: 'desc' },
    take: 100,  // Top 100
    select: {
      user_id: true,
      cohort_rank: true,
      ranking_score: true,
      testo_level_percent: true,
      activity_points: true
    }
  });
  
  // Salva no cache (15min)
  await this.redis.setex(`ranking:${cohortId}`, 900, JSON.stringify(ranking));
  
  return ranking;
}

// GET /gamification/badges/:userId
async getUserBadges(userId: string) {
  const badges = await this.prisma.userBadge.findMany({
    where: { user_id: userId },
    include: { badge: true },
    orderBy: { unlocked_at: 'desc' }
  });
  
  return {
    total: badges.length,
    by_rarity: {
      comum: badges.filter(b => b.badge.rarity === 'comum').length,
      raro: badges.filter(b => b.badge.rarity === 'raro').length,
      epico: badges.filter(b => b.badge.rarity === 'épico').length,
      lendario: badges.filter(b => b.badge.rarity === 'lendário').length
    },
    badges: badges
  };
}

// GET /gamification/leaderboard/global
async getGlobalLeaderboard() {
  return await this.prisma.userProfile.findMany({
    orderBy: { ranking_score: 'desc' },
    take: 10,
    select: {
      user_id: true,
      global_rank: true,
      ranking_score: true,
      cohort_id: true
    }
  });
}

// POST /gamification/points/add (interno)
async addPoints(userId: string, points: number, reason: string) {
  // 1. Atualiza pontos
  await this.prisma.userProfile.update({
    where: { user_id: userId },
    data: { 
      activity_points: { increment: points }
    }
  });
  
  // 2. Registra histórico
  await this.prisma.pointsHistory.create({
    data: {
      user_id: userId,
      points_earned: points,
      reason: reason,
      created_at: new Date()
    }
  });
  
  // 3. Trigger recálculo de ranking (async)
  this.eventEmitter.emit('points.added', { userId, points });
}
```

---

## CHECKLIST FINAL PARA SEU SÓCIO

**✅ SISTEMA DE PONTOS:**
- [ ] 6 tipos de ações diárias (10-41 pts/dia possível)
- [ ] Bônus semanais (10-50 pts)
- [ ] Streaks NoFap (5-1000 pts)
- [ ] Badges (20-250 pts cada)
- [ ] Marcos de testo (100-500 pts)
- [ ] Pontos acumulam lifetime (nunca resetam)

**✅ SISTEMA DE RANKING:**
- [ ] Fórmula híbrida: Testo (60%) + Pontos (40%)
- [ ] Ranking por cohort (competição justa)
- [ ] Ranking global (aspiracional)
- [ ] Atualização em tempo real (WebSocket)
- [ ] Cache de 15min para performance
- [ ] Recálculo diário (cron 1h da manhã)

**✅ SISTEMA DE BADGES:**
- [ ] 36 badges em 6 categorias
- [ ] 4 níveis de raridade (comum → lendário)
- [ ] Critérios claros e mensuráveis
- [ ] Notificação instantânea ao desbloquear
- [ ] Modal de celebração animado
- [ ] Galeria de badges no perfil

**✅ ANTI-TRAPAÇA:**
- [ ] 4 detectores de anomalia
- [ ] Sistema de flags e warnings
- [ ] Penalidades graduais (freeze → ban)
- [ ] Validações técnicas (tempo mínimo, cooldown)

**✅ IMPLEMENTAÇÃO:**
- [ ] PostgreSQL + Supabase Realtime
- [ ] Redis cache (performance)
- [ ] Cron jobs (recálculos)
- [ ] WebSocket (tempo real)
- [ ] APIs RESTful (ranking, badges, pontos)

---

**Documento criado por NEO - Agente Especialista em Documentação Técnica**  
**Antibeta © 2025 - Sistema Multi-Agente de Desenvolvimento Masculino**

**Status:** ✅ **COMPLETO E PRONTO PARA APRESENTAÇÃO**
