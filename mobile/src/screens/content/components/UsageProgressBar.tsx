import React from 'react';
import { View, Text } from 'react-native';

interface UsageProgressBarProps {
    used: number;
    total: number;
    planType: string;
}

export const UsageProgressBar = ({ used, total, planType }: UsageProgressBarProps) => {
    const percentage = (used / total) * 100;

    return (
        <View className="px-6 mt-8">
            <View className="flex-row justify-between items-center mb-2">
                <View className="h-1 bg-zinc-900 flex-1 rounded-full mr-4 overflow-hidden">
                    <View
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </View>
                <Text className="text-zinc-600 text-[10px] font-medium">
                    {planType}: <Text className="text-zinc-400 font-bold">{used}/{total}</Text> conversas usadas
                </Text>
            </View>
        </View>
    );
};
