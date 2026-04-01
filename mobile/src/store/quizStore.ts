import { create } from 'zustand';
import { ArchetypeInfo } from '../utils/archetypeCalculator';

interface QuizState {
    currentStep: number;
    totalSteps: number;
    answers: Record<string, any>;
    archetype: ArchetypeInfo | null;
    setAnswer: (questionId: string, value: any) => void;
    setArchetype: (archetype: ArchetypeInfo) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentStep: 0,
    totalSteps: 28,
    answers: {},
    archetype: null,
    setAnswer: (questionId, value) =>
        set((state) => ({
            answers: { ...state.answers, [questionId]: value },
        })),
    setArchetype: (archetype) => set({ archetype }),
    nextStep: () =>
        set((state) => ({
            currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
        })),
    prevStep: () =>
        set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 0),
        })),
    resetQuiz: () =>
        set({
            currentStep: 0,
            answers: {},
            archetype: null,
        }),
}));
