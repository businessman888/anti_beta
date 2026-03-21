import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface GoalsTabSelectorProps {
    activeTab: 'Mensal' | 'Semanal' | 'Diário';
    onTabChange: (tab: 'Mensal' | 'Semanal' | 'Diário') => void;
}

export const GoalsTabSelector = ({ activeTab, onTabChange }: GoalsTabSelectorProps) => {
    const tabs: Array<'Mensal' | 'Semanal' | 'Diário'> = ['Mensal', 'Semanal', 'Diário'];

    return (
        <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex-row justify-between mb-8">
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onTabChange(tab)}
                        className={`flex-1 py-3 mx-1 rounded-xl items-center border ${isActive ? 'bg-zinc-950 border-orange-600' : 'bg-transparent border-transparent'
                            }`}
                    >
                        <Text className={`font-bold ${isActive ? 'text-orange-600' : 'text-zinc-500'}`}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
