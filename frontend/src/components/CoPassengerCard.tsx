import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  VolumeX, 
  Wind, 
  Briefcase, 
  Globe, 
  CheckCircle2, 
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
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-hopin-border">
        <div className="flex items-center gap-3">
          <img
            src={passenger.avatar}
            alt={passenger.name}
            className="w-10 h-10 rounded-xl object-cover border border-hopin-border"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-hopin-dark text-xs">{passenger.name}</span>
              {passenger.idVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-hopin-dark" />
              )}
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-hopin-muted">
              <Star className="w-3 h-3 text-hopin-dark fill-hopin-dark" />
              <span className="font-bold text-hopin-dark">{rating}</span>
              <span>({reviewsCount} reviews)</span>
              <span>•</span>
              <span>{rides} trips</span>
            </div>
          </div>
        </div>

        <Link
          to={`/passenger/${passenger.id}`}
          className="font-mono text-[11px] text-hopin-dark font-bold hover:underline"
        >
          PROFILE →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-hopin-border shadow-sm p-6 space-y-5">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={passenger.avatar}
            alt={passenger.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-hopin-dark shadow-sm"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-bold text-hopin-dark text-base">{passenger.name}</h4>
              {passenger.idVerified && (
                <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-hopin-dark text-hopin-lime">
                  VERIFIED
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 font-mono text-xs">
              <div className="flex items-center gap-1 font-bold text-hopin-dark">
                <Star className="w-3.5 h-3.5 fill-hopin-dark text-hopin-dark" />
                <span>{rating}</span>
              </div>
              <span className="text-hopin-border">•</span>
              <span className="text-hopin-muted text-[11px]">{reviewsCount} peer reviews</span>
              <span className="text-hopin-border">•</span>
              <span className="text-hopin-muted text-[11px]">{rides} completed trips</span>
            </div>
          </div>
        </div>

        <Link
          to={`/passenger/${passenger.id}`}
          className="font-mono text-[11px] px-3 py-1.5 rounded-xl border border-hopin-border hover:border-hopin-dark text-hopin-dark font-bold transition-colors"
        >
          // FULL PROFILE
        </Link>
      </div>

      {/* Bio snippet */}
      {passenger.bio && (
        <p className="font-sans text-xs text-hopin-dark/80 italic bg-[#F8F7F2] p-3 rounded-xl border border-hopin-border leading-relaxed">
          "{passenger.bio}"
        </p>
      )}

      {/* Rating Dimensions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
        <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-hopin-border">
          <span className="text-hopin-muted block text-[10px] uppercase">Punctuality</span>
          <span className="font-bold text-hopin-dark text-sm">{passenger.ratingBreakdown?.punctuality || 4.9} / 5</span>
        </div>
        <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-hopin-border">
          <span className="text-hopin-muted block text-[10px] uppercase">Courtesy</span>
          <span className="font-bold text-hopin-dark text-sm">{passenger.ratingBreakdown?.courtesy || 5.0} / 5</span>
        </div>
        <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-hopin-border">
          <span className="text-hopin-muted block text-[10px] uppercase">Cleanliness</span>
          <span className="font-bold text-hopin-dark text-sm">{passenger.ratingBreakdown?.cleanliness || 4.8} / 5</span>
        </div>
        <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-hopin-border">
          <span className="text-hopin-muted block text-[10px] uppercase">Comms</span>
          <span className="font-bold text-hopin-dark text-sm">{passenger.ratingBreakdown?.communication || 4.9} / 5</span>
        </div>
      </div>

      {/* Preferences & Tags */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {passenger.preferences?.quietRide && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-hopin-bg text-hopin-dark text-[10px] font-bold border border-hopin-border">
            <VolumeX className="w-3 h-3" />
            QUIET TRAVEL PREFERRED
          </span>
        )}
        {passenger.preferences?.acPreferred && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-hopin-bg text-hopin-dark text-[10px] font-bold border border-hopin-border">
            <Wind className="w-3 h-3 text-hopin-cobalt" />
            AC PREFERRED
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-hopin-bg text-hopin-dark text-[10px] font-bold border border-hopin-border">
          <Briefcase className="w-3 h-3" />
          {passenger.preferences?.luggageCapacity || "1 BAG"}
        </span>
      </div>

      {/* Tags */}
      {passenger.topTags && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {passenger.topTags.map((tag, i) => (
            <span key={i} className="font-mono text-[9px] uppercase tracking-wider font-bold bg-[#E8F8C8] text-hopin-dark border border-[#C5F55A] px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Safety Notice */}
      <div className="bg-[#FAF9F5] border border-hopin-border rounded-xl p-3 flex items-start gap-2 font-mono text-[10px] text-hopin-muted leading-tight">
        <Info className="w-3.5 h-3.5 text-hopin-dark shrink-0 mt-0.5" />
        <span>
          COMMUNITY NOTICE: Ratings reflect prior verified trip submissions by co-passengers. Mutual respect and safety protocols are required.
        </span>
      </div>

    </div>
  );
};
