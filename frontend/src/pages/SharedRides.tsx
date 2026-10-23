import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRides, Ride } from '../services/api';
import { StickyNote } from '../components/StickyNote';
import { 
  Users, 
  MapPin, 
  Clock, 
  Calendar, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-mono page-transition">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-hopin-dark pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-hopin-pink mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[CORRIDOR CATALOG // SHARED POOLS]</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight uppercase">
            Active Shared Corridors
          </h1>
          <p className="font-sans text-xs sm:text-sm text-hopin-muted mt-1 max-w-2xl">
            Discover verified commuter requests heading in your exact direction. Split highway tolls and fuel expenses automatically.
          </p>
        </div>

        <Link
          to="/book"
          className="px-5 py-3 rounded-lg bg-hopin-pink hover:bg-pink-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-hopin-dark shadow-[3px_3px_0px_0px_#121624] flex items-center gap-2 self-start md:self-auto"
        >
          <Car className="w-4 h-4" />
          <span>Post Your Route</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#121624] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-hopin-muted absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by city, station, or commuter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-hopin-blue"
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
              className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all border-2 border-hopin-dark ${
                filterType === type.id 
                  ? 'bg-hopin-dark text-hopin-lime shadow-[2px_2px_0px_0px_#00E599]' 
                  : 'bg-white text-hopin-dark hover:bg-hopin-bg'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corridors Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs text-hopin-muted">// LOADING AVAILABLE HIGHWAY POOLS...</div>
      ) : filteredRides.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#121624] space-y-3">
          <Car className="w-10 h-10 text-hopin-muted mx-auto" />
          <h3 className="font-display font-black text-base text-hopin-dark">No shared pools match your criteria</h3>
          <p className="font-sans text-xs text-hopin-muted">Try clearing the search query or post a new booking to start a pool!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRides.map(ride => (
            <div
              key={ride.id}
              className="bg-white rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#121624] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#121624] transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border border-hopin-dark ${
                    ride.journeyType === 'interstate' ? 'bg-hopin-blue-light text-hopin-blue' :
                    ride.journeyType === 'outstation' ? 'bg-hopin-orange-light text-hopin-orange' :
                    'bg-hopin-pink-light text-hopin-pink'
                  }`}>
                    {ride.journeyType} CORRIDOR
                  </span>
                  <span className="font-bold uppercase text-hopin-dark bg-hopin-lime text-black px-2 py-0.5 rounded-sm border border-hopin-dark">
                    {ride.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2 pt-1 font-sans">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-hopin-pink mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] font-mono text-hopin-muted uppercase font-bold">PICKUP</p>
                      <p className="font-bold text-hopin-dark truncate">{ride.pickup.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-hopin-blue mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] font-mono text-hopin-muted uppercase font-bold">DESTINATION</p>
                      <p className="font-bold text-hopin-dark truncate">{ride.dropoff.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-hopin-dark bg-hopin-bg p-3 rounded-lg border-2 border-hopin-dark">
                  <span>{ride.travelDate}</span>
                  <span className="font-bold text-hopin-blue">{ride.departureTime}</span>
                  <span>{ride.passengerCount} SEAT</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-hopin-dark/20 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={ride.passengerAvatar} alt={ride.passengerName} className="w-8 h-8 rounded-lg object-cover border border-hopin-dark" />
                    <span className="font-bold text-hopin-dark font-sans">{ride.passengerName}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-hopin-muted line-through">₹{ride.privateFare}</p>
                    <p className="font-display font-black text-base text-hopin-dark">₹{ride.fare}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/ride/${ride.id}`}
                className="w-full py-2.5 rounded-lg border-2 border-hopin-dark bg-hopin-dark text-white hover:bg-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-[2px_2px_0px_0px_#121624]"
              >
                <span>INSPECT POOL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Community Sticky Notes Bulletin */}
      <div className="pt-6 border-t-2 border-hopin-dark space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-hopin-dark font-bold block">
          // COMMUNITY NOTES ON HIGHWAY CORRIDORS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StickyNote color="blue" badge="EXPRESSWAY" title="JAIPUR–DELHI TOLLS" rotation={-1.5} pin={true} author="Highway Telemetry">
            "NH-48 highway fastag tolls are integrated into the pooled fare. No out-of-pocket toll arguments between co-passengers."
          </StickyNote>
          <StickyNote color="pink" badge="LUGGAGE" title="TROLLEY LIMITS" rotation={2} tape={true} author="Captain Vikram">
            "Our Innova Crysta cabs easily fit 4 medium trolleys in the boot. Please mention if carrying extra oversized equipment."
          </StickyNote>
          <StickyNote color="yellow" badge="PUNCTUALITY" title="5-MIN CURB RULE" rotation={-1} pin={true} author="Safety Desk">
            "To keep shared rides fast for everyone, drivers wait a strict maximum of 5 mins at each pickup location before departing."
          </StickyNote>
        </div>
      </div>

    </div>
  );
};
