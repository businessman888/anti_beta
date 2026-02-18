import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react-native';

export interface SubOption {
    id: string;
    label: string;
}

export interface OptionWithSub {
    id: string;
    label: string;
    icon?: LucideIcon;
    hasSubOptions?: boolean;
    exclusive?: boolean; // If true, selecting this deselects others
}

interface QuizMultiSelectWithSubProps {
    options: OptionWithSub[];
    subOptions: SubOption[]; // Common sub-options (e.g. frequencies)
    selectedValues: Record<string, string | null>; // id -> subOptionId (or null if selected but no sub-option needed/picked yet)
    onChange: (values: Record<string, string | null>) => void;
}

export const QuizMultiSelectWithSub: React.FC<QuizMultiSelectWithSubProps> = ({
    options,
    subOptions,
    selectedValues,
    onChange
}) => {

    const handleSelectOption = (optionId: string, isExclusive: boolean) => {
        const newSelectedValues = { ...selectedValues };
        const isSelected = newSelectedValues.hasOwnProperty(optionId);

        if (isExclusive) {
            // If exclusive option selected, clear everything else and select this
            if (!isSelected) {
                onChange({ [optionId]: null });
            } else {
                // Deselecting the exclusive option -> clear all
                onChange({});
            }
            return;
        }

        // Non-exclusive option
        if (isSelected) {
            delete newSelectedValues[optionId];
        } else {
            // Add option. If it has matching exclusive option currently selected, remove exclusive one.
            // Find exclusive options in definitions
            options.filter(o => o.exclusive).forEach(ex => delete newSelectedValues[ex.id]);

            newSelectedValues[optionId] = null; // Selected, no sub-option yet
        }
        onChange(newSelectedValues);
    };

    const handleSelectSubOption = (optionId: string, subOptionId: string) => {
        const newSelectedValues = { ...selectedValues };
        newSelectedValues[optionId] = subOptionId;
        onChange(newSelectedValues);
    };

    return (
        <View className="w-full items-center pb-20">
            {options.map((option) => {
                const isSelected = selectedValues.hasOwnProperty(option.id);
                const Icon = option.icon;

                return (
                    <View key={option.id} className="mb-[10px]">
                        {/* Main Option Button */}
                        <TouchableOpacity
                            onPress={() => handleSelectOption(option.id, !!option.exclusive)}
                            activeOpacity={0.8}
                            className={clsx(
                                "flex-row items-center px-4 rounded-2xl border",
                                "w-[345px] h-[81px]",
                                isSelected
                                    ? "bg-[#1A1416] border-[#FF4422]"
                                    : "bg-zinc-900/50 border-zinc-800"
                            )}
                        >
                            {/* Icon */}
                            {Icon && (
                                <View className={clsx(
                                    "w-12 h-12 rounded-xl items-center justify-center mr-4",
                                    isSelected ? "bg-[#FF4422]/10" : "bg-zinc-800"
                                )}>
                                    <Icon
                                        size={24}
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

                            {/* Checkbox/Radio Indicator */}
                            <View className={clsx(
                                "w-6 h-6 rounded-full border-2 items-center justify-center",
                                isSelected ? "border-[#FF4422]" : "border-zinc-700"
                            )}>
                                {isSelected && (
                                    <View className="w-3 h-3 rounded-full bg-[#FF4422]" />
                                )}
                            </View>
                        </TouchableOpacity>

                        {/* Sub-options (only if option selected and hasSubOptions) */}
                        {isSelected && option.hasSubOptions && (
                            <View className="flex-row justify-between mt-2 px-2">
                                {subOptions.map((sub) => {
                                    const isSubSelected = selectedValues[option.id] === sub.id;
                                    return (
                                        <TouchableOpacity
                                            key={sub.id}
                                            onPress={() => handleSelectSubOption(option.id, sub.id)}
                                            className={clsx(
                                                "py-2 px-3 rounded-lg border",
                                                isSubSelected
                                                    ? "bg-[#FF4422]/20 border-[#FF4422]"
                                                    : "bg-zinc-800 border-zinc-700"
                                            )}
                                        >
                                            <Text className={clsx(
                                                "text-xs font-medium",
                                                isSubSelected ? "text-[#FF4422]" : "text-zinc-400"
                                            )}>
                                                {sub.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
};
