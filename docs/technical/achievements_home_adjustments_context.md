# Contexto de Atualizações: Home e Sistema de Conquistas

Este documento resume as implementações, refatorações e correções de bugs realizadas nas telas iniciais e no sistema de Ranking/Conquistas.

## 1. Ajustes Visuais na Home Screen
- **Header da Home (`HomeHeader.tsx`)**:
  - Remoção do card flutuante no canto superior direito que indicava o valor estático de "TST" e a sequência (streak) com o ícone de fogo.
  - Limpeza de imports não utilizados (ex: ícone `Flame` do *lucide-react-native*).

- **SafeAreaView e NavBar (`HomeScreen.tsx`)**:
  - Remoção da borda preta (espaço vazio) que ficava visível acima da Bottom Navigation Bar inferior.
  - Isso foi resolvido aplicando a propriedade `edges={['top']}` no `SafeAreaView` da tela para evitar que ele inserisse insets desnecessários na parte inferior, padronizando a visualização com o restante das telas (como a tela de Ranking).

## 2. Sistema Real de Conquistas (Achievements)
O uso de dados *mockados* nas medalhas/badges do usuário foi inteiramente substituído por dados dinâmicos sincronizados com o banco de dados (Supabase).

### 2.1 Zustand Store (`achievementsStore.ts`)
- Criado novo gerenciador de estado em `src/store/achievementsStore.ts`.
- **Query**: Executa cruzamento entre as tabelas `public.achievements` (todas as conquistas do app) e `public.user_achievements` (badges desbloqueadas pelo `user.id` autenticado na sessão).
- **Tratamento de Exceções**: Em caso de lentidão ou falha de conectividade com o Supabase, os blocos de `try/catch` silenciam o erro no frontend e preveem carregamento nulo sem *crash* ou a paralisação do app. Exibe apenas um *console.log* e desliga o estado de *isLoading*.
- **Estatísticas Dinâmicas**: Calcula automaticamente o número de medalhas totais, desbloqueadas e a porcentagem.

### 2.2 Sincronização da Ranking/Missions Screen (`MissionsScreen.tsx`)
- O card inferior em `MissionsScreen` mostrando "Suas conquistas" estava travado (*hardcoded*) como `0/36`.
- Foi refatorado chamando `useAchievementsStore` e passando `stats.unlocked` e `stats.total` (neste primeiro momento para a quantia real que testamos, caindo de 36 para 26).
- Implementado um re-fetch do store via `useFocusEffect` garantindo que as missões e valores sejam hidratados assim que o usuário transitar pelas abas.

### 2.3 Refatoração da Tela de Conquistas (`AchievementsScreen.tsx`)
A interface gráfica de listagem das conquistas foi completamente revista visando a psicologia da gamificação:
- **Títulos Agressivos (Alpha)**: Agrupamento em categorias reformulado para "FORÇA E TREINO", "DISCIPLINA DE ELITE" e "DOMÍNIO DA COMUNIDADE". As categorias são parseadas de forma fluída baseadas na string de banco e contam com uma *fallback pattern*.
- **Efeito Visual Lock (Tough Love)**: As insignias *bloqueadas* deixaram de ser itens opacos escondidos para passarem a mostrar a imagem do desafio.
  - Filtro em `grayscale` em 100% sobre as ícones.
  - Opacidade de `30%` do card, fundo escurecido `bg-zinc-900`.
  - Inserção de um indicativo absoluto no topo direito de cadeado (`<Lock size={12} />`).
- **Problemas de Engenharia do FlatList**: Descartes de aninhamento com FlatList (causadores de falhas de rendering) ou `scrollEnabled={false}`. A formatação de blocos passou a ser estritamente manipulada via FlexBox Grid em marginamentos nativos e alinhamento `flex-row flex-wrap`.
- **Proporções de Tamanho e Layout**: Cards dimensionados com largura de `31%` preenchendo o Flex e `minHeight: 125`, acomodando três por linha com *gaps* suaves (`gap: 12`) sem espremer o conteúdo de texto quando as strings são levemente maiores.
- **Lista Vazia / Debuging**: Uma validação e aviso de *loading* se certificando se não há *achievements* criados no backend (`allAchievements.length === 0 && !isLoading`), além do log explícito.

### 2.4 Mapeador Flexível de Icones (`constants/achievements.tsx`)
- Centralizado a correspondência entre a chave enviada pelo B.D (`icon_key` como `dumbbell`, `fire`, `crown`) para o componente válido de *lucide-react-native*.
- Lógica blindada: Se um id for inserido de maneira falha no backend, o método de renderização possui um recuo automático para não quebrar a aplicação (`Dumbbell` passa a ser o Fallback). Erros de compilação TS sobre o *require* tipado foram normalizados para Record limpos.
