import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { historyMock, HistoryItem } from '../../mocks/historyMock';
import { SessionDetailModal } from './components/SessionDetailModal';

export const HistoryScreen = () => {
    const navigation = useNavigation();
    const [selectedSession, setSelectedSession] = useState<HistoryItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSessionPress = (item: HistoryItem) => {
        setSelectedSession(item);
        setModalVisible(true);
    };

    const renderItem = ({ item }: { item: HistoryItem }) => (
        <TouchableOpacity
            onPress={() => handleSessionPress(item)}
            activeOpacity={0.7}
            className="py-6 border-b border-zinc-900/50"
        >
            <Text className={`text-sm font-bold mb-1 ${item.isToday ? 'text-orange-600' : 'text-zinc-600'}`}>
                {item.date}
            </Text>
            <Text className="text-white text-lg font-medium mb-1">
                {item.quote}
            </Text>
            <Text className="text-zinc-700 text-sm font-medium">
                {item.duration}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-xl">Histórico</Text>
                <View className="w-10" />
            </View>

            <View className="flex-1 px-6">
                <Text className="text-zinc-800 font-bold text-sm tracking-widest uppercase mt-8 mb-4">
                    Sessões de memória gravadas
                </Text>

                <FlatList
                    data={historyMock}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            </View>

            <SessionDetailModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                session={selectedSession}
            />
        </SafeAreaView>
    );
};
