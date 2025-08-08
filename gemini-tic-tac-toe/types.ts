export type SquareValue = 'X' | 'O' | null;

export type GameMode = 'human' | 'ai';

export interface PlayerNames {
  playerX: string;
  playerO: string;
}

export interface Scores {
  playerX: number;
  playerO: number;
}

export interface WinnerInfo {
    winner: 'X' | 'O';
    line: number[];
}