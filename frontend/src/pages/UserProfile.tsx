import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addEmergencyContact } from '../services/api';
import { 
  User, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Heart,
  VolumeX,
  Wind,
  Briefcase,
  Sliders,
  Sparkles
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { currentUser, refreshUser } = useAuth();

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [addingContact, setAddingContact] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    try {
      setAddingContact(true);
      await addEmergencyContact({
        name: contactName,
        phone: contactPhone,
        relationship
      });
      await refreshUser();
      setContactName('');
      setContactPhone('');
      setSuccessMsg('Emergency contact added securely to telemetry SOS protocol.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setAddingContact(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2 border-b-2 border-hopin-dark pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-hopin-muted uppercase">
          <span>// DOSSIER // SETTINGS</span>
          <span>•</span>
          <span className="text-hopin-cobalt font-bold">PROFILE_ID #{currentUser?.id?.toUpperCase() || 'HM-01'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-hopin-dark tracking-tight">
          Account & Safety Preferences
        </h1>
        <p className="text-xs sm:text-sm text-hopin-muted font-sans max-w-2xl">
          Manage your verified credentials, travel preferences, and emergency SOS dispatch protocols for shared journeys.
        </p>
      </div>

      <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 space-y-8">
        
        {/* Personal Details Monospace Slab */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-hopin-dark pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-hopin-dark shadow-[3px_3px_0px_0px_#171916]"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-hopin-lime rounded-full border-2 border-hopin-dark" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-display font-black text-hopin-dark">{currentUser?.name}</h2>
                {currentUser?.idVerified && (
                  <span className="text-[10px] font-mono font-bold bg-hopin-lime text-hopin-dark px-2 py-0.5 rounded-sm border border-hopin-dark flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    ID VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-hopin-muted mt-1">{currentUser?.email} • {currentUser?.phone}</p>
            </div>
          </div>

          <div className="bg-hopin-bg p-3 rounded-lg border-2 border-hopin-dark font-mono text-xs space-y-1">
            <p className="text-[10px] text-hopin-muted uppercase font-bold">// COMMUNITY RATING</p>
            <p className="text-lg font-display font-black text-hopin-dark">★ {currentUser?.averageRating || 4.9} / 5.0</p>
            <p className="text-[10px] text-emerald-700 font-bold">100% On-Time Record</p>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono">
            <Sliders className="w-4 h-4 text-hopin-dark" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-hopin-dark">
              DEFAULT RIDE PREFERENCES (APPLIED TO ALL MATCHES)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-start gap-3">
              <VolumeX className="w-5 h-5 text-hopin-cobalt shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-hopin-dark font-mono text-xs">Quiet Cabin Mode</p>
                <p className="text-[11px] text-hopin-muted font-sans mt-0.5">Prefers minimal cab conversation during highway travel</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-start gap-3">
              <Wind className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-hopin-dark font-mono text-xs">Full AC Climate</p>
                <p className="text-[11px] text-hopin-muted font-sans mt-0.5">Air conditioned cabin preferred on all legs</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-hopin-orange shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-hopin-dark font-mono text-xs">Luggage Allotment</p>
                <p className="text-[11px] text-hopin-muted font-sans mt-0.5">1 medium check-in trolley + 1 cabin laptop bag</p>
              </div>
            </div>
          </div>
        </div>

        {/* EMERGENCY CONTACTS MANAGER */}
        <div className="pt-6 border-t-2 border-hopin-dark space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-hopin-dark flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>EMERGENCY SOS RECIPIENTS (TELEMETRY DISPATCH)</span>
              </h3>
              <p className="text-xs text-hopin-muted font-sans">
                These contacts receive an automated SMS broadcast containing your live GPS coordinates if you activate the Emergency SOS trigger.
              </p>
            </div>
          </div>

          {/* Existing Contacts List */}
          <div className="space-y-2">
            {currentUser?.emergencyContacts && currentUser.emergencyContacts.length > 0 ? (
              currentUser.emergencyContacts.map((contact, i) => (
                <div key={contact.id || i} className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-bold text-hopin-dark">{contact.name}</span>
                    <span className="text-hopin-muted text-[11px] ml-2">[{contact.relationship}]</span>
                    <p className="text-hopin-dark font-bold text-[11px] mt-0.5">{contact.phone}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-hopin-lime text-hopin-dark border border-hopin-dark px-2 py-0.5 rounded-sm">
                    ACTIVE SOS RECIPIENT
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border-2 border-amber-400 font-mono">
                // ALERT: No emergency contacts configured yet. Add at least one trusted recipient below.
              </p>
            )}
          </div>

          {/* Add Contact Form */}
          <form onSubmit={handleAddContact} className="p-5 rounded-lg bg-hopin-bg border-2 border-hopin-dark space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-hopin-dark uppercase">
              <Plus className="w-3.5 h-3.5 text-hopin-dark" />
              <span>Register New Trusted Contact</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name (e.g. Ananya Sharma)"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="px-3 py-2.5 rounded-lg border-2 border-hopin-dark text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
              />
              <input
                type="tel"
                placeholder="Phone (e.g. +91 98290 54321)"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="px-3 py-2.5 rounded-lg border-2 border-hopin-dark text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
              />
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="px-3 py-2.5 rounded-lg border-2 border-hopin-dark text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-hopin-lime"
              >
                <option value="Family">Family / Parent</option>
                <option value="Spouse">Spouse / Partner</option>
                <option value="Friend">Friend / Colleague</option>
                <option value="Sibling">Sibling</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={addingContact}
              className="px-5 py-2.5 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 disabled:opacity-50 border border-hopin-dark shadow-[3px_3px_0px_0px_#C5F55A]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addingContact ? 'Registering...' : 'Save Emergency Contact'}</span>
            </button>

            {successMsg && (
              <p className="text-xs font-mono text-emerald-700 font-bold">{successMsg}</p>
            )}
          </form>

        </div>

      </div>

    </div>
  );
};
