import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const { signOut, user } = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-zinc-950 p-4 justify-center items-center">
            <Text className="text-white text-2xl font-bold mb-4">Bem-vindo, {user?.email}!</Text>
            <Text className="text-zinc-400 mb-8">Esta é a Home do Antibeta.</Text>

            <TouchableOpacity
                onPress={signOut}
                className="bg-red-600 px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-bold">Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
