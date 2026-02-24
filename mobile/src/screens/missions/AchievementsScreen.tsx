import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Dumbbell, Flame, Calendar, Lock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const AchievementsScreen = () => {
    const navigation = useNavigation();
    const unlocked = 8;
    const total = 36;
    const percentage = Math.round((unlocked / total) * 100);

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl">Conquistas</Text>
                <View className="w-10" />
            </View>

            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <View className="py-6">
                    <View className="flex-row justify-between items-end mb-4">
                        <Text className="text-zinc-600 text-sm font-medium">{unlocked} de {total} badges desbloqueados</Text>
                        <Text className="text-orange-600 text-xl font-bold">{percentage}%</Text>
                    </View>
                    <View className="h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                        <View
                            className="h-full bg-orange-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                        />
                    </View>
                </View>

                <View className="mt-6">
                    <CategorySection title="Treino">
                        <View className="flex-row gap-4 mb-4">
                            <AchievementCard icon={<Dumbbell size={32} color="#f97316" />} title="Alpha I" subtitle="iniciante" unlocked />
                            <AchievementCard icon={<Flame size={32} color="#f97316" />} title="10 Dias" subtitle="Sequência" unlocked />
                        </View>
                        <View className="flex-row gap-4">
                            <AchievementCard
                                title="Resistência"
                                subtitle="Bloqueado"
                            />
                            <AchievementCard
                                title="Peso Pesado"
                                subtitle="Bloqueado"
                            />
                        </View>
                    </CategorySection>

                    <CategorySection title="Disciplina">
                        <View className="flex-row gap-4 mb-4">
                            <AchievementCard
                                icon={<Calendar size={32} color="#f97316" />}
                                title="Consistente"
                                subtitle="30 Dias"
                                unlocked
                                fullWidth
                            />
                        </View>
                        <View className="flex-row gap-4">
                            <AchievementCard
                                title="Nutrição"
                                subtitle="Bloqueado"
                            />
                            <AchievementCard
                                title="Sono Zen"
                                subtitle="Bloqueado"
                            />
                        </View>
                    </CategorySection>

                    <CategorySection title="Social">
                        <AchievementCard
                            title="Comunidade"
                            subtitle="Bloqueado"
                            fullWidth
                        />
                    </CategorySection>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const CategorySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-10"><Text className="text-zinc-500 font-bold text-lg mb-6">{title}</Text>{children}</View>
);

const AchievementCard = ({
    icon,
    title,
    subtitle,
    unlocked = false,
    fullWidth = false
}: {
    icon?: React.ReactNode;
    title: string;
    subtitle: string;
    unlocked?: boolean;
    fullWidth?: boolean;
}) => (
    <View className={`bg-zinc-900/50 border border-zinc-900 rounded-[32px] p-8 items-center justify-center ${fullWidth ? 'w-full' : 'flex-1'}`} style={{ minHeight: 180 }}><View className="mb-6">{unlocked ? icon : <Lock size={32} color="#3f3f46" />}</View><Text className={`font-bold text-lg text-center mb-1 ${unlocked ? 'text-white' : 'text-zinc-600'}`}>{title}</Text><Text className={`text-sm font-medium text-center ${unlocked ? 'text-zinc-500' : 'text-zinc-800'}`}>{subtitle}</Text></View>
);
