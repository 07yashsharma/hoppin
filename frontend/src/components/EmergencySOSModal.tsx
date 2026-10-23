import React, { useState } from 'react';
import { triggerEmergencySOSAlert } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  X 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-card rounded-2xl max-w-lg w-full border border-border shadow-elevated overflow-hidden font-mono">
        
        {/* Header */}
        <div className="bg-secondary p-5 text-primary flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-surface text-error flex items-center justify-center border border-error/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-primary">EMERGENCY SOS // DISPATCH</h3>
              <p className="text-[10px] text-muted">HOPIN RAPID TELEMETRY PROTOCOL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-elevated text-muted hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* DEMO NOTICE */}
          <div className="bg-error-surface border border-error/30 rounded-xl p-4 flex items-start gap-3 text-primary font-sans">
            <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="block font-semibold uppercase tracking-wider mb-0.5 text-error font-mono">
                [DEMO ENVIRONMENT ACTIVE]
              </strong>
              Triggering this SOS simulates a live emergency broadcast and telemetry logging in the hopin operations database. <strong>It will NOT contact real emergency services or 112 police dispatch.</strong>
            </div>
          </div>

          {!triggered ? (
            <div className="space-y-4">
              <p className="text-secondary font-sans leading-relaxed">
                In a real corridor incident, triggering SOS immediately transmits live GPS telemetry, vehicle registration, and sends SMS alerts to your emergency contacts.
              </p>

              {/* Registered Contacts on file */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted mb-2">
                  [EMERGENCY CONTACTS ON RECORD ({currentUser?.emergencyContacts?.length || 0})]
                </p>
                {currentUser?.emergencyContacts && currentUser.emergencyContacts.length > 0 ? (
                  <div className="space-y-1.5">
                    {currentUser.emergencyContacts.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-secondary border border-border flex items-center justify-between">
                        <span className="font-medium text-primary">{c.name} ({c.relationship})</span>
                        <span className="text-muted">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted bg-secondary p-2.5 rounded-xl border border-border">
                    No emergency contacts added yet. You can add them in Profile.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 font-mono">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-border text-secondary font-medium hover:bg-secondary hover:text-primary transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleTriggerSOS}
                  className="px-5 py-2.5 rounded-xl bg-error hover:bg-error/90 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle flex items-center gap-2 disabled:opacity-50"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{loading ? 'TRANSMITTING...' : 'TRIGGER SIMULATED SOS'}</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-2xl bg-success-surface text-success mx-auto flex items-center justify-center font-bold border border-success/30">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-primary">Simulated Alert Broadcasted</h4>
                <p className="text-xs text-muted font-sans mt-0.5">
                  Incident ID <strong className="text-accent font-mono">{resultData?.incidentId}</strong> logged in operations control center.
                </p>
              </div>

              <div className="bg-secondary p-4 rounded-xl border border-border text-left space-y-1.5 text-[11px] text-secondary">
                <p>• LOCATION: <strong className="text-primary">NH 48 BEHROR CORRIDOR (27.8872, 76.2825)</strong></p>
                <p>• CONTACTS NOTIFIED: <strong className="text-primary">{resultData?.contactsAlerted?.length || 2} RECIPIENTS</strong></p>
                <p>• STATUS: <strong className="text-success">ACTION LOGGED IN SAFETY DESK</strong></p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-elevated hover:bg-border text-primary font-semibold text-xs uppercase tracking-wider transition-colors border border-border"
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
