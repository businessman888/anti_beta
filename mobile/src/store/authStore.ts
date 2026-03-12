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
    uploadAvatar: (imageUri: string) => Promise<string | null>;
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

    uploadAvatar: async (imageUri: string) => {
        const { user } = get();
        if (!user) return null;
        
        try {
            console.log('[AuthStore] Iniciando upload para URI:', imageUri);
            
            // 1. Convert local image URI to a real binary Blob via fetch
            const response = await fetch(imageUri);
            const blob = await response.blob();
            console.log('Tipo do objeto:', typeof blob, blob instanceof Blob);
            console.log('Tamanho real do blob:', blob.size);

            if (blob.size === 0) {
                throw new Error('Falha na conversão: Blob vazio');
            }

            const filePath = `${user.id}/profile.jpg`;
            
            // 2. Upload to Supabase Storage avatars bucket
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, blob, {
                    contentType: 'image/jpeg',
                    upsert: true,
                    cacheControl: '3600'
                });

            if (uploadError) {
                console.error('[AuthStore] Upload error:', uploadError);
                throw uploadError;
            }

            console.log('[AuthStore] Upload data:', uploadData);
                
            // 4. Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);
                
            console.log('[AuthStore] Avatar uploaded successfully. Generated URL:', publicUrl);
                
            // 5. Update exclusively the profiles table with the clean URL (ends with .jpg)
            const { error: profileUpdateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            if (profileUpdateError) {
                console.error('[AuthStore] profiles update error:', profileUpdateError);
            }
            
            // 6. Update local state immediately with a timestamp to bust UI cache instantly
            const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;
            const currentProfile = get().profile;
            if (currentProfile) {
                set({ profile: { ...currentProfile, avatar_url: urlWithTimestamp } });
            }
            
            return publicUrl;
        } catch (error) {
            console.error('[AuthStore] Error in uploadAvatar:', error);
            return null;
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
