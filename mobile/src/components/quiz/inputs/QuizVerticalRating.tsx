import React, { useRef, useState, useEffect } from 'react';
import { View, Text, PanResponder } from 'react-native';

interface QuizVerticalRatingProps {
    value: number;
    onChange: (value: number) => void;
    minLabel?: string;
    maxLabel?: string;
}

export const QuizVerticalRating: React.FC<QuizVerticalRatingProps> = ({
    value,
    onChange,
    minLabel = "Péssima",
    maxLabel = "Excelente"
}) => {
    // Refs for PanResponder to access current state/props without closures
    const sliderHeight = useRef(0);
    const onChangeRef = useRef(onChange);
    const valueRef = useRef(value);

    // Keep refs updated
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const MIN = 1;
    const MAX = 10;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt) => {
                handleGesture(evt.nativeEvent.locationY);
            },
            onPanResponderMove: (evt) => {
                handleGesture(evt.nativeEvent.locationY);
            },
        })
    ).current;

    // Extracted logic that uses refs
    const handleGesture = (y: number) => {
        const height = sliderHeight.current;
        if (height === 0) return;

        // Invert Y because 10 is at top (0) and 1 is at bottom (height)
        const clampedY = Math.max(0, Math.min(y, height));
        const percentage = 1 - (clampedY / height);

        const rawValue = MIN + percentage * (MAX - MIN);
        let rounded = Math.round(rawValue);

        // Clamp value between MIN and MAX
        rounded = Math.max(MIN, Math.min(rounded, MAX));

        // Only call onChange if value changed
        if (rounded !== valueRef.current) {
            onChangeRef.current(rounded);
        }
    };

    // Calculate position for visual elements
    // value 10 -> 0% (top)
    // value 1 -> 100% (bottom)
    const getPercentage = (val: number) => {
        return 1 - ((val - MIN) / (MAX - MIN));
    };

    const thumbPercentage = getPercentage(value);

    return (
        <View className="w-full px-8 items-center">
            <View className="w-full flex-row justify-between mb-2">
                <Text className="text-zinc-400 font-medium">{maxLabel}</Text>
                <Text className="text-zinc-600 font-bold">10</Text>
            </View>

            <View
                className="w-full h-64 flex-row justify-center items-center relative my-2"
                {...panResponder.panHandlers}
            >
                {/* Touch Area Capture Layout */}
                <View
                    className="absolute w-full h-full z-20 bg-transparent"
                    onLayout={(e) => {
                        sliderHeight.current = e.nativeEvent.layout.height;
                    }}
                />

                {/* Vertical Track */}
                <View className="h-full w-1 bg-[#FF4422] rounded-full absolute" />

                {/* Ticks */}
                <View
                    className="h-full absolute justify-between py-0 flex-col items-center"
                    pointerEvents="none"
                >
                    {Array.from({ length: 10 }).map((_, i) => {
                        // i=0 is top (10), i=9 is bottom (1)
                        const tickValue = 10 - i;
                        // Highlight tick if it matches current value? Or just static.
                        // Design shows static ticks.
                        return (
                            <View key={i} className="w-6 h-[2px] bg-[#FF4422]" />
                        );
                    })}
                </View>

                {/* Thumb & Value Label */}
                <View
                    className="absolute w-full flex-row justify-center items-center pointer-events-none z-10"
                    style={{
                        top: `${thumbPercentage * 100}%`,
                        transform: [{ translateY: -12 }] // Center the 24px thumb
                    }}
                >
                    {/* Value Label (Left) */}
                    <Text className="text-[#FF4422] text-3xl font-bold absolute right-[50%] mr-8">
                        {value}
                    </Text>

                    {/* Thumb Circle */}
                    <View className="w-6 h-6 rounded-full bg-[#FF4422] border-[3px] border-[#0D090A]" />
                </View>

            </View>

            <View className="w-full flex-row justify-between mt-2">
                <Text className="text-zinc-400 font-medium">{minLabel}</Text>
                <Text className="text-zinc-600 font-bold">1</Text>
            </View>
        </View>
    );
};
