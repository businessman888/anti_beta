import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import clsx from 'clsx';

interface QuizInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const QuizInput: React.FC<QuizInputProps> = ({ label, error, className, ...props }) => {
    return (
        <View className="w-full mb-4">
            {label && <Text className="text-white mb-2 font-medium">{label}</Text>}
            <TextInput
                className={clsx(
                    "bg-zinc-900 text-white p-4 rounded-xl border border-zinc-800 focus:border-cyan-500 text-lg",
                    error && "border-red-500",
                    className
                )}
                placeholderTextColor="#52525b"
                {...props}
            />
            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        </View>
    );
};
