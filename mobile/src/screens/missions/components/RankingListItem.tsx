import React from 'react';
import { View, Text, Image } from 'react-native';
import { Flame } from 'lucide-react-native';

interface RankingListItemProps {
    rank: number;
    name: string;
    score: number;
    streak: number;
    avatar: string;
}

export const RankingListItem = ({ rank, name, score, streak, avatar }: RankingListItemProps) => {
    return (
        <View className="bg-zinc-900/40 border border-zinc-800/40 rounded-3xl p-4 mb-3 flex-row items-center">
            <Text className="text-zinc-700 font-bold text-2xl w-10 mr-2 text-center">
                {rank < 10 ? `0${rank}` : rank}
            </Text>

            <Image
                source={{ uri: avatar }}
                className="w-14 h-14 rounded-full border border-zinc-700"
            />

            <View className="ml-4 flex-1">
                <Text className="text-white font-bold text-base">{name}</Text>
                <View className="flex-row items-center mt-1">
                    <Flame size={12} color={streak > 0 ? "#f97316" : "#3f3f46"} fill={streak > 0 ? "#f97316" : "none"} />
                    <Text className={`text-[10px] font-bold ml-1 ${streak > 0 ? 'text-orange-600' : 'text-zinc-600'}`}>
                        {streak < 10 ? `0${streak}` : streak} dias de sequência
                    </Text>
                </View>
            </View>

            <View className="items-end">
                <Text className="text-orange-500 font-bold text-lg">
                    {score.toLocaleString()}
                </Text>
                <Text className="text-zinc-700 text-[10px] font-bold uppercase">TST total</Text>
            </View>
        </View>
    );
};
