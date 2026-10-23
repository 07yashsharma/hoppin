import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { resetDatabaseDemo } from '../services/api';
import { RefreshCw, Check, Terminal, User, Shield, Car, Sparkles } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, switchUser, refreshUser } = useAuth();
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = async () => {
    try {
      setResetting(true);
      await resetDatabaseDemo();
      await refreshUser();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    } catch (err) {
      console.error('Reset failed', err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="bg-hopin-dark text-white text-[11px] font-mono py-1.5 px-4 border-b-2 border-hopin-dark select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Terminal Indicator with vibrant pulse */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hopin-pink animate-pulse" />
          <span className="text-white font-bold tracking-tight">HOPIN // HIGHWAY RUNTIME:</span>
          <span className="text-zinc-400 hidden md:inline">
            Deterministic AI Corridor Pooling across Rajasthan & Delhi NCR
          </span>
        </div>

        {/* Persona Switchers with Eye-pleasing Colors */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-zinc-400 text-[10px] uppercase mr-1 hidden sm:inline">SWITCH ACTOR:</span>
          
          <button
            onClick={() => switchUser('usr_rohan')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'usr_rohan'
                ? 'bg-hopin-blue text-white font-bold border-hopin-blue shadow-sm'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            <User className="w-3 h-3 text-cyan-300" />
            <span>Rohan (Pass.)</span>
          </button>

          <button
            onClick={() => switchUser('usr_priya')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'usr_priya'
                ? 'bg-hopin-pink text-white font-bold border-hopin-pink shadow-sm'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            <User className="w-3 h-3 text-pink-300" />
            <span>Priya (Pass.)</span>
          </button>

          <button
            onClick={() => switchUser('drv_vikram')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'drv_vikram'
                ? 'bg-emerald-500 text-black font-bold border-emerald-400 shadow-sm'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            <Car className="w-3 h-3 text-emerald-300" />
            <span>Vikram (Captain)</span>
          </button>

          <button
            onClick={() => switchUser('usr_admin')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'usr_admin'
                ? 'bg-hopin-orange text-white font-bold border-hopin-orange shadow-sm'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            <Shield className="w-3 h-3 text-amber-300" />
            <span>Admin (Ops)</span>
          </button>

          {/* Reset Demo button */}
          <button
            onClick={handleReset}
            disabled={resetting}
            title="Reset database to initial demo fixtures"
            className="ml-2 px-2.5 py-1 rounded-md text-[10px] font-mono bg-red-950/80 text-rose-300 hover:bg-red-900 transition-all flex items-center gap-1 border border-rose-500/40"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">RESET COMPLETE</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
                <span>{resetting ? 'RESETTING...' : 'RESET FIXTURES'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
