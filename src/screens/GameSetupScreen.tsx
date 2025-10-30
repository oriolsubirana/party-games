import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Header } from '../components';
import { useGameStore } from '../store/gameStore';
import { games } from '../data/words';

export const GameSetupScreen: React.FC = () => {
    const { createSession, goToNames } = useGameStore();
    const [numberOfPlayers, setNumberOfPlayers] = useState(4);
    const [selectedGame, setSelectedGame] = useState('impostor');
    const [numberOfImpostors, setNumberOfImpostors] = useState(1);
    const [showRulesModal, setShowRulesModal] = useState(false);

    const { width, height } = useWindowDimensions();
    const isTablet = width > 768;
    const isLandscape = width > height;

    const handleStartGame = () => {
        console.log('Iniciando partida con:', { numberOfPlayers, selectedGame, numberOfImpostors });

        if (numberOfPlayers < 3 || numberOfPlayers > 12) {
            return;
        }

        try {
            // Crear la sesión del juego
            createSession(numberOfPlayers, selectedGame, numberOfImpostors);
            console.log('Sesión creada, navegando a entrada de nombres...');

            // Cambiar a la fase de nombres
            setTimeout(() => {
                goToNames();
            }, 100);
        } catch (error) {
            console.error('Error al iniciar partida:', error);
        }
    };

    const game = games.find(g => g.id === selectedGame);

    return (
        <View style={styles.container}>
            <Header title="Configurar partida" />

            <ScrollView
                style={styles.scrollContent}
                contentContainerStyle={[
                    styles.content,
                    { paddingHorizontal: isTablet ? 40 : 24 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={[
                    styles.section,
                    isTablet && styles.sectionTablet
                ]}>
                    <Text style={[styles.label, isTablet && styles.labelTablet]}>
                        Número de jugadores
                    </Text>
                    <View style={[
                        styles.counterContainer,
                        isTablet && styles.counterContainerTablet
                    ]}>
                        <Button
                            title="-"
                            onPress={() => setNumberOfPlayers(Math.max(3, numberOfPlayers - 1))}
                            variant="secondary"
                        />
                        <Text style={[styles.counter, isTablet && styles.counterTablet]}>
                            {numberOfPlayers}
                        </Text>
                        <Button
                            title="+"
                            onPress={() => setNumberOfPlayers(Math.min(12, numberOfPlayers + 1))}
                            variant="secondary"
                        />
                    </View>
                </View>

                <View style={[
                    styles.section,
                    isTablet && styles.sectionTablet
                ]}>
                    <Text style={[styles.label, isTablet && styles.labelTablet]}>
                        Juego seleccionado
                    </Text>
                    <View style={[
                        styles.gameCard,
                        isTablet && styles.gameCardTablet
                    ]}>
                        <Text style={[styles.gameName, isTablet && styles.gameNameTablet]}>
                            {game?.name}
                        </Text>
                        <Text style={[styles.gameDescription, isTablet && styles.gameDescriptionTablet]}>
                            {game?.description}
                        </Text>
                        <Text style={[styles.gamePlayers, isTablet && styles.gamePlayersTablet]}>
                            {game?.minPlayers}-{game?.maxPlayers} jugadores
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.rulesButton,
                                isTablet && styles.rulesButtonTablet
                            ]}
                            onPress={() => setShowRulesModal(true)}
                        >
                            <Text style={[styles.rulesButtonText, isTablet && styles.rulesButtonTextTablet]}>
                                📖 Ver reglas completas
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[
                    styles.section,
                    isTablet && styles.sectionTablet
                ]}>
                    <Text style={[styles.label, isTablet && styles.labelTablet]}>
                        Número de impostores
                    </Text>
                    <View style={[
                        styles.counterContainer,
                        isTablet && styles.counterContainerTablet
                    ]}>
                        <Button
                            title="-"
                            onPress={() => setNumberOfImpostors(Math.max(1, numberOfImpostors - 1))}
                            variant="secondary"
                        />
                        <Text style={[styles.counter, isTablet && styles.counterTablet]}>
                            {numberOfImpostors}
                        </Text>
                        <Button
                            title="+"
                            onPress={() => setNumberOfImpostors(Math.min(2, numberOfImpostors + 1))}
                            variant="secondary"
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={[
                styles.buttonContainer,
                { paddingHorizontal: isTablet ? 40 : 24 }
            ]}>
                <Button
                    title="Iniciar partida"
                    onPress={handleStartGame}
                    variant="primary"
                    fullWidth
                />
            </View>

            {/* Modal de Reglas */}
            <Modal
                visible={showRulesModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowRulesModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={[
                        styles.modalHeader,
                        isTablet && styles.modalHeaderTablet
                    ]}>
                        <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>
                            📖 Reglas del Impostor
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.closeButton,
                                isTablet && styles.closeButtonTablet
                            ]}
                            onPress={() => setShowRulesModal(false)}
                        >
                            <Text style={[styles.closeButtonText, isTablet && styles.closeButtonTextTablet]}>
                                ✕
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.modalContent}
                        contentContainerStyle={[
                            styles.modalContentContainer,
                            { paddingHorizontal: isTablet ? 40 : 24 }
                        ]}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={[
                            styles.ruleSection,
                            isTablet && styles.ruleSectionTablet
                        ]}>
                            <Text style={[styles.ruleSectionTitle, isTablet && styles.ruleSectionTitleTablet]}>
                                🎯 Objetivo del Juego
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                Los jugadores se dividen en dos equipos: <Text style={styles.highlight}>civiles</Text> e <Text style={styles.highlight}>impostores</Text>.
                                Los civiles deben descubrir quiénes son los impostores, mientras que los impostores intentan pasar desapercibidos.
                            </Text>
                        </View>

                        <View style={[
                            styles.ruleSection,
                            isTablet && styles.ruleSectionTablet
                        ]}>
                            <Text style={[styles.ruleSectionTitle, isTablet && styles.ruleSectionTitleTablet]}>
                                🎭 Roles y Palabras
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Civiles:</Text> Reciben la misma palabra secreta
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Impostores:</Text> Reciben una palabra similar pero diferente
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Ejemplo:</Text> Civiles: "playa", Impostores: "piscina"
                            </Text>
                        </View>

                        <View style={[
                            styles.ruleSection,
                            isTablet && styles.ruleSectionTablet
                        ]}>
                            <Text style={[styles.ruleSectionTitle, isTablet && styles.ruleSectionTitleTablet]}>
                                🔄 Flujo del Juego
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                1. <Text style={styles.highlight}>Asignación:</Text> Cada jugador ve su palabra en secreto
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                2. <Text style={styles.highlight}>Descripción:</Text> Por turnos, cada jugador describe su palabra
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                3. <Text style={styles.highlight}>Votación:</Text> Todos votan quién creen que es el impostor
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                4. <Text style={styles.highlight}>Resultado:</Text> Se revela quién fue eliminado y quién ganó
                            </Text>
                        </View>

                        <View style={[
                            styles.ruleSection,
                            isTablet && styles.ruleSectionTablet
                        ]}>
                            <Text style={[styles.ruleSectionTitle, isTablet && styles.ruleSectionTitleTablet]}>
                                ⚠️ Reglas Importantes
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>NUNCA</Text> digas tu palabra exacta
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • Usa sinónimos, ejemplos o situaciones
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • Sé creativo en tus descripciones
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • Observa las reacciones de otros jugadores
                            </Text>
                        </View>

                        <View style={[
                            styles.ruleSection,
                            isTablet && styles.ruleSectionTablet
                        ]}>
                            <Text style={[styles.ruleSectionTitle, isTablet && styles.ruleSectionTitleTablet]}>
                                🏆 Condiciones de Victoria
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Civiles ganan:</Text> Si eliminan a un impostor
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Impostores ganan:</Text> Si eliminan a un civil
                            </Text>
                        </View>

                        <View style={[
                            styles.ruleSection,
                            isTablet && styles.ruleSectionTablet
                        ]}>
                            <Text style={[styles.ruleSectionTitle, isTablet && styles.ruleSectionTitleTablet]}>
                                💡 Consejos para Jugar
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Civiles:</Text> Busca inconsistencias en las descripciones
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Impostores:</Text> Observa cómo describen los civiles
                            </Text>
                            <Text style={[styles.ruleText, isTablet && styles.ruleTextTablet]}>
                                • <Text style={styles.highlight}>Todos:</Text> Mantén la calma y sé convincente
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ff0080',
        textAlign: 'center',
        lineHeight: 36,
        textShadowColor: '#ff0080',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        letterSpacing: 2,
    },
    titleTablet: {
        fontSize: 36,
        lineHeight: 44,
    },
    scrollContent: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 16,
    },
    section: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    sectionTablet: {
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffff00',
        marginBottom: 16,
        textAlign: 'center',
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        letterSpacing: 1,
    },
    labelTablet: {
        fontSize: 20,
        marginBottom: 20,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    counterContainerTablet: {
        gap: 24,
    },
    counter: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00ffff',
        minWidth: 40,
        textAlign: 'center',
        backgroundColor: '#001a33',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#00ffff',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    counterTablet: {
        fontSize: 28,
        minWidth: 48,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
    },
    gameCard: {
        backgroundColor: '#1a0033',
        padding: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ff4da6',
        shadowColor: '#ff4da6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        alignItems: 'center',
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    gameCardTablet: {
        padding: 20,
        borderRadius: 16,
        maxWidth: 640,
    },
    gameName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ffff',
        marginBottom: 8,
        textAlign: 'center',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    gameNameTablet: {
        fontSize: 24,
        marginBottom: 12,
    },
    gameDescription: {
        fontSize: 14,
        color: '#00ff00',
        marginBottom: 12,
        lineHeight: 20,
        textAlign: 'center',
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    gameDescriptionTablet: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 22,
    },
    gamePlayers: {
        fontSize: 14,
        color: '#ffd700',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
        textShadowColor: '#ffd700',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    gamePlayersTablet: {
        fontSize: 16,
        marginBottom: 20,
    },
    rulesButton: {
        backgroundColor: '#001a33',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 2,
        borderColor: '#00ffff',
    },
    rulesButtonTablet: {
        paddingVertical: 16,
        paddingHorizontal: 28,
        borderRadius: 12,
    },
    rulesButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#00ffff',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    rulesButtonTextTablet: {
        fontSize: 16,
    },
    buttonContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#000000',
        borderTopWidth: 2,
        borderTopColor: '#ff4da6',
    },
    // Estilos del Modal
    modalContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 24,
        borderBottomWidth: 3,
        borderBottomColor: '#ff0080',
    },
    modalHeaderTablet: {
        paddingTop: 80,
        paddingBottom: 24,
        paddingHorizontal: 40,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff0080',
        flex: 1,
        textAlign: 'center',
        textShadowColor: '#ff0080',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        letterSpacing: 1,
    },
    modalTitleTablet: {
        fontSize: 28,
    },
    closeButton: {
        backgroundColor: '#330000',
        width: 36,
        height: 36,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#ff0000',
    },
    closeButtonTablet: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff0000',
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    closeButtonTextTablet: {
        fontSize: 20,
    },
    modalContent: {
        flex: 1,
    },
    modalContentContainer: {
        paddingTop: 24,
        paddingBottom: 40,
    },
    ruleSection: {
        marginBottom: 28,
        paddingHorizontal: 16,
    },
    ruleSectionTablet: {
        marginBottom: 36,
        paddingHorizontal: 24,
    },
    ruleSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffff00',
        marginBottom: 16,
        lineHeight: 28,
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    ruleSectionTitleTablet: {
        fontSize: 22,
        marginBottom: 20,
        lineHeight: 30,
    },
    ruleText: {
        fontSize: 16,
        color: '#00ff00',
        lineHeight: 24,
        marginBottom: 8,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    ruleTextTablet: {
        fontSize: 18,
        lineHeight: 26,
        marginBottom: 10,
    },
    highlight: {
        color: '#00ffff',
        fontWeight: '600',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
});
