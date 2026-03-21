import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, CheckCircle2, Circle, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { usePlanStore } from '../../../store/planStore';
import { useProgressStore } from '../../../store/progressStore';

export const DailyGoalsView = () => {
    const navigation = useNavigation<any>();
    const { getDailyGoals, completions } = usePlanStore();
    const { hasCompletedQuizToday } = useProgressStore();

    const currentDay = 1;
    const currentWeek = 1;
    const currentMonth = 1;
    const totalDays = 7;

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
        <View className="flex-1">
            {days.map((day) => {
                const isCurrent = day === currentDay;
                const isPast = day < currentDay;
                const isFuture = day > currentDay;

                // A day is unlocked if it's current or past
                // Future days unlock when the user reaches that day AND completes the quiz
                const isUnlocked = isPast || isCurrent;

                // Check if all daily goals for this day are completed
                const tasks = getDailyGoals(day, currentWeek, currentMonth);
                const completedCount = tasks.filter((_, index) => {
                    const taskId = `goal_${currentMonth}_${currentWeek}_${day}_${index}`;
                    return completions.has(taskId);
                }).length;

                // Check completion of all categories for this day
                const allMealsCompleted = (() => {
                    const mealCount = 5; // default meals count
                    for (let i = 0; i < mealCount; i++) {
                        if (!completions.has(`meal_${currentMonth}_${currentWeek}_${day}_${i}`)) return false;
                    }
                    return true;
                })();

                const workoutCompleted = completions.has(`workout_completed_${currentMonth}_${currentWeek}_${day}`);
                const hydrationCompleted = completions.has('hydration_daily_goal');
                const bioCompleted = (() => {
                    const bioCount = 2; // default bio items
                    for (let i = 0; i < bioCount; i++) {
                        if (!completions.has(`bio_${currentMonth}_${currentWeek}_${day}_${i}`)) return false;
                    }
                    return true;
                })();

                const isDayCompleted = isPast || (
                    tasks.length > 0 &&
                    completedCount === tasks.length &&
                    allMealsCompleted &&
                    hydrationCompleted &&
                    bioCompleted
                );

                const statusLabel = isDayCompleted
                    ? 'Concluído'
                    : isCurrent
                        ? 'Em andamento'
                        : 'Bloqueado';

                const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

                // Locked card (future days)
                if (!isUnlocked) {
                    return (
                        <View key={day} className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4 opacity-40">
                            <View className="flex-row justify-between items-start mb-4">
                                <View className="flex-1 mr-4">
                                    <View className="flex-row items-center gap-2 mb-1">
                                        <Calendar size={20} color="#3f3f46" />
                                        <Text className="text-zinc-500 text-2xl font-bold">Dia {day}</Text>
                                    </View>
                                    <Text className="text-zinc-600 font-bold mt-1">Bloqueado</Text>
                                    <Text className="text-zinc-600 text-xs mt-2">Complete o quiz diário para desbloquear</Text>
                                </View>
                                <Lock size={28} color="#3f3f46" />
                            </View>
                            <View className="h-1 bg-zinc-800/30 rounded-full w-full" />
                        </View>
                    );
                }

                // Active/completed card
                return (
                    <TouchableOpacity
                        key={day}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
                        className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4"
                    >
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="flex-1 mr-4">
                                <View className="flex-row items-center gap-2 mb-1">
                                    <Calendar size={20} color="#71717a" />
                                    <Text className="text-white text-2xl font-bold">Dia {day}</Text>
                                </View>
                                <Text className="text-orange-600 font-bold mt-1">{statusLabel}</Text>
                                <Text className="text-zinc-400 text-sm mt-3">
                                    Execução diária - {tasks.length} metas
                                </Text>
                            </View>
                            {isDayCompleted ? (
                                <CheckCircle2 size={28} color="#22c55e" strokeWidth={3} />
                            ) : (
                                <Circle size={28} color="#3f3f46" />
                            )}
                        </View>

                        <View className="mt-4">
                            <View className="h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                                <View
                                    className={`h-full rounded-full ${isDayCompleted ? 'bg-green-500' : 'bg-orange-600'}`}
                                    style={{ width: `${isDayCompleted ? 100 : progress}%` }}
                                />
                            </View>
                            <View className="flex-row justify-between mt-2">
                                <Text className="text-zinc-500 text-[10px] font-bold">
                                    {isDayCompleted ? '100' : progress}%
                                </Text>
                                <Text className="text-zinc-500 text-[10px] font-bold">{statusLabel}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
