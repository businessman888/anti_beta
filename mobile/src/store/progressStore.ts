import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface DailyStats {
    id?: string;
    userId: string;
    date: string;
    nofapProgress: number;
    nofapStreak: number;
    treinoProgress: number;
    alimentacaoProgress: number;
    sonoProgress: number;
    hidratacaoProgress: number;
    praticasProgress: number;
    redesProgress: number;
    viciosProgress: number;
    testoPoints: number;
}

interface ProgressState {
    todayStats: DailyStats | null;
    isLoading: boolean;
    error: string | null;

    fetchTodayStats: () => Promise<void>;
    updateProgress: (updates: Partial<DailyStats>) => Promise<void>;
    incrementPillar: (pillar: keyof DailyStats, amount: number) => Promise<void>;
    submitDailyQuiz: (answers: any) => Promise<void>;
    initializeFromOnboarding: (answers: any) => Promise<void>;
    calculateTestoPoints: (stats: DailyStats) => number;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useProgressStore = create<ProgressState>()((set, get) => ({
    todayStats: null,
    isLoading: false,
    error: null,

    calculateTestoPoints: (stats: DailyStats) => {
        // Average of the 8 pillars
        const total =
            (stats.nofapProgress || 0) +
            (stats.treinoProgress || 0) +
            (stats.alimentacaoProgress || 0) +
            (stats.sonoProgress || 0) +
            (stats.hidratacaoProgress || 0) +
            (stats.praticasProgress || 0) +
            (stats.redesProgress || 0) +
            (stats.viciosProgress || 0);

        return Math.round(total / 8);
    },

    fetchTodayStats: async () => {
        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        set({ isLoading: true, error: null });
        const today = getTodayString();

        try {
            const { data, error } = await supabase
                .from('daily_stats')
                .select('*')
                .eq('user_id', userId)
                .eq('date', today)
                .maybeSingle();

            if (error) throw error;

            if (data) {
                // Map snake_case to camelCase
                const stats: DailyStats = {
                    id: data.id,
                    userId: data.user_id,
                    date: data.date,
                    nofapProgress: data.nofap_progress,
                    nofapStreak: data.nofap_streak,
                    treinoProgress: data.treino_progress,
                    alimentacaoProgress: data.alimentacao_progress,
                    sonoProgress: data.sono_progress,
                    hidratacaoProgress: data.hidratacao_progress,
                    praticasProgress: data.praticas_progress,
                    redesProgress: data.redes_progress,
                    viciosProgress: data.vicios_progress,
                    testoPoints: data.testo_points,
                };
                set({ todayStats: stats });
            } else {
                // Fetch yesterday's streak if today doesn't exist yet
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                const { data: yData } = await supabase
                    .from('daily_stats')
                    .select('nofap_streak')
                    .eq('user_id', userId)
                    .eq('date', yesterdayStr)
                    .maybeSingle();

                const lastStreak = yData?.nofap_streak || 0;
                const newNofapProgress = Math.min(((lastStreak) / 90) * 100, 100);

                const newStats: DailyStats = {
                    userId,
                    date: today,
                    nofapProgress: newNofapProgress,
                    nofapStreak: lastStreak, // Inherit yesterday's streak initially, updated in Quiz
                    treinoProgress: 0,
                    alimentacaoProgress: 0,
                    sonoProgress: 0,
                    hidratacaoProgress: 0,
                    praticasProgress: 0,
                    redesProgress: 0,
                    viciosProgress: 0,
                    testoPoints: Math.round(newNofapProgress / 8), // Initial points
                };

                // Create today's record
                const { data: inserted, error: insertError } = await supabase
                    .from('daily_stats')
                    .insert({
                        user_id: userId,
                        date: today,
                        nofap_progress: newStats.nofapProgress,
                        nofap_streak: newStats.nofapStreak,
                        testo_points: newStats.testoPoints,
                    })
                    .select()
                    .single();

                if (insertError) throw insertError;

                newStats.id = inserted.id;
                set({ todayStats: newStats });
            }
        } catch (error: any) {
            console.error('Error fetching daily stats:', error);
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    updateProgress: async (updates: Partial<DailyStats>) => {
        const { todayStats, calculateTestoPoints } = get();
        if (!todayStats) return;

        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        const newStats = { ...todayStats, ...updates };
        const newPoints = calculateTestoPoints(newStats);
        newStats.testoPoints = newPoints;

        // Optimistic UI update
        set({ todayStats: newStats });

        try {
            const snakeCaseUpdates = {
                ...(updates.nofapProgress !== undefined && { nofap_progress: updates.nofapProgress }),
                ...(updates.nofapStreak !== undefined && { nofap_streak: updates.nofapStreak }),
                ...(updates.treinoProgress !== undefined && { treino_progress: updates.treinoProgress }),
                ...(updates.alimentacaoProgress !== undefined && { alimentacao_progress: updates.alimentacaoProgress }),
                ...(updates.sonoProgress !== undefined && { sono_progress: updates.sonoProgress }),
                ...(updates.hidratacaoProgress !== undefined && { hidratacao_progress: updates.hidratacaoProgress }),
                ...(updates.praticasProgress !== undefined && { praticas_progress: updates.praticasProgress }),
                ...(updates.redesProgress !== undefined && { redes_progress: updates.redesProgress }),
                ...(updates.viciosProgress !== undefined && { vicios_progress: updates.viciosProgress }),
                testo_points: newPoints,
            };

            await supabase
                .from('daily_stats')
                .update(snakeCaseUpdates)
                .eq('id', todayStats.id);
        } catch (error) {
            console.error('Error updating daily stats:', error);
            // Revert on error could be implemented here
        }
    },

    incrementPillar: async (pillar: keyof DailyStats, amount: number) => {
        const { todayStats, updateProgress } = get();
        if (!todayStats) return;

        const currentValue = (todayStats[pillar] as number) || 0;
        const newValue = Math.min(currentValue + amount, 100);

        await updateProgress({ [pillar]: newValue });
    },

    initializeFromOnboarding: async (answers: any) => {
        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        // Calculate initial NoFap streak based on frequency
        let initialStreak = 0;
        const pornFreq = answers.pornographyFrequency;
        const mastFreq = answers.masturbationFrequency;

        // Simple heuristic: if never/rarely -> higher streak assumption
        if (pornFreq === 'nunca' && mastFreq === 'nunca') initialStreak = 30; // 30 days head start
        else if (pornFreq === 'ocasionalmente') initialStreak = 10;
        else if (pornFreq === 'semanalmente') initialStreak = 3;
        else initialStreak = 0; // daily or multiple times

        const initialProgress = Math.min((initialStreak / 90) * 100, 100);

        const today = getTodayString();

        const newStats: DailyStats = {
            userId,
            date: today,
            nofapStreak: initialStreak,
            nofapProgress: initialProgress,
            treinoProgress: 0,
            alimentacaoProgress: 0,
            sonoProgress: 0,
            hidratacaoProgress: 0,
            praticasProgress: 0,
            redesProgress: 0,
            viciosProgress: 0,
            testoPoints: Math.round(initialProgress / 8),
        };

        try {
            await supabase
                .from('daily_stats')
                .upsert({
                    user_id: userId,
                    date: today,
                    nofap_streak: initialStreak,
                    nofap_progress: initialProgress,
                    testo_points: newStats.testoPoints,
                }, { onConflict: 'user_id,date' });

            set({ todayStats: newStats });
        } catch (error) {
            console.error('Error initializing daily stats:', error);
        }
    },

    submitDailyQuiz: async (answers: any) => {
        const { todayStats, updateProgress } = get();
        if (!todayStats) return;

        const updates: Partial<DailyStats> = {};

        // Q1: NoFap (Did you consume porn or masturbate?)
        if (answers.relapsed) {
            updates.nofapStreak = 0;
            updates.nofapProgress = 0;
        } else {
            const newStreak = todayStats.nofapStreak + 1;
            updates.nofapStreak = newStreak;
            updates.nofapProgress = Math.min((newStreak / 90) * 100, 100);
        }

        // Q2: Sleep Hours
        const hours = parseFloat(answers.sleepHours) || 0;
        if (hours >= 7 && hours <= 9) updates.sonoProgress = 100;
        else if (hours >= 6 || hours <= 10) updates.sonoProgress = 70;
        else updates.sonoProgress = 30;

        // Q3: Social Media
        const smTime = answers.socialMediaTime;
        if (smTime === 'menos_1h') updates.redesProgress = 100;
        else if (smTime === '1_2h') updates.redesProgress = 80;
        else if (smTime === '3_4h') updates.redesProgress = 40;
        else updates.redesProgress = 10;

        // Q4: Vices (Substances, Alcohol)
        if (answers.usedVices) updates.viciosProgress = 0;
        else updates.viciosProgress = 100;

        // Q5: Practices/Meditation
        if (answers.didPractices) updates.praticasProgress = 100;
        else updates.praticasProgress = 0;

        await updateProgress(updates);
    }
}));
