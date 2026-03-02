import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface RankingUser {
    id: string;
    name: string;
    score: number;
    rank: number;
    avatar: string;
    streak: number;
    activityPoints: number;
    testoLevel: number;
}

interface RankingState {
    podium: RankingUser[];
    list: RankingUser[];
    currentUser: RankingUser | null;
    competitorCount: number;
    cohortName: string;
    isLoading: boolean;
    error: string | null;

    fetchCohortRanking: () => Promise<void>;
    fetchGlobalRanking: () => Promise<void>;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop';

export const useRankingStore = create<RankingState>()((set, get) => ({
    podium: [],
    list: [],
    currentUser: null,
    competitorCount: 0,
    cohortName: '',
    isLoading: false,
    error: null,

    fetchCohortRanking: async () => {
        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        set({ isLoading: true, error: null });

        try {
            // 1. Get current user's cohort
            const { data: myProfile } = await supabase
                .from('user_profiles')
                .select('cohort')
                .eq('userId', userId)
                .maybeSingle();

            const cohort = myProfile?.cohort || '';
            if (!cohort) {
                set({ isLoading: false, cohortName: '', podium: [], list: [], currentUser: null, competitorCount: 0 });
                return;
            }

            set({ cohortName: cohort });

            // 2. Get all users in same cohort with their profile data
            const { data: cohortUsers, error } = await supabase
                .from('user_profiles')
                .select('userId, activityPoints, testoLevel, cohort')
                .eq('cohort', cohort);

            if (error) throw error;
            if (!cohortUsers || cohortUsers.length === 0) {
                set({ isLoading: false, podium: [], list: [], currentUser: null, competitorCount: 0 });
                return;
            }

            // 3. Get profiles for names and avatars
            const userIds = cohortUsers.map(u => u.userId);
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url, email')
                .in('id', userIds);

            // 4. Get nofap_streak from latest daily_stats for each user
            const { data: streaksData } = await supabase
                .from('daily_stats')
                .select('user_id, nofap_streak, date')
                .in('user_id', userIds)
                .order('date', { ascending: false });

            // Group by user and get the latest streak
            const streakMap: Record<string, number> = {};
            if (streaksData) {
                for (const s of streaksData) {
                    if (!streakMap[s.user_id]) {
                        streakMap[s.user_id] = s.nofap_streak || 0;
                    }
                }
            }

            // 5. Calculate ranking scores
            const maxPoints = Math.max(...cohortUsers.map(u => u.activityPoints || 0), 1);

            const rankedUsers = cohortUsers.map(u => {
                const profile = profiles?.find(p => p.id === u.userId);
                const testoScore = (u.testoLevel || 0) * 0.6;
                const pointsScore = ((u.activityPoints || 0) / maxPoints) * 100 * 0.4;
                const totalScore = Math.round((testoScore + pointsScore) * 10) / 10;

                // Determine display name
                let displayName = 'Anônimo';
                if (profile?.full_name) {
                    displayName = profile.full_name;
                } else if (profile?.email) {
                    displayName = profile.email.split('@')[0];
                }

                return {
                    id: u.userId,
                    name: displayName,
                    score: totalScore,
                    rank: 0, // will be assigned after sorting
                    avatar: profile?.avatar_url || DEFAULT_AVATAR,
                    streak: streakMap[u.userId] || 0,
                    activityPoints: u.activityPoints || 0,
                    testoLevel: u.testoLevel || 0,
                };
            });

            // 6. Sort by score descending and assign ranks
            rankedUsers.sort((a, b) => b.score - a.score);
            rankedUsers.forEach((u, index) => {
                u.rank = index + 1;
            });

            // 7. Split into podium (top 3) and list (4+)
            const podium = rankedUsers.slice(0, 3);
            const list = rankedUsers.slice(3, 10); // positions 4-10

            // 8. Find current user
            const currentUser = rankedUsers.find(u => u.id === userId) || null;

            set({
                podium,
                list,
                currentUser,
                competitorCount: rankedUsers.length,
                isLoading: false,
            });
        } catch (error: any) {
            console.error('Error fetching cohort ranking:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    fetchGlobalRanking: async () => {
        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        set({ isLoading: true, error: null });

        try {
            // 1. Get ALL users
            const { data: allUsers, error } = await supabase
                .from('user_profiles')
                .select('userId, activityPoints, testoLevel, cohort');

            if (error) throw error;
            if (!allUsers || allUsers.length === 0) {
                set({ isLoading: false, podium: [], list: [], currentUser: null, competitorCount: 0, cohortName: 'Global' });
                return;
            }

            // 2. Get profiles
            const userIds = allUsers.map(u => u.userId);
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url, email')
                .in('id', userIds);

            // 3. Get streaks
            const { data: streaksData } = await supabase
                .from('daily_stats')
                .select('user_id, nofap_streak, date')
                .in('user_id', userIds)
                .order('date', { ascending: false });

            const streakMap: Record<string, number> = {};
            if (streaksData) {
                for (const s of streaksData) {
                    if (!streakMap[s.user_id]) {
                        streakMap[s.user_id] = s.nofap_streak || 0;
                    }
                }
            }

            // 4. Calculate scores
            const maxPoints = Math.max(...allUsers.map(u => u.activityPoints || 0), 1);

            const rankedUsers = allUsers.map(u => {
                const profile = profiles?.find(p => p.id === u.userId);
                const testoScore = (u.testoLevel || 0) * 0.6;
                const pointsScore = ((u.activityPoints || 0) / maxPoints) * 100 * 0.4;
                const totalScore = Math.round((testoScore + pointsScore) * 10) / 10;

                let displayName = 'Anônimo';
                if (profile?.full_name) {
                    displayName = profile.full_name;
                } else if (profile?.email) {
                    displayName = profile.email.split('@')[0];
                }

                return {
                    id: u.userId,
                    name: displayName,
                    score: totalScore,
                    rank: 0,
                    avatar: profile?.avatar_url || DEFAULT_AVATAR,
                    streak: streakMap[u.userId] || 0,
                    activityPoints: u.activityPoints || 0,
                    testoLevel: u.testoLevel || 0,
                };
            });

            // 5. Sort and rank
            rankedUsers.sort((a, b) => b.score - a.score);
            rankedUsers.forEach((u, index) => {
                u.rank = index + 1;
            });

            const podium = rankedUsers.slice(0, 3);
            const list = rankedUsers.slice(3, 10);
            const currentUser = rankedUsers.find(u => u.id === userId) || null;

            set({
                podium,
                list,
                currentUser,
                competitorCount: rankedUsers.length,
                cohortName: 'Global',
                isLoading: false,
            });
        } catch (error: any) {
            console.error('Error fetching global ranking:', error);
            set({ error: error.message, isLoading: false });
        }
    },
}));
