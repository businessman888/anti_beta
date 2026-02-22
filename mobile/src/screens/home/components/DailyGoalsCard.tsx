import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { GoalItem } from './GoalItem';

interface DailyGoalsCardProps {
    completed: number;
    total: number;
    items: Array<{ id: string; title: string; completed: boolean; type: string }>;
}

export const DailyGoalsCard = ({ completed, total, items }: DailyGoalsCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const percentage = Math.round((completed / total) * 100);

    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-xl font-bold">Metas hoje</Text>
                <Text className="text-zinc-500 text-xl font-bold">
                    {completed}/{total} <Text className="text-orange-600">({percentage}%)</Text>
                </Text>
            </View>

            <View className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-6">
                <View
                    className="h-full bg-orange-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </View>

            <View className="mb-6">
                {items.map((item) => (
                    <GoalItem key={item.id} {...item} />
                ))}
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Goals')}
                className="bg-zinc-900/80 border border-zinc-800 py-4 rounded-2xl items-center shadow-sm"
            >
                <Text className="text-zinc-400 font-bold">Ver Metas</Text>
            </TouchableOpacity>
        </View>
    );
};
