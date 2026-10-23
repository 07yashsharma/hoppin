import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  TrendingDown, 
  Users, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export const LiveMatchVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'combined' | 'solo'>('combined');

  return (
    <div className="bg-hopin-dark text-white rounded-3xl border border-[#2D332B] shadow-2xl overflow-hidden font-mono">
      
      {/* Top Terminal Bar */}
      <div className="bg-[#1F231D] p-5 sm:p-6 border-b border-[#2C3129] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-hopin-lime animate-pulse" />
            <span className="text-hopin-lime font-bold text-xs uppercase tracking-wider">
              [ROUTE MATCHING // LIVE DEMO]
            </span>
            <span className="text-[11px] text-hopin-muted-light">// JAIPUR TO DELHI IGI T3</span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
            Corridor NH 48 — Algorithmic Pooling Matrix
          </h3>
        </div>

        {/* Comparison Toggle */}
        <div className="flex items-center bg-[#151814] p-1 rounded-xl border border-[#2B3128] self-start md:self-auto text-xs">
          <button
            onClick={() => setActiveTab('combined')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'combined'
                ? 'bg-hopin-lime text-hopin-dark shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Combined Ride (1 Cab)
          </button>
          <button
            onClick={() => setActiveTab('solo')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'solo'
                ? 'bg-white text-hopin-dark shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Solo Unshared (2 Cabs)
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        
        {activeTab === 'combined' ? (
          <>
            {/* Visual Route Convergence Diagram */}
            <div className="bg-[#1A1E18] rounded-2xl p-6 border border-[#282F25] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-hopin-muted font-bold uppercase tracking-wider">
                  [CONVERGING TRAJECTORY // SPATIAL VECTOR]
                </span>
                <span className="text-hopin-lime font-bold bg-hopin-lime/10 px-2 py-0.5 rounded border border-hopin-lime/30">
                  94.2% COMPATIBILITY SCORE
                </span>
              </div>

              {/* Animated SVG Path Map */}
              <div className="relative py-3">
                <svg viewBox="0 0 700 160" className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="limeRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C5F55A" />
                      <stop offset="100%" stopColor="#C5F55A" />
                    </linearGradient>
                    <linearGradient id="cobaltRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#345CFF" />
                      <stop offset="60%" stopColor="#345CFF" />
                      <stop offset="100%" stopColor="#C5F55A" />
                    </linearGradient>
                  </defs>

                  {/* Passenger A Path (Lime: Jaipur Station to Delhi Airport) */}
                  <path
                    d="M 50 35 C 180 35, 260 80, 420 80 L 640 80"
                    fill="none"
                    stroke="url(#limeRibbon)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />

                  {/* Passenger B Path (Cobalt: Ajmer Road to Delhi Airport) */}
                  <path
                    d="M 50 125 C 180 125, 260 80, 420 80 L 640 80"
                    fill="none"
                    stroke="url(#cobaltRibbon)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />

                  {/* Node A (Lime) */}
                  <circle cx="50" cy="35" r="7" fill="#C5F55A" stroke="#171916" strokeWidth="2.5" />
                  {/* Node B (Cobalt) */}
                  <circle cx="50" cy="125" r="7" fill="#345CFF" stroke="#171916" strokeWidth="2.5" />
                  {/* Merge Point on NH48 */}
                  <circle cx="420" cy="80" r="8" fill="#171916" stroke="#C5F55A" strokeWidth="3" />
                  {/* Final Destination */}
                  <circle cx="640" cy="80" r="9" fill="#C5F55A" stroke="#171916" strokeWidth="3" />
                </svg>

                {/* Marker labels */}
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-hopin-lime font-bold">
                      <span className="w-2 h-2 rounded-full bg-hopin-lime" />
                      <span>PICKUP A: JAIPUR RAILWAY STATION (07:00 AM)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#6584FF] font-bold">
                      <span className="w-2 h-2 rounded-full bg-hopin-cobalt" />
                      <span>PICKUP B: AJMER RD 200FT BYPASS (07:18 AM)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-hopin-lime font-extrabold text-xs">DESTINATION: DELHI IGI T3 (11:45 AM)</p>
                    <p className="text-slate-400 text-[10px]">SHARED DIRECT CORRIDOR</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Breakdown Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Passenger A (Rohan) */}
              <div className="bg-[#1A1E18] p-5 rounded-2xl border border-[#2D3428] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-hopin-lime" />
                    <div>
                      <p className="font-display font-bold text-white text-sm">Rohan Sharma</p>
                      <p className="text-[10px] text-slate-400 font-mono">Jaipur Station → Delhi T3</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#272E24] text-hopin-lime font-bold">
                    +11m Detour
                  </span>
                </div>

                <div className="pt-2 border-t border-[#292F25] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Solo Cab: ₹3,850</span>
                    <span className="font-display text-lg font-black text-hopin-lime">₹2,420 Shared</span>
                  </div>
                  <div className="text-right font-bold text-xs text-hopin-lime">
                    <span>Saved ₹1,430 (37%)</span>
                  </div>
                </div>
              </div>

              {/* Passenger B (Priya) */}
              <div className="bg-[#1A1E18] p-5 rounded-2xl border border-[#2D3428] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-hopin-cobalt" />
                    <div>
                      <p className="font-display font-bold text-white text-sm">Priya Patel</p>
                      <p className="text-[10px] text-slate-400 font-mono">Ajmer Road → Delhi T3</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#272E24] text-[#6584FF] font-bold">
                    +4m Detour
                  </span>
                </div>

                <div className="pt-2 border-t border-[#292F25] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Solo Cab: ₹3,700</span>
                    <span className="font-display text-lg font-black text-white">₹2,320 Shared</span>
                  </div>
                  <div className="text-right font-bold text-xs text-[#6584FF]">
                    <span>Saved ₹1,380 (37%)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Total Collective Efficiency Bar */}
            <div className="bg-[#151814] p-5 rounded-2xl border border-[#2D3428] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-hopin-muted uppercase font-bold text-[10px]">
                  [COMBINED IMPACT STATS]
                </span>
                <p className="text-white font-bold text-sm">
                  1 Cab Dispatched • ₹2,810 Cumulative Savings • 44.5 kg CO₂ Avoided
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  Vehicle assigned upon mutual confirmation: Toyota Innova Crysta (RJ 14 TC 8821)
                </p>
              </div>

              <Link
                to="/matches"
                className="px-4 py-2.5 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Test Live Matches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        ) : (
          /* UNPOOLED SOLO CARS COMPARISON */
          <div className="bg-[#1A1E18] p-8 rounded-2xl border border-[#282F25] text-center space-y-4">
            <h4 className="font-display font-bold text-lg text-white">Standard Fragmented Travel</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto font-sans leading-relaxed">
              Without algorithmic pooling, Rohan and Priya book separate private cabs driving along the exact same NH 48 expressway at 07:00 AM.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-xs text-left">
              <div className="p-3 bg-[#151814] rounded-xl border border-[#292F25]">
                <p className="font-bold text-white">Cab 1: ₹3,850</p>
                <p className="text-slate-400">3 seats completely empty</p>
              </div>
              <div className="p-3 bg-[#151814] rounded-xl border border-[#292F25]">
                <p className="font-bold text-white">Cab 2: ₹3,700</p>
                <p className="text-slate-400">3 seats completely empty</p>
              </div>
            </div>

            <p className="text-xs text-hopin-orange font-bold">
              Total expenditure: ₹7,550 (42% higher cost + duplicate highway congestion)
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
