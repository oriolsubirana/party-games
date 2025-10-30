import React from 'react';
import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import { Button } from '../components/Button';
import { useGameStore } from '../store/gameStore';

export const HomeScreen: React.FC = () => {
    const { createSession } = useGameStore();
    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;
    const isLandscape = width > height;

    const handleCreateGame = () => {
        console.log('Botón presionado: Crear partida');

        try {
            // Crear una sesión inicial con valores por defecto
            createSession(4, 'impostor', 1);
            console.log('Sesión creada exitosamente');
        } catch (error) {
            console.error('Error al crear partida:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[
                styles.content,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <View style={[
                    styles.logoContainer,
                    isTablet && styles.logoContainerTablet,
                    isLandscape && styles.logoContainerLandscape
                ]}>
                    <Text style={[
                        styles.logo,
                        isTablet && styles.logoTablet
                    ]}>
                        🎮
                    </Text>
                    <Text style={[
                        styles.title,
                        isTablet && styles.titleTablet
                    ]}>
                        Party Games
                    </Text>
                    <Text style={[
                        styles.subtitle,
                        isTablet && styles.subtitleTablet
                    ]}>
                        Juegos sociales para divertirte con amigos
                    </Text>
                </View>

                <View style={[
                    styles.buttonContainer,
                    isTablet && styles.buttonContainerTablet
                ]}>
                    <Button
                        title="Crear partida"
                        onPress={handleCreateGame}
                        variant="primary"
                        fullWidth
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    logoContainerTablet: {
        paddingHorizontal: 24,
    },
    logoContainerLandscape: {
        flex: 0.7,
    },
    logo: {
        fontSize: 80,
        marginBottom: 24,
        textShadowColor: '#ffff66',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },
    logoTablet: {
        fontSize: 100,
        marginBottom: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ff4da6',
        marginBottom: 16,
        textAlign: 'center',
        lineHeight: 44,
        textShadowColor: '#ff4da6',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
        letterSpacing: 1,
    },
    titleTablet: {
        fontSize: 48,
        marginBottom: 20,
        lineHeight: 56,
    },
    subtitle: {
        fontSize: 18,
        color: '#66ffff',
        textAlign: 'center',
        lineHeight: 26,
        maxWidth: 300,
        textShadowColor: '#66ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    subtitleTablet: {
        fontSize: 20,
        lineHeight: 28,
        maxWidth: 400,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 320,
        paddingHorizontal: 16,
    },
    buttonContainerTablet: {
        maxWidth: 400,
        paddingHorizontal: 24,
    },
});
