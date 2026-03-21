import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, Lock } from 'lucide-react-native';
import { usePlanStore, PlanMonthDetailed, PlanWeekDetailed, PlanWeekSummary } from '../../../store/planStore';

export const WeeklyGoalsView = () => {
    const { plan } = usePlanStore();

    const month1 = plan?.meses.find(m => m.numero === 1) as PlanMonthDetailed | undefined;
    const weeks = month1?.semanas || [];

    if (weeks.length === 0) {
        return (
            <View className="flex-1 items-center justify-center py-20">
                <Text className="text-zinc-500 italic">Gere seu plano para ver as metas semanais.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            {weeks.map((week, index) => {
                const isCurrent = index === 0;
                const isCompleted = false;

                if (isCurrent) {
                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4"
                        >
                            <View className="flex-row justify-between items-start mb-4">
                                <View className="flex-1 mr-4">
                                    <Text className="text-white text-2xl font-bold">Semana {week.numero}</Text>
                                    <Text className="text-orange-600 font-bold mt-1">Em andamento</Text>
                                    <Text className="text-zinc-400 text-sm mt-3" numberOfLines={2}>{week.foco}</Text>
                                </View>
                                {isCompleted ? (
                                    <CheckCircle2 size={28} color="#22c55e" strokeWidth={3} />
                                ) : (
                                    <Circle size={28} color="#3f3f46" />
                                )}
                            </View>

                            <View className="mt-4">
                                <View className="h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                                    <View className="h-full bg-orange-600 rounded-full w-[0%]" />
                                </View>
                                <View className="flex-row justify-between mt-2">
                                    <Text className="text-zinc-500 text-[10px] font-bold">0%</Text>
                                    <Text className="text-zinc-500 text-[10px] font-bold">Iniciando</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }

                return (
                    <View key={index} className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4 opacity-40">
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="flex-1 mr-4">
                                <Text className="text-zinc-500 text-2xl font-bold">Semana {week.numero}</Text>
                                <Text className="text-zinc-600 font-bold mt-1">Bloqueado</Text>
                                <Text className="text-zinc-600 text-xs mt-2">{week.foco}</Text>
                            </View>
                            <Lock size={28} color="#3f3f46" />
                        </View>
                        <View className="h-1 bg-zinc-800/30 rounded-full w-full" />
                    </View>
                );
            })}
        </View>
    );
};
