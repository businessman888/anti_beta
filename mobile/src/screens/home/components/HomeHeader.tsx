import React from 'react';
import { View, Text, Image } from 'react-native';
import { Flame } from 'lucide-react-native';

interface HomeHeaderProps {
    user: {
        name: string;
        level: string;
        avatar: string;
        testosterone: number;
        streak: number;
    };
}

export const HomeHeader = ({ user }: HomeHeaderProps) => {
    return (
        <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
                <View className="relative">
                    <Image
                        source={{ uri: user.avatar }}
                        className="w-12 h-12 rounded-full border-2 border-zinc-800"
                    />
                </View>
                <View className="ml-3">
                    <Text className="text-white font-bold text-lg">{user.name}</Text>
                    <Text className="text-zinc-500 text-xs font-semibold">{user.level}</Text>
                </View>
            </View>

            <View className="bg-zinc-900/80 rounded-full px-4 py-2 flex-row items-center border border-zinc-800">
                <View className="pr-3 border-r border-zinc-800">
                    <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">TST {user.testosterone}</Text>
                </View>
                <View className="pl-3 flex-row items-center">
                    <Flame size={14} color="#f97316" fill="#f97316" />
                    <Text className="text-white font-bold text-xs ml-1">{user.streak}</Text>
                </View>
            </View>
        </View>
    );
};
