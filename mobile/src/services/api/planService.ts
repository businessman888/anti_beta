import { apiClient } from './client';

export const planService = {
    generatePlan: (answers: Record<string, any>, userId?: string) =>
        apiClient.post('/planning/generate-plan', { answers, userId }),

    getPlanStatus: (userId: string) =>
        apiClient.get<{ hasPlan: boolean; generating: boolean; error?: string }>(
            `/planning/status/${userId}`
        ),

    getUserPlan: (userId: string) =>
        apiClient.get(`/planning/user/${userId}`),

    completeTask: (userId: string, taskId: string) =>
        apiClient.post('/planning/complete', { userId, taskId }),

    getCompletions: (userId: string) =>
        apiClient.get(`/planning/completions/${userId}`),
};
