import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getAllMatches, 
  acceptProposedMatch, 
  declineProposedMatch, 
  RouteMatch 
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CoPassengerCard } from '../components/CoPassengerCard';
import { 
  ArrowRight, 
  CheckCircle2, 
  Car 
} from 'lucide-react';

export const Matches: React.FC = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<RouteMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await getAllMatches();
      setMatches(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const handleAccept = async (matchId: string) => {
    try {
      const res = await acceptProposedMatch(matchId);
      setActionMessage(res.message);
      await loadMatches();
    } catch (err: any) {
      setActionMessage(err.message);
    }
  };

  const handleDecline = async (matchId: string) => {
    try {
      const res = await declineProposedMatch(matchId);
      setActionMessage(res.message);
      await loadMatches();
    } catch (err: any) {
      setActionMessage(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 font-mono bg-bg text-primary page-transition">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-3">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-muted font-semibold block mb-1">
            [AI ROUTE MATCHING // CANDIDATE MATRIX]
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight uppercase">
            Active Route Matches
          </h1>
          <p className="font-sans text-xs sm:text-sm text-secondary mt-1">
            Spatial vector comparison evaluating origin-destination heading, highway corridors, and detour tolerances.
          </p>
        </div>

        <Link
          to="/book"
          className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-colors shadow-subtle"
        >
          <Car className="w-4 h-4" />
          <span>New Corridor Request</span>
        </Link>
      </div>

      {/* Action Notification */}
      {actionMessage && (
        <div className="p-4 rounded-xl bg-secondary border border-accent/40 text-primary text-xs flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            <span className="font-semibold">{actionMessage}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-accent font-semibold hover:underline"
          >
            [DISMISS]
          </button>
        </div>
      )}

      {/* Matches List */}
      {loading ? (
        <div className="p-16 text-center text-xs text-muted">
          ANALYZING ACTIVE HIGHWAY CORRIDORS...
        </div>
      ) : matches.length === 0 ? (
        <div className="p-16 text-center bg-card rounded-2xl border border-border shadow-subtle space-y-3">
          <Car className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-display font-bold text-base text-primary">No active matches found</h3>
          <p className="font-sans text-xs text-muted max-w-sm mx-auto">
            Book a shared ride to let our route-matching engine discover compatible co-passengers.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {matches.map(match => {
            const isConfirmed = match.status === 'confirmed';
            const coPassengerName = currentUser?.id === match.passengerAId ? match.passengerBName : match.passengerAName;
            const coPassengerAvatar = currentUser?.id === match.passengerAId ? match.passengerBAvatar : match.passengerAAvatar;
            const coPassengerId = currentUser?.id === match.passengerAId ? match.passengerBId : match.passengerAId;
            const myPricing = currentUser?.id === match.passengerAId ? match.pricing.passengerA : match.pricing.passengerB;

            return (
              <div
                key={match.id}
                className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden"
              >
                {/* Match Header */}
                <div className="bg-secondary p-6 text-primary flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-card text-accent border border-border">
                        {match.journeyType} CORRIDOR
                      </span>
                      {isConfirmed ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-success-surface text-success border border-success/30">
                          VEHICLE DISPATCHED
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-elevated text-secondary border border-border">
                          PENDING PASSENGER CONFIRMATION
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-primary tracking-tight">
                      {match.routeTitle}
                    </h3>
                  </div>

                  {/* Compatibility Score Badge */}
                  <div className="bg-card px-4 py-2.5 rounded-xl border border-border flex items-center gap-3 shadow-subtle">
                    <span className="font-display font-bold text-2xl text-accent">
                      {match.score}%
                    </span>
                    <div className="text-[10px] text-muted">
                      <p className="font-semibold text-primary uppercase">Compatibility</p>
                      <p>Spatial & Temporal</p>
                    </div>
                  </div>
                </div>

                {/* Match Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matched Co-Passenger */}
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted block mb-2">
                        [01 // MATCHED CO-PASSENGER]
                      </span>
                      <CoPassengerCard
                        passenger={{
                          id: coPassengerId,
                          name: coPassengerName,
                          avatar: coPassengerAvatar,
                          phoneVerified: true,
                          emailVerified: true,
                          idVerified: true,
                          averageRating: 4.9,
                          totalCompletedRides: 28,
                          reviewCount: 22,
                          bio: "Verified traveler on hopin. Respects punctuality and vehicle etiquette."
                        }}
                      />
                    </div>

                    {/* Fare Allocation */}
                    <div className="bg-secondary p-6 rounded-2xl border border-border flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-muted block mb-3">
                          [02 // FARE RECONCILIATION]
                        </span>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-muted">
                            <span>SOLO PRIVATE FARE:</span>
                            <span className="line-through">₹{myPricing.privateFare}</span>
                          </div>
                          <div className="flex justify-between font-display font-bold text-base text-primary">
                            <span>HOPIN SHARED FARE:</span>
                            <span className="text-accent">₹{myPricing.sharedFare}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-primary text-xs pt-1 border-t border-border">
                            <span>GUARANTEED SAVINGS:</span>
                            <span className="bg-card px-2 py-0.5 rounded text-success border border-border">
                              SAVED ₹{myPricing.savingsAmount} ({myPricing.savingsPercentage}%)
                            </span>
                          </div>
                          <div className="flex justify-between text-muted text-[11px] pt-1">
                            <span>ADDITIONAL DETOUR:</span>
                            <span className="font-semibold text-primary">+{myPricing.detourMinutes} MINS</span>
                          </div>
                        </div>
                      </div>

                      {/* Acceptance Flags */}
                      <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-muted">{match.passengerAName}: </span>
                          <strong className={match.acceptedByA ? 'text-success' : 'text-muted'}>
                            {match.acceptedByA ? '[ACCEPTED]' : '[PENDING]'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-muted">{match.passengerBName}: </span>
                          <strong className={match.acceptedByB ? 'text-success' : 'text-muted'}>
                            {match.acceptedByB ? '[ACCEPTED]' : '[PENDING]'}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explainable Rationale */}
                  <div className="bg-secondary p-5 rounded-xl border border-border space-y-2 text-xs">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block">
                      // ALGORITHM EXPLANATION & REASONING
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-secondary font-sans text-xs">
                      {match.reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Waypoints sequence */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted block mb-2">
                      [03 // OPTIMIZED WAYPOINTS MANIFEST]
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {match.waypoints.map((wp, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-secondary border border-border">
                          <div className="flex items-center justify-between text-[10px] mb-1 font-semibold">
                            <span className="text-accent">STOP {wp.order} • {wp.time}</span>
                            <span className="uppercase text-muted">{wp.type}</span>
                          </div>
                          <p className="font-semibold text-primary truncate">{wp.locationName}</p>
                          <p className="text-[10px] text-muted font-sans">{wp.passenger}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    {isConfirmed ? (
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="font-semibold text-xs text-success bg-success-surface px-3 py-1.5 rounded-xl border border-success/30">
                          VEHICLE DISPATCHED • TOYOTA INNOVA CRYSTA
                        </span>
                        <Link
                          to={`/ride/${match.rideAId}`}
                          className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-subtle"
                        >
                          <span>TRACK TRIP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ) : (
                      <>
                        <p className="text-[11px] text-muted font-sans">
                          Both commuters must approve before the driver is dispatched to your pickup spot.
                        </p>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleDecline(match.id)}
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-border text-secondary font-semibold text-xs uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors"
                          >
                            DECLINE
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAccept(match.id)}
                            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-display font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>ACCEPT MATCH</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Incompatible Rejections */}
      <div className="pt-8 border-t border-border space-y-4">
        <div>
          <span className="text-[10px] uppercase font-semibold text-muted tracking-widest block">
            [ALGORITHM DEFENSE // SAFEGUARD REJECTIONS]
          </span>
          <h3 className="font-display font-bold text-lg text-primary uppercase">
            Incompatible Candidate Scenarios
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="bg-card p-5 rounded-2xl border border-border space-y-2 shadow-subtle">
            <div className="flex items-center justify-between font-mono">
              <span className="font-semibold text-primary">Jaipur → Ajmer vs Jaipur → Delhi</span>
              <span className="text-[9px] bg-error-surface text-error font-semibold px-2 py-0.5 rounded border border-error/30">
                REJECTED_DIRECTION
              </span>
            </div>
            <p className="text-secondary text-[11px] leading-relaxed">
              Bearing angle differential exceeds 140° (cos &lt; 0.45). Opposing highway directions cannot share transit.
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border space-y-2 shadow-subtle">
            <div className="flex items-center justify-between font-mono">
              <span className="font-semibold text-primary">Departure Delta &gt; 50 Mins</span>
              <span className="text-[9px] bg-error-surface text-error font-semibold px-2 py-0.5 rounded border border-error/30">
                REJECTED_TIME
              </span>
            </div>
            <p className="text-secondary text-[11px] leading-relaxed">
              Departure gap exceeds allowable schedule corridor window. Redirected to separate vehicle pool.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
