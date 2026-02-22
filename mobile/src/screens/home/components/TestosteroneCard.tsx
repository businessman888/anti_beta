import React from 'react';
import { View, Text } from 'react-native';
import { Mars } from 'lucide-react-native';

interface TestosteroneCardProps {
    level: number;
    growth: number;
}

export const TestosteroneCard = ({ level, growth }: TestosteroneCardProps) => {
    const progress = (level / 1000) * 100; // Assuming 1000 is max for visual

    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-xl font-bold">
                    Testosterona: <Text className="text-orange-500">{level}</Text>
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
                <Text className="text-white text-3xl font-bold">67%</Text>
                <Text className="text-emerald-500 text-xs font-bold ml-2 mb-1">+{growth}% esta semana</Text>
            </View>
        </View>
    );
};
