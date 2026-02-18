import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import clsx from 'clsx';

export interface QuizInputProps extends TextInputProps {
    label?: string;
    error?: string;
    variant?: 'boxed' | 'underline';
}

export const QuizInput: React.FC<QuizInputProps> = ({
    label,
    error,
    className,
    variant = 'boxed',
    ...props
}) => {
    const baseInputStyles = "text-lg text-white font-medium";

    const variants = {
        boxed: "bg-zinc-900 p-4 rounded-xl border border-zinc-800 focus:border-cyan-500",
        underline: "bg-transparent border-b border-zinc-700 focus:border-cyan-500 px-0 py-3 rounded-none placeholder:text-zinc-600"
    };

    return (
        <View className="w-full mb-4">
            {label && <Text className="text-white mb-2 font-medium">{label}</Text>}
            <TextInput
                className={clsx(
                    baseInputStyles,
                    variants[variant],
                    error && "border-red-500",
                    className
                )}
                placeholderTextColor={variant === 'underline' ? "#A1A1AA" : "#A1A1AA"}
                style={{ color: '#FFFFFF' }}
                {...props}
            />
            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        </View>
    );
};
