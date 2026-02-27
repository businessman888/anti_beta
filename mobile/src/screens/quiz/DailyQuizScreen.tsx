import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { ArrowLeft, Check, FastForward } from 'lucide-react-native';
import { QuizProgressBar } from '../../components/quiz/QuizProgressBar';
import { QuizOptionSelection } from '../../components/quiz/inputs/QuizOptionSelection';
import { QuizTimeSlider } from '../../components/quiz/inputs/QuizTimeSlider';
import { useProgressStore } from '../../store/progressStore';

export const DailyQuizScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { submitDailyQuiz } = useProgressStore();

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 5;

    // Quiz State
    const [relapsed, setRelapsed] = useState<boolean | null>(null);
    const [sleepHours, setSleepHours] = useState<number>(7.0);
    const [socialMediaTime, setSocialMediaTime] = useState('');
    const [usedVices, setUsedVices] = useState<boolean | null>(null);
    const [didPractices, setDidPractices] = useState<boolean | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Submit
            setIsSubmitting(true);
            await submitDailyQuiz({
                relapsed,
                sleepHours,
                socialMediaTime,
                usedVices,
                didPractices
            });
            setIsSubmitting(false);
            navigation.goBack();
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
        if (currentStep === 0) return relapsed !== null;
        if (currentStep === 1) return true;
        if (currentStep === 2) return socialMediaTime !== '';
        if (currentStep === 3) return usedVices !== null;
        if (currentStep === 4) return didPractices !== null;
        return true;
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                const relapseOptions = [
                    { id: 'true', label: 'Sim, infelizmente.' },
                    { id: 'false', label: 'Não! Fiquei limpo.' }
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-3xl font-bold mb-2 text-center">
                            Você assistiu pornografia ou se <Text className="text-orange-500">masturbou</Text> hoje?
                        </Text>
                        <QuizOptionSelection
                            options={relapseOptions as any}
                            selectedId={relapsed === null ? '' : relapsed.toString()}
                            onSelect={(val) => setRelapsed(val === 'true')}
                        />
                    </View>
                );
            case 1:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-12">
                            Quantas horas você{'\n'}
                            <Text className="text-orange-500">dormiu</Text> na última noite?
                        </Text>
                        <QuizTimeSlider
                            value={sleepHours}
                            onChange={setSleepHours}
                            minimumValue={3}
                            maximumValue={12}
                            step={0.5}
                        />
                    </View>
                );
            case 2:
                const socialMediaOptions = [
                    { id: 'menos_1h', label: 'Menos de 1 hora' },
                    { id: '1_2h', label: '1-2 horas' },
                    { id: '3_4h', label: '3-4 horas' },
                    { id: 'mais_4h', label: 'Mais de 4 horas' },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Qual tempo de uso das <Text className="text-orange-500">redes sociais</Text> hoje?
                        </Text>
                        <QuizOptionSelection
                            options={socialMediaOptions as any}
                            selectedId={socialMediaTime}
                            onSelect={setSocialMediaTime}
                        />
                    </View>
                );
            case 3:
                const vicesOptions = [
                    { id: 'true', label: 'Sim, utilizei.' },
                    { id: 'false', label: 'Zero vícios hoje.' }
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-3xl font-bold mb-2 text-center">
                            Fez uso de alguma <Text className="text-orange-500">substância</Text> ou vício hoje?
                        </Text>
                        <QuizOptionSelection
                            options={vicesOptions as any}
                            selectedId={usedVices === null ? '' : usedVices.toString()}
                            onSelect={(val) => setUsedVices(val === 'true')}
                        />
                    </View>
                );
            case 4:
                const practicesOptions = [
                    { id: 'true', label: 'Sim, completei.' },
                    { id: 'false', label: 'Ainda não.' }
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-3xl font-bold mb-2 text-center">
                            Você realizou suas <Text className="text-orange-500">práticas de biohacking</Text> e meditação hoje?
                        </Text>
                        <QuizOptionSelection
                            options={practicesOptions as any}
                            selectedId={didPractices === null ? '' : didPractices.toString()}
                            onSelect={(val) => setDidPractices(val === 'true')}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

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
                {renderStepContent()}
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
