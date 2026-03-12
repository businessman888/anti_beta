import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../../../components/ui/Avatar';

interface Competitor {
    id: string;
    name: string;
    score: number;
    rank: number;
    avatar: string;
}

interface RankingPodiumProps {
    competitors: Competitor[];
}

export const RankingPodium = ({ competitors }: RankingPodiumProps) => {
    // Sort to ensure correct positioning in layout: 2nd, 1st, 3rd
    const second = competitors.find(c => c.rank === 2);
    const first = competitors.find(c => c.rank === 1);
    const third = competitors.find(c => c.rank === 3);

    const PodiumItem = ({ competitor, isFirst }: { competitor?: Competitor, isFirst?: boolean }) => {
        if (!competitor) return <View className="flex-1" />;

        return (
            <View className={`items-center flex-1 ${isFirst ? 'relative' : 'mt-8'}`}>
                <View className={`${isFirst ? 'border-2 border-orange-500 rounded-3xl p-4 bg-zinc-900/50' : ''}`}>
                    <View className="relative">
                        <Avatar
                            url={competitor.avatar}
                            size={isFirst ? 80 : 64} // w-20 = 80, w-16 = 64
                            style={{ borderWidth: 2, borderColor: '#27272a' }} // zinc-800
                        />
                        <View className="absolute -bottom-2 self-center bg-orange-600 px-2 py-0.5 rounded-full border border-zinc-950">
                            <Text className="text-white font-bold text-[10px]">#{competitor.rank}</Text>
                        </View>
                    </View>

                    <View className="items-center mt-4">
                        <Text className={`text-white font-bold ${isFirst ? 'text-sm' : 'text-xs'} text-center`} numberOfLines={1}>
                            {competitor.name}
                        </Text>
                        <Text className="text-orange-500 font-bold text-[10px] mt-1">
                            {competitor.score.toLocaleString()} TST
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-row items-end justify-center px-4 py-8 mb-4">
            <PodiumItem competitor={second} />
            <PodiumItem competitor={first} isFirst />
            <PodiumItem competitor={third} />
        </View>
    );
};
