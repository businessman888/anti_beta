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

            console.log("User data loaded for:", userId);
            console.log("Has Plan:", hasPlan);

            // If onboarded, fetch the full plan data
            if (hasPlan) {
                await usePlanStore.getState().fetchUserPlan(userId);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
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
