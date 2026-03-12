import { supabase } from '../lib/supabase';

export interface UserProfile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    age: number | null;
    updated_at: string | null;
    created_at: string | null;
}

export const profileService = {
    /**
     * Get user profile from the profiles table.
     */
    getProfile: async (userId: string): Promise<UserProfile | null> => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return data;
    },

    /**
     * Upload an avatar image to Supabase Storage.
     */
    uploadAvatar: async (userId: string, uri: string): Promise<string | null> => {
        try {
            // 1. Fetch the image and convert to blob
            const response = await fetch(uri);
            const blob = await response.blob();
            console.log('Tipo do objeto:', typeof blob, blob instanceof Blob);

            // 2. Prepare file path: avatars/{userId}/avatar_{timestamp}.{ext}
            const fileExt = uri.split('.').pop() || 'jpg';
            const fileName = `avatar_${Date.now()}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            // 3. Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(filePath, blob, {
                    contentType: 'image/jpeg', // Or dynamically set
                    upsert: true,
                    cacheControl: '3600'
                });

            if (error) {
                console.error('Error uploading avatar:', error);
                return null;
            }

            // 4. Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // 5. Update the profiles table with the new URL
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
                .eq('id', userId);

            if (updateError) {
                console.error('Error updating profile avatar_url:', updateError);
                return null;
            }

            return publicUrl;
        } catch (error) {
            console.error('Unexpected error in uploadAvatar:', error);
            return null;
        }
    },

    /**
     * Update user profile data.
     */
    updateProfile: async (userId: string, updates: Partial<UserProfile>): Promise<boolean> => {
        const { error } = await supabase
            .from('profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) {
            console.error('Error updating profile:', error);
            return false;
        }

        return true;
    },
};
