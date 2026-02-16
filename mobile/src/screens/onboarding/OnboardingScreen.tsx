import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export const OnboardingScreen = () => {
    const { signOut } = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-zinc-950 p-4 justify-center items-center">
            <Text className="text-white text-2xl font-bold mb-4">Onboarding</Text>
            <Text className="text-zinc-400 mb-8">Aqui será o fluxo de 28 perguntas.</Text>

            <TouchableOpacity
                onPress={signOut}
                className="bg-zinc-800 px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-bold">Sair (Debug)</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
