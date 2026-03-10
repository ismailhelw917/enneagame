import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sword, Info } from 'lucide-react';
import { enneagramData } from '../data/enneagram';

const StrategyPage = () => {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-12 pb-24">
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
          General Combat Doctrine
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg">
          Universal strategic frameworks for each Enneagram archetype across all gaming simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enneagramData.map((type) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-2xl border bg-opacity-10 
                ${type.center === 'Head' ? 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30' : 
                  type.center === 'Heart' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-950/30' : 
                  'text-red-400 border-red-400/30 bg-red-950/30'}`}>
                {type.id}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{type.name}</h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{type.center} Center</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 uppercase">
                  <Sword className="w-3 h-3" /> Offensive Doctrine
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {type.gamingStyle.advantage}. Focus on leveraging your {type.gamingStyle.strengths.split(',')[0]} to dictate the pace of engagement.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase">
                  <Shield className="w-3 h-3" /> Defensive Protocol
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Mitigate your {type.gamingStyle.weaknesses.split(',')[0]} by positioning yourself near {type.center === 'Head' ? 'intel sources' : type.center === 'Heart' ? 'allies' : 'choke points'}.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase mb-2">
                  <Info className="w-3 h-3" /> Tactical Summary
                </div>
                <p className="text-xs text-gray-500 italic">
                  "The {type.name} thrives when they can {type.coreDesire.toLowerCase().replace('to ', '')} without fear of {type.coreFear.toLowerCase().replace('to ', '')}."
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default StrategyPage;
