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
    const { plan, getDailyGoals } = usePlanStore();

    // Map real plan tasks to DailyGoalsCard format
    const goalsData = useMemo(() => {
        if (!plan) return homeMockData.goals;

        const tasks = getDailyGoals(1, 1, 1);
        const items = tasks.map((task, index) => ({
            id: String(index + 1),
            title: task.titulo,
            completed: task.concluida,
            type: CATEGORY_TYPE_MAP[task.categoria] || 'practice',
        }));

        return {
            completed: items.filter((i) => i.completed).length,
            total: items.length || 1,
            items: items.length > 0 ? items : homeMockData.goals.items,
        };
    }, [plan]);

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
                    title={homeMockData.workout.title}
                    exercises={homeMockData.workout.exercises}
                    duration={homeMockData.workout.duration}
                />

                <MealsCard items={homeMockData.meals.items} />

                <HydrationCard
                    current={homeMockData.hydration.current}
                    target={homeMockData.hydration.target}
                />

                <BioHackingCard items={homeMockData.biohacking.items} />

                <AlphaTipCard
                    title={homeMockData.alphaTip.title}
                    content={homeMockData.alphaTip.content}
                />

                <DailyQuizCard
                    availableIn={homeMockData.dailyQuiz.availableIn}
                    isLocked={homeMockData.dailyQuiz.isLocked}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
