import React, { useState, useEffect } from 'react';
import { 
  getRides, 
  submitPassengerReview, 
  getPassengerReviews, 
  Ride 
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const Reviews: React.FC = () => {
  const { currentUser, refreshUser } = useAuth();
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  const [myReviews, setMyReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active review form state
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [ratings, setRatings] = useState({
    punctuality: 5,
    courtesy: 5,
    communication: 5,
    cleanliness: 5,
    overall: 5
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(["On time", "Polite"]);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableTags = [
    "On time",
    "Polite",
    "Respectful",
    "Good communicator",
    "Quiet passenger",
    "Clean vehicle care",
    "Professional",
    "Flexible"
  ];

  const loadData = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const [allRides, passengerData] = await Promise.all([
        getRides(currentUser.id).catch(() => []),
        getPassengerReviews(currentUser.id).catch(() => ({ reviews: [] }))
      ]);

      const finished = allRides.filter(r => r.status === 'completed' && r.coPassenger);
      setCompletedRides(finished);
      setMyReviews(passengerData.reviews || []);

      const pending = finished.find(r => !r.hasReviewedCoPassenger);
      if (pending) setSelectedRide(pending);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRatingChange = (category: keyof typeof ratings, val: number) => {
    setRatings(prev => ({ ...prev, [category]: val }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRide || !selectedRide.coPassenger) return;

    try {
      setSubmitting(true);
      setErrorMsg(null);
      await submitPassengerReview({
        bookingId: selectedRide.id,
        targetPassengerId: selectedRide.coPassenger.id,
        ratings,
        tags: selectedTags,
        comment
      });
      setFeedbackSuccess(`Rating logged for ${selectedRide.coPassenger.name}. Thank you!`);
      await refreshUser();
      await loadData();
      setComment("");
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 bg-bg text-primary page-transition">
      
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted uppercase">
          <span>// COMMUNITY // REPUTATION PROTOCOL</span>
          <span>•</span>
          <span className="text-accent bg-card px-2 py-0.5 rounded border border-border font-semibold">MUTUAL RATING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight">
          Co-Passenger Review & Reputation
        </h1>
        <p className="text-xs sm:text-sm text-secondary font-sans max-w-2xl">
          High community ratings keep cab sharing pleasant, quiet, and reliable for everyone. Rate punctuality, courtesy, and vehicle care after every completed journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Review Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2 font-mono">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  RATE YOUR RECENT CO-PASSENGER
                </h2>
              </div>
              <span className="text-xs font-mono text-muted">// STEP 1 OF 1</span>
            </div>

            {selectedRide && selectedRide.coPassenger ? (
              <form onSubmit={handleSubmitReview} className="space-y-6">
                
                {/* Co-passenger Card Mini */}
                <div className="p-4 rounded-xl bg-secondary border border-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedRide.coPassenger.avatar}
                      alt={selectedRide.coPassenger.name}
                      className="w-12 h-12 rounded-xl object-cover border border-border shadow-subtle"
                    />
                    <div>
                      <p className="font-display font-bold text-primary text-base">{selectedRide.coPassenger.name}</p>
                      <p className="font-mono text-xs text-muted">
                        Shared journey: {selectedRide.pickup.name.split(',')[0]} → {selectedRide.dropoff.name.split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded">
                    VERIFIED LEG
                  </span>
                </div>

                {/* Rating Categories */}
                <div className="space-y-4 font-mono text-xs">
                  <p className="font-semibold uppercase tracking-wider text-muted">// EVALUATION CRITERIA</p>
                  
                  {[
                    { key: 'overall', label: 'Overall Experience' },
                    { key: 'punctuality', label: 'Punctuality at Pickup' },
                    { key: 'courtesy', label: 'Courtesy & Respect' },
                    { key: 'communication', label: 'Route Coordination' },
                    { key: 'cleanliness', label: 'Vehicle Consideration' }
                  ].map(cat => (
                    <div key={cat.key} className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                      <span className="font-medium text-primary">{cat.label}</span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(cat.key as keyof typeof ratings, star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                ratings[cat.key as keyof typeof ratings] >= star
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-border'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tag Selection Chips */}
                <div className="space-y-2 font-mono text-xs">
                  <p className="font-semibold uppercase tracking-wider text-muted">// COMMENDATION TAGS</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map(tag => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-accent text-white border-accent shadow-subtle'
                              : 'bg-secondary text-secondary border-border hover:bg-elevated hover:text-primary'
                          }`}
                        >
                          #{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comment Box */}
                <div className="space-y-2 font-mono text-xs">
                  <label className="block font-semibold uppercase tracking-wider text-muted">
                    // WRITTEN FEEDBACK (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Great co-traveler! Prompt arrival at Jaipur station and very pleasant company during highway leg."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border font-sans text-xs bg-secondary text-primary placeholder-muted focus:border-accent focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-mono text-error font-semibold">// ERROR: {errorMsg}</p>
                )}

                {feedbackSuccess && (
                  <p className="text-xs font-mono text-success font-semibold">// {feedbackSuccess}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle disabled:opacity-50"
                >
                  {submitting ? 'RECORDING REPUTATION...' : 'SUBMIT VERIFIED RATING'}
                </button>

              </form>
            ) : (
              <div className="p-8 text-center font-mono space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-sm font-semibold text-primary">ALL CO-PASSENGERS REVIEWED</p>
                <p className="text-xs text-muted font-sans max-w-sm mx-auto">
                  You have completed feedback for all recent shared trips. New review prompts will appear after your next journey!
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Reputation Dossier & Community Rules */}
        <div className="space-y-6">
          
          {/* User Score Card */}
          <div className="bg-card text-primary rounded-2xl border border-border shadow-elevated p-6 space-y-4">
            <p className="text-[10px] font-mono text-muted uppercase font-semibold tracking-wider">// YOUR REPUTATION SCORE</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-accent">★ {currentUser?.averageRating || 4.9}</span>
              <span className="text-sm font-mono text-muted">/ 5.0</span>
            </div>
            <p className="text-xs font-mono text-secondary">
              Derived from {currentUser?.reviewCount || 32} verified shared rides across national highways.
            </p>
            <div className="pt-3 border-t border-border grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <p className="text-[10px] text-muted">PUNCTUALITY</p>
                <p className="font-semibold text-primary">4.9 / 5.0</p>
              </div>
              <div>
                <p className="text-[10px] text-muted">COMMUNICATION</p>
                <p className="font-semibold text-primary">5.0 / 5.0</p>
              </div>
            </div>
          </div>

          {/* Golden Rules Slab */}
          <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
            <div className="flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                THE HOPIN CODE OF COURTESY
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-secondary leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-accent shrink-0">01.</span>
                <span><strong className="text-primary">5-Minute Rule:</strong> Be ready at the designated curb 5 minutes prior to scheduled pickup.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-accent shrink-0">02.</span>
                <span><strong className="text-primary">Headphone Etiquette:</strong> Keep phone calls brief and use earphones for music and videos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-semibold text-accent shrink-0">03.</span>
                <span><strong className="text-primary">Luggage Clarity:</strong> Stick to the baggage allowance you selected during booking.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
