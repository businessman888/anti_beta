import React from 'react';
import { View, Text } from 'react-native';
import { Clock, CheckCircle2, Circle } from 'lucide-react-native';

interface MealItemProps {
    title: string;
    time: string;
    completed: boolean;
    isCurrent?: boolean;
}

const MealItem = ({ title, time, completed, isCurrent }: MealItemProps) => {
    return (
        <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
                {completed ? (
                    <CheckCircle2 size={22} color="#22c55e" />
                ) : isCurrent ? (
                    <Circle size={22} color="#ffffff" strokeWidth={2} />
                ) : (
                    <Circle size={22} color="#3f3f46" />
                )}
                <Text className={`ml-3 text-base font-medium ${completed ? 'text-zinc-400' : isCurrent ? 'text-white' : 'text-zinc-600'}`}>
                    {title}
                </Text>
            </View>
            <Text className={`text-sm font-bold ${completed ? 'text-zinc-700' : isCurrent ? 'text-orange-600' : 'text-zinc-700'}`}>
                {time}
            </Text>
        </View>
    );
};

interface MealsCardProps {
    items: MealItemProps[];
}

export const MealsCard = ({ items }: MealsCardProps) => {
    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-8">
                <View className="bg-orange-600/20 p-2 rounded-xl mr-3">
                    <Clock size={20} color="#f97316" fill="#f97316" />
                </View>
                <Text className="text-white font-bold text-xl">Refeições</Text>
            </View>

            <View>
                {items.map((item, index) => (
                    <MealItem key={index} {...item} />
                ))}
            </View>
        </View>
    );
};
