import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useGameStore } from '../store/gameStore';

interface BackButtonProps {
    onPress?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
    const { resetGame } = useGameStore();
    const { width } = useWindowDimensions();
    const isTablet = width > 768;

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            // Por defecto, volver al inicio
            resetGame();
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.backButton,
                isTablet && styles.backButtonTablet
            ]}
            onPress={handlePress}
        >
            <Text style={[
                styles.backButtonText,
                isTablet && styles.backButtonTextTablet
            ]}>
                ←
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: '#001a33',
        width: 40,
        height: 40,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#66ffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#66ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 1000,
    },
    backButtonTablet: {
        top: 60,
        left: 30,
        width: 48,
        height: 48,
        borderRadius: 8,
        borderWidth: 2,
    },
    backButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#66ffff',
        textAlign: 'center',
        textShadowColor: '#66ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    backButtonTextTablet: {
        fontSize: 24,
    },
});
