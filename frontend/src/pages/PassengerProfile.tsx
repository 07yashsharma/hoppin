import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPassengerReviews } from '../services/api';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Globe, 
  Wind, 
  VolumeX, 
  AlertTriangle, 
  MessageSquare,
  Ban,
  ArrowLeft,
  Award
} from 'lucide-react';

export const PassengerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPassengerReviews(id)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const handleBlockUser = async () => {
    if (!window.confirm("Block this commuter from future shared ride matching?")) return;
    try {
      await fetch('/api/safety/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: id, reason: "User preference block" })
      });
      setBlocked(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-hopin-muted">
        // ACCESSING COMMUTER TELEMETRY DOSSIER...
      </div>
    );
  }

  if (!data || !data.passenger) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono space-y-4">
        <h2 className="text-xl font-display font-black text-hopin-dark">COMMUTER RECORD NOT FOUND</h2>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-hopin-dark text-hopin-lime text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  const { passenger, reviews } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/matches"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-hopin-muted hover:text-hopin-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches Matrix</span>
        </Link>
        <span className="text-[10px] font-mono text-hopin-muted uppercase tracking-wider">
          // COMMUTER_ID: #{passenger.id?.toUpperCase() || 'HM-USER'}
        </span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={passenger.avatar}
                alt={passenger.name}
                className="w-20 h-20 rounded-xl object-cover border-2 border-hopin-dark shadow-[3px_3px_0px_0px_#171916]"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-hopin-lime rounded-full border-2 border-hopin-dark" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-display font-black text-hopin-dark">{passenger.name}</h1>
                {passenger.idVerified && (
                  <span className="inline-flex items-center gap-1 bg-hopin-lime text-hopin-dark border border-hopin-dark px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ID VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-hopin-muted mt-1">
                Completed <strong className="text-hopin-dark">{passenger.totalCompletedRides || 24} verified shared trips</strong> across India
              </p>
              <div className="flex items-center gap-3 mt-2 font-mono text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-black">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-hopin-dark">{passenger.averageRating} / 5.0</span>
                </div>
                <span className="text-hopin-muted">•</span>
                <span className="text-hopin-muted">{passenger.reviewCount || 18} peer reviews</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            {blocked ? (
              <span className="px-3.5 py-1.5 rounded-lg bg-red-100 border border-red-300 text-red-700 text-xs font-mono font-bold">
                BLOCKED FOR MATCHING
              </span>
            ) : (
              <button
                onClick={handleBlockUser}
                className="px-3.5 py-2 rounded-lg border-2 border-hopin-dark hover:bg-red-50 text-red-600 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-[2px_2px_0px_0px_#171916]"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Block Commuter</span>
              </button>
            )}
          </div>
        </div>

        {/* Travel Habits Monospace Matrix */}
        <div className="pt-6 border-t-2 border-hopin-dark space-y-3 font-mono">
          <p className="text-[10px] text-hopin-muted uppercase font-bold tracking-wider">// VERIFIED HABITS & PREFERENCES</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center gap-2.5">
              <VolumeX className="w-4 h-4 text-hopin-cobalt" />
              <span className="font-bold text-hopin-dark">Quiet Cabin Preferred</span>
            </div>
            <div className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-hopin-dark">AC Climate Essential</span>
            </div>
            <div className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-hopin-orange" />
              <span className="font-bold text-hopin-dark">Standard 1 Bag Luggage</span>
            </div>
          </div>
        </div>

        {/* Peer Feedback Ledger */}
        <div className="pt-6 border-t-2 border-hopin-dark space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono">
              <MessageSquare className="w-4 h-4 text-hopin-dark" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-hopin-dark">
                VERIFIED CO-PASSENGER REVIEWS
              </h2>
            </div>
            <span className="text-xs font-mono text-hopin-muted">// {reviews?.length || 0} REVIEWS FILED</span>
          </div>

          <div className="space-y-3">
            {reviews && reviews.length > 0 ? (
              reviews.map((rev: any) => (
                <div key={rev.id} className="p-4 rounded-lg bg-hopin-bg border-2 border-hopin-dark space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-hopin-dark">{rev.authorName}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-hopin-dark">{rev.overallRating} / 5</span>
                    </div>
                  </div>
                  <p className="text-xs text-hopin-dark font-sans leading-relaxed">"{rev.comment}"</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags?.map((tag: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-mono font-bold bg-white border border-hopin-dark text-hopin-dark px-2 py-0.5 rounded-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-hopin-muted py-4 text-center">
                // No peer feedback filed yet for this commuter.
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
