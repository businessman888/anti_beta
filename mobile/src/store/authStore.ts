import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    onboardingCompleted: boolean;

    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    setOnboardingCompleted: (completed: boolean) => void;
    signOut: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    isLoading: true,
    onboardingCompleted: false, // Default to false, logic to update this will be added later

    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

    signOut: async () => {
        await supabase.auth.signOut();
        set({ session: null, user: null });
    },

    initialize: async () => {
        set({ isLoading: true });
        try {
            const { data: { session } } = await supabase.auth.getSession();
            set({ session, user: session?.user ?? null });

            if (session) {
                // Check for onboarding completion (placeholder for now)
                // In a real scenario, fetch user profile/status from backend
                console.log("Session found, user:", session.user.email);
            }
        } catch (error) {
            console.error("Auth initialization error:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
