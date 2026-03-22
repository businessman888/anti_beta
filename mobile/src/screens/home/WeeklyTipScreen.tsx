import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ChevronLeft, BarChart2, CheckCircle2, AlertTriangle, Target, Bell, Lightbulb, BookOpen, Droplet } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useProgressStore } from '../../store/progressStore';

export const WeeklyTipScreen = () => {
    const navigation = useNavigation();
    const { weeklyInsight, isInsightLoading, fetchWeeklyInsights } = useProgressStore();

    useEffect(() => {
        fetchWeeklyInsights();
    }, []);

    const isWaiting = !weeklyInsight || weeklyInsight.status === 'INSUFFICIENT_DATA' || weeklyInsight.status === 'waiting';

    if (isInsightLoading) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950">
                <View className="flex-row items-center px-6 py-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <ChevronLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xl ml-4">Dica da semana</Text>
                </View>
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#f97316" />
                    <Text className="text-zinc-500 mt-4">Analisando sua semana...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isWaiting) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950">
                <View className="flex-row items-center px-6 py-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <ChevronLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xl ml-4">Dica da semana</Text>
                </View>
                <View className="flex-1 items-center justify-center px-8">
                    <Target size={48} color="#f97316" />
                    <Text className="text-white font-bold text-lg mt-6 text-center">
                        Mantenha a consistência, Alpha.
                    </Text>
                    <Text className="text-zinc-500 text-center mt-3 leading-5">
                        Continue cumprindo suas metas diárias. Sua análise semanal personalizada será gerada no domingo, com pelo menos 4 dias de progresso registrados.
                    </Text>
                    <View className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 mt-8 w-full">
                        <Text className="text-orange-500 font-bold text-sm mb-2">Como funciona:</Text>
                        <Text className="text-zinc-500 text-sm leading-5">
                            Todo domingo, a IA analisa seu desempenho semanal e gera recomendações táticas, foco da semana e sugestão de livro — tudo personalizado para você.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    const compliance = weeklyInsight.compliancePercent;
    const treino = weeklyInsight.treinoPercent;
    const hidratacao = weeklyInsight.hidratacaoPercent;
    const nofapDays = weeklyInsight.nofapStreakDays;

    const getStatusIcon = (value: number) => {
        if (value >= 80) return <CheckCircle2 size={18} color="#22c55e" strokeWidth={3} />;
        if (value >= 60) return null;
        return <AlertTriangle size={18} color="#f97316" />;
    };

    const getLabelColor = (value: number) => {
        if (value < 60) return 'text-orange-500';
        return 'text-zinc-700';
    };

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            {/* Header */}
            <View className="flex-row items-center px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ChevronLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl ml-4">Dica da semana</Text>
            </View>

            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Progress Grid Segment */}
                <SectionHeader icon={<BarChart2 size={20} color="#f97316" />} title="Seu progresso" />
                <View className="flex-row flex-wrap gap-4 mb-10">
                    <ProgressBox
                        label="Compliance"
                        value={`${compliance}%`}
                        icon={getStatusIcon(compliance)}
                        labelColor={getLabelColor(compliance)}
                    />
                    <ProgressBox
                        label="Treino"
                        value={`${treino}%`}
                        icon={getStatusIcon(treino)}
                        labelColor={getLabelColor(treino)}
                    />
                    <ProgressBox
                        label="Hidratação"
                        value={`${hidratacao}%`}
                        icon={getStatusIcon(hidratacao)}
                        labelColor={getLabelColor(hidratacao)}
                    />
                    <ProgressBox
                        label="NoFap"
                        value={`${nofapDays} dias`}
                        icon={nofapDays >= 14 ? <CheckCircle2 size={18} color="#22c55e" strokeWidth={3} /> : <AlertTriangle size={18} color="#f97316" />}
                        labelColor={nofapDays < 7 ? 'text-orange-500' : 'text-zinc-700'}
                    />
                </View>

                {/* Focus Segment */}
                {weeklyInsight.focusTitle ? (
                    <>
                        <SectionHeader icon={<Target size={20} color="#f97316" />} title="Foco esta semana" />
                        <View className="bg-zinc-900/50 border border-zinc-900 rounded-3xl p-6 flex-row mb-10 overflow-hidden">
                            <View className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600" />
                            <View className="mr-5 mt-1">
                                <Bell size={24} color="#f97316" fill="#f97316" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-orange-600 font-bold text-lg mb-2">{weeklyInsight.focusTitle}</Text>
                                <Text className="text-zinc-500 text-sm leading-5">
                                    {weeklyInsight.focusDescription}
                                </Text>
                            </View>
                        </View>
                    </>
                ) : null}

                {/* Tactical Segment */}
                {weeklyInsight.tacticalRecommendation ? (
                    <>
                        <SectionHeader icon={<Lightbulb size={20} color="#f97316" />} title="Recomendação tática" />
                        <View className="bg-zinc-900/40 rounded-3xl p-8 flex-row items-center mb-10">
                            <View className="mr-8">
                                <Droplet size={32} color="#f97316" fill="#f97316" />
                            </View>
                            <Text className="text-zinc-400 text-sm flex-1 leading-5">
                                {weeklyInsight.tacticalRecommendation}
                            </Text>
                        </View>
                    </>
                ) : null}

                {/* Book Segment */}
                {weeklyInsight.bookTitle ? (
                    <>
                        <SectionHeader icon={<BookOpen size={20} color="#f97316" />} title="Livro da semana" />
                        <View className="bg-zinc-900/40 rounded-3xl p-8 flex-row items-start mb-6">
                            <View className="mr-6 mt-1">
                                <BookOpen size={28} color="#f97316" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-bold text-lg mb-0.5">{weeklyInsight.bookTitle}</Text>
                                <Text className="text-orange-600 text-sm font-bold mb-4">{weeklyInsight.bookAuthor}</Text>
                                <Text className="text-zinc-500 text-sm italic leading-5">
                                    "{weeklyInsight.bookReason}"
                                </Text>
                            </View>
                        </View>
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

const SectionHeader = ({ icon, title }: { icon: any; title: string }) => (
    <View className="flex-row items-center mb-6">
        {icon}
        <Text className="text-zinc-500 font-bold text-base ml-3 uppercase tracking-wider">{title}</Text>
    </View>
);

const ProgressBox = ({ label, value, icon, labelColor = "text-zinc-700" }: { label: string; value: string; icon?: any; labelColor?: string }) => (
    <View className="bg-zinc-900/50 flex-1 min-w-[45%] border border-zinc-900 rounded-2xl p-5" style={{ minHeight: 100 }}>
        <Text className={`${labelColor} font-bold text-sm mb-4`}>{label}</Text>
        <View className="flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">{value}</Text>
            {icon && icon}
        </View>
    </View>
);
