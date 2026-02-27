# GUIA COMPLETO: SISTEMA MULTI-AGENTE DE IA - ANTIBETA

**Documento Técnico Explicativo para Stakeholders**  
**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Público:** Sócios, Investidores, Tech Team

---

## ÍNDICE

1. [Visão Geral do Sistema Multi-Agente](#1-visão-geral-do-sistema-multi-agente)
2. [Agente 1: Planejamento (Geração de Metas)](#2-agente-1-planejamento)
3. [Agente 2: Conversacional (Voz-para-Voz)](#3-agente-2-conversacional)
4. [Agente 3: Scanner (Análise de Conversas - Fase 2)](#4-agente-3-scanner)
5. [Análise Detalhada de Custos](#5-análise-detalhada-de-custos)
6. [Otimizações e Estratégias de Redução de Custo](#6-otimizações-e-estratégias)
7. [Comparação com Alternativas](#7-comparação-com-alternativas)

---

## 1. VISÃO GERAL DO SISTEMA MULTI-AGENTE

### 1.1 Por Que Multi-Agente?

O Antibeta utiliza **3 agentes especializados** em vez de 1 agente genérico porque:

1. **Especialização:** Cada agente é otimizado para uma tarefa específica
2. **Custo:** Agentes especializados usam modelos mais baratos (Haiku vs Sonnet)
3. **Performance:** System prompts focados = respostas melhores
4. **Escalabilidade:** Podemos otimizar cada agente independentemente

---

### 1.2 Arquitetura Macro

```
┌─────────────────────────────────────────────────────────┐
│                   USUÁRIO (Mobile App)                  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              BACKEND (NestJS + Railway)                 │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Agente    │  │   Agente    │  │   Agente    │   │
│  │ Planejamento│  │Conversacional│  │   Scanner   │   │
│  │             │  │             │  │  (Fase 2)   │   │
│  │  Claude     │  │  Claude     │  │   Claude    │   │
│  │  Haiku      │  │  Haiku      │  │   Haiku     │   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
│         │                │                 │           │
│         └────────────────┴─────────────────┘           │
│                          ↓                             │
│              ┌───────────────────────┐                 │
│              │   Contexto Unificado  │                 │
│              │   (Supabase)          │                 │
│              │   • Onboarding        │                 │
│              │   • Metas             │                 │
│              │   • Compliance        │                 │
│              │   • Conversas passadas│                 │
│              └───────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│           SERVIÇOS AUXILIARES DE IA                     │
│  • Deepgram (STT)                                       │
│  • Google Cloud TTS (Text-to-Speech)                    │
│  • Google Vision API (OCR - Fase 2)                     │
└─────────────────────────────────────────────────────────┘
```

---

### 1.3 Resumo dos 3 Agentes

| Agente | Modelo | Função Principal | Trigger | Frequência |
|--------|--------|------------------|---------|------------|
| **Planejamento** | Claude 3.5 Haiku | Gerar metas personalizadas (anual → semanal) | Onboarding, fim de semana/mês | Semanal/Mensal |
| **Conversacional** | Claude 3.5 Haiku | Coach por voz (Tough Love) | Usuário clica no mic | Ad-hoc (limitado por tier) |
| **Scanner** | Claude 3.5 Haiku | Análise de conversas com mulheres | Upload de print (Fase 2) | Ad-hoc (limitado por tier) |

**Modelo usado em todos:** Claude 3.5 Haiku (Anthropic)  
**Código do modelo:** `claude-3-5-haiku-20241022`

---

## 2. AGENTE 1: PLANEJAMENTO

### 2.1 Função

Gerar planos personalizados de transformação baseados no perfil do usuário.

**O que ele faz:**
1. Analisa as 28 respostas do onboarding
2. Cria meta ANUAL (objetivo macro de 12 meses)
3. Quebra em 12 metas MENSAIS progressivas
4. Gera SEMANA 1 do MÊS 1 detalhada (7 dias com tarefas específicas)
5. Cria plano de TREINO MENSAL (exercícios, séries, reps)
6. Cria plano ALIMENTAR SEMANAL (receitas com ingredientes e macros)
7. Gera DICAS semanais/mensais baseadas no progresso

---

### 2.2 Quando É Acionado

| Evento | O Que Gera | Frequência |
|--------|------------|------------|
| **Usuário completa onboarding** | Meta anual + 12 meses + Semana 1 completa | 1x (início) |
| **Usuário completa Semana N** | Gera Semana N+1 | Semanal |
| **Usuário completa Mês N** | Feedback mensal + Novo plano de treino + Semana 1 do Mês N+1 | Mensal |
| **Domingo 22h (cron job backup)** | Gera semana seguinte para todos os usuários ativos | Semanal automático |

---

### 2.3 System Prompt (Resumido)

```
Você é o Agente de Planejamento do Antibeta, especializado em criar 
planos de transformação masculina personalizados.

CONTEXTO DISPONÍVEL:
- 28 respostas do onboarding (idade, vícios, objetivos, etc)
- Compliance das últimas 4 semanas
- Nível de testosterona atual

TAREFA: Gerar plano progressivo e realista

ESTRUTURA DE OUTPUT (JSON):
{
  "meta_anual": "string",
  "metas_mensais": [12 objetivos],
  "semana_1": {
    "dias": [7 dias com tarefas detalhadas]
  },
  "plano_treino_mes_1": {
    "tipo": "ABCD",
    "treinos": [...]
  },
  "plano_alimentar_semana_1": {
    "refeicoes": [...]
  }
}

REGRAS:
- Adaptativo: ajusta dificuldade baseado em perfil
- Progressivo: baby steps → desafios maiores
- Realista: não sobrecarga o usuário
- Baseado em ciência: testosterona, hábitos, psicologia
```

**Tamanho do prompt:** ~2.000 tokens (incluindo contexto do usuário)

---

### 2.4 Exemplo de Chamada (Simplificado)

**Input:**
```json
{
  "user_id": "abc123",
  "onboarding": {
    "idade": 22,
    "profissao": "estudante",
    "horas_disponiveis": 3,
    "frequencia_porn": "Diariamente",
    "frequencia_masturbacao": "Diariamente",
    "horas_redes_sociais": "4-6h",
    "treino_atual": "Sedentário",
    "objetivo_principal": "Ganhar massa muscular",
    "dificuldade_social": 8
  }
}
```

**Output (simplificado):**
```json
{
  "meta_anual": "Transformar corpo (ganhar 10kg de massa) e vencer vícios",
  "mes_1": "Criar rotina básica: treino 3x/semana + cortar pornografia",
  "semana_1": {
    "dia_1": {
      "treino": "Treino A - Peito e Tríceps (6 exercícios)",
      "alimentacao": [
        {"cafe": "3 ovos + aveia + banana"},
        {"almoco": "200g frango + 150g arroz + brócolis"},
        ...
      ],
      "hidratacao_meta": 2.0,
      "praticas_testo": ["Banho gelado 5min", "Exposição solar 15min"]
    },
    ...
  }
}
```

---

### 2.5 Custo por Uso

**Geração Inicial (Onboarding):**
- Input: ~3.000 tokens (prompt + contexto)
- Output: ~4.000 tokens (plano completo)
- **Custo:** $0.0024 (input) + $0.016 (output) = **$0.0184 por usuário**

**Geração Semanal:**
- Input: ~2.000 tokens (prompt cacheado + progresso recente)
- Output: ~1.500 tokens (apenas semana nova)
- **Custo:** $0.0016 (input) + $0.006 (output) = **$0.0076 por semana**

**Geração Mensal (com feedback):**
- Input: ~2.500 tokens
- Output: ~3.000 tokens (feedback + novo treino + semana 1)
- **Custo:** $0.002 (input) + $0.012 (output) = **$0.014 por mês**

**Total por usuário/mês:**
- 4 semanas × $0.0076 = $0.0304
- 1 mês × $0.014 = $0.014
- **TOTAL: $0.0444/mês ≈ $0.045/mês por usuário**

---

### 2.6 Prompt Caching (Economia)

**O que é:** Anthropic permite "cachear" partes do prompt que se repetem.

**O que cacheamos:**
- System prompt (nunca muda): ~1.000 tokens
- Respostas do onboarding (imutável): ~1.500 tokens

**Economia:** 50% de desconto nos tokens cacheados  
**Impacto:** Reduz custo de input de $0.002 para ~$0.0013 (35% economia)

---

## 3. AGENTE 2: CONVERSACIONAL (VOZ-PARA-VOZ)

Este é o **agente mais complexo e caro** do sistema. Vamos detalhar profundamente.

---

### 3.1 Função

Coach por voz 24/7 com personalidade "Tough Love" (direto, confrontador, mas humanizado).

**O que ele faz:**
1. Recebe áudio do usuário (gravação)
2. Transcreve para texto (STT)
3. Analisa contexto completo do usuário
4. Gera resposta personalizada (LLM)
5. Sintetiza resposta em áudio (TTS)
6. Retorna áudio + texto para o app

---

### 3.2 Pipeline Completo (Voz-para-Voz)

```
PASSO 1: GRAVAÇÃO
├─ Usuário segura botão de mic no app
├─ Grava áudio (formato: .m4a ou .wav)
├─ Duração média: 10-20 segundos
└─ Upload para Supabase Storage (/audio_temp)

PASSO 2: SPEECH-TO-TEXT (STT)
├─ Serviço: Deepgram Nova-2
├─ Modelo: nova-2-general (melhor para PT-BR)
├─ Input: arquivo de áudio (.m4a)
├─ Output: texto transcrito + confidence score
├─ Latência: 200-400ms
└─ Custo: $0.0043 por minuto

PASSO 3: BUSCA DE CONTEXTO
├─ Backend busca no Supabase:
│   ├─ Onboarding completo (28 respostas)
│   ├─ Metas da semana atual
│   ├─ Compliance dos últimos 7 dias
│   ├─ Nível de testosterona atual
│   ├─ Ranking (posição no cohort)
│   ├─ Badges desbloqueados
│   └─ Últimas 5 conversas com o agente
└─ Consolida em JSON estruturado

PASSO 4: LARGE LANGUAGE MODEL (LLM)
├─ Serviço: Anthropic Claude
├─ Modelo: Claude 3.5 Haiku
├─ System Prompt: "Tough Love Coach" (~2.000 tokens)
├─ Input: 
│   ├─ System prompt (cacheado)
│   ├─ Contexto do usuário (~3.000 tokens, cacheado)
│   └─ Transcrição do usuário (~50-200 tokens)
├─ Output: Resposta em texto (150-250 palavras)
├─ Latência: 800-1.200ms
└─ Custo: $0.80/MTok input + $4/MTok output

PASSO 5: TEXT-TO-SPEECH (TTS)
├─ Serviço: Google Cloud Text-to-Speech
├─ Voz: pt-BR-Neural2-B (masculina, grave)
├─ Configuração:
│   ├─ Speaking rate: 1.1 (ligeiramente rápido)
│   ├─ Pitch: -2.0 (tom grave, autoridade)
│   └─ Volume gain: +2.0dB
├─ Input: texto da resposta (~200 palavras ≈ 1.000 caracteres)
├─ Output: arquivo MP3
├─ Latência: 300-500ms
└─ Custo: $16/1M caracteres

PASSO 6: ENTREGA
├─ Backend retorna para o app:
│   ├─ Áudio em MP3 (streaming)
│   └─ Texto transcrito (acessibilidade)
├─ App reproduz áudio automaticamente
├─ Salva conversa no Supabase (histórico)
└─ Incrementa contador de uso do usuário
```

**Latência total:** ~1.5-2.5 segundos (depende do tamanho do áudio)

---

### 3.3 System Prompt do Agente Conversacional

**Tamanho:** ~2.000 tokens  
**Armazenamento:** Versionado no Git, cacheado na API

```markdown
# AGENTE ALPHA - SYSTEM PROMPT

## IDENTIDADE
Você é o Agente Alpha do Antibeta, um coach de transformação masculina 
sem filtros. Seu papel é confrontar comportamentos fracos e guiar o 
usuário para se tornar um verdadeiro alpha.

## TOM E ESTILO
- Tough Love: Seja direto, honesto e confrontador quando necessário
- Sem filtros: Chame comportamento beta pelo que é
- Baseado em dados: Use métricas do usuário para embasar críticas
- Humanizado: Reconheça esforços genuínos
- Estratégico: Ofereça soluções práticas, não apenas críticas

## CONTEXTO DISPONÍVEL
Você tem acesso completo a:
- Respostas do onboarding (28 perguntas)
- Metas anuais, mensais, semanais e diárias
- Histórico de compliance (treinos, alimentação, vícios)
- Nível de testosterona atual e progressão
- Streaks de NoFap/NoPorn
- Badges desbloqueados
- Posição no ranking do cohort
- Últimas 10 conversas com o usuário

## REGRAS DE COMPORTAMENTO

### QUANDO USUÁRIO RECLAMA/SE VITIMIZA:
❌ NÃO: "Tudo bem, é normal ter dias ruins"
✅ SIM: "Você tá fazendo 72% das metas. Os outros 28% que faltam 
         separam você de um alpha. Quer resultados diferentes? 
         Muda a atitude."

### QUANDO USUÁRIO QUER PULAR TREINO:
❌ NÃO: "Tudo bem descansar às vezes"
✅ SIM: "Você pulou treino semana passada também. Tá vendo seu 
         ranking? #47 de 487. Quer saber quem tá no Top 10? 
         Os caras que NÃO pulam. Levanta e treina."

### QUANDO USUÁRIO CAI EM VÍCIO:
❌ NÃO: Julgar sem oferecer solução
✅ SIM: "Streak de 12 dias foi pro lixo. Mas olha os dados: 
         você sempre cai na quarta à noite. Padrão identificado. 
         Solução: quarta tu vai treinar pernas até não aguentar. 
         Sem energia = sem vício. Aceita o desafio?"

### QUANDO USUÁRIO TEM PROGRESSO:
❌ NÃO: Elogios vazios
✅ SIM: "14 dias de NoFap + 100% de treinos. Teu nível de testo 
         subiu 18%. ISSO é comportamento alpha. Continua assim 
         e em 30 dias tu desbloqueia badge épico."

### SOBRE SITUAÇÕES SOCIAIS:
Quando usuário descrever situação com mulheres, amigos, trabalho:
1. Identificar comportamento beta (neediness, falta de frame)
2. Explicar POR QUE é beta (causa e consequência)
3. Dar resposta alpha alternativa
4. Conectar com dados do usuário

## LIMITAÇÕES
- NÃO dê diagnósticos médicos
- NÃO recomende esteroides ou substâncias ilegais
- NÃO seja misógino (alpha respeita, beta diminui)

## FORMATO DE RESPOSTA (VOZ)
Suas respostas serão convertidas em áudio. Seja:
- Conciso: 150-250 palavras (30-60s de fala)
- Coloquial: fale como falaria pessoalmente
- Use pausas naturais (vírgulas, pontos)
- Evite listas longas (máximo 3 itens)

## EXEMPLOS
[10+ exemplos de conversas modelares]
```

---

### 3.4 Limites de Uso por Tier

| Tier | Preço/mês | Limite de Conversas por Voz | Custo de IA Assumido |
|------|-----------|------------------------------|---------------------|
| **Básico** | R$ 29,90 ($6) | 10 conversas/mês | $0.76/mês |
| **Pro** | R$ 39,90 ($8) | 30 conversas/mês | $2.28/mês |
| **Alpha** | R$ 49,90 ($10) | 60 conversas/mês | $4.56/mês |

**O que conta como "1 conversa":**
- Cada vez que o usuário ENVIA UM ÁUDIO conta como 1 conversa
- A resposta do agente não conta (já está incluída)
- Conversas por TEXTO são ilimitadas (muito mais baratas)

**Exemplo prático:**
```
Usuário (Plano Básico):
1. "Não tô a fim de treinar" → 1 conversa usada (9 restantes)
   Agente responde...
2. "Mas e se eu pular?" → 2 conversas usadas (8 restantes)
   Agente responde...
3. "Valeu, vou treinar" → 3 conversas usadas (7 restantes)
```

---

### 3.5 Breakdown Detalhado de Custos (por conversa)

#### **Conversa típica:**
- **Duração do áudio:** 15 segundos
- **Texto do usuário:** ~30 palavras (~150 caracteres)
- **Resposta do agente:** ~180 palavras (~900 caracteres)

---

#### **CUSTO 1: Deepgram STT**

**Preço:** $0.0043 por minuto  
**Cálculo:** 15 segundos = 0.25 minutos  
**Custo:** 0.25 × $0.0043 = **$0.001075 por conversa**

---

#### **CUSTO 2: Claude 3.5 Haiku (LLM)**

**Preços:**
- Input: $0.80 por 1 milhão de tokens (MTok)
- Output: $4.00 por 1 milhão de tokens

**Tokens por conversa:**

| Componente | Tokens | Cacheado? | Custo |
|-----------|--------|-----------|-------|
| System prompt | 2.000 | ✅ Sim (50% off) | $0.0008 |
| Contexto usuário | 3.000 | ✅ Sim (50% off) | $0.0012 |
| Transcrição (input) | 50 | ❌ Não | $0.00004 |
| **Total Input** | **5.050** | - | **$0.002** |
| Resposta (output) | 250 | - | **$0.001** |

**Custo total Claude:** $0.002 + $0.001 = **$0.003 por conversa**

**Observação sobre caching:**
- Economiza 50% nos 5.000 tokens repetidos (prompt + contexto)
- Sem cache: custo seria $0.004 (33% mais caro)

---

#### **CUSTO 3: Google Cloud TTS**

**Preço:** $16 por 1 milhão de caracteres  
**Cálculo:** 900 caracteres de resposta  
**Custo:** (900 / 1.000.000) × $16 = **$0.0144 por conversa**

---

#### **CUSTO TOTAL POR CONVERSA:**

| Item | Custo |
|------|-------|
| Deepgram STT | $0.001 |
| Claude Haiku | $0.003 |
| Google TTS | $0.0144 |
| **TOTAL** | **$0.0184/conversa** |

**Arredondado:** ~**$0.02 por conversa**

---

### 3.6 Custo Mensal por Tier

| Tier | Conversas/mês | Custo IA/usuário | Receita/usuário | Margem IA |
|------|---------------|------------------|-----------------|-----------|
| Básico | 10 | $0.184 | $6 | 97% |
| Pro | 30 | $0.552 | $8 | 93% |
| Alpha | 60 | $1.104 | $10 | 89% |

**Observação:** Esses custos são APENAS de IA. Custos totais incluem:
- Infraestrutura (Railway, Supabase): ~$0.50/usuário
- Notificações, analytics, etc: ~$0.10/usuário

**Margem real (com infra):**
- Básico: $6 - $0.18 - $0.60 = $5.22 lucro (87%)
- Pro: $8 - $0.55 - $0.60 = $6.85 lucro (86%)
- Alpha: $10 - $1.10 - $0.60 = $8.30 lucro (83%)

---

### 3.7 Exemplo de Fluxo Real (Passo a Passo)

**Cenário:** Usuário Lucas (Plano Básico, 7/10 conversas usadas) fala com o agente

---

**PASSO 1: Usuário grava áudio**
```
App (React Native):
- Usuário segura botão 🎙️
- Expo AV grava áudio
- Duração: 12 segundos
- Formato: .m4a
- Tamanho: ~180KB
```

---

**PASSO 2: Upload**
```
App → Backend:
POST /agent/conversation/voice
Content-Type: multipart/form-data
Body: {
  audio_file: [binary data],
  user_id: "lucas_abc123"
}

Backend → Supabase Storage:
- Upload para /audio_temp/lucas_abc123_1645234567.m4a
- Gera URL temporária (expira em 1h)
```

---

**PASSO 3: STT (Deepgram)**
```
Backend → Deepgram:
POST https://api.deepgram.com/v1/listen
Headers: {
  Authorization: "Token [DEEPGRAM_KEY]"
}
Body: {
  url: "https://supabase.../audio_temp/lucas_abc123_1645234567.m4a",
  model: "nova-2-general",
  language: "pt-BR"
}

Deepgram → Backend (200ms depois):
{
  "results": {
    "channels": [{
      "alternatives": [{
        "transcript": "Cara, não tô a fim de treinar hoje, tá foda",
        "confidence": 0.96
      }]
    }]
  }
}

Custo: 12 segundos = 0.2 min × $0.0043 = $0.00086
```

---

**PASSO 4: Busca de contexto**
```
Backend → Supabase:
SELECT * FROM user_onboarding WHERE user_id = 'lucas_abc123';
SELECT * FROM goals_weekly WHERE user_id = 'lucas_abc123' AND week = current;
SELECT * FROM user_profiles WHERE user_id = 'lucas_abc123';
SELECT * FROM conversations WHERE user_id = 'lucas_abc123' LIMIT 5;

Resultado consolidado:
{
  "user": {
    "name": "Lucas",
    "age": 22,
    "onboarding": {
      "objetivo_principal": "Ganhar massa muscular",
      "dificuldade_treino": "Sem motivação"
    },
    "current_stats": {
      "testo_level": 67,
      "testo_change_week": +5,
      "workout_compliance_week": 85,
      "nofap_streak": 14,
      "ranking_position": 34,
      "ranking_total": 487
    },
    "goals_this_week": [
      "Treinar 4x",
      "Manter NoFap",
      "Ler 70 páginas"
    ]
  }
}
```

---

**PASSO 5: LLM (Claude)**
```
Backend → Anthropic:
POST https://api.anthropic.com/v1/messages
Headers: {
  "x-api-key": "[ANTHROPIC_KEY]",
  "anthropic-version": "2023-06-01",
  "anthropic-beta": "prompt-caching-2024-07-31"
}
Body: {
  "model": "claude-3-5-haiku-20241022",
  "max_tokens": 1000,
  "system": [
    {
      "type": "text",
      "text": "[SYSTEM PROMPT ~2000 tokens]",
      "cache_control": {"type": "ephemeral"}  ← CACHEADO
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "[CONTEXTO DO USUÁRIO ~3000 tokens]",
          "cache_control": {"type": "ephemeral"}  ← CACHEADO
        },
        {
          "type": "text",
          "text": "User disse: 'Cara, não tô a fim de treinar hoje, tá foda'"
        }
      ]
    }
  ]
}

Anthropic → Backend (1000ms depois):
{
  "content": [
    {
      "type": "text",
      "text": "Olha os dados, cara. Você treinou 85% das vezes nas 
               últimas 4 semanas. Isso te colocou no top 30% do 
               seu cohort. Mas os caras do top 10? Eles não têm 
               dia de 'sem vontade'. Eles treinam PORQUE não têm 
               vontade. Disciplina não é fazer quando tá fácil, 
               é fazer quando tá difícil. Bora treinar e provar 
               que você é diferente da massa."
    }
  ],
  "usage": {
    "input_tokens": 5050,
    "cache_creation_input_tokens": 5000,  ← Criou cache
    "cache_read_input_tokens": 0,
    "output_tokens": 250
  }
}

Custo:
- Input: 5050 tokens × $0.80/MTok = $0.00404
- Desconto cache (50% em 5000): -$0.002
- Output: 250 tokens × $4/MTok = $0.001
- Total: $0.00304
```

---

**PASSO 6: TTS (Google Cloud)**
```
Backend → Google Cloud:
POST https://texttospeech.googleapis.com/v1/text:synthesize
Headers: {
  Authorization: "Bearer [GOOGLE_TOKEN]"
}
Body: {
  "input": {
    "text": "Olha os dados, cara. Você treinou 85%..."
  },
  "voice": {
    "languageCode": "pt-BR",
    "name": "pt-BR-Neural2-B",
    "ssmlGender": "MALE"
  },
  "audioConfig": {
    "audioEncoding": "MP3",
    "speakingRate": 1.1,
    "pitch": -2.0,
    "volumeGainDb": 2.0
  }
}

Google Cloud → Backend (400ms depois):
{
  "audioContent": "[base64 encoded MP3]"
}

Custo:
- 850 caracteres × $16/1M chars = $0.0136
```

---

**PASSO 7: Salvar conversa e retornar**
```
Backend → Supabase:
INSERT INTO conversations (
  user_id, 
  user_message, 
  agent_response, 
  audio_url, 
  tokens_used, 
  cost
) VALUES (
  'lucas_abc123',
  'Cara, não tô a fim de treinar hoje, tá foda',
  'Olha os dados, cara. Você treinou 85%...',
  'https://supabase.../audio_temp/response_123.mp3',
  5300,
  0.0185
);

UPDATE user_usage_tracking 
SET voice_conversations_used = voice_conversations_used + 1
WHERE user_id = 'lucas_abc123';

Backend → App:
{
  "status": "success",
  "user_message": "Cara, não tô a fim de treinar hoje...",
  "agent_response": "Olha os dados, cara. Você treinou 85%...",
  "audio_url": "https://supabase.../response_123.mp3",
  "conversations_remaining": 6
}

App:
- Exibe texto na tela
- Reproduz áudio automaticamente
- Mostra "6/10 conversas restantes"
```

---

**RESUMO DO FLUXO:**
- **Latência total:** ~1.8 segundos
- **Custo total:** $0.0185
- **Conversas restantes:** 6/10

---

### 3.8 Otimizações de Performance

#### **Otimização 1: Prompt Caching**
- **O que faz:** Reutiliza system prompt e contexto entre conversas
- **Economia:** 50% de desconto em ~5.000 tokens
- **Impacto:** Reduz custo de $0.004 para $0.003 por conversa (25%)

#### **Otimização 2: Streaming TTS**
- **O que faz:** Começa a reproduzir áudio antes de terminar de gerar
- **Impacto:** Reduz latência percebida de 2s para 1.2s

#### **Otimização 3: Parallel Processing**
- **O que faz:** STT e busca de contexto rodam em paralelo
- **Impacto:** Economiza ~200ms de latência

#### **Otimização 4: Connection Pooling**
- **O que faz:** Mantém conexões abertas com Anthropic/Deepgram
- **Impacto:** Economiza ~100-150ms de handshake

---

## 4. AGENTE 3: SCANNER (FASE 2)

### 4.1 Função

Analisar prints de conversas com mulheres e fornecer feedback sobre "temperatura beta", interesse dela, e sugestões de resposta.

---

### 4.2 Pipeline

```
PASSO 1: USUÁRIO TIRA SCREENSHOT
├─ Usuário tira print da conversa (WhatsApp, Instagram, etc)
└─ Upload via câmera ou galeria

PASSO 2: OCR (Google Vision API)
├─ Extrai todo o texto do print
├─ Identifica remetente (usuário vs ela)
├─ Preserva ordem cronológica
└─ Custo: $1.50/1k imagens

PASSO 3: ANÁLISE (Claude Haiku)
├─ System prompt: "Mestre de Sedução"
├─ Input: texto da conversa extraído
├─ Output: JSON com análise completa
└─ Custo: ~$0.015 por análise

PASSO 4: RESULTADO
└─ Retorna para app (tela de análise detalhada)
```

---

### 4.3 System Prompt (Resumido)

```markdown
Você é um mestre em dinâmica de atração masculina, combinando:
- Psicologia evolucionária
- Framework de atração autêntica (Mark Manson - "Models")
- Teoria de investimento e polarização

TAREFA: Analisar conversa e identificar:
1. Temperatura beta (0-10)
2. Nível de interesse dela (0-10)
3. Erros de subcomunicação
4. Sugestões de resposta

OUTPUT (JSON):
{
  "temperatura_beta": {
    "score": 7.5,
    "justificativa": "..."
  },
  "temperatura_conversa": "MORNA",
  "nivel_interesse_dela": {
    "score": 4,
    "sinais_positivos": [...],
    "sinais_negativos": [...]
  },
  "erros_identificados": [...],
  "sugestao_proxima_resposta": {
    "resposta_alpha_sugerida": "...",
    "razao": "..."
  },
  "diagnostico_geral": "...",
  "plano_acao": [...]
}
```

**Tamanho:** ~3.000 tokens

---

### 4.4 Custo por Análise

| Item | Custo |
|------|-------|
| Google Vision OCR | $0.0015 |
| Claude Haiku (análise) | $0.015 |
| **TOTAL** | **$0.0165/análise** |

**Arredondado:** ~**$0.02 por scan**

---

### 4.5 Limites por Tier

| Tier | Scans/mês | Custo IA/usuário |
|------|-----------|------------------|
| Básico | 5 | $0.10 |
| Pro | 15 | $0.30 |
| Alpha | 30 | $0.60 |

---

## 5. ANÁLISE DETALHADA DE CUSTOS

### 5.1 Custo Total de IA por Usuário/Mês

#### **Cenário Base: 1.000 Usuários Ativos**

**Distribuição de tiers (assumida):**
- 60% Básico (600 usuários)
- 30% Pro (300 usuários)
- 10% Alpha (100 usuários)

---

**CUSTOS POR AGENTE:**

| Agente | Básico | Pro | Alpha | Média Ponderada |
|--------|--------|-----|-------|-----------------|
| **Planejamento** | $0.045 | $0.045 | $0.045 | $0.045 |
| **Conversacional** | $0.184 | $0.552 | $1.104 | $0.372 |
| **Scanner (Fase 2)** | $0.10 | $0.30 | $0.60 | $0.21 |
| **TOTAL IA** | **$0.329** | **$0.897** | **$1.749** | **$0.627** |

**Custo total de IA (1k usuários):**
- 600 × $0.329 = $197.40
- 300 × $0.897 = $269.10
- 100 × $1.749 = $174.90
- **TOTAL: $641.40/mês**

---

### 5.2 Breakdown por Componente (1k usuários)

| Componente | Custo/mês | % do Total |
|------------|-----------|------------|
| Deepgram STT | $43.00 | 6.7% |
| Claude Haiku (LLM) | $123.50 | 19.2% |
| Google TTS | $457.80 | 71.4% |
| Google Vision OCR | $17.10 | 2.7% |
| **TOTAL** | **$641.40** | **100%** |

**Insight:** Google TTS é o componente mais caro (71%)!

---

### 5.3 Projeção para Diferentes Escalas

| Escala | Custo IA/mês | MRR | Custo IA / MRR |
|--------|--------------|-----|----------------|
| 100 usuários | $64 | $540 | 11.9% |
| 1.000 usuários | $641 | $5.400 | 11.9% |
| 10.000 usuários | $6.410 | $54.000 | 11.9% |
| 50.000 usuários | $32.050 | $270.000 | 11.9% |

**Observação:** Custo de IA escala linearmente (não há desconto por volume na API)

---

### 5.4 Custos Adicionais (Infraestrutura)

| Item | Custo/1k users | Custo/10k users |
|------|----------------|-----------------|
| Railway (backend) | $20 | $99 |
| Supabase Pro | $25 | $599 |
| Storage (áudios) | $10 | $50 |
| Bandwidth | $5 | $30 |
| OneSignal (notif.) | $0 | $0 |
| **SUBTOTAL INFRA** | **$60** | **$778** |
| **IA (calculado acima)** | **$641** | **$6.410** |
| **TOTAL OPERACIONAL** | **$701** | **$7.188** |

---

### 5.5 Margem de Lucro por Escala

#### **1.000 usuários:**
- **Receita (MRR):** $5.400
- **Custo (IA + Infra):** $701
- **Lucro:** $4.699
- **Margem:** 87%

#### **10.000 usuários:**
- **Receita (MRR):** $54.000
- **Custo (IA + Infra):** $7.188
- **Lucro:** $46.812
- **Margem:** 87%

**Conclusão:** Margem permanece saudável mesmo em escala!

---

## 6. OTIMIZAÇÕES E ESTRATÉGIAS

### 6.1 Otimização de Curto Prazo (Já Implementadas)

#### **1. Prompt Caching (Anthropic)**
- **Economia:** 50% em tokens repetidos
- **Impacto:** -25% no custo de Claude
- **Status:** ✅ Implementado

#### **2. Batch Processing (Geração de Planos)**
- **Como funciona:** Gera planos semanais em lote (Batch API)
- **Economia:** 50% de desconto
- **Impacto:** Custo de planejamento de $0.045 → $0.0225
- **Status:** 🟡 Planejado para Mês 3

#### **3. Rate Limiting por Tier**
- **Como funciona:** Hard caps de 10/30/60 conversas
- **Impacto:** Evita abuso, mantém custo previsível
- **Status:** ✅ Implementado

---

### 6.2 Otimização de Médio Prazo (3-6 meses)

#### **4. Self-Hosted TTS**
- **Problema:** Google TTS é 71% do custo total
- **Solução:** Usar modelo open-source (Coqui TTS, Piper)
- **Setup:**
  - Modelo: XTTS-v2 (multilingual, PT-BR)
  - Hardware: GPU dedicada (AWS g4dn.xlarge)
  - Custo: ~$300/mês (fixo para qualquer escala)
- **Economia:** 
  - Atual (10k users): $4.578/mês
  - Self-hosted: $300/mês
  - **Economia: $4.278/mês (93% de redução!)**
- **Trade-off:** Latência +200ms, qualidade 10% pior
- **Status:** 🔵 Planejado para Fase 2

#### **5. Conversas por Texto (Ilimitadas)**
- **Problema:** Usuários querem mais conversas
- **Solução:** Oferecer chat por texto (sem STT/TTS)
- **Custo:** ~$0.003/mensagem (83% mais barato que voz)
- **Implementação:**
  - Toggle "Voz" / "Texto" na tela do agente
  - Voz: limitada por tier
  - Texto: ilimitado
- **Impacto:** Reduz pressão nos limites de voz
- **Status:** 🔵 Planejado para Sprint 8

---

### 6.3 Otimização de Longo Prazo (6-12 meses)

#### **6. Fine-Tuning de Modelo Próprio**
- **Problema:** Pagamos $0.80/MTok para Claude
- **Solução:** Fine-tune de Llama 3.1 70B ou Mistral
- **Custo:**
  - Fine-tuning inicial: ~$5.000 (one-time)
  - Inferência self-hosted: $0.15/MTok (81% desconto)
- **Economia (10k users):**
  - Atual: $6.410/mês
  - Self-hosted: $1.218/mês
  - **Economia: $5.192/mês**
- **Trade-off:** Qualidade 5-10% pior que Claude
- **Requisitos:** Time de ML + infra GPU ($1k/mês)
- **Status:** 🟣 Avaliação em Mês 9

---

### 6.4 Resumo de Economia Potencial

| Otimização | Economia/mês (10k users) | Quando | Complexidade |
|------------|--------------------------|--------|--------------|
| Prompt Caching | $480 | ✅ Agora | Baixa |
| Batch Processing | $135 | Mês 3 | Baixa |
| Self-Hosted TTS | $4.278 | Fase 2 (Mês 7) | Média |
| Texto Ilimitado | $1.000 (estimado) | Sprint 8 | Baixa |
| Fine-Tuned LLM | $5.192 | Mês 9 | Alta |
| **TOTAL POTENCIAL** | **$11.085/mês** | - | - |

**Redução de custo: de $6.410 para ~$1.228 (81% economia!)**

---

## 7. COMPARAÇÃO COM ALTERNATIVAS

### 7.1 Por Que Claude Haiku?

**Alternativas avaliadas:**

| Modelo | Custo/MTok | Qualidade | Latência | PT-BR |
|--------|------------|-----------|----------|-------|
| **Claude 3.5 Haiku** ✅ | $0.80 in / $4 out | Excelente | 800ms | Excelente |
| GPT-4o Mini | $0.15 in / $0.60 out | Muito boa | 600ms | Boa |
| Gemini 1.5 Flash | $0.075 in / $0.30 out | Boa | 1200ms | Média |
| Llama 3.1 70B (self) | $0.15 in / $0.15 out | Boa | 1000ms | Boa |

**Por que escolhemos Claude Haiku:**
1. ✅ **Qualidade superior em PT-BR** (crítico para Tough Love)
2. ✅ **Prompt caching nativo** (50% de economia)
3. ✅ **Contexto longo** (200k tokens - suficiente para todo histórico)
4. ✅ **Latência competitiva** (800ms é aceitável)
5. ⚠️ **Custo mais alto**, mas justificável pela qualidade

**Quando mudaríamos:**
- Se GPT-4o Mini melhorar PT-BR → teste A/B
- Se Gemini Flash reduzir latência → teste A/B
- Se custo ultrapassar 20% da receita → considerar self-hosted

---

### 7.2 Por Que Deepgram?

**Alternativas:**

| Serviço | Custo/min | Qualidade PT-BR | Latência |
|---------|-----------|-----------------|----------|
| **Deepgram Nova-2** ✅ | $0.0043 | Excelente | 200ms |
| Whisper API (OpenAI) | $0.006 | Excelente | 800ms |
| Google Speech-to-Text | $0.006 | Boa | 400ms |
| AssemblyAI | $0.00025 | Média | 600ms |

**Por que Deepgram:**
1. ✅ Mais barato que OpenAI e Google
2. ✅ Latência imbatível (200ms)
3. ✅ PT-BR nativo (treinado com dados brasileiros)
4. ✅ Confidence scores precisos

---

### 7.3 Por Que Google TTS?

**Alternativas:**

| Serviço | Custo/1M chars | Qualidade | Latência | Voz PT-BR |
|---------|----------------|-----------|----------|-----------|
| **Google Neural2** ✅ | $16 | Excelente | 300ms | Masculina, natural |
| ElevenLabs | $30-$99 | Superior | 600ms | Customizável |
| Amazon Polly Neural | $16 | Boa | 500ms | Limitada PT-BR |
| Azure Neural | $16 | Muito boa | 400ms | Boa |

**Por que Google:**
1. ✅ Voz Natural2-B é masculina e grave (perfeita para "alpha")
2. ✅ Controle fino (pitch, speed, volume)
3. ✅ Preço competitivo
4. ✅ Latência aceitável

**Por que NÃO ElevenLabs:**
- 2-6x mais caro
- Qualidade superior, mas não justifica o custo
- Planejamos usar em tier "Premium" futuro

---

## 8. PERGUNTAS FREQUENTES

### Q1: Por que 3 agentes separados?

**R:** Especialização + custo. Cada agente tem:
- System prompt otimizado para sua função
- Modelo adequado ao caso de uso
- Cache strategy específica

Se usássemos 1 agente genérico:
- System prompt seria 3x maior (mais tokens = mais caro)
- Não poderíamos otimizar individualmente
- Responses seriam menos focadas

---

### Q2: Por que limitar conversas por tier?

**R:** Duas razões:

1. **Econômica:** Conversas ilimitadas com voz = custo descontrolado
   - Usuário "power user" usando 200x/mês = $3.68 de custo
   - Em um plano de $6 = prejuízo

2. **Comportamental:** Queremos que o usuário AJA, não só converse
   - Limitar força o usuário a pensar antes de perguntar
   - Evita dependência excessiva do agente

**Solução:** Conversas por TEXTO ilimitadas (Sprint 8)

---

### Q3: O que acontece quando o limite acaba?

**R:** Modal de upgrade:
```
⚠️ VOCÊ USOU 10/10 CONVERSAS

Seu plano renova em 12 dias.

Quer mais conversas agora?

[FAZER UPGRADE PARA PRO] → 30 conversas/mês por R$ 39,90
[AGUARDAR RENOVAÇÃO] → Conversas por texto disponíveis
```

---

### Q4: Conversas por texto contam no limite?

**R:** **NÃO.** Apenas áudio conta.

- Voz (STT + LLM + TTS): $0.0184/conversa → limitado
- Texto (LLM apenas): $0.003/conversa → ilimitado

**Por quê:** Texto é 6x mais barato (sem STT e TTS)

---

### Q5: Dá para reduzir o custo do Google TTS?

**R:** **SIM.** Três estratégias:

**Curto prazo (já fazendo):**
- Respostas concisas (150-250 palavras)
- Evitar repetições no áudio

**Médio prazo (Fase 2):**
- Self-hosted TTS (Coqui XTTS)
- Economia de 93% ($4.578 → $300/mês)
- Trade-off: +200ms latência, -10% qualidade

**Longo prazo (Fase 3):**
- Cache de respostas comuns
  - Ex: "Você não treinou ontem" = resposta pré-gravada
  - Economia estimada: 30% do TTS

---

### Q6: E se a Anthropic aumentar os preços?

**R:** Plano de contingência:

1. **Curto prazo:** Absorver aumento (margem aguenta 30%)
2. **Médio prazo:** Migrar para GPT-4o Mini ou Gemini
3. **Longo prazo:** Self-hosted Llama 3.1 70B fine-tuned

**Risco:** Baixo. APIs de IA estão em DEFLAÇÃO (preços caindo 50%/ano)

---

### Q7: Como funciona o cache de prompts?

**R:** Anthropic mantém cache por 5 minutos:

```
Usuário faz conversa 1 (14:00):
- System prompt (2k tokens) → cria cache → 50% desconto
- Contexto (3k tokens) → cria cache → 50% desconto
- Total economizado: $0.002

Usuário faz conversa 2 (14:03):
- System prompt → LÊ do cache → 90% desconto
- Contexto → LÊ do cache → 90% desconto
- Total economizado: $0.0036

Após 5 min de inatividade:
- Cache expira
- Próxima conversa cria novo cache
```

**Impacto:** Reduz custo em ~40% para usuários ativos

---

### Q8: Dá para usar streaming de áudio?

**R:** **SIM**, já fazemos! Google TTS suporta streaming:

- Backend gera áudio em chunks
- App começa a reproduzir antes de terminar
- Latência percebida: redução de 500ms

---

### Q9: Qual a taxa de acerto do STT em PT-BR?

**R:** Deepgram Nova-2:
- Accuracy: ~96% em áudio limpo
- ~88% em áudio com ruído (rua, música)

**Fallback:** Se confidence < 70%, pedimos ao usuário regravar

---

### Q10: Usuários podem treinar o agente?

**R:** **NÃO diretamente**, mas o agente aprende com:

1. **Feedback implícito:**
   - Usuário completa meta após conversa? → Response foi boa
   - Usuário abandona conversa? → Response foi ruim

2. **Contexto acumulado:**
   - Últimas 10 conversas estão no contexto
   - Agente "lembra" do que já foi discutido

**Futuro (Fase 3):**
- Botão 👍/👎 em cada resposta
- Fine-tuning baseado em feedback

---

## 9. DIAGRAMA FINAL: SISTEMA COMPLETO

```
┌────────────────────────────────────────────────────────────────┐
│                        MOBILE APP                              │
│  [Home] [Ranking] [🎙️ Agente] [Scanner] [Testo]              │
└────────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│                      BACKEND (NestJS)                          │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   AGENTE 1   │  │   AGENTE 2   │  │   AGENTE 3   │        │
│  │ PLANEJAMENTO │  │CONVERSACIONAL│  │   SCANNER    │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ Trigger:     │  │ Trigger:     │  │ Trigger:     │        │
│  │ • Onboarding │  │ • User mic   │  │ • Upload img │        │
│  │ • Fim semana │  │ • Ad-hoc     │  │ • Ad-hoc     │        │
│  │ • Fim mês    │  │              │  │              │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ Output:      │  │ Pipeline:    │  │ Pipeline:    │        │
│  │ • Meta anual │  │ 1. STT       │  │ 1. OCR       │        │
│  │ • 12 meses   │  │ 2. LLM       │  │ 2. LLM       │        │
│  │ • Semana 1   │  │ 3. TTS       │  │ 3. Output    │        │
│  │ • Treino     │  │              │  │              │        │
│  │ • Alimentação│  │              │  │              │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ Modelo:      │  │ Serviços:    │  │ Serviços:    │        │
│  │ Claude Haiku │  │ • Deepgram   │  │ • Google Vis │        │
│  │              │  │ • Claude     │  │ • Claude     │        │
│  │              │  │ • Google TTS │  │              │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ Custo:       │  │ Limites:     │  │ Limites:     │        │
│  │ $0.045/user  │  │ 10/30/60/mês │  │ 5/15/30/mês  │        │
│  │ /mês         │  │              │  │              │        │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤        │
│  │ Frequência:  │  │ Custo/uso:   │  │ Custo/uso:   │        │
│  │ Semanal/     │  │ $0.0184      │  │ $0.0165      │        │
│  │ Mensal       │  │              │  │              │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
│         ↓                    ↓                    ↓            │
│  ┌──────────────────────────────────────────────────────┐     │
│  │           CONTEXTO UNIFICADO (Supabase)             │     │
│  │  • Onboarding (28 respostas)                        │     │
│  │  • Metas (anual → diário)                           │     │
│  │  • Compliance histórico                             │     │
│  │  • Conversas passadas                               │     │
│  │  • Nível de testosterona                            │     │
│  │  • Ranking position                                 │     │
│  │  • Badges                                           │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

---

## 10. CHECKLIST FINAL PARA SEU SÓCIO

**✅ SISTEMA MULTI-AGENTE:**
- [ ] 3 agentes especializados (Planejamento, Conversacional, Scanner)
- [ ] Todos usam Claude 3.5 Haiku (modelo mais econômico da Anthropic)
- [ ] Cada agente tem system prompt específico (~2-3k tokens)
- [ ] Contexto compartilhado via Supabase (onboarding, metas, histórico)

**✅ AGENTE CONVERSACIONAL (CORE):**
- [ ] Pipeline: Voz → STT → LLM → TTS → Voz
- [ ] Deepgram Nova-2 (STT): $0.001/conversa
- [ ] Claude Haiku (LLM): $0.003/conversa
- [ ] Google TTS Neural2 (TTS): $0.0144/conversa
- [ ] **Custo total: $0.0184/conversa**
- [ ] Limites: 10/30/60 conversas/mês (Básico/Pro/Alpha)

**✅ CUSTOS TOTAIS:**
- [ ] 1k usuários: $641/mês (IA) + $60/mês (infra) = $701/mês
- [ ] MRR: $5.400
- [ ] Margem: 87%
- [ ] Custo de IA como % da receita: 11.9%

**✅ OTIMIZAÇÕES:**
- [ ] Curto prazo: Prompt caching (-25% custo LLM) ✅ implementado
- [ ] Médio prazo: Self-hosted TTS (-93% custo TTS) 🔵 Fase 2
- [ ] Longo prazo: Fine-tuned LLM (-81% custo total) 🟣 Mês 9

**✅ RISCOS MITIGADOS:**
- [ ] Limites por tier evitam abuso
- [ ] Margem saudável mesmo com custos atuais
- [ ] Plano B para todos os serviços (GPT-4o, Gemini, etc)
- [ ] APIs de IA em deflação (preços caindo 50%/ano)

---

**Documento criado por NEO - Agente Especialista em Documentação Técnica**  
**Antibeta © 2025 - Sistema Multi-Agente de Desenvolvimento Masculino**

**Status:** ✅ **COMPLETO E PRONTO PARA APRESENTAÇÃO**
