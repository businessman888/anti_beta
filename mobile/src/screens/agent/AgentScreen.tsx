import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAgentStore } from '../../store/agentStore';
import { agentService } from '../../services/agentService';
import { ArrowLeft, Minus, Send } from 'lucide-react-native';

export const AgentScreen = () => {
    const navigation = useNavigation();
    const {
        state,
        messages,
        error,
        setState,
        setError,
        addMessage,
        setAgentResponse,
    } = useAgentStore();

    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages, state]);

    const handleSend = async () => {
        const textToSend = inputText.trim();
        if (!textToSend || state !== 'IDLE') return;

        setInputText('');
        Keyboard.dismiss();

        try {
            setState('SENDING');
            addMessage('user', textToSend);

            setState('TYPING');
            const result = await agentService.sendChatInteraction(textToSend);

            addMessage('agent', result.agentResponseText);
            setAgentResponse(result.agentResponseText);
        } catch (err: any) {
            console.error('Erro na interação:', err);
            const message = err?.response?.data?.message || 'Falha na conexão com o mentor. Tente novamente.';
            setError(message);
            Alert.alert('Erro', message);
            setState('IDLE');
        }
    };

    const renderMessage = ({ item }: { item: any }) => {
        const isUser = item.role === 'user';
        return (
            <View className={`mb-3 p-4 rounded-2xl max-w-[85%] ${isUser
                    ? 'bg-zinc-800/60 border border-zinc-700/50 self-end rounded-br-sm'
                    : 'bg-zinc-800/80 border border-orange-500/30 self-start rounded-bl-sm'
                }`}>
                {!isUser && (
                    <Text className="text-orange-500 text-xs font-bold mb-1">Coach Alpha</Text>
                )}
                <Text className="text-zinc-200 text-sm leading-5">
                    {item.text}
                </Text>
                <Text className="text-zinc-500 text-[10px] mt-1 text-right">
                    {item.timestamp}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="bg-[#09090b]"
        >
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-[#09090b] z-10 border-b border-zinc-900">
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="p-2 -ml-2">
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-orange-500/30">
                        <Image
                            source={require('../../../icons/Group 14.png')}
                            style={{ width: 32, height: 32 }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-white text-lg font-bold">Agente Alpha</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} className="p-2 -mr-2">
                    <Minus size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Chat List */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center mt-20">
                        <Image
                            source={require('../../../icons/Group 14.png')}
                            style={{ width: 120, height: 120, borderRadius: 60, opacity: 0.8, marginBottom: 20 }}
                            resizeMode="contain"
                        />
                        <Text className="text-zinc-400 text-base font-medium mb-2 text-center">Inicie seu alinhamento</Text>
                        <Text className="text-zinc-600 text-sm text-center max-w-[280px]">
                            Seja direto. O Coach Alpha vai analisar seus resultados reais e te mandar a real, sem filtro.
                        </Text>
                    </View>
                }
                ListFooterComponent={
                    (state === 'TYPING' || state === 'SENDING') ? (
                        <View className="self-start bg-zinc-800/80 border border-orange-500/30 p-4 rounded-2xl rounded-bl-sm mt-2 mb-4">
                            <View className="flex-row items-center">
                                <ActivityIndicator size="small" color="#f97316" />
                                <Text className="text-orange-500 text-xs ml-2">
                                    {state === 'TYPING' ? 'Analisando e digitando...' : 'Enviando...'}
                                </Text>
                            </View>
                        </View>
                    ) : null
                }
            />

            {/* Input Area */}
            <View className="px-5 py-4 bg-[#09090b] border-t border-zinc-900">
                {error && (
                    <Text className="text-red-500 text-xs text-center mb-2">{error}</Text>
                )}

                <View className="flex-row items-end">
                    <View className="flex-1 min-h-[50px] max-h-[120px] bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 mr-3 flex-row items-center">
                        <TextInput
                            className="flex-1 text-white text-sm"
                            placeholder="Sua mensagem para o Mentor..."
                            placeholderTextColor="#71717a"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            maxLength={500}
                            editable={state === 'IDLE'}
                            style={{ textAlignVertical: 'center', paddingTop: 0, paddingBottom: 0 }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSend}
                        disabled={state !== 'IDLE' || !inputText.trim()}
                        className={`w-[50px] h-[50px] rounded-full items-center justify-center ${state === 'IDLE' && inputText.trim()
                                ? 'bg-orange-500'
                                : 'bg-zinc-800'
                            }`}
                        activeOpacity={0.7}
                    >
                        {state === 'IDLE' ? (
                            <Send size={20} color={inputText.trim() ? '#fff' : '#71717a'} />
                        ) : (
                            <ActivityIndicator size="small" color="#fff" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Usage bar */}
                <View className="flex-row items-center mt-4 w-full justify-center">
                    <View className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden mr-3">
                        <View className="h-full bg-orange-500 rounded-full" style={{ width: '70%' }} />
                    </View>
                    <Text className="text-zinc-600 text-[10px]">
                        Básico: 7/10 interações usadas
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};
