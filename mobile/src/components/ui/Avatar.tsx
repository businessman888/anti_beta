import React, { useState } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { User2 } from 'lucide-react-native';

interface AvatarProps {
  url?: string | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  fallbackColor?: string;
  fallbackIconColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  url,
  size = 40,
  style,
  imageStyle,
  fallbackColor = '#27272a', // zinc-800
  fallbackIconColor = '#a1a1aa' // zinc-400
}) => {
  const [hasError, setHasError] = useState(false);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: fallbackColor,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
  };

  const showFallback = !url || hasError;

  return (
    <View style={[containerStyle, style]}>
      {showFallback ? (
        <User2 size={size * 0.6} color={fallbackIconColor} />
      ) : (
        <Image
          source={{ uri: url }}
          style={[StyleSheet.absoluteFill, imageStyle]}
          onError={() => setHasError(true)}
        />
      )}
    </View>
  );
};
