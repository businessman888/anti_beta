import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, Lock } from 'lucide-react-native';

export const AnnualGoalsView = () => {
    return (
        <View className="flex-1">
            {/* Active Year Card - 2025 */}
            <TouchableOpacity
                activeOpacity={0.7}
                className="bg-zinc-900/40 border border-orange-600/50 rounded-[40px] p-8 mb-6"
            >
                <View className="flex-row justify-between items-start mb-2">
                    <View>
                        <Text className="text-orange-600 text-3xl font-bold">2025</Text>
                        <Text className="text-zinc-400 text-sm italic mt-1 leading-5">
                            "Transformar corpo e mentalidade"
                        </Text>
                    </View>
                    <ChevronRight size={32} color="#f97316" className="mt-1" />
                </View>

                <View className="mt-8 mb-8">
                    <View className="flex-row justify-between items-end mb-3">
                        <Text className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Progresso anual</Text>
                        <Text className="text-orange-600 text-xs font-bold uppercase tracking-widest">67% COMPLETO</Text>
                    </View>
                    <View className="h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                        <View className="h-full bg-orange-600 rounded-full w-[67%]" />
                    </View>
                </View>

                <View className="flex-row gap-4">
                    <View className="flex-1 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-4">
                        <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Milestones</Text>
                        <Text className="text-orange-600 text-xl font-bold">08/12</Text>
                    </View>
                    <View className="flex-1 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-4">
                        <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Consistência</Text>
                        <Text className="text-orange-600 text-xl font-bold">94%</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Locked Year Card - 2026 */}
            <View className="bg-zinc-900/20 border border-zinc-800/30 rounded-3xl p-8 mb-6 opacity-40">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-zinc-500 text-3xl font-bold">2026</Text>
                        <Text className="text-zinc-600 text-sm mt-1">Bloqueado</Text>
                    </View>
                    <Lock size={28} color="#3f3f46" />
                </View>
                <View className="h-1 bg-zinc-800/30 rounded-full w-full" />
            </View>

            {/* Locked Year Card - 2027 */}
            <View className="bg-zinc-900/20 border border-zinc-800/30 rounded-3xl p-8 mb-6 opacity-40">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-zinc-500 text-3xl font-bold">2027</Text>
                        <Text className="text-zinc-600 text-sm mt-1">Bloqueado</Text>
                    </View>
                    <Lock size={28} color="#3f3f46" />
                </View>
                <View className="h-1 bg-zinc-800/30 rounded-full w-full" />
            </View>
        </View>
    );
};
