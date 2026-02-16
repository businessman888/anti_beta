import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { clsx } from 'clsx';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    error?: string;
}

export const Input = <T extends FieldValues>({
    control,
    name,
    label,
    error,
    className,
    ...props
}: InputProps<T>) => {
    return (
        <View className={clsx("w-full mb-4", className)}>
            {label && (
                <Text className="text-zinc-400 mb-2 font-medium">{label}</Text>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        className={clsx(
                            "w-full bg-zinc-900 text-white px-4 py-3 rounded-xl border",
                            error ? "border-red-500" : "border-zinc-800 focus:border-red-600"
                        )}
                        placeholderTextColor="#71717a"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...props}
                    />
                )}
            />
            {error && (
                <Text className="text-red-500 text-sm mt-1">{error}</Text>
            )}
        </View>
    );
};
