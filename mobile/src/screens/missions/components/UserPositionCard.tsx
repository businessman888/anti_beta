import React from 'react';
import { View, Text } from 'react-native';
import { Flame } from 'lucide-react-native';
import { Avatar } from '../../../components/ui/Avatar';

interface UserPositionCardProps {
    rank: number;
    name: string;
    score: number;
    streak: number;
    avatar: string;
}

export const UserPositionCard = ({ rank, name, score, streak, avatar }: UserPositionCardProps) => {
    return (
        <View className="mb-8">
            <Text className="text-zinc-500 font-bold text-sm text-center mb-4 uppercase tracking-widest">Sua Posição</Text>

            <View className="bg-zinc-900/60 border border-orange-600/60 rounded-3xl p-5 flex-row items-center">
                <Text className="text-white font-bold text-2xl w-12 text-center">{rank}</Text>

                <Avatar
                    url={avatar}
                    size={56}
                    style={{ borderWidth: 2, borderColor: 'rgba(234, 88, 12, 0.3)' }} // orange-600/30
                />

                <View className="ml-4 flex-1">
                    <Text className="text-white font-bold text-base">{name}</Text>
                    <View className="flex-row items-center mt-1">
                        <Flame size={12} color="#f97316" fill="#f97316" />
                        <Text className="text-orange-600 text-[10px] font-bold ml-1">
                            {streak} dias de sequência
                        </Text>
                    </View>
                </View>

                <View className="items-end">
                    <Text className="text-orange-500 font-bold text-lg">
                        {score}
                    </Text>
                    <Text className="text-zinc-700 text-[10px] font-bold uppercase">TST total</Text>
                </View>
            </View>
        </View>
    );
};
