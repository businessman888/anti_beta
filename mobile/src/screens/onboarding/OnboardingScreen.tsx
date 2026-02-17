import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import { useQuizStore } from '../../store/quizStore';
import { QuizProgressBar } from '../../components/quiz/QuizProgressBar';
import { QuizInput } from '../../components/quiz/inputs/QuizInput';
import { useAuthStore } from '../../store/authStore';

export const OnboardingScreen = () => {
    const { currentStep, totalSteps, setAnswer, answers, nextStep } = useQuizStore();
    const { signOut } = useAuthStore();
    const [name, setName] = useState(answers.name || '');

    const handleNext = () => {
        if (currentStep === 0 && name.trim().length >= 3) {
            setAnswer('name', name);
            nextStep();
        } else {
            // Handle other steps or validation
            console.log("Validation failed or step not implemented");
        }
    };

    const isStepValid = () => {
        if (currentStep === 0) {
            return name.trim().length >= 3;
        }
        return true; // Temporary for other steps
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <View className="w-full">
                        <Text className="text-white text-3xl font-bold mb-2">
                            Qual é o seu nome
                        </Text>
                        <Text className="text-orange-500 text-3xl font-bold mb-12">
                            completo?
                        </Text>

                        <QuizInput
                            placeholder="Digite seu nome ou codinome..."
                            value={name}
                            onChangeText={setName}
                            autoFocus
                            autoCapitalize="words"
                        />
                    </View>
                );
            default:
                return (
                    <View className="justify-center items-center">
                        <Text className="text-white text-xl">Passo {currentStep + 1} em construção</Text>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 p-6 justify-between">
                        {/* Header & Progress */}
                        <View>
                            <TouchableOpacity
                                onPress={signOut}
                                className="absolute top-0 right-0 z-10 p-2"
                            >
                                <Text className="text-zinc-600 text-xs">Sair (Debug)</Text>
                            </TouchableOpacity>
                            <QuizProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                        </View>

                        {/* Content */}
                        <View className="flex-1 justify-center">
                            {renderStepContent()}
                        </View>

                        {/* Footer / Navigation */}
                        <View className="mb-4">
                            <TouchableOpacity
                                onPress={handleNext}
                                disabled={!isStepValid()}
                                className={`flex-row justify-center items-center py-4 rounded-full ${isStepValid() ? 'bg-zinc-800' : 'bg-zinc-800/50'
                                    }`}
                            >
                                <Text className={`font-bold text-lg mr-2 ${isStepValid() ? 'text-white' : 'text-zinc-500'}`}>
                                    Continuar
                                </Text>
                                <ArrowRight size={20} color={isStepValid() ? '#fff' : '#71717a'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
