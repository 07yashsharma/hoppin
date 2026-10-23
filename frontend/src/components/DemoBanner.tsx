import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { resetDatabaseDemo } from '../services/api';
import { RefreshCw, Check, User, Shield, Car } from 'lucide-react';

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
    <div className="bg-secondary text-primary text-[11px] font-mono py-1.5 px-4 border-b border-border select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Telemetry Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-primary font-semibold tracking-tight">HOPIN // HIGHWAY RUNTIME:</span>
          <span className="text-muted hidden md:inline">
            Deterministic AI Corridor Pooling across Rajasthan & Delhi NCR
          </span>
        </div>

        {/* Persona Switchers */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-muted text-[10px] uppercase mr-1 hidden sm:inline">SWITCH ACTOR:</span>
          
          <button
            onClick={() => switchUser('usr_rohan')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'usr_rohan'
                ? 'bg-accent text-bg font-semibold border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Rohan (Pass.)</span>
          </button>

          <button
            onClick={() => switchUser('usr_priya')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'usr_priya'
                ? 'bg-accent text-bg font-semibold border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Priya (Pass.)</span>
          </button>

          <button
            onClick={() => switchUser('drv_vikram')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'drv_vikram'
                ? 'bg-accent text-bg font-semibold border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            <Car className="w-3 h-3" />
            <span>Vikram (Captain)</span>
          </button>

          <button
            onClick={() => switchUser('usr_admin')}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 border ${
              currentUser?.id === 'usr_admin'
                ? 'bg-accent text-bg font-semibold border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Admin (Ops)</span>
          </button>

          {/* Active Real User Session */}
          {currentUser && !['usr_rohan', 'usr_priya', 'drv_vikram', 'usr_admin'].includes(currentUser.id) && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-accent text-bg font-semibold border border-accent flex items-center gap-1 shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-bg animate-ping" />
              <span>{currentUser.name.split(' ')[0]} (Real ID: {currentUser.email})</span>
            </span>
          )}

          {/* Reset Demo button */}
          <button
            onClick={handleReset}
            disabled={resetting}
            title="Reset database to initial demo fixtures"
            className="ml-2 px-2.5 py-1 rounded-md text-[10px] font-mono bg-error-surface text-error hover:bg-error-surface/80 transition-colors flex items-center gap-1 border border-error/30"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3 h-3 text-success" />
                <span className="text-success font-semibold">RESET COMPLETE</span>
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
