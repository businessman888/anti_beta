import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react-native';

export const WeeklyGoalsView = () => {
    return (
        <View className="flex-1">
            {/* Completed Week - Semana 1 */}
            <View className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4">
                <View className="flex-row justify-between items-start mb-4">
                    <View>
                        <Text className="text-white text-2xl font-bold">Semana 1</Text>
                        <Text className="text-emerald-500 font-bold mt-1">Concluído</Text>
                    </View>
                    <CheckCircle2 size={32} color="#10b981" />
                </View>

                <View className="mt-4">
                    <View className="h-1.5 bg-emerald-500 rounded-full w-full" />
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-zinc-500 text-[10px] font-bold">100%</Text>
                        <Text className="text-zinc-500 text-[10px] font-bold">07/02</Text>
                    </View>
                </View>
            </View>

            {/* In Progress Week - Semana 2 */}
            <TouchableOpacity
                activeOpacity={0.7}
                className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4"
            >
                <View className="flex-row justify-between items-start mb-4">
                    <View>
                        <Text className="text-white text-2xl font-bold">Semana 2</Text>
                        <Text className="text-orange-600 font-bold mt-1">Em andamento</Text>
                    </View>
                    <ChevronRight size={32} color="#f97316" />
                </View>

                <View className="mt-4">
                    <View className="h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                        <View className="h-full bg-orange-600 rounded-full w-[71%]" />
                    </View>
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-zinc-500 text-[10px] font-bold">71%</Text>
                        <Text className="text-zinc-500 text-[10px] font-bold">3 Dias restantes</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Locked Card - Following Figma design exactly */}
            <View className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-6 mb-4 opacity-40">
                <View className="flex-row justify-between items-start mb-4">
                    <View>
                        <Text className="text-zinc-500 text-2xl font-bold">MAR</Text>
                        <Text className="text-zinc-600 font-bold mt-1">Bloqueado</Text>
                    </View>
                    <Lock size={32} color="#3f3f46" />
                </View>
                <View className="h-1 bg-zinc-800/30 rounded-full w-full" />
            </View>
        </View>
    );
};
