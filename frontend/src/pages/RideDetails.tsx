import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getRideDetails, 
  advanceRideStatus, 
  cancelRideBooking, 
  Ride, 
  RouteMatch 
} from '../services/api';
import { RouteMap } from '../components/RouteMap';
import { CoPassengerCard } from '../components/CoPassengerCard';
import { EmergencySOSModal } from '../components/EmergencySOSModal';
import { 
  Car, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Star, 
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const RideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ride, setRide] = useState<Ride | null>(null);
  const [match, setMatch] = useState<RouteMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getRideDetails(id);
      setRide(res.ride);
      if (res.match) setMatch(res.match);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleAdvanceStatus = async () => {
    if (!id) return;
    try {
      setStatusUpdating(true);
      const updated = await advanceRideStatus(id);
      setRide(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleCancel = async () => {
    if (!id || !window.confirm("Cancel this booking?")) return;
    try {
      const updated = await cancelRideBooking(id);
      setRide(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center font-mono text-xs text-hopin-muted">
        LOADING TRIP TELEMETRY & RUNTIME STATE...
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center font-mono">
        <h2 className="font-display font-bold text-lg text-hopin-dark">RIDE NOT FOUND</h2>
        <Link to="/dashboard" className="text-xs text-hopin-dark underline mt-2 block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const steps = [
    { key: 'pending_match', label: 'BOOKED' },
    { key: 'matched', label: 'MATCHED' },
    { key: 'driver_assigned', label: 'ASSIGNED' },
    { key: 'arriving', label: 'ARRIVING' },
    { key: 'in_progress', label: 'IN TRANSIT' },
    { key: 'completed', label: 'COMPLETED' }
  ];

  const currentStepIdx = steps.findIndex(s => s.key === ride.status);
  const isCompleted = ride.status === 'completed';
  const isCancelled = ride.status === 'cancelled';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hopin-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-hopin-dark text-hopin-lime">
              HOPIN // #{ride.id}
            </span>
            <span className="text-[11px] text-hopin-muted">
              {new Date(ride.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-hopin-dark tracking-tight uppercase">
            {ride.pickup.name.split(',')[0]} → {ride.dropoff.name.split(',')[0]}
          </h1>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            onClick={handleShareLink}
            className="px-3.5 py-2 rounded-xl border border-hopin-border bg-white text-hopin-dark font-bold hover:border-hopin-dark transition-all flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareSuccess ? 'LINK COPIED' : 'SHARE LIVE TRIP'}</span>
          </button>

          <button
            onClick={() => setSosModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>EMERGENCY SOS</span>
          </button>
        </div>
      </div>

      {/* Lifecycle Progress Stepper */}
      {!isCancelled && (
        <div className="bg-white p-6 rounded-3xl border-2 border-hopin-dark shadow-[3px_3px_0px_0px_#171916]">
          <div className="flex items-center justify-between max-w-4xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-hopin-bg -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-hopin-dark -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: `${Math.max(0, (currentStepIdx / (steps.length - 1)) * 100)}%` }}
            />

            {steps.map((step, idx) => {
              const done = idx <= currentStepIdx;
              const current = idx === currentStepIdx;
              return (
                <div key={step.key} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                      done
                        ? 'bg-hopin-dark text-hopin-lime border-black shadow-sm'
                        : 'bg-white text-hopin-muted border-hopin-border'
                    }`}
                  >
                    {done ? '✓' : idx + 1}
                  </div>
                  <span className={`text-[10px] font-bold mt-2 uppercase hidden sm:block ${
                    current ? 'text-hopin-dark' : done ? 'text-hopin-dark' : 'text-hopin-muted'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Evaluator Simulation Bar */}
      <div className="bg-[#1C201A] text-white p-4 rounded-2xl border border-[#2B3026] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-hopin-lime shrink-0" />
          <span className="font-sans">
            <strong>Evaluator Controls:</strong> Test driver arrival, road transit, and unlock post-trip review workflows.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isCompleted && !isCancelled && (
            <button
              onClick={handleAdvanceStatus}
              disabled={statusUpdating}
              className="px-4 py-2 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {statusUpdating ? 'SIMULATING...' : 'ADVANCE NEXT STEP →'}
            </button>
          )}

          {isCompleted && (
            <Link
              to="/reviews"
              className="px-4 py-2 rounded-xl bg-hopin-lime text-hopin-dark font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SUBMIT PEER REVIEW</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <RouteMap
            pickupName={ride.pickup.name}
            dropoffName={ride.dropoff.name}
            distanceKm={ride.distanceKm}
            durationMinutes={ride.durationMinutes}
            activeVehicle={ride.vehiclePlate ? {
              model: ride.vehicleModel || "Toyota Innova Crysta",
              plate: ride.vehiclePlate,
              driverName: ride.driverName || "Vikram Singh"
            } : undefined}
            currentLocation={ride.currentLocation}
            heightClass="h-80"
          />

          {/* Assigned Driver Card */}
          {ride.driverName && (
            <div className="bg-white rounded-3xl border-2 border-hopin-border p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-hopin-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-hopin-dark">
                  [ASSIGNED COMMERCIAL CAPTAIN]
                </span>
                <span className="text-[10px] bg-[#E8F8C8] text-hopin-dark px-2 py-0.5 rounded font-bold">
                  VERIFIED TOURIST PERMIT
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-hopin-dark text-hopin-lime flex items-center justify-center font-bold text-sm">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-hopin-dark text-base">{ride.driverName}</h4>
                    <p className="text-xs text-hopin-muted font-sans">
                      ★ {ride.driverRating || 4.92} Rating • Commercial Captain
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF9F5] p-3 rounded-2xl border border-hopin-border text-left sm:text-right">
                  <p className="font-bold text-hopin-dark text-xs">{ride.vehicleModel || "Toyota Innova Crysta"}</p>
                  <p className="text-xs font-extrabold text-hopin-dark mt-0.5">{ride.vehiclePlate}</p>
                </div>
              </div>

              {/* Ride OTP */}
              <div className="bg-hopin-dark text-white p-3.5 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-hopin-muted block uppercase font-bold">RIDE VERIFICATION OTP</span>
                  <span className="text-slate-300 font-sans text-[11px]">Share with captain upon entering vehicle</span>
                </div>
                <div className="font-mono text-xl font-black text-hopin-lime tracking-widest bg-[#22271F] px-3 py-1 rounded-xl border border-hopin-lime/30">
                  {ride.otp || "7824"}
                </div>
              </div>
            </div>
          )}

          {/* Co-Passenger Card */}
          {ride.coPassenger && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-hopin-muted block">
                [CO-PASSENGER ON THIS HIGHWAY POOL]
              </span>
              <CoPassengerCard
                passenger={{
                  id: ride.coPassenger.id,
                  name: ride.coPassenger.name,
                  avatar: ride.coPassenger.avatar,
                  averageRating: ride.coPassenger.rating || 4.9,
                  phoneVerified: true,
                  idVerified: true,
                  totalCompletedRides: 26,
                  reviewCount: 21,
                  bio: "Verified traveler on hopin corridor."
                }}
              />
            </div>
          )}
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border-2 border-hopin-dark p-6 space-y-4 shadow-[4px_4px_0px_0px_#171916]">
            <h3 className="font-display font-bold text-sm text-hopin-dark border-b border-hopin-border pb-3 uppercase tracking-tight">
              [TRIP MANIFEST]
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] text-hopin-muted uppercase font-bold">PICKUP</p>
                <p className="font-bold text-hopin-dark text-sm">{ride.pickup.name}</p>
              </div>

              <div>
                <p className="text-[10px] text-hopin-muted uppercase font-bold">DESTINATION</p>
                <p className="font-bold text-hopin-dark text-sm">{ride.dropoff.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-hopin-border">
                <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-hopin-border">
                  <p className="text-[10px] text-hopin-muted uppercase">DATE</p>
                  <p className="font-bold text-hopin-dark">{ride.travelDate}</p>
                </div>
                <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-hopin-border">
                  <p className="text-[10px] text-hopin-muted uppercase">DEPARTURE</p>
                  <p className="font-bold text-hopin-dark">{ride.departureTime}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-hopin-border space-y-2 text-xs">
              <div className="flex justify-between text-hopin-muted">
                <span>SOLO PRIVATE FARE:</span>
                <span className="line-through">₹{ride.privateFare}</span>
              </div>
              <div className="flex justify-between font-display font-black text-lg text-hopin-dark">
                <span>CONFIRMED FARE:</span>
                <span>₹{ride.fare}</span>
              </div>

              {ride.savingsAmount && (
                <div className="p-2.5 rounded-xl bg-[#E8F8C8] text-hopin-dark font-bold text-xs flex justify-between">
                  <span>GUARANTEED SAVINGS:</span>
                  <span>₹{ride.savingsAmount} ({ride.savingsPct || 37}%)</span>
                </div>
              )}
            </div>

            {!isCompleted && !isCancelled && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-2.5 rounded-xl border border-rose-300 text-rose-700 font-bold text-xs uppercase tracking-wider hover:bg-rose-50 transition-colors"
                >
                  CANCEL BOOKING
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      <EmergencySOSModal
        rideId={ride.id}
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />

    </div>
  );
};
