import React from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { GameSetupScreen } from '../screens/GameSetupScreen';
import { PlayerListScreen } from '../screens/PlayerListScreen';
import { WordAssignmentScreen } from '../screens/WordAssignmentScreen';
import { GameRulesScreen } from '../screens/GameRulesScreen';
import { VotingScreen } from '../screens/VotingScreen';
import { GameResultsScreen } from '../screens/GameResultsScreen';
import { useGameStore } from '../store/gameStore';

export const GameNavigator: React.FC = () => {
    const { session, isGameActive } = useGameStore();

    console.log('=== GameNavigator renderizado ===');
    console.log('Estado actual:', { session, isGameActive });
    console.log('Fase del juego:', session?.gamePhase);

    if (!isGameActive || !session) {
        console.log('Mostrando HomeScreen');
        return <HomeScreen />;
    }

    switch (session.gamePhase) {
        case 'setup':
            console.log('Mostrando GameSetupScreen');
            return <GameSetupScreen />;
        case 'names':
            console.log('Mostrando PlayerListScreen');
            return <PlayerListScreen />;
        case 'assigning':
            console.log('Mostrando WordAssignmentScreen');
            return <WordAssignmentScreen />;
        case 'playing':
            console.log('Mostrando GameRulesScreen');
            return <GameRulesScreen />;
        case 'voting':
            console.log('Mostrando VotingScreen');
            return <VotingScreen />;
        case 'results':
            console.log('Mostrando GameResultsScreen');
            return <GameResultsScreen />;
        default:
            console.log('Fase no reconocida, mostrando HomeScreen');
            return <HomeScreen />;
    }
};
