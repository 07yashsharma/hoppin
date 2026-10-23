import React, { useState } from 'react';
import { Pin, Sparkles, X, Check } from 'lucide-react';

export interface StickyNoteProps {
  color?: 'pink' | 'yellow' | 'orange' | 'mint' | 'blue';
  title?: string;
  badge?: string;
  children: React.ReactNode;
  rotation?: number; // e.g. -2, 3, -1
  tape?: boolean;
  pin?: boolean;
  author?: string;
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  color = 'yellow',
  title,
  badge,
  children,
  rotation = -1.5,
  tape = true,
  pin = false,
  author,
  className = ''
}) => {
  const [pinned, setPinned] = useState(true);
  const [flipped, setFlipped] = useState(false);

  // Palette schemes
  const colorMap = {
    yellow: {
      bg: 'bg-[#FEF6A8]',
      border: 'border-[#E6D870]',
      badgeBg: 'bg-[#F2DF55] text-[#6E5E00]',
      pinColor: 'bg-amber-600',
      text: 'text-[#4A4200]',
      shadow: 'shadow-[5px_5px_0px_0px_rgba(74,66,0,0.15)]'
    },
    pink: {
      bg: 'bg-[#FFD9E8]',
      border: 'border-[#F4ADC7]',
      badgeBg: 'bg-[#FFADC9] text-[#7A123C]',
      pinColor: 'bg-rose-500',
      text: 'text-[#5E0B2E]',
      shadow: 'shadow-[5px_5px_0px_0px_rgba(122,18,60,0.15)]'
    },
    orange: {
      bg: 'bg-[#FFE6D8]',
      border: 'border-[#F8BCA1]',
      badgeBg: 'bg-[#FFBC99] text-[#782800]',
      pinColor: 'bg-orange-500',
      text: 'text-[#632000]',
      shadow: 'shadow-[5px_5px_0px_0px_rgba(120,40,0,0.15)]'
    },
    mint: {
      bg: 'bg-[#DAFAEB]',
      border: 'border-[#A6E8C8]',
      badgeBg: 'bg-[#98E7BF] text-[#005735]',
      pinColor: 'bg-emerald-600',
      text: 'text-[#004A2C]',
      shadow: 'shadow-[5px_5px_0px_0px_rgba(0,87,53,0.15)]'
    },
    blue: {
      bg: 'bg-[#DDEBFF]',
      border: 'border-[#ABC8F7]',
      badgeBg: 'bg-[#A8CAFF] text-[#0A3478]',
      pinColor: 'bg-blue-600',
      text: 'text-[#0A2E6E]',
      shadow: 'shadow-[5px_5px_0px_0px_rgba(10,52,120,0.15)]'
    }
  };

  const c = colorMap[color];

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative p-5 rounded-sm border-2 ${c.border} ${c.bg} ${c.shadow} transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:z-20 cursor-default select-none ${className}`}
    >
      {/* Scotch tape on top center */}
      {tape && !pin && <div className="scotch-tape" />}

      {/* Push-pin on top center */}
      {pin && (
        <div 
          onClick={() => setPinned(!pinned)} 
          className={`pushpin ${c.pinColor} cursor-pointer hover:scale-125 transition-transform`} 
          title="Toggle Pin"
        />
      )}

      {/* Header bar */}
      <div className="flex items-start justify-between gap-2 pt-1 mb-2">
        {badge && (
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${c.badgeBg}`}>
            {badge}
          </span>
        )}
        {title && (
          <h4 className={`text-xs font-display font-black uppercase tracking-tight ${c.text}`}>
            {title}
          </h4>
        )}
      </div>

      {/* Note Content */}
      <div className={`text-xs font-sans leading-relaxed ${c.text}`}>
        {children}
      </div>

      {/* Scribble author footer */}
      {author && (
        <div className={`mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono opacity-80 ${c.text}`}>
          <span>— {author}</span>
          <span>✓ verified</span>
        </div>
      )}
    </div>
  );
};
