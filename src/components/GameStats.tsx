import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Player } from '../types';

interface GameStatsProps {
    players: Player[];
    wordPair: { civil: string; impostor: string } | null;
    numberOfImpostors: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
    players,
    wordPair,
    numberOfImpostors,
}) => {
    const civils = players.filter(p => p.role === 'civil').length;
    const impostors = players.filter(p => p.role === 'impostor').length;

    return (
        <View style={styles.container}>
            <View style={styles.statRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{players.length}</Text>
                    <Text style={styles.statLabel}>Jugadores</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{civils}</Text>
                    <Text style={styles.statLabel}>Civiles</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{impostors}</Text>
                    <Text style={styles.statLabel}>Impostores</Text>
                </View>
            </View>

            {wordPair && (
                <View style={styles.wordPairContainer}>
                    <Text style={styles.wordPairTitle}>Palabras:</Text>
                    <View style={styles.wordPair}>
                        <Text style={styles.civilWord}>{wordPair.civil}</Text>
                        <Text style={styles.separator}>vs</Text>
                        <Text style={styles.impostorWord}>{wordPair.impostor}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a0033',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#ff0080',
        shadowColor: '#ff0080',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 12,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00ffff',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#ff69b4',
        marginTop: 4,
        textShadowColor: '#ff69b4',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    wordPairContainer: {
        borderTopWidth: 3,
        borderTopColor: '#ffd700',
        paddingTop: 16,
    },
    wordPairTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffd700',
        marginBottom: 8,
        textAlign: 'center',
        textShadowColor: '#ffd700',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    wordPair: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    civilWord: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00ff00',
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    separator: {
        fontSize: 14,
        color: '#ffff00',
        marginHorizontal: 12,
        textShadowColor: '#ffff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    impostorWord: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
});
