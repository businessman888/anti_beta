import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { profileService, UserProfile } from '../services/profileService';
import { planService } from '../services/api/planService';
import { usePlanStore } from './planStore';

interface AuthState {
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    isLoading: boolean;
    onboardingCompleted: boolean;

    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    setOnboardingCompleted: (completed: boolean) => void;
    refreshProfile: () => Promise<void>;
    loadUserData: (userId: string) => Promise<void>;
    signOut: () => Promise<void>;
    initialize: () => Promise<void>;
    incrementActivityPoints: (points: number) => Promise<void>;
    ensureUserProfile: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    session: null,
    user: null,
    profile: null,
    isLoading: true,
    onboardingCompleted: false, // Default to false, logic to update this will be added later

    setSession: (session) => {
        const user = session?.user ?? null;
        set({ session, user });
        if (user) {
            get().loadUserData(user.id);
        }
    },
    setUser: (user) => {
        set({ user });
        if (user) {
            get().loadUserData(user.id);
        }
    },
    setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

    refreshProfile: async () => {
        const user = get().user;
        if (!user) return;

        const profile = await profileService.getProfile(user.id);
        if (profile) {
            set({ profile });
        }
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null, profile: null, onboardingCompleted: false });
    },

    incrementActivityPoints: async (points: number) => {
        const { user } = get();
        if (!user) return;
        try {
            // Atomic increment: fetch current, add, update
            const { data } = await supabase
                .from('user_profiles')
                .select('activityPoints')
                .eq('userId', user.id)
                .maybeSingle();

            if (!data) {
                // Ensure profile exists first
                await get().ensureUserProfile(user.id);
                // Then try again
                await supabase
                    .from('user_profiles')
                    .update({ activityPoints: points })
                    .eq('userId', user.id);
            } else {
                const currentPoints = data?.activityPoints || 0;
                await supabase
                    .from('user_profiles')
                    .update({ activityPoints: currentPoints + points })
                    .eq('userId', user.id);
            }
        } catch (error) {
            console.error('Error incrementing activity points:', error);
        }
    },

    ensureUserProfile: async (userId: string) => {
        try {
            // Check if user_profiles record already exists
            const { data: existing } = await supabase
                .from('user_profiles')
                .select('id')
                .eq('userId', userId)
                .maybeSingle();

            if (existing) return; // Already exists

            // Get the user's creation date from profiles table to determine cohort
            const { data: profileData } = await supabase
                .from('profiles')
                .select('created_at')
                .eq('id', userId)
                .maybeSingle();

            const createdAt = profileData?.created_at ? new Date(profileData.created_at) : new Date();
            const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            const cohort = `${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}`;

            // Get today's testo_points from daily_stats
            const today = new Date().toISOString().split('T')[0];
            const { data: statsData } = await supabase
                .from('daily_stats')
                .select('testo_points')
                .eq('user_id', userId)
                .eq('date', today)
                .maybeSingle();

            const testoLevel = statsData?.testo_points || 0;

            // Create the user_profiles record
            await supabase
                .from('user_profiles')
                .insert({
                    id: userId, // Use same ID
                    userId: userId,
                    cohort,
                    activityPoints: 0,
                    testoLevel,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                });

            console.log('[AuthStore] Created user_profiles record for:', userId, 'cohort:', cohort);
        } catch (error) {
            console.error('[AuthStore] Error ensuring user profile:', error);
        }
    },

    loadUserData: async (userId: string) => {
        set({ isLoading: true });
        try {
            // Load profile and plan status in parallel for efficiency
            const [profile, statusResponse] = await Promise.all([
                profileService.getProfile(userId),
                planService.getPlanStatus(userId).catch(() => ({ data: { hasPlan: false } }))
            ]);

            const hasPlan = statusResponse.data?.hasPlan ?? false;

            if (profile) set({ profile });
            set({ onboardingCompleted: hasPlan });

            // Ensure user_profiles record exists for ranking
            await get().ensureUserProfile(userId);

            console.log("[AuthStore] User data loaded for:", userId);
            console.log("[AuthStore] Has Plan:", hasPlan);

            // If onboarded, fetch the full plan data
            if (hasPlan) {
                try {
                    await usePlanStore.getState().fetchUserPlan(userId);
                } catch (planError) {
                    console.error("[AuthStore] Error fetching plan data:", planError);
                }
            }
        } catch (error) {
            console.error("[AuthStore] Error loading user data:", error);
            set({ onboardingCompleted: false });
        } finally {
            set({ isLoading: false });
        }
    },

    initialize: async () => {
        set({ isLoading: true });
        try {
            const { data: { session } } = await supabase.auth.getSession();
            set({ session, user: session?.user ?? null });

            if (session) {
                await get().loadUserData(session.user.id);
            }
        } catch (error) {
            console.error("Auth initialization error:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
