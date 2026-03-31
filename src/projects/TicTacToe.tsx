import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl max-w-sm mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-white mb-1">TIC TAC TOE</h3>
        <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
          {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next: ${isXNext ? 'X' : 'O'}`}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-zinc-800 p-3 rounded-2xl">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-xl transition-all duration-200 
              ${!square && !winner ? 'bg-zinc-700 hover:bg-zinc-600' : 'bg-zinc-900'} 
              ${square === 'X' ? 'text-accent' : 'text-white'}`}
          >
            {square}
          </button>
        ))}
      </div>

      {(winner || isDraw) && (
        <button
          onClick={resetGame}
          className="flex items-center gap-2 bg-accent text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
        >
          <RotateCcw size={18} />
          RESTART
        </button>
      )}
    </div>
  );
}
