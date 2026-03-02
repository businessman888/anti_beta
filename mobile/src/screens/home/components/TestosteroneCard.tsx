import React from 'react';
import { View, Text } from 'react-native';
import { Mars } from 'lucide-react-native';

interface TestosteroneCardProps {
    activityPoints: number;
    testoPercent: number;
    growth: number;
}

export const TestosteroneCard = ({ activityPoints, testoPercent, growth }: TestosteroneCardProps) => {
    const progress = Math.min(testoPercent, 100);
    const growthText = growth >= 0 ? `+${growth}%` : `${growth}%`;
    const growthColor = growth >= 0 ? 'text-emerald-500' : 'text-red-500';

    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-xl font-bold">
                    Pontos: <Text className="text-orange-500">{activityPoints}</Text>
                </Text>
                <Mars size={24} color="#f97316" />
            </View>

            <View className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-6">
                <View
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </View>

            <View className="flex-row items-end">
                <Text className="text-white text-3xl font-bold">{testoPercent}%</Text>
                <Text className={`${growthColor} text-xs font-bold ml-2 mb-1`}>{growthText} esta semana</Text>
            </View>
        </View>
    );
};
