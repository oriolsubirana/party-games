export interface Player {
  id: string;
  name: string;
  role: 'civil' | 'impostor';
  word: string;
  votes: number;
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
  category: string;
}

export interface GameSession {
  players: Player[];
  currentGame: Game;
  wordPair: WordPair | null;
  numberOfImpostors: number;
  gamePhase: 'setup' | 'assigning' | 'playing' | 'voting' | 'results';
  currentPlayerIndex: number;
  votes: { [playerId: string]: string };
}

export interface GameState {
  session: GameSession | null;
  isGameActive: boolean;
  createSession: (numberOfPlayers: number, gameId: string, numberOfImpostors: number) => void;
  assignWords: () => void;
  nextPlayer: () => void;
  startVoting: () => void;
  vote: (voterId: string, targetId: string) => void;
  finishGame: () => void;
  resetGame: () => void;
}
