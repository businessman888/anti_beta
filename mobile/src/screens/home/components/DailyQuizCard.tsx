import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HelpCircle, Lock, ChevronRight } from 'lucide-react-native';

interface DailyQuizCardProps {
    availableIn: string;
    isLocked: boolean;
    onPress?: () => void;
}

export const DailyQuizCard = ({ availableIn, isLocked, onPress }: DailyQuizCardProps) => {
    return (
        <TouchableOpacity
            className={`flex-row items-center p-5 mb-8 rounded-2xl border ${isLocked ? 'bg-zinc-900/30 border-zinc-900/50' : 'bg-zinc-900 border-zinc-800'}`}
            onPress={onPress}
            disabled={isLocked}
        >
            <View className={`w-10 h-10 rounded-lg justify-center items-center ${isLocked ? 'bg-zinc-900/80' : 'bg-orange-500/20'}`}>
                <HelpCircle size={20} color={isLocked ? "#52525b" : "#ea580c"} />
            </View>

            <View className="ml-4 flex-1">
                <Text className={`font-bold text-lg ${isLocked ? 'text-zinc-600' : 'text-white'}`}>Quiz do dia</Text>
                <Text className={`text-sm ${isLocked ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {isLocked ? `Disponível em ${availableIn}` : 'Faça seu check-in diário!'}
                </Text>
            </View>

            {isLocked ? (
                <Lock size={20} color="#3f3f46" />
            ) : (
                <ChevronRight size={20} color="#71717a" />
            )}
        </TouchableOpacity>
    );
};
