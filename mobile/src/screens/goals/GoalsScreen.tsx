import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { GoalsTabSelector } from './components/GoalsTabSelector';
import { DailyGoalsView } from './components/DailyGoalsView';
import { AnnualGoalsView } from './components/AnnualGoalsView';
import { MonthlyGoalsView } from './components/MonthlyGoalsView';
import { WeeklyGoalsView } from './components/WeeklyGoalsView';

export const GoalsScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'Anual' | 'Mensal' | 'Semanal' | 'Diário'>('Diário');

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            {/* Header */}
            <View className="flex-row items-center px-4 py-4 mb-2">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2"
                >
                    <ChevronLeft size={24} color="white" />
                </TouchableOpacity>
                <View className="flex-1 items-center mr-8">
                    <Text className="text-white text-xl font-bold">Minhas Metas</Text>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <GoalsTabSelector
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {activeTab === 'Diário' ? (
                    <DailyGoalsView />
                ) : activeTab === 'Anual' ? (
                    <AnnualGoalsView />
                ) : activeTab === 'Mensal' ? (
                    <MonthlyGoalsView />
                ) : activeTab === 'Semanal' ? (
                    <WeeklyGoalsView />
                ) : (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-zinc-500 italic">
                            Visualização {activeTab} em breve...
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};
