import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { Button, Header } from '../components';
import { useGameStore } from '../store/gameStore';

export const VotingScreen: React.FC = () => {
    const { session, vote, finishGame, startNewRound } = useGameStore();
    const [currentVoter, setCurrentVoter] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;
    const isLandscape = width > height;

    if (!session) return null;

    const alivePlayers = session.players.filter(p => !p.isEliminated);

    const handleVote = (targetId: string) => {
        const voterId = alivePlayers[currentVoter].id;
        vote(voterId, targetId);

        if (currentVoter < alivePlayers.length - 1) {
            setCurrentVoter(currentVoter + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleFinishVoting = () => {
        if (eliminatedPlayer) {
            if (eliminatedPlayer.role === 'impostor') {
                finishGame();
                return;
            }

            const civilsAlive = session.players.filter(p => !p.isEliminated && p.role === 'civil').length;
            const impostorsAlive = session.players.filter(p => !p.isEliminated && p.role === 'impostor').length;
            const civilsAfterElimination = civilsAlive - 1;

            if (civilsAfterElimination === impostorsAlive) {
                finishGame();
            } else {
                useGameStore.getState().eliminatePlayer(eliminatedPlayer.id);
                startNewRound();
                setCurrentVoter(0);
                setShowResults(false);
            }
        } else {
            // Si nadie fue eliminado, iniciar nueva ronda
            startNewRound();
            setCurrentVoter(0);
            setShowResults(false);
        }
    };

    const currentVoterPlayer = alivePlayers[currentVoter];
    const playersWithVotes = session.players.map(player => ({
        ...player,
        voteCount: Object.values(session.votes).filter(vote => vote === player.id).length,
    })).sort((a, b) => b.voteCount - a.voteCount);

    // Calcular si alguien fue eliminado (más del 50% de los votos)
    const totalVotes = Object.keys(session.votes).length;
    const eliminatedPlayer = playersWithVotes.find(player =>
        player.voteCount > totalVotes / 2
    );
    const civilsAliveForLabel = session.players.filter(p => !p.isEliminated && p.role === 'civil').length;
    const impostorsAliveForLabel = session.players.filter(p => !p.isEliminated && p.role === 'impostor').length;
    const civilsAfterEliminationForLabel = eliminatedPlayer && eliminatedPlayer.role === 'civil' ? (civilsAliveForLabel - 1) : civilsAliveForLabel;
    const shouldShowFinalLabel = !!eliminatedPlayer && (
        eliminatedPlayer.role === 'impostor' || (eliminatedPlayer.role === 'civil' && civilsAfterEliminationForLabel === impostorsAliveForLabel)
    );

    if (showResults) {
        return (
            <View style={styles.container}>
                <Header title={`📊 Resultados - Ronda ${session.currentRound}`} />

                <ScrollView
                    style={styles.scrollContent}
                    contentContainerStyle={[
                        styles.scrollContentContainer,
                        { alignItems: 'center' },
                        { paddingHorizontal: isTablet ? 40 : 24 }
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {!eliminatedPlayer && (
                        <View style={[
                            styles.noEliminationContainer,
                            isTablet && styles.noEliminationContainerTablet
                        ]}>
                            <Text style={[styles.noEliminationTitle, isTablet && styles.noEliminationTitleTablet]}>
                                🤝 Nadie fue eliminado
                            </Text>
                            <Text style={[styles.noEliminationText, isTablet && styles.noEliminationTextTablet]}>
                                Ningún jugador recibió más del 50% de los votos.
                                Se jugará una nueva ronda de votación.
                            </Text>
                        </View>
                    )}

                    {eliminatedPlayer && eliminatedPlayer.role === 'civil' && !shouldShowFinalLabel && (
                        <View style={[
                            styles.infoContainer,
                            isTablet && styles.infoContainerTablet
                        ]}>
                            <Text style={[styles.infoTitle, isTablet && styles.infoTitleTablet]}>
                                🟡 El jugador eliminado era un civil
                            </Text>
                            <Text style={[styles.infoText, isTablet && styles.infoTextTablet]}>
                                Queda eliminado de la partida y se jugará una nueva ronda.
                            </Text>
                        </View>
                    )}

                    <View style={[
                        styles.votesSummary,
                        isTablet && styles.votesSummaryTablet
                    ]}>
                        <Text style={[styles.votesSummaryText, isTablet && styles.votesSummaryTextTablet]}>
                            Total de votos emitidos: {totalVotes} de {session.players.length}
                        </Text>
                    </View>

                    <View style={[
                        styles.resultsContainer,
                        isTablet && styles.resultsContainerTablet
                    ]}>
                        {playersWithVotes.map((player, index) => {
                            const isEliminated = eliminatedPlayer && player.id === eliminatedPlayer.id;
                            return (
                                <View key={player.id} style={[
                                    styles.resultCard,
                                    isTablet && styles.resultCardTablet,
                                    isEliminated && styles.eliminatedCard
                                ]}>
                                    <View style={styles.resultHeader}>
                                        <Text style={[
                                            styles.playerName,
                                            isTablet && styles.playerNameTablet,
                                            isEliminated && styles.eliminatedPlayerName
                                        ]}>
                                            {player.name}
                                        </Text>
                                        <Text style={[
                                            styles.voteCount,
                                            isTablet && styles.voteCountTablet,
                                            isEliminated && styles.eliminatedVoteCount
                                        ]}>
                                            {player.voteCount} votos
                                        </Text>
                                    </View>
                                    {isEliminated && (
                                        <Text style={[styles.eliminatedLabel, isTablet && styles.eliminatedLabelTablet]}>
                                            ❌ ELIMINADO
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={[
                    styles.buttonContainer,
                    { paddingHorizontal: isTablet ? 40 : 24 }
                ]}>
                    <Button
                        title={shouldShowFinalLabel ? "Ver resultado final" : "Jugar nueva ronda"}
                        onPress={handleFinishVoting}
                        variant="primary"
                        fullWidth
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title={`🗳️ Votación - Ronda ${session.currentRound}`} />
            <View style={[
                styles.progressContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.progress, isTablet && styles.progressTablet]}>
                    Ronda {session.currentRound} - Votación {currentVoter + 1} de {session.players.length}
                </Text>
                <View style={[
                    styles.progressBar,
                    isTablet && styles.progressBarTablet
                ]}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${((currentVoter + 1) / session.players.length) * 100}%` }
                        ]}
                    />
                </View>
            </View>

            <View style={[
                styles.content,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.title, isTablet && styles.titleTablet]}>
                    {currentVoterPlayer.name}, ¿quién crees que es el impostor?
                </Text>

                <View style={[
                    styles.playersContainer,
                    isTablet && styles.playersContainerTablet
                ]}>
                    {session.players
                        .filter(player => !player.isEliminated)
                        .filter(player => player.id !== currentVoterPlayer.id)
                        .map((player) => (
                            <TouchableOpacity
                                key={player.id}
                                style={[
                                    styles.playerCard,
                                    isTablet && styles.playerCardTablet
                                ]}
                                onPress={() => handleVote(player.id)}
                            >
                                <Text style={[styles.playerName, isTablet && styles.playerNameTablet]}>
                                    {player.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </View>

            <View style={[
                styles.footer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.instructions, isTablet && styles.instructionsTablet]}>
                    Selecciona al jugador que crees que es el impostor
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
        color: '#ffff66',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '500',
        textShadowColor: '#ffff66',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
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
        paddingVertical: 20,
        paddingBottom: 120,
        alignItems: 'center',
    },
    scrollContent: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingVertical: 20,
        paddingBottom: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#66ffff',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 32,
        maxWidth: 300,
        textShadowColor: '#66ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        letterSpacing: 0.5,
    },
    titleTablet: {
        fontSize: 28,
        marginBottom: 32,
        lineHeight: 36,
        maxWidth: 400,
    },
    playersContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    playersContainerTablet: {
        paddingHorizontal: 24,
    },
    playerCard: {
        backgroundColor: '#1a0033',
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff4da6',
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    playerCardTablet: {
        padding: 24,
        marginBottom: 20,
        borderRadius: 20,
    },
    playerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#00ffff',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    playerNameTablet: {
        fontSize: 20,
    },
    playerRole: {
        fontSize: 24,
    },
    playerRoleTablet: {
        fontSize: 28,
    },
    footer: {
        paddingBottom: 40,
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
    },
    resultsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 8,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    resultsContainerTablet: {
        marginBottom: 20,
        paddingTop: 12,
    },
    resultCard: {
        backgroundColor: '#0d001a',
        padding: 20,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 2,
        borderColor: '#00ffff',
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    resultCardTablet: {
        padding: 24,
        marginBottom: 16,
        borderRadius: 20,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    voteCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffd700',
        textShadowColor: '#ffd700',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    voteCountTablet: {
        fontSize: 20,
    },
    eliminatedCard: {
        backgroundColor: '#330000',
        borderColor: '#ff0000',
        borderWidth: 3,
        shadowColor: '#ff0000',
    },
    eliminatedPlayerName: {
        color: '#ff0000',
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    eliminatedVoteCount: {
        color: '#ff6666',
        textShadowColor: '#ff6666',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    eliminatedLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: '#ff0000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ffffff',
    },
    eliminatedLabelTablet: {
        fontSize: 18,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginTop: 12,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        paddingTop: 20,
        paddingBottom: 40,
        borderTopWidth: 3,
        borderTopColor: '#ff0080',
    },
    noEliminationContainer: {
        backgroundColor: '#001a00',
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00ff00',
        shadowColor: '#00ff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 12,
    },
    noEliminationContainerTablet: {
        padding: 24,
        borderRadius: 20,
        marginBottom: 20,
    },
    noEliminationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ff00',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 28,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    noEliminationTitleTablet: {
        fontSize: 24,
        marginBottom: 16,
        lineHeight: 32,
    },
    noEliminationText: {
        fontSize: 16,
        color: '#32cd32',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 300,
        textShadowColor: '#32cd32',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    noEliminationTextTablet: {
        fontSize: 18,
        lineHeight: 26,
        maxWidth: 400,
    },
    infoContainer: {
        backgroundColor: '#001a33',
        padding: 16,
        borderRadius: 6,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00ffff',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    infoContainerTablet: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffff66',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: '#ffff66',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },
    infoTitleTablet: {
        fontSize: 20,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#00ffff',
        textAlign: 'center',
        lineHeight: 22,
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    },
    infoTextTablet: {
        fontSize: 18,
        lineHeight: 24,
    },
    votesSummary: {
        backgroundColor: '#001a33',
        padding: 16,
        borderRadius: 6,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00ffff',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    votesSummaryTablet: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
    },
    votesSummaryText: {
        fontSize: 16,
        color: '#00ffff',
        textAlign: 'center',
        fontWeight: '500',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    votesSummaryTextTablet: {
        fontSize: 18,
    },
});
