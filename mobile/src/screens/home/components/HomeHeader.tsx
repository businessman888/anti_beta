import React from 'react';
import { View, Text, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import { Avatar } from '../../../components/ui/Avatar';

interface HomeHeaderProps {
    profile: any;
    userEmail?: string;
}

export const HomeHeader = ({ profile, userEmail }: HomeHeaderProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const displayName = profile?.full_name || userEmail?.split('@')[0] || 'Usuário';

    return (
        <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Profile')}
                    className="relative"
                >
                    <Avatar 
                        url={profile?.avatar_url}
                        size={48}
                        style={{ borderWidth: 2, borderColor: '#27272a' }} // zinc-800
                    />
                </TouchableOpacity>
                <View className="ml-3">
                    <Text className="text-white font-bold text-lg">{displayName}</Text>
                </View>
            </View>

        </View>
    );
};
