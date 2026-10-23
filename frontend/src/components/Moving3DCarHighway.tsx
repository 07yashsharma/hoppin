import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Zap, 
  Lightbulb, 
  Volume2, 
  Gauge, 
  MapPin, 
  Sparkles 
} from 'lucide-react';

export const Moving3DCarHighway: React.FC = () => {
  const [speed, setSpeed] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [carColor, setCarColor] = useState<'blue' | 'pink' | 'orange' | 'lime'>('blue');
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [lanePosition, setLanePosition] = useState<number>(50);
  const [honking, setHonking] = useState<boolean>(false);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(142);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(1);

  const waypoints = [
    { name: "Jaipur Junction", km: 0, time: "06:00 AM" },
    { name: "Neemrana Hub", km: 145, time: "08:15 AM" },
    { name: "Cyber Hub Gurugram", km: 235, time: "09:30 AM" },
    { name: "Delhi IGI Airport T3", km: 260, time: "10:00 AM" },
  ];

  const carStyles = {
    blue: {
      body: 'from-blue-600 via-indigo-600 to-blue-700',
      accent: '#8B8DFF',
      glow: 'shadow-[0_15px_35px_rgba(139,141,255,0.4)]',
      beam: 'from-sky-300/40 to-transparent',
      name: 'Cobalt Express'
    },
    pink: {
      body: 'from-pink-500 via-rose-500 to-pink-600',
      accent: '#EC4899',
      glow: 'shadow-[0_15px_35px_rgba(236,72,153,0.4)]',
      beam: 'from-pink-200/40 to-transparent',
      name: 'Bubblegum Shuttle'
    },
    orange: {
      body: 'from-amber-500 via-orange-500 to-red-500',
      accent: '#F97316',
      glow: 'shadow-[0_15px_35px_rgba(249,115,22,0.4)]',
      beam: 'from-amber-200/40 to-transparent',
      name: 'Sunset Cruiser'
    },
    lime: {
      body: 'from-emerald-400 via-teal-500 to-emerald-600',
      accent: '#34D399',
      glow: 'shadow-[0_15px_35px_rgba(52,211,153,0.4)]',
      beam: 'from-emerald-200/40 to-transparent',
      name: 'Neo Mint Pod'
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDistanceTraveled(prev => {
        const next = prev + (speed / 3600) * 10;
        if (next >= 260) return 0;
        return Math.round(next * 10) / 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

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
    <div className="w-full bg-card text-primary rounded-2xl border border-border shadow-elevated overflow-hidden">
      
      {/* Top Telemetry Header */}
      <div className="px-5 py-3.5 bg-secondary border-b border-border flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-accent font-semibold uppercase tracking-wider">
            LIVE 3D HIGHWAY SIMULATION // NH-48 EXPRESSWAY
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-muted">
          <span>SPEED: <strong className="text-primary">{speed} KM/H</strong></span>
          <span>•</span>
          <span>KM: <strong className="text-primary">{distanceTraveled.toFixed(1)} / 260 KM</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">SHARED CAB OCCUPANCY: 2/4 SEATS</span>
        </div>
      </div>

      {/* 3D Perspective Road Stage */}
      <div 
        className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-[#0B0C0E] via-[#12141A] to-[#15171F] overflow-hidden flex flex-col justify-end select-none cursor-pointer"
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
          <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-indigo-300 rounded-full" />
          <div className="absolute top-6 right-1/3 w-1 h-1 bg-sky-300 rounded-full animate-pulse" />
          <div className="absolute top-10 right-16 w-1.5 h-1.5 bg-yellow-200 rounded-full" />
          
          <div className="absolute top-5 right-24 w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-100/20 to-sky-200/20 shadow-[0_0_25px_rgba(139,141,255,0.2)] opacity-80" />
        </div>

        {/* Highway Horizon Guideline */}
        <div className="absolute top-28 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

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
            className="w-[140%] -ml-[20%] h-full bg-[#121418] border-t border-border relative"
            style={{
              transform: 'rotateX(55deg)',
              transformOrigin: '50% 0%'
            }}
          >
            {/* Shoulder Glow Lines */}
            <div className="absolute left-12 inset-y-0 w-1.5 bg-gradient-to-r from-amber-500/60 to-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
            <div className="absolute right-12 inset-y-0 w-1.5 bg-gradient-to-r from-amber-500/80 to-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.5)]" />

            {/* Left Lane Line */}
            <div className="absolute left-1/3 inset-y-0 w-1 animated-road opacity-60" />

            {/* Center Express Line */}
            <div className="absolute left-1/2 -ml-0.5 inset-y-0 w-1.5 animated-road opacity-90 shadow-[0_0_8px_rgba(139,141,255,0.5)]" />

            {/* Right Lane Line */}
            <div className="absolute right-1/3 inset-y-0 w-1 animated-road opacity-60" />
          </div>
        </div>

        {/* THE 3D CAR VEHICLE */}
        <div 
          className="absolute bottom-8 transition-all duration-150 ease-out z-20 pointer-events-none"
          style={{
            left: `${lanePosition}%`,
            transform: `translateX(-50%) ${honking ? 'scale(1.08) translateY(-4px)' : 'scale(1)'}`
          }}
        >
          {/* Honk Soundwaves Indicator */}
          {honking && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 font-mono text-[10px] bg-accent text-bg px-2 py-0.5 rounded-full font-bold shadow-subtle animate-bounce">
              <Volume2 className="w-3 h-3" />
              <span>BEEP BEEP!</span>
            </div>
          )}

          {/* Dual Headlight Beams */}
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

          {/* Car Body */}
          <div className="relative w-28 h-16 flex flex-col items-center">
            
            {/* Underglow */}
            <div 
              className={`absolute bottom-0 inset-x-2 h-4 rounded-full blur-md opacity-80 ${carStyles[carColor].glow}`}
              style={{ backgroundColor: carStyles[carColor].accent }}
            />

            {/* Cabin Top */}
            <div className="relative w-16 h-8 bg-elevated rounded-t-xl border border-border overflow-hidden shadow-inner flex items-center justify-center gap-2 px-2">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-transparent to-black/60 pointer-events-none" />
              
              <div className="w-4 h-4 rounded-full bg-accent/80 border border-white/40 text-[7px] font-bold text-bg flex items-center justify-center shadow-sm">
                R
              </div>
              <div className="w-4 h-4 rounded-full bg-sky-400/80 border border-white/40 text-[7px] font-bold text-bg flex items-center justify-center shadow-sm">
                P
              </div>
            </div>

            {/* Main Chassis Body */}
            <div className={`relative w-28 h-8 rounded-lg bg-gradient-to-r ${carStyles[carColor].body} border border-white/20 shadow-lg flex items-center justify-between px-2`}>
              <div className={`w-3 h-3 rounded-full ${headlightsOn ? 'bg-sky-200 shadow-[0_0_10px_#38BDF8]' : 'bg-zinc-700'}`} />

              <div className="flex flex-col items-center">
                <span className="text-[7px] font-mono font-bold text-white tracking-widest">HOPIN</span>
                <div className="w-6 h-0.5 bg-black/40 rounded-full" />
              </div>

              <div className={`w-3 h-3 rounded-full ${headlightsOn ? 'bg-sky-200 shadow-[0_0_10px_#38BDF8]' : 'bg-zinc-700'}`} />
            </div>

            {/* Wheels */}
            <div className="absolute -bottom-1.5 inset-x-2 flex justify-between px-1">
              <div className="w-5 h-5 rounded-full bg-black border border-zinc-600 shadow-md flex items-center justify-center animate-spin">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              </div>
              <div className="w-5 h-5 rounded-full bg-black border border-zinc-600 shadow-md flex items-center justify-center animate-spin">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              </div>
            </div>

          </div>
        </div>

        {/* Highway Waypoint Indicator Marker on Road */}
        <div className="absolute bottom-3 right-4 bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border text-[11px] font-mono flex items-center gap-2 z-10 text-primary">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>APPROACHING: <strong>{waypoints[activeSegmentIndex]?.name}</strong></span>
        </div>

      </div>

      {/* Interactive Control Dashboard */}
      <div className="p-5 bg-secondary border-t border-border grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
        
        {/* Control 1: Speed Controls */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-muted uppercase font-semibold flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-accent" />
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
              className="w-full accent-accent cursor-pointer h-1.5 bg-card rounded-lg"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted">
            <button onClick={() => setSpeed(60)} className="hover:text-primary">City (60)</button>
            <button onClick={() => setSpeed(100)} className="hover:text-primary font-semibold text-primary">Express (100)</button>
            <button onClick={() => setSpeed(140)} className="hover:text-primary">Turbo (140)</button>
          </div>
        </div>

        {/* Control 2: Color Customizer */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-muted uppercase font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>NEON CAB FINISH</span>
          </label>
          <div className="flex items-center gap-2 pt-1">
            {[
              { id: 'blue', color: 'bg-indigo-500', name: 'Blue' },
              { id: 'pink', color: 'bg-pink-500', name: 'Pink' },
              { id: 'orange', color: 'bg-orange-500', name: 'Orange' },
              { id: 'lime', color: 'bg-emerald-500', name: 'Mint' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCarColor(c.id as any)}
                className={`w-6 h-6 rounded-md ${c.color} border transition-transform ${carColor === c.id ? 'border-primary scale-110 shadow-subtle' : 'border-transparent opacity-60'}`}
                title={c.name}
              />
            ))}
            <span className="text-[11px] text-muted ml-1">{carStyles[carColor].name}</span>
          </div>
        </div>

        {/* Control 3: Interactive Toggles */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-muted uppercase font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>INTERACTIVE ACTIONS</span>
          </label>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setHeadlightsOn(!headlightsOn)}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1 transition-colors ${headlightsOn ? 'bg-elevated text-primary border-accent' : 'bg-card text-muted border-border'}`}
            >
              <Lightbulb className="w-3 h-3" />
              <span>{headlightsOn ? 'Beams ON' : 'Beams OFF'}</span>
            </button>
            <button
              onClick={triggerHonk}
              className="px-3 py-1.5 rounded-lg bg-card hover:bg-elevated border border-border text-primary text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-subtle"
            >
              <Volume2 className="w-3 h-3" />
              <span>Honk</span>
            </button>
          </div>
        </div>

        {/* Control 4: Pause/Drive */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-muted uppercase font-semibold">
            DRIVE CONTROLS
          </label>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${isPlaying ? 'bg-error text-white hover:bg-error/90' : 'bg-success text-bg hover:bg-success/90'}`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Drive'}</span>
            </button>
            <span className="text-[10px] text-muted leading-tight">
              Move cursor over road to steer cab!
            </span>
          </div>
        </div>

      </div>

      {/* Waypoint Corridor Ticker */}
      <div className="px-5 py-3 bg-card border-t border-border flex items-center justify-between text-xs font-mono">
        {waypoints.map((wp, idx) => {
          const isPassed = distanceTraveled >= wp.km;
          const isCurrent = activeSegmentIndex === idx;
          return (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-accent animate-ping' : isPassed ? 'bg-emerald-400' : 'bg-border'}`} />
              <div>
                <p className={`text-[11px] font-semibold ${isCurrent ? 'text-accent' : isPassed ? 'text-primary' : 'text-muted'}`}>
                  {wp.name}
                </p>
                <p className="text-[9px] text-muted">{wp.km} KM • {wp.time}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
