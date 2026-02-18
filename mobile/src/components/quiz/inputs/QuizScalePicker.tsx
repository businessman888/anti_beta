import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';

interface QuizScalePickerProps {
    value?: number;
    onChange: (value: number) => void;
}

export const QuizScalePicker: React.FC<QuizScalePickerProps> = ({ value, onChange }) => {
    const firstRow = [1, 2, 3, 4, 5, 6];
    const secondRow = [7, 8, 9, 10];

    // Bar chart data - heights increase from left to right
    // Using simple proportional heights for the 10 bars
    const barHeights = [20, 25, 30, 35, 40, 50, 60, 70, 85, 100];

    return (
        <View className="w-full items-center">
            {/* Number Selection Circles */}
            <View className="w-full mb-12">
                {/* First Row: 1-6 */}
                <View className="flex-row justify-center space-x-3 mb-4">
                    {firstRow.map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onChange(num)}
                            className={clsx(
                                "w-12 h-12 rounded-full items-center justify-center border",
                                value === num
                                    ? "border-[#FF4422] bg-[#FF4422]/10"
                                    : "border-zinc-700 bg-zinc-900/50"
                            )}
                        >
                            <Text className={clsx(
                                "text-lg font-bold",
                                value === num ? "text-[#FF4422]" : "text-zinc-500"
                            )}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Second Row: 7-10 */}
                <View className="flex-row justify-center space-x-3">
                    {secondRow.map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => onChange(num)}
                            className={clsx(
                                "w-12 h-12 rounded-full items-center justify-center border",
                                value === num
                                    ? "border-[#FF4422] bg-[#FF4422]/10"
                                    : "border-zinc-700 bg-zinc-900/50"
                            )}
                        >
                            <Text className={clsx(
                                "text-lg font-bold",
                                value === num ? "text-[#FF4422]" : "text-zinc-500"
                            )}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Scale Label */}
            <Text className="text-[#FF4422] font-bold text-xl mb-6">
                ALTA
            </Text>

            {/* Bar Chart Visualization */}
            <View className="flex-row items-end space-x-2 h-32 px-4">
                {barHeights.map((height, index) => {
                    const num = index + 1;
                    const isSelected = value === num;
                    // Highlight bars up to the selected value? Or just the selected one?
                    // Design implies selected bar is orange, others gray.
                    // Or maybe bars light up as you go up?
                    // Looking at design: "ALTA" is red/orange. The bars seem to be gray, with maybe the selected one highlighted?
                    // Let's highlight the selected bar strongly, maybe color others based on selection state if desired later.
                    // For now, selected bar is orange, others are zinc-700.

                    return (
                        <View
                            key={index}
                            style={{ height: `${height}%` }}
                            className={clsx(
                                "w-6 rounded-t-sm",
                                isSelected ? "bg-[#FF4422]" : "bg-zinc-700"
                            )}
                        />
                    );
                })}
            </View>
        </View>
    );
};
