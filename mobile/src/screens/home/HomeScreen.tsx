import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeMockData } from '../../mocks/homeMock';
import { HomeHeader } from './components/HomeHeader';
import { TestosteroneCard } from './components/TestosteroneCard';
import { DailyGoalsCard } from './components/DailyGoalsCard';
import { WorkoutCard } from './components/WorkoutCard';
import { MealsCard } from './components/MealsCard';
import { HydrationCard } from './components/HydrationCard';
import { BioHackingCard } from './components/BioHackingCard';
import { AlphaTipCard } from './components/AlphaTipCard';
import { DailyQuizCard } from './components/DailyQuizCard';

export const HomeScreen = () => {
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
                    completed={homeMockData.goals.completed}
                    total={homeMockData.goals.total}
                    items={homeMockData.goals.items}
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
