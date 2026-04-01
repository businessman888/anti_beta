import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { LandingScreen } from '../screens/LandingScreen';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { View, ActivityIndicator } from 'react-native';

import { PlanGeneratedScreen } from '../screens/onboarding/PlanGeneratedScreen';
import { HistoryScreen } from '../screens/content/HistoryScreen';
import { GoalsScreen } from '../screens/goals/GoalsScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { NotificationsScreen } from '../screens/profile/NotificationsScreen';
import { SupportScreen } from '../screens/profile/SupportScreen';
import { ScreenTrackingScreen } from '../screens/profile/ScreenTrackingScreen';

import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Deep linking configuration
const linking = {
    prefixes: ['com.oytotec.antibeta://'],
    config: {
        screens: {
            Auth: 'auth/callback',
        },
    },
};

export const AppNavigator = () => {
    const { session, isLoading, initialize, onboardingCompleted } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

    if (isLoading) {
        return (
            <View className="flex-1 bg-[#09090b] justify-center items-center">
                <ActivityIndicator size="large" color="#f97316" />
            </View>
        );
    }

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#09090b' } }}>
                {session ? (
                    // Authenticated Stack
                    onboardingCompleted ? (
                        <>
                            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                            <Stack.Screen name="History" component={HistoryScreen} />
                            <Stack.Screen name="Goals" component={GoalsScreen} />
                            <Stack.Screen name="Workout" component={require('../screens/workout/WorkoutScreen').WorkoutScreen} />
                            <Stack.Screen name="Achievements" component={require('../screens/missions/AchievementsScreen').AchievementsScreen} />
                            <Stack.Screen name="WeeklyTip" component={require('../screens/home/WeeklyTipScreen').WeeklyTipScreen} />
                            <Stack.Screen name="Profile" component={require('../screens/profile/ProfileScreen').ProfileScreen} />
                            <Stack.Screen name="Agenda" component={require('../screens/workout/AgendaScreen').AgendaScreen} />
                            <Stack.Screen name="DailyQuiz" component={require('../screens/quiz/DailyQuizScreen').DailyQuizScreen} />
                            <Stack.Screen name="AgentAlpha" component={require('../screens/agent/AgentScreen').AgentScreen} />
                            <Stack.Screen name="Notifications" component={NotificationsScreen} />
                            <Stack.Screen name="Support" component={SupportScreen} />
                            <Stack.Screen name="ScreenTracking" component={ScreenTrackingScreen} />
                        </>
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
                        <Stack.Screen name="Auth" component={AuthScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
