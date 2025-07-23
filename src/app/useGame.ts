import { useState } from 'react';

export type GameState = 'entry' | 'waiting' | 'indicator';
export type IndicatorSide = 'left' | 'right';

export function useGame() {
  const [username, setUsername] = useState('');
  const [gameState, setGameState] = useState<GameState>('entry');
  const [indicatorSide, setIndicatorSide] = useState<IndicatorSide | null>(null);

  // Start the game: go to waiting, then indicator
  const startGame = () => {
    setGameState('waiting');
    // Wait 2-5 seconds, then show indicator
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
      // Randomly pick left or right
      const side: IndicatorSide = Math.random() < 0.5 ? 'left' : 'right';
      setIndicatorSide(side);
      setGameState('indicator');
    }, delay);
  };

  // Reset to entry state
  const reset = () => {
    setUsername('');
    setGameState('entry');
    setIndicatorSide(null);
  };

  return {
    username,
    setUsername,
    gameState,
    indicatorSide,
    startGame,
    reset,
  };
} 