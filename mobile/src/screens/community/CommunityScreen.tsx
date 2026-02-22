import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users } from 'lucide-react-native';

export const CommunityScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center">
            <Users size={48} color="#dc2626" />
            <Text className="text-white text-xl font-bold mt-4">Comunidade</Text>
            <Text className="text-zinc-500 mt-2">Em breve: Social e Desafios</Text>
        </SafeAreaView>
    );
};
