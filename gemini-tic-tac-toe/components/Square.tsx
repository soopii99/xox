
import React from 'react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinner: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinner }) => {
  const textClass = value === 'X' ? 'text-blue-400' : 'text-teal-300';
  const winnerClass = isWinner ? 'bg-yellow-500/40' : 'bg-gray-800 hover:bg-gray-700';

  return (
    <button
      className={`w-24 h-24 md:w-28 md:h-28 flex items-center justify-center text-6xl md:text-7xl font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${winnerClass}`}
      onClick={onClick}
    >
      <span className={`${textClass} transition-transform duration-300 transform ${value ? 'scale-100' : 'scale-0'}`}>
        {value}
      </span>
    </button>
  );
};

export default Square;
