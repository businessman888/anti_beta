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
        primary: "bg-brasa-500 active:bg-brasa-600",
        outline: "border border-brasa-500 bg-transparent active:bg-carbono-900",
        ghost: "bg-transparent active:bg-carbono-900",
    };

    const textStyles = {
        primary: "text-white font-bold text-lg", // Assuming white text on orange
        outline: "text-brasa-500 font-bold text-lg",
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
                <ActivityIndicator color={variant === 'outline' ? '#ff4422' : 'white'} />
            ) : (
                <Text className={textStyles[variant]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
