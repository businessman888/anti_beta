import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ArrowLeft,
    Bell,
    Pencil,
    Flame,
    Trophy,
    Star,
    Zap,
    CheckCircle2,
    Settings,
    Eye,
    Contrast,
    Headset,
    FileText,
    LogOut,
    Trash2,
    ChevronRight
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { homeMockData } from '../../mocks/homeMock';
import { useAuthStore } from '../../store/authStore';
import { profileService } from '../../services/profileService';
import { Avatar } from '../../components/ui/Avatar';

export const ProfileScreen = () => {
    const navigation = useNavigation();
    const { signOut, user, profile, refreshProfile } = useAuthStore();
    const [isUploading, setIsUploading] = useState(false);

    const handlePickImage = async () => {
        if (!user) return;

        // Request permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso às suas fotos para trocar o avatar.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setIsUploading(true);
            try {
                const publicUrl = await profileService.uploadAvatar(user.id, selectedImage.uri);
                if (publicUrl) {
                    await refreshProfile();
                    Alert.alert('Sucesso', 'Foto de perfil atualizada!');
                } else {
                    Alert.alert('Erro', 'Não foi possível fazer o upload da imagem.');
                }
            } catch (error) {
                console.error('Upload error:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao atualizar a foto.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    // Stats data
    const stats = [
        { label: 'Dias seguidos', value: '14d', icon: <Flame size={20} color="#ff4422" fill="#ff4422" /> },
        { label: 'Ranking', value: '#34', icon: <Trophy size={20} color="#ff4422" /> },
        { label: 'Badges', value: '8/36', icon: <Star size={20} color="#ff4422" fill="#ff4422" /> },
        { label: 'Testo', value: '67%', icon: <Zap size={20} color="#ff4422" fill="#ff4422" /> },
    ];

    // Preferences items
    const preferences = [
        { label: 'Configurações', icon: <Settings size={20} color="#737373" /> },
        { label: 'Notificações', icon: <Bell size={20} color="#737373" /> },
        { label: 'Tracking de Tela', icon: <Eye size={20} color="#737373" /> },
        { label: 'Tema', icon: <Contrast size={20} color="#737373" /> },
        { label: 'Suporte', icon: <Headset size={20} color="#737373" /> },
        { label: 'Termos de Uso', icon: <FileText size={20} color="#737373" /> },
    ];

    const userDisplayName = profile?.full_name || user?.email?.split('@')[0] || 'Usuário';
    const userAvatar = profile?.avatar_url || homeMockData.user.avatar;

    return (
        <SafeAreaView className="flex-1 bg-carbono-950">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Perfil</Text>
                <TouchableOpacity className="p-2">
                    <Bell size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* User Info Section */}
                <View className="items-center mt-6">
                    <View className="relative">
                        <View className="p-1 rounded-full border-2 border-brasa-500">
                            {isUploading ? (
                                <View className="w-28 h-28 rounded-full bg-neutro-900 items-center justify-center">
                                    <ActivityIndicator color="#ff4422" />
                                </View>
                            ) : (
                                <Avatar
                                    url={userAvatar}
                                    size={112} // w-28 h-28 is 112px
                                />
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={handlePickImage}
                            disabled={isUploading}
                            className={`absolute bottom-0 right-0 bg-brasa-500 p-2 rounded-full border-2 border-carbono-950 ${isUploading ? 'opacity-50' : ''}`}
                        >
                            <Pencil size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-white text-2xl font-bold mt-4">{userDisplayName}</Text>
                    <Text className="text-neutro-400 text-sm">{profile?.age ? `${profile.age} anos` : 'Idade não informada'}</Text>
                </View>

                {/* Statistics Grid */}
                <View className="px-6 mt-10">
                    <Text className="text-neutro-400 text-base font-semibold mb-4">Estatísticas</Text>
                    <View className="flex-row flex-wrap justify-between">
                        {stats.map((stat, index) => (
                            <View
                                key={index}
                                className="bg-neutro-900 w-[48%] rounded-2xl p-4 mb-4 border border-neutro-800"
                            >
                                <Text className="text-neutro-500 text-sm mb-4">{stat.label}</Text>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-white text-xl font-bold">{stat.value}</Text>
                                    {stat.icon}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Plan Status Card */}
                <View className="px-6 mt-4">
                    <View className="bg-neutro-900 rounded-2xl p-6 border border-neutro-800">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-white text-xl font-bold">Plano Básico</Text>
                            <CheckCircle2 size={24} color="#ff4422" fill="#ff4422" />
                        </View>
                        <Text className="text-neutro-500 text-sm mb-6">Renovação: 28/03</Text>

                        <TouchableOpacity
                            className="bg-brasa-500 rounded-xl py-4 items-center"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-bold text-base">Fazer upgrade para PRO</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Preferences List */}
                <View className="px-6 mt-10">
                    <Text className="text-neutro-400 text-base font-semibold mb-4">Preferências</Text>
                    <View className="bg-neutro-900 rounded-2xl overflow-hidden border border-neutro-800">
                        {preferences.map((pref, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                className={`flex-row items-center justify-between p-4 px-6 ${index !== preferences.length - 1 ? 'border-b border-neutro-800' : ''
                                    }`}
                            >
                                <View className="flex-row items-center">
                                    {pref.icon}
                                    <Text className="text-white text-base ml-4">{pref.label}</Text>
                                </View>
                                <ChevronRight size={20} color="#525252" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Account Actions Box */}
                <View className="px-6 mt-10">
                    <View className="bg-neutro-900 rounded-2xl overflow-hidden border border-neutro-800">
                        <TouchableOpacity
                            onPress={signOut}
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between p-4 px-6 border-b border-neutro-800"
                        >
                            <Text className="text-brasa-500 text-base font-bold">Sair</Text>
                            <LogOut size={20} color="#ff4422" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between p-4 px-6"
                        >
                            <Text className="text-brasa-500 text-base font-bold">Deletar conta</Text>
                            <Trash2 size={20} color="#ff4422" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
