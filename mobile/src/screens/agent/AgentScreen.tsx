import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Animated,
    Easing,
    ScrollView,
    Pressable,
} from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { useAgentStore } from '../../store/agentStore';
import { agentService } from '../../services/agentService';

// ── Icon SVGs (inline to avoid external deps) ──
import { ArrowLeft, Minus, Trash2 } from 'lucide-react-native';

export const AgentScreen = () => {
    const navigation = useNavigation();
    const {
        state,
        userText,
        agentText,
        agentAudioUrl,
        audioDuration,
        error,
        messages,
        setState,
        setUserText,
        setAgentResponse,
        setAudioDuration,
        setError,
        addMessage,
        reset,
    } = useAgentStore();

    const recordingRef = useRef<Audio.Recording | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Animations
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;

    // ── Cleanup on unmount ──
    useEffect(() => {
        return () => {
            stopRecording(true);
            stopPlayback();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // ── Pulse Animation for avatar ──
    useEffect(() => {
        if (state === 'PROCESSING' || state === 'RECORDING') {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.08,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            );
            pulse.start();
            return () => pulse.stop();
        } else {
            pulseAnim.setValue(1);
        }
    }, [state]);

    // ── Wave animation for SPEAKING ──
    useEffect(() => {
        if (state === 'SPEAKING') {
            const wave = Animated.loop(
                Animated.timing(waveAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            );
            wave.start();
            return () => wave.stop();
        } else {
            waveAnim.setValue(0);
        }
    }, [state]);

    // ── Audio Recording ──
    const startRecording = useCallback(async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (!permission.granted) {
                Alert.alert(
                    'Permissão Necessária',
                    'O Agente Alpha precisa do microfone pra te ouvir. Ativa lá nas configurações.',
                );
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY,
            );
            recordingRef.current = recording;
            setState('RECORDING');
            setAudioDuration(0);

            // Timer
            timerRef.current = setInterval(() => {
                setAudioDuration(useAgentStore.getState().audioDuration + 1);
            }, 1000);
        } catch (err) {
            console.error('Erro ao iniciar gravação:', err);
            setError('Falha ao acessar microfone.');
        }
    }, []);

    const stopRecording = useCallback(async (discard = false) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        const recording = recordingRef.current;
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
            const uri = recording.getURI();
            recordingRef.current = null;

            if (discard || !uri) {
                reset();
                return;
            }

            // Send to backend
            await sendToBackend(uri);
        } catch (err) {
            console.error('Erro ao parar gravação:', err);
            setError('Falha ao processar gravação.');
        }
    }, []);

    const sendToBackend = useCallback(async (audioUri: string) => {
        setState('SENDING');

        try {
            setState('PROCESSING');
            const result = await agentService.sendVoiceInteraction(audioUri);

            // Add messages to history
            addMessage('user', result.transcribedUserText);
            setUserText(result.transcribedUserText);
            addMessage('agent', result.agentResponseText);
            setAgentResponse(result.agentResponseText, result.agentAudioUrl);

            // Auto-play response
            await playAudio(result.agentAudioUrl);
        } catch (err: any) {
            console.error('Erro na interação:', err);
            const message =
                err?.response?.data?.message ||
                'Falha na conexão com o mentor. Tente novamente.';
            setError(message);
            Alert.alert('Erro', message);
        }
    }, []);

    // ── Audio Playback ──
    const playAudio = useCallback(async (url: string) => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
            });

            const { sound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true },
            );
            soundRef.current = sound;

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setState('IDLE');
                    sound.unloadAsync();
                    soundRef.current = null;
                }
            });
        } catch (err) {
            console.error('Erro ao reproduzir áudio:', err);
            setState('IDLE');
        }
    }, []);

    const stopPlayback = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
        }
    }, []);

    // ── Format time ──
    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // ── Render Waveform bars ──
    const renderWaveform = (color: string, count = 20) => {
        const bars = Array.from({ length: count }, (_, i) => {
            const height = 8 + Math.random() * 24;
            return (
                <View
                    key={i}
                    style={{
                        width: 3,
                        height,
                        backgroundColor: color,
                        borderRadius: 2,
                        marginHorizontal: 1.5,
                    }}
                />
            );
        });
        return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>{bars}</View>;
    };

    // ═══════════════════════════════════
    // ══════════  RENDER  ══════════════
    // ═══════════════════════════════════
    return (
        <View className="flex-1 bg-[#09090b]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-14 pb-4">
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Agente Alpha</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Minus size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Messages ── */}
                {messages.length > 0 && (
                    <View className="mb-6">
                        {messages.map((msg, idx) => (
                            <View
                                key={idx}
                                className={`mb-3 p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-zinc-800/60 border border-zinc-700/50'
                                        : 'bg-zinc-800/80 border border-orange-500/30'
                                    }`}
                            >
                                <Text className="text-zinc-300 text-sm leading-5">
                                    {msg.role === 'user' ? `Você: "${msg.text}"` : `"${msg.text}"`}
                                </Text>
                                <Text className="text-zinc-500 text-xs mt-1 text-right">
                                    {msg.timestamp}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* ── Audio Waveform (SPEAKING) ── */}
                {state === 'SPEAKING' && (
                    <View className="mb-4 flex-row items-center bg-zinc-800/60 rounded-full px-4 py-3">
                        <TouchableOpacity
                            onPress={() => {
                                stopPlayback();
                                setState('IDLE');
                            }}
                            className="mr-3"
                        >
                            <View className="w-8 h-8 bg-zinc-700 rounded-full items-center justify-center">
                                <Text className="text-white text-xs">⏸</Text>
                            </View>
                        </TouchableOpacity>
                        <View className="flex-1">
                            {renderWaveform('#f97316', 25)}
                        </View>
                    </View>
                )}

                {/* ── Avatar ── */}
                <View className="items-center mb-6">
                    <Animated.View
                        style={{
                            transform: [{ scale: pulseAnim }],
                            shadowColor: '#f97316',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: state === 'PROCESSING' ? 0.6 : 0.3,
                            shadowRadius: state === 'PROCESSING' ? 20 : 10,
                            elevation: 10,
                        }}
                    >
                        <View className="w-44 h-44 rounded-full bg-gradient-to-b items-center justify-center overflow-hidden border-2 border-orange-500/50">
                            {/* Gradient background */}
                            <View className="absolute inset-0 bg-orange-500 rounded-full" />
                            <View className="absolute inset-0 bg-gradient-to-t from-red-600 to-orange-400 rounded-full opacity-80" />
                            {/* Logo placeholder */}
                            <Text className="text-white text-5xl font-black z-10">α</Text>
                        </View>
                    </Animated.View>
                </View>

                {/* ── Status Text ── */}
                <View className="items-center mb-6">
                    {state === 'IDLE' && !error && messages.length === 0 && (
                        <Text className="text-zinc-500 text-base">Segure para falar</Text>
                    )}
                    {state === 'IDLE' && !error && messages.length > 0 && (
                        <Text className="text-zinc-500 text-base">Segure para falar</Text>
                    )}
                    {state === 'RECORDING' && (
                        <>
                            <Text className="text-orange-500 text-4xl font-bold mb-2">
                                {formatDuration(audioDuration)}
                            </Text>
                            <Text className="text-orange-500 text-base">Solte para enviar</Text>
                        </>
                    )}
                    {state === 'SENDING' && (
                        <>
                            <View className="flex-row items-center mb-1">
                                <View className="w-2 h-2 bg-orange-500 rounded-full mr-1" />
                                <View className="w-2 h-2 bg-orange-500 rounded-full mr-1 opacity-60" />
                                <View className="w-2 h-2 bg-orange-500 rounded-full opacity-30" />
                            </View>
                            <Text className="text-orange-500 text-base">Enviando...</Text>
                        </>
                    )}
                    {state === 'PROCESSING' && (
                        <>
                            <View className="flex-row items-center mb-1">
                                <View className="w-2 h-2 bg-orange-500 rounded-full mr-1" />
                                <View className="w-2 h-2 bg-orange-500 rounded-full mr-1 opacity-60" />
                                <View className="w-2 h-2 bg-orange-500 rounded-full opacity-30" />
                            </View>
                            <Text className="text-orange-500 text-base">Analisando...</Text>
                        </>
                    )}
                    {state === 'SPEAKING' && (
                        <Text className="text-orange-500 text-base">Ouvindo resposta...</Text>
                    )}
                    {error && (
                        <Text className="text-red-500 text-sm text-center px-6">
                            {error}
                        </Text>
                    )}
                </View>
            </ScrollView>

            {/* ── Bottom Controls ── */}
            <View className="pb-8 pt-4 px-5 items-center">
                {/* Mic Button (Long Press) */}
                <Pressable
                    onPressIn={() => {
                        if (state === 'IDLE') startRecording();
                    }}
                    onPressOut={() => {
                        if (state === 'RECORDING') stopRecording(false);
                    }}
                    disabled={state !== 'IDLE' && state !== 'RECORDING'}
                    style={({ pressed }) => ({
                        opacity:
                            state !== 'IDLE' && state !== 'RECORDING'
                                ? 0.4
                                : pressed
                                    ? 0.8
                                    : 1,
                    })}
                >
                    <View
                        className={`w-16 h-16 rounded-full items-center justify-center ${state === 'RECORDING'
                                ? 'border-2 border-orange-500 bg-zinc-900'
                                : 'bg-zinc-800 border border-zinc-700'
                            }`}
                    >
                        {/* Waveform icon */}
                        <View className="flex-row items-center" style={{ gap: 2 }}>
                            {[12, 18, 24, 18, 12].map((h, i) => (
                                <View
                                    key={i}
                                    style={{
                                        width: 3,
                                        height: h,
                                        backgroundColor:
                                            state === 'RECORDING' ? '#f97316' : '#71717a',
                                        borderRadius: 2,
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </Pressable>

                {/* Trash button while recording */}
                {state === 'RECORDING' && (
                    <TouchableOpacity
                        onPress={() => stopRecording(true)}
                        className="mt-4"
                        activeOpacity={0.7}
                    >
                        <View className="w-12 h-12 rounded-full bg-zinc-800/60 items-center justify-center border border-zinc-700/40">
                            <Trash2 size={20} color="#71717a" />
                        </View>
                    </TouchableOpacity>
                )}

                {/* Usage bar */}
                <View className="flex-row items-center mt-5 w-full">
                    <View className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden mr-3">
                        <View className="h-full bg-orange-500 rounded-full" style={{ width: '70%' }} />
                    </View>
                    <Text className="text-zinc-500 text-xs">
                        Básico: 7/10 conversas usadas
                    </Text>
                </View>
            </View>
        </View>
    );
};
