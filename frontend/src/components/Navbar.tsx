import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  Sparkles, 
  Car, 
  Menu, 
  X, 
  ArrowUpRight,
  ShieldCheck,
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, demoAccounts, switchUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#F5F3EB]/90 backdrop-blur-md border-b border-hopin-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Wordmark & Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-hopin-dark p-1.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center border border-black/10">
              <img src="/logo.svg" alt="hopin" className="w-full h-full" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-black tracking-tighter text-hopin-dark">hopin</span>
              <span className="w-2 h-2 rounded-full bg-hopin-lime inline-block" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-hopin-muted font-semibold ml-1 hidden sm:inline">
                [V2.4]
              </span>
            </div>
          </Link>

          {/* Editorial Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium tracking-tight ${
                isActive('/') ? 'bg-hopin-dark text-hopin-lime font-bold' : 'text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 01 HOME
            </Link>
            <Link
              to="/book"
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium tracking-tight ${
                isActive('/book') ? 'bg-hopin-dark text-hopin-lime font-bold' : 'text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 02 BOOK
            </Link>
            <Link
              to="/shared-rides"
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium tracking-tight ${
                isActive('/shared-rides') ? 'bg-hopin-dark text-hopin-lime font-bold' : 'text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 03 CORRIDORS
            </Link>
            <Link
              to="/matches"
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium tracking-tight flex items-center gap-1.5 ${
                isActive('/matches') ? 'bg-hopin-dark text-hopin-lime font-bold' : 'text-hopin-dark hover:bg-black/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-hopin-lime" />
              // 04 AI MATCHES
            </Link>
            <Link
              to="/safety"
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium tracking-tight ${
                isActive('/safety') ? 'bg-hopin-dark text-hopin-lime font-bold' : 'text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 05 SAFETY
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium tracking-tight ${
                isActive('/dashboard') ? 'bg-hopin-dark text-hopin-lime font-bold' : 'text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 06 DESK
            </Link>
          </nav>

          {/* User Session & Demo Persona Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-hopin-border bg-white hover:border-hopin-dark/40 transition-all text-left shadow-sm"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={currentUser?.name || 'User'}
                  className="w-6 h-6 rounded-lg object-cover"
                />
                <div className="text-[11px] font-mono leading-none">
                  <span className="font-bold text-hopin-dark block">{currentUser?.name?.split(' ')[0] || 'User'}</span>
                  <span className="text-[9px] uppercase tracking-wider text-hopin-muted font-semibold">
                    {currentUser?.role === 'admin' ? 'SuperAdmin' : currentUser?.role === 'driver' ? 'Captain' : 'Traveler'}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-hopin-muted" />
              </button>

              {/* Demo Switcher Menu */}
              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-hopin-border py-2 z-50">
                  <div className="px-4 py-2 border-b border-hopin-border font-mono text-[10px] text-hopin-muted uppercase tracking-wider">
                    [ACTIVATE DEMO PERSONA]
                  </div>

                  <div className="py-1">
                    {demoAccounts.map(account => (
                      <button
                        key={account.id}
                        onClick={() => {
                          switchUser(account.id);
                          setDemoDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors ${
                          currentUser?.id === account.id ? 'bg-[#F5F3EB] font-bold text-hopin-dark' : 'hover:bg-black/5 text-hopin-muted'
                        }`}
                      >
                        <img src={account.avatar} alt={account.name} className="w-7 h-7 rounded-lg object-cover" />
                        <div className="flex-1 font-mono text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-hopin-dark">{account.name}</span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5">
                              {account.role}
                            </span>
                          </div>
                          <span className="text-[10px] text-hopin-muted">
                            {account.role === 'driver' ? 'Toyota Innova (6 seats)' : account.role === 'admin' ? 'Operations Lead' : 'Verified Commuter'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-4 pt-2 pb-1 border-t border-hopin-border flex items-center justify-between font-mono text-[10px]">
                    <Link to="/driver/dashboard" onClick={() => setDemoDropdownOpen(false)} className="text-hopin-dark hover:underline">
                      // DRIVER TERMINAL
                    </Link>
                    <Link to="/admin" onClick={() => setDemoDropdownOpen(false)} className="text-hopin-dark hover:underline">
                      // ADMIN DESK
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Book A Ride Button (Vivid Lime Accent) */}
            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] border border-black/10"
            >
              <span>Book a Ride</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-hopin-dark hover:bg-black/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hopin-border bg-hopin-bg px-4 pt-2 pb-4 space-y-1 font-mono text-xs">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-dark hover:bg-black/5"
          >
            // 01 HOME
          </Link>
          <Link
            to="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-dark hover:bg-black/5"
          >
            // 02 BOOK A RIDE
          </Link>
          <Link
            to="/shared-rides"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-dark hover:bg-black/5"
          >
            // 03 HIGHWAY CORRIDORS
          </Link>
          <Link
            to="/matches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-dark hover:bg-black/5"
          >
            // 04 AI MATCHES
          </Link>
          <Link
            to="/safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-dark hover:bg-black/5"
          >
            // 05 SAFETY & SOS
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-dark hover:bg-black/5"
          >
            // 06 PASSENGER DASHBOARD
          </Link>
          <Link
            to="/driver/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-cobalt hover:bg-black/5"
          >
            // DRIVER TERMINAL
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-bold text-hopin-orange hover:bg-black/5"
          >
            // OPERATIONS ADMIN
          </Link>

          <div className="pt-3 border-t border-hopin-border">
            <p className="text-[10px] uppercase font-mono text-hopin-muted mb-2">[SWITCH ACTIVE DEMO PERSONA]</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.slice(0, 4).map(account => (
                <button
                  key={account.id}
                  onClick={() => {
                    switchUser(account.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl border text-left text-[11px] font-mono ${
                    currentUser?.id === account.id ? 'border-hopin-dark bg-white font-bold' : 'border-hopin-border'
                  }`}
                >
                  <p className="truncate">{account.name.split(' ')[0]}</p>
                  <p className="text-[9px] text-hopin-muted uppercase">{account.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
