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

export interface QuizQuestion {
    id: string;
    question_text: string;
    category: string;
    impact_sim: { value: number, component: string, reset?: string } | null;
    impact_nao: { value: number, component: string, reset?: string } | null;
    display_order: number;
}

export interface QuizAnswer {
    questionId: string;
    answer: boolean;
}

interface ProgressState {
    todayStats: DailyStats | null;
    hasCompletedQuizToday: boolean;
    quizAvailableIn: string;
    isQuizLocked: boolean;
    isLoading: boolean;
    error: string | null;
    quizQuestions: QuizQuestion[];

    fetchQuizQuestions: () => Promise<void>;

    checkQuizStatus: () => Promise<void>;
    fetchTodayStats: () => Promise<void>;
    updateProgress: (updates: Partial<DailyStats>) => Promise<void>;
    incrementPillar: (pillar: keyof DailyStats, amount: number) => Promise<void>;
    submitDailyQuiz: (answers: QuizAnswer[]) => Promise<{ success: boolean; error?: string }>;
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
    quizQuestions: [],

    fetchQuizQuestions: async () => {
        try {
            const { data, error } = await supabase
                .from('daily_quiz_questions')
                .select('*')
                .order('display_order', { ascending: true });
            if (error) throw error;
            if (data) set({ quizQuestions: data });
        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
    },

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
                .eq('quiz_date', technicalDate)
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
        // Testo Formula Weights: NoFap (15%), Treino (20%), Alimentação (15%), Sono (15%), Hidratação (5%), Práticas (10%), Redes (5%), Vícios (5%)
        // The user mentioned this sums to 90%, we will use exactly these fractional weights based on 100 points per progress.
        const total =
            (stats.nofapProgress || 0) * 0.15 +
            (stats.treinoProgress || 0) * 0.20 +
            (stats.alimentacaoProgress || 0) * 0.15 +
            (stats.sonoProgress || 0) * 0.15 +
            (stats.hidratacaoProgress || 0) * 0.05 +
            (stats.praticasProgress || 0) * 0.10 +
            (stats.redesProgress || 0) * 0.05 +
            (stats.viciosProgress || 0) * 0.05;

        return Math.round(total);
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

    submitDailyQuiz: async (answers: QuizAnswer[]) => {
        const { todayStats, updateProgress, checkQuizStatus, quizQuestions } = get();
        if (!todayStats) return { success: false, error: 'Status diário não carregado. Reinicie o app.' };

        const userId = useAuthStore.getState().session?.user?.id;
        if (!userId) return { success: false, error: 'Usuário não autenticado.' };

        const updates: Partial<DailyStats> = { ...todayStats };

        // Helper to apply bounds
        const applyDelta = (current: number, delta: number) => Math.min(Math.max(current + delta, 0), 100);

        // Process dynamic answers based on database configuration
        for (const answer of answers) {
            const question = quizQuestions.find(q => q.id === answer.questionId);
            if (!question) continue;

            const impact = answer.answer ? question.impact_sim : question.impact_nao;

            if (impact) {
                // Determine which pillar to update based on 'component' string
                const targetComp = impact.component;
                let pillarKey: keyof DailyStats | null = null;

                if (targetComp === 'Vícios' || targetComp === 'NoPorn') pillarKey = 'viciosProgress';
                else if (targetComp === 'NoFap') pillarKey = 'nofapProgress';
                else if (targetComp === 'Redes') pillarKey = 'redesProgress';
                else if (targetComp === 'Sono') pillarKey = 'sonoProgress';
                else if (targetComp === 'Hidratação') pillarKey = 'hidratacaoProgress';
                else if (targetComp === 'Alimentação') pillarKey = 'alimentacaoProgress';
                else if (targetComp === 'Treino') pillarKey = 'treinoProgress';
                else if (targetComp === 'Práticas') pillarKey = 'praticasProgress';

                if (pillarKey) {
                    updates[pillarKey] = applyDelta((updates[pillarKey] as number) || 0, impact.value);
                }

                if (impact.reset === 'NoFap') {
                    updates.nofapStreak = 0;
                }
            }

            // Streak logic for Masturbation (Question "Você se masturbou hoje?") 
            // The DB has "reset": "NoFap" in impact_sim for Masturbation.
            // But we need to increment streak if they didn't relapse and the question is the NoFap one
            if (!answer.answer && question.question_text.toLowerCase().includes('masturbou')) {
                const newStreak = (updates.nofapStreak || 0) + 1;
                updates.nofapStreak = newStreak;
                if (newStreak > 7) {
                    updates.nofapProgress = applyDelta(updates.nofapProgress || 0, 1);
                }
            }
        }

        // 1. Insert into daily_quiz_responses FIRST to ensure it's not a duplicate
        try {
            const { error: insertError } = await supabase.from('daily_quiz_responses').insert({
                user_id: userId,
                quiz_date: getTechnicalDate(),
                answers: answers,
                points_earned: 3
            });

            if (insertError) {
                console.error('Error saving quiz responses:', insertError);
                return { success: false, error: `Erro Supabase: ${insertError.message}` };
            }

            // 2. ONLY if insert succeeds, update stats
            await updateProgress(updates);
            await checkQuizStatus();

            // 3. Accountability +3 Activity Points
            await useAuthStore.getState().incrementActivityPoints(3);
            return { success: true };
        } catch (error: any) {
            console.error('Error during quiz submission flow:', error);
            return { success: false, error: `Falha interna: ${error.message}` };
        }
    }
}));
