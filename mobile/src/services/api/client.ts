import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../../store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 90000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token to every request
apiClient.interceptors.request.use(
    async (config) => {
        const session = useAuthStore.getState().session;
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error('API Error Response:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else if (error.request) {
            console.error('API Error Request (No Response):', error.request);
        } else {
            console.error('API Error Message:', error.message);
        }
        return Promise.reject(error);
    }
);
