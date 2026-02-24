import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Zap, CheckCircle2, Circle } from 'lucide-react-native';

interface BioHackingItemProps {
    title: string;
    completed: boolean;
    onToggle?: () => void;
}

const BioHackingItem = ({ title, completed, onToggle }: BioHackingItemProps) => {
    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.7}
            className="flex-row items-center mb-6 last:mb-0"
        >
            <View className="mr-3">
                {completed ? (
                    <CheckCircle2 size={24} color="#22c55e" strokeWidth={3} />
                ) : (
                    <Circle size={24} color="#3f3f46" />
                )}
            </View>
            <Text className={`text-lg flex-1 font-medium ${completed ? 'text-zinc-600 line-through' : 'text-zinc-100'}`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

interface BioHackingCardProps {
    items: Omit<BioHackingItemProps, 'onToggle'>[];
    onToggleItem?: (index: number) => void;
}

export const BioHackingCard = ({ items, onToggleItem }: BioHackingCardProps) => {
    return (
        <View className="bg-zinc-900 border border-zinc-800/50 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-8">
                <View className="bg-orange-600/10 p-2 rounded-xl mr-3">
                    <Zap size={20} color="#f97316" fill="#f97316" />
                </View>
                <Text className="text-white font-bold text-xl">Bio Hacking</Text>
            </View>

            <View>
                {items.map((item, index) => (
                    <BioHackingItem
                        key={index}
                        {...item}
                        onToggle={() => onToggleItem?.(index)}
                    />
                ))}
            </View>
        </View>
    );
};
