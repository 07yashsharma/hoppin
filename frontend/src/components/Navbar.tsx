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
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b-2 border-hopin-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Wordmark & Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-hopin-dark p-1.5 shadow-[3px_3px_0px_0px_#FF4D8D] group-hover:scale-105 transition-transform flex items-center justify-center border-2 border-hopin-dark">
              <img src="/logo.svg" alt="hopin" className="w-full h-full" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-black tracking-tighter text-hopin-dark">hopin</span>
              <span className="w-2.5 h-2.5 rounded-full bg-hopin-pink inline-block animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-hopin-muted font-bold ml-1 hidden sm:inline">
                [V2.4 // HIGHWAY]
              </span>
            </div>
          </Link>

          {/* Eye-Pleasing Nav Items with Pink/Blue/Orange Indicators */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                isActive('/') 
                  ? 'bg-hopin-dark text-white border-hopin-dark font-bold shadow-[2px_2px_0px_0px_#FF4D8D]' 
                  : 'border-transparent text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 01 HOME
            </Link>
            <Link
              to="/book"
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                isActive('/book') 
                  ? 'bg-hopin-dark text-white border-hopin-dark font-bold shadow-[2px_2px_0px_0px_#3259FE]' 
                  : 'border-transparent text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 02 BOOK
            </Link>
            <Link
              to="/shared-rides"
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                isActive('/shared-rides') 
                  ? 'bg-hopin-dark text-white border-hopin-dark font-bold shadow-[2px_2px_0px_0px_#FF6B35]' 
                  : 'border-transparent text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 03 CORRIDORS
            </Link>
            <Link
              to="/matches"
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                isActive('/matches') 
                  ? 'bg-hopin-dark text-white border-hopin-dark font-bold shadow-[2px_2px_0px_0px_#00E599]' 
                  : 'border-transparent text-hopin-dark hover:bg-black/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-hopin-lime" />
              // 04 AI MATCHES
            </Link>
            <Link
              to="/safety"
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                isActive('/safety') 
                  ? 'bg-hopin-dark text-white border-hopin-dark font-bold shadow-[2px_2px_0px_0px_#FF4D8D]' 
                  : 'border-transparent text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 05 SAFETY
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                isActive('/dashboard') 
                  ? 'bg-hopin-dark text-white border-hopin-dark font-bold shadow-[2px_2px_0px_0px_#3259FE]' 
                  : 'border-transparent text-hopin-dark hover:bg-black/5'
              }`}
            >
              // 06 DESK
            </Link>
          </nav>

          {/* User Session & Fast Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border-2 border-hopin-dark bg-white hover:bg-hopin-bg transition-all text-left shadow-[2px_2px_0px_0px_#121624]"
              >
                <div className="relative">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser?.name || 'User'}
                    className="w-6 h-6 rounded-md object-cover border border-hopin-dark"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <div className="text-[11px] font-mono leading-none">
                  <span className="font-bold text-hopin-dark block">{currentUser?.name?.split(' ')[0] || 'User'}</span>
                  <span className="text-[9px] uppercase tracking-wider text-hopin-muted font-bold">
                    {currentUser?.role === 'admin' ? 'SuperAdmin' : currentUser?.role === 'driver' ? 'Captain' : 'Traveler'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-hopin-dark" />
              </button>

              {/* Demo Switcher Menu */}
              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-[6px_6px_0px_0px_#121624] border-2 border-hopin-dark py-2 z-50">
                  <div className="px-4 py-2 border-b-2 border-hopin-dark font-mono text-[10px] text-hopin-muted uppercase tracking-wider flex items-center justify-between">
                    <span>[SWITCH DEMO PERSONA]</span>
                    <span className="text-hopin-pink font-bold">4 PROFILES</span>
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
                          currentUser?.id === account.id ? 'bg-hopin-pink-light font-bold text-hopin-dark' : 'hover:bg-black/5 text-hopin-muted'
                        }`}
                      >
                        <img src={account.avatar} alt={account.name} className="w-7 h-7 rounded-md object-cover border border-hopin-dark" />
                        <div className="flex-1 font-mono text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-hopin-dark">{account.name}</span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-black/5">
                              {account.role}
                            </span>
                          </div>
                          <span className="text-[10px] text-hopin-muted">
                            {account.role === 'driver' ? 'Innova Crysta Captain' : account.role === 'admin' ? 'Platform Operations' : 'Verified Traveler'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-4 pt-2 pb-1 border-t-2 border-hopin-dark flex items-center justify-between font-mono text-[10px]">
                    <Link to="/driver/dashboard" onClick={() => setDemoDropdownOpen(false)} className="text-hopin-blue font-bold hover:underline">
                      // DRIVER TERMINAL
                    </Link>
                    <Link to="/admin" onClick={() => setDemoDropdownOpen(false)} className="text-hopin-orange font-bold hover:underline">
                      // ADMIN DESK
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Book A Ride Button (Vibrant Pink / Orange / Lime Accent) */}
            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hopin-pink hover:bg-pink-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_#121624] hover:scale-[1.02] border-2 border-hopin-dark"
            >
              <span>Book Ride</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl border-2 border-hopin-dark bg-white hover:bg-red-50 text-hopin-dark hover:text-red-600 transition-colors shadow-[2px_2px_0px_0px_#121624]"
              title="Sign Out to Start Screen"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg border-2 border-hopin-dark text-hopin-dark"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-hopin-dark border-2 border-hopin-dark bg-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-hopin-dark bg-white px-4 pt-3 pb-5 space-y-2 font-mono text-xs shadow-lg">
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
            className="block px-3 py-2 rounded-md font-bold text-hopin-blue hover:bg-black/5"
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

          <div className="pt-3 border-t-2 border-hopin-dark">
            <p className="text-[10px] uppercase font-mono text-hopin-muted mb-2">[SWITCH ACTIVE DEMO PERSONA]</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.slice(0, 4).map(account => (
                <button
                  key={account.id}
                  onClick={() => {
                    switchUser(account.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg border-2 text-left text-[11px] font-mono ${
                    currentUser?.id === account.id ? 'border-hopin-dark bg-hopin-pink-light font-bold' : 'border-hopin-dark/40'
                  }`}
                >
                  <p className="truncate font-bold text-hopin-dark">{account.name.split(' ')[0]}</p>
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
