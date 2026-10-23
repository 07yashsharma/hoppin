import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLocations, LocationItem } from '../services/api';
import { Interactive3DHeroObject } from '../components/Interactive3DHeroObject';
import { LiveMatchVisualizer } from '../components/LiveMatchVisualizer';
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
  Compass
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
    <div className="space-y-20 pb-20 overflow-hidden bg-hopin-bg">
      
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="pt-8 sm:pt-14 pb-12 border-b border-hopin-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Editorial Label Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-hopin-muted pb-6 border-b border-hopin-border mb-8 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-hopin-lime" />
              <span className="font-bold text-hopin-dark">URBAN MOBILITY / 01</span>
              <span>// CORRIDOR POOLING ARCHITECTURE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>BUILT FOR SHARED JOURNEYS</span>
              <span>•</span>
              <span className="text-hopin-dark font-bold">STATE OF RAJASTHAN & DELHI NCR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Oversized Typography & Booking Interface (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-hopin-dark leading-[0.95] tracking-tighter uppercase">
                  GOOD ROUTES.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-hopin-dark via-hopin-dark to-hopin-muted">
                    BETTER COMPANY.
                  </span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-hopin-muted max-w-xl leading-relaxed pt-2">
                  City to city, street to street. Find people heading your way, share a cab, and make the journey cost less.
                </p>
              </div>

              {/* CLEAN FUNCTIONAL BOOKING INTERFACE */}
              <div className="bg-white rounded-3xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916] p-6 sm:p-7 space-y-5">
                
                {/* Journey Scope Switcher */}
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setJourneyType('interstate')}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-colors ${
                      journeyType === 'interstate' ? 'bg-hopin-dark text-hopin-lime' : 'bg-hopin-bg text-hopin-muted hover:text-hopin-dark'
                    }`}
                  >
                    Interstate (Delhi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJourneyType('outstation')}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-colors ${
                      journeyType === 'outstation' ? 'bg-hopin-dark text-hopin-lime' : 'bg-hopin-bg text-hopin-muted hover:text-hopin-dark'
                    }`}
                  >
                    Outstation (Ajmer)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJourneyType('city')}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-colors ${
                      journeyType === 'city' ? 'bg-hopin-dark text-hopin-lime' : 'bg-hopin-bg text-hopin-muted hover:text-hopin-dark'
                    }`}
                  >
                    City (Jaipur)
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  
                  {/* FROM / TO GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* FROM */}
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-hopin-lime" />
                        FROM
                      </label>
                      <select
                        value={pickupId}
                        onChange={(e) => setPickupId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-hopin-border bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
                      >
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                        ))}
                      </select>
                    </div>

                    {/* TO */}
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-hopin-cobalt" />
                        TO
                      </label>
                      <select
                        value={dropoffId}
                        onChange={(e) => setDropoffId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-hopin-border bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
                      >
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  {/* WHEN / PASSENGERS / FIND A RIDE ROW */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    
                    {/* WHEN */}
                    <div className="sm:col-span-4 space-y-1">
                      <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted">
                        WHEN
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full px-2.5 py-2.5 rounded-xl border border-hopin-border bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
                        />
                      </div>
                    </div>

                    {/* PASSENGERS */}
                    <div className="sm:col-span-3 space-y-1">
                      <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-hopin-muted">
                        PASSENGERS
                      </label>
                      <select
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(Number(e.target.value))}
                        className="w-full px-2.5 py-2.5 rounded-xl border border-hopin-border bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 People</option>
                        <option value={3}>3 People</option>
                      </select>
                    </div>

                    {/* FIND A RIDE CTA BUTTON */}
                    <div className="sm:col-span-5">
                      <button
                        type="submit"
                        className="w-full py-3 px-5 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-black text-xs uppercase tracking-wider transition-all border border-black shadow-[2px_2px_0px_0px_#171916] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <span>FIND A RIDE</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </form>

                {/* Popular Route Presets */}
                <div className="pt-2 border-t border-hopin-border flex items-center flex-wrap gap-2 font-mono text-[11px] text-hopin-muted">
                  <span className="font-bold text-hopin-dark uppercase">CORRIDORS:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupId('loc_jpr_station');
                      setDropoffId('loc_del_igi_t3');
                      setJourneyType('interstate');
                    }}
                    className="hover:text-hopin-dark hover:underline transition-colors"
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
                    className="hover:text-hopin-dark hover:underline transition-colors"
                  >
                    JAIPUR → AJMER SHARIF
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column: Interactive 3D Route Sculpture (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
              <Interactive3DHeroObject />
            </div>

          </div>

        </div>
      </section>

      {/* TICKER MARQUEE TAPE */}
      <div className="bg-hopin-dark text-[#D8D6CD] py-2.5 border-y border-[#2C3029] font-mono text-xs overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-hopin-lime font-bold">HOPIN // CORRIDOR ACTIVE</span>
          <span>JAIPUR JUNCTION ↔ DELHI IGI T3</span>
          <span className="text-hopin-lime">★ 94.8% AVG MATCH COMPATIBILITY</span>
          <span>100% VERIFIED PEER IDENTITIES</span>
          <span className="text-hopin-orange font-bold">AVG SAVINGS: ₹1,430 PER RIDE</span>
          <span>85% RECONCILED DRIVER PAYOUT</span>
          <span className="text-hopin-lime font-bold">HOPIN // ZERO EMPTY SEATS</span>
          <span>JAIPUR JUNCTION ↔ DELHI IGI T3</span>
          <span className="text-hopin-lime">★ 94.8% AVG MATCH COMPATIBILITY</span>
          <span>100% VERIFIED PEER IDENTITIES</span>
          <span className="text-hopin-orange font-bold">AVG SAVINGS: ₹1,430 PER RIDE</span>
        </div>
      </div>

      {/* SECTION 2: AI ROUTE MATCHING VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-[11px] text-hopin-muted uppercase tracking-widest flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-hopin-lime" />
              <span>SPATIAL CONVERGENCE PROTOCOL</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-hopin-dark tracking-tight">
              Two Paths. One Shared Vehicle.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-hopin-muted max-w-md">
            Our algorithm merges real-time routes traveling along identical corridors into a single vehicle with explainable compatibility scores and zero wasted fuel.
          </p>
        </div>

        <LiveMatchVisualizer />
      </section>

      {/* SECTION 3: EDITORIAL HOW IT WORKS (ASYMMETRIC) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-b border-hopin-border pb-4 mb-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-hopin-muted font-bold block mb-1">
            [MECHANICS // 03 STEPS]
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight uppercase">
            How Shared Mobility Functions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-7 rounded-3xl border border-hopin-border shadow-sm flex flex-col justify-between space-y-6">
            <span className="font-mono font-bold text-2xl text-hopin-dark">01 //</span>
            <div>
              <h3 className="font-display font-bold text-lg text-hopin-dark mb-2">Declare Your Schedule</h3>
              <p className="font-sans text-xs text-hopin-muted leading-relaxed">
                Choose your pickup point, destination, and acceptable detour limit (10 to 45 mins). Select shared pooling to enable co-passenger discovery.
              </p>
            </div>
            <div className="font-mono text-[10px] text-hopin-muted uppercase tracking-wider pt-2 border-t border-hopin-border">
              SCHEDULE TOLERANCE: ENFORCED
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-hopin-border shadow-sm flex flex-col justify-between space-y-6">
            <span className="font-mono font-bold text-2xl text-hopin-cobalt">02 //</span>
            <div>
              <h3 className="font-display font-bold text-lg text-hopin-dark mb-2">Algorithmic Vector Alignment</h3>
              <p className="font-sans text-xs text-hopin-muted leading-relaxed">
                The engine evaluates highway heading bearing, detour math, vehicle capacity, and departure time delta. If $\cos(\Delta \theta) &lt; 0.45$, divergent trips are safely rejected.
              </p>
            </div>
            <div className="font-mono text-[10px] text-hopin-muted uppercase tracking-wider pt-2 border-t border-hopin-border">
              SPATIAL SIMILARITY: DETERMINISTIC
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-hopin-border shadow-sm flex flex-col justify-between space-y-6">
            <span className="font-mono font-bold text-2xl text-hopin-lime">03 //</span>
            <div>
              <h3 className="font-display font-bold text-lg text-hopin-dark mb-2">Mutual Confirmation & Dispatch</h3>
              <p className="font-sans text-xs text-hopin-muted leading-relaxed">
                Both travelers preview verified co-passenger reviews and approve the match. A commercial Innova Crysta is dispatched with instant 85% driver reconciliation.
              </p>
            </div>
            <div className="font-mono text-[10px] text-hopin-muted uppercase tracking-wider pt-2 border-t border-hopin-border">
              VEHICLE DISPATCH: MUTUAL CONSENT
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 4: EDITORIAL TESTIMONIALS & TRUST */}
      <section className="bg-hopin-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2C3029] pb-6">
            <div>
              <span className="font-mono text-xs text-hopin-lime uppercase tracking-widest block mb-1">
                [COMMUNITY VOICES // VERIFIED DATA]
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white uppercase">
                Commuters on the Golden Corridor
              </h2>
            </div>
            <span className="font-mono text-xs text-hopin-muted">POST-TRIP REVIEWS EXCLUSIVELY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            <div className="p-6 rounded-3xl bg-[#1C201A] border border-[#2B3127] space-y-4">
              <div className="flex items-center gap-1 text-hopin-lime">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-hopin-lime" />
                ))}
              </div>
              <p className="font-sans text-xs text-[#D8D6CD] italic leading-relaxed">
                "Weekly commute from Jaipur Junction to Cyber Hub Gurugram used to be a financial headache at ₹3,800. Matched with Priya through hopin, paid ₹2,320, and the cab was a clean Innova Crysta."
              </p>
              <div className="pt-3 border-t border-[#292F24] flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Rohan" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-white text-xs">Rohan Sharma</p>
                  <p className="text-[10px] text-hopin-muted">PRODUCT DESIGNER • 38 RIDES</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#1C201A] border border-[#2B3127] space-y-4">
              <div className="flex items-center gap-1 text-hopin-lime">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-hopin-lime" />
                ))}
              </div>
              <p className="font-sans text-xs text-[#D8D6CD] italic leading-relaxed">
                "Verified badges and identity checks give me total peace of mind on the highway. Being able to inspect peer reviews beforehand makes all the difference."
              </p>
              <div className="pt-3 border-t border-[#292F24] flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Priya" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-white text-xs">Priya Patel</p>
                  <p className="text-[10px] text-hopin-muted">CONSULTANT • 26 RIDES</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#1C201A] border border-[#2B3127] space-y-4">
              <div className="flex items-center gap-1 text-hopin-lime">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-hopin-lime" />
                ))}
              </div>
              <p className="font-sans text-xs text-[#D8D6CD] italic leading-relaxed">
                "The detour was only 8 minutes to pick up another passenger visiting SMS Hospital in Jaipur. Smooth coordination and our shared fare was transparent down to the rupee."
              </p>
              <div className="pt-3 border-t border-[#292F24] flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Sneha" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-white text-xs">Dr. Sneha Kulkarni</p>
                  <p className="text-[10px] text-hopin-muted">HEALTHCARE SPECIALIST • 42 RIDES</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: FINAL ART-DIRECTED CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-hopin-dark p-8 sm:p-14 shadow-[6px_6px_0px_0px_#171916] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-hopin-muted font-bold block">
              [COMMUTER ONBOARDING]
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight uppercase">
              Ready to Share Your Next Corridor?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-hopin-muted max-w-lg">
              Reserve an individual seat or private cab across Jaipur, Delhi, and Ajmer. 100% verified identities with zero hidden surcharges.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/book"
              className="px-6 py-3.5 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-black text-xs uppercase tracking-wider transition-all border border-black shadow-[3px_3px_0px_0px_#171916] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
            >
              <span>Book a Ride</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/matches"
              className="px-5 py-3.5 rounded-xl border border-hopin-border hover:border-hopin-dark text-hopin-dark font-mono text-xs font-bold transition-colors"
            >
              // AI MATCHES
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
