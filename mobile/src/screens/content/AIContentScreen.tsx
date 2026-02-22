import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Menu, History } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { AlphaAvatar } from './components/AlphaAvatar';
import { VoiceButton } from './components/VoiceButton';
import { UsageProgressBar } from './components/UsageProgressBar';

export const AIContentScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl">Agente Alpha</Text>
                <TouchableOpacity className="p-2">
                    <Menu size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <AlphaAvatar />

                <View className="px-6">
                    <View className="bg-zinc-900/40 border border-zinc-900 rounded-[32px] p-8">
                        <Text className="text-zinc-400 text-lg font-medium leading-relaxed">
                            “Fala, Lucas. Tua testo tá em 240, 5% acima da semana passada. Já não tá tão betinha assim em!”
                        </Text>
                    </View>
                </View>

                <View className="items-center mt-12">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('History' as any)}
                        className="flex-row items-center bg-zinc-900/50 px-6 py-3 rounded-full border border-zinc-800"
                    >
                        <History size={18} color="#a1a1aa" />
                        <Text className="text-zinc-400 font-bold ml-2">Histórico (3 conversas)</Text>
                    </TouchableOpacity>
                </View>

                <View className="items-center mt-[15px]">
                    <Text className="text-zinc-700 font-bold text-sm tracking-widest uppercase">Segure para falar</Text>
                    <VoiceButton />
                </View>

                <UsageProgressBar used={7} total={10} planType="Básico" />
            </ScrollView>
        </SafeAreaView>
    );
};
