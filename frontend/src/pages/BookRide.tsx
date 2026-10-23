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
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  Sliders, 
  VolumeX, 
  Wind, 
  Briefcase, 
  CheckCircle2,
  Sparkles
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-hopin-border pb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-hopin-muted font-bold block mb-1">
          [BOOKING ENGINE // DESPATCH REQUEST]
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight uppercase">
          Reserve Your Corridor Ride
        </h1>
        <p className="font-sans text-xs sm:text-sm text-hopin-muted mt-1">
          Define your departure window. Our matching engine will seek verified co-passengers heading in the exact same direction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-hopin-dark p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_0px_#171916]">
            
            {/* Journey Scope */}
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted block mb-2">
                // 01 SELECT JOURNEY SCOPE
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setJourneyType('interstate')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    journeyType === 'interstate'
                      ? 'border-hopin-dark bg-hopin-dark text-hopin-lime font-bold shadow-sm'
                      : 'border-hopin-border hover:bg-hopin-bg text-hopin-dark'
                  }`}
                >
                  <p className="font-bold">Interstate</p>
                  <p className="text-[10px] text-hopin-muted-light">Jaipur–Delhi</p>
                </button>

                <button
                  type="button"
                  onClick={() => setJourneyType('outstation')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    journeyType === 'outstation'
                      ? 'border-hopin-dark bg-hopin-dark text-hopin-lime font-bold shadow-sm'
                      : 'border-hopin-border hover:bg-hopin-bg text-hopin-dark'
                  }`}
                >
                  <p className="font-bold">Outstation</p>
                  <p className="text-[10px] text-hopin-muted-light">Jaipur–Ajmer</p>
                </button>

                <button
                  type="button"
                  onClick={() => setJourneyType('city')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    journeyType === 'city'
                      ? 'border-hopin-dark bg-hopin-dark text-hopin-lime font-bold shadow-sm'
                      : 'border-hopin-border hover:bg-hopin-bg text-hopin-dark'
                  }`}
                >
                  <p className="font-bold">City Transit</p>
                  <p className="text-[10px] text-hopin-muted-light">Intra-Jaipur</p>
                </button>
              </div>
            </div>

            {/* Endpoints */}
            <div className="space-y-3 pt-2 border-t border-hopin-border">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted block">
                // 02 ROUTING ENDPOINTS
              </span>

              <div>
                <label className="font-mono text-[11px] font-bold text-hopin-dark block mb-1">
                  FROM (PICKUP POINT)
                </label>
                <select
                  value={pickupId}
                  onChange={(e) => setPickupId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-hopin-border bg-hopin-bg font-sans text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} — {loc.city} ({loc.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-hopin-dark block mb-1">
                  TO (DESTINATION)
                </label>
                <select
                  value={dropoffId}
                  onChange={(e) => setDropoffId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-hopin-border bg-hopin-bg font-sans text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} — {loc.city} ({loc.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date, Time & Seats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-hopin-border font-mono text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-hopin-muted mb-1">DATE</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl border border-hopin-border bg-hopin-bg font-sans text-xs font-semibold text-hopin-dark"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-hopin-muted mb-1">TIME</label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl border border-hopin-border bg-hopin-bg font-sans text-xs font-semibold text-hopin-dark"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-hopin-muted mb-1">SEATS</label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl border border-hopin-border bg-hopin-bg font-sans text-xs font-semibold text-hopin-dark"
                >
                  <option value={1}>1 Seat</option>
                  <option value={2}>2 Seats</option>
                  <option value={3}>3 Seats</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-hopin-muted mb-1">LUGGAGE</label>
                <select
                  value={luggageCount}
                  onChange={(e) => setLuggageCount(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded-xl border border-hopin-border bg-hopin-bg font-sans text-xs font-semibold text-hopin-dark"
                >
                  <option value={1}>1 Bag</option>
                  <option value={2}>2 Bags</option>
                  <option value={3}>3+ Bags</option>
                </select>
              </div>
            </div>

            {/* Cab Mode Selection */}
            <div className="pt-2 border-t border-hopin-border">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted block mb-2">
                // 03 CAB ALLOCATION PREFERENCE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setRideType('shared')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    rideType === 'shared'
                      ? 'border-hopin-dark bg-hopin-dark text-white shadow-md'
                      : 'border-hopin-border hover:border-hopin-dark'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm">AI Shared Pool</span>
                    <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-hopin-lime text-hopin-dark">
                      SAVE ~37%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Matches with compatible verified travelers along your route. Minimal detour.
                  </p>
                  <p className="font-mono text-base font-extrabold text-hopin-lime mt-2">
                    ₹{sharedFare} <span className="text-[10px] font-normal text-slate-400">/ estimated seat</span>
                  </p>
                </div>

                <div
                  onClick={() => setRideType('private')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    rideType === 'private'
                      ? 'border-hopin-dark bg-hopin-dark text-white shadow-md'
                      : 'border-hopin-border hover:border-hopin-dark'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm">Private Solo Cab</span>
                    <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-black/10 text-slate-400">
                      EXCLUSIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Entire vehicle reserved exclusively for you. Point-to-point without stops.
                  </p>
                  <p className="font-mono text-base font-extrabold text-white mt-2">
                    ₹{soloFare} <span className="text-[10px] font-normal text-slate-400">/ estimated cab</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Detour & Comfort Controls */}
            {rideType === 'shared' && (
              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-hopin-border space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-hopin-dark flex items-center gap-1.5 uppercase">
                    <Sliders className="w-3.5 h-3.5" />
                    Maximum Allowable Detour
                  </span>
                  <span className="font-bold text-hopin-dark bg-white px-2 py-0.5 rounded border border-hopin-border">
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
                  className="w-full accent-hopin-dark"
                />

                <div className="pt-2 border-t border-hopin-border flex flex-wrap gap-4 text-xs font-sans">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quietRide}
                      onChange={(e) => setQuietRide(e.target.checked)}
                      className="rounded text-hopin-dark focus:ring-hopin-dark"
                    />
                    <span className="text-hopin-dark font-medium">Quiet Travel Mode</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acPreferred}
                      onChange={(e) => setAcPreferred(e.target.checked)}
                      className="rounded text-hopin-dark focus:ring-hopin-dark"
                    />
                    <span className="text-hopin-dark font-medium">Full AC Cab Required</span>
                  </label>
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-black text-xs uppercase tracking-wider transition-all border border-black shadow-[3px_3px_0px_0px_#171916] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
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
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
          <div className="bg-white rounded-3xl border-2 border-hopin-border p-6 space-y-4 font-mono text-xs shadow-sm">
            <h3 className="font-display font-bold text-sm text-hopin-dark border-b border-hopin-border pb-3 uppercase tracking-tight">
              [TRANSPARENT FARE RECONCILIATION]
            </h3>

            <div className="space-y-2 text-hopin-muted">
              <div className="flex justify-between">
                <span>BASE FARE:</span>
                <span className="text-hopin-dark font-bold">₹{baseFare}</span>
              </div>
              <div className="flex justify-between">
                <span>DISTANCE ({estDistanceKm} KM × ₹{perKm}/KM):</span>
                <span className="text-hopin-dark font-bold">₹{Math.round(estDistanceKm * perKm)}</span>
              </div>
              <div className="flex justify-between">
                <span>HIGHWAY MAINTENANCE & PLATFORM:</span>
                <span className="text-hopin-dark font-bold">₹50</span>
              </div>
              <div className="flex justify-between">
                <span>APPLICABLE GST (5%):</span>
                <span className="text-hopin-dark font-bold">₹{Math.round(soloFare * 0.05)}</span>
              </div>

              <div className="pt-2 border-t border-hopin-border flex justify-between font-bold text-hopin-dark text-sm">
                <span>SOLO PRIVATE TOTAL:</span>
                <span>₹{soloFare}</span>
              </div>

              {rideType === 'shared' && (
                <div className="p-3.5 rounded-2xl bg-[#F4FBE4] border border-[#C5F55A] space-y-1 mt-2">
                  <div className="flex justify-between text-hopin-dark font-bold">
                    <span>POOLING DISCOUNT (37%):</span>
                    <span>-₹{savingsAmount}</span>
                  </div>
                  <div className="flex justify-between font-display font-black text-base text-hopin-dark pt-1">
                    <span>CONFIRMED SHARED FARE:</span>
                    <span>₹{sharedFare}</span>
                  </div>
                  <p className="text-[10px] text-hopin-muted font-sans pt-1">
                    *85% credited to commercial captain upon arrival.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Note Advice */}
          <StickyNote
            color="pink"
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
