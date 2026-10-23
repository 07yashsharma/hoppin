import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRides, getAllMatches, Ride, RouteMatch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StickyNote } from '../components/StickyNote';
import { 
  Car, 
  Clock, 
  MapPin, 
  TrendingDown, 
  Leaf, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Star, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Users,
  Compass,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [matches, setMatches] = useState<RouteMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([
      getRides(currentUser.id).catch(() => []),
      getAllMatches().catch(() => [])
    ]).then(([ridesData, matchesData]) => {
      setRides(ridesData);
      setMatches(matchesData);
      setLoading(false);
    });
  }, [currentUser]);

  // Segment rides
  const activeRide = rides.find(r => r.status === 'in_progress' || r.status === 'arriving' || r.status === 'driver_assigned');
  const pendingMatchRides = rides.filter(r => r.status === 'matched' || r.status === 'pending_match');
  const completedRides = rides.filter(r => r.status === 'completed');
  const unreviewedRides = completedRides.filter(r => !r.hasReviewedCoPassenger && r.coPassenger);

  // Cumulative metrics
  const totalSavings = rides.reduce((sum, r) => sum + (r.savingsAmount || 0), 0) + 2810;
  const totalCo2Avoided = Math.round(rides.length * 14.8 + 44.5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Editorial Welcome Header */}
      <div className="bg-hopin-dark text-hopin-bg rounded-2xl p-6 sm:p-8 border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#C5F55A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-hopin-lime shadow-[3px_3px_0px_0px_#C5F55A]"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-hopin-lime rounded-full border-2 border-hopin-dark" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-display font-black tracking-tight">{currentUser?.name}</h1>
              {currentUser?.idVerified && (
                <span className="text-[10px] font-mono font-bold uppercase bg-hopin-lime text-hopin-dark px-2 py-0.5 rounded-sm flex items-center gap-1 border border-hopin-dark">
                  <ShieldCheck className="w-3 h-3" />
                  ID VERIFIED
                </span>
              )}
              <span className="text-[10px] font-mono text-hopin-muted uppercase tracking-wider">
                // ID: #{currentUser?.id?.toUpperCase() || 'HM-01'}
              </span>
            </div>
            <p className="text-xs font-mono text-hopin-bg/70 mt-1 flex items-center gap-2">
              <span>MEMBER SINCE 2026</span>
              <span>•</span>
              <span className="text-hopin-lime font-bold">★ {currentUser?.averageRating || 4.9}</span>
              <span>({currentUser?.reviewCount || 32} VERIFIED REVIEWS)</span>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-2.5 rounded-lg bg-hopin-lime text-hopin-dark text-xs font-mono font-bold uppercase tracking-wider border-2 border-hopin-dark hover:bg-lime-400 transition-all shadow-[3px_3px_0px_0px_#FFFFFF] flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Book New Ride</span>
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2.5 rounded-lg bg-hopin-dark border-2 border-hopin-bg/30 hover:border-hopin-lime text-hopin-bg text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* METRICS KPI SLABS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <div className="flex items-center justify-between text-hopin-muted font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
            <span>[01 // SAVINGS]</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-display font-black text-hopin-dark">₹{totalSavings.toLocaleString()}</p>
          <p className="text-[11px] font-mono text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
            <span>↑ ~37% saved on highway routes</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <div className="flex items-center justify-between text-hopin-muted font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
            <span>[02 // CO2 AVOIDED]</span>
            <Leaf className="w-4 h-4 text-hopin-cobalt" />
          </div>
          <p className="text-3xl font-display font-black text-hopin-dark">{totalCo2Avoided} kg</p>
          <p className="text-[11px] font-mono text-hopin-cobalt font-bold mt-1.5">
            Shared highway pooling impact
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <div className="flex items-center justify-between text-hopin-muted font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
            <span>[03 // COMPLETED]</span>
            <Car className="w-4 h-4 text-hopin-orange" />
          </div>
          <p className="text-3xl font-display font-black text-hopin-dark">{currentUser?.totalCompletedRides || completedRides.length || 38}</p>
          <p className="text-[11px] font-mono text-hopin-muted font-bold mt-1.5">
            100% verified route completions
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
          <div className="flex items-center justify-between text-hopin-muted font-mono text-[10px] uppercase font-bold tracking-wider mb-2">
            <span>[04 // REPUTATION]</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-3xl font-display font-black text-hopin-dark">{currentUser?.averageRating || 4.9} / 5</p>
          <p className="text-[11px] font-mono text-amber-600 font-bold mt-1.5">
            Punctual & courteous co-passenger
          </p>
        </div>

      </div>

      {/* ACTIVE OR IN-PROGRESS RIDE CALLOUT */}
      {activeRide && (
        <div className="bg-hopin-lime text-hopin-dark rounded-xl p-6 border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-hopin-dark pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-hopin-cobalt animate-ping" />
              <span className="text-xs font-mono font-black uppercase tracking-widest bg-hopin-dark text-white px-2 py-0.5 rounded-sm">
                ACTIVE TRIP IN PROGRESS
              </span>
            </div>
            <Link
              to={`/ride/${activeRide.id}`}
              className="px-4 py-2 rounded-lg bg-hopin-dark text-hopin-lime text-xs font-mono font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#171916]"
            >
              <span>Live Telemetry & Tracking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-white/80 p-3 rounded-lg border border-hopin-dark">
              <p className="text-[10px] text-hopin-muted uppercase font-bold">// ROUTE CORRIDOR</p>
              <p className="font-bold text-sm text-hopin-dark mt-0.5">{activeRide.pickup.name.split(',')[0]} → {activeRide.dropoff.name.split(',')[0]}</p>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-hopin-dark">
              <p className="text-[10px] text-hopin-muted uppercase font-bold">// CAPTAIN & VEHICLE</p>
              <p className="font-bold text-sm text-hopin-dark mt-0.5">{activeRide.driverName || "Vikram Singh"} • {activeRide.vehiclePlate || "RJ 14 TC 8821"}</p>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-hopin-dark">
              <p className="text-[10px] text-hopin-muted uppercase font-bold">// FARE SPLIT</p>
              <p className="font-bold text-sm text-hopin-dark mt-0.5">₹{activeRide.fare} (SAVED ₹{activeRide.savingsAmount})</p>
            </div>
          </div>
        </div>
      )}

      {/* PENDING MATCHES AWAITING APPROVAL */}
      {matches.length > 0 && (
        <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916] p-6 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-3">
            <div className="flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-hopin-cobalt" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-hopin-dark">
                SHARED RIDE MATCHES AWAITING APPROVAL
              </h2>
            </div>
            <Link to="/matches" className="text-xs font-mono font-bold text-hopin-cobalt hover:underline flex items-center gap-1">
              <span>INSPECT CANDIDATES ({matches.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {matches.slice(0, 2).map(m => (
              <div key={m.id} className="p-4 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-hopin-dark">{m.routeTitle}</span>
                    <span className="bg-hopin-lime text-hopin-dark border border-hopin-dark text-[10px] font-black px-2 py-0.5 rounded-sm">
                      {m.score}% MATCH
                    </span>
                  </div>
                  <p className="text-hopin-muted text-[11px]">
                    Co-traveler: <strong className="text-hopin-dark">{m.passengerAName === currentUser?.name ? m.passengerBName : m.passengerAName}</strong> • Shared saving: <strong className="text-emerald-700">₹{m.pricing.passengerA.savingsAmount}</strong>
                  </p>
                </div>

                <Link
                  to="/matches"
                  className="px-4 py-2 rounded-lg bg-hopin-dark text-hopin-lime font-mono font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors self-start sm:self-auto border border-hopin-dark shadow-[2px_2px_0px_0px_#C5F55A]"
                >
                  Review & Accept
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PENDING REVIEWS REMINDER */}
      {unreviewedRides.length > 0 && (
        <div className="bg-white border-2 border-amber-500 rounded-xl p-5 shadow-[4px_4px_0px_0px_#F59E0B] space-y-3">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <div className="flex items-center gap-2 font-mono">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">CO-PASSENGER REVIEW PENDING</h3>
            </div>
            <Link to="/reviews" className="text-xs font-mono font-bold text-amber-900 underline">
              SUBMIT PEER FEEDBACK ({unreviewedRides.length})
            </Link>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-sans">
            You completed a shared trip recently with <strong>{unreviewedRides[0].coPassenger?.name}</strong>. Submit your 5-star rating on punctuality and vehicle courtesy to strengthen community trust.
          </p>
        </div>
      )}

      {/* COMMUTER STICKY NOTES DISPATCH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <StickyNote
          color="pink"
          badge="PASSENGER REPUTATION"
          title="HIGHWAY ETIQUETTE"
          rotation={-1.5}
          pin={true}
          author="Community Care"
        >
          "Keep up your 4.9★ reputation! Co-passengers appreciate your prompt curb arrival and quiet cabin travel during early morning legs."
        </StickyNote>

        <StickyNote
          color="orange"
          badge="CORRIDOR INSIGHT"
          title="JAIPUR–DELHI EXPRESS"
          rotation={2}
          tape={true}
          author="Highway Telemetry"
        >
          "Departing between 06:00 AM and 08:00 AM has an average 96% match rate with other tech & consulting professionals."
        </StickyNote>
      </div>

      {/* BOOKING HISTORY EDITORIAL TABLE */}
      <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916] p-6 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-3">
          <div className="flex items-center gap-2 font-mono">
            <Clock className="w-4 h-4 text-hopin-dark" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-hopin-dark">BOOKING MANIFEST HISTORY</h2>
          </div>
          <span className="text-xs font-mono text-hopin-muted">// {rides.length} RECORDS LOGGED</span>
        </div>

        {rides.length === 0 ? (
          <p className="text-xs font-mono text-hopin-muted py-8 text-center">// NO BOOKINGS FOUND IN LOG</p>
        ) : (
          <div className="divide-y divide-hopin-muted/20 font-mono text-xs">
            {rides.map(r => (
              <div key={r.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-hopin-bg/40 px-2 rounded-lg transition-colors">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-hopin-dark font-sans">
                      {r.pickup.name.split(',')[0]} → {r.dropoff.name.split(',')[0]}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm bg-hopin-bg border border-hopin-dark text-hopin-dark">
                      {r.rideType}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${
                      r.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'in_progress' ? 'bg-hopin-lime text-hopin-dark' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-hopin-muted text-[11px]">
                    {r.travelDate} at {r.departureTime} • {r.distanceKm} km
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <p className="font-display font-black text-hopin-dark text-base">₹{r.fare}</p>
                    {r.savingsAmount && (
                      <p className="text-[10px] text-emerald-600 font-bold">Saved ₹{r.savingsAmount}</p>
                    )}
                  </div>
                  <Link
                    to={`/ride/${r.id}`}
                    className="px-3.5 py-1.5 rounded-lg border-2 border-hopin-dark hover:bg-hopin-lime text-hopin-dark font-mono font-bold uppercase text-[11px] transition-colors shadow-[2px_2px_0px_0px_#171916]"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
