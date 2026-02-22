import React from 'react';
import { View, Text } from 'react-native';
import { Zap, CheckCircle2, Circle } from 'lucide-react-native';

interface BioHackingItemProps {
    title: string;
    completed: boolean;
}

const BioHackingItem = ({ title, completed }: BioHackingItemProps) => {
    return (
        <View className="flex-row items-center mb-6">
            {completed ? (
                <View className="bg-orange-600 rounded-lg p-1">
                    <CheckCircle2 size={16} color="white" />
                </View>
            ) : (
                <View className="w-6 h-6 rounded-lg border-2 border-zinc-800" />
            )}
            <Text className={`ml-4 text-base font-medium ${completed ? 'text-white' : 'text-zinc-500'}`}>
                {title}
            </Text>
        </View>
    );
};

interface BioHackingCardProps {
    items: BioHackingItemProps[];
}

export const BioHackingCard = ({ items }: BioHackingCardProps) => {
    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-8">
                <Zap size={20} color="#f97316" fill="#f97316" />
                <Text className="text-white font-bold text-xl ml-3">Bio Hacking</Text>
            </View>

            <View>
                {items.map((item, index) => (
                    <BioHackingItem key={index} {...item} />
                ))}
            </View>
        </View>
    );
};
