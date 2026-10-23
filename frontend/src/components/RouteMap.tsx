import React from 'react';
import { MapPin, Navigation, Car, Shield, Compass, CheckCircle2 } from 'lucide-react';

interface Waypoint {
  order?: number;
  type: 'pickup' | 'dropoff';
  label: string;
  locationName: string;
  lat?: number;
  lng?: number;
  passenger?: string;
  time?: string;
}

interface RouteMapProps {
  pickupName?: string;
  dropoffName?: string;
  pickupCoord?: { lat: number; lng: number };
  dropoffCoord?: { lat: number; lng: number };
  waypoints?: Waypoint[];
  distanceKm?: number;
  durationMinutes?: number;
  activeVehicle?: {
    model: string;
    plate: string;
    driverName: string;
    status?: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
    checkpoint?: string;
  };
  heightClass?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  pickupName = "Jaipur Junction Railway Station",
  dropoffName = "Delhi IGI Airport (DEL) T3",
  waypoints,
  distanceKm = 265,
  durationMinutes = 270,
  activeVehicle,
  currentLocation,
  heightClass = "h-80"
}) => {
  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;
  const timeFormatted = hours > 0 ? `${hours}h ${mins}m` : `${mins} mins`;

  const displayWaypoints = waypoints || [
    { order: 1, type: 'pickup', label: 'P1', locationName: pickupName, passenger: 'Passenger A', time: '07:00 AM' },
    { order: 2, type: 'pickup', label: 'P2', locationName: 'Ajmer Road / 200 Ft Bypass', passenger: 'Passenger B', time: '07:18 AM' },
    { order: 3, type: 'dropoff', label: 'D1', locationName: dropoffName, passenger: 'Combined Drop', time: '11:45 AM' }
  ];

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border-2 border-hopin-dark bg-hopin-dark p-4 font-mono flex flex-col justify-between shadow-[3px_3px_0px_0px_#171916]`}>
      
      {/* Background Cartographic Vector Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hopinMapGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E5E3DA" strokeWidth="0.75" />
            </pattern>
            <linearGradient id="corridorGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#345CFF" />
              <stop offset="50%" stopColor="#C5F55A" />
              <stop offset="100%" stopColor="#C5F55A" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hopinMapGrid)" />
          
          <path
            d="M 60 250 Q 180 210, 240 160 T 360 110 T 520 60"
            fill="none"
            stroke="url(#corridorGlow)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
        </svg>
      </div>

      {/* Floating Top Status Bar */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="bg-[#1C201A] border border-[#2D3328] rounded-xl px-3 py-1.5 text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hopin-lime animate-pulse" />
          <span className="font-bold text-hopin-lime">NH48 // CORRIDOR TELEMETRY</span>
          <span className="text-slate-400 font-normal">({distanceKm} KM • {timeFormatted})</span>
        </div>

        {activeVehicle && (
          <div className="bg-[#1C201A] border border-hopin-lime/40 rounded-xl px-2.5 py-1 text-[11px] text-hopin-lime font-bold flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" />
            <span>{activeVehicle.model} ({activeVehicle.plate})</span>
          </div>
        )}
      </div>

      {/* Waypoints Sequence Display */}
      <div className="relative z-10 my-auto py-2">
        <div className="flex items-center justify-between max-w-xl mx-auto px-4">
          
          {/* Pickup 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-xl bg-hopin-lime text-hopin-dark flex items-center justify-center font-bold text-xs shadow-md">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="mt-1 text-[10px] font-bold text-white max-w-[95px] truncate">
              {displayWaypoints[0]?.locationName || pickupName}
            </span>
            <span className="text-[9px] text-hopin-lime">P1 (07:00)</span>
          </div>

          <div className="flex-1 mx-2 h-0.5 bg-gradient-to-r from-hopin-lime to-hopin-cobalt relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1C201A] border border-[#2D3328] px-1.5 py-0.5 rounded text-[9px] text-slate-300">
              +11m
            </div>
          </div>

          {/* Pickup 2 */}
          {displayWaypoints.length > 2 && (
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-xl bg-hopin-cobalt text-white flex items-center justify-center font-bold text-xs shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="mt-1 text-[10px] font-bold text-white max-w-[105px] truncate">
                {displayWaypoints[1]?.locationName || "Ajmer Rd"}
              </span>
              <span className="text-[9px] text-[#7490FF]">P2 (07:18)</span>
            </div>
          )}

          <div className="flex-1 mx-2 h-0.5 bg-gradient-to-r from-hopin-cobalt to-hopin-lime relative">
            {currentLocation && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-hopin-lime text-hopin-dark font-black px-1.5 py-0.5 rounded text-[9px] shadow animate-pulse">
                VEHICLE EN ROUTE
              </div>
            )}
          </div>

          {/* Dropoff */}
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-xl bg-white text-hopin-dark flex items-center justify-center font-bold text-xs shadow-md">
              <CheckCircle2 className="w-4 h-4 text-hopin-dark" />
            </div>
            <span className="mt-1 text-[10px] font-bold text-white max-w-[110px] truncate">
              {displayWaypoints[displayWaypoints.length - 1]?.locationName || dropoffName}
            </span>
            <span className="text-[9px] text-white">DELHI T3</span>
          </div>

        </div>
      </div>

      {/* Bottom Coordinates Strip */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 bg-[#161814] rounded-xl p-2 border border-[#2A2E26]">
        <span>CHECKPOINT: BEHROR OASIS MIDWAY (NH48)</span>
        <span className="text-hopin-lime font-bold">GPS MONITORED</span>
      </div>

    </div>
  );
};
