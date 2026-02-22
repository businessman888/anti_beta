import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Dumbbell } from 'lucide-react-native';

interface WorkoutCardProps {
    title: string;
    exercises: number;
    duration: string;
}

export const WorkoutCard = ({ title, exercises, duration }: WorkoutCardProps) => {
    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-4">
                <Dumbbell size={18} color="#f97316" />
                <Text className="text-orange-600 font-bold ml-2 text-xs uppercase">Treino do dia</Text>
            </View>

            <Text className="text-white text-xl font-bold mb-1">{title}</Text>
            <Text className="text-zinc-500 text-sm mb-6">{exercises} exercícios - Est. {duration}</Text>

            <TouchableOpacity className="border border-orange-600 bg-orange-600/5 py-4 rounded-2xl flex-row justify-center items-center shadow-sm shadow-orange-950/20">
                <Text className="text-orange-500 font-bold">Ver treino</Text>
                <ChevronRight size={18} color="#f97316" className="ml-1" />
            </TouchableOpacity>
        </View>
    );
};
