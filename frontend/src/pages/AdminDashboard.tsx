import React, { useState, useEffect } from 'react';
import { 
  getAdminAnalytics, 
  updateSystemConfig 
} from '../services/api';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  Terminal, 
  Activity, 
  Sparkles 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commissionPct, setCommissionPct] = useState(15);
  const [autoAssign, setAutoAssign] = useState(true);
  const [configSaved, setConfigSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'kpis' | 'incidents' | 'config'>('kpis');

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getAdminAnalytics();
      setData(res);
      if (res.systemConfig) {
        setCommissionPct(res.systemConfig.platformCommissionPct);
        setAutoAssign(res.systemConfig.autoAssignDriver);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSystemConfig({
        platformCommissionPct: commissionPct,
        autoAssignDriver: autoAssign
      });
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveIncident = async (incidentId: string) => {
    try {
      await fetch(`/api/admin/incidents/${incidentId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "warning_issued", adminNotes: "Investigated by Operations Desk." })
      });
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-muted">
        // ACCESSING NETWORK OPERATIONS TERMINAL...
      </div>
    );
  }

  const { analytics, recentIncidents, recentRides, recentMatches } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-bg text-primary page-transition">
      
      {/* Title & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted uppercase mb-2">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>// OPS.CONTROL_CENTER // v2.4</span>
            <span>•</span>
            <span className="text-accent bg-card px-2 py-0.5 rounded border border-border font-semibold">SYSTEM ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight">
            hopin Operations & Network Control
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-sans mt-1 max-w-2xl">
            Real-time highway route telemetry, algorithm compatibility verification, trust & safety enforcement, and platform economics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2 rounded-xl font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'kpis'
                ? 'bg-accent text-white border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            [01 // NETWORK KPIS]
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 rounded-xl font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'incidents'
                ? 'bg-accent text-white border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            [02 // INCIDENT DESK ({recentIncidents?.length || 0})]
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-xl font-semibold uppercase tracking-wider transition-all border ${
              activeTab === 'config'
                ? 'bg-accent text-white border-accent shadow-subtle'
                : 'bg-card text-secondary border-border hover:bg-elevated hover:text-primary'
            }`}
          >
            [03 // PRICING POLICY]
          </button>
        </div>
      </div>

      {/* TAB 1: NETWORK KPIS */}
      {activeTab === 'kpis' && (
        <div className="space-y-8">
          
          {/* Top KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
              <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
                // TOTAL ROUTE BOOKINGS
              </span>
              <p className="text-3xl font-display font-bold text-primary">{analytics?.totalRides || 10}</p>
              <div className="flex items-center gap-2 text-[11px] font-mono mt-1.5">
                <span className="text-emerald-400 font-semibold">{analytics?.completedRides} completed</span>
                <span className="text-border">•</span>
                <span className="text-accent font-semibold">{analytics?.inProgressRides} active</span>
              </div>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
              <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
                // MATCH ACCEPTANCE RATE
              </span>
              <p className="text-3xl font-display font-bold text-primary">{analytics?.matchAcceptanceRatePct || 84}%</p>
              <p className="text-[11px] font-mono text-emerald-400 font-semibold mt-1.5">
                Dual-passenger verified pools
              </p>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
              <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
                // FARE SAVINGS GENERATED
              </span>
              <p className="text-3xl font-display font-bold text-primary">₹{(analytics?.totalSavingsINR || 14850).toLocaleString()}</p>
              <p className="text-[11px] font-mono text-emerald-400 font-semibold mt-1.5">
                ~37% saved per commuter
              </p>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle">
              <span className="text-[10px] font-mono font-semibold text-muted uppercase tracking-wider block mb-1">
                // EMISSIONS REDUCED (CO2)
              </span>
              <p className="text-3xl font-display font-bold text-primary">{analytics?.totalCo2AvoidedKg || 240} kg</p>
              <p className="text-[11px] font-mono text-accent font-semibold mt-1.5">
                Eliminated highway empty runs
              </p>
            </div>

          </div>

          {/* Recent Rides & Matches Monitor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Live Rides Feed */}
            <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 font-mono">
                  <Activity className="w-4 h-4 text-accent" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    LIVE RIDE PIPELINE MONITOR
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted">// STREAMING</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {recentRides?.slice(0, 6).map((r: any) => (
                  <div key={r.id} className="p-3.5 rounded-xl bg-secondary border border-border flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary font-sans">{r.passengerName}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-card border border-border text-muted uppercase">
                          {r.journeyType}
                        </span>
                      </div>
                      <p className="text-muted text-[11px] mt-0.5 font-sans">
                        {r.pickup.name.split(',')[0]} → {r.dropoff.name.split(',')[0]}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase border ${
                        r.status === 'completed' ? 'bg-card text-muted border-border' :
                        r.status === 'in_progress' ? 'bg-accent/15 text-accent border-accent/25' : 'bg-secondary text-secondary border-border'
                      }`}>
                        {r.status.replace('_', ' ')}
                      </span>
                      <p className="font-display font-bold text-accent text-sm mt-1">₹{r.fare}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Matches Feed */}
            <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    ALGORITHM MATCH EVALUATIONS
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted">// MATRIX LOG</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {recentMatches?.map((m: any) => (
                  <div key={m.id} className="p-3.5 rounded-xl bg-secondary border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary font-sans">{m.routeTitle}</span>
                      <span className="bg-card text-accent border border-border font-bold text-[10px] px-2 py-0.5 rounded">
                        {m.score}% SCORE
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted text-[11px]">
                      <span>{m.passengerAName} + {m.passengerBName}</span>
                      <span className="font-semibold text-emerald-400">Combined Savings: ₹{m.pricing?.passengerA?.savingsAmount * 2 || 2800}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SAFETY INCIDENTS & MODERATION */}
      {activeTab === 'incidents' && (
        <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 sm:p-8 space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-error" />
              <span>Trust & Safety Escalations Desk</span>
            </h3>
            <p className="text-xs font-mono text-muted mt-0.5">
              Review commuter incident reports, emergency SOS telemetry triggers, and moderate flagged reviews.
            </p>
          </div>

          {recentIncidents?.length === 0 ? (
            <p className="text-xs font-mono text-muted py-8 text-center">// NO OPEN INCIDENTS IN DISPATCH QUEUE</p>
          ) : (
            <div className="space-y-4 font-mono text-xs">
              {recentIncidents.map((inc: any) => (
                <div key={inc.id} className="p-4 rounded-xl border border-border bg-secondary space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">INCIDENT #{inc.id}</span>
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${
                        inc.severity === 'high' ? 'bg-error-surface text-error border-error/30' : 'bg-secondary text-amber-400 border-border'
                      }`}>
                        {inc.category} • {inc.severity}
                      </span>
                    </div>
                    <span className="text-[10px] bg-card border border-border text-muted px-2 py-0.5 rounded uppercase font-semibold">
                      STATUS: {inc.status}
                    </span>
                  </div>

                  <p className="text-secondary font-sans text-xs">{inc.description}</p>
                  <p className="text-[11px] text-muted">
                    Reported by: <strong className="text-primary">{inc.reporterName}</strong> • {new Date(inc.createdAt).toLocaleString()}
                  </p>

                  {inc.status === 'investigating' && (
                    <div className="pt-2 border-t border-border flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleResolveIncident(inc.id)}
                        className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent-hover font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-subtle"
                      >
                        Investigate & Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PRICING POLICY CONFIGURATION */}
      {activeTab === 'config' && (
        <div className="bg-card rounded-2xl border border-border shadow-elevated p-6 sm:p-8 max-w-2xl space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent" />
              <span>Platform Fare Policy & Economics</span>
            </h3>
            <p className="text-xs font-mono text-muted mt-0.5">
              Tune platform commission take rate, driver payout share, and fleet dispatch allocation rules.
            </p>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-6 font-mono text-xs">
            <div>
              <label className="block font-semibold text-primary mb-2 uppercase tracking-wider">
                Platform Maintenance Fee Take Rate ({commissionPct}%)
              </label>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={commissionPct}
                onChange={(e) => setCommissionPct(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer h-2 bg-secondary rounded-lg border border-border"
              />
              <div className="flex justify-between text-[11px] text-muted mt-2">
                <span>Direct Captain Payout: <strong className="text-primary">{100 - commissionPct}%</strong></span>
                <span>Platform Maintenance Fee: <strong className="text-primary">{commissionPct}%</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAssign}
                  onChange={(e) => setAutoAssign(e.target.checked)}
                  className="rounded border-border text-accent focus:ring-accent mt-0.5"
                />
                <span className="font-semibold text-secondary font-sans text-xs">
                  Auto-Dispatch Dedicated Highway Cab (e.g. Toyota Innova Crysta / Ertiga) upon Mutual Passenger Match Acceptance
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-accent text-white hover:bg-accent-hover font-mono font-semibold text-xs uppercase tracking-wider transition-all shadow-subtle"
              >
                Save Economics Policy
              </button>
            </div>

            {configSaved && (
              <p className="text-xs font-mono text-success font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>// Configuration successfully propagated across all corridor pricing engines.</span>
              </p>
            )}
          </form>
        </div>
      )}

    </div>
  );
};
