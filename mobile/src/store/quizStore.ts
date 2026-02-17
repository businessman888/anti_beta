import { create } from 'zustand';

interface QuizState {
    currentStep: number;
    totalSteps: number;
    answers: Record<string, any>;
    setAnswer: (questionId: string, value: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentStep: 0,
    totalSteps: 28,
    answers: {},
    setAnswer: (questionId, value) =>
        set((state) => ({
            answers: { ...state.answers, [questionId]: value },
        })),
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
        }),
}));
