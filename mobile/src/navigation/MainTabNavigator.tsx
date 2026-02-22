import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MissionsScreen } from '../screens/missions/MissionsScreen';
import { AIContentScreen } from '../screens/content/AIContentScreen';
import { ScannerAlphaScreen } from '../screens/scanner/ScannerAlphaScreen';
import { TestoScreen } from '../screens/testo/TestoScreen';
import { MainTabParamList } from '../types/navigation';
import { Home, Trophy, Mic, Scan, Flame } from 'lucide-react-native';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#09090b',
                    borderTopWidth: 1,
                    borderTopColor: '#27272a',
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#f97316',
                tabBarInactiveTintColor: '#71717a',
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') return <Home size={size} color={color} />;
                    if (route.name === 'Missions') return <Trophy size={size} color={color} />;
                    if (route.name === 'AIContent') return <Mic size={size} color={color} />;
                    if (route.name === 'ScannerAlpha') return <Scan size={size} color={color} />;
                    if (route.name === 'Testo') return <Flame size={size} color={color} />;
                    return null;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Missions" component={MissionsScreen} />
            <Tab.Screen name="AIContent" component={AIContentScreen} />
            <Tab.Screen name="ScannerAlpha" component={ScannerAlphaScreen} />
            <Tab.Screen name="Testo" component={TestoScreen} />
        </Tab.Navigator>
    );
};
