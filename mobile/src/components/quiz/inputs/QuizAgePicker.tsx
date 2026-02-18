import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import clsx from 'clsx';
import * as Haptics from 'expo-haptics';

interface QuizAgePickerProps {
    value?: number;
    onChange: (age: number) => void;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

export const QuizAgePicker: React.FC<QuizAgePickerProps> = ({ value, onChange }) => {
    const flatListRef = useRef<FlatList>(null);
    // Generate ages 13 to 99
    const ages = Array.from({ length: 87 }, (_, i) => i + 13);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Initial scroll to value
    useEffect(() => {
        if (value) {
            const index = ages.indexOf(value);
            if (index !== -1) {
                setSelectedIndex(index);
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({ index, animated: false, viewPosition: 0.5 });
                }, 100);
            }
        } else {
            // Default to something reasonable, e.g., 25
            const defaultIndex = ages.indexOf(25);
            if (defaultIndex !== -1) {
                setSelectedIndex(defaultIndex);
                onChange(25);
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({ index: defaultIndex, animated: false, viewPosition: 0.5 });
                }, 100);
            }
        }
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);

        if (index >= 0 && index < ages.length && index !== selectedIndex) {
            setSelectedIndex(index);
            onChange(ages[index]);
            Haptics.selectionAsync();
        }
    };

    const renderItem = ({ item, index }: { item: number; index: number }) => {
        const isSelected = index === selectedIndex;

        return (
            <View style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                    className={clsx(
                        "font-bold",
                        isSelected ? "text-[#FF4422] text-4xl" : "text-zinc-600 text-2xl"
                    )}
                >
                    {item}
                </Text>
            </View>
        );
    };

    return (
        <View className="relative h-[285px] w-[227px] items-center justify-center border border-orange-500/30 rounded-[20px] bg-[#1A1416]">
            {/* Selection Highlight/Overlay */}
            <View
                className="absolute w-[80%] h-[1px] top-[110px] bg-[#FF4422]"
                pointerEvents="none"
            />
            <View
                className="absolute w-[80%] h-[1px] bottom-[110px] bg-[#FF4422]"
                pointerEvents="none"
            />

            <FlatList
                ref={flatListRef}
                data={ages}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                contentContainerStyle={{
                    paddingVertical: (285 - ITEM_HEIGHT) / 2
                }}
            />
        </View>
    );
};
