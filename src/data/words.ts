import { WordPair, Game } from '../types';

export const wordPairs: WordPair[] = [
  { civil: 'playa', impostor: 'piscina', category: 'lugares' },
  { civil: 'cuchara', impostor: 'tenedor', category: 'cubiertos' },
  { civil: 'coche', impostor: 'moto', category: 'transporte' },
  { civil: 'gato', impostor: 'perro', category: 'animales' },
  { civil: 'té', impostor: 'café', category: 'bebidas' },
  { civil: 'libro', impostor: 'revista', category: 'lectura' },
  { civil: 'montaña', impostor: 'colina', category: 'geografía' },
  { civil: 'fútbol', impostor: 'baloncesto', category: 'deportes' },
  { civil: 'pizza', impostor: 'hamburguesa', category: 'comida' },
  { civil: 'guitarra', impostor: 'piano', category: 'instrumentos' },
  { civil: 'invierno', impostor: 'otoño', category: 'estaciones' },
  { civil: 'médico', impostor: 'enfermero', category: 'profesiones' },
  { civil: 'rojo', impostor: 'rosa', category: 'colores' },
  { civil: 'mar', impostor: 'lago', category: 'agua' },
  { civil: 'avión', impostor: 'helicóptero', category: 'transporte aéreo' },
];

export const games: Game[] = [
  {
    id: 'impostor',
    name: 'El Impostor',
    description: 'Los jugadores reciben palabras similares. Los impostores deben pasar desapercibidos.',
    minPlayers: 3,
    maxPlayers: 12,
  },
];

export const getRandomWordPair = (): WordPair => {
  const randomIndex = Math.floor(Math.random() * wordPairs.length);
  return wordPairs[randomIndex];
};
