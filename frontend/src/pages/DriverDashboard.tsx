import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getDriverDashboard, 
  updateDriverTripStatus 
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Car, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Star, 
  Phone, 
  User, 
  Navigation, 
  Sparkles,
  Power,
  KeyRound,
  ArrowRight
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-hopin-muted">
        // CONNECTING TO FLEET DISPATCH TERMINAL...
      </div>
    );
  }

  const { driver, vehicle, assignedRides, completedRides, availablePools } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Bar */}
      <div className="bg-hopin-dark text-hopin-bg rounded-2xl p-6 sm:p-8 border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#C5F55A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={driver?.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100'}
              alt={driver?.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-hopin-lime shadow-[3px_3px_0px_0px_#C5F55A]"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-hopin-dark ${isOnline ? 'bg-hopin-lime' : 'bg-red-500'}`} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-display font-black tracking-tight">{driver?.name}</h1>
              <span className="text-[10px] font-mono font-bold bg-hopin-lime text-hopin-dark border border-hopin-dark px-2 py-0.5 rounded-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                COMMERCIAL CAPTAIN
              </span>
              <span className="text-[10px] font-mono text-hopin-muted">
                // CAPTAIN_ID: #{driver?.id?.toUpperCase() || 'HM-DRV01'}
              </span>
            </div>
            <p className="text-xs font-mono text-hopin-bg/70 mt-1">
              LICENSE: <strong className="text-hopin-lime">{driver?.driverLicense}</strong> • {driver?.commercialPermit}
            </p>
          </div>
        </div>

        {/* Online/Offline Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all border-2 border-hopin-dark flex items-center gap-2 shadow-[3px_3px_0px_0px_#FFFFFF] ${
              isOnline
                ? 'bg-hopin-lime text-hopin-dark'
                : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? 'ONLINE FOR DISPATCH' : 'OFFLINE'}</span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className="p-4 rounded-lg bg-hopin-lime border-2 border-hopin-dark text-hopin-dark text-xs font-mono flex items-center justify-between shadow-[4px_4px_0px_0px_#171916]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-hopin-dark shrink-0" />
            <span className="font-bold">// {actionMessage}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-hopin-dark hover:underline text-xs font-bold uppercase"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* EARNINGS & FLEET METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
            [01 // TODAY'S PAYOUT]
          </span>
          <p className="text-3xl font-display font-black text-hopin-dark">₹{(driver?.todayEarnings || 4250).toLocaleString()}</p>
          <p className="text-[11px] font-mono text-emerald-600 font-bold mt-1.5">
            85% direct captain share of pooled fares
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
            [02 // WALLET BALANCE]
          </span>
          <p className="text-3xl font-display font-black text-hopin-dark">₹{(driver?.walletBalance || 18400).toLocaleString()}</p>
          <p className="text-[11px] font-mono text-hopin-muted font-bold mt-1.5">
            Instant UPI withdrawal enabled
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
            [03 // CAPTAIN RATING]
          </span>
          <p className="text-3xl font-display font-black text-hopin-dark flex items-center gap-1.5">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{driver?.rating || 4.92}</span>
          </p>
          <p className="text-[11px] font-mono text-amber-600 font-bold mt-1.5">
            {driver?.totalTrips || 620} completed routes
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
            [04 // FLEET VEHICLE]
          </span>
          <p className="text-base font-display font-black text-hopin-dark truncate mt-1">
            {vehicle?.model || "Toyota Innova Crysta"}
          </p>
          <p className="text-xs font-mono text-hopin-cobalt font-bold mt-1">
            {vehicle?.plateNumber || "RJ 14 TC 8821"} (6 SEATS)
          </p>
        </div>

      </div>

      {/* ACTIVE ASSIGNED CORRIDOR TRIPS & PASSENGER MANIFEST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-3">
          <div className="flex items-center gap-2 font-mono">
            <Navigation className="w-4 h-4 text-hopin-cobalt" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-hopin-dark">
              ASSIGNED CORRIDOR TRIPS ({assignedRides?.length || 0})
            </h2>
          </div>
          <span className="text-xs font-mono text-hopin-muted">// DISPATCH QUEUE</span>
        </div>

        {assignedRides?.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-hopin-dark p-8 text-center text-hopin-muted font-mono text-xs">
            // No active corridor trips currently assigned. Trips appear automatically as commuters approve matches.
          </div>
        ) : (
          <div className="space-y-4">
            {assignedRides.map((ride: any) => (
              <div key={ride.id} className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-hopin-dark pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-hopin-bg border border-hopin-dark text-hopin-dark">
                      {ride.journeyType} POOL
                    </span>
                    <h3 className="text-lg font-display font-black text-hopin-dark mt-1">
                      {ride.pickup.name} → {ride.dropoff.name}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-sm bg-hopin-lime text-hopin-dark border border-hopin-dark uppercase self-start sm:self-auto">
                    STATUS: {ride.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Passenger Manifest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={ride.passengerAvatar} alt={ride.passengerName} className="w-10 h-10 rounded-lg object-cover border border-hopin-dark" />
                      <div>
                        <p className="font-bold text-hopin-dark">{ride.passengerName}</p>
                        <p className="text-hopin-muted text-[11px]">{ride.passengerCount} seat • {ride.travelDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-hopin-muted block">VERIFICATION</span>
                      <span className="font-bold text-hopin-cobalt flex items-center gap-1">
                        <KeyRound className="w-3 h-3" />
                        OTP: {ride.otp || "7824"}
                      </span>
                    </div>
                  </div>

                  {ride.coPassenger && (
                    <div className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={ride.coPassenger.avatar} alt={ride.coPassenger.name} className="w-10 h-10 rounded-lg object-cover border border-hopin-dark" />
                        <div>
                          <p className="font-bold text-hopin-dark">{ride.coPassenger.name}</p>
                          <p className="text-hopin-muted text-[11px]">Co-passenger</p>
                        </div>
                      </div>
                      <span className="text-emerald-700 font-bold text-[11px] bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-sm">
                        ID VERIFIED
                      </span>
                    </div>
                  )}
                </div>

                {/* Driver Action Controls */}
                <div className="pt-3 border-t-2 border-hopin-dark flex flex-wrap items-center justify-between gap-3 font-mono">
                  <p className="text-xs text-hopin-muted font-bold">
                    NET CAPTAIN SHARE (85%): <strong className="text-hopin-dark text-base font-display">₹{Math.round((ride.fare || 2150) * 0.85)}</strong>
                  </p>

                  <div className="flex items-center gap-2">
                    {ride.status === 'driver_assigned' && (
                      <button
                        onClick={() => handleStatusUpdate(ride.id, 'arriving')}
                        className="px-4 py-2 rounded-lg bg-hopin-cobalt text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-all border border-hopin-dark shadow-[2px_2px_0px_0px_#171916]"
                      >
                        Arrived at Pickup Spot
                      </button>
                    )}

                    {ride.status === 'arriving' && (
                      <button
                        onClick={() => handleStatusUpdate(ride.id, 'in_progress')}
                        className="px-4 py-2 rounded-lg bg-hopin-lime text-hopin-dark font-bold text-xs uppercase tracking-wider hover:bg-lime-400 transition-all border-2 border-hopin-dark shadow-[2px_2px_0px_0px_#171916]"
                      >
                        Start Trip (Verify OTP)
                      </button>
                    )}

                    {ride.status === 'in_progress' && (
                      <button
                        onClick={() => handleStatusUpdate(ride.id, 'completed')}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all border border-hopin-dark shadow-[2px_2px_0px_0px_#171916]"
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
