import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { ArrowLeft, Check, FastForward } from 'lucide-react-native';
import { QuizProgressBar } from '../../components/quiz/QuizProgressBar';
import { QuizOptionSelection } from '../../components/quiz/inputs/QuizOptionSelection';
import { useProgressStore } from '../../store/progressStore';

export const DailyQuizScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { submitDailyQuiz } = useProgressStore();

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 13;

    const [answers, setAnswers] = useState<any>({
        pornography: null,
        masturbation: null,
        socialMedia: null,
        videogames: null,
        alcohol: null,
        alcoholDrinks: null,
        cigarette: null,
        maconha: null,
        drugs: null,
        sleep: null,
        hydration: null,
        diet: null,
        workout: null,
        practices: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateAnswer = (key: string, value: any) => {
        setAnswers((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsSubmitting(true);

            // Format workout before sending
            const finalWorkout = answers.workout === 'not_applicable' ? null : answers.workout === 'true';

            await submitDailyQuiz({
                pornography: answers.pornography === 'true',
                masturbation: answers.masturbation === 'true',
                socialMedia: answers.socialMedia === 'true',
                videogames: answers.videogames === 'true',
                alcohol: answers.alcohol === 'true',
                alcoholDrinks: answers.alcoholDrinks,
                cigarette: answers.cigarette === 'true',
                maconha: answers.maconha === 'true',
                drugs: answers.drugs === 'true',
                sleep: answers.sleep === 'true',
                hydration: answers.hydration === 'true',
                diet: answers.diet === 'true',
                workout: finalWorkout,
                practices: answers.practices === 'true',
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
        switch (currentStep) {
            case 0: return answers.pornography !== null;
            case 1: return answers.masturbation !== null;
            case 2: return answers.socialMedia !== null;
            case 3: return answers.videogames !== null;
            case 4:
                if (answers.alcohol === 'true') return answers.alcoholDrinks !== null;
                return answers.alcohol !== null;
            case 5: return answers.cigarette !== null;
            case 6: return answers.maconha !== null;
            case 7: return answers.drugs !== null;
            case 8: return answers.sleep !== null;
            case 9: return answers.hydration !== null;
            case 10: return answers.diet !== null;
            case 11: return answers.workout !== null;
            case 12: return answers.practices !== null;
            default: return true;
        }
    };

    const yesNoOptions = [
        { id: 'true', label: 'Sim' },
        { id: 'false', label: 'Não' }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Vícios Comportamentais</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você consumiu <Text className="text-orange-500">pornografia</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.pornography} onSelect={(val) => updateAnswer('pornography', val)} />
                    </View>
                );
            case 1:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Vícios Comportamentais</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você se <Text className="text-orange-500">masturbou</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.masturbation} onSelect={(val) => updateAnswer('masturbation', val)} />
                    </View>
                );
            case 2:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Vícios Comportamentais</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você passou mais de 2h em <Text className="text-orange-500">redes sociais</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.socialMedia} onSelect={(val) => updateAnswer('socialMedia', val)} />
                    </View>
                );
            case 3:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Vícios Comportamentais</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você jogou <Text className="text-orange-500">videogame</Text> por mais de 2h hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.videogames} onSelect={(val) => updateAnswer('videogames', val)} />
                    </View>
                );
            case 4:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Substâncias</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você bebeu <Text className="text-orange-500">álcool</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.alcohol} onSelect={(val) => updateAnswer('alcohol', val)} />

                        {answers.alcohol === 'true' && (
                            <View className="mt-8 border-t border-zinc-900 pt-8">
                                <Text className="text-zinc-400 text-lg font-medium text-center mb-6">Quantas doses?</Text>
                                <QuizOptionSelection
                                    options={[
                                        { id: '1-2', label: '1 - 2 doses' },
                                        { id: '3-4', label: '3 - 4 doses' },
                                        { id: '5-6', label: '5 - 6 doses' },
                                        { id: '7+', label: '7+ doses' },
                                    ]}
                                    selectedId={answers.alcoholDrinks}
                                    onSelect={(val) => updateAnswer('alcoholDrinks', val)}
                                />
                            </View>
                        )}
                    </View>
                );
            case 5:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Substâncias</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você fumou <Text className="text-orange-500">cigarro</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.cigarette} onSelect={(val) => updateAnswer('cigarette', val)} />
                    </View>
                );
            case 6:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Substâncias</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você fumou <Text className="text-orange-500">maconha</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.maconha} onSelect={(val) => updateAnswer('maconha', val)} />
                    </View>
                );
            case 7:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Substâncias</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você usou <Text className="text-orange-500">drogas recreativas</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.drugs} onSelect={(val) => updateAnswer('drugs', val)} />
                    </View>
                );
            case 8:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Hábitos Diários</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você dormiu pelo menos <Text className="text-orange-500">7 horas</Text> à noite?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.sleep} onSelect={(val) => updateAnswer('sleep', val)} />
                    </View>
                );
            case 9:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Hábitos Diários</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você bebeu pelo menos <Text className="text-orange-500">2L de água</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.hydration} onSelect={(val) => updateAnswer('hydration', val)} />
                    </View>
                );
            case 10:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Hábitos Diários</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você seguiu o <Text className="text-orange-500">plano alimentar</Text> hoje?
                        </Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.diet} onSelect={(val) => updateAnswer('diet', val)} />
                    </View>
                );
            case 11:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Metas do Dia</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você completou o seu <Text className="text-orange-500">treino</Text> de hoje?
                        </Text>
                        <QuizOptionSelection
                            options={[
                                { id: 'true', label: 'Sim, treinei' },
                                { id: 'false', label: 'Não treinei' },
                                { id: 'not_applicable', label: 'Não tinha treino hoje' },
                            ]}
                            selectedId={answers.workout}
                            onSelect={(val) => updateAnswer('workout', val)}
                        />
                    </View>
                );
            case 12:
                return (
                    <View className="w-full">
                        <Text className="text-zinc-500 font-bold text-sm tracking-widest uppercase mb-4 text-center">Metas do Dia</Text>
                        <Text className="text-white text-3xl font-bold mb-8 text-center px-4">
                            Você fez pelo menos 1<Text className="text-orange-500"> prática de testosterona</Text>?
                        </Text>
                        <Text className="text-zinc-500 text-sm text-center -mt-6 mb-8">(Banho gelado, meditação, grounding)</Text>
                        <QuizOptionSelection options={yesNoOptions} selectedId={answers.practices} onSelect={(val) => updateAnswer('practices', val)} />
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
