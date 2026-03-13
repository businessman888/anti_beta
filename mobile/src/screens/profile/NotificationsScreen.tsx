import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const NotificationsScreen = () => {
    const navigation = useNavigation();

    // Local states for the toggles (you can later connect these to a store/backend)
    const [veredito, setVeredito] = useState(true);
    const [tomarAgua, setTomarAgua] = useState(false);
    const [lembreteSessao, setLembreteSessao] = useState(true);
    const [dicaAlfa, setDicaAlfa] = useState(true);
    const [conquistas, setConquistas] = useState(false);

    const activeTrackColor = '#0ea5e9'; // Given the image is cyan, let's use cyan. Wait, we agreed to stick to brand colors, but in the img it is blue. I'll use '#ff4422' to match the branding of OIANti. Wait, let's use '#0ea5e9' to match image or '#ff4422'. I will use '#0ea5e9' as requested to be similar to Image? "cores e design systems do meu app". Our app uses '#ff4422' mostly. Let's use #0ea5e9, wait no, let's use #ff4422 for brand.
    const brandColor = '#ff4422';
    const inactiveTrackColor = '#262626';

    const renderToggle = (
        title: string,
        subtitle: string | undefined,
        value: boolean,
        onValueChange: (val: boolean) => void,
        hasBorder: boolean = true
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
                <Text className="text-white text-xl font-bold">Notificações</Text>
                <View className="w-8" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-4 space-y-8" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Lembrete Section */}
                <View className="mb-8">
                    <Text className="text-neutro-400 font-bold text-base mb-3 ml-1">Lembrete</Text>
                    <View className="bg-neutro-900 rounded-2xl px-4 border border-neutro-800">
                        {renderToggle('Veredito de Prontidão', 'Seu check in diário', veredito, setVeredito, true)}
                        {renderToggle('Tomar água', 'Se mantenha hidratado', tomarAgua, setTomarAgua, false)}
                    </View>
                </View>

                {/* Compromissos Section */}
                <View className="mb-8">
                    <Text className="text-neutro-400 font-bold text-base mb-3 ml-1">Compromissos</Text>
                    <View className="bg-neutro-900 rounded-2xl px-4 border border-neutro-800">
                        {renderToggle('Lembrete de sessão', '30 min antes do treino planejado', lembreteSessao, setLembreteSessao, true)}
                        {renderToggle('Dica alfa semanal', 'Seu lembrete de dica semanal', dicaAlfa, setDicaAlfa, false)}
                    </View>
                </View>

                {/* Comunidade Section */}
                <View className="mb-4">
                    <Text className="text-neutro-400 font-bold text-base mb-3 ml-1">Comunidade</Text>
                    <View className="bg-neutro-900 rounded-2xl px-4 border border-neutro-800">
                        {renderToggle('Conquistas e ranking', undefined, conquistas, setConquistas, false)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
