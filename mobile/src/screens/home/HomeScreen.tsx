import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeMockData } from '../../mocks/homeMock';
import { usePlanStore } from '../../store/planStore';
import { HomeHeader } from './components/HomeHeader';
import { TestosteroneCard } from './components/TestosteroneCard';
import { DailyGoalsCard } from './components/DailyGoalsCard';
import { WorkoutCard } from './components/WorkoutCard';
import { MealsCard } from './components/MealsCard';
import { HydrationCard } from './components/HydrationCard';
import { BioHackingCard } from './components/BioHackingCard';
import { AlphaTipCard } from './components/AlphaTipCard';
import { DailyQuizCard } from './components/DailyQuizCard';

const CATEGORY_TYPE_MAP: Record<string, string> = {
    treino: 'workout',
    alimentacao: 'meal',
    habito: 'practice',
    mindset: 'practice',
    social: 'practice',
};

export const HomeScreen = () => {
    const {
        plan,
        getDailyGoals,
        getWorkout,
        getMeals,
        getHydration,
        getBiohacking,
        getAlphaTip,
        toggleMeal,
        toggleBiohacking,
        hydrationCurrent,
        incrementHydration,
    } = usePlanStore();

    // In a real scenario, we would calculate current day/week/month based on plan start date
    // For now, we use the first day of the first week
    const currentDay = 1;
    const currentWeek = 1;
    const currentMonth = 1;

    // Map real plan tasks to DailyGoalsCard format
    const goalsData = useMemo(() => {
        if (!plan) return homeMockData.goals;

        const tasks = getDailyGoals(currentDay, currentWeek, currentMonth);
        const items = tasks.map((task, index) => ({
            id: String(index + 1),
            title: task.titulo,
            completed: task.concluida,
            type: CATEGORY_TYPE_MAP[task.categoria] || 'practice',
        }));

        if (items.length === 0) return homeMockData.goals;

        return {
            completed: items.filter((i) => i.completed).length,
            total: items.length || 1,
            items: items,
        };
    }, [plan, getDailyGoals]);

    const workout = getWorkout(currentWeek, currentMonth);
    const meals = getMeals(currentWeek, currentMonth);
    const hydrationTarget = getHydration(currentWeek, currentMonth);
    const biohacking = getBiohacking(currentWeek, currentMonth);
    const alphaTip = getAlphaTip(currentWeek, currentMonth);

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <HomeHeader user={homeMockData.user} />

                <TestosteroneCard
                    level={homeMockData.user.testosterone}
                    growth={homeMockData.user.testoGrowth}
                />

                <DailyGoalsCard
                    completed={goalsData.completed}
                    total={goalsData.total}
                    items={goalsData.items}
                />

                <WorkoutCard
                    title={workout?.titulo}
                    exercises={workout?.exercicios}
                    duration={workout?.duracao}
                />

                <MealsCard
                    items={meals.map(m => ({
                        title: m.titulo,
                        time: m.horario,
                        completed: m.concluida
                    }))}
                    onToggleMeal={(index) => toggleMeal(index, currentDay, currentWeek, currentMonth)}
                />

                <HydrationCard
                    current={hydrationCurrent}
                    target={hydrationTarget}
                    onAdd={incrementHydration}
                />

                <BioHackingCard
                    items={biohacking.map(i => ({
                        title: i.titulo,
                        completed: i.concluida
                    }))}
                    onToggleItem={(index) => toggleBiohacking(index, currentDay, currentWeek, currentMonth)}
                />

                {alphaTip && (
                    <AlphaTipCard
                        title="Dica Alfa semanal"
                        content={alphaTip}
                    />
                )}

                <DailyQuizCard
                    availableIn={homeMockData.dailyQuiz.availableIn}
                    isLocked={homeMockData.dailyQuiz.isLocked}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
