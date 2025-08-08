import React, { useState } from 'react';
import { PlayerNames, GameMode } from '../types';

interface PlayerSetupProps {
  onStartGame: (names: PlayerNames, mode: GameMode) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [playerX, setPlayerX] = useState('Player 1');
  const [playerO, setPlayerO] = useState('Player 2');
  const [mode, setMode] = useState<GameMode>('human');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'ai') {
        if (playerX.trim()) {
            onStartGame({ playerX: playerX.trim(), playerO: 'Gemini AI' }, 'ai');
        }
    } else {
        if (playerX.trim() && playerO.trim()) {
            onStartGame({ playerX: playerX.trim(), playerO: playerO.trim() }, 'human');
        }
    }
  };

  const activeBtnClasses = "bg-teal-500 text-white";
  const inactiveBtnClasses = "bg-gray-700 hover:bg-gray-600 text-gray-300";

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-teal-300">Choose Game Mode</h2>
      <div className="flex justify-center mb-6 bg-gray-900/50 p-1 rounded-lg">
          <button onClick={() => setMode('human')} className={`flex-1 py-2 px-4 rounded-md transition-colors ${mode === 'human' ? activeBtnClasses : inactiveBtnClasses}`}>
            Player vs Player
          </button>
          <button onClick={() => setMode('ai')} className={`flex-1 py-2 px-4 rounded-md transition-colors ${mode === 'ai' ? activeBtnClasses : inactiveBtnClasses}`}>
            Player vs AI
          </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            id="playerX"
            type="text"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors peer"
            placeholder=" "
          />
          <label 
            htmlFor="playerX" 
            className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-400 -translate-y-6 scale-75 bg-gray-800/0 px-1"
          >
            {mode === 'ai' ? 'Your Name (Player X)' : 'Player X'}
          </label>
        </div>

        {mode === 'human' && (
            <div className="relative">
            <input
                id="playerO"
                type="text"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-300 transition-colors peer"
                placeholder=" "
            />
            <label 
                htmlFor="playerO" 
                className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-teal-300 -translate-y-6 scale-75 bg-gray-800/0 px-1"
            >
                Player O
            </label>
            </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerSetup;