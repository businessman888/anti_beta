import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export interface ExerciseDetail {
    id: string;
    exercise_id: string;
    sets: number;
    reps: string;
    weight_kg: number;
    rest_seconds: number;
    order_index: number;
    exercises: {
        id: string;
        name: string;
        muscle_group: string;
    };
}

export interface Workout {
    id: string;
    workout_type: string;
    month_index: number;
    description: string;
    workout_exercise_details: ExerciseDetail[];
}

export const workoutService = {
    /**
     * Identifies the month_index (1, 2, or 3) based on user's registration date.
     */
    getMonthIndex: (createdAt: string | undefined): number => {
        if (!createdAt) return 1;
        const registrationDate = new Date(createdAt);
        const today = new Date();
        const diffInMs = today.getTime() - registrationDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        let index = 1;
        if (diffInDays < 30) index = 1;
        else if (diffInDays < 60) index = 2;
        else index = 3;

        // Force range 1-3
        return Math.max(1, Math.min(3, index));
    },

    /**
     * Maps the day of week to workout type (A, B, C).
     * Segunda/Quinta (1, 4) -> A
     * Terça/Sexta (2, 5) -> B
     * Quarta/Sábado (3, 6) -> C
     */
    getWorkoutTypeForDate: (date: Date): string | null => {
        const day = date.getDay(); // 0 (Dom) to 6 (Sab)
        if (day === 1 || day === 4) return 'A';
        if (day === 2 || day === 5) return 'B';
        if (day === 3 || day === 6) return 'C';
        return null; // Rest day
    },

    /**
     * Fetches workout data for a specific type and month index.
     */
    fetchWorkout: async (workoutType: string, monthIndex: number): Promise<Workout | null> => {
        const normalizedType = workoutType.toUpperCase();
        const userId = useAuthStore.getState().user?.id;

        console.log('Query Params:', { monthIndex, workoutType: normalizedType, userId });

        const { data, error } = await supabase
            .from('monthly_workouts')
            .select(`
                *,
                workout_exercise_details (
                    *,
                    exercises (*)
                )
            `)
            .eq('workout_type', normalizedType)
            .eq('month_index', monthIndex)
            .maybeSingle();

        if (error) {
            console.error('Error fetching workout:', error);
            return null;
        }

        return data as Workout;
    },

    /**
     * Calculates total volume (sum of weights) for a workout.
     */
    calculateTotalVolume: (exercises: ExerciseDetail[]): number => {
        return exercises.reduce((acc, curr) => acc + (curr.weight_kg || 0) * (curr.sets || 0), 0);
    },

    /**
     * Helper to get indicators (muscle groups) for a date to show in calendar dots.
     */
    getIndicatorsForDate: async (date: Date, createdAt: string | undefined) => {
        const type = workoutService.getWorkoutTypeForDate(date);
        if (!type) return [];

        const monthIndex = workoutService.getMonthIndex(createdAt);
        const workout = await workoutService.fetchWorkout(type, monthIndex);

        if (!workout) return [];

        // Check if workout is for 'Superiores' or 'Inferiores'
        // Logic: if any exercise has 'Lower Body' or similar in muscle_group, treat as inferiores.
        // For now, let's use a simpler mapping based on type if muscle_group isn't consistent.
        // But the requirement says use category. Let's look at muscle_groups.
        const isSuperiores = workout.workout_exercise_details.some(ed =>
            ['Peito', 'Costas', 'Ombros', 'Biceps', 'Triceps'].includes(ed.exercises.muscle_group)
        );
        const isInferiores = workout.workout_exercise_details.some(ed =>
            ['Pernas', 'Glúteos', 'Panturrilha'].includes(ed.exercises.muscle_group)
        );

        const indicators = [];
        if (isInferiores) indicators.push('inferiores');
        if (isSuperiores) indicators.push('superiores');
        return indicators;
    }
};
