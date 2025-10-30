import { create } from 'zustand';
import { games, getRandomWordPair } from '../data/words';

export interface Player {
  id: string;
  name: string;
  role: 'civil' | 'impostor';
  word: string;
  votes: number;
  isEliminated?: boolean;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
}

export interface WordPair {
  civil: string;
  impostor: string;
}

export interface GameSession {
  players: Player[];
  currentGame: Game;
  wordPair: WordPair | null;
  numberOfImpostors: number;
  gamePhase: 'setup' | 'names' | 'assigning' | 'playing' | 'voting' | 'results';
  currentPlayerIndex: number;
  votes: Record<string, string>;
  currentRound: number;
}

interface GameState {
  session: GameSession | null;
  isGameActive: boolean;
  createSession: (numberOfPlayers: number, gameId: string, numberOfImpostors: number) => void;
  goToNames: () => void;
  setPlayerNames: (names: string[]) => void;
  assignWords: () => void;
  nextPlayer: () => void;
  startVoting: () => void;
  vote: (voterId: string, targetId: string) => void;
  startNewRound: () => void;
  eliminatePlayer: (playerId: string) => void;
  finishGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  session: null,
  isGameActive: false,

  createSession: (numberOfPlayers: number, gameId: string, numberOfImpostors: number) => {
    console.log('=== createSession llamado ===');
    console.log('Parámetros:', { numberOfPlayers, gameId, numberOfImpostors });
    console.log('Estado actual:', get());

    const game = games.find(g => g.id === gameId);
    console.log('Juego encontrado:', game);

    if (!game) {
      console.error('Juego no encontrado con ID:', gameId);
      return;
    }

    const players: Player[] = Array.from({ length: numberOfPlayers }, (_, index) => ({
      id: `player-${index + 1}`,
      name: `Jugador ${index + 1}`,
      role: 'civil',
      word: '',
      votes: 0,
      isEliminated: false,
    }));

    const session: GameSession = {
      players,
      currentGame: game,
      wordPair: null,
      numberOfImpostors,
      gamePhase: 'setup', // Volvemos a 'setup' como antes
      currentPlayerIndex: 0,
      votes: {},
      currentRound: 1,
    };

    console.log('Sesión creada:', session);
    set({ session, isGameActive: true });
    console.log('Estado después de actualizar:', get());
    console.log('=== createSession completado ===');
  },

  goToNames: () => {
    const { session } = get();
    if (!session) return;

    set({
      session: {
        ...session,
        gamePhase: 'names',
      },
    });
  },

  setPlayerNames: (names: string[]) => {
    const { session } = get();
    if (!session) return;

    const updatedPlayers = session.players.map((player, index) => ({
      ...player,
      name: names[index] || `Jugador ${index + 1}`,
    }));

    set({
      session: {
        ...session,
        players: updatedPlayers,
      },
    });
  },

  assignWords: () => {
    const { session } = get();
    if (!session) return;

    const wordPair = getRandomWordPair();
    const players = [...session.players];

    // Asignar roles de impostor aleatoriamente
    const impostorIndices: number[] = [];
    while (impostorIndices.length < session.numberOfImpostors) {
      const randomIndex = Math.floor(Math.random() * players.length);
      if (!impostorIndices.includes(randomIndex)) {
        impostorIndices.push(randomIndex);
      }
    }

    // Asignar palabras según el rol
    players.forEach((player, index) => {
      if (impostorIndices.includes(index)) {
        player.role = 'impostor';
        player.word = wordPair.impostor;
      } else {
        player.role = 'civil';
        player.word = wordPair.civil;
      }
      player.isEliminated = false;
    });

    set({
      session: {
        ...session,
        players,
        wordPair,
        gamePhase: 'assigning',
      },
    });
  },

  nextPlayer: () => {
    const { session } = get();
    if (!session) return;

    const nextIndex = session.currentPlayerIndex + 1;

    if (nextIndex >= session.players.length) {
      // Todos los jugadores han visto su palabra, cambiar a la fase de juego
      set({
        session: {
          ...session,
          gamePhase: 'playing',
        },
      });
    } else {
      set({
        session: {
          ...session,
          currentPlayerIndex: nextIndex,
        },
      });
    }
  },

  startVoting: () => {
    const { session } = get();
    if (!session) return;

    set({
      session: {
        ...session,
        gamePhase: 'voting',
      },
    });
  },

  vote: (voterId: string, targetId: string) => {
    const { session } = get();
    if (!session) return;

    set({
      session: {
        ...session,
        votes: {
          ...session.votes,
          [voterId]: targetId,
        },
      },
    });
  },

  startNewRound: () => {
    const { session } = get();
    if (!session) return;

    set({
      session: {
        ...session,
        currentRound: session.currentRound + 1,
        votes: {},
        gamePhase: 'voting',
      },
    });
  },

  eliminatePlayer: (playerId: string) => {
    const { session } = get();
    if (!session) return;

    const updatedPlayers = session.players.map(p =>
      p.id === playerId ? { ...p, isEliminated: true } : p
    );

    set({
      session: {
        ...session,
        players: updatedPlayers,
      },
    });
  },

  finishGame: () => {
    const { session } = get();
    if (!session) return;

    set({
      session: {
        ...session,
        gamePhase: 'results',
      },
    });
  },

  resetGame: () => {
    set({
      session: null,
      isGameActive: false,
    });
  },
}));
