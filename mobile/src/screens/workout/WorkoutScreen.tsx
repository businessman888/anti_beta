import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { ChevronLeft, Calendar, Play, Pause, CheckCircle2, Circle, Timer } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { workoutService, Workout } from '../../services/workoutService';
import { useAuthStore } from '../../store/authStore';
import { usePlanStore } from '../../store/planStore';

export const WorkoutScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { user } = useAuthStore();
    const { completions, completeTask, fetchCompletions } = usePlanStore();

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);

    // Local state for completed sets: { exerciseDetailId: [index1, index2] }
    const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});

    const workoutType = useMemo(() => {
        return workoutService.getWorkoutTypeForDate(new Date());
    }, []);

    const completionTaskId = useMemo(() => {
        return `workout_completed_${workoutType}`;
    }, [workoutType]);

    const isWorkoutAlreadyCompleted = useMemo(() => {
        return completions.has(completionTaskId);
    }, [completions, completionTaskId]);

    useEffect(() => {
        const loadWorkout = async () => {
            if (!user) return;

            setLoading(true);
            try {
                // Fetch completions first to ensure we have the latest state
                await fetchCompletions(user.id);

                const createdAt = await workoutService.getProfileCreatedAt(user.id);
                const today = new Date();
                const type = workoutService.getWorkoutTypeForDate(today);
                const monthIndex = workoutService.getMonthIndex(createdAt);

                if (type) {
                    const data = await workoutService.fetchWorkout(type, monthIndex);
                    setWorkout(data);

                    // If already completed for today, pre-fill all sets
                    if (completions.has(`workout_completed_${type}`) && data) {
                        const allSets: Record<string, number[]> = {};
                        data.workout_exercise_details.forEach(detail => {
                            allSets[detail.id] = Array.from({ length: detail.sets }, (_, i) => i);
                        });
                        setCompletedSets(allSets);
                    }
                }
            } catch (error) {
                console.error('Error loading workout:', error);
            } finally {
                setLoading(false);
            }
        };
        loadWorkout();
    }, [user?.id, fetchCompletions]);

    // Timer logic
    useEffect(() => {
        let interval: any = null;
        if (isActive && !isWorkoutAlreadyCompleted) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, isWorkoutAlreadyCompleted]);

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const markSetAsComplete = (detailId: string, setIndex: number) => {
        if (isWorkoutAlreadyCompleted) return;

        setCompletedSets(prev => {
            const currentSets = prev[detailId] || [];
            if (currentSets.includes(setIndex)) return prev;

            return {
                ...prev,
                [detailId]: [...currentSets, setIndex]
            };
        });
    };

    const isAllCompleted = useMemo(() => {
        if (!workout) return false;
        return workout.workout_exercise_details.every(detail => {
            const completed = completedSets[detail.id] || [];
            return completed.length === detail.sets;
        });
    }, [workout, completedSets]);

    const handleCompleteWorkout = async () => {
        if (!user || !workoutType || !isAllCompleted || isWorkoutAlreadyCompleted || completing) return;

        setCompleting(true);
        try {
            await completeTask(completionTaskId, user.id);
            setIsActive(false);
        } catch (error) {
            console.error('Error completing workout:', error);
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950 items-center justify-center">
                <ActivityIndicator size="large" color="#f97316" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ChevronLeft size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Treino {workoutType}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Agenda')} className="p-2">
                    <Calendar size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Timer Section */}
                <View className="items-center py-8">
                    <View className="flex-row items-center mb-6">
                        <View className="mr-4">
                            <Timer size={48} color="#f97316" fill="#f97316" />
                        </View>
                        <Text className="text-white text-6xl font-bold tracking-widest">
                            {formatTime(seconds)}
                        </Text>
                    </View>

                    {!isWorkoutAlreadyCompleted && (
                        <TouchableOpacity
                            onPress={() => setIsActive(!isActive)}
                            className="flex-row items-center border border-orange-600 rounded-full px-8 py-4 gap-2"
                        >
                            {isActive ? <Pause size={20} color="#f97316" fill="#f97316" /> : <Play size={20} color="#f97316" fill="#f97316" />}
                            <Text className="text-orange-600 text-lg font-bold">
                                {isActive ? 'Pausar treino' : 'Continuar treino'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {isWorkoutAlreadyCompleted && (
                        <View className="flex-row items-center bg-orange-600/10 border border-orange-600/30 rounded-full px-8 py-3 gap-2">
                            <CheckCircle2 size={20} color="#f97316" />
                            <Text className="text-orange-600 text-lg font-bold">Treino concluído</Text>
                        </View>
                    )}
                </View>

                {/* Exercises Section */}
                <View className="gap-4 pb-10">
                    {workout?.workout_exercise_details.map((detail, index) => {
                        const exerciseCompletedSets = completedSets[detail.id] || [];
                        const isExerciseFinished = exerciseCompletedSets.length === detail.sets;

                        // Determinar o status visual
                        let status = "Pendente";
                        let statusColor = "text-zinc-500";
                        if (isExerciseFinished) {
                            status = "Concluído";
                            statusColor = "text-orange-600";
                        } else if (index === 0 || (workout?.workout_exercise_details[index - 1] && (completedSets[workout.workout_exercise_details[index - 1].id] || []).length === workout.workout_exercise_details[index - 1].sets)) {
                            // First exercise OR previous exercise finished
                            status = "Em Execução";
                            statusColor = "text-orange-600";
                        }

                        return (
                            <ExerciseCard
                                key={detail.id}
                                title={detail.exercises.name}
                                subtitle={detail.exercises.muscle_group}
                                status={status}
                                statusColor={statusColor}
                                sets={`${detail.sets}x`}
                                reps={detail.reps}
                                rest={`${detail.rest_seconds}s`}
                                weight={`${detail.weight_kg}kg`}
                                detail={detail}
                                completedSets={exerciseCompletedSets}
                                onMarkSetComplete={(setIdx: number) => markSetAsComplete(detail.id, setIdx)}
                                isWorkoutCompleted={isWorkoutAlreadyCompleted}
                                active={status === "Em Execução"}
                            />
                        );
                    })}
                    {!workout && !loading && (
                        <View className="items-center py-20">
                            <Text className="text-white text-xl font-bold mb-2">Descanso programado</Text>
                            <Text className="text-zinc-500">Nenhum treino programado para hoje.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="p-6 bg-zinc-950 border-t border-zinc-900">
                <TouchableOpacity
                    onPress={handleCompleteWorkout}
                    disabled={!isAllCompleted || isWorkoutAlreadyCompleted || completing}
                    className={`py-5 rounded-full items-center ${isAllCompleted && !isWorkoutAlreadyCompleted ? 'bg-orange-600' : 'bg-zinc-900'}`}
                >
                    {completing ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className={`font-bold text-lg ${isAllCompleted && !isWorkoutAlreadyCompleted ? 'text-white' : 'text-zinc-600'}`}>
                            {isWorkoutAlreadyCompleted ? 'Treino finalizado ✓✓' : 'Concluir treino ✓✓'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const ExerciseCard = ({
    title,
    subtitle,
    status,
    statusColor,
    sets,
    reps,
    rest,
    detail,
    completedSets,
    onMarkSetComplete,
    isWorkoutCompleted,
    active
}: any) => {
    const totalSets = detail?.sets || 0;
    const completedCount = completedSets.length;
    const progressText = `${completedCount}/${totalSets}`;
    const progressPercent = totalSets > 0 ? completedCount / totalSets : 0;
    const isExerciseFinished = completedCount === totalSets;

    return (
        <View className={`bg-zinc-900/80 border ${active ? 'border-orange-600/50' : 'border-zinc-800'} rounded-3xl p-6`}>
            <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1 mr-4">
                    <Text className={`${statusColor} text-xs font-bold mb-1 uppercase`}>{status}</Text>
                    <Text className="text-white text-2xl font-bold">{title}</Text>
                    <Text className="text-zinc-500 text-sm">{subtitle}</Text>
                </View>

                <View className="w-14 h-14 items-center justify-center">
                    <Svg width="56" height="56" viewBox="0 0 56 56">
                        <SvgCircle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="#27272a"
                            strokeWidth="4"
                            fill="none"
                        />
                        <SvgCircle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="#f97316"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${(progressPercent * 2 * Math.PI * 24)} ${2 * Math.PI * 24}`}
                            strokeLinecap="round"
                            rotation="-90"
                            origin="28, 28"
                        />
                    </Svg>
                    <View className="absolute inset-x-0 inset-y-0 items-center justify-center">
                        {isExerciseFinished ? (
                            <CheckCircle2 size={20} color="#f97316" strokeWidth={3} />
                        ) : (
                            <Text className="text-white font-bold text-xs">{progressText}</Text>
                        )}
                    </View>
                </View>
            </View>

            <View className="flex-row gap-2 mb-6">
                <InfoBox label="Sets" value={sets} />
                <InfoBox label="Reps" value={reps} />
                <InfoBox label="Rest" value={rest} />
            </View>

            {/* Sets Detail Table */}
            <View className="gap-2">
                {Array.from({ length: totalSets }).map((_, i) => {
                    const isSetCompleted = completedSets.includes(i);
                    return (
                        <TouchableOpacity
                            key={i}
                            disabled={isSetCompleted || isWorkoutCompleted}
                            onPress={() => onMarkSetComplete(i)}
                            className={`bg-zinc-800/50 flex-row items-center justify-between p-4 rounded-xl ${isSetCompleted ? 'opacity-80' : ''}`}
                        >
                            <Text className="text-zinc-500 font-bold text-xs uppercase">SET {i + 1}</Text>
                            <Text className="text-zinc-300 font-medium">{detail?.weight_kg || 0}kg</Text>
                            <Text className="text-zinc-300 font-medium">{detail?.reps || 0}reps</Text>
                            {isSetCompleted ? (
                                <View className="bg-orange-600 rounded-full p-1">
                                    <CheckCircle2 size={16} color="#ffffff" />
                                </View>
                            ) : (
                                <Circle size={24} color="#3f3f46" />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {active && !isExerciseFinished && (
                <TouchableOpacity
                    onPress={() => {
                        const nextSet = Array.from({ length: totalSets }).findIndex((_, i) => !completedSets.includes(i));
                        if (nextSet !== -1) onMarkSetComplete(nextSet);
                    }}
                    className="bg-orange-600 py-4 rounded-2xl mt-6 items-center"
                >
                    <Text className="text-white font-bold text-lg">Concluir série</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const InfoBox = ({ label, value }: any) => (
    <View className="bg-zinc-800/30 flex-1 p-4 rounded-2xl items-center">
        <Text className="text-zinc-500 text-xs font-medium mb-1">{label}</Text>
        <Text className="text-orange-600 text-xl font-bold">{value}</Text>
    </View>
);
