import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Clock, CheckCircle2, Circle } from 'lucide-react-native';

interface MealItemProps {
    title: string;
    time: string;
    completed: boolean;
    isNext?: boolean;
    onToggle?: () => void;
}

const MealItem = ({ title, time, completed, onToggle }: MealItemProps) => {
    // Styling based on user request: all non-completed white/orange
    const iconColor = completed ? "#22c55e" : "#ffffff";
    const titleStyle = completed ? "text-zinc-600 line-through" : "text-zinc-100";
    const timeStyle = completed ? "text-zinc-700 font-bold" : "text-orange-600 font-bold";

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.7}
            className="flex-row items-center justify-between mb-6 last:mb-0"
        >
            <View className="flex-row items-center flex-1">
                <View className="mr-3">
                    {completed ? (
                        <CheckCircle2 size={24} color="#22c55e" strokeWidth={3} />
                    ) : (
                        <Circle size={24} color="#3f3f46" />
                    )}
                </View>
                <Text className={`text-lg flex-1 font-medium ${titleStyle}`}>
                    {title}
                </Text>
            </View>
            <Text className={`text-sm ${timeStyle}`}>
                {time}
            </Text>
        </TouchableOpacity>
    );
};

interface MealsCardProps {
    items: Omit<MealItemProps, 'onToggle' | 'isNext'>[];
    onToggleMeal?: (index: number) => void;
}

export const MealsCard = ({ items, onToggleMeal }: MealsCardProps) => {
    return (
        <View className="bg-zinc-900 border border-zinc-800/50 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-8">
                <View className="bg-orange-600/10 p-2 rounded-xl mr-3">
                    <Clock size={20} color="#f97316" fill="#f97316" />
                </View>
                <Text className="text-white font-bold text-xl">Refeições</Text>
            </View>

            <View>
                {items.map((item, index) => (
                    <MealItem
                        key={index}
                        {...item}
                        onToggle={() => onToggleMeal?.(index)}
                    />
                ))}
            </View>
        </View>
    );
};
