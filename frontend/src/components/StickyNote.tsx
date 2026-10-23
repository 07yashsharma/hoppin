import React, { useState } from 'react';
import { Pin } from 'lucide-react';

export interface StickyNoteProps {
  color?: 'pink' | 'yellow' | 'orange' | 'mint' | 'blue';
  title?: string;
  badge?: string;
  children: React.ReactNode;
  rotation?: number;
  tape?: boolean;
  pin?: boolean;
  author?: string;
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  color = 'blue',
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

  // Subtle accent tint mappings for dark surfaces
  const accentMap = {
    yellow: {
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/15 text-amber-300',
      pin: 'bg-amber-400',
      tape: 'bg-amber-500/20'
    },
    pink: {
      border: 'border-pink-500/30',
      badge: 'bg-pink-500/15 text-pink-300',
      pin: 'bg-pink-400',
      tape: 'bg-pink-500/20'
    },
    orange: {
      border: 'border-orange-500/30',
      badge: 'bg-orange-500/15 text-orange-300',
      pin: 'bg-orange-400',
      tape: 'bg-orange-500/20'
    },
    mint: {
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/15 text-emerald-300',
      pin: 'bg-emerald-400',
      tape: 'bg-emerald-500/20'
    },
    blue: {
      border: 'border-accent/40',
      badge: 'bg-accent/15 text-accent',
      pin: 'bg-accent',
      tape: 'bg-accent/20'
    }
  };

  const scheme = accentMap[color] || accentMap.blue;

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`relative p-5 rounded-xl bg-card border ${scheme.border} shadow-subtle transition-all duration-300 hover:rotate-0 hover:scale-[1.01] hover:z-20 cursor-default select-none ${className}`}
    >
      {/* Scotch tape on top center */}
      {tape && !pin && (
        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-sm ${scheme.tape} backdrop-blur-sm border border-white/10`} />
      )}

      {/* Push-pin on top center */}
      {pin && (
        <div 
          onClick={() => setPinned(!pinned)} 
          className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${scheme.pin} shadow-md cursor-pointer hover:scale-125 transition-transform border border-black/40`} 
          title="Toggle Pin"
        />
      )}

      {/* Header bar */}
      <div className="flex items-start justify-between gap-2 pt-1 mb-2.5">
        {badge && (
          <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${scheme.badge}`}>
            {badge}
          </span>
        )}
        {title && (
          <h4 className="text-xs font-display font-semibold uppercase tracking-tight text-primary">
            {title}
          </h4>
        )}
      </div>

      {/* Note Content */}
      <div className="text-xs font-sans leading-relaxed text-secondary">
        {children}
      </div>

      {/* Scribble author footer */}
      {author && (
        <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted">
          <span>— {author}</span>
          <span className="text-emerald-400">✓ verified</span>
        </div>
      )}
    </div>
  );
};
