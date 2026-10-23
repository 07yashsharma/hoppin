import React, { useState } from 'react';
import { reportSafetyIncident } from '../services/api';
import { 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const Support: React.FC = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('etiquette');
  const [severity, setSeverity] = useState('medium');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const faqs = [
    {
      q: "How does hopin calculate the shared ride fare?",
      a: "The pricing engine calculates each commuter's solo journey distance, applies a calibrated cost-sharing discount (~37%), and reconciles driver earnings (85%) and platform maintenance fee (15%) transparently."
    },
    {
      q: "What happens if a co-passenger makes the cab wait at pickup?",
      a: "Our algorithm enforces a strict 5-minute maximum pickup window at each intermediate waypoint to ensure timely arrival for everyone."
    },
    {
      q: "Can I choose not to match with a particular user?",
      a: "Yes. You can block any passenger directly from their commuter profile. Our algorithm immediately excludes blocked pairs from candidate matrices."
    },
    {
      q: "Are the highway vehicles sanitized and air-conditioned?",
      a: "All commercial fleet vehicles (Toyota Innova Crysta, Maruti Suzuki Dzire, Tata Tigor EV) are verified for full climate control and undergo regular maintenance and permit inspections."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setSubmitting(true);
      await reportSafetyIncident({
        category,
        severity,
        description
      });
      setSuccess(true);
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-bg text-primary page-transition">
      
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-muted uppercase">
          <HelpCircle className="w-4 h-4 text-accent" />
          <span>// DISPATCH & RESOLUTIONS</span>
          <span>•</span>
          <span className="text-accent bg-card px-2 py-0.5 rounded border border-border font-semibold">24/7 ACTIVE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight">
          Help Desk & Safety Incident Dispatch
        </h1>
        <p className="text-xs sm:text-sm text-secondary font-sans max-w-2xl">
          Find answers to common ride-sharing questions, review highway pooling policies, or report a trip or conduct discrepancy directly to our operations desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FAQS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary pb-2">
            <span className="w-2.5 h-2.5 bg-accent rounded-full" />
            <span className="font-semibold">FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-elevated space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-bold text-primary text-base">{faq.q}</h3>
                  <span className="text-[10px] font-mono font-semibold text-muted uppercase shrink-0">
                    // 0{i + 1}
                  </span>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INCIDENT REPORT FORM (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4 text-error" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  FILE INCIDENT OR ESCALATION
                </h3>
              </div>
              <span className="text-[10px] font-mono text-muted">// ESCALATION</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block font-semibold text-primary mb-1 uppercase tracking-wider">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-primary focus:border-accent focus:outline-none"
                >
                  <option value="etiquette">Co-passenger Conduct & Etiquette</option>
                  <option value="detour">Unreasonable Route Detour</option>
                  <option value="driver">Driver / Vehicle Condition</option>
                  <option value="billing">Fare & Toll Split Discrepancy</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-primary mb-1 uppercase tracking-wider">
                  Severity Classification
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary text-primary focus:border-accent focus:outline-none"
                >
                  <option value="low">Low (General Feedback / Advisory)</option>
                  <option value="medium">Medium (Investigation / Warning)</option>
                  <option value="high">High (Urgent Safety Action)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-primary mb-1 uppercase tracking-wider">
                  Incident Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="State the route corridor, vehicle details, co-passenger name, and specific occurrence..."
                  className="w-full p-3 rounded-xl border border-border bg-secondary text-primary placeholder-muted font-sans text-xs focus:border-accent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover font-mono font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-subtle"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT REPORT TO DESK'}</span>
              </button>

              {success && (
                <div className="p-3 bg-success-surface border border-success/30 rounded-xl text-success text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>// Report logged successfully. Investigated within 24 hours.</span>
                </div>
              )}
            </form>

            <div className="pt-4 border-t border-border font-mono text-[11px] text-muted space-y-1">
              <p>• 24/7 Safety Dispatch: <strong className="text-primary">1800-HOP-IN (1800-467-46)</strong></p>
              <p>• Operations Email: <strong className="text-primary">ops@hopin.in</strong></p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
