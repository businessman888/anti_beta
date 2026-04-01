import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Target, AlertTriangle, Shield, Crosshair } from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { useQuizStore } from '../../store/quizStore';
import { getArchetypeInfo } from '../../utils/archetypeCalculator';

export const PlanGeneratedScreen = () => {
    const { setOnboardingCompleted } = useAuthStore();
    const archetype = useQuizStore((s) => s.archetype);

    // Fallback if archetype is somehow null
    const info = archetype || getArchetypeInfo('lost_rookie');

    const handleActivatePlan = () => {
        setOnboardingCompleted(true);
    };

    // Radar chart data — show top 3 attributes
    const radarEntries = Object.entries(info.radar);

    return (
        <SafeAreaView className="flex-1 bg-[#0D090A]">
            <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <View className="bg-orange-500/20 p-2 rounded-full mr-3">
                        <Zap size={20} color="#F97316" fill="#F97316" />
                    </View>
                    <Text className="text-orange-500 font-bold text-sm uppercase tracking-wider">
                        Diagnóstico Completo
                    </Text>
                </View>

                {/* Archetype Title */}
                <View className="mb-6">
                    <View className="bg-[#1A1416] border border-red-500/50 rounded-full px-4 py-1.5 self-start mb-4">
                        <View className="flex-row items-center space-x-2">
                            <View className="w-2 h-2 rounded-full bg-red-500" />
                            <Text className="text-red-400 font-medium text-xs uppercase">
                                Perfil identificado
                            </Text>
                        </View>
                    </View>

                    <Text className="text-white text-3xl font-bold leading-tight mb-2">
                        {info.title}
                    </Text>
                    <Text className="text-zinc-500 text-sm">
                        Fraqueza principal:{' '}
                        <Text className="text-red-400 font-semibold">{info.mainWeakness}</Text>
                    </Text>
                </View>

                {/* Shock Briefing Card */}
                <View className="bg-[#1A1416] border border-red-500/30 rounded-2xl p-5 mb-5">
                    <View className="flex-row items-center mb-4 space-x-3">
                        <AlertTriangle size={22} color="#EF4444" />
                        <Text className="text-red-400 font-bold text-sm uppercase tracking-wide">
                            Briefing de Realidade
                        </Text>
                    </View>
                    <Text className="text-zinc-300 text-sm leading-relaxed">
                        {info.shock}
                    </Text>
                </View>

                {/* Focus Card */}
                <View className="bg-[#1A1416] border border-orange-500/40 rounded-2xl p-5 mb-5">
                    <View className="flex-row items-center mb-4 space-x-3">
                        <Crosshair size={22} color="#F97316" />
                        <Text className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                            Foco do seu Plano
                        </Text>
                    </View>
                    <Text className="text-white text-lg font-semibold mb-2">
                        {info.focus}
                    </Text>
                    <Text className="text-zinc-400 text-sm leading-relaxed">
                        Seu plano de 3 meses será gerado com base no seu perfil para atacar
                        diretamente sua fraqueza principal e transformar você de Beta em Alfa.
                    </Text>
                </View>

                {/* Radar Stats */}
                <View className="bg-[#1A1416] border border-white/10 rounded-2xl p-5 mb-5">
                    <View className="flex-row items-center mb-5 space-x-3">
                        <Shield size={22} color="#F97316" />
                        <Text className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                            Seus Atributos
                        </Text>
                    </View>
                    <View className="space-y-4">
                        {radarEntries.map(([key, value]) => (
                            <View key={key}>
                                <View className="flex-row justify-between mb-1.5">
                                    <Text className="text-zinc-400 text-xs font-medium uppercase">
                                        {key.replace(/_/g, ' ')}
                                    </Text>
                                    <Text className="text-zinc-500 text-xs">{value}%</Text>
                                </View>
                                <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <View
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${Math.min(value, 100)}%`,
                                            backgroundColor: value >= 60 ? '#22c55e' : value >= 30 ? '#F97316' : '#EF4444',
                                        }}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Plan Preview */}
                <View className="bg-[#1A1416] border border-white/10 rounded-2xl p-5 mb-5">
                    <View className="flex-row items-center mb-4 space-x-3">
                        <Target size={22} color="#F97316" />
                        <Text className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                            Plano de Transformação
                        </Text>
                    </View>
                    <View className="space-y-3">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-8 h-8 rounded-full bg-orange-500/20 items-center justify-center">
                                <Text className="text-orange-500 text-xs font-bold">01</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-zinc-300 text-sm font-semibold">Fundamentos</Text>
                                <Text className="text-zinc-500 text-xs">Criar rotina e eliminar sabotadores</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <View className="w-8 h-8 rounded-full bg-orange-500/10 items-center justify-center">
                                <Text className="text-orange-500/60 text-xs font-bold">02</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-zinc-500 text-sm font-semibold">Evolução</Text>
                                <Text className="text-zinc-600 text-xs">Intensificar e consolidar mudanças</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <View className="w-8 h-8 rounded-full bg-orange-500/5 items-center justify-center">
                                <Text className="text-orange-500/40 text-xs font-bold">03</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-zinc-600 text-sm font-semibold">Consolidação</Text>
                                <Text className="text-zinc-700 text-xs">Manter o novo padrão Alfa</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Spacer for bottom button */}
                <View className="h-24" />
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
                        Seu plano personalizado será preparado
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
