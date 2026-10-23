import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moving3DCarHighway } from '../components/Moving3DCarHighway';
import { StickyNote } from '../components/StickyNote';
import { 
  Car, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  CheckCircle2, 
  KeyRound, 
  Compass, 
  Star,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { demoAccounts, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'demo' | 'custom'>('demo');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectDemo = async (userId: string) => {
    setIsSubmitting(true);
    await login(userId);
    navigate('/');
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Log in with the first demo account or custom
    if (demoAccounts.length > 0) {
      await login(demoAccounts[0].id);
    } else {
      await login();
    }
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 page-transition">
      
      {/* Top Playful Brand Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hopin-pink-light border-2 border-hopin-dark shadow-[3px_3px_0px_0px_#121624] text-xs font-mono font-bold uppercase text-hopin-pink">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START PORTAL // AUTHENTICATION & DISPATCH GATE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-hopin-dark">
          Hop into your next ride.
        </h1>

        <p className="text-sm sm:text-base font-sans text-hopin-muted max-w-2xl mx-auto leading-relaxed">
          The smart highway ride-sharing network connecting verified commuters across Jaipur, Delhi NCR, and Rajasthan. Pick a persona or sign in to unlock the platform!
        </p>
      </div>

      {/* 3D CAR MOVING HIGHWAY SIMULATOR (Prominently featured at start) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-hopin-pink animate-ping" />
            <span className="font-bold text-hopin-dark uppercase">// INTERACTIVE 3D CAB PREVIEW — STEER WITH MOUSE</span>
          </div>
          <span className="text-hopin-muted hidden sm:inline">// DRIVING SIMULATOR ACTIVE</span>
        </div>

        <Moving3DCarHighway />
      </div>

      {/* MAIN LOGIN & STICKY NOTES INTERACTIVE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Left Column: 1-Click Fast Pass & Credentials Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#121624] p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-4">
            <div>
              <h2 className="text-xl font-display font-black text-hopin-dark">
                Select Your Commuter Persona
              </h2>
              <p className="text-xs font-mono text-hopin-muted mt-0.5">
                // 1-CLICK INSTANT PASS TO EXPLORE THE PLATFORM
              </p>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-1.5 p-1 bg-hopin-bg rounded-lg border-2 border-hopin-dark text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`px-3 py-1 rounded font-bold uppercase transition-all ${
                  activeTab === 'demo'
                    ? 'bg-hopin-dark text-white shadow-sm'
                    : 'text-hopin-dark hover:bg-white'
                }`}
              >
                Fast Pass
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-1 rounded font-bold uppercase transition-all ${
                  activeTab === 'custom'
                    ? 'bg-hopin-dark text-white shadow-sm'
                    : 'text-hopin-dark hover:bg-white'
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          {activeTab === 'demo' ? (
            <div className="space-y-4">
              <p className="text-xs font-sans text-hopin-dark">
                Click any pre-seeded persona to sign in immediately and test their perspective:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {demoAccounts.map(account => {
                  const roleTheme = 
                    account.role === 'admin' ? { border: 'hover:border-hopin-orange', badge: 'bg-hopin-orange-light text-hopin-orange' } :
                    account.role === 'driver' ? { border: 'hover:border-hopin-lime', badge: 'bg-hopin-lime-light text-emerald-800' } :
                    account.id === 'user-priya-02' ? { border: 'hover:border-hopin-pink', badge: 'bg-hopin-pink-light text-hopin-pink' } :
                    { border: 'hover:border-hopin-blue', badge: 'bg-hopin-blue-light text-hopin-blue' };

                  return (
                    <button
                      key={account.id}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSelectDemo(account.id)}
                      className={`p-4 rounded-xl border-2 border-hopin-dark bg-hopin-bg hover:bg-white text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#121624] group flex flex-col justify-between gap-3 ${roleTheme.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={account.avatar}
                            alt={account.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-hopin-dark shadow-sm"
                          />
                          {account.idVerified && (
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                            </span>
                          )}
                        </div>

                        <div>
                          <p className="font-display font-black text-sm text-hopin-dark group-hover:text-hopin-blue transition-colors">
                            {account.name}
                          </p>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm inline-block mt-0.5 ${roleTheme.badge}`}>
                            {account.role === 'driver' ? 'Captain (Driver)' : account.role}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-hopin-dark/10 flex items-center justify-between text-[11px] font-mono text-hopin-muted">
                        <span>★ {account.averageRating || 4.9} rating</span>
                        <span className="font-bold text-hopin-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Enter</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block font-bold text-hopin-dark mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-hopin-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-blue"
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
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#00E599] flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'SIGNING IN...' : 'UNLOCK HOPIN PLATFORM'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t-2 border-hopin-dark text-center font-mono text-xs text-hopin-muted">
            Need a driver partner or passenger account?{' '}
            <Link to="/signup" className="text-hopin-dark font-bold underline hover:text-hopin-pink">
              Create a free account
            </Link>
          </div>

        </div>

        {/* Right Column: Handcrafted Sticky Notes Wall (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-hopin-muted pb-1">
            <span className="font-bold text-hopin-dark uppercase">// BULLETIN BOARD // LIVE COMMUNITY NOTES</span>
            <span>📍 PINNED</span>
          </div>

          <div className="space-y-5">
            
            {/* Sticky Note 1: Pink (Highway savings) */}
            <StickyNote 
              color="pink" 
              badge="FARES" 
              title="JAIPUR ⇄ DELHI POOLING" 
              rotation={-2}
              pin={true}
              author="Priya Patel (Gurugram)"
            >
              "Solo cab cost ₹3,800. Through hopin matching, Rohan and I shared an Innova Crysta for <strong>₹2,400 each</strong>! Saved ₹1,400 with just a 12-min pickup detour."
            </StickyNote>

            {/* Sticky Note 2: Yellow (Algorithm rule) */}
            <StickyNote 
              color="yellow" 
              badge="AI MATCHING" 
              title="ZERO DETOUR GUARANTEE" 
              rotation={2.5}
              tape={true}
              author="Algorithm Telemetry"
            >
              "Our route vector cosine algorithm discards any pair with detour exceeding 30 minutes. You only ride with travelers going in your exact direction on the NH-48 corridor."
            </StickyNote>

            {/* Sticky Note 3: Mint (Safety & Captains) */}
            <StickyNote 
              color="mint" 
              badge="TRUST & SAFETY" 
              title="COMMERCIAL CAPTAINS" 
              rotation={-1.5}
              tape={true}
              author="Capt. Vikram Singh"
            >
              "All vehicles are verified commercial tourist permit cabs (AITP). Driver payout is guaranteed at 85% with instant wallet settlements."
            </StickyNote>

            {/* Sticky Note 4: Orange (Quiet cabin etiquette) */}
            <StickyNote 
              color="orange" 
              badge="CABIN RULES" 
              title="QUIET TIME MODE" 
              rotation={1.8}
              pin={true}
              author="Rohan Sharma (Jaipur)"
            >
              "You can specify Quiet Cabin in preferences! Perfect if you want to work on your laptop during the highway trip without loud phone calls."
            </StickyNote>

          </div>
        </div>

      </div>

    </div>
  );
};
