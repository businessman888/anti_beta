import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';

export const ProfileScreen = () => {
    const { signOut, user } = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center p-6">
            <View className="bg-zinc-900 p-6 rounded-full mb-4">
                <User size={64} color="#dc2626" />
            </View>
            <Text className="text-white text-xl font-bold">{user?.email}</Text>
            <Text className="text-zinc-500 mt-2 mb-8">Perfil e Configurações</Text>

            <TouchableOpacity
                onPress={signOut}
                className="bg-zinc-900 border border-zinc-800 w-full py-4 rounded-2xl items-center"
            >
                <Text className="text-red-500 font-bold">Sair da Conta</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
