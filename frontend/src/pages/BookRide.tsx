import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  fetchLocations, 
  createRideBooking, 
  LocationItem 
} from '../services/api';
import { RouteMap } from '../components/RouteMap';
import { StickyNote } from '../components/StickyNote';
import { 
  ArrowRight, 
  Sliders, 
  CheckCircle2 
} from 'lucide-react';

export const BookRide: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [journeyType, setJourneyType] = useState<'city' | 'outstation' | 'interstate'>(
    (searchParams.get('journeyType') as any) || 'interstate'
  );
  const [pickupId, setPickupId] = useState(searchParams.get('pickup') || 'loc_jpr_station');
  const [dropoffId, setDropoffId] = useState(searchParams.get('dropoff') || 'loc_del_igi_t3');
  const [travelDate, setTravelDate] = useState(searchParams.get('date') || '2026-10-24');
  const [departureTime, setDepartureTime] = useState(searchParams.get('time') || '07:00');
  const [passengerCount, setPassengerCount] = useState(Number(searchParams.get('passengers') || 1));
  const [luggageCount, setLuggageCount] = useState(1);
  const [rideType, setRideType] = useState<'shared' | 'private'>(
    (searchParams.get('rideType') as any) || 'shared'
  );
  const [maxDetourMinutes, setMaxDetourMinutes] = useState(25);
  const [quietRide, setQuietRide] = useState(true);
  const [acPreferred, setAcPreferred] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  useEffect(() => {
    fetchLocations().then(setLocations).catch(console.error);
  }, []);

  const pickupLocation = locations.find(l => l.id === pickupId) || locations[0];
  const dropoffLocation = locations.find(l => l.id === dropoffId) || locations[1];

  const isInterstate = journeyType === 'interstate';
  const isOutstation = journeyType === 'outstation';
  const estDistanceKm = isInterstate ? 265 : isOutstation ? 135 : 18.5;
  const estDurationMins = isInterstate ? 270 : isOutstation ? 140 : 38;

  const perKm = isInterstate ? 11.5 : isOutstation ? 12 : 14.5;
  const baseFare = isInterstate ? 550 : isOutstation ? 350 : 60;
  const soloFare = Math.round(baseFare + (estDistanceKm * perKm) + (estDurationMins * 1.2) + 50);
  const sharedDiscountFactor = 0.37;
  const sharedFare = Math.round(soloFare * (1 - sharedDiscountFactor));
  const savingsAmount = soloFare - sharedFare;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupLocation || !dropoffLocation) return;

    try {
      setIsSubmitting(true);
      const payload = {
        journeyType,
        rideType,
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        travelDate,
        departureTime,
        passengerCount,
        luggageCount,
        maxDetourMinutes,
        preferences: { quietRide, acPreferred }
      };

      const res = await createRideBooking(payload);
      setBookingSuccess(res);
      setIsSubmitting(false);

      setTimeout(() => {
        if (res.match) {
          navigate('/matches');
        } else {
          navigate(`/ride/${res.ride.id}`);
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-bg text-primary">
      
      {/* Title */}
      <div className="border-b border-border pb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted font-semibold block mb-1">
          [BOOKING ENGINE // DESPATCH REQUEST]
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight uppercase">
          Reserve Your Corridor Ride
        </h1>
        <p className="font-sans text-xs sm:text-sm text-secondary mt-1">
          Define your departure window. Our matching engine will seek verified co-passengers heading in the exact same direction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 shadow-elevated">
            
            {/* Journey Scope */}
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted block mb-2">
                // 01 SELECT JOURNEY SCOPE
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setJourneyType('interstate')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    journeyType === 'interstate'
                      ? 'border-accent bg-elevated text-accent font-semibold shadow-subtle'
                      : 'border-border bg-secondary hover:bg-elevated text-secondary'
                  }`}
                >
                  <p className="font-semibold text-primary">Interstate</p>
                  <p className="text-[10px] text-muted">Jaipur–Delhi</p>
                </button>

                <button
                  type="button"
                  onClick={() => setJourneyType('outstation')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    journeyType === 'outstation'
                      ? 'border-accent bg-elevated text-accent font-semibold shadow-subtle'
                      : 'border-border bg-secondary hover:bg-elevated text-secondary'
                  }`}
                >
                  <p className="font-semibold text-primary">Outstation</p>
                  <p className="text-[10px] text-muted">Jaipur–Ajmer</p>
                </button>

                <button
                  type="button"
                  onClick={() => setJourneyType('city')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    journeyType === 'city'
                      ? 'border-accent bg-elevated text-accent font-semibold shadow-subtle'
                      : 'border-border bg-secondary hover:bg-elevated text-secondary'
                  }`}
                >
                  <p className="font-semibold text-primary">City Transit</p>
                  <p className="text-[10px] text-muted">Intra-Jaipur</p>
                </button>
              </div>
            </div>

            {/* Endpoints */}
            <div className="space-y-3 pt-2 border-t border-border">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted block">
                // 02 ROUTING ENDPOINTS
              </span>

              <div>
                <label className="font-mono text-[11px] font-semibold text-secondary block mb-1">
                  FROM (PICKUP POINT)
                </label>
                <select
                  value={pickupId}
                  onChange={(e) => setPickupId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary font-sans text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} — {loc.city} ({loc.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] font-semibold text-secondary block mb-1">
                  TO (DESTINATION)
                </label>
                <select
                  value={dropoffId}
                  onChange={(e) => setDropoffId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary font-sans text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} — {loc.city} ({loc.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date, Time & Seats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-border font-mono text-xs">
              <div>
                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">DATE</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl border border-border bg-secondary font-sans text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">TIME</label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl border border-border bg-secondary font-sans text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">SEATS</label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl border border-border bg-secondary font-sans text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                >
                  <option value={1}>1 Seat</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">LUGGAGE</label>
                <select
                  value={luggageCount}
                  onChange={(e) => setLuggageCount(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl border border-border bg-secondary font-sans text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                >
                  <option value={1}>1 Bag</option>
                  <option value={2}>2 Bags</option>
                  <option value={3}>3+ Bags</option>
                </select>
              </div>
            </div>

            {/* Cab Mode Selection */}
            <div className="pt-2 border-t border-border">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted block mb-2">
                // 03 CAB ALLOCATION PREFERENCE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setRideType('shared')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    rideType === 'shared'
                      ? 'border-accent bg-elevated text-primary shadow-subtle'
                      : 'border-border bg-secondary hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-semibold text-sm text-primary">AI Shared Pool</span>
                    <span className="font-mono text-[9px] uppercase font-semibold px-2 py-0.5 rounded bg-accent/20 text-accent">
                      SAVE ~37%
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary font-sans">
                    Matches with compatible verified travelers along your route. Minimal detour.
                  </p>
                  <p className="font-mono text-base font-bold text-accent mt-2">
                    ₹{sharedFare} <span className="text-[10px] font-normal text-muted">/ estimated seat</span>
                  </p>
                </div>

                <div
                  onClick={() => setRideType('private')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    rideType === 'private'
                      ? 'border-accent bg-elevated text-primary shadow-subtle'
                      : 'border-border bg-secondary hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-semibold text-sm text-primary">Private Solo Cab</span>
                    <span className="font-mono text-[9px] uppercase font-semibold px-2 py-0.5 rounded bg-secondary text-muted">
                      EXCLUSIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary font-sans">
                    Entire vehicle reserved exclusively for you. Point-to-point without stops.
                  </p>
                  <p className="font-mono text-base font-bold text-primary mt-2">
                    ₹{soloFare} <span className="text-[10px] font-normal text-muted">/ estimated cab</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Detour & Comfort Controls */}
            {rideType === 'shared' && (
              <div className="bg-secondary p-5 rounded-xl border border-border space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary flex items-center gap-1.5 uppercase">
                    <Sliders className="w-3.5 h-3.5 text-accent" />
                    Maximum Allowable Detour
                  </span>
                  <span className="font-semibold text-accent bg-card px-2 py-0.5 rounded border border-border">
                    +{maxDetourMinutes} MINS MAX
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={45}
                  step={5}
                  value={maxDetourMinutes}
                  onChange={(e) => setMaxDetourMinutes(Number(e.target.value))}
                  className="w-full accent-accent"
                />

                <div className="pt-2 border-t border-border flex flex-wrap gap-4 text-xs font-sans">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quietRide}
                      onChange={(e) => setQuietRide(e.target.checked)}
                      className="rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-secondary font-medium">Quiet Travel Mode</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acPreferred}
                      onChange={(e) => setAcPreferred(e.target.checked)}
                      className="rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-secondary font-medium">Full AC Cab Required</span>
                  </label>
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-accent hover:bg-accent-hover text-bg font-display font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>PARSING CORRIDORS & SEARCHING CANDIDATES...</span>
              ) : (
                <>
                  <span>CONFIRM & EXECUTE ROUTE SEARCH</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {bookingSuccess && (
              <div className="p-3 bg-success-surface border border-success/30 rounded-xl text-success text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>BOOKING REGISTERED. REDIRECTING TO MATCH POOL...</span>
              </div>
            )}

          </form>
        </div>

        {/* Telemetry Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <RouteMap
            pickupName={pickupLocation?.name}
            dropoffName={dropoffLocation?.name}
            distanceKm={estDistanceKm}
            durationMinutes={estDurationMins}
            heightClass="h-72"
          />

          {/* Pricing Economics Card */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4 font-mono text-xs shadow-elevated">
            <h3 className="font-display font-semibold text-sm text-primary border-b border-border pb-3 uppercase tracking-tight">
              [TRANSPARENT FARE RECONCILIATION]
            </h3>

            <div className="space-y-2 text-secondary">
              <div className="flex justify-between">
                <span>BASE FARE:</span>
                <span className="text-primary font-semibold">₹{baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>DISTANCE ({estDistanceKm} KM × ₹{perKm}/KM):</span>
                <span className="text-primary font-semibold">₹{Math.round(estDistanceKm * perKm)}</span>
              </div>
              <div className="flex justify-between">
                <span>HIGHWAY MAINTENANCE & PLATFORM:</span>
                <span className="text-primary font-semibold">₹50</span>
              </div>
              <div className="flex justify-between">
                <span>APPLICABLE GST (5%):</span>
                <span className="text-primary font-semibold">₹{Math.round(soloFare * 0.05)}</span>
              </div>

              <div className="pt-2 border-t border-border flex justify-between font-semibold text-primary text-sm">
                <span>SOLO PRIVATE TOTAL:</span>
                <span>₹{soloFare}</span>
              </div>

              {rideType === 'shared' && (
                <div className="p-3.5 rounded-xl bg-secondary border border-accent/30 space-y-1 mt-2">
                  <div className="flex justify-between text-accent font-semibold">
                    <span>POOLING DISCOUNT (37%):</span>
                    <span>-₹{savingsAmount}</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-base text-primary pt-1">
                    <span>CONFIRMED SHARED FARE:</span>
                    <span className="text-accent">₹{sharedFare}</span>
                  </div>
                  <p className="text-[10px] text-muted font-sans pt-1">
                    *85% credited to commercial captain upon arrival.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Note Advice */}
          <StickyNote
            color="blue"
            badge="PRICE GUARANTEE"
            title="FAIR COST SHARING"
            rotation={1.5}
            pin={true}
            author="Pricing Telemetry"
          >
            "You save up to ₹1,430 on the Jaipur–Delhi corridor by sharing seats with verified passengers. If no compatible match is confirmed, your ride seamlessly defaults to private cab."
          </StickyNote>
        </div>

      </div>

    </div>
  );
};
