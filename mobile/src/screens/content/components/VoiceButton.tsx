import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export const VoiceButton = () => {
    return (
        <View className="items-center justify-center mt-12 mb-8">
            <TouchableOpacity
                activeOpacity={0.7}
                className="w-32 h-32 rounded-full border border-zinc-700 items-center justify-center bg-zinc-950"
            >
                <View className="flex-row items-center justify-center space-x-1">
                    <View className="w-1.5 h-6 bg-zinc-500 rounded-full mx-0.5" />
                    <View className="w-1.5 h-10 bg-zinc-300 rounded-full mx-0.5" />
                    <View className="w-1.5 h-5 bg-zinc-500 rounded-full mx-0.5" />
                    <View className="w-1.5 h-8 bg-zinc-400 rounded-full mx-0.5" />
                    <View className="w-1.5 h-6 bg-zinc-500 rounded-full mx-0.5" />
                </View>
            </TouchableOpacity>
        </View>
    );
};
