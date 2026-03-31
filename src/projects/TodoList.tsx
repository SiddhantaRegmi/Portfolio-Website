import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl min-h-[500px] flex flex-col">
      <h3 className="text-2xl font-display font-bold text-white mb-6 italic">TO DO LIST</h3>
      
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          className="flex-1 bg-black border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-accent transition-colors"
        />
        <button 
          onClick={addTodo}
          className="bg-accent text-white p-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {todos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 italic">
            <p>No tasks yet.</p>
            <p className="text-xs">Add something above!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id}
              className="flex items-center gap-3 bg-black/40 p-4 rounded-xl border border-zinc-800/50 group hover:border-zinc-700 transition-colors"
            >
              <button 
                onClick={() => toggleTodo(todo.id)}
                className={`${todo.completed ? 'text-accent' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                {todo.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </button>
              <span className={`flex-1 text-sm ${todo.completed ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
        <span>{todos.filter(t => !t.completed).length} items left</span>
        <span>{todos.length} total</span>
      </div>
    </div>
  );
}
