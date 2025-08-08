
import React from 'react';
import { PlayerNames, Scores } from '../types';

interface ScoreboardProps {
  playerNames: PlayerNames;
  scores: Scores;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerNames, scores }) => {
  return (
    <div className="mb-6 flex justify-around items-center bg-gray-900/50 p-4 rounded-xl border border-gray-700">
      <div className="text-center">
        <p className="text-xl font-semibold text-blue-400">{playerNames.playerX} (X)</p>
        <p className="text-3xl font-bold">{scores.playerX}</p>
      </div>
      <div className="text-2xl font-bold text-gray-500">VS</div>
      <div className="text-center">
        <p className="text-xl font-semibold text-teal-300">{playerNames.playerO} (O)</p>
        <p className="text-3xl font-bold">{scores.playerO}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
