import React, { useState, useCallback } from 'react';
import { PlayerNames, Scores, GameMode } from './types';
import GameBoard from './components/GameBoard';
import PlayerSetup from './components/PlayerSetup';
import Scoreboard from './components/Scoreboard';

const App: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<PlayerNames | null>(null);
  const [scores, setScores] = useState<Scores>({ playerX: 0, playerO: 0 });
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  const handleGameStart = useCallback((names: PlayerNames, mode: GameMode) => {
    setPlayerNames(names);
    setGameMode(mode);
    setScores({ playerX: 0, playerO: 0 });
  }, []);

  const handleGameEnd = useCallback((winner: 'X' | 'O' | 'draw') => {
    if (winner !== 'draw') {
      setScores(prevScores => ({
        ...prevScores,
        [winner === 'X' ? 'playerX' : 'playerO']: prevScores[winner === 'X' ? 'playerX' : 'playerO'] + 1,
      }));
    }
  }, []);

  const handleNewGame = useCallback(() => {
    setPlayerNames(null);
    setGameMode(null);
    setScores({ playerX: 0, playerO: 0 });
  }, []);
  
  const handleResetScores = useCallback(() => {
    setScores({ playerX: 0, playerO: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-center">
      <header className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Tic-Tac-Toe
        </h1>
        {playerNames && <p className="text-gray-400 mt-2">The classic game of X's and O's</p>}
      </header>
      
      <main className="w-full max-w-md mx-auto bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-700">
        {!playerNames || !gameMode ? (
          <PlayerSetup onStartGame={handleGameStart} />
        ) : (
          <>
            <Scoreboard playerNames={playerNames} scores={scores} />
            <GameBoard 
              key={`${scores.playerX}-${scores.playerO}`}
              onGameEnd={handleGameEnd} 
              playerNames={playerNames}
              gameMode={gameMode}
            />
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleNewGame}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                New Game
              </button>
              <button
                onClick={handleResetScores}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Reset Scores
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="mt-8 text-gray-500 text-sm">
        <p>Built by a world-class React engineer with Gemini.</p>
      </footer>
    </div>
  );
};

export default App;