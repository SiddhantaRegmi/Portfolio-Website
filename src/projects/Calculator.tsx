import React, { useState } from 'react';
import { Delete, Equal } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('');
  const [previous, setPrevious] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev + num);
  };

  const handleOperator = (op: string) => {
    if (!display) return;
    setDisplay(prev => prev + op);
  };

  const calculate = () => {
    const sanitizeExpression = (expr: string) => expr.replace(/[^0-9.+\-*/() ]/g, '');

    const toRPN = (expr: string) => {
      const output: string[] = [];
      const operators: string[] = [];
      const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };
      const tokens = expr.match(/(\d+(?:\.\d+)?)|[()+\-*/]/g);
      if (!tokens) return null;

      tokens.forEach(token => {
        if (/\d/.test(token)) {
          output.push(token);
        } else if (token === '+' || token === '-' || token === '*' || token === '/') {
          while (
            operators.length &&
            operators[operators.length - 1] !== '(' &&
            precedence[operators[operators.length - 1]] >= precedence[token]
          ) {
            output.push(operators.pop()!);
          }
          operators.push(token);
        } else if (token === '(') {
          operators.push(token);
        } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
            output.push(operators.pop()!);
          }
          operators.pop();
        }
      });

      while (operators.length) {
        output.push(operators.pop()!);
      }

      return output;
    };

    const evaluateRPN = (tokens: string[]) => {
      const stack: number[] = [];
      tokens.forEach(token => {
        if (/\d/.test(token)) {
          stack.push(Number(token));
        } else {
          const b = stack.pop();
          const a = stack.pop();
          if (a === undefined || b === undefined) throw new Error('Invalid expression');
          switch (token) {
            case '+': stack.push(a + b); break;
            case '-': stack.push(a - b); break;
            case '*': stack.push(a * b); break;
            case '/': stack.push(a / b); break;
            default: throw new Error('Invalid operator');
          }
        }
      });
      if (stack.length !== 1) throw new Error('Invalid expression');
      return stack[0];
    };

    try {
      const expression = sanitizeExpression(display);
      const rpn = toRPN(expression);
      if (!rpn) throw new Error('Invalid expression');
      const result = evaluateRPN(rpn);
      setPrevious(display);
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('');
    setPrevious('');
  };

  const del = () => {
    setDisplay(prev => prev.slice(0, -1));
  };

  const buttons = [
    { label: 'AC', action: clear, type: 'op' },
    { label: 'DEL', action: del, type: 'op' },
    { label: '.', action: () => handleNumber('.'), type: 'op' },
    { label: '/', action: () => handleOperator('/'), type: 'op' },
    { label: '7', action: () => handleNumber('7') },
    { label: '8', action: () => handleNumber('8') },
    { label: '9', action: () => handleNumber('9') },
    { label: '*', action: () => handleOperator('*'), type: 'op' },
    { label: '4', action: () => handleNumber('4') },
    { label: '5', action: () => handleNumber('5') },
    { label: '6', action: () => handleNumber('6') },
    { label: '-', action: () => handleOperator('-'), type: 'op' },
    { label: '1', action: () => handleNumber('1') },
    { label: '2', action: () => handleNumber('2') },
    { label: '3', action: () => handleNumber('3') },
    { label: '+', action: () => handleOperator('+'), type: 'op' },
    { label: '00', action: () => handleNumber('00') },
    { label: '0', action: () => handleNumber('0') },
    { label: '=', action: calculate, type: 'equal', span: 2 },
  ];

  return (
    <div className="w-full max-w-xs mx-auto p-6 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
      <div className="bg-black rounded-3xl p-6 mb-6 text-right min-h-[120px] flex flex-col justify-end border border-zinc-800">
        <div className="text-zinc-600 text-sm font-mono h-6 overflow-hidden">{previous}</div>
        <div className="text-white text-4xl font-display font-bold truncate">{display || '0'}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`
              h-14 rounded-2xl font-bold text-lg transition-all active:scale-95
              ${btn.span === 2 ? 'col-span-2' : ''}
              ${btn.type === 'op' ? 'text-accent bg-zinc-800 hover:bg-zinc-700' : 
                btn.type === 'equal' ? 'bg-accent text-white hover:opacity-90' : 
                'bg-zinc-800 text-white hover:bg-zinc-700'}
            `}
          >
            {btn.label === 'DEL' ? <Delete className="mx-auto" size={20} /> : btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
