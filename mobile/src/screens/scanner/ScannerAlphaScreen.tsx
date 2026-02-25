import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native';
import { Menu, Scan, Camera, ChevronRight, X, Brain } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { scannerService, ScannerAnalysisResult } from '../../services/scannerService';
import { useAuthStore } from '../../store/authStore';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

interface ScanHistoryItem {
    id: string;
    created_at: string;
    beta_temperature: number;
    interest_score: number;
    frase_padrao: string;
    analise_detalhada: string;
    sugestao_resposta: string;
    image_url: string;
}

export const ScannerAlphaScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<ScanHistoryItem[]>([]);
    const [currentResult, setCurrentResult] = useState<ScannerAnalysisResult | null>(null);
    const [showResultModal, setShowResultModal] = useState(false);

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user]);

    const fetchHistory = async () => {
        if (!user) return;
        try {
            const data = await scannerService.getHistory(user.id);
            setHistory(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleScan = async () => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para escanear');
            return;
        }

        try {
            const image = await scannerService.pickImage();
            if (!image) return;

            setLoading(true);

            // 1. Analyze with AI
            const analysis = await scannerService.analyzeConversation(image.base64, image.type);

            // 2. Upload image
            const publicUrl = await scannerService.uploadImage(image.uri, image.type);

            // 3. Save to database
            await scannerService.saveAnalysis(user.id, publicUrl, analysis);

            setCurrentResult(analysis);
            setShowResultModal(true);
            fetchHistory();
        } catch (error: any) {
            console.error('Scan error:', error);
            Alert.alert('Erro no Scan', error.message || 'Ocorreu um erro ao processar sua imagem');
        } finally {
            setLoading(false);
        }
    };

    const renderHistoryItem = (item: ScanHistoryItem) => {
        const date = dayjs(item.created_at);
        const formattedDate = date.isSame(dayjs(), 'day')
            ? `Hoje, ${date.format('HH:mm')}`
            : date.isSame(dayjs().subtract(1, 'day'), 'day')
                ? `Ontem, ${date.format('HH:mm')}`
                : date.format('DD MMM, HH:mm');

        return (
            <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => {
                    setCurrentResult({
                        temperatura: item.beta_temperature,
                        interesse: item.interest_score,
                        frase_padrao: item.frase_padrao,
                        analise_detalhada: item.analise_detalhada,
                        sugestao_resposta: item.sugestao_resposta
                    });
                    setShowResultModal(true);
                }}
                className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 mb-3 flex-row items-center justify-between"
            >
                <View className="flex-1">
                    <Text className="text-orange-600 font-bold text-sm mb-3 uppercase">{formattedDate}</Text>
                    <View className="flex-row items-center">
                        <View className="mr-6">
                            <Text className="text-zinc-600 text-[10px] font-medium uppercase mb-1">Temp. Beta</Text>
                            <Text className="text-white font-bold text-sm">{item.beta_temperature.toFixed(1)}</Text>
                        </View>
                        <View>
                            <Text className="text-zinc-600 text-[10px] font-medium uppercase mb-1">Interesse</Text>
                            <Text className="text-white font-bold text-sm">{item.interest_score}/10</Text>
                        </View>
                    </View>
                </View>
                <ChevronRight size={20} color="#3f3f46" />
            </TouchableOpacity>
        );
    };

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
                        {history.length}/5 análises usadas
                    </Text>
                </View>

                {/* Scan Area Card */}
                <View className="px-6 mt-6">
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleScan}
                        disabled={loading}
                        className="bg-zinc-900/40 border border-zinc-800 border-dashed rounded-[32px] p-10 items-center justify-center"
                    >
                        <View className="w-16 h-16 bg-orange-600/10 rounded-full items-center justify-center mb-6">
                            {loading ? (
                                <ActivityIndicator color="#f97316" />
                            ) : (
                                <Scan size={32} color="#f97316" />
                            )}
                        </View>
                        <Text className="text-orange-600 font-bold text-center text-lg mb-2">
                            {loading ? 'Analisando Conversa...' : 'Analise conversas com o Scan Alpha'}
                        </Text>
                        <Text className="text-zinc-600 text-center text-sm font-medium">
                            {loading ? 'O Agente Alpha está verificando os métricas...' : 'Toque para fazer upload ou tirar foto'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* How it works */}
                <View className="px-8 mt-10">
                    <Text className="text-zinc-500 font-bold text-base mb-6">Como funciona:</Text>

                    <View>
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
                        onPress={handleScan}
                        disabled={loading}
                        className={`bg-orange-600 h-16 rounded-[20px] flex-row items-center justify-center shadow-lg shadow-orange-600/20 ${loading ? 'opacity-50' : ''}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <Camera size={20} color="white" />
                                <Text className="text-white font-bold text-base ml-3">ESCANEAR AGORA</Text>
                            </>
                        )}
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

                    {history.length > 0 ? (
                        history.map(item => renderHistoryItem(item))
                    ) : (
                        <View className="items-center py-10">
                            <Text className="text-zinc-600 text-sm">Nenhuma análise realizada ainda</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Result Modal */}
            <Modal
                visible={showResultModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowResultModal(false)}
            >
                <View className="flex-1 bg-black/80 justify-end">
                    <View className="bg-zinc-950 border-t border-zinc-800 rounded-t-[40px] p-6 max-h-[90%]">
                        <View className="flex-row items-center justify-between mb-6">
                            <View className="flex-row items-center">
                                <Brain size={24} color="#f97316" />
                                <Text className="text-white font-bold text-xl ml-3">Veredito Alpha</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowResultModal(false)}
                                className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
                            >
                                <X size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {currentResult && (
                                <View>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f97316', marginBottom: 16 }}>
                                        {currentResult.frase_padrao}
                                    </Text>

                                    <View className="bg-zinc-900/50 rounded-3xl p-5 mb-6">
                                        <Text className="text-zinc-400 text-xs font-bold uppercase mb-3">Análise Detalhada</Text>
                                        <Text className="text-zinc-300 text-base leading-6">
                                            {currentResult.analise_detalhada}
                                        </Text>
                                    </View>

                                    <View className="flex-row mb-6">
                                        <View className="flex-1 bg-zinc-900/50 rounded-3xl p-5 mr-3 items-center">
                                            <Text className="text-zinc-400 text-[10px] font-bold uppercase mb-1">Temp. Beta</Text>
                                            <Text className="text-white font-bold text-2xl">{currentResult.temperatura.toFixed(1)}</Text>
                                        </View>
                                        <View className="flex-1 bg-zinc-900/50 rounded-3xl p-5 items-center">
                                            <Text className="text-zinc-400 text-[10px] font-bold uppercase mb-1">Interesse</Text>
                                            <Text className="text-white font-bold text-2xl">{currentResult.interesse}/10</Text>
                                        </View>
                                    </View>

                                    <View className="bg-orange-600/10 border border-orange-600/20 rounded-3xl p-5 mb-8">
                                        <Text className="text-orange-600 text-xs font-bold uppercase mb-3">Próximo Passo (Sugestão)</Text>
                                        <Text className="text-white text-lg font-bold italic">
                                            "{currentResult.sugestao_resposta}"
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => setShowResultModal(false)}
                                        className="bg-zinc-900 h-16 rounded-2xl items-center justify-center mb-10"
                                    >
                                        <Text className="text-white font-bold text-base">ENTENDIDO</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
