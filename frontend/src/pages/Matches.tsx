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
  Users, 
  AlertTriangle,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hopin-border pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-hopin-muted font-bold block mb-1">
            [AI ROUTE MATCHING // CANDIDATE MATRIX]
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight uppercase">
            Active Route Matches
          </h1>
          <p className="font-sans text-xs sm:text-sm text-hopin-muted mt-1">
            Spatial vector comparison evaluating origin-destination heading, highway corridors, and detour tolerances.
          </p>
        </div>

        <Link
          to="/book"
          className="px-4 py-2.5 rounded-xl bg-hopin-dark text-hopin-lime font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto hover:bg-black transition-colors"
        >
          <Car className="w-4 h-4" />
          <span>New Corridor Request</span>
        </Link>
      </div>

      {/* Action Notification */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-[#E8F8C8] border-2 border-hopin-dark text-hopin-dark text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#171916]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-hopin-dark shrink-0" />
            <span className="font-bold">{actionMessage}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-hopin-dark font-black hover:underline"
          >
            [DISMISS]
          </button>
        </div>
      )}

      {/* Matches List */}
      {loading ? (
        <div className="p-16 text-center text-xs text-hopin-muted">
          ANALYZING ACTIVE HIGHWAY CORRIDORS...
        </div>
      ) : matches.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-hopin-border space-y-3">
          <Car className="w-10 h-10 text-hopin-muted mx-auto" />
          <h3 className="font-display font-bold text-base text-hopin-dark">No active matches found</h3>
          <p className="font-sans text-xs text-hopin-muted max-w-sm mx-auto">
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
                className="bg-white rounded-3xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916] overflow-hidden"
              >
                {/* Match Header */}
                <div className="bg-hopin-dark p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2C3029]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-hopin-lime">
                        {match.journeyType} CORRIDOR
                      </span>
                      {isConfirmed ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-hopin-lime text-hopin-dark">
                          VEHICLE DISPATCHED
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#2D3328] text-slate-300">
                          PENDING PASSENGER CONFIRMATION
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                      {match.routeTitle}
                    </h3>
                  </div>

                  {/* Compatibility Score Badge */}
                  <div className="bg-[#21251E] px-4 py-2.5 rounded-2xl border border-[#2E352B] flex items-center gap-3">
                    <span className="font-display font-black text-2xl text-hopin-lime">
                      {match.score}%
                    </span>
                    <div className="text-[10px] text-slate-400">
                      <p className="font-bold text-white uppercase">Compatibility</p>
                      <p>Spatial & Temporal</p>
                    </div>
                  </div>
                </div>

                {/* Match Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matched Co-Passenger */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-hopin-muted block mb-2">
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
                    <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-hopin-border flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-hopin-muted block mb-3">
                          [02 // FARE RECONCILIATION]
                        </span>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between text-hopin-muted">
                            <span>SOLO PRIVATE FARE:</span>
                            <span className="line-through">₹{myPricing.privateFare}</span>
                          </div>
                          <div className="flex justify-between font-display font-black text-base text-hopin-dark">
                            <span>HOPIN SHARED FARE:</span>
                            <span className="text-hopin-dark">₹{myPricing.sharedFare}</span>
                          </div>
                          <div className="flex justify-between font-bold text-hopin-dark text-xs pt-1 border-t border-hopin-border">
                            <span>GUARANTEED SAVINGS:</span>
                            <span className="bg-[#E8F8C8] px-1.5 py-0.5 rounded text-hopin-dark">
                              SAVED ₹{myPricing.savingsAmount} ({myPricing.savingsPercentage}%)
                            </span>
                          </div>
                          <div className="flex justify-between text-hopin-muted text-[11px] pt-1">
                            <span>ADDITIONAL DETOUR:</span>
                            <span className="font-bold text-hopin-dark">+{myPricing.detourMinutes} MINS</span>
                          </div>
                        </div>
                      </div>

                      {/* Acceptance Flags */}
                      <div className="pt-3 border-t border-hopin-border flex items-center justify-between text-[11px]">
                        <div>
                          <span>{match.passengerAName}: </span>
                          <strong className={match.acceptedByA ? 'text-hopin-dark' : 'text-hopin-muted'}>
                            {match.acceptedByA ? '[ACCEPTED]' : '[PENDING]'}
                          </strong>
                        </div>
                        <div>
                          <span>{match.passengerBName}: </span>
                          <strong className={match.acceptedByB ? 'text-hopin-dark' : 'text-hopin-muted'}>
                            {match.acceptedByB ? '[ACCEPTED]' : '[PENDING]'}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explainable Rationale */}
                  <div className="bg-[#F8F7F2] p-5 rounded-2xl border border-hopin-border space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-hopin-dark block">
                      // ALGORITHM EXPLANATION & REASONING
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-hopin-dark font-sans text-xs">
                      {match.reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-hopin-dark shrink-0 mt-1.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Waypoints sequence */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-hopin-muted block mb-2">
                      [03 // OPTIMIZED WAYPOINTS MANIFEST]
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {match.waypoints.map((wp, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-[#FAF9F5] border border-hopin-border">
                          <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                            <span>STOP {wp.order} • {wp.time}</span>
                            <span className="uppercase text-hopin-muted">{wp.type}</span>
                          </div>
                          <p className="font-bold text-hopin-dark truncate">{wp.locationName}</p>
                          <p className="text-[10px] text-hopin-muted font-sans">{wp.passenger}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-hopin-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    {isConfirmed ? (
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="font-bold text-xs text-hopin-dark bg-[#E8F8C8] px-3 py-1.5 rounded-xl border border-hopin-dark">
                          VEHICLE DISPATCHED • TOYOTA INNOVA CRYSTA
                        </span>
                        <Link
                          to={`/ride/${match.rideAId}`}
                          className="px-4 py-2 rounded-xl bg-hopin-dark text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center gap-1.5"
                        >
                          <span>TRACK TRIP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ) : (
                      <>
                        <p className="text-[11px] text-hopin-muted font-sans">
                          Both commuters must approve before the driver is dispatched to your pickup spot.
                        </p>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleDecline(match.id)}
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-hopin-border text-hopin-dark font-bold text-xs uppercase tracking-wider hover:bg-black/5"
                          >
                            DECLINE
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAccept(match.id)}
                            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-black text-xs uppercase tracking-wider transition-all border border-black shadow-[2px_2px_0px_0px_#171916] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-1.5"
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
      <div className="pt-8 border-t border-hopin-border space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-hopin-muted tracking-widest block">
            [ALGORITHM DEFENSE // SAFEGUARD REJECTIONS]
          </span>
          <h3 className="font-display font-bold text-lg text-hopin-dark uppercase">
            Incompatible Candidate Scenarios
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="bg-white p-5 rounded-2xl border border-hopin-border space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-hopin-dark">Jaipur → Ajmer vs Jaipur → Delhi</span>
              <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                REJECTED_DIRECTION
              </span>
            </div>
            <p className="text-hopin-muted text-[11px] leading-relaxed">
              Bearing angle differential exceeds 140° ($\cos &lt; 0.45$). Opposing highway directions cannot share transit.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-hopin-border space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-hopin-dark">Departure Delta &gt; 50 Mins</span>
              <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                REJECTED_TIME
              </span>
            </div>
            <p className="text-hopin-muted text-[11px] leading-relaxed">
              Departure gap exceeds allowable schedule corridor window. Redirected to separate vehicle pool.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
