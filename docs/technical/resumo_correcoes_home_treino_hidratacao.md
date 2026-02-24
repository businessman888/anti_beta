# Resumo de Implementação - Correções Home, Treino e Hidratação

Este documento resume as alterações realizadas para corrigir problemas de exibição na Home Screen, refinar a tela de treino e implementar o tracking interativo de hidratação.

## 1. Correção de Cards na Home Screen

### Problema
Os cards de **Dica Alfa** e **Treino do dia** não estavam sendo exibidos ou não possuíam navegação funcional quando o usuário não tinha um plano de IA ativo gerado.

### Soluções
- **`planStore.ts`**: Atualizadas as funções `getWorkout` e `getAlphaTip` para retornar dados *mock* padrão (fallback) caso o plano esteja ausente.
- **`WorkoutCard.tsx`**: 
    - Alterada a lógica de exibição para mostrar os detalhes do treino padrão.
    - Texto do botão alterado de "+ Adicionar treino" para **"Ver treinos"**.
    - Implementada a navegação para a tela de treino.
- **`AlphaTipCard.tsx`**: Garantida a exibição do conteúdo da dica alfa e navegação para a tela de dica semanal.

## 2. Refinamento da Tela de Treino

### Alterações
- **`WorkoutScreen.tsx`**: Substituído o ícone de `Menu` (3 listras horizontais) no canto superior direito pelo ícone de **`Calendar`** (calendário) da biblioteca `lucide-react-native`.

## 3. Tracking Interativo de Hidratação

### Funcionalidade
Implementado o acompanhamento de consumo de água em tempo real diretamente na Home Screen.

### Componentes Afetados
- **`planStore.ts`**:
    - Adicionado estado `hydrationCurrent` (inicializado em 0.0L).
    - Adicionada ação `incrementHydration` para aumentar o volume em **0.5L** a cada clique, respeitando o limite da meta.
    - Atualizada a meta padrão de hidratação para **3.5L**.
- **`HydrationCard.tsx`**: 
    - O botão **"+ 500ml"** agora dispara o incremento no store.
    - A barra de progresso horizontal e os indicadores numéricos (`0.0L / 3.5L`) atualizam dinamicamente com base no estado global.
- **`HomeScreen.tsx`**: Conectado o estado de hidratação do store ao card visual.

## 4. Arquivos Modificados
- `src/store/planStore.ts`
- `src/screens/home/HomeScreen.tsx`
- `src/screens/home/components/WorkoutCard.tsx`
- `src/screens/home/components/HydrationCard.tsx`
- `src/screens/workout/WorkoutScreen.tsx`
