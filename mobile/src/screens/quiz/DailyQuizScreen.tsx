import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { ArrowLeft, Check, FastForward } from 'lucide-react-native';
import { QuizProgressBar } from '../../components/quiz/QuizProgressBar';
import { QuizOptionSelection } from '../../components/quiz/inputs/QuizOptionSelection';
import { useProgressStore, QuizAnswer } from '../../store/progressStore';

export const DailyQuizScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { submitDailyQuiz, quizQuestions, fetchQuizQuestions, isLoading: storeLoading } = useProgressStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const loadQuestions = async () => {
            if (quizQuestions.length === 0) {
                await fetchQuizQuestions();
            }
            setInitialLoading(false);
        };
        loadQuestions();
    }, []);

    const totalSteps = quizQuestions.length;
    const currentQuestion = quizQuestions[currentStep];

    const updateAnswer = (questionId: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value === 'true' }));
    };

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsSubmitting(true);

            const formattedAnswers: QuizAnswer[] = Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer
            }));

            const result = await submitDailyQuiz(formattedAnswers);
            setIsSubmitting(false);

            if (result.success) {
                navigation.goBack();
            } else {
                Alert.alert("Erro", result.error || "Não foi possível salvar as respostas do quiz.");
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            navigation.goBack();
        }
    };

    const isStepValid = () => {
        if (!currentQuestion) return false;
        return answers[currentQuestion.id] !== undefined;
    };

    const yesNoOptions = [
        { id: 'true', label: 'Sim' },
        { id: 'false', label: 'Não' }
    ];

    if (initialLoading || storeLoading && quizQuestions.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center">
                <ActivityIndicator size="large" color="#ea580c" />
                <Text className="text-zinc-500 mt-4">Carregando perguntas Alfa...</Text>
            </SafeAreaView>
        );
    }

    if (totalSteps === 0) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950 p-6 justify-center items-center">
                <Text className="text-white text-xl text-center">Nenhuma pergunta encontrada no banco de dados.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} className="mt-8 bg-zinc-800 px-6 py-3 rounded-xl">
                    <Text className="text-white font-bold">Voltar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const currentAnswerValue = answers[currentQuestion.id] !== undefined ? answers[currentQuestion.id].toString() : '';

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
                <TouchableOpacity onPress={handleBack} className="p-2 -ml-2">
                    <ArrowLeft size={24} color="#f5f5f5" />
                </TouchableOpacity>
                <View className="flex-1 px-4">
                    <QuizProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} />
                </View>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 120 }}>
                <View className="w-full px-4">
                    <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">
                        {currentQuestion.category}
                    </Text>

                    {/* Highlight keywords in orange dynamically or just display normally - we will just display text, maybe highlight the first substantive but let's just make it bold white */}
                    <Text className="text-white text-3xl font-bold mb-8 text-center leading-tight">
                        {currentQuestion.question_text}
                    </Text>

                    <QuizOptionSelection
                        options={yesNoOptions}
                        selectedId={currentAnswerValue}
                        onSelect={(val) => updateAnswer(currentQuestion.id, val)}
                    />
                </View>
            </ScrollView>

            <View className="absolute bottom-0 w-full p-6 bg-zinc-950/90 pb-10">
                <TouchableOpacity
                    onPress={handleNext}
                    disabled={!isStepValid() || isSubmitting}
                    className={`w-full h-14 rounded-2xl flex-row items-center justify-center ${isStepValid() && !isSubmitting ? 'bg-orange-600' : 'bg-zinc-800'
                        }`}
                >
                    <Text className={`font-bold text-lg mr-2 ${isStepValid() && !isSubmitting ? 'text-white' : 'text-zinc-500'
                        }`}>
                        {currentStep === totalSteps - 1 ? (isSubmitting ? 'Salvando...' : 'Finalizar') : 'Continuar'}
                    </Text>
                    {currentStep === totalSteps - 1 ? (
                        <Check size={20} color={isStepValid() && !isSubmitting ? "white" : "#71717a"} strokeWidth={3} />
                    ) : (
                        <FastForward size={20} color={isStepValid() && !isSubmitting ? "white" : "#71717a"} strokeWidth={3} />
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
