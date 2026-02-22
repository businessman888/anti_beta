import { View, Image } from 'react-native';

export const AlphaAvatar = () => {
    return (
        <View className="items-center justify-center py-10">
            <View className="w-48 h-48 items-center justify-center">
                <Image
                    source={require('../../../../icons/Group 14.png')}
                    className="w-32 h-32"
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};
