import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, useWindowDimensions, ScrollView } from 'react-native';
import { Button, Header } from '../components';
import { useGameStore } from '../store/gameStore';

export const PlayerListScreen: React.FC = () => {
    const { session, setPlayerNames, assignWords } = useGameStore();
    const [playerNames, setLocalPlayerNames] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;

    if (!session) return null;

    // Inicializar nombres si no están definidos
    React.useEffect(() => {
        if (playerNames.length === 0) {
            const initialNames = session.players.map(player => player.name);
            setLocalPlayerNames(initialNames);
            setErrors(new Array(session.players.length).fill(''));
        }
    }, [session, playerNames.length]);

    const handleNameChange = (index: number, text: string) => {
        const newNames = [...playerNames];
        newNames[index] = text; // Permitir texto vacío para poder borrar completamente
        setLocalPlayerNames(newNames);

        // Validar en tiempo real
        const newErrors = [...errors];
        if (text.trim().length > 0 && text.trim().length < 2) {
            newErrors[index] = 'Mínimo 2 caracteres';
        } else {
            newErrors[index] = '';
        }
        setErrors(newErrors);
    };

    const validateNames = (): boolean => {
        const newErrors = playerNames.map((name, index) => {
            if (name.trim().length < 2) {
                return 'Mínimo 2 caracteres';
            }
            return '';
        });

        setErrors(newErrors);

        // Verificar si hay algún error
        return !newErrors.some(error => error !== '');
    };

    const handleStartGame = () => {
        if (!validateNames()) {
            return;
        }

        // Guardar nombres en el store
        setPlayerNames(playerNames);

        // Llamar a assignWords para cambiar a la siguiente fase
        setTimeout(() => {
            assignWords();
        }, 100);
    };

    const hasValidNames = playerNames.every(name => name.trim().length >= 2);

    return (
        <View style={styles.container}>
            <Header title="👥 Nombres de los jugadores" />
            <View style={[
                styles.subtitleContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
                    Escribe el nombre de cada jugador
                </Text>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={[styles.scrollContent]}
                showsVerticalScrollIndicator={false}
            >
                <View style={[
                    styles.playersContainer,
                    { paddingHorizontal: isTablet ? 40 : 24 }
                ]}>
                    {session.players.map((player, index) => (
                        <View key={player.id} style={[
                            styles.playerCard,
                            isTablet && styles.playerCardTablet
                        ]}>
                            <TextInput
                                style={[
                                    styles.nameInput,
                                    isTablet && styles.nameInputTablet,
                                    errors[index] ? styles.nameInputError : null
                                ]}
                                value={playerNames[index] || ''}
                                onChangeText={(text) => handleNameChange(index, text)}
                                placeholder={`Jugador ${index + 1}`}
                                placeholderTextColor="#9ca3af"
                                maxLength={20}
                                autoCapitalize="words"
                            />

                            {errors[index] ? (
                                <Text style={styles.errorText}>
                                    {errors[index]}
                                </Text>
                            ) : null}
                        </View>
                    ))}
                </View>

                <View style={[
                    styles.buttonContainer,
                    { paddingHorizontal: isTablet ? 24 : 12 }
                ]}>
                    <Button
                        title="¡Empezar partida!"
                        onPress={handleStartGame}
                        variant="primary"
                        fullWidth
                        disabled={!hasValidNames}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    subtitleContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ff4da6',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 36,
        textShadowColor: '#ff4da6',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        letterSpacing: 1,
    },
    titleTablet: {
        fontSize: 32,
        marginBottom: 16,
        lineHeight: 40,
    },
    subtitle: {
        fontSize: 18,
        color: '#66ffff',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
        textShadowColor: '#66ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    subtitleTablet: {
        fontSize: 20,
        marginBottom: 28,
        lineHeight: 26,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    playersContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    playersContainerTablet: {
        marginBottom: 25,
    },
    playerCard: {
        backgroundColor: '#1a0033',
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        width: '100%',
        maxWidth: 520,
        borderWidth: 2,
        borderColor: '#ff4da6',
    },
    playerCardTablet: {
        padding: 24,
        borderRadius: 20,
        marginBottom: 20,
        maxWidth: 640,
    },
    nameInput: {
        backgroundColor: '#000033',
        borderWidth: 2,
        borderColor: '#66ffff',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 18,
        color: '#66ffff',
        textAlign: 'center',
        marginBottom: 8,
        shadowColor: '#66ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    nameInputTablet: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        borderRadius: 16,
    },
    nameInputError: {
        borderColor: '#ff6666',
        shadowColor: '#ff6666',
    },
    errorText: {
        color: '#ff6666',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: '#ff6666',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
    },
    buttonContainer: {
        paddingTop: 5,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
});
