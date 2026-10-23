import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  VolumeX, 
  Wind, 
  Briefcase, 
  Info 
} from 'lucide-react';

interface CoPassengerCardProps {
  passenger: {
    id: string;
    name: string;
    avatar: string;
    phoneVerified?: boolean;
    emailVerified?: boolean;
    idVerified?: boolean;
    totalCompletedRides?: number;
    averageRating?: number;
    ratingBreakdown?: {
      punctuality: number;
      courtesy: number;
      communication: number;
      cleanliness: number;
      overall: number;
    };
    reviewCount?: number;
    bio?: string;
    preferredLanguage?: string;
    preferences?: {
      quietRide?: boolean;
      acPreferred?: boolean;
      allowPet?: boolean;
      luggageCapacity?: string;
    };
    topTags?: string[];
  };
  compact?: boolean;
}

export const CoPassengerCard: React.FC<CoPassengerCardProps> = ({ passenger, compact = false }) => {
  const rating = passenger.averageRating || 4.9;
  const rides = passenger.totalCompletedRides || 24;
  const reviewsCount = passenger.reviewCount || 18;

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border shadow-subtle">
        <div className="flex items-center gap-3">
          <img
            src={passenger.avatar}
            alt={passenger.name}
            className="w-10 h-10 rounded-lg object-cover border border-border"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-primary text-xs">{passenger.name}</span>
              {passenger.idVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              )}
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-muted">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-primary">{rating}</span>
              <span>({reviewsCount} reviews)</span>
              <span>•</span>
              <span>{rides} trips</span>
            </div>
          </div>
        </div>

        <Link
          to={`/passenger/${passenger.id}`}
          className="font-mono text-[11px] text-accent hover:underline font-semibold"
        >
          PROFILE →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-5">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={passenger.avatar}
            alt={passenger.name}
            className="w-14 h-14 rounded-xl object-cover border border-border shadow-subtle"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-bold text-primary text-base">{passenger.name}</h4>
              {passenger.idVerified && (
                <span className="font-mono text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                  VERIFIED
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 font-mono text-xs">
              <div className="flex items-center gap-1 font-semibold text-primary">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating}</span>
              </div>
              <span className="text-border">•</span>
              <span className="text-muted text-[11px]">{reviewsCount} peer reviews</span>
              <span className="text-border">•</span>
              <span className="text-muted text-[11px]">{rides} completed trips</span>
            </div>
          </div>
        </div>

        <Link
          to={`/passenger/${passenger.id}`}
          className="font-mono text-[11px] px-3 py-1.5 rounded-xl border border-border hover:border-accent text-secondary hover:text-primary font-medium transition-colors bg-secondary"
        >
          // FULL PROFILE
        </Link>
      </div>

      {/* Bio snippet */}
      {passenger.bio && (
        <p className="font-sans text-xs text-secondary italic bg-secondary p-3 rounded-xl border border-border leading-relaxed">
          "{passenger.bio}"
        </p>
      )}

      {/* Rating Dimensions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
        <div className="bg-secondary p-2.5 rounded-xl border border-border">
          <span className="text-muted block text-[10px] uppercase">Punctuality</span>
          <span className="font-semibold text-primary text-sm">{passenger.ratingBreakdown?.punctuality || 4.9} / 5</span>
        </div>
        <div className="bg-secondary p-2.5 rounded-xl border border-border">
          <span className="text-muted block text-[10px] uppercase">Courtesy</span>
          <span className="font-semibold text-primary text-sm">{passenger.ratingBreakdown?.courtesy || 5.0} / 5</span>
        </div>
        <div className="bg-secondary p-2.5 rounded-xl border border-border">
          <span className="text-muted block text-[10px] uppercase">Cleanliness</span>
          <span className="font-semibold text-primary text-sm">{passenger.ratingBreakdown?.cleanliness || 4.8} / 5</span>
        </div>
        <div className="bg-secondary p-2.5 rounded-xl border border-border">
          <span className="text-muted block text-[10px] uppercase">Comms</span>
          <span className="font-semibold text-primary text-sm">{passenger.ratingBreakdown?.communication || 4.9} / 5</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {passenger.preferences?.quietRide && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-primary text-[10px] font-medium border border-border">
            <VolumeX className="w-3 h-3 text-muted" />
            QUIET TRAVEL PREFERRED
          </span>
        )}
        {passenger.preferences?.acPreferred && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-primary text-[10px] font-medium border border-border">
            <Wind className="w-3 h-3 text-accent" />
            AC PREFERRED
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-primary text-[10px] font-medium border border-border">
          <Briefcase className="w-3 h-3 text-muted" />
          {passenger.preferences?.luggageCapacity || "1 BAG"}
        </span>
      </div>

      {/* Tags */}
      {passenger.topTags && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {passenger.topTags.map((tag, i) => (
            <span key={i} className="font-mono text-[9px] uppercase tracking-wider font-semibold bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Safety Notice */}
      <div className="bg-secondary border border-border rounded-xl p-3 flex items-start gap-2 font-mono text-[10px] text-muted leading-tight">
        <Info className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
        <span>
          COMMUNITY NOTICE: Ratings reflect prior verified trip submissions by co-passengers. Mutual respect and safety protocols are required.
        </span>
      </div>

    </div>
  );
};
