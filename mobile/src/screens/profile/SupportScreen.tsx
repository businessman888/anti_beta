import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Brain, Search, ChevronDown, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const SupportScreen = () => {
    const navigation = useNavigation();

    // FAQ State
    const [faqOpen, setFaqOpen] = useState<{ [key: string]: boolean }>({});

    const toggleFaq = (key: string) => {
        setFaqOpen(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const categories = [
        { id: 'conta', name: 'Conta', icon: <User size={28} color="#ff4422" /> },
        { id: 'ia', name: 'IA & Dados', icon: <Brain size={28} color="#ff4422" /> },
    ];

    const faqs = [
        {
            id: 'q1',
            question: 'Como a IA calcula minha prontidão?',
            answer: 'A IA utiliza os dados combinados do seu questionário diário, atividades físicas recentes se houver e a qualidade do sono informada para gerar um escore de prontidão.'
        },
        {
            id: 'q2',
            question: 'Posso alterar meu plano a qualquer momento?',
            answer: 'Sim! Você pode alterar ou cancelar seu plano a partir das configurações de cobrança na loja de aplicativos.'
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-carbono-950">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold">Ajuda</Text>
                <View className="w-8" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-2" contentContainerStyle={{ paddingBottom: 40 }}>
                
                {/* Search Bar */}
                <View className="bg-neutro-900 rounded-2xl flex-row items-center p-4 border border-neutro-800 mb-8">
                    <Search size={20} color="#737373" />
                    <TextInput 
                        placeholder="Como podemos ajudar?"
                        placeholderTextColor="#737373"
                        className="text-white ml-3 flex-1 text-base p-0"
                    />
                </View>

                {/* Categories */}
                <View className="mb-8">
                    <Text className="text-white font-bold text-lg mb-4">Categorias</Text>
                    <View className="flex-row justify-between">
                        {categories.map((cat, index) => (
                            <TouchableOpacity 
                                key={cat.id} 
                                className={`bg-neutro-900 border border-neutro-800 rounded-2xl py-6 flex-1 items-center ${index === 0 ? 'mr-2' : 'ml-2'}`}
                                activeOpacity={0.7}
                            >
                                <View className="bg-[#ff4422]/10 p-4 rounded-full mb-3">
                                    {cat.icon}
                                </View>
                                <Text className="text-white font-bold">{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* FAQ */}
                <View className="mb-8">
                    <Text className="text-white font-bold text-lg mb-4">Dúvidas frequentes</Text>
                    {faqs.map((faq) => (
                        <View key={faq.id} className="mb-3">
                            <TouchableOpacity 
                                onPress={() => toggleFaq(faq.id)}
                                activeOpacity={0.7}
                                className="bg-neutro-900 border border-neutro-800 rounded-2xl p-5 flex-row items-center justify-between"
                            >
                                <Text className="text-white flex-1 pr-4">{faq.question}</Text>
                                <ChevronDown 
                                    size={20} 
                                    color="#ff4422" 
                                    style={{ transform: [{ rotate: faqOpen[faq.id] ? '180deg' : '0deg' }] }}
                                />
                            </TouchableOpacity>
                            {/* Expandable answer */}
                            {faqOpen[faq.id] && (
                                <View className="bg-neutro-900/50 border border-t-0 border-neutro-800 px-5 pt-2 pb-5 rounded-b-2xl -mt-4 z-[-1]">
                                    <Text className="text-neutro-400 mt-2">{faq.answer}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Still Need Help Card */}
                <View className="bg-neutro-900 border border-neutro-800 rounded-2xl p-6 items-center mt-2">
                    <Text className="text-white font-bold text-lg mb-2">Ainda precisa de ajuda?</Text>
                    <Text className="text-neutro-400 text-center mb-6 leading-5">
                        Nossa equipe de suporte está pronta para te atender.
                    </Text>
                    
                    <TouchableOpacity 
                        className="bg-brasa-500 w-full rounded-xl py-3.5 flex-row items-center justify-center"
                        activeOpacity={0.8}
                    >
                        <MessageCircle size={20} color="#fff" />
                        <Text className="text-white font-bold text-base ml-2">Falar com Suporte</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
