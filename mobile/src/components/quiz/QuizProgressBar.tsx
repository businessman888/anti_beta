import React, { useEffect, useState } from 'react';
import { View, Animated, Text } from 'react-native';

interface QuizProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ currentStep, totalSteps }) => {
    const [width, setWidth] = useState(new Animated.Value(0));

    useEffect(() => {
        const progress = Math.min((currentStep + 1) / totalSteps, 1);

        Animated.timing(width, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false, // width is not supported by native driver
        }).start();
    }, [currentStep, totalSteps]);

    const widthInterpolated = width.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

    return (
        <View className="mb-8 w-full">


            <View className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-2 w-full">
                <Animated.View
                    className="h-full bg-orange-500"
                    style={{ width: widthInterpolated }}
                />
            </View>

            <Text className="text-zinc-500 text-xs mt-1">
                Progresso: <Text className="text-orange-500 font-bold">{percentage}%</Text>
            </Text>
        </View>
    );
};
