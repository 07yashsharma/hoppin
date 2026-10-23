import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRides, Ride } from '../services/api';
import { StickyNote } from '../components/StickyNote';
import { 
  Search, 
  ArrowRight,
  Car,
  Sparkles
} from 'lucide-react';

export const SharedRides: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'interstate' | 'outstation' | 'city'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getRides().then(data => {
      setRides(data.filter(r => r.rideType === 'shared'));
      setLoading(false);
    }).catch(console.error);
  }, []);

  const filteredRides = rides.filter(ride => {
    const matchesType = filterType === 'all' || ride.journeyType === filterType;
    const matchesSearch = 
      ride.pickup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.dropoff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.passengerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 font-mono bg-bg text-primary page-transition">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[CORRIDOR CATALOG // SHARED POOLS]</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight uppercase">
            Active Shared Corridors
          </h1>
          <p className="font-sans text-xs sm:text-sm text-secondary mt-1 max-w-2xl">
            Discover verified commuter requests heading in your exact direction. Split highway tolls and fuel expenses automatically.
          </p>
        </div>

        <Link
          to="/book"
          className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle flex items-center gap-2 self-start md:self-auto"
        >
          <Car className="w-4 h-4" />
          <span>Post Your Route</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-elevated flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by city, station, or commuter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-secondary text-xs font-semibold text-primary focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs">
          {[
            { id: 'all', label: 'All Corridors' },
            { id: 'interstate', label: 'Interstate' },
            { id: 'outstation', label: 'Outstation' },
            { id: 'city', label: 'City' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id as any)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider font-semibold transition-all border ${
                filterType === type.id 
                  ? 'bg-accent text-white border-accent shadow-subtle' 
                  : 'bg-secondary text-secondary border-border hover:bg-elevated hover:text-primary'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corridors Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs text-muted">// LOADING AVAILABLE HIGHWAY POOLS...</div>
      ) : filteredRides.length === 0 ? (
        <div className="p-16 text-center bg-card rounded-2xl border border-border shadow-subtle space-y-3">
          <Car className="w-10 h-10 text-muted mx-auto" />
          <h3 className="font-display font-bold text-base text-primary">No shared pools match your criteria</h3>
          <p className="font-sans text-xs text-muted">Try clearing the search query or post a new booking to start a pool!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRides.map(ride => (
            <div
              key={ride.id}
              className="bg-card rounded-2xl border border-border shadow-subtle hover:border-accent/40 transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    ride.journeyType === 'interstate' ? 'bg-accent/15 text-accent border-accent/25' :
                    ride.journeyType === 'outstation' ? 'bg-sky-500/15 text-sky-400 border-sky-500/25' :
                    'bg-purple-500/15 text-purple-400 border-purple-500/25'
                  }`}>
                    {ride.journeyType} CORRIDOR
                  </span>
                  <span className="font-semibold uppercase text-emerald-400 bg-success-surface px-2 py-0.5 rounded-md border border-emerald-500/25">
                    {ride.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2 pt-1 font-sans">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] font-mono text-muted uppercase font-semibold">PICKUP</p>
                      <p className="font-semibold text-primary truncate">{ride.pickup.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] font-mono text-muted uppercase font-semibold">DESTINATION</p>
                      <p className="font-semibold text-primary truncate">{ride.dropoff.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-primary bg-secondary p-3 rounded-xl border border-border">
                  <span>{ride.travelDate}</span>
                  <span className="font-semibold text-accent">{ride.departureTime}</span>
                  <span>{ride.passengerCount} SEAT</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                  <div className="flex items-center gap-2">
                    <img src={ride.passengerAvatar} alt={ride.passengerName} className="w-8 h-8 rounded-lg object-cover border border-border" />
                    <span className="font-semibold text-primary font-sans">{ride.passengerName}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted line-through">₹{ride.privateFare}</p>
                    <p className="font-display font-bold text-base text-accent">₹{ride.fare}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/ride/${ride.id}`}
                className="w-full py-2.5 rounded-xl border border-border bg-secondary hover:bg-elevated hover:text-accent text-primary font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-subtle"
              >
                <span>INSPECT POOL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Community Sticky Notes Bulletin */}
      <div className="pt-6 border-t border-border space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold block">
          // COMMUNITY NOTES ON HIGHWAY CORRIDORS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StickyNote color="blue" badge="EXPRESSWAY" title="JAIPUR–DELHI TOLLS" rotation={-1.5} pin={true} author="Highway Telemetry">
            "NH-48 highway fastag tolls are integrated into the pooled fare. No out-of-pocket toll arguments between co-passengers."
          </StickyNote>
          <StickyNote color="pink" badge="LUGGAGE" title="TROLLEY LIMITS" rotation={2} tape={true} author="Captain Vikram">
            "Our Innova Crysta cabs easily fit 4 medium trolleys in the boot. Please mention if carrying extra oversized equipment."
          </StickyNote>
          <StickyNote color="mint" badge="PUNCTUALITY" title="5-MIN CURB RULE" rotation={-1} pin={true} author="Safety Desk">
            "To keep shared rides fast for everyone, drivers wait a strict maximum of 5 mins at each pickup location before departing."
          </StickyNote>
        </div>
      </div>

    </div>
  );
};
