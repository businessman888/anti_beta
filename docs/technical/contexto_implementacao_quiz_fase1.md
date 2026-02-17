# Contexto de Implementação: Quiz de Onboarding - Fase 1

**Data:** 17/02/2026
**Autor:** Agente Antigravity

## Visão Geral
Este documento detalha o trabalho realizado para iniciar a implementação do **Quiz de Onboarding** do aplicativo móvel Antibeta. O objetivo desta fase foi estabelecer a arquitetura base do quiz e implementar a primeira pergunta ("Qual é o seu nome completo?"), seguindo o design do Figma e as regras de negócio.

## Arquivos Modificados/Criados

### 1. Gerenciamento de Estado
*   **Arquivo:** `mobile/src/store/quizStore.ts`
*   **Função:** Store Zustand para gerenciar o estado global do quiz.
*   **Propriedades Principais:**
    *   `currentStep`: Índice da pergunta atual (inicia em 0).
    *   `totalSteps`: Total de perguntas (28).
    *   `answers`: Objeto para armazenar as respostas.
    *   `setAnswer`: Ação para salvar uma resposta.
    *   `nextStep` / `prevStep`: Navegação entre perguntas.

### 2. Componentes de UI
*   **Arquivo:** `mobile/src/components/quiz/QuizProgressBar.tsx`
    *   Exibe o progresso visual (barra laranja e porcentagem) e a pontuação (50XP).
    *   Animação suave na transição entre passos.
*   **Arquivo:** `mobile/src/components/quiz/inputs/QuizInput.tsx`
    *   Input de texto estilizado com tema escuro (bg-zinc-900), bordas e estados de foco (cyan-500).

### 3. Tela Principal
*   **Arquivo:** `mobile/src/screens/onboarding/OnboardingScreen.tsx`
    *   Refatorado para ser o container principal do Quiz.
    *   Integração com `quizStore` e `useAuthStore`.
    *   Implementação da **Lógica do Passo 1**:
        *   Títulos estilizados ("Qual é o seu nome" em branco, "completo?" em laranja).
        *   Validação: O botão "Continuar" só habilita se o nome tiver >= 3 caracteres.
        *   Foco automático no input ao abrir a tela.

## Dependências
*   A biblioteca `lucide-react-native` foi confirmada no `package.json` para uso de ícones (ArrowRight).

## Próximos Passos
1.  **Implementar Passo 2 (Idade):** Criar componente de seleção numérica (Range: 18-40).
2.  **Implementar Passo 3 (Situação Profissional):** Criar componente de seleção única.
3.  **Persistência de Dados:** Integrar com Supabase para salvar respostas conforme o usuário avança (tabela `user_onboarding`).
4.  **Barra de Progresso Real:** Conectar o cálculo de `progress` com os 28 passos reais.

## Como Testar
1.  Rodar o app (`npx expo start`).
2.  Se necessário, fazer login ou criar conta.
3.  A tela de Onboarding deve aparecer automaticamente se o usuário não tiver completado o fluxo.
4.  O input de nome deve aceitar texto e habilitar o botão "Continuar".
