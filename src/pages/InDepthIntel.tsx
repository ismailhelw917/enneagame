import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { enneagramData } from '../data/enneagram';
import { BarChart3, Shield, Zap, Target, Brain, Activity, TrendingUp, Users, AlertTriangle, Lock, CreditCard, Sparkles, LayoutGrid, MousePointer2 } from 'lucide-react';

const InDepthIntel = () => {
  const [selectedTypeId, setSelectedTypeId] = useState<number>(1);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already paid (mocking with localStorage for this demo)
    const paid = localStorage.getItem('enneagram_intel_paid');
    if (paid === 'true') setIsUnlocked(true);

    // Check URL params for success
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      localStorage.setItem('enneagram_intel_paid', 'true');
      setIsUnlocked(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleUnlock = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const session = await response.json();
      
      if (session.error) {
        throw new Error(session.error);
      }

      if (session.url) {
        // Real Stripe Checkout redirect
        window.location.href = session.url;
      } else if (session.id) {
        // Fallback for older Stripe versions or simulations
        console.log("Session ID received:", session.id);
        // In a real production environment with a valid key, session.url will be present.
        // If it's missing, we simulate success for the demo/preview.
        setTimeout(() => {
          localStorage.setItem('enneagram_intel_paid', 'true');
          setIsUnlocked(true);
          setIsLoading(false);
        }, 1500);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Checkout error:", err);
      alert(`Checkout Error: ${err.message}\n\nNote: Ensure STRIPE_SECRET_KEY is correctly set in your environment variables.`);
      setIsLoading(false);
    }
  };

  const selectedType = enneagramData.find(t => t.id === selectedTypeId)!;

  const StatBar = ({ label, value, color, icon: Icon }: { label: string, value: number, color: string, icon?: React.ElementType }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-gray-500">
        <span className="flex items-center gap-1">
          {Icon && <Icon className="w-2.5 h-2.5" />}
          {label}
        </span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12 space-y-8 sm:space-y-12 pb-24 relative">
      {/* SEO Optimized Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase italic">
          Deep <span className="text-cyan-500">Intel</span> Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">
          Advanced behavioral analytics and tactical recommendations for high-level competitive play. Master your Enneagram type in gaming.
        </p>
      </div>

      {/* Type Selector */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 border-b border-white/5">
        {enneagramData.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedTypeId(type.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-mono text-xs transition-all border ${
              selectedTypeId === type.id
                ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
            }`}
          >
            TYPE {type.id}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Paywall Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 rounded-3xl border border-white/10">
            <div className="max-w-md w-full mx-4 p-8 bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/10 text-center space-y-6">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20">
                <Lock className="w-10 h-10 text-cyan-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Premium Intel Locked</h3>
                <p className="text-gray-400 text-sm">
                  Unlock full behavioral analytics, 9+ performance metrics, and tactical win conditions for all Enneagram types.
                </p>
              </div>
              <div className="py-4 border-y border-white/5 space-y-2">
                <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                  <span>One-time Access</span>
                  <span className="text-cyan-400">$0.99</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                  <span>Lifetime Updates</span>
                  <span className="text-emerald-400">Included</span>
                </div>
              </div>
              <button
                onClick={handleUnlock}
                disabled={isLoading}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Unlock Now
                  </>
                )}
              </button>
              <p className="text-[10px] text-gray-600 font-mono uppercase">Secure Checkout via Stripe</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTypeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 ${!isUnlocked ? 'filter blur-sm pointer-events-none select-none' : ''}`}
          >
            {/* Left Column: Profile & Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-bold text-3xl border bg-opacity-10 
                    ${selectedType.center === 'Head' ? 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30' : 
                      selectedType.center === 'Heart' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-950/30' : 
                      'text-red-400 border-red-400/30 bg-red-950/30'}`}>
                    {selectedType.id}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">{selectedType.name}</h2>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{selectedType.center} Center</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> Core Performance
                  </h3>
                  <div className="space-y-4">
                    <StatBar label="Mechanical Precision" value={selectedType.intel.stats.mechanics} color="bg-cyan-500" icon={MousePointer2} />
                    <StatBar label="Strategic Depth" value={selectedType.intel.stats.strategy} color="bg-purple-500" icon={LayoutGrid} />
                    <StatBar label="Communication" value={selectedType.intel.stats.comms} color="bg-blue-500" icon={Users} />
                    <StatBar label="Mental Fortitude" value={selectedType.intel.stats.mental} color="bg-emerald-500" icon={Shield} />
                    <StatBar label="Adaptability" value={selectedType.intel.stats.adaptability} color="bg-orange-500" icon={Zap} />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Advanced Metrics
                  </h3>
                  <div className="space-y-4">
                    <StatBar label="Clutch Factor" value={selectedType.intel.stats.clutchFactor} color="bg-red-500" icon={Zap} />
                    <StatBar label="Map Awareness" value={selectedType.intel.stats.mapAwareness} color="bg-indigo-500" icon={Target} />
                    <StatBar label="Resource Efficiency" value={selectedType.intel.stats.resourceEfficiency} color="bg-yellow-500" icon={Activity} />
                    <StatBar label="Tilt Resistance" value={selectedType.intel.stats.tiltResistance} color="bg-teal-500" icon={Shield} />
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <TrendingUp className="w-3 h-3" /> Growth Path
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{selectedType.intel.growthPath}"
                </p>
              </div>
            </div>

            {/* Middle Column: Tactical Intel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> Tilt Factor
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.tiltFactor}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-yellow-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Stress Response
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.stressResponse}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-blue-500 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3 h-3" /> Team Synergy
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.teamSynergy}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-3 h-3" /> Win Condition
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedType.intel.winCondition}
                  </p>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Brain className="w-32 h-32" />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold text-white uppercase italic">Psychological Synthesis</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedType.synthesis}
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Core Desire</span>
                      <span className="text-sm text-white">{selectedType.coreDesire}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Core Fear</span>
                      <span className="text-sm text-white">{selectedType.coreFear}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InDepthIntel;

