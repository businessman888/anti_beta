import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

export const LandingScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-zinc-950 justify-between p-6">
            <View className="flex-1 justify-center items-center">
                {/* Placeholder for Logo */}
                <View className="w-32 h-32 bg-red-600 rounded-full items-center justify-center mb-8">
                    <Text className="text-white text-4xl font-bold">AB</Text>
                </View>

                <Text className="text-white text-3xl font-bold text-center mb-2">
                    AntiBeta
                </Text>
                <Text className="text-zinc-400 text-center text-lg px-4">
                    Transforme sua vida através da disciplina e autoconhecimento.
                </Text>
            </View>

            <View className="w-full gap-4 mb-4">
                <Button
                    title="Iniciar Transformação"
                    onPress={() => navigation.navigate('SignUp')}
                />
                <Button
                    title="Já sou um membro"
                    variant="outline"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </SafeAreaView>
    );
};
