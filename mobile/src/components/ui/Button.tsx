import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { clsx } from 'clsx';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost';
    isLoading?: boolean;
    className?: string;
    disabled?: boolean;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    isLoading = false,
    className,
    disabled
}: ButtonProps) => {
    const baseStyles = "w-full py-4 rounded-xl items-center justify-center flex-row";

    const variants = {
        primary: "bg-red-600 active:bg-red-700", // Brasa 500 approximation
        outline: "border border-red-600 bg-transparent active:bg-zinc-900",
        ghost: "bg-transparent active:bg-zinc-900",
    };

    const textStyles = {
        primary: "text-white font-bold text-lg",
        outline: "text-red-600 font-bold text-lg",
        ghost: "text-zinc-400 font-medium text-base",
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isLoading || disabled}
            className={clsx(
                baseStyles,
                variants[variant],
                (disabled || isLoading) && "opacity-50",
                className
            )}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'outline' ? '#dc2626' : 'white'} />
            ) : (
                <Text className={textStyles[variant]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
