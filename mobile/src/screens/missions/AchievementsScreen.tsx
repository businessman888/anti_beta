import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ArrowLeft, Lock } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAchievementsStore, Achievement } from '../../store/achievementsStore';
import { getAchievementIcon } from '../../constants/achievements';

export const AchievementsScreen = () => {
    const navigation = useNavigation();
    
    const { 
        allAchievements, 
        unlockedAchievementIds, 
        stats, 
        isLoading, 
        fetchAchievements 
    } = useAchievementsStore();

    // Use focus effect so if they unlock one and come back, it updates
    useFocusEffect(
        React.useCallback(() => {
            fetchAchievements();
        }, [])
    );

    // Group achievements by category
    const groupedAchievements = useMemo(() => {
        const groups: Record<string, Achievement[]> = {
            'FORÇA E TREINO': [],
            'DISCIPLINA DE ELITE': [],
            'DOMÍNIO DA COMUNIDADE': []
        };
        
        allAchievements.forEach(ach => {
            // Normalize categories to match the aggressive titling
            let cat = ach.categoria.toUpperCase();
            if (cat.includes('TREINO')) cat = 'FORÇA E TREINO';
            else if (cat.includes('DISCIPLINA')) cat = 'DISCIPLINA DE ELITE';
            else if (cat.includes('COMUNIDADE') || cat.includes('SOCIAL')) cat = 'DOMÍNIO DA COMUNIDADE';
            
            if (groups[cat]) {
                groups[cat].push(ach);
            } else {
                // Fallback for unknown categories
                groups[cat] = [ach];
            }
        });
        
        return groups;
    }, [allAchievements]);

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl">Conquistas</Text>
                <View className="w-10" />
            </View>

            {isLoading && allAchievements.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#ea580c" />
                    <Text className="text-zinc-500 mt-4 text-sm">Carregando conquistas...</Text>
                </View>
            ) : (
                <ScrollView
                    className="flex-1 px-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    <View className="py-6">
                        <View className="flex-row justify-between items-end mb-4">
                            <Text className="text-zinc-600 text-sm font-medium">
                                {stats.unlocked} de {stats.total} badges desbloqueados
                            </Text>
                            <Text className="text-orange-600 text-xl font-bold">{stats.percentage}%</Text>
                        </View>
                        <View className="h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                            <View
                                className="h-full bg-orange-600 rounded-full"
                                style={{ width: `${stats.percentage}%` }}
                            />
                        </View>
                    </View>

                    <View className="mt-6">
                        {Object.entries(groupedAchievements).map(([category, achievements]) => {
                            if (achievements.length === 0) return null;
                            
                            return (
                                <CategorySection key={category} title={category}>
                                    <View className="flex-row flex-wrap" style={{ marginHorizontal: -6, gap: 12 }}>
                                        {achievements.map((ach) => (
                                            <AchievementCard
                                                key={ach.id}
                                                title={ach.nome}
                                                subtitle={ach.descricao} // Using description or perhaps another field in the future
                                                icon_key={ach.icon_key}
                                                unlocked={unlockedAchievementIds.includes(ach.id)}
                                            />
                                        ))}
                                    </View>
                                </CategorySection>
                            );
                        })}
                        
                        {allAchievements.length === 0 && !isLoading && (
                            <View className="items-center justify-center py-10">
                                <Text className="text-zinc-500">Nenhuma conquista cadastrada no sistema.</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const CategorySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-10">
        <Text className="text-white font-black text-lg mb-6 tracking-widest">{title}</Text>
        {children}
    </View>
);

const AchievementCard = ({
    icon_key,
    title,
    subtitle,
    unlocked = false,
}: {
    icon_key: string;
    title: string;
    subtitle: string;
    unlocked?: boolean;
}) => (
    <View style={{ width: '31%', marginBottom: 16 }}>
        <View className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-3 items-center justify-start flex-1 ${!unlocked ? 'opacity-30' : ''}`} style={{ minHeight: 125 }}>
            {!unlocked && (
                <View className="absolute top-2 right-2 opacity-80">
                    <Lock size={12} color="#a1a1aa" />
                </View>
            )}
            
            <View className={`mb-3 mt-1 ${!unlocked ? 'grayscale' : ''}`}>
                {getAchievementIcon(icon_key, 28, unlocked ? '#ea580c' : '#71717a')}
            </View>
            
            <Text 
                className={`font-bold text-xs text-center mb-1 leading-tight ${unlocked ? 'text-zinc-100' : 'text-zinc-500'}`}
                numberOfLines={2}
            >
                {title}
            </Text>
            
            <Text 
                className={`text-[9px] font-medium text-center leading-[11px] ${unlocked ? 'text-zinc-500' : 'text-zinc-700'}`}
                numberOfLines={3}
            >
                {subtitle}
            </Text>
        </View>
    </View>
);
