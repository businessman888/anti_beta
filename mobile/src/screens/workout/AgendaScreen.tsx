import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { ChevronLeft, ChevronRight, Bell, Timer, Scale, ArrowRight, CheckCircle2, XCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);
import { WorkoutDetailModal } from './components/WorkoutDetailModal';
import { workoutService, Workout } from '../../services/workoutService';
import { useAuthStore } from '../../store/authStore';

export const AgendaScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuthStore();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [workoutTitle, setWorkoutTitle] = useState('');
    const [modalWorkout, setModalWorkout] = useState<Workout | null>(null);

    const [dayWorkout, setDayWorkout] = useState<Workout | null>(null);
    const [nextWorkout, setNextWorkout] = useState<Workout | null>(null);
    const [monthWorkouts, setMonthWorkouts] = useState<Record<string, Workout | null>>({});
    const [loading, setLoading] = useState(true);
    const [profileCreatedAt, setProfileCreatedAt] = useState<string | undefined>(undefined);

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    // Calendar logic
    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Prep empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Fill days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    }, [viewDate]);

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    const monthIndex = useMemo(() => workoutService.getMonthIndex(profileCreatedAt), [profileCreatedAt]);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            const types = ['A', 'B', 'C'];
            const workouts: Record<string, Workout | null> = {};

            for (const t of types) {
                // Fetch workout templates for the month without date restriction for indicators
                workouts[t] = await workoutService.fetchWorkout(t, monthIndex);
            }
            setMonthWorkouts(workouts);
            setLoading(false);
        };
        loadInitialData();
    }, [monthIndex]);

    useEffect(() => {
        const fetchDayData = async () => {
            const createdAt = await workoutService.getProfileCreatedAt(user?.id);
            setProfileCreatedAt(createdAt);

            const monthIdx = workoutService.getMonthIndex(createdAt);

            const type = workoutService.getWorkoutTypeForDate(selectedDate);
            if (type) {
                const workout = await workoutService.fetchWorkout(type, monthIdx, selectedDate, createdAt);
                setDayWorkout(workout);
            } else {
                setDayWorkout(null);
            }

            // Next workout logic (D+1)
            const tomorrow = new Date(selectedDate);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextType = workoutService.getWorkoutTypeForDate(tomorrow);
            if (nextType) {
                const nextW = await workoutService.fetchWorkout(nextType, monthIdx, tomorrow, createdAt);
                setNextWorkout(nextW);
            } else {
                setNextWorkout(null);
            }
        };
        fetchDayData();
    }, [selectedDate, monthIndex]);

    const totalVolume = useMemo(() => {
        if (!dayWorkout) return 0;
        return workoutService.calculateTotalVolume(dayWorkout.workout_exercise_details);
    }, [dayWorkout]);

    const getIndicatorsForDate = (date: Date) => {
        if (!profileCreatedAt) return [];

        const isVisible = dayjs(date).isSameOrAfter(dayjs(profileCreatedAt), 'day');

        console.log(`Comparing ${dayjs(date).format('YYYY-MM-DD')} with profile creation ${dayjs(profileCreatedAt).format('YYYY-MM-DD')}. Result: ${isVisible}`);

        if (!isVisible) return [];

        const type = workoutService.getWorkoutTypeForDate(date);
        if (!type) return [];

        const workout = monthWorkouts[type];
        if (!workout) return [];

        const indicators = [];
        const isSuperiores = workout.workout_exercise_details.some(ed =>
            ['Peito', 'Costas', 'Ombros', 'Bíceps', 'Tríceps'].includes(ed.exercises.muscle_group)
        );
        const isInferiores = workout.workout_exercise_details.some(ed =>
            ['Pernas', 'Glúteos', 'Panturrilha'].includes(ed.exercises.muscle_group)
        );

        if (isInferiores) indicators.push('inferiores');
        if (isSuperiores) indicators.push('superiores');
        return indicators;
    };

    if (!profileCreatedAt || loading) {
        return (
            <SafeAreaView className="flex-1 bg-zinc-950 items-center justify-center">
                <ActivityIndicator size="large" color="#f97316" />
                <Text className="text-zinc-500 mt-4 font-medium">Carregando sua jornada...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ChevronLeft size={24} color="#ffffff" />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="text-orange-600 text-xs font-bold uppercase tracking-wider">Agenda</Text>
                    <Text className="text-white text-xl font-bold">Calendário</Text>
                </View>
                <TouchableOpacity className="p-2">
                    <Bell size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center justify-between px-2 mb-4">
                    <View className="flex-row items-baseline gap-2">
                        <Text className="text-white text-2xl font-bold">{months[viewDate.getMonth()]}</Text>
                        <Text className="text-zinc-500 text-2xl font-medium">{viewDate.getFullYear()}</Text>
                    </View>
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => changeMonth(-1)}
                            className="bg-zinc-900 p-2.5 rounded-full border border-zinc-800"
                        >
                            <ChevronLeft size={20} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => changeMonth(1)}
                            className="bg-zinc-900 p-2.5 rounded-full border border-zinc-800"
                        >
                            <ChevronRight size={20} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-5 mb-8">
                    {/* Days of week header */}
                    <View className="flex-row mb-4">
                        {daysOfWeek.map((day, idx) => (
                            <Text key={idx} className="flex-1 text-center text-zinc-500 text-sm font-medium">
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Dates grid */}
                    <View className="flex-row flex-wrap">
                        {calendarDays.map((date, idx) => {
                            if (!date) return <View key={idx} className="w-[14.28%] aspect-square" />;

                            const day = date.getDate();
                            const isSelected = selectedDate &&
                                date.getDate() === selectedDate.getDate() &&
                                date.getMonth() === selectedDate.getMonth() &&
                                date.getFullYear() === selectedDate.getFullYear();

                            const status = null; // We'll skip progress status for now as not required by prompt
                            const indicators = getIndicatorsForDate(date);

                            return (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => {
                                        const isSameDay = selectedDate &&
                                            date.getDate() === selectedDate.getDate() &&
                                            date.getMonth() === selectedDate.getMonth() &&
                                            date.getFullYear() === selectedDate.getFullYear();

                                        if (isSameDay) {
                                            if (dayWorkout) {
                                                setModalWorkout(dayWorkout);
                                                setIsModalVisible(true);
                                            }
                                        } else {
                                            setSelectedDate(date);
                                        }
                                    }}
                                    className="w-[14.28%] aspect-square p-0.5"
                                >
                                    <View className={`w-full h-full items-center justify-center rounded-full ${isSelected ? 'bg-orange-600' : ''}`}>
                                        <View className="absolute top-1.5">
                                            {status === 'completed' ? <View className="size-2.5 bg-green-500 rounded-full" /> : null}
                                            {status === 'missed' ? <View className="size-2.5 bg-red-500 rounded-full" /> : null}
                                        </View>

                                        <Text className={`text-base font-bold ${isSelected ? 'text-zinc-950' : 'text-white'}`}>{day}</Text>

                                        <View className="absolute bottom-2 flex-row gap-0.5">
                                            {indicators.includes('inferiores') ? (
                                                <View className={`h-[2px] w-4 rounded-full ${isSelected ? 'bg-zinc-950/40' : 'bg-zinc-600'}`} />
                                            ) : null}
                                            {indicators.includes('superiores') ? (
                                                <View className={`h-[2px] w-4 rounded-full ${isSelected ? 'bg-zinc-950/40' : 'bg-orange-600'} shadow-sm shadow-orange-500`} />
                                            ) : null}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View className="flex-row justify-center gap-6 mt-6 pt-6 border-t border-zinc-800/50">
                        <View className="flex-row items-center gap-2">
                            <View className="h-[2px] w-6 rounded-full bg-zinc-600" />
                            <Text className="text-white text-sm">Inferiores</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="h-[2px] w-6 rounded-full bg-orange-600 shadow-sm shadow-orange-500" />
                            <Text className="text-white text-sm">Superiores</Text>
                        </View>
                    </View>
                </View>

                <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <View>

                            <Text className="text-white text-xl font-bold">Treinos do dia</Text>
                        </View>
                    </View>

                    <View className="bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden shadow-sm">
                        <View className="p-6">
                            <View className="flex-row justify-between">
                                <View className="flex-1 pr-4">
                                    <View className="flex-row gap-2 mb-3">
                                        <View className="bg-orange-600/10 border border-orange-600/20 px-2 py-0.5 rounded-md">
                                            <Text className="text-orange-600 text-[10px] font-bold">ALTA INTENSIDADE</Text>
                                        </View>
                                        <View className="flex-row items-center gap-1.5">
                                            <View className="size-1.5 bg-zinc-500 rounded-full" />
                                            <Text className="text-zinc-500 text-[10px] font-bold">Pendente</Text>
                                        </View>
                                    </View>
                                    {dayWorkout ? (
                                        <>
                                            <Text className="text-white text-xl font-bold mb-2">
                                                {dayWorkout.description || `Treino ${dayWorkout.workout_type}`}
                                            </Text>
                                            <Text className="text-zinc-500 text-xs leading-4">
                                                {`Foco em ${dayWorkout.workout_exercise_details?.map(e => e.exercises.name).join(', ').slice(0, 50)}...`}
                                            </Text>

                                            <View className="flex-row gap-4 mt-4">
                                                <View className="flex-row items-center gap-1.5">
                                                    <Timer size={14} color="#f5f5f5" />
                                                    <Text className="text-white text-xs font-medium">
                                                        {`${dayWorkout.workout_exercise_details.reduce((acc, curr) => acc + (curr.rest_seconds || 0), 0) / 60 + 30} min`}
                                                    </Text>
                                                </View>
                                                <View className="flex-row items-center gap-1.5">
                                                    <Scale size={14} color="#f5f5f5" />
                                                    <Text className="text-white text-xs font-medium">{`${totalVolume} kg`}</Text>
                                                </View>
                                            </View>
                                        </>
                                    ) : (
                                        <Text className="text-white text-xl font-bold mb-2">Descanso programado</Text>
                                    )}
                                </View>
                                <View className="size-20 rounded-full overflow-hidden border-2 border-zinc-800">
                                    <Image
                                        source={{ uri: dayWorkout ? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&h=200' : 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&h=200' }}
                                        className="size-full"
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                if (dayWorkout) {
                                    setModalWorkout(dayWorkout);
                                    setIsModalVisible(true);
                                }
                            }}
                            disabled={!dayWorkout}
                            className="bg-zinc-950/50 flex-row items-center justify-between px-6 py-4 border-t border-zinc-800"
                        >
                            <Text className="text-white font-medium">
                                {dayWorkout ? 'Ver detalhes do treino' : 'Sem treino para este dia'}
                            </Text>
                            <ArrowRight size={20} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-6 pb-12">
                    <Text className="text-zinc-500 text-xs font-bold uppercase mb-3 ml-2">Próximo Treino</Text>
                    {nextWorkout ? (
                        <TouchableOpacity
                            onPress={() => {
                                setModalWorkout(nextWorkout);
                                setIsModalVisible(true);
                            }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex-row items-center"
                        >
                            <View className="size-14 bg-orange-600/10 border border-orange-600 rounded-2xl items-center justify-center mr-4">
                                <ArrowRight size={24} color="#f97316" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-bold text-base">{nextWorkout.description || `Treino ${nextWorkout.workout_type}`}</Text>
                                <Text className="text-zinc-500 text-xs">Treino de {nextWorkout.workout_type === 'A' ? 'força' : 'hipertrofia'} e resistência</Text>
                            </View>
                            <View className="p-2">
                                <ArrowRight size={24} color="#ffffff" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 items-center">
                            <Text className="text-zinc-500 text-xs">Descanso programado</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <WorkoutDetailModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                workout={modalWorkout}
            />
        </SafeAreaView>
    );
};
