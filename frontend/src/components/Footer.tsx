import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary text-xs font-mono border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Top Ticker Bar */}
        <div className="border-b border-border pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display font-bold text-2xl text-primary tracking-tight">hopin</span>
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              <span className="text-muted text-xs">// SHARED TRANSIT ARCHITECTURE</span>
            </div>
            <p className="font-sans text-xs text-muted max-w-lg leading-relaxed">
              Algorithmic ride matching for city streets and interstate expressways. Designed with creative coding precision to eliminate empty seats, fuel waste, and unreasonable cab charges.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-card border border-border text-accent font-semibold shadow-subtle">
              [SYSTEM ACTIVE] 94.8% AVG CORRIDOR MATCH
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-[11px]">
          
          <div>
            <span className="text-primary font-semibold uppercase tracking-wider block mb-3 text-xs">
              [01 // MOBILITY]
            </span>
            <ul className="space-y-2 text-muted">
              <li><Link to="/book" className="hover:text-primary transition-colors">→ Book a Ride</Link></li>
              <li><Link to="/shared-rides" className="hover:text-primary transition-colors">→ Highway Corridors</Link></li>
              <li><Link to="/matches" className="hover:text-primary transition-colors">→ AI Match Engine</Link></li>
              <li><Link to="/driver/dashboard" className="hover:text-primary transition-colors">→ Driver Terminal</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">→ Operations Admin</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-primary font-semibold uppercase tracking-wider block mb-3 text-xs">
              [02 // SAFETY]
            </span>
            <ul className="space-y-2 text-muted">
              <li><Link to="/safety" className="hover:text-primary transition-colors">→ Safety Architecture</Link></li>
              <li><Link to="/safety" className="hover:text-primary transition-colors">→ Simulated SOS Protocol</Link></li>
              <li><Link to="/reviews" className="hover:text-primary transition-colors">→ Verified Peer Ratings</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">→ Incident Desk</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-primary font-semibold uppercase tracking-wider block mb-3 text-xs">
              [03 // HUBS]
            </span>
            <ul className="space-y-2 text-muted">
              <li><span>→ Jaipur Junction (RJ)</span></li>
              <li><span>→ Delhi IGI Airport T3 (DL)</span></li>
              <li><span>→ Cyber Hub Gurugram (HR)</span></li>
              <li><span>→ Ajmer Sharif (RJ)</span></li>
              <li><span>→ NH 48 Expressway Corridor</span></li>
            </ul>
          </div>

          <div>
            <span className="text-primary font-semibold uppercase tracking-wider block mb-3 text-xs">
              [04 // CONTACT]
            </span>
            <div className="space-y-2 text-muted">
              <p>SUPPORT DESK: support@hopin.in</p>
              <p>TOLL-FREE DEMO: 1800-HOPIN-AI</p>
              <p>DISPATCH: 24/7 Monitored</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-muted">
          <p>© 2026 hopin mobility technologies. Handcrafted with creative code for Indian transit.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">TERMS // POLICY</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer transition-colors">PRIVACY</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer transition-colors">FAIR FARE CHARTER</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
