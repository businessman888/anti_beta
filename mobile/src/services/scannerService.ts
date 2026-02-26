import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { apiClient } from './api/client';

export interface ScannerAnalysisResult {
    beta_temperature: number;
    interest_score: number;
    frase_padrao: string;
    analise_detalhada: string;
    sugestao_resposta: string;
}

export const scannerService = {
    /**
     * Opens image picker and returns the selected image URI and base64
     */
    async pickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            throw new Error('Permissão necessária para acessar a galeria');
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            return {
                uri: result.assets[0].uri,
                base64: result.assets[0].base64,
                type: result.assets[0].mimeType || 'image/jpeg'
            };
        }

        return null;
    },

    /**
     * Uploads image to Supabase Storage
     */
    async uploadImage(uri: string, type: string) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
        const filePath = `scans/${fileName}`;

        // Convert URI to Blob
        const response = await fetch(uri);
        const blob = await response.blob();

        const { data, error } = await supabase.storage
            .from('scanner-prints')
            .upload(filePath, blob, {
                contentType: type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('scanner-prints')
            .getPublicUrl(filePath);

        return publicUrl;
    },
    /**
     * Performs analysis and persists result via Backend API
     */
    async analyzeAndSave(base64Image: string, imageType: string, userId: string, imageUrl: string): Promise<ScannerAnalysisResult> {
        try {
            const response = await apiClient.post<ScannerAnalysisResult>('/scanner/analyze', {
                imageBase64: base64Image,
                imageType: imageType,
                userId: userId,
                imageUrl: imageUrl
            });

            return response.data;
        } catch (error: any) {
            console.error('Backend Analysis Error:', error);
            throw new Error(error?.response?.data?.message || 'Ocorreu um erro ao analisar a conversa com a IA');
        }
    },

    /**
     * Fetches scan history for a user
     */
    async getHistory(userId: string) {
        const { data, error } = await supabase
            .from('scanner_analyses')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }
};
