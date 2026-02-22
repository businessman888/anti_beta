import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Droplet } from 'lucide-react-native';

interface HydrationCardProps {
    current: number;
    target: number;
}

export const HydrationCard = ({ current, target }: HydrationCardProps) => {
    const progress = (current / target) * 100;

    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                    <Droplet size={20} color="#10b981" fill="#10b981" />
                    <Text className="text-white font-bold text-xl ml-3">Hidratação</Text>
                </View>
                <Text className="text-zinc-500 font-bold text-lg">
                    {current.toFixed(1)}L <Text className="text-zinc-700">/ {target.toFixed(1)}L</Text>
                </Text>
            </View>

            <View className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-8">
                <View
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </View>

            <TouchableOpacity className="bg-orange-600 rounded-2xl py-4 items-center shadow-lg shadow-orange-950/20 active:bg-orange-700">
                <Text className="text-white font-bold text-lg">+ 500ml</Text>
            </TouchableOpacity>
        </View>
    );
};
