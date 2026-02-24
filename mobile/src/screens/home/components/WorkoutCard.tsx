import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Dumbbell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';

interface WorkoutCardProps {
    title?: string;
    exercises?: number;
    duration?: string;
}

export const WorkoutCard = ({ title, exercises, duration }: WorkoutCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const isEmpty = !title;

    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-4">
                <Dumbbell size={18} color="#f97316" />
                <Text className="text-orange-600 font-bold ml-2 text-xs uppercase">Treino do dia</Text>
            </View>

            {isEmpty ? (
                <View>
                    <Text className="text-zinc-500 text-sm mb-6">Nenhum treino definido para hoje.</Text>
                    <TouchableOpacity className="border border-zinc-800 bg-zinc-900/50 py-4 rounded-2xl flex-row justify-center items-center">
                        <Text className="text-zinc-400 font-bold">+ Adicionar treino</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text className="text-white text-xl font-bold mb-1">{title}</Text>
                    <Text className="text-zinc-500 text-sm mb-6">{exercises} exercícios - Est. {duration}</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Workout')}
                        className="border border-orange-600 bg-orange-600/5 py-4 rounded-2xl flex-row justify-center items-center shadow-sm shadow-orange-950/20"
                    >
                        <Text className="text-orange-500 font-bold">Ver treinos</Text>
                        <ChevronRight size={18} color="#f97316" className="ml-1" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
