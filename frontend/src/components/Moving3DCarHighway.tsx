import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Zap, 
  Lightbulb, 
  Volume2, 
  Gauge, 
  MapPin, 
  Users, 
  Compass, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const Moving3DCarHighway: React.FC = () => {
  const [speed, setSpeed] = useState<number>(100); // km/h
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [carColor, setCarColor] = useState<'blue' | 'pink' | 'orange' | 'lime'>('blue');
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [lanePosition, setLanePosition] = useState<number>(50); // percentage across highway (0-100)
  const [honking, setHonking] = useState<boolean>(false);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(142); // km
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(1);

  const waypoints = [
    { name: "Jaipur Junction", km: 0, time: "06:00 AM" },
    { name: "Neemrana Hub", km: 145, time: "08:15 AM" },
    { name: "Cyber Hub Gurugram", km: 235, time: "09:30 AM" },
    { name: "Delhi IGI Airport T3", km: 260, time: "10:00 AM" },
  ];

  // Colors dictionary for the car
  const carStyles = {
    blue: {
      body: 'from-blue-600 via-indigo-600 to-blue-700',
      accent: '#3B82F6',
      glow: 'shadow-[0_15px_35px_rgba(59,130,246,0.6)]',
      beam: 'from-cyan-300/60 to-transparent',
      name: 'Cobalt Express'
    },
    pink: {
      body: 'from-pink-500 via-rose-500 to-pink-600',
      accent: '#EC4899',
      glow: 'shadow-[0_15px_35px_rgba(236,72,153,0.6)]',
      beam: 'from-pink-200/60 to-transparent',
      name: 'Bubblegum Shuttle'
    },
    orange: {
      body: 'from-amber-500 via-orange-500 to-red-500',
      accent: '#F97316',
      glow: 'shadow-[0_15px_35px_rgba(249,115,22,0.6)]',
      beam: 'from-amber-200/60 to-transparent',
      name: 'Sunset Cruiser'
    },
    lime: {
      body: 'from-emerald-400 via-teal-500 to-emerald-600',
      accent: '#10B981',
      glow: 'shadow-[0_15px_35px_rgba(16,185,129,0.6)]',
      beam: 'from-teal-200/60 to-transparent',
      name: 'Neo Mint Pod'
    }
  };

  // Highway drive timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDistanceTraveled(prev => {
        const next = prev + (speed / 3600) * 10;
        if (next >= 260) return 0; // loop
        return Math.round(next * 10) / 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Update active waypoint
  useEffect(() => {
    if (distanceTraveled < 70) setActiveSegmentIndex(0);
    else if (distanceTraveled < 190) setActiveSegmentIndex(1);
    else if (distanceTraveled < 250) setActiveSegmentIndex(2);
    else setActiveSegmentIndex(3);
  }, [distanceTraveled]);

  const triggerHonk = () => {
    setHonking(true);
    setTimeout(() => setHonking(false), 800);
  };

  return (
    <div className="w-full bg-hopin-dark text-white rounded-2xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#121624] overflow-hidden">
      
      {/* Top Telemetry Header */}
      <div className="px-5 py-3.5 bg-hopin-dark-surface border-b-2 border-hopin-dark flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-hopin-lime font-bold uppercase tracking-wider">
            LIVE 3D HIGHWAY SIMULATION // NH-48 EXPRESSWAY
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-300">
          <span>SPEED: <strong className="text-white text-xs">{speed} KM/H</strong></span>
          <span>•</span>
          <span>KM: <strong className="text-white text-xs">{distanceTraveled.toFixed(1)} / 260 KM</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">SHARED CAB OCCUPANCY: 2/4 SEATS</span>
        </div>
      </div>

      {/* 3D Perspective Road Stage */}
      <div 
        className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-[#0F1423] via-[#141C33] to-[#1D253E] overflow-hidden flex flex-col justify-end select-none cursor-pointer"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = Math.max(15, Math.min(85, (x / rect.width) * 100));
          setLanePosition(pct);
        }}
      >
        {/* Distant skyline with mountains & night stars */}
        <div className="absolute top-0 inset-x-0 h-28 pointer-events-none opacity-40">
          <div className="absolute top-4 left-10 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full" />
          <div className="absolute top-6 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" />
          <div className="absolute top-10 right-16 w-1.5 h-1.5 bg-yellow-200 rounded-full" />
          
          {/* Subtle glowing moon */}
          <div className="absolute top-5 right-24 w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-100 to-amber-200 shadow-[0_0_25px_rgba(254,240,138,0.4)] opacity-80" />
        </div>

        {/* Highway Horizon Guideline */}
        <div className="absolute top-28 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* 3D PERSPECTIVE HIGHWAY SURFACE */}
        <div 
          className="relative w-full h-44 overflow-hidden"
          style={{
            perspective: '400px',
            perspectiveOrigin: '50% 20%'
          }}
        >
          {/* Road Asphalt Bed */}
          <div 
            className="w-[140%] -ml-[20%] h-full bg-[#1A1E29] border-t-2 border-zinc-700 relative"
            style={{
              transform: 'rotateX(55deg)',
              transformOrigin: '50% 0%'
            }}
          >
            {/* Left and Right Shoulder Glow Lines */}
            <div className="absolute left-12 inset-y-0 w-2 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_12px_#F59E0B]" />
            <div className="absolute right-12 inset-y-0 w-2 bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_12px_#F59E0B]" />

            {/* Left Lane Dashed White Line */}
            <div className="absolute left-1/3 inset-y-0 w-1 animated-road opacity-80" />

            {/* Center Express Line (Cyan / Lime) */}
            <div className="absolute left-1/2 -ml-0.5 inset-y-0 w-1.5 animated-road opacity-100 shadow-[0_0_8px_#38BDF8]" />

            {/* Right Lane Dashed White Line */}
            <div className="absolute right-1/3 inset-y-0 w-1 animated-road opacity-80" />
          </div>
        </div>

        {/* THE 3D CAR VEHICLE (Positioned dynamically on road) */}
        <div 
          className="absolute bottom-8 transition-all duration-150 ease-out z-20 pointer-events-none"
          style={{
            left: `${lanePosition}%`,
            transform: `translateX(-50%) ${honking ? 'scale(1.08) translateY(-4px)' : 'scale(1)'}`
          }}
        >
          {/* Honk Soundwaves Indicator */}
          {honking && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 font-mono text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold shadow-lg animate-bounce">
              <Volume2 className="w-3 h-3" />
              <span>BEEP BEEP!</span>
            </div>
          )}

          {/* Dual Headlight Beams (Projection on road) */}
          {headlightsOn && (
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none">
              <div 
                className={`w-full h-full bg-gradient-to-t ${carStyles[carColor].beam} to-transparent`}
                style={{
                  clipPath: 'polygon(35% 100%, 0% 0%, 100% 0%, 65% 100%)',
                  filter: 'blur(3px)'
                }}
              />
            </div>
          )}

          {/* Car Body 3D Representation */}
          <div className="relative w-28 h-16 flex flex-col items-center">
            
            {/* Neon Underglow */}
            <div 
              className={`absolute bottom-0 inset-x-2 h-4 rounded-full blur-md opacity-90 ${carStyles[carColor].glow}`}
              style={{ backgroundColor: carStyles[carColor].accent }}
            />

            {/* Cabin Top (Roof & Windshield with passenger heads visible) */}
            <div className="relative w-16 h-8 bg-zinc-900 rounded-t-xl border border-zinc-700 overflow-hidden shadow-inner flex items-center justify-center gap-2 px-2">
              {/* Windshield Reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 via-transparent to-black/60 pointer-events-none" />
              
              {/* Passenger Rohan & Priya silhouette / avatars */}
              <div className="w-4 h-4 rounded-full bg-pink-400 border border-white/50 text-[7px] font-bold text-black flex items-center justify-center shadow-sm">
                R
              </div>
              <div className="w-4 h-4 rounded-full bg-cyan-400 border border-white/50 text-[7px] font-bold text-black flex items-center justify-center shadow-sm">
                P
              </div>
            </div>

            {/* Main Chassis Body */}
            <div className={`relative w-28 h-8 rounded-lg bg-gradient-to-r ${carStyles[carColor].body} border-2 border-white/30 shadow-lg flex items-center justify-between px-2`}>
              {/* Left Headlight */}
              <div className={`w-3 h-3 rounded-full ${headlightsOn ? 'bg-cyan-200 shadow-[0_0_12px_#38BDF8]' : 'bg-zinc-600'}`} />

              {/* Front Grille & Hopin emblem */}
              <div className="flex flex-col items-center">
                <span className="text-[7px] font-mono font-black text-white tracking-widest">HOPIN</span>
                <div className="w-6 h-1 bg-black/40 rounded-full" />
              </div>

              {/* Right Headlight */}
              <div className={`w-3 h-3 rounded-full ${headlightsOn ? 'bg-cyan-200 shadow-[0_0_12px_#38BDF8]' : 'bg-zinc-600'}`} />
            </div>

            {/* Spinning Wheels */}
            <div className="absolute -bottom-1.5 inset-x-2 flex justify-between px-1">
              <div className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400 shadow-md flex items-center justify-center animate-spin">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              </div>
              <div className="w-5 h-5 rounded-full bg-black border-2 border-zinc-400 shadow-md flex items-center justify-center animate-spin">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              </div>
            </div>

          </div>
        </div>

        {/* Highway Waypoint Indicator Marker on Road */}
        <div className="absolute bottom-3 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-[11px] font-mono flex items-center gap-2 z-10">
          <MapPin className="w-3.5 h-3.5 text-pink-400" />
          <span>APPROACHING: <strong>{waypoints[activeSegmentIndex]?.name}</strong></span>
        </div>

      </div>

      {/* Interactive Control Dashboard */}
      <div className="p-5 bg-hopin-dark-card border-t-2 border-hopin-dark grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
        
        {/* Control 1: Speed Controls */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>CRUISE VELOCITY ({speed} KM/H)</span>
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="range" 
              min={40} 
              max={160} 
              step={10}
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-hopin-pink cursor-pointer h-1.5 bg-zinc-700 rounded-lg"
            />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400">
            <button onClick={() => setSpeed(60)} className="hover:text-white">City (60)</button>
            <button onClick={() => setSpeed(100)} className="hover:text-white font-bold text-white">Express (100)</button>
            <button onClick={() => setSpeed(140)} className="hover:text-white">Turbo (140)</button>
          </div>
        </div>

        {/* Control 2: Color Customizer */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>NEON CAB FINISH</span>
          </label>
          <div className="flex items-center gap-2 pt-1">
            {[
              { id: 'blue', color: 'bg-blue-500', name: 'Blue' },
              { id: 'pink', color: 'bg-pink-500', name: 'Pink' },
              { id: 'orange', color: 'bg-orange-500', name: 'Orange' },
              { id: 'lime', color: 'bg-emerald-500', name: 'Mint' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCarColor(c.id as any)}
                className={`w-6 h-6 rounded-md ${c.color} border-2 transition-transform ${carColor === c.id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70'}`}
                title={c.name}
              />
            ))}
            <span className="text-[11px] text-zinc-300 ml-1">{carStyles[carColor].name}</span>
          </div>
        </div>

        {/* Control 3: Interactive Toggles */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>INTERACTIVE ACTIONS</span>
          </label>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setHeadlightsOn(!headlightsOn)}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all ${headlightsOn ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
            >
              <Lightbulb className="w-3 h-3" />
              <span>{headlightsOn ? 'Beams ON' : 'Beams OFF'}</span>
            </button>
            <button
              onClick={triggerHonk}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <Volume2 className="w-3 h-3" />
              <span>Honk</span>
            </button>
          </div>
        </div>

        {/* Control 4: Pause/Drive & Steering Info */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-zinc-400 uppercase font-bold">
            DRIVE CONTROLS
          </label>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all ${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-black'}`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Drive'}</span>
            </button>
            <span className="text-[10px] text-zinc-400 leading-tight">
              Move cursor over road to steer cab!
            </span>
          </div>
        </div>

      </div>

      {/* Waypoint Corridor Ticker */}
      <div className="px-5 py-3 bg-[#0B0E17] border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
        {waypoints.map((wp, idx) => {
          const isPassed = distanceTraveled >= wp.km;
          const isCurrent = activeSegmentIndex === idx;
          return (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-pink-500 animate-ping' : isPassed ? 'bg-emerald-400' : 'bg-zinc-700'}`} />
              <div>
                <p className={`text-[11px] font-bold ${isCurrent ? 'text-pink-400' : isPassed ? 'text-white' : 'text-zinc-500'}`}>
                  {wp.name}
                </p>
                <p className="text-[9px] text-zinc-500">{wp.km} KM • {wp.time}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
