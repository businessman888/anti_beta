import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface QuizTimeSliderProps {
    value: number;
    onChange: (value: number) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
}

export const QuizTimeSlider: React.FC<QuizTimeSliderProps> = ({
    value,
    onChange,
    minimumValue = 0,
    maximumValue = 8,
    step = 0.5
}) => {
    // Determine color based on value (optional, keeping it orange for now as per design)
    const activeColor = '#FF4422';

    // Generate ticks for the ruler
    // We want a tick for every integer value in the range
    const ticks = useMemo(() => {
        const count = maximumValue - minimumValue + 1;
        return Array.from({ length: count }, (_, i) => minimumValue + i);
    }, [minimumValue, maximumValue]);

    return (
        <View className="w-full items-center">
            {/* Value Display */}
            <View className="mb-12 items-center justify-center w-48 h-32 rounded-[40px] border border-zinc-800 bg-zinc-900/50">
                <View className="flex-row items-baseline">
                    <Text className="text-white text-6xl font-bold">
                        {value.toFixed(1)}
                    </Text>
                    <Text className="text-orange-500 text-3xl font-bold ml-1">
                        h
                    </Text>
                </View>
            </View>

            {/* Slider Container */}
            <View className="w-full px-4">
                {/* Ruler Marks (Background) */}
                <View className="flex-row justify-between w-full px-2 absolute top-5 ml-4">
                    {ticks.map((tickValue) => (
                        <View key={tickValue} className="items-center" style={{ width: `${100 / (ticks.length - 1)}%` }}>
                            {/* Tall mark for hours */}
                            <View className="w-[1px] h-4 bg-zinc-700 mb-1" />
                            {/* Show label for specific ticks to avoid clutter if range is large, or just first/last */}
                            {/* For 0-8 range (9 ticks), showing all fits. For 3-12 (10 ticks), showing first/last/middle might be better? */}
                            {/* Let's show first, last, and maybe every 2nd or 3rd if too many? */}
                            {/* Simple logic: Show first and last for sure. Maybe others if space permits. */}
                            {/* For now, replicating previous behavior: First and Last only to be safe cleanly. */}
                            {tickValue === minimumValue || tickValue === maximumValue ? (
                                <Text className="text-zinc-600 text-xs text-center w-8 -ml-4">{tickValue}h</Text>
                            ) : (
                                <View />
                            )}
                        </View>
                    ))}
                </View>

                {/* Slider Component */}
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    step={step}
                    value={value}
                    onValueChange={onChange}
                    minimumTrackTintColor={activeColor}
                    maximumTrackTintColor="#333"
                    thumbTintColor={activeColor}
                />
            </View>
        </View>
    );
};
