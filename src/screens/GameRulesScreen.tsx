import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Header } from '../components';
import { useGameStore } from '../store/gameStore';

export const GameRulesScreen: React.FC = () => {
    const { session, startVoting } = useGameStore();
    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;
    const isLandscape = width > height;

    if (!session) return null;

    return (
        <View style={styles.container}>
            <Header title="🎯 Reglas del juego" />
            <View style={[
                styles.subtitleContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
                    {session.currentGame.name} - {session.players.length} jugadores
                </Text>
            </View>

            <View style={[
                styles.content,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <View style={[
                    styles.rulesContainer,
                    isTablet && styles.rulesContainerTablet
                ]}>
                    <View style={[
                        styles.ruleCard,
                        isTablet && styles.ruleCardTablet,
                        isLandscape && styles.ruleCardLandscape
                    ]}>
                        <View style={styles.ruleNumberContainer}>
                            <Text style={[styles.ruleNumber, isTablet && styles.ruleNumberTablet]}>1</Text>
                        </View>
                        <View style={styles.ruleContent}>
                            <Text style={[styles.ruleTitle, isTablet && styles.ruleTitleTablet]}>
                                Descripción de palabras
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                Cada jugador debe describir su palabra sin decirla directamente.
                                Sé creativo y usa sinónimos, ejemplos o situaciones.
                            </Text>
                        </View>
                    </View>

                    <View style={[
                        styles.ruleCard,
                        isTablet && styles.ruleCardTablet,
                        isLandscape && styles.ruleCardLandscape
                    ]}>
                        <View style={styles.ruleNumberContainer}>
                            <Text style={[styles.ruleNumber, isTablet && styles.ruleNumberTablet]}>2</Text>
                        </View>
                        <View style={styles.ruleContent}>
                            <Text style={[styles.ruleTitle, isTablet && styles.ruleTitleTablet]}>
                                Observa y analiza
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                Presta atención a las descripciones de otros jugadores.
                                Busca inconsistencias o comportamientos sospechosos.
                            </Text>
                        </View>
                    </View>

                    <View style={[
                        styles.ruleCard,
                        isTablet && styles.ruleCardTablet,
                        isLandscape && styles.ruleCardLandscape
                    ]}>
                        <View style={styles.ruleNumberContainer}>
                            <Text style={[styles.ruleNumber, isTablet && styles.ruleNumberTablet]}>3</Text>
                        </View>
                        <View style={styles.ruleContent}>
                            <Text style={[styles.ruleTitle, isTablet && styles.ruleTitleTablet]}>
                                Votación final
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                Al final de la ronda, votaréis quién creéis que es el impostor.
                                El jugador con más votos será eliminado.
                            </Text>
                        </View>
                    </View>
                </View>

            </View>

            <View style={[
                styles.buttonContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Button
                    title="Comenzar votación"
                    onPress={startVoting}
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
    subtitleContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#66ffff',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 36,
        textShadowColor: '#66ffff',
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
        color: '#ff69b4',
        textAlign: 'center',
        lineHeight: 24,
        textShadowColor: '#ff69b4',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    subtitleTablet: {
        fontSize: 20,
        lineHeight: 26,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        alignItems: 'center',
    },
    rulesContainer: {
        alignItems: 'center',
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    rulesContainerTablet: {
        marginBottom: 20,
    },
    ruleCard: {
        flexDirection: 'row',
        backgroundColor: '#1a0033',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#ff0080',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 12,
        width: '100%',
        maxWidth: 520,
        borderWidth: 2,
        borderColor: '#ff0080',
    },
    ruleCardTablet: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        maxWidth: 640,
        borderWidth: 3,
    },
    ruleCardLandscape: {
        maxWidth: 350,
    },
    ruleNumberContainer: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#ffff00',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: '#ffff00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#000000',
    },
    ruleNumberTablet: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 20,
        fontSize: 18,
        borderWidth: 3,
    },
    ruleNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    ruleContent: {
        flex: 1,
    },
    ruleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00ffff',
        marginBottom: 8,
        lineHeight: 22,
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    ruleTitleTablet: {
        fontSize: 18,
        marginBottom: 10,
        lineHeight: 24,
    },
    ruleText: {
        fontSize: 14,
        color: '#00ff00',
        lineHeight: 20,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    ruleTextTablet: {
        fontSize: 16,
        lineHeight: 22,
    },
    buttonContainer: {
        paddingBottom: 40,
    },
});
