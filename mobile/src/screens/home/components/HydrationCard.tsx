import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Droplet, Check } from 'lucide-react-native';

interface HydrationCardProps {
    current: number;
    target: number;
    isCompleted?: boolean;
    onAdd: () => void;
}

export const HydrationCard = ({ current, target, isCompleted, onAdd }: HydrationCardProps) => {
    const progress = isCompleted ? 100 : Math.min((current / target) * 100, 100);
    const displayCurrent = isCompleted ? target : current;

    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                    <Droplet size={20} color="#10b981" fill="#10b981" />
                    <Text className="text-white font-bold text-xl ml-3">Hidratação</Text>
                </View>
                <Text className="text-zinc-500 font-bold text-lg">
                    {displayCurrent.toFixed(1)}L <Text className="text-zinc-700">/ {target.toFixed(1)}L</Text>
                </Text>
            </View>

            <View className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-8">
                <View
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </View>

            {isCompleted ? (
                <View className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl py-4 items-center flex-row justify-center">
                    <Check size={20} color="#10b981" />
                    <Text className="text-emerald-500 font-bold text-lg ml-2">Meta Batida</Text>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={onAdd}
                    className="bg-orange-600 rounded-2xl py-4 items-center shadow-lg shadow-orange-950/20 active:bg-orange-700"
                >
                    <Text className="text-white font-bold text-lg">+ 500ml</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
