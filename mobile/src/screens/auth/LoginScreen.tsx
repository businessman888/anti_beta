import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
    const navigation = useNavigation();
    const { setSession, setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        const { error, data: authData } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            Alert.alert('Erro no Login', error.message);
            setIsLoading(false);
            return;
        }

        if (authData.session && authData.user) {
            setSession(authData.session);
            setUser(authData.user);
            // Status check should be done here or in AppNavigator via store
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-zinc-950 p-6 pt-12">
            <View className="mb-8">
                <Text className="text-white text-3xl font-bold mb-2">Bem-vindo de volta</Text>
                <Text className="text-zinc-400">Entre para continuar sua jornada.</Text>
            </View>

            <View className="gap-4">
                <Input
                    control={control}
                    name="email"
                    label="Email"
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email?.message}
                />
                <Input
                    control={control}
                    name="password"
                    label="Senha"
                    placeholder="Sua senha secreta"
                    secureTextEntry
                    error={errors.password?.message}
                />

                <Button
                    title="Entrar"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    className="mt-4"
                />

                <Button
                    title="Voltar"
                    variant="ghost"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </SafeAreaView>
    );
};
