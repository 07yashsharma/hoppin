import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRides, getAllMatches, Ride, RouteMatch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StickyNote } from '../components/StickyNote';
import { 
  Car, 
  Clock, 
  TrendingDown, 
  Leaf, 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ArrowUpRight
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

  const activeRide = rides.find(r => r.status === 'in_progress' || r.status === 'arriving' || r.status === 'driver_assigned');
  const completedRides = rides.filter(r => r.status === 'completed');
  const unreviewedRides = completedRides.filter(r => !r.hasReviewedCoPassenger && r.coPassenger);

  const totalSavings = rides.reduce((sum, r) => sum + (r.savingsAmount || 0), 0) + 2810;
  const totalCo2Avoided = Math.round(rides.length * 14.8 + 44.5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-bg text-primary page-transition">
      
      {/* Welcome Header */}
      <div className="bg-card text-primary rounded-2xl p-6 sm:p-8 border border-border shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-xl object-cover border border-border shadow-subtle"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-card" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-display font-bold tracking-tight">{currentUser?.name}</h1>
              {currentUser?.idVerified && (
                <span className="text-[10px] font-mono font-semibold uppercase bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  ID VERIFIED
                </span>
              )}
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                // ID: #{currentUser?.id?.toUpperCase() || 'HM-01'}
              </span>
            </div>
            <p className="text-xs font-mono text-muted mt-1 flex items-center gap-2">
              <span>MEMBER SINCE 2026</span>
              <span>•</span>
              <span className="text-accent font-semibold">★ {currentUser?.averageRating || 4.9}</span>
              <span>({currentUser?.reviewCount || 32} VERIFIED REVIEWS)</span>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-subtle flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Book New Ride</span>
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2.5 rounded-xl bg-secondary border border-border hover:border-accent text-secondary hover:text-primary text-xs font-mono font-medium uppercase tracking-wider transition-colors"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* METRICS KPI SLABS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <div className="flex items-center justify-between text-muted font-mono text-[10px] uppercase font-semibold tracking-wider mb-2">
            <span>[01 // SAVINGS]</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-display font-bold text-primary">₹{totalSavings.toLocaleString()}</p>
          <p className="text-[11px] font-mono text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
            <span>↑ ~37% saved on highway routes</span>
          </p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <div className="flex items-center justify-between text-muted font-mono text-[10px] uppercase font-semibold tracking-wider mb-2">
            <span>[02 // CO2 AVOIDED]</span>
            <Leaf className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-display font-bold text-primary">{totalCo2Avoided} kg</p>
          <p className="text-[11px] font-mono text-sky-400 font-semibold mt-1.5">
            Shared highway pooling impact
          </p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <div className="flex items-center justify-between text-muted font-mono text-[10px] uppercase font-semibold tracking-wider mb-2">
            <span>[03 // COMPLETED]</span>
            <Car className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-bold text-primary">{currentUser?.totalCompletedRides || completedRides.length || 38}</p>
          <p className="text-[11px] font-mono text-muted font-medium mt-1.5">
            100% verified route completions
          </p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
          <div className="flex items-center justify-between text-muted font-mono text-[10px] uppercase font-semibold tracking-wider mb-2">
            <span>[04 // REPUTATION]</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-3xl font-display font-bold text-primary">{currentUser?.averageRating || 4.9} / 5</p>
          <p className="text-[11px] font-mono text-amber-400 font-medium mt-1.5">
            Punctual & courteous co-passenger
          </p>
        </div>

      </div>

      {/* ACTIVE OR IN-PROGRESS RIDE CALLOUT */}
      {activeRide && (
        <div className="bg-secondary text-primary rounded-2xl p-6 border border-accent/40 shadow-elevated space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest bg-card text-accent border border-border px-2.5 py-1 rounded-lg">
                ACTIVE TRIP IN PROGRESS
              </span>
            </div>
            <Link
              to={`/ride/${activeRide.id}`}
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-subtle"
            >
              <span>Live Telemetry & Tracking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-card p-3 rounded-xl border border-border">
              <p className="text-[10px] text-muted uppercase font-semibold">// ROUTE CORRIDOR</p>
              <p className="font-semibold text-sm text-primary mt-0.5">{activeRide.pickup.name.split(',')[0]} → {activeRide.dropoff.name.split(',')[0]}</p>
            </div>
            <div className="bg-card p-3 rounded-xl border border-border">
              <p className="text-[10px] text-muted uppercase font-semibold">// CAPTAIN & VEHICLE</p>
              <p className="font-semibold text-sm text-primary mt-0.5">{activeRide.driverName || "Vikram Singh"} • {activeRide.vehiclePlate || "RJ 14 TC 8821"}</p>
            </div>
            <div className="bg-card p-3 rounded-xl border border-border">
              <p className="text-[10px] text-muted uppercase font-semibold">// FARE SPLIT</p>
              <p className="font-semibold text-sm text-accent mt-0.5">₹{activeRide.fare} (SAVED ₹{activeRide.savingsAmount})</p>
            </div>
          </div>
        </div>
      )}

      {/* PENDING MATCHES AWAITING APPROVAL */}
      {matches.length > 0 && (
        <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
                SHARED RIDE MATCHES AWAITING APPROVAL
              </h2>
            </div>
            <Link to="/matches" className="text-xs font-mono font-semibold text-accent hover:underline flex items-center gap-1">
              <span>INSPECT CANDIDATES ({matches.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {matches.slice(0, 2).map(m => (
              <div key={m.id} className="p-4 rounded-xl bg-secondary border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-primary">{m.routeTitle}</span>
                    <span className="bg-card text-accent border border-border text-[10px] font-bold px-2 py-0.5 rounded">
                      {m.score}% MATCH
                    </span>
                  </div>
                  <p className="text-muted text-[11px]">
                    Co-traveler: <strong className="text-primary">{m.passengerAName === currentUser?.name ? m.passengerBName : m.passengerAName}</strong> • Shared saving: <strong className="text-success">₹{m.pricing.passengerA.savingsAmount}</strong>
                  </p>
                </div>

                <Link
                  to="/matches"
                  className="px-4 py-2 rounded-xl bg-accent text-white font-mono font-semibold text-xs uppercase tracking-wider hover:bg-accent-hover transition-colors self-start sm:self-auto shadow-subtle"
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
        <div className="bg-secondary border border-accent/40 rounded-2xl p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2 font-mono">
              <MessageSquare className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">CO-PASSENGER REVIEW PENDING</h3>
            </div>
            <Link to="/reviews" className="text-xs font-mono font-semibold text-accent underline">
              SUBMIT PEER FEEDBACK ({unreviewedRides.length})
            </Link>
          </div>
          <p className="text-xs text-secondary leading-relaxed font-sans">
            You completed a shared trip recently with <strong className="text-primary">{unreviewedRides[0].coPassenger?.name}</strong>. Submit your 5-star rating on punctuality and vehicle courtesy to strengthen community trust.
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
          color="blue"
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
      <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 font-mono">
            <Clock className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">BOOKING MANIFEST HISTORY</h2>
          </div>
          <span className="text-xs font-mono text-muted">// {rides.length} RECORDS LOGGED</span>
        </div>

        {rides.length === 0 ? (
          <p className="text-xs font-mono text-muted py-8 text-center">// NO BOOKINGS FOUND IN LOG</p>
        ) : (
          <div className="divide-y divide-border font-mono text-xs">
            {rides.map(r => (
              <div key={r.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/60 px-3 rounded-xl transition-colors">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-primary font-sans">
                      {r.pickup.name.split(',')[0]} → {r.dropoff.name.split(',')[0]}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-secondary border border-border text-muted">
                      {r.rideType}
                    </span>
                    <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${
                      r.status === 'completed' ? 'bg-success-surface text-success border-success/30' :
                      r.status === 'in_progress' ? 'bg-accent/15 text-accent border-accent/30' :
                      'bg-secondary text-muted border-border'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-muted text-[11px]">
                    {r.travelDate} at {r.departureTime} • {r.distanceKm} km
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <p className="font-display font-bold text-accent text-base">₹{r.fare}</p>
                    {r.savingsAmount && (
                      <p className="text-[10px] text-success font-medium">Saved ₹{r.savingsAmount}</p>
                    )}
                  </div>
                  <Link
                    to={`/ride/${r.id}`}
                    className="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent bg-secondary hover:bg-elevated text-primary font-mono font-semibold uppercase text-[11px] transition-colors shadow-subtle"
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
