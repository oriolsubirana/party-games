import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { Button, Header } from '../components';
import { useGameStore } from '../store/gameStore';

export const GameResultsScreen: React.FC = () => {
    const { session, resetGame } = useGameStore();
    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;
    const isLandscape = width > height;

    if (!session) return null;

    const impostors = session.players.filter(player => player.role === 'impostor');
    const civils = session.players.filter(player => player.role === 'civil');

    // Determinar el ganador basándose en la votación (>50% de votos)
    const totalVotes = Object.keys(session.votes).length;
    const eliminatedPlayer = session.players.find(player => {
        const voteCount = Object.values(session.votes).filter(vote => vote === player.id).length;
        return voteCount > totalVotes / 2;
    });

    const impostorsWon = eliminatedPlayer && eliminatedPlayer.role === 'civil';
    const civilsWon = eliminatedPlayer && eliminatedPlayer.role === 'impostor';

    const handleNewGame = () => {
        resetGame();
        // Navegar a la pantalla de inicio
    };

    return (
        <View style={styles.container}>
            <Header title="🏆 Resultado final" />
            <ScrollView
                style={styles.scrollContent}
                contentContainerStyle={[
                    styles.scrollContentContainer,
                    { paddingHorizontal: isTablet ? 40 : 24 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                {impostorsWon && (
                    <View style={[
                        styles.winnerCard,
                        isTablet && styles.winnerCardTablet
                    ]}>
                        <Text style={[styles.winnerEmoji, isTablet && styles.winnerEmojiTablet]}>
                            🎭
                        </Text>
                        <Text style={[styles.winnerTitle, isTablet && styles.winnerTitleTablet]}>
                            ¡Los impostores ganan!
                        </Text>
                        <Text style={[styles.winnerSubtitle, isTablet && styles.winnerSubtitleTablet]}>
                            Los civiles eliminaron a uno de los suyos
                        </Text>
                    </View>
                )}

                {civilsWon && (
                    <View style={[
                        styles.winnerCard,
                        isTablet && styles.winnerCardTablet
                    ]}>
                        <Text style={[styles.winnerEmoji, isTablet && styles.winnerEmojiTablet]}>
                            👥
                        </Text>
                        <Text style={[styles.winnerTitle, isTablet && styles.winnerTitleTablet]}>
                            ¡Los civiles ganan!
                        </Text>
                        <Text style={[styles.winnerSubtitle, isTablet && styles.winnerSubtitleTablet]}>
                            ¡Descubrieron a un impostor!
                        </Text>
                    </View>
                )}
                <View style={[
                    styles.section,
                    isTablet && styles.sectionTablet
                ]}>
                    <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
                        🎭 Los impostores eran:
                    </Text>
                    {impostors.map((player) => (
                        <View key={player.id} style={[
                            styles.playerCard,
                            isTablet && styles.playerCardTablet
                        ]}>
                            <Text style={[styles.playerName, isTablet && styles.playerNameTablet]}>
                                {player.name}
                            </Text>
                            <Text style={[styles.playerWord, isTablet && styles.playerWordTablet]}>
                                Palabra: {player.word}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={[
                    styles.section,
                    isTablet && styles.sectionTablet
                ]}>
                    <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
                        👥 Los civiles eran:
                    </Text>
                    {civils.map((player) => (
                        <View key={player.id} style={[
                            styles.playerCard,
                            isTablet && styles.playerCardTablet
                        ]}>
                            <Text style={[styles.playerName, isTablet && styles.playerNameTablet]}>
                                {player.name}
                            </Text>
                            <Text style={[styles.playerWord, isTablet && styles.playerWordTablet]}>
                                Palabra: {player.word}
                            </Text>
                        </View>
                    ))}
                </View>

                {eliminatedPlayer && (
                    <View style={[
                        styles.section,
                        isTablet && styles.sectionTablet
                    ]}>
                        <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
                            ❌ Jugador eliminado:
                        </Text>
                        <View style={[
                            styles.eliminatedCard,
                            isTablet && styles.eliminatedCardTablet
                        ]}>
                            <Text style={[styles.playerName, isTablet && styles.playerNameTablet]}>
                                {eliminatedPlayer.name}
                            </Text>
                            <Text style={[styles.playerRole, isTablet && styles.playerRoleTablet]}>
                                {eliminatedPlayer.role === 'impostor' ? '🎭 Impostor' : '👤 Civil'}
                            </Text>
                            <Text style={[styles.playerWord, isTablet && styles.playerWordTablet]}>
                                Palabra: {eliminatedPlayer.word}
                            </Text>
                        </View>
                    </View>
                )}

                <View style={[
                    styles.wordPairContainer,
                    isTablet && styles.wordPairContainerTablet
                ]}>
                    <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
                        📝 Palabras de la partida:
                    </Text>
                    <View style={[
                        styles.wordPairCard,
                        isTablet && styles.wordPairCardTablet
                    ]}>
                        <View style={[
                            styles.wordItem,
                            isTablet && styles.wordItemTablet
                        ]}>
                            <Text style={[styles.wordLabel, isTablet && styles.wordLabelTablet]}>
                                👤 Civil:
                            </Text>
                            <Text style={[styles.wordText, isTablet && styles.wordTextTablet]}>
                                {session.wordPair?.civil}
                            </Text>
                        </View>
                        <View style={[
                            styles.wordItem,
                            isTablet && styles.wordItemTablet
                        ]}>
                            <Text style={[styles.wordLabel, isTablet && styles.wordLabelTablet]}>
                                🎭 Impostor:
                            </Text>
                            <Text style={[styles.wordText, isTablet && styles.wordTextTablet]}>
                                {session.wordPair?.impostor}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={[
                styles.buttonContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Button
                    title="Nueva partida"
                    onPress={handleNewGame}
                    variant="primary"
                    fullWidth
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    // content wrapper removed; winner card is now inside the ScrollView
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#66ffff',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 36,
        textShadowColor: '#66ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        letterSpacing: 1,
    },
    titleTablet: {
        fontSize: 32,
        marginBottom: 24,
        lineHeight: 40,
    },
    winnerCard: {
        backgroundColor: '#1a0033',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff4da6',
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
        marginBottom: 16,
    },
    winnerCardTablet: {
        padding: 24,
        borderRadius: 12,
        maxWidth: 640,
        borderWidth: 4,
    },
    winnerEmoji: {
        fontSize: 40,
        marginBottom: 12,
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    winnerEmojiTablet: {
        fontSize: 48,
        marginBottom: 16,
    },
    winnerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff4da6',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 28,
        textShadowColor: '#ff4da6',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
        letterSpacing: 0.5,
    },
    winnerTitleTablet: {
        fontSize: 24,
        marginBottom: 12,
        lineHeight: 32,
    },
    winnerSubtitle: {
        fontSize: 16,
        color: '#66ff66',
        textAlign: 'center',
        lineHeight: 22,
        textShadowColor: '#66ff66',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
    },
    winnerSubtitleTablet: {
        fontSize: 18,
        lineHeight: 24,
    },
    scrollContent: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingVertical: 20,
        paddingBottom: 120,
        alignItems: 'center',
    },
    section: {
        marginBottom: 16,
        alignItems: 'center',
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    sectionTablet: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffff66',
        marginBottom: 12,
        textAlign: 'center',
        textShadowColor: '#ffff66',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
        letterSpacing: 0.5,
    },
    sectionTitleTablet: {
        fontSize: 20,
        marginBottom: 16,
    },
    playerCard: {
        backgroundColor: '#0d001a',
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
        shadowColor: '#66ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        width: '100%',
        maxWidth: 520,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#66ffff',
        alignSelf: 'center',
    },
    playerCardTablet: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        maxWidth: 640,
        borderWidth: 3,
    },
    playerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00ffff',
        marginBottom: 4,
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    playerNameTablet: {
        fontSize: 18,
        marginBottom: 6,
    },
    playerWord: {
        fontSize: 14,
        color: '#ff69b4',
        textShadowColor: '#ff69b4',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    playerWordTablet: {
        fontSize: 16,
    },
    playerRole: {
        fontSize: 14,
        color: '#32cd32',
        fontWeight: '600',
        marginBottom: 4,
        textShadowColor: '#32cd32',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    playerRoleTablet: {
        fontSize: 16,
        marginBottom: 6,
    },
    eliminatedCard: {
        backgroundColor: '#330000',
        padding: 16,
        borderRadius: 6,
        opacity: 1,
        shadowColor: '#ff0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 12,
        elevation: 12,
        width: '100%',
        maxWidth: 520,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ff0000',
        alignSelf: 'center',
    },
    eliminatedCardTablet: {
        padding: 20,
        borderRadius: 8,
        maxWidth: 640,
        borderWidth: 4,
    },
    wordPairContainer: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    wordPairContainerTablet: {
        marginTop: 16,
    },
    wordPairCard: {
        backgroundColor: '#001a33',
        padding: 16,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: '#ffd700',
        shadowColor: '#ffd700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 12,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    wordPairCardTablet: {
        padding: 20,
        borderRadius: 8,
        maxWidth: 640,
        borderWidth: 4,
    },
    wordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 4,
    },
    wordItemTablet: {
        marginBottom: 12,
        paddingVertical: 6,
    },
    wordLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffd700',
        textShadowColor: '#ffd700',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    wordLabelTablet: {
        fontSize: 16,
    },
    wordText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00ffff',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    wordTextTablet: {
        fontSize: 18,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        paddingTop: 20,
        paddingBottom: 40,
        borderTopWidth: 2,
        borderTopColor: '#ff4da6',
    },
});
