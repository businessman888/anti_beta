import { apiClient } from './api/client';

export interface ChatInteractionResponse {
    transcribedUserText: string;
    agentResponseText: string;
}

export const agentService = {
    /**
     * Sends text to the backend for chat interaction.
     */
    async sendChatInteraction(text: string): Promise<ChatInteractionResponse> {
        const response = await apiClient.post<ChatInteractionResponse>(
            '/conversational/chat',
            { text },
            {
                timeout: 30000,
            },
        );

        return response.data;
    },
};

