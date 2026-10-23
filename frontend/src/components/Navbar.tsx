import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  Sparkles, 
  Car, 
  Menu, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  User, 
  LogOut, 
  Sliders 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, demoAccounts, switchUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
          
          {/* ========================================================= */}
          {/* LEFT SECTION — BRAND / LOGO (SEPARATE & PROMINENT)        */}
          {/* ========================================================= */}
          <div className="flex items-center shrink-0 pr-4 lg:pr-6 border-r border-border/50">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-card p-1.5 border border-border group-hover:border-accent/60 transition-colors flex items-center justify-center shadow-subtle">
                <img src="/logo.svg" alt="hopin" className="w-full h-full" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-primary">hopin</span>
                <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted font-medium ml-1 hidden sm:inline">
                  HIGHWAY
                </span>
              </div>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* CENTER SECTION — COMPACT, SLIM FEATURE NAVIGATION         */}
          {/* ========================================================= */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 font-mono text-[11px] bg-card/60 p-1 rounded-xl border border-border/50 shadow-subtle">
            <Link
              to="/"
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                isActive('/') 
                  ? 'bg-elevated text-primary font-semibold border border-border shadow-subtle' 
                  : 'text-secondary hover:text-primary hover:bg-secondary'
              }`}
            >
              // 01 HOME
            </Link>
            <Link
              to="/book"
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                isActive('/book') 
                  ? 'bg-elevated text-primary font-semibold border border-border shadow-subtle' 
                  : 'text-secondary hover:text-primary hover:bg-secondary'
              }`}
            >
              // 02 BOOK
            </Link>
            <Link
              to="/shared-rides"
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                isActive('/shared-rides') 
                  ? 'bg-elevated text-primary font-semibold border border-border shadow-subtle' 
                  : 'text-secondary hover:text-primary hover:bg-secondary'
              }`}
            >
              // 03 CORRIDORS
            </Link>
            <Link
              to="/matches"
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                isActive('/matches') 
                  ? 'bg-elevated text-primary font-semibold border border-border shadow-subtle' 
                  : 'text-secondary hover:text-primary hover:bg-secondary'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              // 04 AI MATCHES
            </Link>
            <Link
              to="/safety"
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                isActive('/safety') 
                  ? 'bg-elevated text-primary font-semibold border border-border shadow-subtle' 
                  : 'text-secondary hover:text-primary hover:bg-secondary'
              }`}
            >
              // 05 SAFETY
            </Link>
            <Link
              to="/dashboard"
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                isActive('/dashboard') 
                  ? 'bg-elevated text-primary font-semibold border border-border shadow-subtle' 
                  : 'text-secondary hover:text-primary hover:bg-secondary'
              }`}
            >
              // 06 DESK
            </Link>
          </nav>

          {/* ========================================================= */}
          {/* RIGHT SECTION — ACCOUNT AND PRIMARY ACTIONS              */}
          {/* Order: 1. User Dropdown | 2. Book Ride Button | 3. SignOut */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0 pl-2 xl:pl-4">
            
            {/* 1. Existing User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border bg-card hover:bg-elevated transition-colors text-left shadow-subtle"
              >
                <div className="relative">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser?.name || 'User'}
                    className="w-6 h-6 rounded-lg object-cover border border-border"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <div className="text-[11px] font-mono leading-none">
                  <span className="font-semibold text-primary block">{currentUser?.name?.split(' ')[0] || 'User'}</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted font-medium">
                    {currentUser?.role === 'admin' ? 'SuperAdmin' : currentUser?.role === 'driver' ? 'Captain' : 'Traveler'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted" />
              </button>

              {/* Persona Switcher Dropdown Menu */}
              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-card rounded-xl shadow-elevated border border-border py-2 z-50">
                  <div className="px-4 py-2 border-b border-border font-mono text-[10px] text-muted uppercase tracking-wider flex items-center justify-between">
                    <span>SWITCH PERSONA</span>
                    <span className="text-accent font-semibold">4 PROFILES</span>
                  </div>

                  <div className="py-1">
                    {demoAccounts.map(account => (
                      <button
                        key={account.id}
                        onClick={() => {
                          switchUser(account.id);
                          setDemoDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left text-xs transition-colors ${
                          currentUser?.id === account.id ? 'bg-elevated font-semibold text-primary border-l-2 border-accent' : 'hover:bg-secondary text-secondary'
                        }`}
                      >
                        <img src={account.avatar} alt={account.name} className="w-7 h-7 rounded-lg object-cover border border-border" />
                        <div className="flex-1 font-mono text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-primary">{account.name}</span>
                            <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-secondary text-muted">
                              {account.role}
                            </span>
                          </div>
                          <span className="text-[10px] text-muted">
                            {account.role === 'driver' ? 'Innova Crysta Captain' : account.role === 'admin' ? 'Platform Operations' : 'Verified Traveler'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-4 pt-2 pb-1 border-t border-border flex items-center justify-between font-mono text-[10px]">
                    <Link to="/driver/dashboard" onClick={() => setDemoDropdownOpen(false)} className="text-accent hover:underline font-medium">
                      // DRIVER TERMINAL
                    </Link>
                    <Link to="/admin" onClick={() => setDemoDropdownOpen(false)} className="text-muted hover:text-primary hover:underline font-medium">
                      // ADMIN DESK
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Existing Purple BOOK RIDE Primary Action Button */}
            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle shrink-0"
            >
              <span>Book Ride</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* 3. Existing Sign-in/Sign-out Icon Button */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl border border-border bg-card hover:bg-elevated text-muted hover:text-error transition-colors shadow-subtle shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg border border-border text-muted hover:text-error bg-card"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-primary border border-border bg-card hover:bg-elevated"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card px-4 pt-3 pb-5 space-y-2 font-mono text-xs shadow-elevated">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-elevated"
          >
            // 01 HOME
          </Link>
          <Link
            to="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-elevated"
          >
            // 02 BOOK A RIDE
          </Link>
          <Link
            to="/shared-rides"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-elevated"
          >
            // 03 HIGHWAY CORRIDORS
          </Link>
          <Link
            to="/matches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-elevated"
          >
            // 04 AI MATCHES
          </Link>
          <Link
            to="/safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-elevated"
          >
            // 05 SAFETY & SOS
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-primary hover:bg-elevated"
          >
            // 06 PASSENGER DASHBOARD
          </Link>
          <Link
            to="/driver/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-accent hover:bg-elevated"
          >
            // DRIVER TERMINAL
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-muted hover:text-primary hover:bg-elevated"
          >
            // OPERATIONS ADMIN
          </Link>

          <div className="pt-3 border-t border-border">
            <p className="text-[10px] uppercase font-mono text-muted mb-2">SWITCH ACTIVE DEMO PERSONA</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.slice(0, 4).map(account => (
                <button
                  key={account.id}
                  onClick={() => {
                    switchUser(account.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg border text-left text-[11px] font-mono ${
                    currentUser?.id === account.id ? 'border-accent bg-elevated text-primary font-semibold' : 'border-border bg-secondary text-secondary'
                  }`}
                >
                  <p className="truncate font-semibold text-primary">{account.name.split(' ')[0]}</p>
                  <p className="text-[9px] text-muted uppercase">{account.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
