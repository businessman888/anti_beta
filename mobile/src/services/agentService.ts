import { apiClient } from './api/client';

export interface VoiceInteractionResponse {
    transcribedUserText: string;
    agentResponseText: string;
    agentAudioUrl: string;
}

export const agentService = {
    /**
     * Sends audio to the backend for full voice interaction pipeline.
     * Uses multipart/form-data with the audio file.
     */
    async sendVoiceInteraction(audioUri: string): Promise<VoiceInteractionResponse> {
        const formData = new FormData();

        // React Native FormData expects an object with uri, name, type
        formData.append('audio', {
            uri: audioUri,
            name: 'voice_recording.m4a',
            type: 'audio/m4a',
        } as any);

        const response = await apiClient.post<VoiceInteractionResponse>(
            '/conversational/voice-interaction',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 60000, // 60s timeout para o pipeline completo
            },
        );

        return response.data;
    },
};
