import React from 'react';
import { Dumbbell, Trophy, Flame, Calendar, Users, Target, Activity, Zap, Medal } from 'lucide-react-native';

// Maps the 'icon_key' string from the database to a LucideReact icon component
export const ACHIEVEMENT_ICONS: Record<string, string> = {
    'dumbbell': 'Dumbbell',
    'trophy': 'Trophy',
    'flame': 'Flame',
    'calendar': 'Calendar',
    'users': 'Users',
    'target': 'Target',
    'activity': 'Activity',
    'zap': 'Zap',
    'medal': 'Medal',
};

export const getAchievementIcon = (key: string, size: number = 24, color: string = '#f97316') => {
    let IconComponent = Dumbbell; // Fallback icon

    const IconLibraries = require('lucide-react-native');
    const mappedKey = key ? ACHIEVEMENT_ICONS[key] : undefined;
    
    if (mappedKey && IconLibraries[mappedKey]) {
        IconComponent = IconLibraries[mappedKey] as any;
    }
    
    return <IconComponent size={size} color={color} />;
};
