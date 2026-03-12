import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeMockData } from '../../mocks/homeMock';
import { usePlanStore } from '../../store/planStore';
import { useAuthStore } from '../../store/authStore';
import { HomeHeader } from './components/HomeHeader';
import { TestosteroneCard } from './components/TestosteroneCard';
import { DailyGoalsCard } from './components/DailyGoalsCard';
import { useProgressStore } from '../../store/progressStore';
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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const {
        plan,
        getDailyGoals,
        getWorkout,
        getMeals,
        getHydration,
        getBiohacking,
        getAlphaTip,
        hydrationCurrent,
        incrementHydration,
        completions,
        completeTask,
    } = usePlanStore();

    const { user } = useAuthStore();
    const { isQuizLocked, quizAvailableIn, checkQuizStatus, todayStats, fetchTodayStats, historyStats, fetchHistory } = useProgressStore();

    useFocusEffect(
        React.useCallback(() => {
            if (user) {
                checkQuizStatus();
                fetchTodayStats();
                fetchHistory('weekly');
            }
        }, [user, checkQuizStatus])
    );

    // Calculate weekly testo growth
    const weeklyGrowth = React.useMemo(() => {
        if (historyStats.length < 2) return 0;
        const oldest = historyStats[0]?.testoPoints || 0;
        const latest = historyStats[historyStats.length - 1]?.testoPoints || 0;
        return latest - oldest;
    }, [historyStats]);

    // Get activity points from user_profiles via supabase (fetched in authStore)
    const [activityPoints, setActivityPoints] = React.useState(0);
    React.useEffect(() => {
        const fetchPoints = async () => {
            if (!user) return;
            try {
                const { supabase } = require('../../lib/supabase');
                const { data } = await supabase
                    .from('user_profiles')
                    .select('activityPoints')
                    .eq('userId', user.id)
                    .maybeSingle();
                if (data) setActivityPoints(data.activityPoints || 0);
            } catch (e) {
                console.error('Error fetching activity points:', e);
            }
        };
        fetchPoints();
    }, [user, todayStats]);

    // In a real scenario, we would calculate current day/week/month based on plan start date
    // For now, we use the first day of the first week
    const currentDay = 1;
    const currentWeek = 1;
    const currentMonth = 1;

    // Map real plan tasks to DailyGoalsCard format
    const goalsData = useMemo(() => {
        if (!plan) return homeMockData.goals;

        const tasks = getDailyGoals(currentDay, currentWeek, currentMonth);
        const items = tasks.map((task, index) => {
            const taskId = `goal_${currentMonth}_${currentWeek}_${currentDay}_${index}`;
            return {
                id: taskId,
                title: task.titulo,
                completed: completions.has(taskId),
                type: CATEGORY_TYPE_MAP[task.categoria] || 'practice',
            };
        });

        if (items.length === 0) return homeMockData.goals;

        return {
            completed: items.filter((i) => i.completed).length,
            total: items.length || 1,
            items: items,
        };
    }, [plan, getDailyGoals, completions]);

    const workout = getWorkout(currentWeek, currentMonth);
    const meals = getMeals(currentWeek, currentMonth);
    const hydrationTarget = getHydration(currentWeek, currentMonth);
    const biohacking = getBiohacking(currentWeek, currentMonth);
    const alphaTip = getAlphaTip(currentWeek, currentMonth);

    return (
        <SafeAreaView className="flex-1 bg-zinc-950" edges={['top']}>
            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <HomeHeader user={homeMockData.user} />

                <TestosteroneCard
                    activityPoints={activityPoints}
                    testoPercent={todayStats?.testoPoints || 0}
                    growth={weeklyGrowth}
                />

                <DailyGoalsCard
                    completed={goalsData.completed}
                    total={goalsData.total}
                    items={goalsData.items}
                    onCompleteTask={(id) => {
                        if (user) {
                            completeTask(id, user.id);
                        }
                    }}
                />

                <WorkoutCard
                    title={workout?.titulo}
                    exercises={workout?.exercicios}
                    duration={workout?.duracao}
                />

                <MealsCard
                    items={meals.map((m, index) => {
                        const taskId = `meal_${currentMonth}_${currentWeek}_${currentDay}_${index}`;
                        return {
                            title: m.titulo,
                            time: m.horario,
                            completed: completions.has(taskId)
                        };
                    })}
                    onToggleMeal={(index) => {
                        if (user) {
                            const taskId = `meal_${currentMonth}_${currentWeek}_${currentDay}_${index}`;
                            completeTask(taskId, user.id);
                        }
                    }}
                />

                <HydrationCard
                    current={hydrationCurrent}
                    target={hydrationTarget}
                    isCompleted={completions.has('hydration_daily_goal')}
                    onAdd={() => incrementHydration(user?.id)}
                />

                <BioHackingCard
                    items={biohacking.map((i, index) => {
                        const taskId = `bio_${currentMonth}_${currentWeek}_${currentDay}_${index}`;
                        return {
                            title: i.titulo,
                            completed: completions.has(taskId)
                        };
                    })}
                    onToggleItem={(index) => {
                        if (user) {
                            const taskId = `bio_${currentMonth}_${currentWeek}_${currentDay}_${index}`;
                            completeTask(taskId, user.id);
                        }
                    }}
                />

                {alphaTip && (
                    <AlphaTipCard
                        title="Dica Alfa semanal"
                        content={alphaTip}
                    />
                )}

                <DailyQuizCard
                    availableIn={quizAvailableIn}
                    isLocked={isQuizLocked}
                    onPress={() => navigation.navigate('DailyQuiz')}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
