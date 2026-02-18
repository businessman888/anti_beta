import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Share2, Target, CheckCircle2, Lock, Lightbulb, Activity, Gauge } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlanGenerated'>;

export const PlanGeneratedScreen = () => {
    const { setOnboardingCompleted } = useAuthStore();
    const navigation = useNavigation<NavigationProp>();

    const handleActivatePlan = async () => {
        // Here we would typically make an API call to finalize the plan generation
        // For now, we update local state to finish onboarding
        setOnboardingCompleted(true);
        // Navigation to Home is handled by AppNavigator observing onboardingCompleted state
    };

    return (
        <SafeAreaView className="flex-1 bg-[#0D090A]">
            <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <View className="flex-row items-center space-x-2">
                        <View className="bg-orange-500/20 p-2 rounded-full">
                            <Zap size={20} color="#F97316" fill="#F97316" />
                        </View>
                        <Text className="text-orange-500 font-bold text-sm uppercase tracking-wider">
                            Planejamento rumo ao Alfa!
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Share2 size={24} color="#A1A1AA" />
                    </TouchableOpacity>
                </View>

                {/* Title Section */}
                <View className="mb-8">
                    <View className="bg-[#1A1416] border border-orange-500 rounded-full px-4 py-1.5 self-start mb-4">
                        <View className="flex-row items-center space-x-2">
                            <View className="w-2 h-2 rounded-full bg-orange-500" />
                            <Text className="text-orange-500 font-medium text-xs uppercase">
                                Plano gerado
                            </Text>
                        </View>
                    </View>

                    <Text className="text-white text-3xl font-bold leading-tight">
                        Seu dossiê de{'\n'}
                        <Text className="text-orange-500">Transformação</Text> e{'\n'}
                        <Text className="text-orange-500">Sobrar tudo</Text>
                    </Text>
                </View>

                {/* Meta Card */}
                <View className="bg-[#1A1416] border border-white/10 rounded-2xl p-5 mb-4 shadow-lg">
                    <View className="flex-row justify-between items-start mb-6">
                        <View>
                            <Text className="text-zinc-500 font-semibold text-xs mb-1">Meta</Text>
                            <Text className="text-white font-bold text-2xl">12 Objetivos</Text>
                        </View>
                        <View className="justify-center items-center">
                            {/* Placeholder for Wolf Icon or similar - using generic for now */}
                            <View className="bg-orange-500/10 p-2 rounded-lg">
                                <Target size={24} color="#F97316" />
                            </View>
                        </View>
                    </View>

                    {/* Graph Placeholder */}
                    <View className="h-40 w-full relative mb-4 justify-center items-center bg-zinc-900/30 rounded-lg overflow-hidden">
                        {/* Simulate a curve */}
                        <View className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-orange-500/50" />
                        <View className="absolute top-4 right-4 w-2 h-2 rounded-full bg-orange-500" />
                        <View className="w-full h-full border-b border-l border-white/5 opacity-50" />
                        {/* Simple visual representation of growth */}
                        <View className="absolute bottom-0 left-0 w-full h-full opacity-20 bg-orange-500/5 rotate-12 translate-y-20" />
                        <Text className="text-zinc-600 text-xs italic">Projeção de crescimento</Text>
                    </View>

                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="text-zinc-500 text-xs font-medium">Estado Atual</Text>
                        <Text className="text-orange-500 text-xs font-bold">Em 12 meses</Text>
                    </View>
                </View>

                {/* Insights Card */}
                <View className="bg-[#1A1416] border border-orange-500 rounded-3xl p-5 mb-8 shadow-sm">
                    <View className="flex-row items-center mb-6 space-x-3">
                        <Lightbulb size={24} color="#F97316" fill="#F97316" />
                        <Text className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                            INSIGHTS DE ALFA
                        </Text>
                    </View>

                    <View className="space-y-6">
                        {/* Row 1 */}
                        <View className="flex-row items-start space-x-4">
                            <Target size={20} color="#F97316" />
                            <View className="flex-1">
                                <Text className="text-zinc-500 text-[10px] uppercase font-medium">Foco Principal</Text>
                                <Text className="text-white font-semibold text-xs mt-0.5">
                                    Exterminar Procrastinação e pornografia
                                </Text>
                            </View>
                        </View>
                        {/* Row 2 */}
                        <View className="flex-row items-start space-x-4">
                            <Activity size={20} color="#F97316" />
                            <View className="flex-1">
                                <Text className="text-zinc-500 text-[10px] uppercase font-medium">Ritmo Definido</Text>
                                <Text className="text-white font-semibold text-xs mt-0.5">
                                    Modo Extremo
                                </Text>
                            </View>
                        </View>
                        {/* Row 3 */}
                        <View className="flex-row items-start space-x-4">
                            <Gauge size={20} color="#F97316" />
                            <View className="flex-1">
                                <Text className="text-zinc-500 text-[10px] uppercase font-medium">Complexidade</Text>
                                <Text className="text-white font-semibold text-xs mt-0.5">
                                    Alta Precisão
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Timeline Header */}
                <View className="mb-4">
                    <Text className="text-zinc-400 font-semibold text-sm">
                        Cronograma para deixar de ser Beta
                    </Text>
                </View>

                {/* Month 1 - Active */}
                <View className="bg-[#1A1416] border border-white/10 rounded-2xl p-4 mb-3">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-orange-500 font-semibold text-sm">Mês 01: Fundamentos</Text>
                        <View className="bg-[#2A2124] px-3 py-1 rounded-full">
                            <Text className="text-orange-500 text-[10px] font-bold uppercase">Ativo</Text>
                        </View>
                    </View>

                    <View className="space-y-3">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center space-x-3">
                                <CheckCircle2 size={20} color="#22c55e" />
                                <Text className="text-zinc-300 text-xs font-medium">Semana 01: Iniciação</Text>
                            </View>
                            {/* Chevron or similar indicator */}
                            <View className="w-1.5 h-1.5 border-r border-t border-zinc-500 rotate-45" />
                        </View>

                        <View className="flex-row items-center space-x-3 opacity-50">
                            <View className="w-5 h-5 rounded-full border border-zinc-600" />
                            <Text className="text-zinc-500 text-xs">Semana 02: Bloqueado</Text>
                        </View>
                    </View>
                </View>

                {/* Month 2 - Locked */}
                <View className="bg-[#1A1416] border border-white/5 rounded-2xl p-4 mb-3 opacity-70">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-zinc-500 font-semibold text-sm">Mês 02: Deixando de ser beta</Text>
                        <Lock size={16} color="#52525b" />
                    </View>
                    <View className="space-y-3 pl-1">
                        <View className="h-2 w-3/4 bg-zinc-800 rounded-full" />
                        <View className="h-2 w-1/2 bg-zinc-800 rounded-full" />
                    </View>
                </View>

                {/* Month 3 - Locked */}
                <View className="bg-[#1A1416] border border-white/5 rounded-2xl p-4 mb-24 opacity-50">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-zinc-500 font-semibold text-sm">Mês 03: Exalando Aura</Text>
                        <Lock size={16} color="#52525b" />
                    </View>
                    <View className="space-y-3 pl-1">
                        <View className="h-2 w-3/4 bg-zinc-800 rounded-full" />
                        <View className="h-2 w-1/2 bg-zinc-800 rounded-full" />
                    </View>
                </View>

            </ScrollView>

            {/* Sticky Footer Button */}
            <View className="absolute bottom-0 w-full p-6 bg-[#0D090A]/90 border-t border-white/5 pb-8">
                <TouchableOpacity
                    onPress={handleActivatePlan}
                    className="w-full bg-orange-600 rounded-full py-4 shadow-lg shadow-orange-500/20 active:bg-orange-700"
                >
                    <Text className="text-white text-center font-bold text-base">
                        ATIVAR MEU PLANO AGORA
                    </Text>
                    <Text className="text-white/70 text-center text-[10px] mt-1">
                        Acesso imediato a uma nova vida!
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
