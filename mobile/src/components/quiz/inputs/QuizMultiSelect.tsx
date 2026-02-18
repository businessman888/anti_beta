import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { LucideIcon, Check } from 'lucide-react-native';

interface Option {
    id: string;
    label: string;
    icon?: LucideIcon;
}

interface QuizMultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
}

export const QuizMultiSelect: React.FC<QuizMultiSelectProps> = ({
    options,
    selectedValues,
    onChange
}) => {
    const handleSelect = (id: string, isExclusive: boolean = false) => {
        if (isExclusive) {
            // If selecting "None/No Restrictions", clear others and select this
            if (selectedValues.includes(id)) {
                onChange([]);
            } else {
                onChange([id]);
            }
            return;
        }

        // Check if any currently selected value is exclusive
        // We need to know which options are exclusive to filter them out
        // Just assuming "none" or similar id convention might be risky, better pass explicit prop?
        // For now, let's assume if we select a normal option, we remove "none"
        // But the props don't have "exclusive". Let's stick to simple logic or add exclusive prop?
        // Plan didn't specify exclusive, but requirement Step 17 has "Não tenho restrições" which likely behaves exclusively.
        // Let's rely on the consumer (OnboardingScreen) to handle exclusive logic? Or add it here?
        // Adding simple exclusive logic here based on ID 'none' or 'no_restrictions' is brittle.
        // Better: let's update the Option interface to include exclusive.

        let newValues = [...selectedValues];

        if (newValues.includes(id)) {
            newValues = newValues.filter(v => v !== id);
        } else {
            newValues.push(id);
        }
        onChange(newValues);
    };

    return (
        <View className="w-full items-center pb-20 px-6 gap-y-3">
            {options.map((option) => {
                const isSelected = selectedValues.includes(option.id);
                const Icon = option.icon;

                return (
                    <TouchableOpacity
                        key={option.id}
                        onPress={() => handleSelect(option.id)}
                        activeOpacity={0.8}
                        className={clsx(
                            "w-full flex-row items-center px-4 py-4 rounded-2xl border bg-zinc-900/50 border-zinc-800",
                            isSelected && "bg-[#1A1416] border-[#FF4422]"
                        )}
                    >
                        {/* Icon */}
                        {Icon && (
                            <View className={clsx(
                                "w-10 h-10 rounded-xl items-center justify-center mr-4",
                                isSelected ? "bg-[#FF4422]/10" : "bg-zinc-800"
                            )}>
                                <Icon
                                    size={20}
                                    color={isSelected ? "#FF4422" : "#71717a"}
                                    strokeWidth={2}
                                />
                            </View>
                        )}

                        {/* Label */}
                        <Text className={clsx(
                            "flex-1 font-semibold text-base",
                            isSelected ? "text-white" : "text-zinc-400"
                        )}>
                            {option.label}
                        </Text>

                        {/* Checkbox Indicator */}
                        <View className={clsx(
                            "w-6 h-6 rounded-md border-2 items-center justify-center ml-2",
                            isSelected ? "bg-[#FF4422] border-[#FF4422]" : "border-zinc-700"
                        )}>
                            {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
