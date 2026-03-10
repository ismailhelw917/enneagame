import React from 'react';
import { motion } from 'motion/react';
import { Brain, Heart, Shield, Target, Zap, Activity } from 'lucide-react';

const AboutEnneagram = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 sm:space-y-12"
      >
        <section className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight">What is the Enneagram?</h1>
          <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto px-2">
            A profound map of the human psyche, describing nine distinct personality types and their complex interconnections.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Brain className="text-cyan-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Head Center</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Types 5, 6, and 7. Driven by a need for security, knowledge, and mental clarity. They process the world through analysis and planning.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Heart className="text-yellow-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Heart Center</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Types 2, 3, and 4. Driven by a need for connection, identity, and validation. They process the world through emotion and image.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <Shield className="text-red-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">The Gut Center</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Types 8, 9, and 1. Driven by a need for autonomy, justice, and peace. They process the world through instinct and action.
            </p>
          </div>
        </div>

        <section className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-3xl font-serif italic text-white">Why it matters for Gaming</h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="mt-1"><Target className="w-5 h-5 text-cyan-500" /></div>
              <div>
                <h4 className="font-bold text-white">Strategic Alignment</h4>
                <p className="text-gray-400 text-sm">Understanding your core motivations helps you choose roles that feel natural rather than forced.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Zap className="w-5 h-5 text-yellow-500" /></div>
              <div>
                <h4 className="font-bold text-white">Tilt Management</h4>
                <p className="text-gray-400 text-sm">Each type has specific "stress points." Knowing yours allows you to recognize when you're slipping into unproductive play patterns.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><Activity className="w-5 h-5 text-red-500" /></div>
              <div>
                <h4 className="font-bold text-white">Team Synergy</h4>
                <p className="text-gray-400 text-sm">A balanced team often mirrors a balanced Enneagram circle, with different types covering each other's blind spots.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center pb-12">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Synthesized from Riso-Hudson, Palmer, and Chestnut traditions.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutEnneagram;
