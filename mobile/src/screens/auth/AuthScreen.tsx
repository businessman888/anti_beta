import React, { useState } from 'react';
import { View, Text, Alert, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { supabase, performOAuth } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

export const AuthScreen = () => {
    const { setSession } = useAuthStore();
    const [isLoadingApple, setIsLoadingApple] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

    const isLoading = isLoadingApple || isLoadingGoogle;

    const handleAppleLogin = async () => {
        setIsLoadingApple(true);
        try {
            const rawNonce = Math.random().toString(36).substring(2, 34);
            const hashedNonce = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                rawNonce
            );

            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
                nonce: hashedNonce,
            });

            if (!credential.identityToken) {
                throw new Error('Nenhum token de identidade recebido da Apple.');
            }

            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'apple',
                token: credential.identityToken,
                nonce: rawNonce,
            });

            if (error) throw error;

            if (data.session) {
                setSession(data.session);
            }
        } catch (error: any) {
            if (error.code === 'ERR_REQUEST_CANCELED') {
                // User canceled — do nothing
                return;
            }
            console.error('[Auth] Apple login error:', error);
            Alert.alert('Erro no Login', 'Não foi possível entrar com a Apple. Tente novamente.');
        } finally {
            setIsLoadingApple(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoadingGoogle(true);
        try {
            const session = await performOAuth('google');

            if (session) {
                setSession(session);
            }
        } catch (error: any) {
            console.error('[Auth] Google login error:', error);
            Alert.alert('Erro no Login', 'Não foi possível entrar com o Google. Tente novamente.');
        } finally {
            setIsLoadingGoogle(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-carbono-950 justify-between">
            <View className="flex-1 justify-center px-6">
                {/* Header */}
                <View className="items-center mb-12">
                    <Text className="text-zinc-200 text-3xl font-bold mb-3">
                        Entre na sua conta
                    </Text>
                    <Text className="text-zinc-400 text-base text-center leading-relaxed">
                        Comece sua transformação agora.
                    </Text>
                </View>

                {/* Social Login Buttons */}
                <View className="gap-4">
                    {/* Apple Button — native component, must be above Google per Apple guidelines */}
                    {Platform.OS === 'ios' && (
                        <AppleAuthentication.AppleAuthenticationButton
                            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
                            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                            cornerRadius={12}
                            style={{ height: 52, width: '100%', opacity: isLoading ? 0.5 : 1 }}
                            onPress={handleAppleLogin}
                        />
                    )}

                    {/* Google Button */}
                    <TouchableOpacity
                        onPress={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl items-center justify-center flex-row border border-zinc-700 bg-carbono-900"
                        style={{ opacity: isLoading ? 0.5 : 1 }}
                    >
                        {isLoadingGoogle ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <GoogleIcon />
                                <Text className="text-zinc-200 font-semibold text-base ml-3">
                                    Continuar com Google
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View className="px-6 pb-8">
                <Text className="text-zinc-500 text-xs text-center leading-relaxed">
                    Ao continuar, você concorda com nossos{' '}
                    <Text className="text-zinc-400">Termos de Uso</Text> e{' '}
                    <Text className="text-zinc-400">Política de Privacidade</Text>.
                </Text>
            </View>
        </SafeAreaView>
    );
};

// Google "G" icon using SVG
const GoogleIcon = () => {
    const Svg = require('react-native-svg').default;
    const { Path } = require('react-native-svg');

    return (
        <Svg width={20} height={20} viewBox="0 0 48 48">
            <Path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <Path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <Path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <Path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
        </Svg>
    );
};
