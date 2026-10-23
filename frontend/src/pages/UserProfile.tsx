import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addEmergencyContact } from '../services/api';
import { 
  ShieldCheck, 
  Plus, 
  Heart,
  VolumeX,
  Wind,
  Briefcase,
  Sliders
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 bg-bg text-primary page-transition">
      
      {/* Page Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted uppercase">
          <span>// DOSSIER // SETTINGS</span>
          <span>•</span>
          <span className="text-accent font-semibold">PROFILE_ID #{currentUser?.id?.toUpperCase() || 'HM-01'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight">
          Account & Safety Preferences
        </h1>
        <p className="text-xs sm:text-sm text-secondary font-sans max-w-2xl">
          Manage your verified credentials, travel preferences, and emergency SOS dispatch protocols for shared journeys.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 sm:p-8 space-y-8">
        
        {/* Personal Details Monospace Slab */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-xl object-cover border border-border shadow-subtle"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-card" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-display font-bold text-primary">{currentUser?.name}</h2>
                {currentUser?.idVerified && (
                  <span className="text-[10px] font-mono font-semibold bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    ID VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-muted mt-1">{currentUser?.email} • {currentUser?.phone}</p>
            </div>
          </div>

          <div className="bg-secondary p-3.5 rounded-xl border border-border font-mono text-xs space-y-1">
            <p className="text-[10px] text-muted uppercase font-semibold">// COMMUNITY RATING</p>
            <p className="text-lg font-display font-bold text-primary">★ {currentUser?.averageRating || 4.9} / 5.0</p>
            <p className="text-[10px] text-success font-semibold">100% On-Time Record</p>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono">
            <Sliders className="w-4 h-4 text-accent" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
              DEFAULT RIDE PREFERENCES (APPLIED TO ALL MATCHES)
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-secondary border border-border flex items-start gap-3">
              <VolumeX className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary font-mono text-xs">Quiet Cabin Mode</p>
                <p className="text-[11px] text-muted font-sans mt-0.5">Prefers minimal cab conversation during highway travel</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary border border-border flex items-start gap-3">
              <Wind className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary font-mono text-xs">Full AC Climate</p>
                <p className="text-[11px] text-muted font-sans mt-0.5">Air conditioned cabin preferred on all legs</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary border border-border flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary font-mono text-xs">Luggage Allotment</p>
                <p className="text-[11px] text-muted font-sans mt-0.5">1 medium check-in trolley + 1 cabin laptop bag</p>
              </div>
            </div>
          </div>
        </div>

        {/* EMERGENCY CONTACTS MANAGER */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-primary flex items-center gap-2">
                <Heart className="w-4 h-4 text-error fill-error" />
                <span>EMERGENCY SOS RECIPIENTS (TELEMETRY DISPATCH)</span>
              </h3>
              <p className="text-xs text-secondary font-sans">
                These contacts receive an automated SMS broadcast containing your live GPS coordinates if you activate the Emergency SOS trigger.
              </p>
            </div>
          </div>

          {/* Existing Contacts List */}
          <div className="space-y-2">
            {currentUser?.emergencyContacts && currentUser.emergencyContacts.length > 0 ? (
              currentUser.emergencyContacts.map((contact, i) => (
                <div key={contact.id || i} className="p-3.5 rounded-xl bg-secondary border border-border flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-semibold text-primary">{contact.name}</span>
                    <span className="text-muted text-[11px] ml-2">[{contact.relationship}]</span>
                    <p className="text-secondary font-medium text-[11px] mt-0.5">{contact.phone}</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-card text-accent border border-border px-2 py-0.5 rounded">
                    ACTIVE SOS RECIPIENT
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted bg-secondary p-3 rounded-xl border border-border font-mono">
                // ALERT: No emergency contacts configured yet. Add at least one trusted recipient below.
              </p>
            )}
          </div>

          {/* Add Contact Form */}
          <form onSubmit={handleAddContact} className="p-5 rounded-xl bg-secondary border border-border space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary uppercase">
              <Plus className="w-3.5 h-3.5 text-accent" />
              <span>Register New Trusted Contact</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name (e.g. Ananya Sharma)"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-border text-xs font-mono bg-card text-primary placeholder-muted focus:border-accent focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone (e.g. +91 98290 54321)"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-border text-xs font-mono bg-card text-primary placeholder-muted focus:border-accent focus:outline-none"
              />
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-border text-xs font-mono bg-card text-primary focus:border-accent focus:outline-none"
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
              className="px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-2 disabled:opacity-50 shadow-subtle"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addingContact ? 'Registering...' : 'Save Emergency Contact'}</span>
            </button>

            {successMsg && (
              <p className="text-xs font-mono text-success font-semibold">{successMsg}</p>
            )}
          </form>

        </div>

      </div>

    </div>
  );
};
