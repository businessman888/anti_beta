import { create } from 'zustand';
import { planService } from '../services/api/planService';

export interface PlanTask {
    categoria: string;
    titulo: string;
    descricao: string;
    concluida: boolean;
}

export interface PlanWorkout {
    titulo: string;
    exercicios: number;
    duracao: string;
}

export interface PlanMeal {
    titulo: string;
    horario: string;
    concluida: boolean;
}

export interface PlanHydration {
    meta_litros: number;
}

export interface PlanBiohackingItem {
    titulo: string;
    concluida: boolean;
}

export interface PlanDay {
    dia: number;
    tarefas: PlanTask[];
}

export interface PlanWeekDetailed {
    numero: number;
    foco: string;
    dica_alfa_semanal?: string;
    hidratacao?: PlanHydration;
    biohacking?: PlanBiohackingItem[];
    treino_dia?: PlanWorkout;
    refeicoes?: PlanMeal[];
    dias: PlanDay[];
}

export interface PlanWeekSummary {
    numero: number;
    foco: string;
    objetivos_principais: string[];
}

export type PlanWeek = PlanWeekDetailed | PlanWeekSummary;

export interface PlanMonthDetailed {
    numero: number;
    titulo: string;
    objetivo: string;
    semanas: PlanWeek[];
}

export interface PlanMonthSummary {
    numero: number;
    titulo: string;
    objetivo: string;
    pontos_chave: string[];
}

export type PlanMonth = PlanMonthDetailed | PlanMonthSummary;

export interface PlanInsights {
    foco_principal: string;
    ritmo: string;
    complexidade: string;
}

export interface PlanData {
    meta_trimestral: string;
    insights: PlanInsights;
    meses: PlanMonth[];
}

interface PlanState {
    plan: PlanData | null;
    planId: string | null;
    isGenerating: boolean;
    error: string | null;
    hydrationCurrent: number;
    completions: Set<string>;
    generatePlan: (quizAnswers: Record<string, any>, userId?: string) => Promise<void>;
    fetchUserPlan: (userId: string) => Promise<void>;
    fetchCompletions: (userId: string) => Promise<void>;
    setPlan: (plan: PlanData) => void;
    clearPlan: () => void;
    getDailyGoals: (day?: number, week?: number, month?: number) => PlanTask[];
    getMonth: (monthNumber: number) => PlanMonth | null;
    getWorkout: (week?: number, month?: number) => PlanWorkout | null;
    getMeals: (week?: number, month?: number) => PlanMeal[];
    getHydration: (week?: number, month?: number) => number;
    incrementHydration: () => void;
    getBiohacking: (week?: number, month?: number) => PlanBiohackingItem[];
    getAlphaTip: (week?: number, month?: number) => string | null;
    completeTask: (taskId: string, userId: string) => Promise<void>;
}

export const usePlanStore = create<PlanState>((set, get) => ({
    plan: null,
    planId: null,
    isGenerating: false,
    error: null,
    hydrationCurrent: 0.0,
    completions: new Set<string>(),

    generatePlan: async (quizAnswers: Record<string, any>, userId?: string) => {
        set({ isGenerating: true, error: null });

        try {
            const response = await planService.generatePlan(quizAnswers, userId);
            const planData = response.data.planData as PlanData;

            set({
                plan: planData,
                planId: response.data.id,
                isGenerating: false,
                error: null,
            });
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || 'Erro ao gerar plano';
            set({
                isGenerating: false,
                error: message,
            });
            throw error;
        }
    },

    fetchUserPlan: async (userId: string) => {
        set({ isGenerating: true, error: null });
        try {
            const response = await planService.getUserPlan(userId);
            if (response.data && response.data.planData) {
                set({
                    plan: response.data.planData as PlanData,
                    planId: response.data.id,
                    isGenerating: false,
                });
                // After fetching plan, also fetch completions for today
                get().fetchCompletions(userId);
            } else {
                set({ isGenerating: false, plan: null, planId: null });
            }
        } catch (error: any) {
            set({ isGenerating: false, error: 'Erro ao carregar plano' });
            console.error('Error fetching plan:', error);
        }
    },

    fetchCompletions: async (userId: string) => {
        try {
            const response = await planService.getCompletions(userId);
            const completionItems = response.data || [];
            const completionSet = new Set<string>(completionItems.map((c: any) => c.task_id));
            set({ completions: completionSet });
        } catch (error) {
            console.error('Error fetching completions:', error);
        }
    },

    setPlan: (plan: PlanData) => set({ plan }),

    clearPlan: () => set({ plan: null, planId: null, error: null }),

    getDailyGoals: (day = 1, week = 1, month = 1) => {
        const { plan } = get();
        if (!plan) return [];

        const targetMonth = plan.meses.find((m) => m.numero === month);
        if (!targetMonth || !('semanas' in targetMonth)) return [];

        const detailedMonth = targetMonth as PlanMonthDetailed;
        const targetWeek = detailedMonth.semanas.find((w) => w.numero === week);
        if (!targetWeek || !('dias' in targetWeek)) return [];

        const detailedWeek = targetWeek as PlanWeekDetailed;
        const targetDay = detailedWeek.dias.find((d) => d.dia === day);
        return targetDay?.tarefas || [];
    },

    getMonth: (monthNumber: number) => {
        const { plan } = get();
        if (!plan) return null;
        return plan.meses.find((m) => m.numero === monthNumber) || null;
    },

    getWorkout: (week = 1, month = 1) => {
        const { plan } = get();
        const defaultWorkout = { titulo: "Full Body Alpha", exercicios: 6, duracao: "50 min" };
        if (!plan) return defaultWorkout;

        const targetMonth = plan.meses.find((m) => m.numero === month);
        if (!targetMonth || !('semanas' in targetMonth)) return defaultWorkout;

        const detailedWeek = (targetMonth as PlanMonthDetailed).semanas.find((w) => w.numero === week);
        if (!detailedWeek || !('treino_dia' in detailedWeek)) return defaultWorkout;

        const workout = (detailedWeek as PlanWeekDetailed).treino_dia;
        return workout || defaultWorkout;
    },

    getMeals: (week = 1, month = 1) => {
        const { plan } = get();
        const defaultMeals = [
            { titulo: "Café da manhã", horario: "07:00", concluida: false },
            { titulo: "Lanche da manhã", horario: "10:00", concluida: false },
            { titulo: "Almoço", horario: "13:00", concluida: false },
            { titulo: "Lanche da tarde", horario: "17:00", concluida: false },
            { titulo: "Jantar", horario: "20:00", concluida: false }
        ];

        if (!plan) return defaultMeals;
        const targetMonth = plan.meses.find((m) => m.numero === month);
        if (!targetMonth || !('semanas' in targetMonth)) return defaultMeals;
        const detailedWeek = (targetMonth as PlanMonthDetailed).semanas.find((w) => w.numero === week);
        if (!detailedWeek || !('refeicoes' in detailedWeek)) return defaultMeals;

        const planMeals = (detailedWeek as PlanWeekDetailed).refeicoes || [];
        return planMeals.length > 0 ? planMeals : defaultMeals;
    },

    getHydration: (week = 1, month = 1) => {
        const { plan } = get();
        if (!plan) return 3.5;
        const targetMonth = plan.meses.find((m) => m.numero === month);
        if (!targetMonth || !('semanas' in targetMonth)) return 3.5;
        const detailedWeek = (targetMonth as PlanMonthDetailed).semanas.find((w) => w.numero === week);
        if (!detailedWeek || !('hidratacao' in detailedWeek)) return 3.5;
        return (detailedWeek as PlanWeekDetailed).hidratacao?.meta_litros || 3.5;
    },

    incrementHydration: () => {
        const { hydrationCurrent, getHydration } = get();
        const target = getHydration();
        if (hydrationCurrent < target) {
            set({ hydrationCurrent: Math.min(hydrationCurrent + 0.5, target) });
        }
    },

    getBiohacking: (week = 1, month = 1) => {
        const { plan } = get();
        const defaultItems = [
            { titulo: 'Banho gelado', concluida: false },
            { titulo: 'Exposição solar (15 min)', concluida: false }
        ];
        if (!plan) return defaultItems;
        const targetMonth = plan.meses.find((m) => m.numero === month);
        if (!targetMonth || !('semanas' in targetMonth)) return defaultItems;
        const detailedWeek = (targetMonth as PlanMonthDetailed).semanas.find((w) => w.numero === week);
        if (!detailedWeek || !('biohacking' in detailedWeek)) return defaultItems;
        return (detailedWeek as PlanWeekDetailed).biohacking || defaultItems;
    },

    getAlphaTip: (week = 1, month = 1) => {
        const { plan } = get();
        const defaultTip = "Mantenha a postura e a respiração controlada durante todos os exercícios para maximizar a testosterona.";
        if (!plan) return defaultTip;

        const targetMonth = plan.meses.find((m) => m.numero === month);
        if (!targetMonth || !('semanas' in targetMonth)) return defaultTip;

        const detailedWeek = (targetMonth as PlanMonthDetailed).semanas.find((w) => w.numero === week);
        if (!detailedWeek || !('dica_alfa_semanal' in detailedWeek)) return defaultTip;

        return (detailedWeek as PlanWeekDetailed).dica_alfa_semanal || defaultTip;
    },

    completeTask: async (taskId, userId) => {
        const { completions } = get();
        if (completions.has(taskId)) return;

        try {
            // Update UI immediately (Optimistic update)
            const newCompletions = new Set(completions);
            newCompletions.add(taskId);
            set({ completions: newCompletions });

            // Save to backend
            await planService.completeTask(userId, taskId);
        } catch (error) {
            console.error(`Error completing task ${taskId}:`, error);
            // Revert on error if necessary, or just log
        }
    },
}))
