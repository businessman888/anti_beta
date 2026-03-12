import React from 'react';
import { View, Text, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { TouchableOpacity } from 'react-native';

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
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile')}
                    className="relative"
                >
                    <Image
                        source={{ uri: user.avatar }}
                        className="w-12 h-12 rounded-full border-2 border-zinc-800"
                    />
                </TouchableOpacity>
                <View className="ml-3">
                    <Text className="text-white font-bold text-lg">{user.name}</Text>
                    <Text className="text-zinc-500 text-xs font-semibold">{user.level}</Text>
                </View>
            </View>

        </View>
    );
};
