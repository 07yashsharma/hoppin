import React, { useState } from 'react';
import { EmergencySOSModal } from '../components/EmergencySOSModal';
import { 
  ShieldCheck, 
  AlertTriangle, 
  UserCheck, 
  Radio, 
  FileText,
  ShieldAlert
} from 'lucide-react';

export const Safety: React.FC = () => {
  const [sosModalOpen, setSosModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-bg text-primary page-transition">
      
      {/* Hero Header */}
      <div className="border-b border-border pb-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted uppercase">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>// PROTOCOL: TRUST & VERIFICATION</span>
          <span>•</span>
          <span className="text-accent bg-card px-2 py-0.5 rounded border border-border font-semibold">ZERO COMPROMISE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary tracking-tight max-w-3xl">
          Safety Engineered into Every Kilometer.
        </h1>
        <p className="text-xs sm:text-sm text-secondary font-sans leading-relaxed max-w-2xl">
          From mandatory identity verification to real-time highway corridor telemetry and rapid emergency dispatch, our multi-layered safety architecture protects every shared journey across India.
        </p>

        {/* Test Emergency SOS modal launcher */}
        <div className="pt-2">
          <button
            onClick={() => setSosModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-error hover:bg-error/90 text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-subtle"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Launch Simulated Emergency SOS Test</span>
          </button>
        </div>
      </div>

      {/* CORE SAFETY PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-card p-6 rounded-2xl border border-border shadow-elevated space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center font-bold text-accent">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-semibold text-muted">// 01 ID PROOF</span>
          </div>
          <h3 className="text-base font-display font-bold text-primary">100% Verified Travelers</h3>
          <p className="text-xs text-secondary font-sans leading-relaxed">
            All passengers authenticate their phone numbers and emails. Government ID (Aadhaar / Passport) and corporate domain verification unlocks verified trust badges on traveler dossiers.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-elevated space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center font-bold text-sky-400">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-semibold text-muted">// 02 TELEMETRY</span>
          </div>
          <h3 className="text-base font-display font-bold text-primary">Live GPS & Shareable Link</h3>
          <p className="text-xs text-secondary font-sans leading-relaxed">
            Generate an encrypted shareable live tracking link for friends and family. Your route, driver details, vehicle plate, and current highway waypoint are visible in real-time.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-elevated space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center font-bold text-error">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-semibold text-muted">// 03 RAPID SOS</span>
          </div>
          <h3 className="text-base font-display font-bold text-primary">Rapid Emergency SOS</h3>
          <p className="text-xs text-secondary font-sans leading-relaxed">
            One-touch emergency interface alerts registered emergency contacts with your live GPS location. Dedicated highway response desks monitor inter-city routes 24/7.
          </p>
        </div>

      </div>

      {/* DETAILED GUIDELINES EDITORIAL SECTION */}
      <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 font-mono">
            <FileText className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              COMMUNITY SAFETY CHARTER & POLICIES
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">// STANDARD v2.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-display font-bold text-primary text-base">Ride-Sharing Etiquette</h4>
            <ul className="space-y-2 font-sans text-secondary">
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-accent shrink-0">→</span>
                <span><strong className="text-primary">5-Minute Boarding Rule:</strong> Be ready at your designated pickup spot 5 minutes before scheduled departure.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-accent shrink-0">→</span>
                <span><strong className="text-primary">Quiet Cabin Respect:</strong> Respect fellow travelers' preference for quiet time during long highway transit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-accent shrink-0">→</span>
                <span><strong className="text-primary">OTP Verification:</strong> Always verify vehicle license plate and exchange the secure 4-digit OTP before boarding.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-primary text-base">Zero Tolerance Enforcement</h4>
            <ul className="space-y-2 font-sans text-secondary">
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-error shrink-0">✕</span>
                <span><strong className="text-primary">Discrimination:</strong> Any abusive or discriminatory behavior leads to immediate permanent account deactivation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-error shrink-0">✕</span>
                <span><strong className="text-primary">Block Rights:</strong> Passengers have the unconditional right to block any user from future route matching.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-error shrink-0">✕</span>
                <span><strong className="text-primary">Commercial Clearance:</strong> All drivers carry verified commercial tourist permits and background clearance.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />

    </div>
  );
};
