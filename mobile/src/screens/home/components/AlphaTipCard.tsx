import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Info } from 'lucide-react-native';

interface AlphaTipCardProps {
    title: string;
    content: string;
}

export const AlphaTipCard = ({ title, content }: AlphaTipCardProps) => {
    return (
        <View className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 mb-4">
            <View className="flex-row items-center mb-6">
                <View className="bg-orange-600/20 p-1.5 rounded-lg mr-3">
                    <Info size={16} color="#f97316" fill="#f97316" />
                </View>
                <Text className="text-white font-bold text-lg">{title}</Text>
            </View>

            <Text className="text-zinc-400 text-base italic leading-6 mb-8 px-2">
                {content}
            </Text>

            <TouchableOpacity className="border border-orange-600/30 bg-zinc-900/50 py-4 rounded-2xl items-center">
                <Text className="text-orange-500 font-bold">Ver tudo</Text>
            </TouchableOpacity>
        </View>
    );
};
