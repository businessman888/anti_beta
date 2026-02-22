import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { X, Play, Clock, Calendar } from 'lucide-react-native';
import { HistoryItem } from '../../../mocks/historyMock';

interface SessionDetailModalProps {
    visible: boolean;
    onClose: () => void;
    session: HistoryItem | null;
}

export const SessionDetailModal = ({ visible, onClose, session }: SessionDetailModalProps) => {
    if (!session) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-zinc-950/95">
                <SafeAreaView className="flex-1">
                    <View className="flex-row items-center justify-between px-6 py-4 border-b border-zinc-900">
                        <Text className="text-white font-bold text-xl">Detalhes da Sessão</Text>
                        <TouchableOpacity onPress={onClose} className="p-2 bg-zinc-900 rounded-full">
                            <X size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 px-6 pt-8">
                        <View className="bg-zinc-900/40 border border-zinc-900 rounded-[32px] p-6 mb-8">
                            <View className="flex-row items-center mb-6">
                                <View className="w-12 h-12 bg-orange-600/10 rounded-2xl items-center justify-center mr-4">
                                    <Play size={24} color="#ea580c" />
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-lg">{session.quote}</Text>
                                    <Text className="text-zinc-500 text-sm">Transcrição de áudio</Text>
                                </View>
                            </View>

                            <View className="flex-row space-x-6 border-t border-zinc-800/50 pt-6">
                                <View className="flex-row items-center">
                                    <Calendar size={16} color="#71717a" />
                                    <Text className="text-zinc-400 text-sm ml-2">{session.date}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Clock size={16} color="#71717a" />
                                    <Text className="text-zinc-400 text-sm ml-2">{session.duration}</Text>
                                </View>
                            </View>
                        </View>

                        <Text className="text-zinc-500 font-bold text-xs tracking-widest uppercase mb-4 px-2">
                            Análise do Agente Alpha
                        </Text>
                        <View className="bg-zinc-900/20 border border-zinc-900/50 rounded-2xl p-6 mb-8">
                            <Text className="text-zinc-300 text-base leading-relaxed">
                                Nesta sessão, você expressou uma resistência inicial ("Não tô com vontade").
                                Analisamos seus níveis de dopamina e sugerimos um micro-hábito de 2 minutos para quebrar a inércia.
                                O Agente Alpha identificou que este comportamento é comum em picos de estresse registrados no seu log de biohacking.
                            </Text>
                        </View>

                        <View className="flex-row justify-between mb-8">
                            <View className="bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900">
                                <Text className="text-zinc-600 text-[10px] uppercase font-bold mb-1">Impacto</Text>
                                <Text className="text-orange-500 font-bold">+12% Foco</Text>
                            </View>
                            <View className="bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900">
                                <Text className="text-zinc-600 text-[10px] uppercase font-bold mb-1">Estado</Text>
                                <Text className="text-blue-500 font-bold">Processado</Text>
                            </View>
                            <View className="bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900">
                                <Text className="text-zinc-600 text-[10px] uppercase font-bold mb-1">Tipo</Text>
                                <Text className="text-white font-bold">Voz</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View className="px-6 py-6">
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-orange-600 h-14 rounded-2xl items-center justify-center shadow-lg shadow-orange-600/20"
                        >
                            <Text className="text-white font-bold text-base">Fechar Registro</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};
