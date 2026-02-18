# Implementação Quiz Steps 24-28

Este documento resume as implementações realizadas para as etapas 24 a 28 do fluxo de onboarding do Quiz Antibeta.

## Visão Geral

Foram adicionadas novas perguntas cobrindo aspectos sociais, objetivos primários, expectativas de tempo, nível de comprometimento e contexto adicional.

### Arquivos Modificados/Criados

-   `mobile/src/screens/onboarding/OnboardingScreen.tsx`: Adição de estados, lógica de renderização e validação.
-   `mobile/src/components/quiz/inputs/QuizMultiSelect.tsx`: Novo componente para seleção múltipla limpa (sem sub-opções).

## Detalhamento das Etapas

### Passo 24: Círculo Social (Ativo?)
-   **Pergunta**: "Você tem um círculo social ativo?"
-   **Componente**: `QuizVerticalRating`
-   **Estado**: `socialCircle` (number, 1-10)
-   **Labels**: "Inexistente" (1) a "Muito ativo" (10).

### Passo 25: Objetivos Primários (Max 3)
-   **Pergunta**: "Qual seu principal objetivo ao usar o Antibeta?"
-   **Componente**: `QuizMultiSelect` (Novo componente)
-   **Estado**: `primaryObjectives` (string[])
-   **Regra**: Seleção de até 3 opções.
-   **Opções**: Conquista, Físico, Testosterona, Vícios, Confiança, Financeiro, Disciplina, Intelectual.

### Passo 26: Expectativa de Tempo
-   **Pergunta**: "Em quanto tempo você espera ver resultados?"
-   **Componente**: `QuizOptionSelection`
-   **Estado**: `timelineExpectation` (string)
-   **Opções**: 1-3 meses, 3-6 meses, 6-12 meses, >1 ano.

### Passo 27: Nível de Comprometimento
-   **Pergunta**: "Qual é o seu nível de comprometimento em seguir um plano rigoroso?"
-   **Componente**: `QuizVerticalRating`
-   **Estado**: `commitmentLevel` (number, 1-10)
-   **Labels**: "Vou tentar" (1) a "Vou seguir religiosamente" (10).

### Passo 28: Contexto Adicional (Opcional)
-   **Pergunta**: "Algo mais que o Antibeta deve saber...?"
-   **Componente**: `QuizInput`
-   **Estado**: `additionalContext` (string)
-   **Configuração**: Campo de texto multilinha, limite de 500 caracteres, contador visual.

## Correções e Ajustes

-   **Navegação**: Ajustada a função `handleNext` em `OnboardingScreen.tsx` para incluir os `case` 26 e 27, permitindo salvar as respostas e avançar corretamente após o passo de comprometimento e contexto adicional.
