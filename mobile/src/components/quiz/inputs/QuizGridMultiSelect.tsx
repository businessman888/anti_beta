import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import clsx from 'clsx';
import { LucideIcon, Check } from 'lucide-react-native';

interface Option {
    id: string;
    label: string;
    icon: LucideIcon;
}

interface QuizGridMultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
}

const CARD_WIDTH = 162;
const CARD_HEIGHT = 164;

export const QuizGridMultiSelect: React.FC<QuizGridMultiSelectProps> = ({
    options,
    selectedValues,
    onChange
}) => {
    const handleSelect = (id: string) => {
        if (selectedValues.includes(id)) {
            onChange(selectedValues.filter(v => v !== id));
        } else {
            onChange([...selectedValues, id]);
        }
    };

    return (
        <View className="flex-row flex-wrap justify-between gap-y-3">
            {options.map((option) => {
                const isSelected = selectedValues.includes(option.id);
                const Icon = option.icon;

                return (
                    <TouchableOpacity
                        key={option.id}
                        onPress={() => handleSelect(option.id)}
                        activeOpacity={0.8}
                        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                        className={clsx(
                            "rounded-3xl border items-center justify-center relative p-4",
                            isSelected
                                ? "bg-[#1A1416] border-[#FF4422]"
                                : "bg-zinc-900/50 border-zinc-800"
                        )}
                    >
                        {/* Checkmark Badge (Top Right) */}
                        <View className={clsx(
                            "absolute top-4 right-4 w-6 h-6 rounded-full items-center justify-center border",
                            isSelected
                                ? "bg-[#FF4422] border-[#FF4422]"
                                : "bg-transparent border-zinc-700"
                        )}>
                            {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                        </View>

                        {/* Icon */}
                        <View className="mb-4">
                            <Icon
                                size={40}
                                color={isSelected ? "#FF4422" : "#71717a"}
                                strokeWidth={1.5}
                            />
                        </View>

                        {/* Label */}
                        <Text className={clsx(
                            "text-center font-semibold text-base",
                            isSelected ? "text-[#FF4422]" : "text-zinc-400"
                        )}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
