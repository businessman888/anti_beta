# Contexto de Implementação: Quiz Diário e Lógica Alfa

Este documento consolida tudo que foi discutido, planejado e construído no sistema em relação ao **Quiz Diário**, **Lógica Alfa de Pontuações (Testo)** e **Persistências Diárias**.

---

## 1. Visão Arquitetural

A tela de progresso (TestoScreen) e a aba Home (Quiz Diário, Hidratação, Hábitos) foram totalmente reestruturadas para remover mocks e depender estritamente do banco de dados (Supabase) aliado a uma cache local ágil gerenciada pelo **Zustand** (`useProgressStore.ts`).

### O Conceito da "Data Técnica" (Technical Date)
Implementamos a função `getTechnicalDate()`:
- O sistema considera que um dia só vira às **03:00 AM**.
- Exemplo: se o usuário abrir o app à `02:30 AM` do dia 28/02, o app ainda considerará que as respostas e métricas pertencem ao ciclo de 27/02. O relógio ("Disponível em Xh Ym") se ajusta dinamicamente a isso.

---

## 2. Estrutura de Tabelas (Supabase)

Para operar dinamicamente e de forma escalável, ativando as proteções de _Row Level Security_ (RLS):

- **`daily_stats`**: Mantêm as porcentagens progressivas (0-100) de cada um dos 8 pilares do usuário para um dia específico.
- **`daily_quiz_questions`**: Armazena todas as perguntas do Quiz Diário (atualmente 13).
  - Inclui colunas `impact_sim` e `impact_nao` estruturadas em JSON. Ex: `{"value": -10, "component": "NoFap", "reset": "NoFap"}`.
  - Isso faz com que a interface `DailyQuizScreen` seja gerada **dinamicamente** via backend e não "hardcoded" no aplicativo.
- **`daily_quiz_responses`**: Recebe de forma auditável e idempotente os arrays contendo IDs da pergunta + resposta do usuário na data. O quiz só aceita registros uma única vez por `quiz_date` técnica.
- **`daily_completions`**: Usado para registrar os "Irreversible Checks" (checks irreversíveis) de tarefas da home (como beber água, fazer dieta). A tarefa ganha a flag `isCompleted=true` localmente sob o ID `task_id` e a data em questão.

---

## 3. Dinâmica e Fórmula Alfa (Testo Level)

O "Testo Level" (Ponto Alpha) do usuário e o progresso das barras reagem imediatamente ao concluir o Quiz. A fórmula foi aplicada no store obedecendo aos pesos exigidos:

### Pesos do Progresso %
1. Treino: **20%**
2. Alimentação: **15%**
3. Sono: **15%**
4. NoFap: **15%**
5. Práticas Testosterona: **10%**
6. Hidratação: **5%**
7. Redes Sociais: **5%**
8. Vícios: **5%**

A pontuação total visualizada na "TestoScreen" arredonda a soma dessas frações.

### O Funcionamento da Regra do "NoFap"
- Uma das perguntas (Masturbação) carrega nas entranhas do DB o atributo `"reset": "NoFap"`.
- Se a pessoa marcar "Sim" (recaída), a engine imediatamente apaga o `nofap_streak` para 0 e desconta substancialmente (ex: `-10`) da % base.
- Se a pessoa responder "Não", o streak aumenta `+1`. No 8º dia (semana completada) começa a render incrementações percentuais (`+1%` por dia ileso).

---

## 4. UI e Fluxo (React Native)

- **`DailyQuizCard.tsx`**: Localizado na Home, este card muda de layout visualmente.
  - **Laranja/Desbloqueado**: "Faça seu check-in diário!".
  - **Cinza/Cadeado**: "Disponível em Xh Ym" (após submissão via proteção da query no Supabase).
- **`DailyQuizScreen.tsx`**: Tela limpa e preta que faz fetch do Supabase e renderiza as 13 etapas progressistas.
  - O botão Continuar só é habilitado após selecionar Sim ou Não.
  - A submissão na tela final envia o array à `submitDailyQuiz()`. Possui tratamento de erros ("bubbling") para mostrar avisos detalhados em `Alert` em caso de negações do banco ou duplicatas de data.

---

## 5. Resolução de Bloqueios e Bugs Tratados

1. **Card Bloqueado Mocking**: Corrigido usando o `useFocusEffect` para dar `checkQuizStatus` ao voltar da tela.
2. **Consultas Vazias e Interceptadas (Proteção de RLS)**: O Supabase bloqueou consultas a novas tabelas via chamadas nativas (Select zero rows). Criamos Políticas RLS injetadas via SQL permitindo leitura das perguntas e insersões em respostas em que o usuário manipula apenas o próprio `user_id`.
3. **Erros Silenciosos de Insert**: Migramos `submitDailyQuiz` para retornar um objeto `{ success: boolean, error?: string }` ao invés de booleanos cegos de falhas subjacentes ao Postgres.
