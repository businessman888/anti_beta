import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, Flame, Shield, Dumbbell, Egg, Moon, Droplets, UserCheck, Smartphone, Beer, TrendingUp, Target, Zap } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface MetricProps {
    icon: React.ReactNode;
    label: string;
    progress: number;
    sublabel: string;
}

const MetricRow = ({ icon, label, progress, sublabel }: MetricProps) => (
    <View className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
                <View className="w-8 h-8 items-center justify-center mr-2">
                    {icon}
                </View>
                <Text className="text-white font-medium text-base">{label}</Text>
            </View>
            <Text className="text-orange-600 font-bold">{progress}%</Text>
        </View>
        <View className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <View
                className="h-full bg-orange-600"
                style={{ width: `${progress}%` }}
            />
        </View>
        <Text className="text-orange-600/60 text-[10px] font-medium mt-1 ml-1">{sublabel}</Text>
    </View>
);

export const TestoScreen = () => {
    const navigation = useNavigation();
    const [historyTab, setHistoryTab] = useState<'semanal' | 'mensal'>('semanal');

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl">Testo</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Hero Card */}
                <View className="px-6 mt-4">
                    <View className="bg-zinc-900/40 border border-zinc-900 rounded-[32px] p-8 items-center">
                        <Flame size={64} color="#f97316" fill="#f97316" className="mb-4" />
                        <Text className="text-orange-500 font-bold text-4xl mb-1">240</Text>
                        <Text className="text-zinc-400 font-medium text-lg mb-6">Crescendo!</Text>

                        <View className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full mb-8">
                            <Text className="text-emerald-500 font-bold text-xs">+5% esta semana</Text>
                        </View>

                        <View className="w-full">
                            <View className="h-2.5 bg-zinc-900 rounded-full overflow-hidden mb-3">
                                <View className="h-full bg-orange-500" style={{ width: '16%' }} />
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-zinc-600 text-xs font-medium">Início</Text>
                                <Text className="text-zinc-600 text-xs font-medium">Meta: 1.500</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Components List */}
                <View className="px-6 mt-10">
                    <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-6">Componentes</Text>

                    <MetricRow
                        icon={<Shield size={20} color="#71717a" />}
                        label="NoFap"
                        progress={90}
                        sublabel="14 dias de sequência"
                    />
                    <MetricRow
                        icon={<Dumbbell size={20} color="#71717a" />}
                        label="Treino"
                        progress={80}
                        sublabel="Hipertrofia - 5x/semana"
                    />
                    <MetricRow
                        icon={<Egg size={20} color="#71717a" />}
                        label="Alimentação"
                        progress={55}
                        sublabel="Macros ajustados"
                    />
                    <MetricRow
                        icon={<Moon size={20} color="#71717a" />}
                        label="Sono"
                        progress={65}
                        sublabel="Média: 7h - 12h"
                    />
                    <MetricRow
                        icon={<Droplets size={20} color="#71717a" />}
                        label="Hidratação"
                        progress={40}
                        sublabel="2.1L / 4L meta"
                    />
                    <MetricRow
                        icon={<UserCheck size={20} color="#71717a" />}
                        label="Práticas"
                        progress={30}
                        sublabel="Meditação pendente"
                    />
                    <MetricRow
                        icon={<Smartphone size={20} color="#71717a" />}
                        label="Redes"
                        progress={85}
                        sublabel="Limitado a 30min"
                    />
                    <MetricRow
                        icon={<Beer size={20} color="#71717a" />}
                        label="Vícios"
                        progress={100}
                        sublabel="Zero álcool"
                    />
                </View>

                {/* History Section */}
                <View className="px-6 mt-6">
                    <View className="bg-zinc-900/40 border border-zinc-900 rounded-[32px] p-6">
                        <View className="flex-row items-center justify-between mb-8">
                            <View className="flex-row items-center">
                                <TrendingUp size={20} color="#f5f5f5" className="mr-2" />
                                <Text className="text-white font-bold text-base ml-2">Histórico</Text>
                            </View>
                            <View className="flex-row bg-zinc-950 p-1 rounded-xl">
                                <TouchableOpacity
                                    onPress={() => setHistoryTab('semanal')}
                                    className={`px-4 py-1.5 rounded-lg ${historyTab === 'semanal' ? 'bg-orange-600 shadow-sm shadow-orange-600/40' : ''}`}
                                >
                                    <Text className={`text-[10px] font-bold ${historyTab === 'semanal' ? 'text-white' : 'text-zinc-600'}`}>Semanal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setHistoryTab('mensal')}
                                    className={`px-4 py-1.5 rounded-lg ${historyTab === 'mensal' ? 'bg-orange-600 shadow-sm shadow-orange-600/40' : ''}`}
                                >
                                    <Text className={`text-[10px] font-bold ${historyTab === 'mensal' ? 'text-white' : 'text-zinc-600'}`}>Mensal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Chart Mock - Curved SVG */}
                        <View className="h-40 overflow-hidden mb-2">
                            <Svg height="100%" width="100%" viewBox="0 0 320 120">
                                <Defs>
                                    <LinearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                                        <Stop offset="0" stopColor="#f42" stopOpacity="0.35" />
                                        <Stop offset="1" stopColor="#f42" stopOpacity="0" />
                                    </LinearGradient>
                                </Defs>
                                {/* Area Glow */}
                                <Path
                                    d="M 10,100 C 100,100 200,80 310,20 L 310,120 L 10,120 Z"
                                    fill="url(#glow)"
                                />
                                {/* Curve Path */}
                                <Path
                                    d="M 10,100 C 100,100 200,80 310,20"
                                    stroke="#f42"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                                {/* Marker Dot */}
                                <Circle cx="310" cy="20" r="4" fill="#f42" />
                            </Svg>
                        </View>

                        <View className="flex-row items-center justify-between border-t border-zinc-900 pt-6">
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-medium mb-1">Progresso total</Text>
                                <Text className="text-white font-bold text-sm">JAN: 35% - 67%</Text>
                            </View>
                            <Text className="text-emerald-500 font-bold text-sm">+32% no mês!</Text>
                        </View>
                    </View>
                </View>

                {/* Improvements Section */}
                <View className="px-6 mt-6">
                    <View className="bg-zinc-900/40 border border-zinc-900 rounded-[32px] p-6">
                        <View className="flex-row items-center mb-6">
                            <Target size={20} color="#f5f5f5" className="mr-2" />
                            <Text className="text-white font-bold text-base ml-2">Melhorias</Text>
                        </View>

                        <View className="space-y-4 mb-8">
                            <View className="flex-row items-start mb-4">
                                <View className="w-5 h-5 bg-orange-600/20 rounded-full items-center justify-center mr-4 mt-0.5">
                                    <View className="w-2 h-2 bg-orange-600 rounded-full" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-zinc-600 text-sm">
                                        Foco da semana: <Text className="text-white">Aumentar ingestão de gorduras boas</Text> (abacate, azeite).
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row items-start mb-4">
                                <View className="w-5 h-5 bg-orange-600/20 rounded-full items-center justify-center mr-4 mt-0.5">
                                    <View className="w-2 h-2 bg-orange-600 rounded-full" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-sm">
                                        Melhorar higiene do sono <Text className="text-zinc-600">(sem telas 1h antes).</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Next Goal Button */}
                        <TouchableOpacity
                            className="bg-zinc-900 border border-orange-600/40 rounded-2xl p-4 flex-row items-center justify-between"
                        >
                            <View>
                                <Text className="text-zinc-600 text-[10px] font-medium mb-1">Próximo objetivo</Text>
                                <Text className="text-white font-bold text-sm">Nível Avançado</Text>
                            </View>
                            <View className="bg-orange-600/20 border border-orange-600/50 px-4 py-2 rounded-xl flex-row items-center">
                                <Text className="text-orange-600 font-bold text-sm mr-2">70%</Text>
                                <Zap size={14} color="#f42" fill="#f42" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
