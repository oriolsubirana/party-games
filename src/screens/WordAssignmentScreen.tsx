import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { Button, Header } from '../components';
import { useGameStore } from '../store/gameStore';

export const WordAssignmentScreen: React.FC = () => {
    const { session, assignWords, nextPlayer } = useGameStore();
    const [showWord, setShowWord] = useState(false);
    const [currentPhase, setCurrentPhase] = useState<'waiting' | 'showing' | 'passing'>('waiting');

    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;
    const isLandscape = width > height;

    useEffect(() => {
        if (session && session.gamePhase === 'setup') {
            assignWords();
        }
    }, [session]);

    const handleShowWord = () => {
        setShowWord(true);
        setCurrentPhase('showing');
    };

    const handleNextPlayer = () => {
        setShowWord(false);
        setCurrentPhase('passing');

        setTimeout(() => {
            nextPlayer();
            setCurrentPhase('waiting');
        }, 2000);
    };

    if (!session || !session.wordPair) {
        return (
            <View style={styles.container}>
                <Text style={[styles.loading, isTablet && styles.loadingTablet]}>
                    Preparando partida...
                </Text>
            </View>
        );
    }

    const currentPlayer = session.players[session.currentPlayerIndex];
    const isLastPlayer = session.currentPlayerIndex === session.players.length - 1;

    if (session.gamePhase === 'playing') {
        // Navegar a la pantalla de explicación
        return null;
    }

    return (
        <View style={styles.container}>
            <Header title="Asignación de palabras" />
            <View style={[
                styles.progressContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.progress, isTablet && styles.progressTablet]}>
                    Jugador {session.currentPlayerIndex + 1} de {session.players.length}
                </Text>
                <View style={[
                    styles.progressBar,
                    isTablet && styles.progressBarTablet
                ]}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${((session.currentPlayerIndex + 1) / session.players.length) * 100}%` }
                        ]}
                    />
                </View>
            </View>

            <View style={[
                styles.content,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                {currentPhase === 'waiting' && (
                    <>
                        <Text style={[styles.title, isTablet && styles.titleTablet]}>
                            {currentPlayer.name}, toca para ver tu palabra
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.wordButton,
                                isTablet && styles.wordButtonTablet
                            ]}
                            onPress={handleShowWord}
                        >
                            <Text style={[
                                styles.wordButtonText,
                                isTablet && styles.wordButtonTextTablet
                            ]}>
                                🔍 Ver palabra
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {currentPhase === 'showing' && (
                    <>
                        <Text style={[styles.title, isTablet && styles.titleTablet]}>
                            Tu palabra es:
                        </Text>
                        <View style={[
                            styles.wordContainer,
                            isTablet && styles.wordContainerTablet
                        ]}>
                            <Text style={[styles.word, isTablet && styles.wordTablet]}>
                                {currentPlayer.word}
                            </Text>
                        </View>
                        <Button
                            title="Siguiente jugador"
                            onPress={handleNextPlayer}
                            variant="primary"
                            fullWidth
                        />
                    </>
                )}

                {currentPhase === 'passing' && (
                    <>
                        <Text style={[styles.title, isTablet && styles.titleTablet]}>
                            Pasa el móvil al siguiente jugador
                        </Text>
                        <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
                            {isLastPlayer ? '¡Último jugador!' : `Siguiente: ${session.players[session.currentPlayerIndex + 1]?.name}`}
                        </Text>
                    </>
                )}
            </View>

            <View style={[
                styles.footer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.instructions, isTablet && styles.instructionsTablet]}>
                    {currentPhase === 'waiting' && 'Toca el botón para ver tu palabra secreta'}
                    {currentPhase === 'showing' && 'Memoriza tu palabra'}
                    {currentPhase === 'passing' && 'Pasa el dispositivo al siguiente jugador'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    progressContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    progress: {
        fontSize: 18,
        color: '#ffff00',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '500',
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    progressTablet: {
        fontSize: 20,
        marginBottom: 20,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#330000',
        borderRadius: 3,
        overflow: 'hidden',
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        width: '100%',
        maxWidth: 300,
        borderWidth: 1,
        borderColor: '#ff4da6',
    },
    progressBarTablet: {
        height: 12,
        borderRadius: 8,
        maxWidth: 400,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ff4da6',
        borderRadius: 3,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00ffff',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 32,
        maxWidth: 300,
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        letterSpacing: 1,
    },
    titleTablet: {
        fontSize: 28,
        marginBottom: 40,
        lineHeight: 36,
        maxWidth: 400,
    },
    wordButton: {
        backgroundColor: '#1a0033',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: '#ff0080',
        shadowColor: '#ff0080',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 15,
    },
    wordButtonTablet: {
        paddingVertical: 24,
        paddingHorizontal: 48,
        borderRadius: 20,
    },
    wordButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff0080',
        textShadowColor: '#ff0080',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    wordButtonTextTablet: {
        fontSize: 22,
    },
    wordContainer: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    wordContainerTablet: {
        marginBottom: 40,
        paddingHorizontal: 32,
    },
    word: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffff00',
        marginBottom: 16,
        textAlign: 'center',
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
        letterSpacing: 2,
    },
    wordTablet: {
        fontSize: 42,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#ff69b4',
        textAlign: 'center',
        marginTop: 16,
        fontWeight: '600',
        textShadowColor: '#ff69b4',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    subtitleTablet: {
        fontSize: 20,
        marginTop: 20,
    },
    footer: {
        paddingBottom: 60,
        paddingHorizontal: 24,
    },
    instructions: {
        fontSize: 16,
        color: '#00ff00',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 300,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    instructionsTablet: {
        fontSize: 18,
        lineHeight: 26,
        maxWidth: 400,
        textAlign: 'center',
    },
    loading: {
        fontSize: 20,
        color: '#00ffff',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        fontWeight: '500',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    loadingTablet: {
        fontSize: 24,
    },
});
