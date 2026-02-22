import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Dumbbell, Apple, Droplets, Zap, Lock, ChevronRight, CheckCircle2, Circle } from 'lucide-react-native';

export const DailyGoalsView = () => {
    return (
        <View className="flex-1">
            {/* Date and Overall Progress */}
            <View className="mb-8">
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center gap-2">
                        <Calendar size={20} color="#71717a" />
                        <Text className="text-white text-lg font-bold">Hoje - Qua 19</Text>
                    </View>
                    <Text className="text-orange-600 text-lg font-bold">80%</Text>
                </View>
                <View className="h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-2">
                    <View className="h-full bg-orange-600 rounded-full w-[80%]" />
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
                <Text className="text-white text-xl font-bold mb-2">Peito e Triceps</Text>
                <Text className="text-zinc-400 text-sm mb-6">6 exercícios - Est. 45 min</Text>

                <TouchableOpacity className="border border-orange-600 py-4 rounded-2xl flex-row justify-center items-center gap-2">
                    <Text className="text-orange-600 font-bold">Ver treino</Text>
                    <ChevronRight size={18} color="#f97316" />
                </TouchableOpacity>
            </View>

            {/* Meals Card */}
            <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center gap-2 mb-6">
                    <Apple size={20} color="#f97316" />
                    <Text className="text-white text-xl font-bold">Refeições</Text>
                </View>

                {[
                    { title: 'Café da manhã', time: '07:00', completed: true },
                    { title: 'Snack Manhã', time: '10:00', completed: true },
                    { title: 'Almoço', time: '13:00', completed: true },
                    { title: 'Snack Tarde', time: '15:00', completed: false, highlight: true },
                    { title: 'Jantar', time: '19:00', completed: false, disabled: true },
                ].map((item, index) => (
                    <View key={index} className="flex-row items-center justify-between mb-5 last:mb-0">
                        <View className="flex-row items-center gap-3">
                            {item.completed ? (
                                <CheckCircle2 size={24} color="#059669" />
                            ) : (
                                <Circle size={24} color={item.disabled ? "#27272a" : "#71717a"} />
                            )}
                            <Text className={`text-lg ${item.completed ? 'text-zinc-500 line-through' : item.disabled ? 'text-zinc-700' : 'text-white'}`}>
                                {item.title}
                            </Text>
                        </View>
                        <Text className={`text-sm font-bold ${item.highlight ? 'text-orange-600' : item.disabled ? 'text-zinc-800' : 'text-zinc-500'}`}>
                            {item.time}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Hydration Card */}
            <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center gap-2">
                        <Droplets size={20} color="#06b6d4" />
                        <Text className="text-white text-xl font-bold">Hidratação</Text>
                    </View>
                    <Text className="text-zinc-400 font-bold">0.5L <Text className="text-zinc-600">/ 2.0L</Text></Text>
                </View>

                <View className="h-1.5 bg-zinc-950 rounded-full overflow-hidden mb-8">
                    <View className="h-full bg-cyan-600 rounded-full w-[25%]" />
                </View>

                <TouchableOpacity className="bg-orange-600 py-4 rounded-2xl items-center">
                    <Text className="text-white font-bold text-lg">+ 500ml</Text>
                </TouchableOpacity>
            </View>

            {/* Bio Hacking Card */}
            <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
                <View className="flex-row items-center gap-2 mb-6">
                    <Zap size={20} color="#f97316" />
                    <Text className="text-white text-xl font-bold">Bio Hacking</Text>
                </View>

                {[
                    { title: 'Banho gelado', completed: false },
                    { title: 'Exposição solar (15 min)', completed: true },
                    { title: 'Leitura', completed: true },
                    { title: 'Meditação', completed: false },
                    { title: 'Visualização', completed: false },
                ].map((item, index) => (
                    <View key={index} className="flex-row items-center gap-3 mb-5 last:mb-0">
                        {item.completed ? (
                            <CheckCircle2 size={24} color="#f97316" />
                        ) : (
                            <Circle size={24} color="#27272a" />
                        )}
                        <Text className={`text-lg ${item.completed ? 'text-white' : 'text-zinc-500'}`}>
                            {item.title}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Daily Quiz Card */}
            <View className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl p-6 opacity-60">
                <View className="flex-row items-center justify-between">
                    <View>
                        <View className="flex-row items-center gap-2 mb-1">
                            <Text className="text-zinc-400 font-bold">Quiz do dia</Text>
                        </View>
                        <Text className="text-zinc-600 text-sm">Disponível em 21h</Text>
                    </View>
                    <Lock size={24} color="#3f3f46" />
                </View>
            </View>
        </View>
    );
};
