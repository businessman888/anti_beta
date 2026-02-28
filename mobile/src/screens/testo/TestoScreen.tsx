import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeft, Flame, Shield, Dumbbell, Egg, Moon, Droplets, UserCheck, Smartphone, Beer, TrendingUp, Target, Zap } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useProgressStore } from '../../store/progressStore';

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

    const { todayStats, fetchTodayStats, isLoading, historyStats, fetchHistory, weeklyInsight, fetchWeeklyInsights, isInsightLoading, insightError } = useProgressStore();

    useFocusEffect(
        useCallback(() => {
            fetchTodayStats();
            fetchWeeklyInsights();
        }, [])
    );

    useEffect(() => {
        fetchHistory(historyTab === 'semanal' ? 'weekly' : 'monthly');
    }, [historyTab, fetchHistory]);

    // --- Chart Data Calculation ---
    // Extract recent points, at least 1, max depends on tab
    const dataPoints = historyStats.length > 0
        ? historyStats.map(s => s.testoPoints)
        : [todayStats?.testoPoints || 0];

    // Fallback if data points only has 1 item, duplicate it to draw a straight line
    if (dataPoints.length === 1) dataPoints.push(dataPoints[0]);

    // SVG ViewBox is 320x120. We will map X from 10 to 310, and Y from 100 (bottom) to 20 (top).
    // Testo points go from 0 to 100.
    const mapY = (val: number) => {
        // val = 0 -> Y = 100
        // val = 100 -> Y = 20
        return 100 - (val / 100) * 80;
    };

    const stepX = 300 / (dataPoints.length - 1);
    const coordinates = dataPoints.map((val, index) => ({
        x: 10 + index * stepX,
        y: mapY(val)
    }));

    // Build SVG Path string
    let pathString = `M ${coordinates[0].x},${coordinates[0].y}`;
    for (let i = 1; i < coordinates.length; i++) {
        // Simple line for now; could be cubic bezier for smoother curves, 
        // but straight lines or smooth quadratic approximation works.
        // Let's use a very slight curve using quadratic bezier if we want, or just lines
        // A standard line graph is fine: L x,y
        pathString += ` L ${coordinates[i].x},${coordinates[i].y}`;
    }

    const areaPathString = `${pathString} L ${coordinates[coordinates.length - 1].x},120 L 10,120 Z`;
    const lastPoint = coordinates[coordinates.length - 1];

    // --- Summary Calculations ---
    const startVal = dataPoints[0] || 0;
    const endVal = dataPoints[dataPoints.length - 1] || 0;
    const diff = endVal - startVal;

    const diffText = diff >= 0 ? `+${diff}%` : `${diff}%`;
    const diffColor = diff >= 0 ? "text-emerald-500" : "text-red-500";

    const periodName = historyTab === 'semanal' ? 'na semana' : 'no mês';

    const renderChart = () => (
        <View className="h-40 overflow-hidden mb-2">
            <Svg height="100%" width="100%" viewBox="0 0 320 120">
                <Defs>
                    <LinearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0" stopColor="#f42" stopOpacity="0.35" />
                        <Stop offset="1" stopColor="#f42" stopOpacity="0" />
                    </LinearGradient>
                </Defs>
                <Path d={areaPathString} fill="url(#glow)" />
                <Path d={pathString} stroke="#f42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <Circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill="#f42" />
            </Svg>
        </View>
    );

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

                        {isLoading ? (
                            <ActivityIndicator color="#f97316" className="mb-8" />
                        ) : (
                            <>
                                <Text className="text-orange-500 font-bold text-4xl mb-1">{todayStats?.testoPoints || 0}</Text>
                                <Text className="text-zinc-400 font-medium text-lg mb-6">Nível Testo</Text>

                                <View className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full mb-8">
                                    <Text className="text-emerald-500 font-bold text-xs">+5% esta semana</Text>
                                </View>
                            </>
                        )}

                        <View className="w-full">
                            <View className="h-2.5 bg-zinc-900 rounded-full overflow-hidden mb-3">
                                <View className="h-full bg-orange-500" style={{ width: `${Math.min(todayStats?.testoPoints || 0, 100)}%` }} />
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-zinc-600 text-xs font-medium">Início</Text>
                                <Text className="text-zinc-600 text-xs font-medium">Meta: 100 Nvls.</Text>
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
                        progress={Math.round(todayStats?.nofapProgress || 0)}
                        sublabel={`${todayStats?.nofapStreak || 0} dias de sequência / Meta: 90 dias`}
                    />
                    <MetricRow
                        icon={<Dumbbell size={20} color="#71717a" />}
                        label="Treino"
                        progress={Math.round(todayStats?.treinoProgress || 0)}
                        sublabel="Progresso semanal em treinos"
                    />
                    <MetricRow
                        icon={<Egg size={20} color="#71717a" />}
                        label="Alimentação"
                        progress={Math.round(todayStats?.alimentacaoProgress || 0)}
                        sublabel="Refeições do dia"
                    />
                    <MetricRow
                        icon={<Moon size={20} color="#71717a" />}
                        label="Sono"
                        progress={Math.round(todayStats?.sonoProgress || 0)}
                        sublabel="Avaliado via Quiz"
                    />
                    <MetricRow
                        icon={<Droplets size={20} color="#71717a" />}
                        label="Hidratação"
                        progress={Math.round(todayStats?.hidratacaoProgress || 0)}
                        sublabel="Garrafas de água concluidas"
                    />
                    <MetricRow
                        icon={<UserCheck size={20} color="#71717a" />}
                        label="Práticas"
                        progress={Math.round(todayStats?.praticasProgress || 0)}
                        sublabel="Avaliado via Quiz"
                    />
                    <MetricRow
                        icon={<Smartphone size={20} color="#71717a" />}
                        label="Redes Sociais"
                        progress={Math.round(todayStats?.redesProgress || 0)}
                        sublabel="Avaliado via Quiz"
                    />
                    <MetricRow
                        icon={<Beer size={20} color="#71717a" />}
                        label="Vícios"
                        progress={Math.round(todayStats?.viciosProgress || 0)}
                        sublabel="Avaliado via Quiz"
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

                        {renderChart()}

                        <View className="flex-row items-center justify-between border-t border-zinc-900 pt-6">
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-medium mb-1">Progresso total</Text>
                                <Text className="text-white font-bold text-sm">Níveis: {startVal} - {endVal}</Text>
                            </View>
                            <Text className={`${diffColor} font-bold text-sm`}>{diffText} {periodName}!</Text>
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
                            {isInsightLoading ? (
                                <View className="items-center justify-center py-6">
                                    <ActivityIndicator size="small" color="#ea580c" />
                                    <Text className="text-zinc-500 mt-3 text-sm">Analisando sua semana...</Text>
                                </View>
                            ) : insightError ? (
                                <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                                    <Text className="text-zinc-400 text-sm text-center leading-5">{insightError}</Text>
                                </View>
                            ) : weeklyInsight ? (
                                weeklyInsight.pointsOfImprovement.map((point: string, index: number) => (
                                    <View key={index} className="flex-row items-start mb-4">
                                        <View className="w-5 h-5 bg-orange-600/20 rounded-full items-center justify-center mr-4 mt-0.5">
                                            <View className="w-2 h-2 bg-orange-600 rounded-full" />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-zinc-300 text-sm leading-5">
                                                {point}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View className="items-center justify-center py-6">
                                    <Text className="text-zinc-500 text-sm">Nenhum relatório gerado ainda.</Text>
                                </View>
                            )}
                        </View>

                        {/* Next Goal Button */}
                        <TouchableOpacity
                            className="bg-zinc-900 border border-orange-600/40 rounded-2xl p-4 flex-row items-center justify-between opacity-90"
                            disabled={!weeklyInsight}
                        >
                            <View>
                                <Text className="text-zinc-600 text-[10px] font-medium mb-1">Próximo objetivo</Text>
                                <Text className="text-white font-bold text-sm">
                                    {weeklyInsight?.nextObjectiveTitle || 'Analise em progresso...'}
                                </Text>
                            </View>
                            <View className="bg-orange-600/20 border border-orange-600/50 px-4 py-2 rounded-xl flex-row items-center">
                                <Text className="text-orange-600 font-bold text-sm mr-2">{weeklyInsight?.nextObjectivePercent || 0}%</Text>
                                <Zap size={14} color="#f42" fill="#f42" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
