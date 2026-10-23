import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { resetDatabaseDemo } from '../services/api';
import { RefreshCw, Check, Terminal, User, Shield, Car } from 'lucide-react';

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
    <div className="bg-hopin-dark text-[#D8D6CD] text-[11px] font-mono py-1.5 px-4 border-b border-[#2C3029]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Terminal Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hopin-lime animate-pulse" />
          <span className="text-white font-bold tracking-tight">HOPIN // EVALUATOR RUNTIME:</span>
          <span className="text-hopin-muted-light hidden md:inline">
            Deterministic AI Route Matching & Verified Sharing Across India
          </span>
        </div>

        {/* Persona Switchers */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-hopin-muted text-[10px] uppercase mr-1 hidden sm:inline">ACTOR:</span>
          
          <button
            onClick={() => switchUser('usr_rohan')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 ${
              currentUser?.id === 'usr_rohan'
                ? 'bg-hopin-lime text-hopin-dark font-bold'
                : 'bg-[#272B25] text-slate-300 hover:bg-[#323830]'
            }`}
          >
            <User className="w-2.5 h-2.5" />
            Rohan (Pass.)
          </button>

          <button
            onClick={() => switchUser('usr_priya')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 ${
              currentUser?.id === 'usr_priya'
                ? 'bg-hopin-lime text-hopin-dark font-bold'
                : 'bg-[#272B25] text-slate-300 hover:bg-[#323830]'
            }`}
          >
            <User className="w-2.5 h-2.5" />
            Priya (Pass.)
          </button>

          <button
            onClick={() => switchUser('drv_vikram')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 ${
              currentUser?.id === 'drv_vikram'
                ? 'bg-hopin-lime text-hopin-dark font-bold'
                : 'bg-[#272B25] text-slate-300 hover:bg-[#323830]'
            }`}
          >
            <Car className="w-2.5 h-2.5" />
            Vikram (Driver)
          </button>

          <button
            onClick={() => switchUser('usr_admin')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 ${
              currentUser?.id === 'usr_admin'
                ? 'bg-hopin-lime text-hopin-dark font-bold'
                : 'bg-[#272B25] text-slate-300 hover:bg-[#323830]'
            }`}
          >
            <Shield className="w-2.5 h-2.5" />
            Admin
          </button>

          {/* Reset Demo button */}
          <button
            onClick={handleReset}
            disabled={resetting}
            title="Reset database to initial demo fixtures"
            className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-all flex items-center gap-1 border border-rose-500/30"
          >
            {resetSuccess ? (
              <>
                <Check className="w-2.5 h-2.5 text-hopin-lime" />
                <span className="text-hopin-lime">RESET COMPLETE</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-2.5 h-2.5 ${resetting ? 'animate-spin' : ''}`} />
                <span>{resetting ? 'RESETTING...' : '[RESET DB]'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
