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
        <SafeAreaView className="flex-1 bg-carbono-950 justify-between">
            <View className="flex-1 items-center justify-center px-6">
                {/* Logo Section */}
                <View className="items-center mb-12">
                    <Image
                        source={require('../../assets/images/beta-removebg-preview.png')}
                        className="w-48 h-48 mb-6"
                        resizeMode="contain"
                    />
                </View>

                {/* Text Content */}
                <View className="items-center">
                    <Text className="text-zinc-200 text-center text-lg font-medium leading-relaxed">
                        Para você que está cansado{'\n'}
                        de ser beta e
                    </Text>
                    <Text className="text-brasa-500 text-center text-lg font-bold mt-1">
                        Não sobrar nada
                    </Text>
                </View>

                {/* Pagination Dots (Visual Only - Static based on image) */}
                <View className="flex-row gap-2 mt-12">
                    <View className="w-8 h-2 rounded-full bg-brasa-500" />
                    <View className="w-2 h-2 rounded-full bg-zinc-600" />
                </View>
            </View>

            {/* Bottom Buttons */}
            <View className="w-full px-6 pb-8">
                <View className="mb-4">
                    <Button
                        title="Iniciar Transformação"
                        onPress={() => navigation.navigate('SignUp')}
                        variant="primary"
                    />
                </View>
                <View>
                    <Button
                        title="Já sou um membro"
                        variant="outline"
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
