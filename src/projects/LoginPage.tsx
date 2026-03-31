import React, { useState } from 'react';
import { Mail, Lock, LogIn, Github, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-bold text-white mb-2 italic">Welcome back!</h3>
        <p className="text-zinc-500">Sign in to access your account</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
            <input type="checkbox" className="rounded border-zinc-800 bg-black text-accent focus:ring-accent" />
            Remember me
          </label>
          <a href="#" className="text-accent hover:underline">Forgot password?</a>
        </div>

        <button className="w-full bg-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <LogIn size={18} />
          SIGN IN
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-900 px-2 text-zinc-500 font-mono">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 bg-black border border-zinc-800 py-2 rounded-xl hover:bg-zinc-800 transition-colors">
          <Chrome size={18} />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 bg-black border border-zinc-800 py-2 rounded-xl hover:bg-zinc-800 transition-colors">
          <Github size={18} />
          GitHub
        </button>
      </div>

      <p className="text-center mt-8 text-sm text-zinc-500">
        Don't have an account? <a href="#" className="text-accent hover:underline">Sign Up</a>
      </p>
    </div>
  );
}
