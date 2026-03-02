import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ArrowLeft, Share2, ChevronDown, Trophy } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useRankingStore } from '../../store/rankingStore';
import { RankingPodium } from './components/RankingPodium';
import { RankingListItem } from './components/RankingListItem';
import { UserPositionCard } from './components/UserPositionCard';
import { AchievementsCard } from './components/AchievementsCard';

export const MissionsScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'cohort' | 'global'>('cohort');

    const {
        podium,
        list,
        currentUser,
        competitorCount,
        cohortName,
        isLoading,
        fetchCohortRanking,
        fetchGlobalRanking,
    } = useRankingStore();

    useFocusEffect(
        useCallback(() => {
            if (activeTab === 'cohort') {
                fetchCohortRanking();
            } else {
                fetchGlobalRanking();
            }
        }, [activeTab])
    );

    const handleTabChange = (tab: 'cohort' | 'global') => {
        setActiveTab(tab);
    };

    const renderEmptyState = () => (
        <View className="items-center justify-center py-20 px-6">
            <Trophy size={48} color="#3f3f46" />
            <Text className="text-zinc-500 font-bold text-lg mt-4">Ranking em construção</Text>
            <Text className="text-zinc-600 text-sm text-center mt-2 leading-5">
                Continue evoluindo! O ranking será atualizado conforme mais usuários do seu cohort completarem suas metas diárias.
            </Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl">Ranking</Text>
                <TouchableOpacity className="p-2">
                    <Share2 size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View className="flex-row border-b border-zinc-900 px-6">
                <TouchableOpacity
                    onPress={() => handleTabChange('cohort')}
                    className={`flex-1 py-4 items-center ${activeTab === 'cohort' ? 'border-b-2 border-orange-600' : ''}`}
                >
                    <Text className={`font-bold ${activeTab === 'cohort' ? 'text-orange-600' : 'text-zinc-500'}`}>
                        Meu cohort
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabChange('global')}
                    className={`flex-1 py-4 items-center ${activeTab === 'global' ? 'border-b-2 border-orange-600' : ''}`}
                >
                    <Text className={`font-bold ${activeTab === 'global' ? 'text-orange-600' : 'text-zinc-500'}`}>
                        Global
                    </Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#ea580c" />
                    <Text className="text-zinc-500 mt-4 text-sm">Carregando ranking...</Text>
                </View>
            ) : (
                <ScrollView
                    className="flex-1 px-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
                >
                    {competitorCount > 0 ? (
                        <>
                            <Text className="text-zinc-700 text-center text-xs font-bold mb-4 uppercase tracking-widest">
                                {cohortName} - {competitorCount} competidor{competitorCount !== 1 ? 'es' : ''}
                            </Text>

                            {podium.length > 0 && (
                                <RankingPodium competitors={podium} />
                            )}

                            {list.length > 0 && (
                                <View className="mb-8">
                                    {list.map((item) => (
                                        <RankingListItem key={item.id} {...item} />
                                    ))}
                                </View>
                            )}

                            {currentUser && (
                                <UserPositionCard {...currentUser} />
                            )}

                            <AchievementsCard
                                unlocked={0}
                                total={36}
                            />
                        </>
                    ) : (
                        renderEmptyState()
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};
