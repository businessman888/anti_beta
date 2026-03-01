import { create } from 'zustand';

export type AgentState = 'IDLE' | 'RECORDING' | 'SENDING' | 'PROCESSING' | 'SPEAKING';

interface ConversationMessage {
    role: 'user' | 'agent';
    text: string;
    timestamp: string;
}

interface AgentStoreState {
    state: AgentState;
    userText: string | null;
    agentText: string | null;
    agentAudioUrl: string | null;
    audioDuration: number;
    error: string | null;
    messages: ConversationMessage[];

    setState: (newState: AgentState) => void;
    setUserText: (text: string | null) => void;
    setAgentResponse: (text: string, audioUrl: string) => void;
    setAudioDuration: (duration: number) => void;
    setError: (error: string | null) => void;
    addMessage: (role: 'user' | 'agent', text: string) => void;
    reset: () => void;
}

export const useAgentStore = create<AgentStoreState>((set) => ({
    state: 'IDLE',
    userText: null,
    agentText: null,
    agentAudioUrl: null,
    audioDuration: 0,
    error: null,
    messages: [],

    setState: (newState) => set({ state: newState, error: null }),

    setUserText: (text) => set({ userText: text }),

    setAgentResponse: (text, audioUrl) =>
        set({
            agentText: text,
            agentAudioUrl: audioUrl,
            state: 'SPEAKING',
        }),

    setAudioDuration: (duration) => set({ audioDuration: duration }),

    setError: (error) => set({ error, state: 'IDLE' }),

    addMessage: (role, text) =>
        set((prev) => ({
            messages: [
                ...prev.messages,
                {
                    role,
                    text,
                    timestamp: new Date().toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                },
            ],
        })),

    reset: () =>
        set({
            state: 'IDLE',
            userText: null,
            agentText: null,
            agentAudioUrl: null,
            audioDuration: 0,
            error: null,
        }),
}));
