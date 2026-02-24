import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Dumbbell, Apple, Droplets, Zap, Lock, ChevronRight, CheckCircle2, Circle } from 'lucide-react-native';
import { usePlanStore } from '../../../store/planStore';

export const DailyGoalsView = () => {
    const {
        plan,
        getDailyGoals,
        getWorkout,
        getMeals,
        getHydration,
        getBiohacking,
        toggleMeal,
        toggleBiohacking
    } = usePlanStore();

    // Use same day/week/month logic as Home
    const currentDay = 1;
    const currentWeek = 1;
    const currentMonth = 1;

    const tasks = getDailyGoals(currentDay, currentWeek, currentMonth);
    const workout = getWorkout(currentWeek, currentMonth);
    const meals = getMeals(currentWeek, currentMonth);
    const hydrationTarget = getHydration(currentWeek, currentMonth);
    const biohacking = getBiohacking(currentWeek, currentMonth);

    // Dynamic progress calculation
    const progress = useMemo(() => {
        if (tasks.length === 0) return 0;
        const completed = tasks.filter(t => t.concluida).length;
        return Math.round((completed / tasks.length) * 100);
    }, [tasks]);

    return (
        <View className="flex-1">
            {/* Date and Overall Progress */}
            <View className="mb-8">
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center gap-2">
                        <Calendar size={20} color="#71717a" />
                        <Text className="text-white text-lg font-bold">Hoje - Dia {currentDay}</Text>
                    </View>
                    <Text className="text-orange-600 text-lg font-bold">{progress}%</Text>
                </View>
                <View className="h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-2">
                    <View className="h-full bg-orange-600 rounded-full" style={{ width: `${progress}%` }} />
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-zinc-500 text-xs">Início</Text>
                    <Text className="text-zinc-500 text-xs">Execução Diária</Text>
                </View>
            </View>

            {/* Workout Card */}
            <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center gap-2 mb-3">
                    <Dumbbell size={18} color="#f97316" />
                    <Text className="text-orange-600 font-bold">Treino do dia</Text>
                </View>

                {!workout ? (
                    <View>
                        <Text className="text-zinc-500 text-sm mb-6">Nenhum treino definido.</Text>
                        <TouchableOpacity className="border border-zinc-800 bg-zinc-900/50 py-4 rounded-2xl flex-row justify-center items-center">
                            <Text className="text-zinc-400 font-bold">+ Adicionar treino</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text className="text-white text-xl font-bold mb-2">{workout.titulo}</Text>
                        <Text className="text-zinc-400 text-sm mb-6">{workout.exercicios} exercícios - Est. {workout.duracao}</Text>

                        <TouchableOpacity className="border border-orange-600 py-4 rounded-2xl flex-row justify-center items-center gap-2">
                            <Text className="text-orange-600 font-bold">Ver treino</Text>
                            <ChevronRight size={18} color="#f97316" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Meals Card */}
            <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center gap-2 mb-6">
                    <Apple size={20} color="#f97316" />
                    <Text className="text-white text-xl font-bold">Refeições</Text>
                </View>

                {meals.length === 0 ? (
                    <View>
                        <Text className="text-zinc-500 text-sm mb-6">Nenhuma refeição planejada.</Text>
                        <TouchableOpacity className="border border-zinc-800 bg-zinc-900/50 py-4 rounded-2xl flex-row justify-center items-center">
                            <Text className="text-zinc-400 font-bold">+ Montar cardápio</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        {meals.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                onPress={() => toggleMeal(index, currentDay, currentWeek, currentMonth)}
                                className="flex-row items-center justify-between mb-5 last:mb-0"
                            >
                                <View className="flex-row items-center gap-3">
                                    {item.concluida ? (
                                        <CheckCircle2 size={24} color="#22c55e" strokeWidth={3} />
                                    ) : (
                                        <Circle size={24} color="#3f3f46" />
                                    )}
                                    <Text className={`text-lg ${item.concluida ? 'text-zinc-600 line-through' : 'text-zinc-100'}`}>
                                        {item.titulo}
                                    </Text>
                                </View>
                                <Text className={`text-sm font-bold ${item.concluida ? 'text-zinc-700' : 'text-orange-600'}`}>
                                    {item.horario}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Hydration Card */}
            <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center gap-2">
                        <Droplets size={20} color="#06b6d4" />
                        <Text className="text-white text-xl font-bold">Hidratação</Text>
                    </View>
                    <Text className="text-zinc-400 font-bold">0.5L <Text className="text-zinc-600">/ {hydrationTarget.toFixed(1)}L</Text></Text>
                </View>

                <View className="h-1.5 bg-zinc-950 rounded-full overflow-hidden mb-8">
                    <View className="h-full bg-cyan-600 rounded-full" style={{ width: `${(0.5 / hydrationTarget) * 100}%` }} />
                </View>

                <TouchableOpacity className="bg-orange-600 py-4 rounded-2xl items-center">
                    <Text className="text-white font-bold text-lg">+ 500ml</Text>
                </TouchableOpacity>
            </View>

            {/* Bio Hacking Card */}
            <View className="bg-zinc-900 border border-zinc-800/50 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center mb-8">
                    <View className="bg-orange-600/10 p-2 rounded-xl mr-3">
                        <Zap size={20} color="#f97316" fill="#f97316" />
                    </View>
                    <Text className="text-white font-bold text-xl">Bio Hacking</Text>
                </View>

                <View>
                    {biohacking.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            onPress={() => toggleBiohacking(index, currentDay, currentWeek, currentMonth)}
                            className="flex-row items-center mb-6 last:mb-0"
                        >
                            <View className="mr-3">
                                {item.concluida ? (
                                    <CheckCircle2 size={24} color="#22c55e" strokeWidth={3} />
                                ) : (
                                    <Circle size={24} color="#3f3f46" />
                                )}
                            </View>
                            <Text className={`text-lg flex-1 font-medium ${item.concluida ? 'text-zinc-600 line-through' : 'text-zinc-100'}`}>
                                {item.titulo}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};
