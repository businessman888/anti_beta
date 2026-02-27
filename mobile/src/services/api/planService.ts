import { apiClient } from './client';

export const planService = {
    generatePlan: (answers: Record<string, any>, userId?: string) =>
        apiClient.post('/planning/generate-plan', { answers, userId }, {
            timeout: 180000, // 3 minutes — AI generation takes longer than standard requests
        }),

    getPlanStatus: (userId: string) =>
        apiClient.get(`/planning/status/${userId}`),

    getUserPlan: (userId: string) =>
        apiClient.get(`/planning/user/${userId}`),

    completeTask: (userId: string, taskId: string) =>
        apiClient.post('/planning/complete', { userId, taskId }),

    getCompletions: (userId: string) =>
        apiClient.get(`/planning/completions/${userId}`),
};
