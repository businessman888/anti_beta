import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const ScreenTrackingScreen = () => {
    const navigation = useNavigation();

    // Local state for the toggle
    const [scrollingTracking, setScrollingTracking] = useState(true);

    const brandColor = '#ff4422';
    const inactiveTrackColor = '#262626';

    const renderToggle = (
        title: string,
        subtitle: string | undefined,
        value: boolean,
        onValueChange: (val: boolean) => void,
        hasBorder: boolean = false
    ) => (
        <View>
            <View className={`flex-row items-center justify-between py-4`}>
                <View className="flex-1 pr-4">
                    <Text className="text-white font-bold text-base">{title}</Text>
                    {subtitle && (
                        <Text className="text-neutro-500 text-sm mt-1 leading-5">{subtitle}</Text>
                    )}
                </View>
                <Switch
                    trackColor={{ false: inactiveTrackColor, true: brandColor }}
                    thumbColor="#fff"
                    ios_backgroundColor={inactiveTrackColor}
                    onValueChange={onValueChange}
                    value={value}
                />
            </View>
            {hasBorder && <View className="h-[1px] bg-neutro-800 w-full" />}
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-carbono-950">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Tracking de Tela</Text>
                <View className="w-8" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Description / Header Icon optional */}
                <View className="bg-[#ff4422]/10 w-16 h-16 rounded-full items-center justify-center mb-6 self-start">
                    <Clock size={32} color="#ff4422" />
                </View>
                
                <Text className="text-white font-bold text-2xl mb-2">Monitoramento Ativo</Text>
                <Text className="text-neutro-400 text-base mb-8 leading-6">
                    Acompanhe e restrinja o seu tempo de uso em redes sociais.
                </Text>

                {/* Notifications Card */}
                <View className="bg-neutro-900 rounded-2xl px-4 border border-neutro-800">
                    {renderToggle(
                        'Trackear tempo de scrolling', 
                        'Isso mede quanto tempo você fica em apps como tiktok e instagram e emite um alerta', 
                        scrollingTracking, 
                        setScrollingTracking, 
                        false
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
