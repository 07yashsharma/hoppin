import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmergencySOSModal } from '../components/EmergencySOSModal';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Lock, 
  UserCheck, 
  Eye, 
  Ban, 
  FileText,
  Radio,
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const Safety: React.FC = () => {
  const [sosModalOpen, setSosModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="border-b-2 border-hopin-dark pb-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-hopin-muted uppercase">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>// PROTOCOL: TRUST & VERIFICATION</span>
          <span>•</span>
          <span className="text-hopin-lime bg-hopin-dark px-1.5 py-0.5 rounded-sm font-bold">ZERO COMPROMISE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-black text-hopin-dark tracking-tight max-w-3xl">
          Safety Engineered into Every Kilometer.
        </h1>
        <p className="text-xs sm:text-sm text-hopin-muted font-sans leading-relaxed max-w-2xl">
          From mandatory identity verification to real-time highway corridor telemetry and rapid emergency dispatch, our multi-layered safety architecture protects every shared journey across India.
        </p>

        {/* Test Emergency SOS modal launcher */}
        <div className="pt-2">
          <button
            onClick={() => setSosModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]"
          >
            <ShieldAlert className="w-4 h-4 text-hopin-lime" />
            <span>Launch Simulated Emergency SOS Test</span>
          </button>
        </div>
      </div>

      {/* CORE SAFETY PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-center font-bold text-hopin-cobalt">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-hopin-muted">// 01 ID PROOF</span>
          </div>
          <h3 className="text-base font-display font-black text-hopin-dark">100% Verified Travelers</h3>
          <p className="text-xs text-hopin-dark/80 font-sans leading-relaxed">
            All passengers authenticate their phone numbers and emails. Government ID (Aadhaar / Passport) and corporate domain verification unlocks verified trust badges on traveler dossiers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-center font-bold text-emerald-600">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-hopin-muted">// 02 TELEMETRY</span>
          </div>
          <h3 className="text-base font-display font-black text-hopin-dark">Live GPS & Shareable Link</h3>
          <p className="text-xs text-hopin-dark/80 font-sans leading-relaxed">
            Generate an encrypted shareable live tracking link for friends and family. Your route, driver details, vehicle plate, and current highway waypoint are visible in real-time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-center font-bold text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-hopin-muted">// 03 RAPID SOS</span>
          </div>
          <h3 className="text-base font-display font-black text-hopin-dark">Rapid Emergency SOS</h3>
          <p className="text-xs text-hopin-dark/80 font-sans leading-relaxed">
            One-touch emergency interface alerts registered emergency contacts with your live GPS location. Dedicated highway response desks monitor inter-city routes 24/7.
          </p>
        </div>

      </div>

      {/* DETAILED GUIDELINES EDITORIAL SECTION */}
      <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-4">
          <div className="flex items-center gap-2 font-mono">
            <FileText className="w-4 h-4 text-hopin-cobalt" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-hopin-dark">
              COMMUNITY SAFETY CHARTER & POLICIES
            </h2>
          </div>
          <span className="text-xs font-mono text-hopin-muted">// STANDARD v2.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-display font-black text-hopin-dark text-base">Ride-Sharing Etiquette</h4>
            <ul className="space-y-2 font-sans text-hopin-dark">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-hopin-cobalt shrink-0">→</span>
                <span><strong>5-Minute Boarding Rule:</strong> Be ready at your designated pickup spot 5 minutes before scheduled departure.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-hopin-cobalt shrink-0">→</span>
                <span><strong>Quiet Cabin Respect:</strong> Respect fellow travelers' preference for quiet time during long highway transit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-hopin-cobalt shrink-0">→</span>
                <span><strong>OTP Verification:</strong> Always verify vehicle license plate and exchange the secure 4-digit OTP before boarding.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-black text-hopin-dark text-base">Zero Tolerance Enforcement</h4>
            <ul className="space-y-2 font-sans text-hopin-dark">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-red-600 shrink-0">✕</span>
                <span><strong>Discrimination:</strong> Any abusive or discriminatory behavior leads to immediate permanent account deactivation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-red-600 shrink-0">✕</span>
                <span><strong>Block Rights:</strong> Passengers have the unconditional right to block any user from future route matching.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-red-600 shrink-0">✕</span>
                <span><strong>Commercial Clearance:</strong> All drivers carry verified commercial tourist permits and background clearance.</span>
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
