import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Car, 
  User, 
  Shield, 
  ArrowRight, 
  Sparkles,
  Lock,
  Mail,
  ArrowUpRight
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { demoAccounts, switchUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSelectDemo = async (userId: string) => {
    await switchUser(userId);
    navigate('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoAccounts.length > 0) {
      handleSelectDemo(demoAccounts[0].id);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/logo.svg" alt="hopin" className="w-10 h-10" />
          <span className="font-display font-black text-2xl tracking-tighter text-hopin-dark">hopin</span>
        </div>
        <h1 className="text-3xl font-display font-black text-hopin-dark tracking-tight">
          Sign In to hopin
        </h1>
        <p className="text-xs font-mono text-hopin-muted">
          // ACCESS VERIFIED ROUTE MATCHING & HIGHWAY POOLING
        </p>
      </div>

      {/* QUICK 1-CLICK DEMO ACCOUNTS SELECTOR */}
      <div className="bg-hopin-dark text-hopin-bg rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#C5F55A] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-hopin-bg/20 pb-3">
          <div className="flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-hopin-lime" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-hopin-lime">
              EVALUATOR 1-CLICK PASS
            </h2>
          </div>
          <span className="text-[10px] font-mono text-hopin-muted">// PRE-SEEDED</span>
        </div>
        
        <p className="text-xs font-sans text-hopin-bg/80">
          Switch into any verified persona to instantly explore route matching, captain dispatch, or platform governance:
        </p>

        <div className="space-y-2 font-mono">
          {demoAccounts.map(account => (
            <button
              key={account.id}
              type="button"
              onClick={() => handleSelectDemo(account.id)}
              className="w-full p-3 rounded-lg bg-zinc-900 border-2 border-zinc-700 hover:border-hopin-lime flex items-center justify-between transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <img src={account.avatar} alt={account.name} className="w-9 h-9 rounded-md object-cover border border-hopin-bg/30" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-hopin-bg group-hover:text-hopin-lime transition-colors">{account.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-zinc-800 text-hopin-lime border border-zinc-600 uppercase">
                      {account.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">{account.email}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-hopin-lime group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Standard Form Fallback */}
      <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-hopin-muted absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-hopin-muted absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#C5F55A]"
          >
            Authenticate Credentials
          </button>
        </form>

        <p className="text-center font-mono text-xs text-hopin-muted pt-4 border-t-2 border-hopin-dark">
          New commuter?{' '}
          <Link to="/signup" className="text-hopin-dark font-bold underline hover:text-hopin-cobalt">
            Register new account
          </Link>
        </p>
      </div>

    </div>
  );
};
