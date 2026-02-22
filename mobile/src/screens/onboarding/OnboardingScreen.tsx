import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Dog, Backpack, GraduationCap, Briefcase, Clock, UserX, Rocket } from 'lucide-react-native';
import { useQuizStore } from '../../store/quizStore';
import { usePlanStore } from '../../store/planStore';
import { QuizProgressBar } from '../../components/quiz/QuizProgressBar';
import { QuizInput } from '../../components/quiz/inputs/QuizInput';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

import { QuizAgePicker } from '../../components/quiz/inputs/QuizAgePicker';
import { QuizOptionSelection } from '../../components/quiz/inputs/QuizOptionSelection';
import { QuizTimeSlider } from '../../components/quiz/inputs/QuizTimeSlider';
import { QuizMultiSelectWithSub } from '../../components/quiz/inputs/QuizMultiSelectWithSub';
import { QuizGridMultiSelect } from '../../components/quiz/inputs/QuizGridMultiSelect';
import { QuizMultiSelect } from '../../components/quiz/inputs/QuizMultiSelect';
import { Beer, Cigarette, Flower2, FlaskConical, CircleOff, Leaf, Utensils, Pizza, TriangleAlert, Dumbbell, Timer, Swords, Footprints, Trophy, Activity, Check, Stethoscope, HeartPulse, Bone, AlertCircle, Building2, Home, User } from 'lucide-react-native';
import { QuizScalePicker } from '../../components/quiz/inputs/QuizScalePicker';
import { QuizVerticalRating } from '../../components/quiz/inputs/QuizVerticalRating';

export const OnboardingScreen = () => {

    const { currentStep, totalSteps, setAnswer, answers, nextStep, prevStep } = useQuizStore();
    const { signOut } = useAuthStore();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [name, setName] = useState(answers.name || '');
    const [age, setAge] = useState<number>(answers.age || 25);
    const [professionalSituation, setProfessionalSituation] = useState(answers.professionalSituation || '');
    const [dailyAvailability, setDailyAvailability] = useState<number>(answers.dailyAvailability || 2.0);
    const [currentIncome, setCurrentIncome] = useState(answers.currentIncome || '');
    const [selfEsteem, setSelfEsteem] = useState<number | undefined>(answers.selfEsteem);
    const [pornographyFrequency, setPornographyFrequency] = useState(answers.pornographyFrequency || '');
    const [masturbationFrequency, setMasturbationFrequency] = useState(answers.masturbationFrequency || '');
    const [socialMediaTime, setSocialMediaTime] = useState(answers.socialMediaTime || '');
    const [substanceUse, setSubstanceUse] = useState<Record<string, string | null>>(answers.substanceUse || {});
    const [sleepHours, setSleepHours] = useState<number>(answers.sleepHours || 7.0);
    const [sleepQuality, setSleepQuality] = useState<number>(answers.sleepQuality || 7);
    const [diet, setDiet] = useState<string>(answers.diet || '');
    const [physicalActivity, setPhysicalActivity] = useState<string>(answers.physicalActivity || '');
    const [workoutTypes, setWorkoutTypes] = useState<string[]>(answers.workoutTypes || []);
    const [physicalCondition, setPhysicalCondition] = useState<number>(answers.physicalCondition || 5);
    const [physicalRestrictions, setPhysicalRestrictions] = useState<string[]>(answers.physicalRestrictions || []);
    const [restrictionDescription, setRestrictionDescription] = useState<string>(answers.restrictionDescription || '');
    const [gymAccess, setGymAccess] = useState<string>(answers.gymAccess || '');
    const [communicationSkills, setCommunicationSkills] = useState<number>(answers.communicationSkills || 5);
    const [relationshipStatus, setRelationshipStatus] = useState<string>(answers.relationshipStatus || '');
    const [romanticInteractions, setRomanticInteractions] = useState<string>(answers.romanticInteractions || '');
    const [interactionDifficulties, setInteractionDifficulties] = useState<string[]>(answers.interactionDifficulties || []);
    const [socializingFrequency, setSocializingFrequency] = useState<string>(answers.socializingFrequency || '');
    const [socialCircle, setSocialCircle] = useState<number>(answers.socialCircle || 5);
    const [primaryObjectives, setPrimaryObjectives] = useState<string[]>(answers.primaryObjectives || []);
    const [timelineExpectation, setTimelineExpectation] = useState<string>(answers.timelineExpectation || '');
    const [commitmentLevel, setCommitmentLevel] = useState<number>(answers.commitmentLevel || 10);
    const [additionalContext, setAdditionalContext] = useState<string>(answers.additionalContext || '');

    const handleNext = () => {
        if (currentStep === 0 && name.trim().length >= 3) {
            setAnswer('name', name);
            nextStep();
        } else if (currentStep === 1) {
            setAnswer('age', age);
            nextStep();
        } else if (currentStep === 2) {
            setAnswer('professionalSituation', professionalSituation);
            nextStep();
        } else if (currentStep === 3) {
            setAnswer('dailyAvailability', dailyAvailability);
            nextStep();
        } else if (currentStep === 4) {
            setAnswer('currentIncome', currentIncome);
            nextStep();
        } else if (currentStep === 5) {
            setAnswer('selfEsteem', selfEsteem);
            nextStep();
        } else if (currentStep === 6) {
            setAnswer('pornographyFrequency', pornographyFrequency);
            nextStep();
        } else if (currentStep === 7) {
            setAnswer('masturbationFrequency', masturbationFrequency);
            nextStep();
        } else if (currentStep === 8) {
            setAnswer('socialMediaTime', socialMediaTime);
            nextStep();
        } else if (currentStep === 9) {
            setAnswer('substanceUse', substanceUse);
            nextStep();
        } else if (currentStep === 10) {
            setAnswer('sleepHours', sleepHours);
            nextStep();
        } else if (currentStep === 11) {
            setAnswer('sleepQuality', sleepQuality);
            nextStep();
        } else if (currentStep === 12) {
            setAnswer('diet', diet);
            nextStep();
        } else if (currentStep === 13) {
            setAnswer('physicalActivity', physicalActivity);
            nextStep();
        } else if (currentStep === 14) {
            setAnswer('workoutTypes', workoutTypes);
            nextStep();
        } else if (currentStep === 15) {
            setAnswer('physicalCondition', physicalCondition);
            nextStep();
        } else if (currentStep === 16) {
            setAnswer('physicalRestrictions', physicalRestrictions);
            setAnswer('restrictionDescription', restrictionDescription);
            nextStep();
        } else if (currentStep === 17) {
            setAnswer('gymAccess', gymAccess);
            nextStep();
        } else if (currentStep === 18) {
            setAnswer('communicationSkills', communicationSkills);
            nextStep();
        } else if (currentStep === 19) {
            setAnswer('relationshipStatus', relationshipStatus);
            nextStep();
        } else if (currentStep === 20) {
            setAnswer('romanticInteractions', romanticInteractions);
            nextStep();
        } else if (currentStep === 21) {
            setAnswer('interactionDifficulties', interactionDifficulties);
            nextStep();
        } else if (currentStep === 22) {
            setAnswer('socializingFrequency', socializingFrequency);
            nextStep();
        } else if (currentStep === 23) {
            setAnswer('socialCircle', socialCircle);
            nextStep();
        } else if (currentStep === 24) {
            setAnswer('primaryObjectives', primaryObjectives);
            nextStep();
        } else if (currentStep === 25) {
            setAnswer('timelineExpectation', timelineExpectation);
            nextStep();
        } else if (currentStep === 26) {
            setAnswer('commitmentLevel', commitmentLevel);
            nextStep();
        } else if (currentStep === 27) {
            setAnswer('additionalContext', additionalContext);
            // Collect all answers and trigger plan generation
            const allAnswers = {
                ...answers,
                additionalContext,
            };
            usePlanStore.getState().generatePlan(allAnswers);
            navigation.navigate('PlanLoading');
        } else {
            // Handle other steps or validation
            console.log("Validation failed or step not implemented");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            prevStep();
        }
    };

    const isStepValid = () => {
        if (currentStep === 0) {
            return name.trim().length >= 3;
        }
        if (currentStep === 1) {
            return age >= 13;
        }
        if (currentStep === 2) {
            return !!professionalSituation;
        }
        if (currentStep === 3) {
            return dailyAvailability > 0;
        }
        if (currentStep === 4) {
            return !!currentIncome;
        }
        if (currentStep === 5) {
            return selfEsteem !== undefined;
        }
        if (currentStep === 6) {
            return !!pornographyFrequency;
        }
        if (currentStep === 7) {
            return !!masturbationFrequency;
        }
        if (currentStep === 8) {
            return !!socialMediaTime;
        }
        if (currentStep === 9) {
            const keys = Object.keys(substanceUse);
            if (keys.length === 0) return false;

            // Check if any selected option needs a sub-option but doesn't have one
            // Hardcoded check for options that need frequency: alcohol, cigarette, marijuana
            const needsSub = ['alcohol', 'cigarette', 'marijuana'];
            for (const key of keys) {
                if (needsSub.includes(key) && !substanceUse[key]) {
                    return false;
                }
            }
            return true;
        }
        if (currentStep === 10) {
            return true; // Always valid with default
        }
        if (currentStep === 11) {
            return true;
        }
        if (currentStep === 12) {
            return !!diet;
        }
        if (currentStep === 13) {
            return !!physicalActivity;
        }
        if (currentStep === 14) {
            return workoutTypes.length > 0;
        }
        if (currentStep === 15) {
            return true;
        }
        if (currentStep === 16) {
            if (physicalRestrictions.length === 0) return false;
            // If "Outra" is selected, description is required
            if (physicalRestrictions.includes('other') && !restrictionDescription.trim()) return false;
            return true;
        }
        if (currentStep === 17) {
            return !!gymAccess;
        }
        if (currentStep === 18) {
            return true;
        }
        if (currentStep === 19) return !!relationshipStatus;
        if (currentStep === 20) return !!romanticInteractions;
        if (currentStep === 21) return interactionDifficulties.length > 0;
        if (currentStep === 22) return !!socializingFrequency;
        if (currentStep === 23) return true;
        if (currentStep === 24) return primaryObjectives.length > 0;
        if (currentStep === 25) return !!timelineExpectation;
        if (currentStep === 26) return true;
        if (currentStep === 27) return true; // Optional

        return true; // Temporary for other steps
    };

    // ... renderStepContent ...

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <View className="w-full">
                        <View style={{ marginLeft: 40 }}>
                            <Text className="text-white text-3xl font-bold mb-2">
                                Qual é o seu nome
                            </Text>
                            <Text className="text-orange-500 text-3xl font-bold mb-12">
                                completo?
                            </Text>
                        </View>

                        <QuizInput
                            placeholder="Digite seu nome ou codinome..."
                            value={name}
                            onChangeText={setName}
                            autoFocus
                            autoCapitalize="words"
                            variant="underline"
                        />
                    </View>
                );
            case 1:
                return (
                    <View className="w-full items-center">
                        <Text className="text-white text-3xl font-bold mb-2 text-center">
                            Quantos <Text className="text-orange-500">anos</Text>
                        </Text>
                        <Text className="text-white text-3xl font-bold mb-12 text-center">
                            você tem?
                        </Text>

                        <View className="w-full items-center">
                            <QuizAgePicker
                                value={age}
                                onChange={setAge}
                            />
                        </View>
                    </View>
                );
            case 2:
                const situationOptions = [
                    { id: 'estudante_em', label: 'Estudante', description: '(ensino médio/técnico)', icon: Backpack },
                    { id: 'estudante_uni', label: 'Estudante universitário', icon: GraduationCap },
                    { id: 'trabalho_integral', label: 'Trabalhando em período integral', icon: Briefcase },
                    { id: 'trabalho_parcial', label: 'Trabalhando em período parcial', icon: Clock },
                    { id: 'desempregado', label: 'Desempregado', icon: UserX },
                    { id: 'empreendedor', label: 'Empreendedor', icon: Rocket },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-3xl font-bold mb-8 text-center">
                            Qual é a sua <Text className="text-orange-500">situação profissional atual?</Text>
                        </Text>
                        <QuizOptionSelection
                            options={situationOptions}
                            selectedId={professionalSituation}
                            onSelect={setProfessionalSituation}
                        />
                    </View>
                );
            case 3:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-12">
                            Quantas horas por dia{'\n'}
                            você tem para o seu{'\n'}
                            <Text className="text-orange-500">desenvolvimento?</Text>
                        </Text>

                        <QuizTimeSlider
                            value={dailyAvailability}
                            onChange={setDailyAvailability}
                        />
                    </View>
                );
            case 4:
                const incomeOptions = [
                    { id: 'sem_renda', label: 'Sem renda' },
                    { id: 'ate_1500', label: 'R$ 1 - 1.500' },
                    { id: '1500_3000', label: 'R$ 1.500 - 3.000' },
                    { id: '3000_5000', label: 'R$ 3.000 - 5.000' },
                    { id: '5000_10000', label: 'R$ 5.000 - 10.000' },
                    { id: 'acima_10000', label: 'Acima de R$ 10.000' },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-3xl font-bold mb-8 text-center">
                            Qual é a sua <Text className="text-orange-500">situação profissional atual?</Text>
                        </Text>
                        <QuizOptionSelection
                            options={incomeOptions as any}
                            selectedId={currentIncome}
                            onSelect={setCurrentIncome}
                        />
                    </View>
                );
            case 5:
                return (
                    <View className="w-full items-center px-2">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8">
                            Em escala de 1 a 10,{'\n'}
                            como você avalia sua{'\n'}
                            <Text className="text-orange-500">autoestima</Text> e confiança{'\n'}
                            pessoal?
                        </Text>

                        <QuizScalePicker
                            value={selfEsteem}
                            onChange={setSelfEsteem}
                        />
                    </View>
                );
            case 6:
                const pornOptions = [
                    { id: 'nunca', label: 'Nunca ou raramente' },
                    { id: 'ocasionalmente', label: 'Ocasionalmente' },
                    { id: 'semanalmente', label: 'Semanalmente' },
                    { id: 'diariamente', label: 'Diariamente' },
                    { id: 'multiplas', label: 'Múltiplas vezes ao dia' },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Com que frequência{'\n'}
                            você consome{'\n'}
                            <Text className="text-orange-500">pornografia</Text>?
                        </Text>
                        <QuizOptionSelection
                            options={pornOptions as any}
                            selectedId={pornographyFrequency}
                            onSelect={setPornographyFrequency}
                        />
                    </View>
                );
            case 7:
                const masturbationOptions = [
                    { id: 'nunca', label: 'Nunca ou raramente', description: '(menos de 1x/mês)' },
                    { id: 'ocasionalmente', label: 'Ocasionalmente', description: '(1-3x/mês)' },
                    { id: 'semanalmente', label: 'Semanalmente', description: '(1-6x/semana)' },
                    { id: 'diariamente', label: 'Diariamente' },
                    { id: 'multiplas', label: 'Múltiplas vezes ao dia' },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Você se <Text className="text-orange-500">masturba</Text>{'\n'}
                            com frequência?
                        </Text>
                        <QuizOptionSelection
                            options={masturbationOptions as any}
                            selectedId={masturbationFrequency}
                            onSelect={setMasturbationFrequency}
                        />
                    </View>
                );
            case 8:
                const socialMediaOptions = [
                    { id: 'menos_1h', label: 'Menos de 1 hora' },
                    { id: '1_2h', label: '1-2 horas' },
                    { id: '3_4h', label: '3-4 horas' },
                    { id: '5_6h', label: '5-6 horas' },
                    { id: 'mais_6h', label: 'Mais de 6 horas' },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Quantas horas por dia{'\n'}
                            você passa em <Text className="text-orange-500">redes sociais</Text>?{'\n'}
                            <Text className="text-zinc-500 text-base font-normal">(Instagram, TikTok, X, etc.)</Text>
                        </Text>
                        <QuizOptionSelection
                            options={socialMediaOptions as any}
                            selectedId={socialMediaTime}
                            onSelect={setSocialMediaTime}
                        />
                    </View>
                );
            case 9:
                const substanceOptions = [
                    { id: 'none', label: 'Não uso nenhuma', icon: CircleOff, exclusive: true },
                    { id: 'alcohol', label: 'Álcool', icon: Beer, hasSubOptions: true },
                    { id: 'cigarette', label: 'Cigarro/vape', icon: Cigarette, hasSubOptions: true },
                    { id: 'marijuana', label: 'Maconha', icon: Flower2, hasSubOptions: true },
                    { id: 'others', label: 'Outras', icon: FlaskConical, hasSubOptions: false },
                ];

                const frequencySubOptions = [
                    { id: 'rarely', label: 'Raramente' },
                    { id: 'weekly', label: 'Semanalmente' },
                    { id: 'daily', label: 'Diariamente' },
                ];

                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Você faz uso de <Text className="text-orange-500">substâncias</Text>{'\n'}
                            como álcool, cigarro,{'\n'}
                            maconha ou outras drogas?
                        </Text>
                        <QuizMultiSelectWithSub
                            options={substanceOptions}
                            subOptions={frequencySubOptions}
                            selectedValues={substanceUse}
                            onChange={setSubstanceUse}
                        />
                    </View>
                );
            case 10:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-12">
                            Quantas horas você{'\n'}
                            <Text className="text-orange-500">dorme</Text> por noite?
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
            case 11:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8">
                            Qual é a <Text className="text-orange-500">qualidade</Text> do{'\n'}
                            seu sono?
                        </Text>

                        <QuizVerticalRating
                            value={sleepQuality}
                            onChange={setSleepQuality}
                        />
                    </View>
                );
            case 12:
                const dietOptions = [
                    { id: 'muito_saudavel', label: 'Muito saudável', icon: Leaf },
                    { id: 'razoavel', label: 'Razoável', icon: Utensils },
                    { id: 'ruim', label: 'Ruim', icon: Pizza },
                    { id: 'pessima', label: 'Péssima', icon: TriangleAlert },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Como você{'\n'}
                            descreveria sua{'\n'}
                            <Text className="text-orange-500">alimentação</Text> atual?
                        </Text>
                        <QuizOptionSelection
                            options={dietOptions}
                            selectedId={diet}
                            onSelect={setDiet}
                        />
                    </View>
                );
            case 13:
                const activityOptions = [
                    { id: 'nao_pratico', label: 'Não pratico' },
                    { id: '1_2_vezes', label: '1 - 2 vezes por semana' },
                    { id: '3_4_vezes', label: '3 - 4 vezes por semana' },
                    { id: '5_6_vezes', label: '5 - 6 vezes por semana' },
                    { id: 'diariamente', label: 'Diariamente' },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            <Text className="text-orange-500">Frequência</Text> de{'\n'}
                            atividade física
                        </Text>
                        <QuizOptionSelection
                            options={activityOptions as any}
                            selectedId={physicalActivity}
                            onSelect={setPhysicalActivity}
                        />
                    </View>
                );
            case 14:
                const workoutOptions = [
                    { id: 'musculacao', label: 'Musculação', icon: Dumbbell },
                    { id: 'crossfit', label: 'CrossFit', icon: Timer },
                    { id: 'artes_marciais', label: 'Artes Marciais', icon: Swords },
                    { id: 'corrida', label: 'Corrida', icon: Footprints },
                    { id: 'esportes', label: 'Esportes', icon: Trophy },
                    { id: 'calistenia', label: 'Calistenia', icon: Activity },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Qual tipo de <Text className="text-orange-500">treino</Text>{'\n'}
                            você pratica?
                        </Text>
                        <QuizGridMultiSelect
                            options={workoutOptions}
                            selectedValues={workoutTypes}
                            onChange={setWorkoutTypes}
                        />
                    </View>
                );
            case 15:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-4 px-4">
                            Como você avalia{'\n'}
                            seu <Text className="text-orange-500">condicionamento{'\n'}físico</Text>?
                        </Text>

                        <QuizVerticalRating
                            value={physicalCondition}
                            onChange={setPhysicalCondition}
                            minLabel="Péssima"
                            maxLabel="Excelente"
                        />
                    </View>
                );
            case 16:
                const restrictionOptions = [
                    { id: 'none', label: 'Não tenho restrições', icon: Check },
                    { id: 'knee', label: 'Lesão no joelho', icon: Bone }, // Bone isn't perfect but works
                    { id: 'back', label: 'Lesão nas costas/coluna', icon: Activity }, // Activity generic
                    { id: 'shoulder', label: 'Lesão no ombro/braço', icon: User },
                    { id: 'heart', label: 'Problemas cardíacos/respiratórios', icon: HeartPulse },
                    { id: 'other', label: 'Outra (especificar)', icon: AlertCircle },
                ];

                const handleRestrictionChange = (values: string[]) => {
                    // Exclusive logic for 'none'
                    if (values.includes('none')) {
                        // If 'none' was just added, clear others
                        if (!physicalRestrictions.includes('none')) {
                            setPhysicalRestrictions(['none']);
                            setRestrictionDescription('');
                            return;
                        }
                        // If 'none' is present and we're adding something else, remove 'none'
                        if (values.length > 1) {
                            const newValues = values.filter(v => v !== 'none');
                            setPhysicalRestrictions(newValues);
                            return;
                        }
                    }
                    setPhysicalRestrictions(values);
                };

                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Você tem alguma <Text className="text-orange-500">restrição{'\n'}física</Text> ou lesão?
                        </Text>
                        <QuizMultiSelect
                            options={restrictionOptions}
                            selectedValues={physicalRestrictions}
                            onChange={handleRestrictionChange}
                        />

                        {physicalRestrictions.includes('other') && (
                            <View className="px-6 mt-4 mb-20">
                                <Text className="text-zinc-400 mb-2 font-medium">Qual restrição?</Text>
                                <QuizInput
                                    placeholder="Descreva sua restrição..."
                                    value={restrictionDescription}
                                    onChangeText={setRestrictionDescription}
                                />
                            </View>
                        )}
                    </View>
                );
            case 17:
                const gymOptions = [
                    { id: 'gym_complete', label: 'Tenho acesso a academia completa', icon: Building2 },
                    { id: 'home_equipment', label: 'Tenho equipamentos básicos em casa', icon: Dumbbell },
                    { id: 'bodyweight', label: 'Não tenho equipamentos (apenas peso corporal)', icon: Home },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Você tem acesso a <Text className="text-orange-500">academia</Text> ou{'\n'}equipamentos?
                        </Text>
                        <QuizOptionSelection
                            options={gymOptions}
                            selectedId={gymAccess}
                            onSelect={setGymAccess}
                        />
                    </View>
                );
            case 18:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-4 px-4">
                            Como você avalia suas{'\n'}
                            habilidades <Text className="text-orange-500">sociais</Text> e de{'\n'}comunicação?
                        </Text>

                        <QuizVerticalRating
                            value={communicationSkills}
                            onChange={setCommunicationSkills}
                            minLabel="Muito tímido"
                            maxLabel="Extrovertido"
                        />
                    </View>
                );
            case 19:
                const relationshipOptions = [
                    { id: 'single_no_interest', label: 'Solteiro, sem interesse romântico', icon: User },
                    { id: 'single_looking', label: 'Solteiro, buscando relacionamento', icon: Swords }, // Swords as "hunting/looking" metaphor? Or generic
                    { id: 'dating', label: 'Ficando/conhecendo alguém', icon: HeartPulse },
                    { id: 'relationship', label: 'Em um relacionamento sério', icon: Trophy }, // Trophy as "achievement"? 
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Qual é a sua situação de <Text className="text-orange-500">relacionamento</Text> atual?
                        </Text>
                        <QuizOptionSelection
                            options={relationshipOptions}
                            selectedId={relationshipStatus}
                            onSelect={setRelationshipStatus}
                        />
                    </View>
                );
            case 20:
                const interactionOptions = [
                    { id: 'none', label: 'Nenhuma', icon: CircleOff },
                    { id: '1_2', label: '1-2 interações', icon: User },
                    { id: '3_5', label: '3-5 interações', icon: User }, // Reuse User or generic
                    { id: '6_10', label: '6-10 interações', icon: User },
                    { id: 'more_10', label: 'Mais de 10 interações', icon: Trophy },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Nos últimos 6 meses, houve quantas <Text className="text-orange-500">interações românticas</Text>?
                        </Text>
                        <QuizOptionSelection
                            options={interactionOptions}
                            selectedId={romanticInteractions}
                            onSelect={setRomanticInteractions}
                        />
                    </View>
                );
            case 21:
                const difficultyOptions = [
                    { id: 'rejection', label: 'Medo de rejeição', icon: AlertCircle },
                    { id: 'dont_know_what_to_say', label: 'Não sei o que falar', icon: CircleOff },
                    { id: 'shyness', label: 'Timidez/ansiedade social', icon: User }, // User hiding?
                    { id: 'signals', label: 'Não sei interpretar sinais', icon: TriangleAlert },
                    { id: 'keep_conversation', label: 'Manter a conversa', icon: Activity },
                    { id: 'low_esteem', label: 'Baixa autoestima', icon: User },
                    { id: 'none', label: 'Não tenho dificuldades', icon: Check },
                ];

                const handleDifficultyChange = (values: string[]) => {
                    // Logic: Max 3, and 'none' is exclusive
                    if (values.includes('none')) {
                        if (!interactionDifficulties.includes('none')) {
                            setInteractionDifficulties(['none']); // New selection is none, clear others
                            return;
                        }
                        if (values.length > 1) {
                            // Removing none because another was selected
                            setInteractionDifficulties(values.filter(v => v !== 'none'));
                            return;
                        }
                    }

                    if (values.length > 3) return; // Max 3 limit (UI won't select)

                    setInteractionDifficulties(values);
                };

                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Qual a principal <Text className="text-orange-500">dificuldade</Text> ao interagir com mulheres?
                        </Text>
                        <QuizMultiSelect
                            options={difficultyOptions}
                            selectedValues={interactionDifficulties}
                            onChange={handleDifficultyChange}
                        />
                        <Text className="text-zinc-500 text-center mt-4 text-sm">Selecione até 3 opções</Text>
                    </View>
                );
            case 22:
                const socialOptions = [
                    { id: 'never', label: 'Nunca ou raramente', icon: CircleOff },
                    { id: '1_2_month', label: '1-2x por mês', icon: User },
                    { id: '1_week', label: '1x por semana', icon: Beer },
                    { id: '2_3_week', label: '2-3x por semana', icon: Beer },
                    { id: 'more_3_week', label: 'Mais de 3x por semana', icon: Trophy },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Com que frequência você sai para <Text className="text-orange-500">socializar</Text>?
                        </Text>
                        <QuizOptionSelection
                            options={socialOptions}
                            selectedId={socializingFrequency}
                            onSelect={setSocializingFrequency}
                        />
                    </View>
                );
            case 23:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-4 px-4">
                            Você tem um <Text className="text-orange-500">círculo social</Text> ativo?{'\n'}
                            <Text className="text-zinc-500 text-base font-normal">(Amigos, grupos, etc)</Text>
                        </Text>

                        <QuizVerticalRating
                            value={socialCircle}
                            onChange={setSocialCircle}
                            minLabel="Inexistente"
                            maxLabel="Muito ativo"
                        />
                    </View>
                );
            case 24:
                const objectiveOptions = [
                    { id: 'conquest', label: 'Melhorar habilidades de conquista', icon: HeartPulse },
                    { id: 'physique', label: 'Ganhar massa muscular e físico', icon: Dumbbell },
                    { id: 'testosterona', label: 'Aumentar testosterona e energia', icon: Activity },
                    { id: 'vices', label: 'Cortar vícios (porno, redes, etc)', icon: CircleOff },
                    { id: 'confidence', label: 'Desenvolver confiança e autoestima', icon: Trophy },
                    { id: 'finance', label: 'Melhorar carreira e financeiro', icon: Building2 },
                    { id: 'discipline', label: 'Criar disciplina e rotina', icon: Check },
                    { id: 'intellect', label: 'Me tornar mais intelectual', icon: User },
                ];

                const handleObjectiveChange = (values: string[]) => {
                    if (values.length > 3) return; // Max 3
                    setPrimaryObjectives(values);
                };

                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Qual seu principal <Text className="text-orange-500">objetivo</Text> ao usar o Antibeta?
                        </Text>
                        <QuizMultiSelect
                            options={objectiveOptions}
                            selectedValues={primaryObjectives}
                            onChange={handleObjectiveChange}
                        />
                        <Text className="text-zinc-500 text-center mt-4 text-sm">Selecione até 3 opções</Text>
                    </View>
                );
            case 25:
                const timelineOptions = [
                    { id: '1_3_months', label: '1-3 meses (rápido)', icon: Timer },
                    { id: '3_6_months', label: '3-6 meses (moderado)', icon: Activity },
                    { id: '6_12_months', label: '6-12 meses (gradual)', icon: Leaf },
                    { id: 'more_1_year', label: 'Mais de 1 ano (longo prazo)', icon: Trophy },
                ];
                return (
                    <View className="w-full">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-8 px-4">
                            Em quanto tempo você espera ver <Text className="text-orange-500">resultados</Text>?
                        </Text>
                        <QuizOptionSelection
                            options={timelineOptions}
                            selectedId={timelineExpectation}
                            onSelect={setTimelineExpectation}
                        />
                    </View>
                );
            case 26:
                return (
                    <View className="w-full items-center px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-4 px-4">
                            Qual é o seu nível de <Text className="text-orange-500">comprometimento</Text> em seguir um plano rigoroso?
                        </Text>

                        <QuizVerticalRating
                            value={commitmentLevel}
                            onChange={setCommitmentLevel}
                            minLabel="Vou tentar"
                            maxLabel="Vou seguir religiosamente"
                        />
                    </View>
                );
            case 27:
                return (
                    <View className="w-full px-6">
                        <Text className="text-white text-2xl font-bold text-center leading-tight mb-4 px-4">
                            Algo mais que o Antibeta deve saber para criar um <Text className="text-orange-500">plano personalizado</Text>?
                        </Text>
                        <Text className="text-zinc-500 text-center mb-8 px-4">
                            Traumas, situações específicas, rotina incomum... (Opcional)
                        </Text>

                        <QuizInput
                            placeholder="Digite aqui..."
                            value={additionalContext}
                            onChangeText={setAdditionalContext}
                            multiline
                            numberOfLines={6}
                            maxLength={500}
                        />
                        <Text className="text-zinc-600 text-right mt-2 text-xs">
                            {additionalContext.length}/500
                        </Text>
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
        <SafeAreaView className="flex-1 bg-[#0D090A]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1">
                    {/* Header - Fixed at top */}
                    <View className="px-6 pt-6 mb-6">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-white font-bold text-xl">Pontuação Alfa</Text>

                            {/* XP Badge */}
                            <View className="flex-row items-center bg-black border border-orange-500 rounded-full px-3 py-1.5 space-x-1.5">
                                <Dog size={16} color="#F97316" />
                                <Text className="text-orange-500 font-bold text-sm">50 XP</Text>
                            </View>
                        </View>

                        {/* Progress Bar Container */}
                        <View className="mt-4 w-full">
                            <QuizProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                        </View>
                    </View>

                    {/* Main Content Area */}
                    <View className="flex-1">
                        {currentStep === 1 || currentStep === 3 || currentStep === 10 || currentStep === 11 || currentStep === 15 || currentStep === 18 || currentStep === 23 || currentStep === 26 ? (
                            // Age Picker & Time Slider - Fixed View (No Scroll)
                            <View className="flex-1 justify-center items-center px-6">
                                {renderStepContent()}
                            </View>
                        ) : (
                            // Name & Professional Situation - Scrollable
                            <ScrollView
                                className="flex-1"
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingHorizontal: 24,
                                    paddingBottom: 100 // Space for footer
                                }}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <View className={currentStep === 0 ? "flex-1 justify-center" : "flex-1 pt-4"}>
                                    {renderStepContent()}
                                </View>
                            </ScrollView>
                        )}
                    </View>

                    {/* Footer - Fixed at bottom */}
                    <View className="p-6 bg-[#0D090A] border-t border-zinc-900/50">
                        <View className="flex-row justify-between space-x-4">
                            {currentStep > 0 && (
                                <TouchableOpacity
                                    onPress={handleBack}
                                    className="flex-1 py-4 rounded-full bg-zinc-800/50 justify-center items-center"
                                >
                                    <Text className="text-white font-bold text-lg">Voltar</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                onPress={handleNext}
                                disabled={!isStepValid()}
                                className={`flex-1 flex-row justify-center items-center py-4 rounded-full ${isStepValid() ? 'bg-orange-500' : 'bg-zinc-800/50'}`}
                            >
                                <Text className={`font-bold text-lg mr-2 ${isStepValid() ? 'text-white' : 'text-zinc-500'}`}>
                                    {currentStep === 27 ? 'Finalizar' : 'Continuar'}
                                </Text>
                                <ArrowRight size={20} color={isStepValid() ? '#fff' : '#71717a'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
