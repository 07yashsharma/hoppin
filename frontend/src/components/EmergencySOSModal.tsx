import React, { useState } from 'react';
import { triggerEmergencySOSAlert } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  CheckCircle, 
  X, 
  Radio
} from 'lucide-react';

interface EmergencySOSModalProps {
  rideId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ rideId, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  if (!isOpen) return null;

  const handleTriggerSOS = async () => {
    try {
      setLoading(true);
      const res = await triggerEmergencySOSAlert(rideId, {
        lat: 27.8872,
        lng: 76.2825,
        address: "NH 48 Expressway Corridor, Behror Checkpoint"
      });
      setResultData(res);
      setTriggered(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hopin-dark/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-hopin-dark shadow-2xl overflow-hidden font-mono">
        
        {/* Header */}
        <div className="bg-hopin-dark p-6 text-white flex items-center justify-between border-b border-[#2C3029]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">EMERGENCY SOS // DISPATCH</h3>
              <p className="text-[10px] text-hopin-muted-light">HOPIN RAPID TELEMETRY PROTOCOL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* DEMO NOTICE */}
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-rose-950 font-sans">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="block font-bold uppercase tracking-wider mb-0.5 text-rose-900 font-mono">
                [DEMO ENVIRONMENT ACTIVE]
              </strong>
              Triggering this SOS simulates a live emergency broadcast and telemetry logging in the hopin operations database. <strong>It will NOT contact real emergency services or 112 police dispatch.</strong>
            </div>
          </div>

          {!triggered ? (
            <div className="space-y-4">
              <p className="text-hopin-dark font-sans leading-relaxed">
                In a real corridor incident, triggering SOS immediately transmits live GPS telemetry, vehicle registration, and sends SMS alerts to your emergency contacts.
              </p>

              {/* Registered Contacts on file */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-hopin-muted mb-2">
                  [EMERGENCY CONTACTS ON RECORD ({currentUser?.emergencyContacts?.length || 0})]
                </p>
                {currentUser?.emergencyContacts && currentUser.emergencyContacts.length > 0 ? (
                  <div className="space-y-1.5">
                    {currentUser.emergencyContacts.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#FAF9F5] border border-hopin-border flex items-center justify-between">
                        <span className="font-bold text-hopin-dark">{c.name} ({c.relationship})</span>
                        <span className="text-hopin-muted">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    No emergency contacts added yet. You can add them in Profile.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 font-mono">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-hopin-border text-hopin-dark font-bold hover:bg-black/5"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleTriggerSOS}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{loading ? 'TRANSMITTING...' : 'TRIGGER SIMULATED SOS'}</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-hopin-lime text-hopin-dark mx-auto flex items-center justify-center font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-hopin-dark">Simulated Alert Broadcasted</h4>
                <p className="text-xs text-hopin-muted font-sans mt-0.5">
                  Incident ID <strong className="text-hopin-dark font-mono font-bold">{resultData?.incidentId}</strong> logged in operations control center.
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-hopin-border text-left space-y-1.5 text-[11px]">
                <p>• LOCATION: <strong>NH 48 BEHROR CORRIDOR (27.8872, 76.2825)</strong></p>
                <p>• CONTACTS NOTIFIED: <strong>{resultData?.contactsAlerted?.length || 2} RECIPIENTS</strong></p>
                <p>• STATUS: <strong>ACTION LOGGED IN SAFETY DESK</strong></p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-hopin-dark text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-all"
              >
                DISMISS
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
