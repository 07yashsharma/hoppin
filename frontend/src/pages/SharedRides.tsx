import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRides, Ride } from '../services/api';
import { 
  Users, 
  MapPin, 
  Clock, 
  Calendar, 
  Search, 
  ArrowRight,
  Car
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hopin-border pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-hopin-muted font-bold block mb-1">
            [CORRIDOR CATALOG // SHARED POOLS]
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-hopin-dark tracking-tight uppercase">
            Active Shared Corridors
          </h1>
          <p className="font-sans text-xs sm:text-sm text-hopin-muted mt-1">
            Discover verified commuter requests heading in your exact direction. Split highway tolls and fuel expenses.
          </p>
        </div>

        <Link
          to="/book"
          className="px-4 py-2.5 rounded-xl bg-hopin-lime hover:bg-hopin-lime-hover text-hopin-dark font-display font-black text-xs uppercase tracking-wider transition-all border border-black shadow-[2px_2px_0px_0px_#171916] flex items-center gap-2 self-start md:self-auto"
        >
          <Car className="w-4 h-4" />
          <span>Post Your Route</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-hopin-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-hopin-muted absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by city, station, or commuter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-hopin-border bg-hopin-bg text-xs font-semibold text-hopin-dark focus:bg-white focus:outline-none focus:border-hopin-dark"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start md:self-auto text-xs">
          {['all', 'interstate', 'outstation', 'city'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all ${
                filterType === type ? 'bg-hopin-dark text-hopin-lime' : 'bg-hopin-bg text-hopin-muted hover:text-hopin-dark'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Corridors Grid */}
      {loading ? (
        <div className="p-16 text-center text-xs text-hopin-muted">LOADING AVAILABLE POOLS...</div>
      ) : filteredRides.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-hopin-border">
          <Car className="w-10 h-10 text-hopin-muted mx-auto mb-2" />
          <h3 className="font-display font-bold text-base text-hopin-dark">No shared pools match your criteria</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRides.map(ride => (
            <div
              key={ride.id}
              className="bg-white rounded-3xl border-2 border-hopin-border hover:border-hopin-dark transition-all p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-hopin-bg text-hopin-dark border border-hopin-border">
                    {ride.journeyType} CORRIDOR
                  </span>
                  <span className="font-bold uppercase text-hopin-dark bg-[#E8F8C8] px-2 py-0.5 rounded">
                    {ride.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-hopin-lime mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-hopin-muted uppercase font-bold">PICKUP</p>
                      <p className="font-bold text-hopin-dark truncate">{ride.pickup.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-hopin-cobalt mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-hopin-muted uppercase font-bold">DESTINATION</p>
                      <p className="font-bold text-hopin-dark truncate">{ride.dropoff.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-hopin-dark bg-[#FAF9F5] p-3 rounded-2xl border border-hopin-border">
                  <span>{ride.travelDate}</span>
                  <span className="font-bold">{ride.departureTime}</span>
                  <span>{ride.passengerCount} SEAT</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-hopin-border text-xs">
                  <div className="flex items-center gap-2">
                    <img src={ride.passengerAvatar} alt={ride.passengerName} className="w-7 h-7 rounded-lg object-cover" />
                    <span className="font-bold text-hopin-dark">{ride.passengerName}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-hopin-muted line-through">₹{ride.privateFare}</p>
                    <p className="font-display font-black text-sm text-hopin-dark">₹{ride.fare}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/ride/${ride.id}`}
                className="w-full py-2.5 rounded-xl border border-hopin-border hover:border-hopin-dark text-hopin-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>INSPECT POOL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
