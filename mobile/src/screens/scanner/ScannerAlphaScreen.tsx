import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Menu, Scan, Camera, ChevronRight, CircleSlash } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface ScanHistoryItem {
    id: string;
    date: string;
    tempBeta: string;
    interesse: string;
}

const scanHistoryMock: ScanHistoryItem[] = [
    {
        id: '1',
        date: 'Hoje, 15:32',
        tempBeta: '7.5',
        interesse: '3/10',
    },
    {
        id: '2',
        date: 'Ontem, 22:10',
        tempBeta: '4.2',
        interesse: '7/10',
    },
];

export const ScannerAlphaScreen = () => {
    const navigation = useNavigation();

    const renderHistoryItem = ({ item }: { item: ScanHistoryItem }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 mb-3 flex-row items-center justify-between"
        >
            <View className="flex-1">
                <Text className="text-orange-600 font-bold text-sm mb-3">{item.date}</Text>
                <View className="flex-row items-center">
                    <View className="mr-6">
                        <Text className="text-zinc-600 text-[10px] font-medium uppercase mb-1">Temp. Beta</Text>
                        <Text className="text-white font-bold text-sm">{item.tempBeta}</Text>
                    </View>
                    <View>
                        <Text className="text-zinc-600 text-[10px] font-medium uppercase mb-1">Interesse</Text>
                        <Text className="text-white font-bold text-sm">{item.interesse}</Text>
                    </View>
                </View>
            </View>
            <ChevronRight size={20} color="#3f3f46" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <View className="w-10" />
                <Text className="text-white font-bold text-xl">Scanner Alpha</Text>
                <TouchableOpacity className="p-2">
                    <Menu size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Usage Info */}
                <View className="items-center mt-6">
                    <Text className="text-zinc-600 text-sm font-medium">
                        Básico: 3/5 análises usadas
                    </Text>
                </View>

                {/* Scan Area Card */}
                <View className="px-6 mt-6">
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className="bg-zinc-900/40 border border-zinc-800 border-dashed rounded-[32px] p-10 items-center justify-center"
                    >
                        <View className="w-16 h-16 bg-orange-600/10 rounded-full items-center justify-center mb-6">
                            <Scan size={32} color="#f97316" />
                        </View>
                        <Text className="text-orange-600 font-bold text-center text-lg mb-2">
                            Analise conversas com o Scan Alpha
                        </Text>
                        <Text className="text-zinc-600 text-center text-sm font-medium">
                            Toque para fazer upload ou tirar foto
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* How it works */}
                <View className="px-8 mt-10">
                    <Text className="text-zinc-500 font-bold text-base mb-6">Como funciona:</Text>

                    <View className="space-y-6">
                        <View className="flex-row items-center mb-4">
                            <View className="w-5 h-5 bg-orange-600/20 rounded-full items-center justify-center mr-4">
                                <View className="w-2 h-2 bg-orange-600 rounded-full" />
                            </View>
                            <Text className="text-white font-medium text-sm">Tire print da conversa</Text>
                        </View>

                        <View className="flex-row items-center mb-4">
                            <View className="w-5 h-5 bg-orange-600/20 rounded-full items-center justify-center mr-4">
                                <View className="w-2 h-2 bg-orange-600 rounded-full" />
                            </View>
                            <Text className="text-white font-medium text-sm">Agente Alpha analisa métricas sociais</Text>
                        </View>

                        <View className="flex-row items-center mb-4">
                            <View className="w-5 h-5 bg-orange-600/20 rounded-full items-center justify-center mr-4">
                                <View className="w-2 h-2 bg-orange-600 rounded-full" />
                            </View>
                            <Text className="text-white font-medium text-sm">Receba análise completa instantânea</Text>
                        </View>
                    </View>
                </View>

                {/* CTA Button */}
                <View className="px-6 mt-10">
                    <TouchableOpacity
                        className="bg-orange-600 h-16 rounded-[20px] flex-row items-center justify-center shadow-lg shadow-orange-600/20"
                    >
                        <Camera size={20} color="white" className="mr-3" />
                        <Text className="text-white font-bold text-base ml-2">ESCANEAR AGORA</Text>
                    </TouchableOpacity>
                </View>

                {/* History Section */}
                <View className="px-6 mt-12 mb-10">
                    <View className="flex-row items-center justify-between mb-6">
                        <Text className="text-white font-bold text-lg">Histórico</Text>
                        <TouchableOpacity>
                            <Text className="text-orange-600 font-bold text-sm">Ver tudo</Text>
                        </TouchableOpacity>
                    </View>

                    {scanHistoryMock.map(item => (
                        <View key={item.id}>
                            {renderHistoryItem({ item })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
