import React, { useState, useEffect } from 'react';
import { 
  getAdminAnalytics, 
  updateSystemConfig 
} from '../services/api';
import { 
  ShieldCheck, 
  Users, 
  Car, 
  TrendingDown, 
  Leaf, 
  AlertTriangle, 
  Sliders, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Settings,
  Sparkles,
  Terminal,
  Activity
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-xs text-hopin-muted">
        // ACCESSING NETWORK OPERATIONS TERMINAL...
      </div>
    );
  }

  const { analytics, recentIncidents, recentRides, recentMatches } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-hopin-dark pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-hopin-muted uppercase mb-2">
            <Terminal className="w-3.5 h-3.5 text-hopin-cobalt" />
            <span>// OPS.CONTROL_CENTER // v2.4</span>
            <span>•</span>
            <span className="text-hopin-lime bg-hopin-dark px-1.5 py-0.5 rounded-sm font-bold">SYSTEM ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-hopin-dark tracking-tight">
            hopin Operations & Network Control
          </h1>
          <p className="text-xs sm:text-sm text-hopin-muted font-sans mt-1 max-w-2xl">
            Real-time highway route telemetry, algorithm compatibility verification, trust & safety enforcement, and platform economics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all border-2 border-hopin-dark ${
              activeTab === 'kpis'
                ? 'bg-hopin-dark text-hopin-lime shadow-[3px_3px_0px_0px_#C5F55A]'
                : 'bg-white text-hopin-dark hover:bg-hopin-bg'
            }`}
          >
            [01 // NETWORK KPIS]
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all border-2 border-hopin-dark ${
              activeTab === 'incidents'
                ? 'bg-hopin-dark text-hopin-lime shadow-[3px_3px_0px_0px_#C5F55A]'
                : 'bg-white text-hopin-dark hover:bg-hopin-bg'
            }`}
          >
            [02 // INCIDENT DESK ({recentIncidents?.length || 0})]
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all border-2 border-hopin-dark ${
              activeTab === 'config'
                ? 'bg-hopin-dark text-hopin-lime shadow-[3px_3px_0px_0px_#C5F55A]'
                : 'bg-white text-hopin-dark hover:bg-hopin-bg'
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
            
            <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
              <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
                // TOTAL ROUTE BOOKINGS
              </span>
              <p className="text-3xl font-display font-black text-hopin-dark">{analytics?.totalRides || 10}</p>
              <div className="flex items-center gap-2 text-[11px] font-mono mt-1.5">
                <span className="text-emerald-700 font-bold">{analytics?.completedRides} completed</span>
                <span className="text-hopin-muted">•</span>
                <span className="text-hopin-cobalt font-bold">{analytics?.inProgressRides} active</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
              <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
                // MATCH ACCEPTANCE RATE
              </span>
              <p className="text-3xl font-display font-black text-hopin-dark">{analytics?.matchAcceptanceRatePct || 84}%</p>
              <p className="text-[11px] font-mono text-emerald-700 font-bold mt-1.5">
                Dual-passenger verified pools
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
              <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
                // FARE SAVINGS GENERATED
              </span>
              <p className="text-3xl font-display font-black text-hopin-dark">₹{(analytics?.totalSavingsINR || 14850).toLocaleString()}</p>
              <p className="text-[11px] font-mono text-emerald-700 font-bold mt-1.5">
                ~37% saved per commuter
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]">
              <span className="text-[10px] font-mono font-bold text-hopin-muted uppercase tracking-wider block mb-1">
                // EMISSIONS REDUCED (CO2)
              </span>
              <p className="text-3xl font-display font-black text-hopin-dark">{analytics?.totalCo2AvoidedKg || 240} kg</p>
              <p className="text-[11px] font-mono text-hopin-cobalt font-bold mt-1.5">
                Eliminated highway empty runs
              </p>
            </div>

          </div>

          {/* Recent Rides & Matches Monitor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Live Rides Feed */}
            <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-3">
                <div className="flex items-center gap-2 font-mono">
                  <Activity className="w-4 h-4 text-hopin-cobalt" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-hopin-dark">
                    LIVE RIDE PIPELINE MONITOR
                  </h3>
                </div>
                <span className="text-xs font-mono text-hopin-muted">// STREAMING</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {recentRides?.slice(0, 6).map((r: any) => (
                  <div key={r.id} className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-hopin-dark font-sans">{r.passengerName}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-white border border-hopin-dark text-hopin-dark uppercase">
                          {r.journeyType}
                        </span>
                      </div>
                      <p className="text-hopin-muted text-[11px] mt-0.5 font-sans">
                        {r.pickup.name.split(',')[0]} → {r.dropoff.name.split(',')[0]}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase border border-hopin-dark ${
                        r.status === 'completed' ? 'bg-white text-hopin-muted' :
                        r.status === 'in_progress' ? 'bg-hopin-lime text-hopin-dark' : 'bg-hopin-cobalt text-white'
                      }`}>
                        {r.status.replace('_', ' ')}
                      </span>
                      <p className="font-display font-black text-hopin-dark text-sm mt-1">₹{r.fare}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Matches Feed */}
            <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-hopin-dark pb-3">
                <div className="flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-hopin-cobalt" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-hopin-dark">
                    ALGORITHM MATCH EVALUATIONS
                  </h3>
                </div>
                <span className="text-xs font-mono text-hopin-muted">// MATRIX LOG</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {recentMatches?.map((m: any) => (
                  <div key={m.id} className="p-3.5 rounded-lg bg-hopin-bg border-2 border-hopin-dark space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-hopin-dark font-sans">{m.routeTitle}</span>
                      <span className="bg-hopin-lime text-hopin-dark border border-hopin-dark font-black text-[10px] px-2 py-0.5 rounded-sm">
                        {m.score}% SCORE
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-hopin-muted text-[11px]">
                      <span>{m.passengerAName} + {m.passengerBName}</span>
                      <span className="font-bold text-emerald-700">Combined Savings: ₹{m.pricing?.passengerA?.savingsAmount * 2 || 2800}</span>
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
        <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 space-y-6">
          <div className="border-b-2 border-hopin-dark pb-4">
            <h3 className="text-lg font-display font-black text-hopin-dark flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Trust & Safety Escalations Desk</span>
            </h3>
            <p className="text-xs font-mono text-hopin-muted mt-0.5">
              Review commuter incident reports, emergency SOS telemetry triggers, and moderate flagged reviews.
            </p>
          </div>

          {recentIncidents?.length === 0 ? (
            <p className="text-xs font-mono text-hopin-muted py-8 text-center">// NO OPEN INCIDENTS IN DISPATCH QUEUE</p>
          ) : (
            <div className="space-y-4 font-mono text-xs">
              {recentIncidents.map((inc: any) => (
                <div key={inc.id} className="p-4 rounded-lg border-2 border-hopin-dark bg-hopin-bg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-hopin-dark">INCIDENT #{inc.id}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm border border-hopin-dark ${
                        inc.severity === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inc.category} • {inc.severity}
                      </span>
                    </div>
                    <span className="text-[10px] bg-white border border-hopin-dark text-hopin-dark px-2 py-0.5 rounded-sm uppercase font-bold">
                      STATUS: {inc.status}
                    </span>
                  </div>

                  <p className="text-hopin-dark font-sans text-xs">{inc.description}</p>
                  <p className="text-[11px] text-hopin-muted">
                    Reported by: <strong className="text-hopin-dark">{inc.reporterName}</strong> • {new Date(inc.createdAt).toLocaleString()}
                  </p>

                  {inc.status === 'investigating' && (
                    <div className="pt-2 border-t border-hopin-dark/30 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleResolveIncident(inc.id)}
                        className="px-4 py-2 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black font-mono font-bold text-xs uppercase tracking-wider transition-colors border border-hopin-dark shadow-[2px_2px_0px_0px_#C5F55A]"
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
        <div className="bg-white rounded-xl border-2 border-hopin-dark shadow-[6px_6px_0px_0px_#171916] p-6 sm:p-8 max-w-2xl space-y-6">
          <div className="border-b-2 border-hopin-dark pb-4">
            <h3 className="text-lg font-display font-black text-hopin-dark flex items-center gap-2">
              <Settings className="w-5 h-5 text-hopin-cobalt" />
              <span>Platform Fare Policy & Economics</span>
            </h3>
            <p className="text-xs font-mono text-hopin-muted mt-0.5">
              Tune platform commission take rate, driver payout share, and fleet dispatch allocation rules.
            </p>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-6 font-mono text-xs">
            <div>
              <label className="block font-bold text-hopin-dark mb-2 uppercase tracking-wider">
                Platform Maintenance Fee Take Rate ({commissionPct}%)
              </label>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={commissionPct}
                onChange={(e) => setCommissionPct(Number(e.target.value))}
                className="w-full accent-hopin-dark cursor-pointer h-2 bg-hopin-bg rounded-lg border border-hopin-dark"
              />
              <div className="flex justify-between text-[11px] text-hopin-muted mt-2">
                <span>Direct Captain Payout: <strong className="text-hopin-dark">{100 - commissionPct}%</strong></span>
                <span>Platform Maintenance Fee: <strong className="text-hopin-dark">{commissionPct}%</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-hopin-dark">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAssign}
                  onChange={(e) => setAutoAssign(e.target.checked)}
                  className="rounded text-hopin-dark focus:ring-hopin-lime mt-0.5"
                />
                <span className="font-bold text-hopin-dark font-sans text-xs">
                  Auto-Dispatch Dedicated Highway Cab (e.g. Toyota Innova Crysta / Ertiga) upon Mutual Passenger Match Acceptance
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-hopin-dark text-hopin-lime hover:bg-black font-mono font-bold text-xs uppercase tracking-wider transition-all border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#C5F55A]"
              >
                Save Economics Policy
              </button>
            </div>

            {configSaved && (
              <p className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>// Configuration successfully propagated across all corridor pricing engines.</span>
              </p>
            )}
          </form>
        </div>
      )}

    </div>
  );
};
