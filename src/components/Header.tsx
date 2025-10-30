import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    showBackButton = true,
    onBackPress
}) => {
    const { width } = useWindowDimensions();
    const isTablet = width >= 768;

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {showBackButton && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                )}

                <View style={[styles.titleContainer, !showBackButton && styles.titleCentered]}>
                    <Text style={[styles.title, isTablet && styles.titleTablet]}>
                        {title}
                    </Text>
                </View>

                {showBackButton && <View style={styles.spacer} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ff4da6',
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
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
    },
    backButtonText: {
        color: '#66ffff',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#66ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleCentered: {
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff4da6',
        textAlign: 'center',
        textShadowColor: '#ff4da6',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
        letterSpacing: 1,
    },
    titleTablet: {
        fontSize: 28,
        letterSpacing: 1.5,
    },
    spacer: {
        width: 40,
    },
});
