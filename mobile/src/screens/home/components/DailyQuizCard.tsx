import React from 'react';
import { View, Text } from 'react-native';
import { HelpCircle, Lock } from 'lucide-react-native';

interface DailyQuizCardProps {
    availableIn: string;
    isLocked: boolean;
}

export const DailyQuizCard = ({ availableIn, isLocked }: DailyQuizCardProps) => {
    return (
        <View className="bg-zinc-900/30 border border-zinc-900/50 rounded-2xl p-5 flex-row items-center mb-8">
            <View className="w-10 h-10 bg-zinc-900/80 rounded-lg justify-center items-center">
                <HelpCircle size={20} color="#52525b" />
            </View>

            <View className="ml-4 flex-1">
                <Text className="text-zinc-600 font-bold text-lg">Quiz do dia</Text>
                <Text className="text-zinc-700 text-sm">Disponível em {availableIn}</Text>
            </View>

            {isLocked && <Lock size={20} color="#3f3f46" />}
        </View>
    );
};
