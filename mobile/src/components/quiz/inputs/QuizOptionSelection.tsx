import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react-native';

interface Option {
    id: string;
    label: string;
    description?: string; // For subtitle if needed
    icon?: LucideIcon;
}

interface QuizOptionSelectionProps {
    options: Option[];
    selectedId?: string;
    onSelect: (id: string) => void;
}

export const QuizOptionSelection: React.FC<QuizOptionSelectionProps> = ({ options, selectedId, onSelect }) => {
    return (
        <View className="w-full items-center">
            <View className="pb-20">
                {options.map((option) => {
                    const isSelected = selectedId === option.id;
                    const Icon = option.icon;

                    return (
                        <TouchableOpacity
                            key={option.id}
                            onPress={() => onSelect(option.id)}
                            activeOpacity={0.8}
                            className={clsx(
                                "flex-row items-center px-4 rounded-2xl border mb-[10px]",
                                "w-[345px] h-[81px]",
                                isSelected
                                    ? "bg-[#1A1416] border-[#FF4422]"
                                    : "bg-zinc-900/50 border-zinc-800"
                            )}
                        >
                            {/* Icon Container - Only render if icon exists */}
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
                            <View className="flex-1">
                                <Text className={clsx(
                                    "font-semibold text-base",
                                    isSelected ? "text-white" : "text-zinc-400"
                                )}>
                                    {option.label}
                                </Text>
                                {option.description && (
                                    <Text className="text-zinc-500 text-sm mt-0.5">
                                        {option.description}
                                    </Text>
                                )}
                            </View>

                            {/* Radio Button Indicator */}
                            <View className={clsx(
                                "w-6 h-6 rounded-full border-2 items-center justify-center",
                                isSelected ? "border-[#FF4422]" : "border-zinc-700"
                            )}>
                                {isSelected && (
                                    <View className="w-3 h-3 rounded-full bg-[#FF4422]" />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
