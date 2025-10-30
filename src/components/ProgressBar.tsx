import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
    current: number;
    total: number;
    height?: number;
    backgroundColor?: string;
    progressColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    total,
    height = 8,
    backgroundColor = '#330000',
    progressColor = '#ff4da6',
}) => {
    const progress = Math.min(Math.max((current / total) * 100, 0), 100);

    return (
        <View style={[styles.container, { height, backgroundColor }]}>
            <View
                style={[
                    styles.progress,
                    {
                        width: `${progress}%`,
                        backgroundColor: progressColor,
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ff4da6',
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    progress: {
        height: '100%',
        borderRadius: 3,
    },
});
