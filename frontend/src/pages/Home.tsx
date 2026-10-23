import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLocations, LocationItem } from '../services/api';
import { Moving3DCarHighway } from '../components/Moving3DCarHighway';
import { Interactive3DHeroObject } from '../components/Interactive3DHeroObject';
import { LiveMatchVisualizer } from '../components/LiveMatchVisualizer';
import { StickyNote } from '../components/StickyNote';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingDown, 
  Leaf, 
  CheckCircle2,
  Star,
  Compass,
  Zap,
  Heart
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<LocationItem[]>([]);
  
  // Clean hero booking states
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
    <div className="space-y-16 pb-20 overflow-hidden bg-hopin-bg page-transition">
      
      {/* SECTION 1: PLAYFUL & EDITORIAL HERO */}
      <section className="pt-8 sm:pt-12 pb-10 border-b-2 border-hopin-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Label Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-hopin-muted pb-4 border-b-2 border-hopin-dark mb-8 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-hopin-pink animate-ping" />
              <span className="font-bold text-hopin-dark">URBAN MOBILITY / 01</span>
              <span>// CORRIDOR POOLING ARCHITECTURE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-hopin-blue font-bold">NH-48 HIGHWAY ACTIVE</span>
              <span>•</span>
              <span className="text-hopin-pink font-bold">JAIPUR ⇄ DELHI ⇄ AJMER</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Headline, Sticky Note, and Booking Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3 relative">
                {/* Floating playful sticky pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hopin-pink-light border-2 border-hopin-dark text-hopin-pink font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#121624]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>37% CHEAPER THAN SOLO CABS</span>
                </div>

                <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-hopin-dark leading-[0.95] tracking-tighter uppercase">
                  GOOD ROUTES.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopin-pink via-hopin-blue to-hopin-orange">
                    BETTER COMPANY.
                  </span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-hopin-muted max-w-xl leading-relaxed pt-1">
                  City to city, street to street. Find people heading your way, share a cab, and make the journey cost less.
                </p>
              </div>

              {/* CLEAN FUNCTIONAL BOOKING INTERFACE */}
              <div className="bg-white rounded-2xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#121624] p-6 sm:p-7 space-y-5 relative">
                
                {/* Journey Scope Switcher with Cool Colors */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setJourneyType('interstate')}
                    className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all border-2 border-hopin-dark ${
                      journeyType === 'interstate' 
                        ? 'bg-hopin-blue text-white shadow-[2px_2px_0px_0px_#121624]' 
                        : 'bg-white text-hopin-dark hover:bg-hopin-bg'
                    }`}
                  >
                    Interstate (Delhi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJourneyType('outstation')}
                    className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all border-2 border-hopin-dark ${
                      journeyType === 'outstation' 
                        ? 'bg-hopin-orange text-white shadow-[2px_2px_0px_0px_#121624]' 
                        : 'bg-white text-hopin-dark hover:bg-hopin-bg'
                    }`}
                  >
                    Outstation (Ajmer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJourneyType('city')}
                    className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all border-2 border-hopin-dark ${
                      journeyType === 'city' 
                        ? 'bg-hopin-pink text-white shadow-[2px_2px_0px_0px_#121624]' 
                        : 'bg-white text-hopin-dark hover:bg-hopin-bg'
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
                      <label className="font-mono text-xs font-bold uppercase tracking-wider text-hopin-dark flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-hopin-pink" />
                        <span>FROM (PICKUP POINT)</span>
                      </label>
                      <select
                        value={pickupId}
                        onChange={(e) => setPickupId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-pink"
                      >
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                        ))}
                      </select>
                    </div>

                    {/* TO */}
                    <div className="space-y-1">
                      <label className="font-mono text-xs font-bold uppercase tracking-wider text-hopin-dark flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-hopin-blue" />
                        <span>TO (DESTINATION)</span>
                      </label>
                      <select
                        value={dropoffId}
                        onChange={(e) => setDropoffId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-blue"
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
                      <label className="font-mono text-xs font-bold uppercase tracking-wider text-hopin-dark flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-hopin-orange" />
                        <span>WHEN</span>
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-xs font-mono font-bold text-hopin-dark focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* PASSENGERS */}
                    <div className="sm:col-span-3 space-y-1">
                      <label className="font-mono text-xs font-bold uppercase tracking-wider text-hopin-dark flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-hopin-pink" />
                        <span>SEATS</span>
                      </label>
                      <select
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-xs font-mono font-bold text-hopin-dark focus:bg-white focus:outline-none"
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
                        className="w-full py-3 px-5 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#00E599] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5"
                      >
                        <span>FIND A RIDE</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </form>

                {/* Popular Route Presets */}
                <div className="pt-3 border-t-2 border-hopin-dark flex items-center flex-wrap gap-2 font-mono text-xs text-hopin-muted">
                  <span className="font-bold text-hopin-dark uppercase">CORRIDOR PRESETS:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupId('loc_jpr_station');
                      setDropoffId('loc_del_igi_t3');
                      setJourneyType('interstate');
                    }}
                    className="text-hopin-blue font-bold hover:underline"
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
                    className="text-hopin-orange font-bold hover:underline"
                  >
                    JAIPUR → AJMER SHARIF
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column: Handcrafted Sticky Notes & Interactive 3D Route Sculpture (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Tilted Sticky Note 1: Pink */}
              <StickyNote 
                color="pink" 
                badge="HIGHWAY TIP" 
                title="SHARED SAVINGS" 
                rotation={2}
                pin={true}
                author="Rohan (Jaipur Commuter)"
              >
                "Solo cab from Jaipur to Delhi Airport was ₹3,800. Matched with Priya through hopin: ₹2,400 each in a clean Innova Crysta!"
              </StickyNote>

              {/* Tilted Sticky Note 2: Yellow */}
              <StickyNote 
                color="yellow" 
                badge="SAFETY PROTOCOL" 
                title="ZERO DETOUR MATH" 
                rotation={-1.5}
                tape={true}
                author="Algorithm Dispatch"
              >
                "Strict 15-min detour ceiling. If heading bearings diverge by &gt; 45°, trips are discarded. Only pure highway matches."
              </StickyNote>

              {/* 3D Wireframe Sculpture */}
              <div className="pt-2">
                <Interactive3DHeroObject />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TICKER MARQUEE TAPE */}
      <div className="bg-hopin-dark text-white py-2.5 border-y-2 border-hopin-dark font-mono text-xs overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-hopin-pink font-bold">★ HOPIN HIGHWAY NETWORK</span>
          <span>JAIPUR JUNCTION ↔ DELHI IGI T3</span>
          <span className="text-hopin-lime font-bold">94.8% AVG MATCH COMPATIBILITY</span>
          <span>100% VERIFIED PEER PASSENGERS</span>
          <span className="text-hopin-orange font-bold">AVG COMMUTER SAVINGS: ₹1,430 PER TRIP</span>
          <span>85% GUARANTEED DRIVER PAYOUT</span>
          <span className="text-hopin-blue font-bold">INNOVA CRYSTA FLEET</span>
        </div>
      </div>

      {/* SECTION 2: 3D MOVING CAR HIGHWAY SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-hopin-dark pb-4">
          <div>
            <div className="font-mono text-xs text-hopin-muted uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-hopin-blue" />
              <span>INTERACTIVE TELEMETRY & STEERING</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight">
              Live Highway Cab Simulator
            </h2>
          </div>
          <p className="font-sans text-xs text-hopin-muted max-w-md">
            Watch our simulated commercial cab cruise the NH-48 corridor. Move your cursor over the road to steer lanes, toggle neon underglow, or change cruising velocity!
          </p>
        </div>

        <Moving3DCarHighway />
      </section>

      {/* SECTION 3: AI ROUTE MATCHING VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="font-mono text-xs text-hopin-muted uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-hopin-lime" />
              <span>SPATIAL CONVERGENCE PROTOCOL</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight">
              Two Paths. One Shared Vehicle.
            </h2>
          </div>
          <p className="font-sans text-xs text-hopin-muted max-w-md">
            Our algorithm merges real-time routes traveling along identical corridors into a single vehicle with explainable compatibility scores and zero wasted fuel.
          </p>
        </div>

        <LiveMatchVisualizer />
      </section>

      {/* SECTION 4: TACTILE STICKY NOTES TESTIMONIALS & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-hopin-dark pb-4">
          <div>
            <span className="font-mono text-xs text-hopin-pink uppercase tracking-widest block mb-1 font-bold">
              [COMMUNITY EXPERIENCES // VERIFIED TRAVELERS]
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-hopin-dark uppercase">
              What Highway Commuters Say
            </h2>
          </div>
          <span className="font-mono text-xs text-hopin-muted">// AUTHENTIC POST-TRIP REVIEWS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <StickyNote 
            color="pink" 
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
            color="orange" 
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

      {/* SECTION 5: FINAL ART-DIRECTED CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-hopin-dark text-white rounded-2xl border-2 border-hopin-dark p-8 sm:p-12 shadow-[6px_6px_0px_0px_#FF4D8D] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-hopin-lime font-bold block">
              // READY FOR YOUR NEXT JOURNEY?
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase text-white">
              Hop In and Start Saving Today.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 max-w-lg">
              Reserve an individual seat or private cab across Jaipur, Delhi, and Ajmer. 100% verified identities with zero hidden surcharges.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/book"
              className="px-6 py-3.5 rounded-lg bg-hopin-pink hover:bg-pink-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-hopin-dark shadow-[3px_3px_0px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/matches"
              className="px-5 py-3.5 rounded-lg border-2 border-white/40 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              // AI Matches
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
