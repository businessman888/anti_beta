import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, BarChart2, CheckCircle2, AlertTriangle, Target, Bell, Lightbulb, BookOpen, Droplet } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const WeeklyTipScreen = () => {
    const navigation = useNavigation();

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
                    <ProgressBox label="Compliance" value="85%" />
                    <ProgressBox
                        label="Treino"
                        value="100%"
                        icon={<CheckCircle2 size={18} color="#22c55e" strokeWidth={3} />}
                    />
                    <ProgressBox
                        label="Hidratação"
                        labelColor="text-orange-500"
                        value="57%"
                        icon={<AlertTriangle size={18} color="#f97316" />}
                    />
                    <ProgressBox
                        label="Treino"
                        value="14 dias"
                        icon={<CheckCircle2 size={18} color="#22c55e" strokeWidth={3} />}
                    />
                </View>

                {/* Focus Segment */}
                <SectionHeader icon={<Target size={20} color="#f97316" />} title="Foco esta semana" />
                <View className="bg-zinc-900/50 border border-zinc-900 rounded-3xl p-6 flex-row mb-10 overflow-hidden">
                    <View className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600" />
                    <View className="mr-5 mt-1">
                        <Bell size={24} color="#f97316" fill="#f97316" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-orange-600 font-bold text-lg mb-2">Protocolo de emergência</Text>
                        <Text className="text-zinc-500 text-sm leading-5">
                            Sua hidratação está abaixo do protocolo. Configure alarmes a cada 2h para ingestão forçada.
                        </Text>
                    </View>
                </View>

                {/* Tactical Segment */}
                <SectionHeader icon={<Lightbulb size={20} color="#f97316" />} title="Recomendação tática" />
                <View className="bg-zinc-900/40 rounded-3xl p-8 flex-row items-center mb-10">
                    <View className="mr-8">
                        <Droplet size={32} color="#f97316" fill="#f97316" />
                    </View>
                    <Text className="text-zinc-400 text-sm flex-1 leading-5">
                        Deixe uma garrafa de 500ml na sua mesa de trabalho e só permita levantar após finalizá-la.
                    </Text>
                </View>

                {/* Book Segment */}
                <SectionHeader icon={<BookOpen size={20} color="#f97316" />} title="Livro da semana" />
                <View className="bg-zinc-900/40 rounded-3xl p-8 flex-row items-start mb-6">
                    <View className="mr-6 mt-1">
                        <View className="w-8 h-8 items-center justify-center">
                            <View className="w-6 h-1 bg-orange-600 rounded-full rotate-45 absolute" />
                            <View className="w-6 h-1 bg-orange-600 rounded-full -rotate-45 absolute" />
                            {/* Simplified book icon representation for the screenshot effect */}
                            <Text className="text-orange-600 font-black text-2xl">Z</Text>
                        </View>
                    </View>
                    <View className="flex-1">
                        <Text className="text-white font-bold text-lg mb-0.5">Models</Text>
                        <Text className="text-orange-600 text-sm font-bold mb-4">Mark Manson</Text>
                        <Text className="text-zinc-500 text-sm italic leading-5">
                            "Por quê: Seus logs recentes indicam dificuldades em dinâmicas sociais com mulheres."
                        </Text>
                    </View>
                </View>
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
