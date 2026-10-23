import React, { useState, useEffect } from 'react';
import { 
  getDriverDashboard, 
  updateDriverTripStatus 
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Navigation, 
  Power, 
  KeyRound 
} from 'lucide-react';

export const DriverDashboard: React.FC = () => {
  const { switchUser } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getDriverDashboard();
      setData(res);
      setIsOnline(res.driver.status === 'online');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (rideId: string, status: string) => {
    try {
      const res = await updateDriverTripStatus(rideId, status);
      setActionMessage(res.message);
      await loadData();
    } catch (err: any) {
      setActionMessage(err.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-muted">
        // CONNECTING TO FLEET DISPATCH TERMINAL...
      </div>
    );
  }

  const { driver, vehicle, assignedRides } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 bg-bg text-primary page-transition">
      
      {/* Header Bar */}
      <div className="bg-card text-primary rounded-2xl p-5 sm:p-6 border border-border shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={driver?.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100'}
              alt={driver?.name}
              className="w-16 h-16 rounded-xl object-cover border border-border shadow-subtle"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${isOnline ? 'bg-emerald-400' : 'bg-rose-500'}`} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-display font-bold tracking-tight">{driver?.name}</h1>
              <span className="text-[10px] font-mono font-semibold bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                COMMERCIAL CAPTAIN
              </span>
              <span className="text-[10px] font-mono text-muted">
                // CAPTAIN_ID: #{driver?.id?.toUpperCase() || 'HM-DRV01'}
              </span>
            </div>
            <p className="text-xs font-mono text-muted mt-1">
              LICENSE: <strong className="text-accent">{driver?.driverLicense}</strong> • {driver?.commercialPermit}
            </p>
          </div>
        </div>

        {/* Online/Offline Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all border flex items-center gap-2 shadow-subtle ${
              isOnline
                ? 'bg-accent text-white border-accent hover:bg-accent-hover'
                : 'bg-secondary text-muted border-border hover:text-primary'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? 'ONLINE FOR DISPATCH' : 'OFFLINE'}</span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className="p-4 rounded-xl bg-secondary border border-accent/40 text-primary text-xs font-mono flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            <span className="font-semibold">// {actionMessage}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-accent hover:underline text-xs font-semibold uppercase"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* EARNINGS & FLEET METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
            [01 // TODAY'S PAYOUT]
          </span>
          <p className="text-3xl font-display font-bold text-primary">₹{(driver?.todayEarnings || 4250).toLocaleString()}</p>
          <p className="text-[11px] font-mono text-emerald-400 font-semibold mt-1.5">
            85% direct captain share of pooled fares
          </p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
            [02 // WALLET BALANCE]
          </span>
          <p className="text-3xl font-display font-bold text-primary">₹{(driver?.walletBalance || 18400).toLocaleString()}</p>
          <p className="text-[11px] font-mono text-muted font-medium mt-1.5">
            Instant UPI withdrawal enabled
          </p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
            [03 // CAPTAIN RATING]
          </span>
          <p className="text-3xl font-display font-bold text-primary flex items-center gap-1.5">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>{driver?.rating || 4.92}</span>
          </p>
          <p className="text-[11px] font-mono text-amber-400 font-medium mt-1.5">
            {driver?.totalTrips || 620} completed routes
          </p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
            [04 // FLEET VEHICLE]
          </span>
          <p className="text-base font-display font-bold text-primary truncate mt-1">
            {vehicle?.model || "Toyota Innova Crysta"}
          </p>
          <p className="text-xs font-mono text-accent font-semibold mt-1">
            {vehicle?.plateNumber || "RJ 14 TC 8821"} (6 SEATS)
          </p>
        </div>

      </div>

      {/* ACTIVE ASSIGNED CORRIDOR TRIPS & PASSENGER MANIFEST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 font-mono">
            <Navigation className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              ASSIGNED CORRIDOR TRIPS ({assignedRides?.length || 0})
            </h2>
          </div>
          <span className="text-xs font-mono text-muted">// DISPATCH QUEUE</span>
        </div>

        {assignedRides?.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-8 text-center text-muted font-mono text-xs">
            // No active corridor trips currently assigned. Trips appear automatically as commuters approve matches.
          </div>
        ) : (
          <div className="space-y-4">
            {assignedRides.map((ride: any) => (
              <div key={ride.id} className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-secondary border border-border text-muted">
                      {ride.journeyType} POOL
                    </span>
                    <h3 className="text-lg font-display font-bold text-primary mt-1">
                      {ride.pickup.name} → {ride.dropoff.name}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-secondary text-accent border border-border uppercase self-start sm:self-auto">
                    STATUS: {ride.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Passenger Manifest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-secondary border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={ride.passengerAvatar} alt={ride.passengerName} className="w-10 h-10 rounded-lg object-cover border border-border" />
                      <div>
                        <p className="font-semibold text-primary">{ride.passengerName}</p>
                        <p className="text-muted text-[11px]">{ride.passengerCount} seat • {ride.travelDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-muted block">VERIFICATION</span>
                      <span className="font-semibold text-accent flex items-center gap-1">
                        <KeyRound className="w-3 h-3" />
                        OTP: {ride.otp || "7824"}
                      </span>
                    </div>
                  </div>

                  {ride.coPassenger && (
                    <div className="p-3.5 rounded-xl bg-secondary border border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={ride.coPassenger.avatar} alt={ride.coPassenger.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                        <div>
                          <p className="font-semibold text-primary">{ride.coPassenger.name}</p>
                          <p className="text-muted text-[11px]">Co-passenger</p>
                        </div>
                      </div>
                      <span className="text-success font-semibold text-[11px] bg-success-surface border border-success/30 px-2 py-0.5 rounded">
                        ID VERIFIED
                      </span>
                    </div>
                  )}
                </div>

                {/* Driver Action Controls */}
                <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 font-mono">
                  <p className="text-xs text-muted font-medium">
                    NET CAPTAIN SHARE (85%): <strong className="text-primary text-base font-display">₹{Math.round((ride.fare || 2150) * 0.85)}</strong>
                  </p>

                  <div className="flex items-center gap-2">
                    {ride.status === 'driver_assigned' && (
                      <button
                        onClick={() => handleStatusUpdate(ride.id, 'arriving')}
                        className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle"
                      >
                        Arrived at Pickup Spot
                      </button>
                    )}

                    {ride.status === 'arriving' && (
                      <button
                        onClick={() => handleStatusUpdate(ride.id, 'in_progress')}
                        className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle"
                      >
                        Start Trip (Verify OTP)
                      </button>
                    )}

                    {ride.status === 'in_progress' && (
                      <button
                        onClick={() => handleStatusUpdate(ride.id, 'completed')}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle"
                      >
                        Complete Trip & Credit Wallet
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
