import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { X, Scale, Timer, RefreshCcw, CheckCircle2, ChevronRight } from 'lucide-react-native';

import { Workout } from '../../../services/workoutService';

interface WorkoutDetailModalProps {
    visible: boolean;
    onClose: () => void;
    workout: Workout | null;
}


export const WorkoutDetailModal = ({ visible, onClose, workout }: WorkoutDetailModalProps) => {
    if (!workout) return null;

    const totalWeight = workout.workout_exercise_details.reduce((acc, curr) => acc + (curr.weight_kg || 0), 0);
    const avgRest = Math.round(workout.workout_exercise_details.reduce((acc, curr) => acc + (curr.rest_seconds || 0), 0) / (workout.workout_exercise_details.length || 1));

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-zinc-950">
                <SafeAreaView className="flex-1">
                    <View className="items-center pt-2 pb-1">
                        <View className="w-12 h-1.5 bg-zinc-800 rounded-full" />
                    </View>
                    <View className="flex-row items-center justify-between px-6 py-4">
                        <TouchableOpacity onPress={onClose} className="p-2">
                            <X size={24} color="transparent" />
                        </TouchableOpacity>
                        <Text className="text-white text-xl font-bold">{workout.description || `Treino ${workout.workout_type}`}</Text>
                        <TouchableOpacity onPress={onClose} className="p-2">
                            <X size={24} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                        <View className="flex-row justify-center gap-3 mb-8">
                            <View className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 gap-2">
                                <View className="bg-red-500/10 p-1.5 rounded-full">
                                    <Scale size={14} color="#ef4444" />
                                </View>
                                <Text className="text-zinc-300 text-xs font-bold">{`${totalWeight} kg`}</Text>
                            </View>
                            <View className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 gap-2">
                                <View className="bg-orange-500/10 p-1.5 rounded-full">
                                    <Timer size={14} color="#f97316" />
                                </View>
                                <Text className="text-zinc-300 text-xs font-bold">{`${Math.round(totalWeight / 2) + 15} min`}</Text>
                            </View>
                            <View className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 gap-2">
                                <View className="bg-red-500/10 p-1.5 rounded-full">
                                    <RefreshCcw size={14} color="#ef4444" />
                                </View>
                                <Text className="text-zinc-300 text-xs font-bold">{`Rest ${avgRest}s`}</Text>
                            </View>
                        </View>

                        {workout.workout_exercise_details.map((detail) => (
                            <View key={detail.id} className="mb-10">
                                <View className="flex-row justify-between items-start mb-6">
                                    <View>
                                        <Text className="text-zinc-600 text-xs font-bold uppercase mb-1">Pendente</Text>
                                        <Text className="text-white text-2xl font-bold mb-1">{detail.exercises.name}</Text>
                                        <Text className="text-zinc-500 text-sm font-medium">{detail.exercises.muscle_group}</Text>
                                    </View>
                                    <View className="size-16 rounded-full border-4 border-zinc-900 items-center justify-center">
                                        <Text className="text-zinc-400 font-bold text-sm">{`0/${detail.sets}`}</Text>
                                    </View>
                                </View>

                                <View className="flex-row gap-3 mb-6">
                                    <View className="flex-1 bg-zinc-900/50 border border-zinc-900 rounded-2xl p-4 items-center">
                                        <Text className="text-zinc-600 text-xs font-bold uppercase mb-2">Sets</Text>
                                        <Text className="text-orange-600 text-xl font-bold">{`${detail.sets}x`}</Text>
                                    </View>
                                    <View className="flex-1 bg-zinc-900/50 border border-zinc-900 rounded-2xl p-4 items-center">
                                        <Text className="text-zinc-600 text-xs font-bold uppercase mb-2">Reps</Text>
                                        <Text className="text-orange-600 text-xl font-bold">{detail.reps}</Text>
                                    </View>
                                    <View className="flex-1 bg-zinc-900/50 border border-zinc-900 rounded-2xl p-4 items-center">
                                        <Text className="text-zinc-600 text-xs font-bold uppercase mb-2">Rest</Text>
                                        <Text className="text-orange-600 text-xl font-bold">{`${detail.rest_seconds}s`}</Text>
                                    </View>
                                </View>

                                <View className="gap-2">
                                    {Array.from({ length: detail.sets }).map((_, i) => (
                                        <View
                                            key={i}
                                            className="flex-row items-center justify-between bg-zinc-900/30 border border-zinc-900 rounded-2xl px-5 py-4"
                                        >
                                            <Text className="text-zinc-500 font-bold text-xs grow-0 w-16 uppercase">{`SET ${i + 1}`}</Text>
                                            <Text className="text-zinc-500 font-medium text-xs text-center">{`${detail.weight_kg}kg`}</Text>
                                            <Text className="text-zinc-500 font-medium text-xs text-center">{`${detail.reps}reps`}</Text>
                                            <View className="size-6 rounded-full border border-zinc-800 items-center justify-center">
                                                {/* Logic for completion can be added here if session tracking is active */}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                        <View className="h-10" />
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Modal>
    );
};
