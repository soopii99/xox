import React, { useState, useEffect, useCallback } from 'react';
import { SquareValue, PlayerNames, WinnerInfo, GameMode } from '../types';
import Square from './Square';
import Modal from './Modal';
import { GoogleGenAI, Type } from "@google/genai";

interface GameBoardProps {
  onGameEnd: (winner: 'X' | 'O' | 'draw') => void;
  playerNames: PlayerNames;
  gameMode: GameMode;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getAIMove = async (currentBoard: SquareValue[]): Promise<number> => {
    const boardString = currentBoard.map(v => v === null ? 'null' : `'${v}'`).join(', ');
    const prompt = `You are a world-champion Tic-Tac-Toe player. You play as 'O'. The human player is 'X'.
The board is a 9-element array where indices 0-8 correspond to the squares.
'null' represents an empty square.
The current board is: [${boardString}].
Your goal is to win. If you cannot win, you must force a draw. Do not lose.
Return the index of the single best square for 'O' to play next.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        move: {
                            type: Type.INTEGER,
                            description: 'The index of the square to play (0-8). Must be an empty, valid square.'
                        }
                    },
                    required: ['move']
                },
                temperature: 0.1
            }
        });

        const jsonResponse = JSON.parse(response.text);
        const move = jsonResponse.move;

        if (typeof move === 'number' && move >= 0 && move < 9 && currentBoard[move] === null) {
            return move;
        } else {
            console.error("AI returned an invalid move:", move);
            throw new Error("Invalid move from AI");
        }
    } catch (e) {
        console.error("Error getting AI move, using fallback", e);
        const emptySquares = currentBoard.map((val, idx) => (val === null ? idx : -1)).filter(idx => idx !== -1);
        if (emptySquares.length > 0) {
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
        return -1; // Should not be reached if there are empty squares
    }
};


const calculateWinner = (squares: SquareValue[]): WinnerInfo | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as 'X' | 'O', line: lines[i] };
    }
  }
  return null;
};

const GameBoard: React.FC<GameBoardProps> = ({ onGameEnd, playerNames, gameMode }) => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const handleClick = useCallback((i: number) => {
    if (winnerInfo || board[i] || (gameMode === 'ai' && !xIsNext)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }, [board, winnerInfo, gameMode, xIsNext]);

  useEffect(() => {
    const winnerData = calculateWinner(board);
    if (winnerData) {
      setWinnerInfo(winnerData);
      onGameEnd(winnerData.winner);
    } else if (board.every(square => square !== null)) {
      setIsDraw(true);
      onGameEnd('draw');
    }
  }, [board, onGameEnd]);
  
  useEffect(() => {
    const isAITurn = gameMode === 'ai' && !xIsNext && !winnerInfo && !isDraw;
    if (isAITurn) {
        const performAIMove = async () => {
            setIsAiThinking(true);
            // Simulate thinking time for better UX
            await new Promise(resolve => setTimeout(resolve, 750));
            const aiMove = await getAIMove(board);
            if (aiMove !== -1 && board[aiMove] === null) {
                handleClick(aiMove);
            }
            setIsAiThinking(false);
        };
        performAIMove();
    }
  }, [xIsNext, gameMode, winnerInfo, isDraw, board, handleClick]);


  const handlePlayAgain = useCallback(() => {
    setBoard(Array(9).fill(null));
    setXIsNext(true