import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Animated, Easing } from 'react-native';
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
import { Zap } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { planService } from '../../services/api/planService';

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
        fetchCompletions,
        isGenerating,
        generatePlan,
        fetchUserPlan,
    } = usePlanStore();

    const { user, profile } = useAuthStore();
    const { isQuizLocked, quizAvailableIn, checkQuizStatus, todayStats, fetchTodayStats, historyStats, fetchHistory } = useProgressStore();

    // Track whether we've already triggered plan generation this session
    const hasTriggeredGeneration = useRef(false);
    const [isPlanLoading, setIsPlanLoading] = useState(false);

    // On first mount: if no plan exists, fetch quiz data and trigger generation
    useEffect(() => {
        if (!user || plan || hasTriggeredGeneration.current || isGenerating) return;

        const triggerPlanGeneration = async () => {
            hasTriggeredGeneration.current = true;
            setIsPlanLoading(true);

            try {
                // Check if plan already exists on backend
                const statusRes = await planService.getPlanStatus(user.id);
                if (statusRes.data?.hasPlan) {
                    // Plan exists, just fetch it
                    await fetchUserPlan(user.id);
                    setIsPlanLoading(false);
                    return;
                }

                // No plan — fetch quiz answers from onboarding_results
                const { data: onboardingData } = await supabase
                    .from('onboarding_results')
                    .select('full_quiz_data')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (onboardingData?.full_quiz_data) {
                    // Generate plan with the saved quiz answers
                    await generatePlan(onboardingData.full_quiz_data, user.id);
                }
            } catch (err) {
                console.error('[Home] Error triggering plan generation:', err);
            } finally {
                setIsPlanLoading(false);
            }
        };

        triggerPlanGeneration();
    }, [user, plan]);

    useFocusEffect(
        React.useCallback(() => {
            if (user) {
                checkQuizStatus();
                fetchTodayStats();
                fetchHistory('weekly');
                fetchCompletions(user.id);
            }
        }, [user, checkQuizStatus, fetchCompletions])
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

    // Show loading overlay while plan is being generated
    if (isPlanLoading || (isGenerating && !plan)) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950 items-center justify-center" edges={['top']}>
                <PlanGeneratingOverlay />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-zinc-950" edges={['top']}>
            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <HomeHeader
                    profile={profile}
                    userEmail={user?.email}
                />

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

/** Loading overlay shown while the AI generates the plan */
const PlanGeneratingOverlay = () => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    return (
        <View className="flex-1 items-center justify-center px-8">
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="mb-10">
                <View className="w-24 h-24 rounded-full bg-orange-600/20 items-center justify-center">
                    <View className="w-16 h-16 rounded-full bg-orange-600/40 items-center justify-center">
                        <View className="w-10 h-10 rounded-full bg-orange-600 items-center justify-center">
                            <Zap size={22} color="white" fill="white" />
                        </View>
                    </View>
                </View>
            </Animated.View>
            <Text className="text-white text-xl font-bold text-center mb-3">
                Preparando seu ambiente
            </Text>
            <Text className="text-zinc-500 text-sm text-center leading-relaxed">
                Aguarde, estamos preparando o{'\n'}ambiente alfa para você
            </Text>
        </View>
    );
};
