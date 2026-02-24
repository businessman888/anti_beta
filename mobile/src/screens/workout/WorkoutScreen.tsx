import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronLeft, Calendar, Play, Pause, CheckCircle2, Circle, Timer } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';

export const WorkoutScreen = () => {
    const navigation = useNavigation();
    const [seconds, setSeconds] = useState(2535); // 00:42:15 in seconds
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-zinc-950">
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ChevronLeft size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Treino A</Text>
                <TouchableOpacity className="p-2">
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

                    <TouchableOpacity
                        onPress={() => setIsActive(!isActive)}
                        className="flex-row items-center border border-orange-600 rounded-full px-8 py-4 gap-2"
                    >
                        <Play size={20} color="#f97316" fill="#f97316" />
                        <Text className="text-orange-600 text-lg font-bold">
                            {isActive ? 'Pausar treino' : 'Continuar treino'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Exercises Section */}
                <View className="gap-4 pb-10">
                    {/* Exercise Card 1 - Completed */}
                    <ExerciseCard
                        title="Crucifixo"
                        subtitle="Máquina polia"
                        status="Concluído"
                        statusColor="text-orange-600"
                        sets="3x"
                        reps="15"
                        rest="60s"
                        progress="3/3"
                        completed
                    />

                    {/* Exercise Card 2 - In Execution */}
                    <ExerciseCard
                        title="Supino Reto"
                        subtitle="supino plano com barra"
                        status="Em Execução"
                        statusColor="text-orange-600"
                        sets="4x"
                        reps="12"
                        rest="90s"
                        progress="1/4"
                        active
                    />

                    {/* Exercise Card 3 - Pending */}
                    <ExerciseCard
                        title="Tríceps Polia"
                        subtitle="Tríceps polia"
                        status="Pendente"
                        statusColor="text-zinc-500"
                        sets="4x"
                        reps="12"
                        rest="60s"
                        progress="0/4"
                    />
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View className="p-6 bg-zinc-950 border-t border-zinc-900">
                <TouchableOpacity className="bg-zinc-900 py-5 rounded-full items-center">
                    <Text className="text-zinc-600 font-bold text-lg">Concluir treino ✓✓</Text>
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
    progress,
    completed = false,
    active = false
}: any) => {
    return (
        <View className={`bg-zinc-900/80 border ${active ? 'border-orange-600/50' : 'border-zinc-800'} rounded-3xl p-6`}>
            <View className="flex-row justify-between items-start mb-6">
                <View>
                    <Text className={`${statusColor} text-xs font-bold mb-1 uppercase`}>{status}</Text>
                    <Text className="text-white text-2xl font-bold">{title}</Text>
                    <Text className="text-zinc-500 text-sm">{subtitle}</Text>
                </View>
                {completed ? (
                    <View className="bg-orange-600 p-3 rounded-full">
                        <CheckCircle2 size={24} color="#ffffff" strokeWidth={3} />
                    </View>
                ) : (
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
                            {active && (
                                <SvgCircle
                                    cx="28"
                                    cy="28"
                                    r="24"
                                    stroke="#f97316"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={`${(0.25 * 2 * Math.PI * 24)} ${2 * Math.PI * 24}`}
                                    strokeLinecap="round"
                                    rotation="-90"
                                    origin="28, 28"
                                />
                            )}
                        </Svg>
                        <View className="absolute inset-x-0 inset-y-0 items-center justify-center">
                            <Text className="text-white font-bold">{progress}</Text>
                        </View>
                    </View>
                )}
            </View>

            <View className="flex-row gap-2 mb-6">
                <InfoBox label="Sets" value={sets} />
                <InfoBox label="Reps" value={reps} />
                <InfoBox label="Rest" value={rest} />
            </View>

            {/* Sets Detail Table */}
            <View className="gap-2">
                {[1, 2, 3].map((set) => (
                    <View key={set} className="bg-zinc-800/50 flex-row items-center justify-between p-4 rounded-xl">
                        <Text className="text-zinc-500 font-bold text-xs uppercase">SET {set}</Text>
                        <Text className="text-zinc-300 font-medium">60kg</Text>
                        <Text className="text-zinc-300 font-medium">12reps</Text>
                        {completed || (active && set === 1) ? (
                            <View className="bg-orange-600 rounded-full p-1">
                                <CheckCircle2 size={16} color="#ffffff" />
                            </View>
                        ) : (
                            <Circle size={24} color="#3f3f46" />
                        )}
                    </View>
                ))}
            </View>

            {active && (
                <TouchableOpacity className="bg-orange-600 py-4 rounded-2xl mt-6 items-center">
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
