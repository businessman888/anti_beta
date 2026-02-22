import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dumbbell, Target, Gauge } from 'lucide-react-native';

interface AchievementsCardProps {
    unlocked: number;
    total: number;
}

export const AchievementsCard = ({ unlocked, total }: AchievementsCardProps) => {
    const percentage = Math.round((unlocked / total) * 100);

    return (
        <View className="mb-12">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white font-bold text-base">Suas conquistas</Text>
                <TouchableOpacity>
                    <Text className="text-orange-500 font-bold text-sm">Ver tudo</Text>
                </TouchableOpacity>
            </View>

            <View className="bg-zinc-900/50 border border-zinc-800/60 rounded-3xl p-6">
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row">
                        <View className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 items-center justify-center -mr-2">
                            <Dumbbell size={18} color="#f97316" />
                        </View>
                        <View className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 items-center justify-center -mr-2">
                            <Gauge size={18} color="#f97316" />
                        </View>
                        <View className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 items-center justify-center -mr-2">
                            <Target size={18} color="#f97316" />
                        </View>
                        <View className="w-10 h-10 rounded-full bg-zinc-900 border-2 border-zinc-800 border-dashed items-center justify-center">
                            <Text className="text-zinc-600 font-bold text-[10px]">+5</Text>
                        </View>
                    </View>

                    <View className="items-end">
                        <Text className="text-zinc-600 font-bold text-[10px] uppercase">Desbloqueados</Text>
                        <Text className="text-white font-bold text-2xl">{unlocked}/{total}</Text>
                    </View>
                </View>

                <View className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <View
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </View>
            </View>
        </View>
    );
};
