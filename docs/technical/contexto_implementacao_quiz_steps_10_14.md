# Implementação Quiz Steps 10-14 (Sleep to Workout)

## Visão Geral
Este documento detalha a implementação das etapas 10 a 14 do quiz de onboarding do AntiBeta, focadas em sono, nutrição e atividade física.

## Implementações Realizadas

### 1. Step 10: Horas de Sono (Sleep Hours)
- **Componente**: Reutilizado e adaptado `QuizTimeSlider`.
- **Estado**: `sleepHours` (number).
- **Lógica**: Slider horizontal de 3h a 12h com step de 0.5.
- **Validação**: Sempre válido (valor padrão).

### 2. Step 11: Qualidade do Sono (Sleep Quality)
- **Componente**: [NOVO] `QuizVerticalRating.tsx`.
- **Estado**: `sleepQuality` (number, 1-10).
- **Características**:
    - Slider vertical customizado.
    - Uso de `PanResponder` para gestos de arrastar.
    - Indicador visual dinâmico com valor numérico e label ("Excelente", "Péssima").
    - Corrigido problema de closure com `useRef` para garantir estado atualizado durante o gesto.

### 3. Step 12: Dieta (Diet)
- **Componente**: `QuizOptionSelection.tsx`.
- **Estado**: `diet` (string).
- **Opções**:
    - Muito saudável (Ícone: Leaf)
    - Razoável (Ícone: Utensils)
    - Ruim (Ícone: Pizza)
    - Péssima (Ícone: TriangleAlert)
- **Validação**: Seleção obrigatória.

### 4. Step 13: Atividade Física (Physical Activity)
- **Componente**: `QuizOptionSelection.tsx` (versão texto).
- **Estado**: `physicalActivity` (string).
- **Opções**:
    - Não pratico
    - 1 - 2 vezes por semana
    - 3 - 4 vezes por semana
    - 5 - 6 vezes por semana
    - Diariamente
- **Validação**: Seleção obrigatória.

### 5. Step 14: Tipo de Treino (Workout Type)
- **Componente**: [NOVO] `QuizGridMultiSelect.tsx`.
- **Estado**: `workoutTypes` (string[]).
- **Características**:
    - Layout em grid de 2 colunas.
    - Dimensões fixas por card: **162px (largura) x 164px (altura)**.
    - Ícones centralizados e grandes.
    - Checkmark no canto superior direito quando selecionado.
    - Suporte a múltipla seleção.
- **Opções e Ícones**:
    - Musculação (Dumbbell)
    - CrossFit (Timer)
    - Artes Marciais (Swords)
    - Corrida (Footprints)
    - Esportes (Trophy)
    - Calistenia (Activity)
- **Validação**: Pelo menos uma opção deve ser selecionada.

## Arquivos Modificados/Criados

### Novos Componentes
- `src/components/quiz/inputs/QuizVerticalRating.tsx`
- `src/components/quiz/inputs/QuizGridMultiSelect.tsx`

### Arquivo Principal
- `src/screens/onboarding/OnboardingScreen.tsx`
    - Adicionados novos estados (`sleepQuality`, `diet`, `physicalActivity`, `workoutTypes`).
    - Novos imports de ícones (`lucide-react-native`).
    - Adicionados `case 11` a `case 14` no `renderStepContent`.
    - Atualizada lógica de validação `isStepValid` e `handleNext`.

## Próximos Passos
- Implementar **Step 15 (Goals/Objetivos)**.
- Validar fluxo completo de ponta a ponta.
