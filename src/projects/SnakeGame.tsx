import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

export default function SnakeGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('LEFT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('snakeHighScore') || 0));

  const gridSize = 20;

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
    setDirection('LEFT');
    setScore(0);
    setGameState('playing');
    setFood(generateFood());
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collision
      if (
        head.x < 0 || head.x >= gridSize || 
        head.y < 0 || head.y >= gridSize ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameState('gameover');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameState, score, highScore, generateFood]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-2">
        <div className="flex items-center gap-2 text-accent">
          <Trophy size={18} />
          <span className="font-mono font-bold">{highScore}</span>
        </div>
        <div className="text-white font-mono font-bold text-xl">
          SCORE: {score}
        </div>
      </div>

      <div 
        className="relative bg-black border-2 border-zinc-700 rounded-lg overflow-hidden"
        style={{ 
          width: '300px', 
          height: '300px',
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {gameState === 'idle' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              <Play size={20} fill="currentColor" />
              START GAME
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <h3 className="text-red-500 font-display text-3xl font-bold mb-4 italic">GAME OVER</h3>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              <RotateCcw size={20} />
              TRY AGAIN
            </button>
          </div>
        )}

        {/* Food */}
        <div 
          className="bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"
          style={{ 
            gridColumn: food.x + 1, 
            gridRow: food.y + 1 
          }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div 
            key={i}
            className={`${i === 0 ? 'bg-accent' : 'bg-accent/60'} rounded-sm`}
            style={{ 
              gridColumn: segment.x + 1, 
              gridRow: segment.y + 1,
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 md:hidden">
        <div />
        <button onClick={() => direction !== 'DOWN' && setDirection('UP')} className="p-4 bg-zinc-800 rounded-xl">↑</button>
        <div />
        <button onClick={() => direction !== 'RIGHT' && setDirection('LEFT')} className="p-4 bg-zinc-800 rounded-xl">←</button>
        <button onClick={() => direction !== 'UP' && setDirection('DOWN')} className="p-4 bg-zinc-800 rounded-xl">↓</button>
        <button onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} className="p-4 bg-zinc-800 rounded-xl">→</button>
      </div>
      
      <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono">Use arrow keys to move</p>
    </div>
  );
}
