import { apiClient } from './client';

export const planService = {
    generatePlan: (answers: Record<string, any>, userId?: string) =>
        apiClient.post('/planning/generate-plan', { answers, userId }),
};
