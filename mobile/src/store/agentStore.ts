import { create } from 'zustand';

export type AgentState = 'IDLE' | 'SENDING' | 'TYPING';

export interface ConversationMessage {
    id: string;
    role: 'user' | 'agent';
    text: string;
    timestamp: string;
}

interface AgentStoreState {
    state: AgentState;
    userText: string | null;
    agentText: string | null;
    error: string | null;
    messages: ConversationMessage[];

    setState: (newState: AgentState) => void;
    setUserText: (text: string | null) => void;
    setAgentResponse: (text: string) => void;
    setError: (error: string | null) => void;
    addMessage: (role: 'user' | 'agent', text: string) => void;
    reset: () => void;
}

export const useAgentStore = create<AgentStoreState>((set) => ({
    state: 'IDLE',
    userText: null,
    agentText: null,
    error: null,
    messages: [],

    setState: (newState) => set({ state: newState, error: null }),

    setUserText: (text) => set({ userText: text }),

    setAgentResponse: (text) =>
        set({
            agentText: text,
            state: 'IDLE',
        }),

    setError: (error) => set({ error, state: 'IDLE' }),

    addMessage: (role, text) =>
        set((prev) => ({
            messages: [
                ...prev.messages,
                {
                    id: Math.random().toString(36).substring(2, 9),
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
            error: null,
        }),
}));
