import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Share2, ChevronDown } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { rankingMockData } from '../../mocks/rankingMock';
import { RankingPodium } from './components/RankingPodium';
import { RankingListItem } from './components/RankingListItem';
import { UserPositionCard } from './components/UserPositionCard';
import { AchievementsCard } from './components/AchievementsCard';

export const MissionsScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'cohort' | 'global'>('cohort');

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
                    onPress={() => setActiveTab('cohort')}
                    className={`flex-1 py-4 items-center ${activeTab === 'cohort' ? 'border-b-2 border-orange-600' : ''}`}
                >
                    <Text className={`font-bold ${activeTab === 'cohort' ? 'text-orange-600' : 'text-zinc-500'}`}>
                        Meu cohort
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('global')}
                    className={`flex-1 py-4 items-center ${activeTab === 'global' ? 'border-b-2 border-orange-600' : ''}`}
                >
                    <Text className={`font-bold ${activeTab === 'global' ? 'text-orange-600' : 'text-zinc-500'}`}>
                        Global
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
            >
                <Text className="text-zinc-700 text-center text-xs font-bold mb-4 uppercase tracking-widest">
                    {rankingMockData.cohort} - {rankingMockData.competitorCount} competidores
                </Text>

                <RankingPodium competitors={rankingMockData.podium} />

                <View className="mb-8">
                    {rankingMockData.list.map((item) => (
                        <RankingListItem key={item.id} {...item} />
                    ))}

                    <TouchableOpacity className="flex-row items-center justify-center py-4 mt-2">
                        <Text className="text-orange-600 font-bold text-sm mr-2">Ver mais</Text>
                        <ChevronDown size={16} color="#f97316" />
                    </TouchableOpacity>
                </View>

                <UserPositionCard {...rankingMockData.currentUser} />

                <AchievementsCard
                    unlocked={rankingMockData.currentUser.achievements.unlocked}
                    total={rankingMockData.currentUser.achievements.total}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
