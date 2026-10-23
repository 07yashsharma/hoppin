import React, { useState, useRef, useEffect } from 'react';
import { Navigation, MapPin, Zap, ArrowUpRight } from 'lucide-react';

export const Interactive3DHeroObject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(-18);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth bounded rotation (-25 to 25 degrees)
    const newRotY = (x / (rect.width / 2)) * 22;
    const newRotX = -(y / (rect.height / 2)) * 18;
    setRotateX(newRotX);
    setRotateY(newRotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(10);
    setRotateY(-14);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto aspect-square perspective-container cursor-grab active:cursor-grabbing select-none"
    >
      {/* Editorial Meta Badges around object */}
      <div className="absolute -top-3 left-0 z-20 flex items-center gap-2 font-mono text-[10px] text-hopin-muted tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-hopin-lime" />
        <span>SYS.3D // ROUTE SCULPTURE</span>
      </div>

      <div className="absolute -bottom-3 right-0 z-20 font-mono text-[10px] text-hopin-muted tracking-widest uppercase">
        <span>TILT ACTIVE • {Math.round(rotateY)}° / {Math.round(rotateX)}°</span>
      </div>

      {/* 3D Root Transformation Canvas */}
      <div
        className="w-full h-full preserve-3d transition-transform duration-200 ease-out flex items-center justify-center p-6"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
      >
        {/* Base Layer: Dark Tactile Grid Slab */}
        <div
          className="absolute inset-4 rounded-3xl bg-hopin-dark border-2 border-[#2C312A] shadow-2xl preserve-3d flex flex-col justify-between p-6 overflow-hidden"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="heroGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E5E3DA" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>
          </div>

          {/* Top terminal telemetry on slab */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-hopin-lime animate-pulse" />
              <span className="text-white font-bold tracking-wider">NH48_GOLDEN_CORRIDOR</span>
            </div>
            <span className="text-hopin-lime font-bold">94.8% MATCH</span>
          </div>

          {/* Middle 3D Sculptural Layer: Floating Route Wordmark & Highway Stream */}
          <div
            className="relative z-10 my-auto preserve-3d py-4"
            style={{ transform: 'translateZ(35px)' }}
          >
            {/* SVG Converging Dual Routes in 3D */}
            <div className="relative h-28 flex items-center justify-center">
              <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="limeBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C5F55A" />
                    <stop offset="100%" stopColor="#C5F55A" />
                  </linearGradient>
                  <linearGradient id="cobaltBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#345CFF" />
                    <stop offset="100%" stopColor="#C5F55A" />
                  </linearGradient>
                </defs>

                {/* Path A (Passenger A - Lime path) */}
                <path
                  d="M 25 25 C 90 25, 120 60, 190 60 L 295 60"
                  fill="none"
                  stroke="url(#limeBeam)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={isHovered ? "6 3" : "none"}
                />

                {/* Path B (Passenger B - Cobalt to Lime path) */}
                <path
                  d="M 25 95 C 90 95, 120 60, 190 60 L 295 60"
                  fill="none"
                  stroke="url(#cobaltBeam)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={isHovered ? "6 3" : "none"}
                />

                {/* Origin Node A */}
                <circle cx="25" cy="25" r="7" fill="#C5F55A" stroke="#171916" strokeWidth="3" />
                {/* Origin Node B */}
                <circle cx="25" cy="95" r="7" fill="#345CFF" stroke="#171916" strokeWidth="3" />
                {/* Merge Point */}
                <circle cx="190" cy="60" r="8" fill="#171916" stroke="#C5F55A" strokeWidth="3.5" />
                {/* Destination Node */}
                <circle cx="295" cy="60" r="9" fill="#C5F55A" stroke="#171916" strokeWidth="3.5" />
              </svg>

              {/* Waypoint Text overlays */}
              <div className="absolute top-0 left-2 text-[10px] font-mono text-white bg-hopin-dark/90 px-1.5 py-0.5 rounded border border-hopin-lime/40">
                P1: JAIPUR
              </div>
              <div className="absolute bottom-0 left-2 text-[10px] font-mono text-white bg-hopin-dark/90 px-1.5 py-0.5 rounded border border-hopin-cobalt/40">
                P2: AJMER RD
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[10px] font-mono text-hopin-dark font-bold bg-hopin-lime px-2 py-0.5 rounded shadow">
                DELHI T3
              </div>
            </div>

            {/* Elevated 3D Brand Typography Badge */}
            <div
              className="mt-3 flex items-center justify-between bg-[#1D211B] border border-[#333930] rounded-2xl p-3 shadow-lg"
              style={{ transform: 'translateZ(25px)' }}
            >
              <div>
                <p className="font-display font-black text-white text-lg tracking-tight flex items-center gap-1.5">
                  <span>hopin</span>
                  <span className="text-hopin-lime text-xs font-mono font-normal">v2.4</span>
                </p>
                <p className="font-mono text-[9px] text-slate-400">ONE CAB • TWO PATHS • ZERO WASTE</p>
              </div>

              <div className="text-right">
                <span className="font-mono font-bold text-hopin-lime text-xs">₹1,430 SAVED</span>
                <p className="font-mono text-[9px] text-slate-400">PER PASSENGER</p>
              </div>
            </div>
          </div>

          {/* Bottom Coordinates & Live Ticker */}
          <div
            className="relative z-10 flex items-center justify-between font-mono text-[9px] text-slate-400 border-t border-[#2C312A] pt-2"
            style={{ transform: 'translateZ(10px)' }}
          >
            <span>LAT: 26.9196 // LON: 75.7878</span>
            <span className="text-hopin-lime flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> LIVE ROUTING
            </span>
          </div>
        </div>

        {/* Ambient Drop Shadow underneath */}
        <div
          className="absolute -bottom-4 inset-x-8 h-8 bg-black/40 blur-xl rounded-full -z-10"
          style={{ transform: 'translateZ(-40px)' }}
        />
      </div>
    </div>
  );
};
