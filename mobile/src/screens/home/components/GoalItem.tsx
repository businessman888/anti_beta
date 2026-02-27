import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, Droplet, HelpCircle } from 'lucide-react-native';

interface GoalItemProps {
    title: string;
    completed: boolean;
    type: string;
    onPress?: () => void;
}

export const GoalItem = ({ title, completed, type, onPress }: GoalItemProps) => {
    const renderIcon = () => {
        if (type === 'water') {
            return <Droplet size={20} color={completed ? '#22c55e' : '#ef4444'} fill={completed ? '#22c55e' : 'none'} />;
        }
        if (type === 'quiz') {
            return <HelpCircle size={20} color="#71717a" />;
        }
        if (completed) {
            return <CheckCircle2 size={20} color="#22c55e" strokeWidth={3} />;
        }
        return <Circle size={20} color="#71717a" />;
    };

    const content = (
        <View className="flex-row items-center mb-4">
            {renderIcon()}
            <Text className={`ml-3 text-base ${completed ? 'text-zinc-300' : 'text-zinc-500'} ${type === 'water' && !completed ? 'text-zinc-500' : ''}`}>
                {title}
            </Text>
        </View>
    );

    if (completed || !onPress) {
        return content;
    }

    return (
        <TouchableOpacity onPress={onPress}>
            {content}
        </TouchableOpacity>
    );
};
