import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLocations, LocationItem } from '../services/api';
import { Moving3DCarHighway } from '../components/Moving3DCarHighway';
import { Interactive3DHeroObject } from '../components/Interactive3DHeroObject';
import { LiveMatchVisualizer } from '../components/LiveMatchVisualizer';
import { StickyNote } from '../components/StickyNote';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Sparkles, 
  Compass, 
  Zap, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<LocationItem[]>([]);
  
  // Hero booking states
  const [pickupId, setPickupId] = useState('loc_jpr_station');
  const [dropoffId, setDropoffId] = useState('loc_del_igi_t3');
  const [travelDate, setTravelDate] = useState('2026-10-24');
  const [departureTime, setDepartureTime] = useState('07:00');
  const [passengerCount, setPassengerCount] = useState(1);
  const [journeyType, setJourneyType] = useState<'city' | 'outstation' | 'interstate'>('interstate');

  useEffect(() => {
    fetchLocations().then(setLocations).catch(console.error);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/book?journeyType=${journeyType}&pickup=${pickupId}&dropoff=${dropoffId}&date=${travelDate}&time=${departureTime}&passengers=${passengerCount}&rideType=shared`);
  };

  return (
    <div className="space-y-12 sm:space-y-14 pb-16 overflow-hidden bg-bg text-primary page-transition">
      
      {/* SECTION 1: EDITORIAL DARK HERO */}
      <section className="pt-4 sm:pt-6 pb-8 border-b border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Label Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted pb-3 border-b border-border mb-6 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="font-semibold text-primary">URBAN MOBILITY / 01</span>
              <span>// CORRIDOR POOLING ARCHITECTURE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-accent font-semibold">NH-48 HIGHWAY ACTIVE</span>
              <span>•</span>
              <span className="text-secondary font-medium">JAIPUR ⇄ DELHI ⇄ AJMER</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Headline, Booking Panel */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="space-y-2.5 relative">
                {/* Floating pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-semibold shadow-subtle">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>37% CHEAPER THAN SOLO CABS</span>
                </div>

                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-primary leading-[0.98] tracking-tight uppercase">
                  GOOD ROUTES.<br />
                  <span className="text-accent">
                    BETTER COMPANY.
                  </span>
                </h1>

                <p className="font-sans text-sm sm:text-base text-secondary max-w-xl leading-relaxed pt-0.5">
                  City to city, street to street. Find verified people heading your way, share a premium cab, and make the journey cost significantly less.
                </p>
              </div>

              {/* CLEAN FUNCTIONAL BOOKING INTERFACE */}
              <div className="bg-card rounded-2xl border border-border shadow-elevated p-5 sm:p-6 space-y-4 relative">
                
                {/* Journey Scope Switcher */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setJourneyType('interstate')}
                    className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-all border ${
                      journeyType === 'interstate' 
                        ? 'bg-accent text-white border-accent shadow-subtle' 
                        : 'bg-secondary text-secondary border-border hover:text-primary hover:bg-elevated'
                    }`}
                  >
                    Interstate (Delhi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJourneyType('outstation')}
                    className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-all border ${
                      journeyType === 'outstation' 
                        ? 'bg-accent text-white border-accent shadow-subtle' 
                        : 'bg-secondary text-secondary border-border hover:text-primary hover:bg-elevated'
                    }`}
                  >
                    Outstation (Ajmer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJourneyType('city')}
                    className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-all border ${
                      journeyType === 'city' 
                        ? 'bg-accent text-white border-accent shadow-subtle' 
                        : 'bg-secondary text-secondary border-border hover:text-primary hover:bg-elevated'
                    }`}
                  >
                    City (Jaipur)
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  
                  {/* FROM / TO GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* FROM */}
                    <div className="space-y-1">
                      <label className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span>FROM (PICKUP POINT)</span>
                      </label>
                      <select
                        value={pickupId}
                        onChange={(e) => setPickupId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                      >
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                        ))}
                      </select>
                    </div>

                    {/* TO */}
                    <div className="space-y-1">
                      <label className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span>TO (DESTINATION)</span>
                      </label>
                      <select
                        value={dropoffId}
                        onChange={(e) => setDropoffId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-xs font-semibold text-primary focus:border-accent focus:outline-none"
                      >
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* WHEN / PASSENGERS / FIND A RIDE ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                    
                    {/* WHEN */}
                    <div className="sm:col-span-4 space-y-1">
                      <label className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>WHEN</span>
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-xs font-mono font-semibold text-primary focus:border-accent focus:outline-none"
                      />
                    </div>

                    {/* PASSENGERS */}
                    <div className="sm:col-span-3 space-y-1">
                      <label className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                        <span>SEATS</span>
                      </label>
                      <select
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-xs font-mono font-semibold text-primary focus:border-accent focus:outline-none"
                      >
                        <option value={1}>1 Seat</option>
                        <option value={2}>2 Seats</option>
                        <option value={3}>3 Seats</option>
                      </select>
                    </div>

                    {/* FIND A RIDE CTA BUTTON */}
                    <div className="sm:col-span-5">
                      <button
                        type="submit"
                        className="w-full py-3 px-5 rounded-xl bg-accent text-white hover:bg-accent-hover font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle flex items-center justify-center gap-2 active:scale-98"
                      >
                        <span>FIND A RIDE</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </form>

                {/* Popular Route Presets */}
                <div className="pt-3 border-t border-border flex items-center flex-wrap gap-2 font-mono text-xs text-muted">
                  <span className="font-semibold text-primary uppercase">CORRIDOR PRESETS:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupId('loc_jpr_station');
                      setDropoffId('loc_del_igi_t3');
                      setJourneyType('interstate');
                    }}
                    className="text-accent font-medium hover:underline"
                  >
                    JAIPUR → DELHI AIRPORT [37% OFF]
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupId('loc_jpr_station');
                      setDropoffId('loc_ajm_dargah');
                      setJourneyType('outstation');
                    }}
                    className="text-secondary font-medium hover:text-primary hover:underline"
                  >
                    JAIPUR → AJMER SHARIF
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column: Sticky Notes & 3D Sculpture */}
            <div className="lg:col-span-5 space-y-6">
              
              <StickyNote 
                color="blue" 
                badge="HIGHWAY SAVINGS" 
                title="SHARED FARE MATH" 
                rotation={2}
                pin={true}
                author="Rohan (Jaipur Commuter)"
              >
                "Solo cab from Jaipur to Delhi Airport was ₹3,800. Matched with Priya through hopin: ₹2,400 each in a clean Innova Crysta!"
              </StickyNote>

              <StickyNote 
                color="mint" 
                badge="SAFETY PROTOCOL" 
                title="ZERO DETOUR MATH" 
                rotation={-1.5}
                tape={true}
                author="Algorithm Dispatch"
              >
                "Strict 15-min detour ceiling. If heading bearings diverge by &gt; 45°, trips are discarded. Only pure highway matches."
              </StickyNote>

              {/* 3D Sculpture */}
              <div className="pt-2">
                <Interactive3DHeroObject />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TICKER MARQUEE TAPE */}
      <div className="bg-secondary text-primary py-2.5 border-y border-border font-mono text-xs overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-accent font-semibold">★ HOPIN HIGHWAY NETWORK</span>
          <span>JAIPUR JUNCTION ↔ DELHI IGI T3</span>
          <span className="text-emerald-400 font-semibold">94.8% AVG MATCH COMPATIBILITY</span>
          <span>100% VERIFIED PEER PASSENGERS</span>
          <span className="text-accent font-semibold">AVG COMMUTER SAVINGS: ₹1,430 PER TRIP</span>
          <span>85% GUARANTEED DRIVER PAYOUT</span>
          <span className="text-sky-400 font-semibold">INNOVA CRYSTA FLEET</span>
        </div>
      </div>

      {/* SECTION 2: 3D MOVING CAR HIGHWAY SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-xs text-muted uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>INTERACTIVE TELEMETRY & STEERING</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
              Live Highway Cab Simulator
            </h2>
          </div>
          <p className="font-sans text-xs text-secondary max-w-md">
            Watch our simulated commercial cab cruise the NH-48 corridor. Move your cursor over the road to steer lanes, toggle neon underglow, or change cruising velocity!
          </p>
        </div>

        <Moving3DCarHighway />
      </section>

      {/* SECTION 3: AI ROUTE MATCHING VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="font-mono text-xs text-muted uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SPATIAL CONVERGENCE PROTOCOL</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
              Two Paths. One Shared Vehicle.
            </h2>
          </div>
          <p className="font-sans text-xs text-secondary max-w-md">
            Our algorithm merges real-time routes traveling along identical corridors into a single vehicle with explainable compatibility scores and zero wasted fuel.
          </p>
        </div>

        <LiveMatchVisualizer />
      </section>

      {/* SECTION 4: TACTILE STICKY NOTES TESTIMONIALS & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-1 font-semibold">
              [COMMUNITY EXPERIENCES // VERIFIED TRAVELERS]
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-primary uppercase">
              What Highway Commuters Say
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">// AUTHENTIC POST-TRIP REVIEWS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <StickyNote 
            color="blue" 
            badge="JAIPUR → GURUGRAM" 
            title="WEEKLY COMMUTER" 
            rotation={-2}
            pin={true}
            author="Rohan Sharma (Product Lead)"
          >
            "Weekly commute from Jaipur Junction to Cyber Hub used to cost ₹3,800. Matched with Priya through hopin, paid ₹2,320, and the cab was a clean Innova Crysta."
          </StickyNote>

          <StickyNote 
            color="mint" 
            badge="SAFETY REVIEW" 
            title="VERIFIED TRUST" 
            rotation={1.5}
            tape={true}
            author="Priya Patel (Management Consultant)"
          >
            "Verified Aadhaar badges and corporate email checks give me total peace of mind on the highway. Being able to inspect peer reviews beforehand makes all the difference."
          </StickyNote>

          <StickyNote 
            color="yellow" 
            badge="OUTSTATION POOL" 
            title="JAIPUR → AJMER" 
            rotation={-1}
            pin={true}
            author="Dr. Sneha Kulkarni (Surgeon)"
          >
            "The detour was only 8 minutes to pick up another passenger visiting SMS Hospital in Jaipur. Smooth coordination and our shared fare was transparent down to the rupee."
          </StickyNote>

        </div>

      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card text-primary rounded-2xl border border-border p-8 sm:p-12 shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
              // READY FOR YOUR NEXT JOURNEY?
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight uppercase text-primary">
              Hop In and Start Saving Today.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-secondary max-w-lg">
              Reserve an individual seat or private cab across Jaipur, Delhi, and Ajmer. 100% verified identities with zero hidden surcharges.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/book"
              className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle flex items-center gap-2"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/matches"
              className="px-5 py-3.5 rounded-xl border border-border hover:border-accent text-secondary hover:text-primary font-mono text-xs font-semibold uppercase tracking-wider transition-colors bg-secondary"
            >
              // AI Matches
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
