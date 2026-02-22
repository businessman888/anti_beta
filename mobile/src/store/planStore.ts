import { create } from 'zustand';
import { planService } from '../services/api/planService';

export interface PlanTask {
    categoria: string;
    titulo: string;
    descricao: string;
    concluida: boolean;
}

export interface PlanDay {
    dia: number;
    tarefas: PlanTask[];
}

export interface PlanWeekDetailed {
    numero: number;
    foco: string;
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
    generatePlan: (quizAnswers: Record<string, any>, userId?: string) => Promise<void>;
    setPlan: (plan: PlanData) => void;
    clearPlan: () => void;
    getDailyGoals: (day?: number, week?: number, month?: number) => PlanTask[];
    getMonth: (monthNumber: number) => PlanMonth | null;
}

export const usePlanStore = create<PlanState>((set, get) => ({
    plan: null,
    planId: null,
    isGenerating: false,
    error: null,

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
}));
