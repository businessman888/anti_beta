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

interface QuizAnswers {
    pornography: boolean;
    masturbation: boolean;
    socialMedia: boolean;
    videogames: boolean;
    alcohol: boolean;
    alcoholDrinks?: '1-2' | '3-4' | '5-6' | '7+';
    cigarette: boolean;
    maconha: boolean;
    drugs: boolean;
    sleep: boolean;
    hydration: boolean;
    diet: boolean;
    workout: boolean | null;
    practices: boolean;
}

interface ProgressState {
    todayStats: DailyStats | null;
    hasCompletedQuizToday: boolean;
    quizAvailableIn: string;
    isQuizLocked: boolean;
    isLoading: boolean;
    error: string | null;

    checkQuizStatus: () => Promise<void>;
    fetchTodayStats: () => Promise<void>;
    updateProgress: (updates: Partial<DailyStats>) => Promise<void>;
    incrementPillar: (pillar: keyof DailyStats, amount: number) => Promise<void>;
    submitDailyQuiz: (answers: QuizAnswers) => Promise<void>;
    initializeFromOnboarding: (answers: any) => Promise<void>;
    calculateTestoPoints: (stats: DailyStats) => number;
}

const getTechnicalDate = () => {
    const now = new Date();
    // Vira o dia apenas às 03:00 da manhã
    if (now.getHours() < 3) {
        now.setDate(now.getDate() - 1);
    }
    return now.toISOString().split('T')[0];
};

const getQuizAvailability = () => {
    const now = new Date();
    const target = new Date(now);

    // Se ainda for antes das 3h, o próximo reset é hoje às 3h
    // Se for depois das 3h, o próximo reset é amanhã às 3h
    if (now.getHours() >= 3) {
        target.setDate(target.getDate() + 1);
    }
    target.setHours(3, 0, 0, 0);

    const diffMs = target.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${mins}m`;
};

export const useProgressStore = create<ProgressState>()((set, get) => ({
    todayStats: null,
    hasCompletedQuizToday: false,
    quizAvailableIn: getQuizAvailability(),
    isQuizLocked: true,
    isLoading: false,
    error: null,

    checkQuizStatus: async () => {
        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        const technicalDate = getTechnicalDate();
        set({ quizAvailableIn: getQuizAvailability() });

        try {
            const { data } = await supabase
                .from('daily_quiz_responses')
                .select('id')
                .eq('user_id', userId)
                .eq('date', technicalDate)
                .maybeSingle();

            const isLocked = !!data;
            set({
                hasCompletedQuizToday: isLocked,
                isQuizLocked: isLocked
            });
        } catch (error) {
            console.error('Error checking quiz status:', error);
        }
    },

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
        const technicalDate = getTechnicalDate();

        await get().checkQuizStatus();

        try {
            const { data, error } = await supabase
                .from('daily_stats')
                .select('*')
                .eq('user_id', userId)
                .eq('date', technicalDate)
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
                    date: technicalDate,
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
                        date: technicalDate,
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

        const technicalDate = getTechnicalDate();

        const newStats: DailyStats = {
            userId,
            date: technicalDate,
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
                    date: technicalDate,
                    nofap_streak: initialStreak,
                    nofap_progress: initialProgress,
                    testo_points: newStats.testoPoints,
                }, { onConflict: 'user_id,date' });

            set({ todayStats: newStats });
        } catch (error) {
            console.error('Error initializing daily stats:', error);
        }
    },

    submitDailyQuiz: async (answers: QuizAnswers) => {
        const { todayStats, updateProgress, checkQuizStatus } = get();
        if (!todayStats) return;

        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return;

        const updates: Partial<DailyStats> = { ...todayStats };

        // Helper to apply bounds
        const applyDelta = (current: number, delta: number) => Math.min(Math.max(current + delta, 0), 100);

        // --- VÍCIOS COMPORTAMENTAIS ---
        // Q1: Pornography
        if (answers.pornography) updates.viciosProgress = applyDelta(updates.viciosProgress || 0, -5);

        // Q2: Masturbation
        if (answers.masturbation) {
            updates.nofapStreak = 0;
            updates.nofapProgress = applyDelta(updates.nofapProgress || 0, -10);
        } else {
            const newStreak = (updates.nofapStreak || 0) + 1;
            updates.nofapStreak = newStreak;
            // +1% if streak > 7
            if (newStreak > 7) updates.nofapProgress = applyDelta(updates.nofapProgress || 0, 1);
        }

        // Q3: Redes Sociais
        if (answers.socialMedia) updates.redesProgress = applyDelta(updates.redesProgress || 0, -3);
        else updates.redesProgress = applyDelta(updates.redesProgress || 0, 0.5);

        // Q4: Videogames
        if (answers.videogames) updates.viciosProgress = applyDelta(updates.viciosProgress || 0, -2);

        // --- SUBSTÂNCIAS ---
        // Q5: Álcool
        if (answers.alcohol) {
            let penalty = -4;
            if (answers.alcoholDrinks === '3-4') penalty = -6;
            else if (answers.alcoholDrinks === '5-6') penalty = -8;
            else if (answers.alcoholDrinks === '7+') penalty = -10;
            updates.viciosProgress = applyDelta(updates.viciosProgress || 0, penalty);
        }

        // Q6: Cigarro
        if (answers.cigarette) updates.viciosProgress = applyDelta(updates.viciosProgress || 0, -5);
        else updates.viciosProgress = applyDelta(updates.viciosProgress || 0, 1);

        // Q7: Maconha
        if (answers.maconha) updates.viciosProgress = applyDelta(updates.viciosProgress || 0, -6);

        // Q8: Drogas
        if (answers.drugs) updates.viciosProgress = applyDelta(updates.viciosProgress || 0, -10);

        // --- HÁBITOS BÁSICOS ---
        // Q9: Sono
        if (!answers.sleep) updates.sonoProgress = applyDelta(updates.sonoProgress || 0, -3);

        // Q10: Hidratação
        if (answers.hydration) updates.hidratacaoProgress = applyDelta(updates.hidratacaoProgress || 0, 1);
        else updates.hidratacaoProgress = applyDelta(updates.hidratacaoProgress || 0, -1);

        // Q11: Alimentação
        if (answers.diet) updates.alimentacaoProgress = applyDelta(updates.alimentacaoProgress || 0, 1);
        else updates.alimentacaoProgress = applyDelta(updates.alimentacaoProgress || 0, -2);

        // Q12: Treinamento (Conditional)
        if (answers.workout !== null) {
            if (answers.workout) updates.treinoProgress = applyDelta(updates.treinoProgress || 0, 2);
            else updates.treinoProgress = applyDelta(updates.treinoProgress || 0, -3);
        }

        // Q13: Práticas Testosterona
        if (answers.practices) updates.praticasProgress = applyDelta(updates.praticasProgress || 0, 1);
        else updates.praticasProgress = applyDelta(updates.praticasProgress || 0, -1);

        // 1. Update stats
        await updateProgress(updates);

        // 2. Insert into daily_quiz_responses
        try {
            await supabase.from('daily_quiz_responses').insert({
                user_id: userId,
                date: getTechnicalDate(),
                responses: answers
            });
            await checkQuizStatus();
        } catch (error) {
            console.error('Error saving quiz responses:', error);
        }

        // 3. Accountability +3 Activity Points
        try {
            useAuthStore.getState().incrementActivityPoints(3);
        } catch (e) {
            console.error('Failed to update activity points', e);
        }
    }
}));
