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

const signUpSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme a senha'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpScreen = () => {
    const navigation = useNavigation();
    const { setSession, setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        const { error, data: authData } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) {
            Alert.alert('Erro no Cadastro', error.message);
            setIsLoading(false);
            return;
        }

        if (authData.session && authData.user) {
            setSession(authData.session);
            setUser(authData.user);
            // Status check needs to happen, likely default to onboarding for new users
        } else {
            Alert.alert('Sucesso', 'Verifique seu email para confirmar o cadastro (se necessário), ou faça login.');
            navigation.goBack();
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-zinc-950 p-6 pt-12">
            <View className="mb-8">
                <Text className="text-white text-3xl font-bold mb-2">Crie sua conta</Text>
                <Text className="text-zinc-400">Comece sua transformação hoje.</Text>
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
                    placeholder="Mínimo 6 caracteres"
                    secureTextEntry
                    error={errors.password?.message}
                />
                <Input
                    control={control}
                    name="confirmPassword"
                    label="Confirmar Senha"
                    placeholder="Repita sua senha"
                    secureTextEntry
                    error={errors.confirmPassword?.message}
                />

                <Button
                    title="Criar Conta"
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
