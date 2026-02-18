import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { LandingScreen } from '../screens/LandingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { View, ActivityIndicator } from 'react-native';

import { PlanGeneratedScreen } from '../screens/onboarding/PlanGeneratedScreen';

import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const { session, isLoading, initialize, onboardingCompleted } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

    if (isLoading) {
        return (
            <View className="flex-1 bg-zinc-950 justify-center items-center">
                <ActivityIndicator size="large" color="#dc2626" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#09090b' } }}>
                {session ? (
                    // Authenticated Stack
                    onboardingCompleted ? (
                        <Stack.Screen name="Home" component={HomeScreen} />
                    ) : (
                        <>
                            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                            <Stack.Screen name="PlanGenerated" component={PlanGeneratedScreen} />
                        </>
                    )
                ) : (
                    // Public Stack
                    <>
                        <Stack.Screen name="Landing" component={LandingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
