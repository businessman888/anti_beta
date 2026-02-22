import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { usePlanStore } from '../../store/planStore';
import { Zap, Brain, Target, Dumbbell } from 'lucide-react-native';

const LOADING_MESSAGES = [
    { text: 'Analisando seu perfil...', icon: Brain },
    { text: 'Identificando pontos de melhoria...', icon: Target },
    { text: 'Gerando treinos personalizados...', icon: Dumbbell },
    { text: 'Montando estratégias de mindset...', icon: Brain },
    { text: 'Criando seu plano de transformação...', icon: Zap },
    { text: 'Finalizando seu plano Alpha...', icon: Target },
];

export const PlanLoadingScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { isGenerating, plan, error } = usePlanStore();
    const [messageIndex, setMessageIndex] = useState(0);

    // Pulse animation
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    // Pulse animation loop
    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    // Progress animation
    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: isGenerating ? 0.85 : plan ? 1 : 0,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    }, [isGenerating, plan]);

    // Rotate messages
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Navigate when plan is ready
    useEffect(() => {
        if (!isGenerating && plan) {
            const timer = setTimeout(() => {
                navigation.replace('PlanGenerated');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isGenerating, plan]);

    // Handle error
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                navigation.goBack();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const CurrentIcon = LOADING_MESSAGES[messageIndex].icon;
    const currentMessage = LOADING_MESSAGES[messageIndex].text;

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-1 items-center justify-center px-8">
                {/* Pulsing icon */}
                <Animated.View
                    style={{ transform: [{ scale: pulseAnim }] }}
                    className="mb-12"
                >
                    <View className="w-28 h-28 rounded-full bg-orange-600/20 items-center justify-center">
                        <View className="w-20 h-20 rounded-full bg-orange-600/40 items-center justify-center">
                            <View className="w-14 h-14 rounded-full bg-orange-600 items-center justify-center">
                                <Animated.View style={{ opacity: fadeAnim }}>
                                    <CurrentIcon size={28} color="white" />
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Title */}
                <Text className="text-white text-2xl font-bold text-center mb-3">
                    Preparando seu plano
                </Text>
                <Text className="text-zinc-500 text-base text-center mb-10">
                    Nossa IA está criando um plano{'\n'}personalizado exclusivo para você
                </Text>

                {/* Animated message */}
                <Animated.View style={{ opacity: fadeAnim }} className="mb-10">
                    <Text className="text-orange-500 text-lg font-semibold text-center">
                        {currentMessage}
                    </Text>
                </Animated.View>

                {/* Progress bar */}
                <View className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <Animated.View
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: progressWidth }}
                    />
                </View>

                {/* Error message */}
                {error && (
                    <View className="mt-8 bg-red-900/30 border border-red-800 rounded-2xl p-4">
                        <Text className="text-red-400 text-center text-sm">
                            Erro ao gerar plano: {error}
                        </Text>
                        <Text className="text-zinc-500 text-center text-xs mt-2">
                            Voltando...
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
