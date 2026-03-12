import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: string;
    icon_key: string;
    pontos_recompensa: number;
    condicao_desbloqueio: any; // jsonb
    created_at: string;
}

interface AchievementsState {
    allAchievements: Achievement[];
    unlockedAchievementIds: string[];
    isLoading: boolean;
    stats: {
        total: number;
        unlocked: number;
        percentage: number;
    };
    fetchAchievements: () => Promise<void>;
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
    allAchievements: [],
    unlockedAchievementIds: [],
    isLoading: false,
    stats: {
        total: 0,
        unlocked: 0,
        percentage: 0,
    },
    fetchAchievements: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true });

        try {
            // 1. Fetch all achievements from the system
            const { data: achievementsData, error: achievementsError } = await supabase
                .from('achievements')
                .select('*')
                .order('created_at', { ascending: true });

            console.log('--- DB ACHIEVEMENTS DATA ---', achievementsData);

            if (achievementsError) throw achievementsError;

            // 2. Fetch the current user's unlocked achievements
            const { data: userAchievementsData, error: userAchievementsError } = await supabase
                .from('user_achievements')
                .select('achievement_id')
                .eq('user_id', String(user.id));

            if (userAchievementsError) throw userAchievementsError;

            const allAchievements = achievementsData as Achievement[] || [];
            const unlockedIds = userAchievementsData?.map(ua => String(ua.achievement_id)) || [];
            const total = allAchievements.length;
            const unlocked = unlockedIds.length;
            const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

            set({
                allAchievements,
                unlockedAchievementIds: unlockedIds,
                stats: {
                    total,
                    unlocked,
                    percentage,
                },
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch achievements:', error);
            // On error we silently fail the UI but stop loading
            set({ isLoading: false });
        }
    },
}));
