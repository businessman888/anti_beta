# Resumo de Integração: Dados Reais de Treino (Supabase)

Este documento detalha a implementação da integração de dados reais para as funcionalidades de Agenda e Treino no aplicativo mobile.

## 1. Nova Camada de Serviço (`workoutService.ts`)

Foi criado o arquivo `mobile/src/services/workoutService.ts` para centralizar a lógica de negócio e persistência:

- **`getProfileCreatedAt`**: Busca a data de registro do usuário na tabela `profiles`.
- **`getMonthIndex`**: Calcula o mês de treino (1, 2 ou 3) com base na data de registro, garantindo o intervalo [1, 3].
- **`getWorkoutTypeForDate`**: Mapeia o dia da semana para o tipo de treino (A, B, ou C).
- **`fetchWorkout`**: Realiza a busca no Supabase com joins explícitos.
- **`calculateTotalVolume`**: Calcula o volume total (Peso * Séries) de uma sessão.

## 2. Implementação da Query Principal

A query foi refinada para garantir compatibilidade total com o schema do banco de dados:

```typescript
const { data, error } = await supabase
    .from('monthly_workouts')
    .select(`
        id,
        workout_type,
        month_index,
        description,
        workout_exercise_details!workout_id (
            id,
            exercise_id,
            sets,
            reps,
            weight_kg,
            rest_seconds,
            order_index,
            exercises!exercise_id (
                id,
                name,
                muscle_group
            )
        )
    `)
    .eq('workout_type', normalizedType)
    .eq('month_index', monthIndex)
    .maybeSingle();
```

## 3. Alterações nas Telas

### AgendaScreen
- Integração de indicadores coloridos no calendário baseados no grupo muscular (Superiores vs Inferiores).
- Cálculo dinâmico do volume diário.
- Lógica $D+1$ para o card de "Próximo Treino".
- Estado de fallback "Descanso programado".

### WorkoutScreen
- Mapeamento dinâmico dos exercícios do banco de dados para os `ExerciseCard`.
- Geração automática da lista de séries (Sets) baseada no número de séries definido no Supabase.
- Timer e indicadores de status integrados ao fluxo real.

### WorkoutDetailModal
- Refatorado para receber o objeto `Workout` bruto, permitindo exibição detalhada de carga, reps e tempo de descanso.

## 4. Correções de Robustez (PGRST116)

- **Tratamento de Erros**: Troca de `.single()` por `.maybeSingle()` para evitar crashes em dias sem treino.
- **Normalização**: Forçado uso de `.toUpperCase()` para os tipos de treino.
- **Segurança de Tipos**: Implementado mapeamento manual após a query para garantir que joins (que o Supabase às vezes retorna como array) sejam tratados corretamente como objeto único.
- **Logs**: Adicionado logging de parâmetros de query para facilitar depuração em produção.
