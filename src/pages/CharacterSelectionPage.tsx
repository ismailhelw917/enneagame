import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, UserPlus, Shield, Zap, Target, Brain, Heart, Anchor, Search, ArrowLeft, AlertTriangle, CheckCircle2, Trophy, ArrowDown } from 'lucide-react';
import { enneagramData } from '../data/enneagram';

const CharacterSelectionPage = () => {
  const [viewingTypeId, setViewingTypeId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getCenterColor = (center: string) => {
    switch (center) {
      case 'Head': return 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30';
      case 'Heart': return 'text-yellow-400 border-yellow-400/30 bg-yellow-950/30';
      case 'Gut': return 'text-red-400 border-red-400/30 bg-red-950/30';
      default: return 'text-gray-400';
    }
  };

  const getArchetypeIcon = (typeId: number) => {
    switch (typeId) {
      case 1: return <Target className="w-5 h-5" />;
      case 2: return <Heart className="w-5 h-5" />;
      case 3: return <Zap className="w-5 h-5" />;
      case 4: return <Brain className="w-5 h-5" />;
      case 5: return <Search className="w-5 h-5" />;
      case 6: return <Shield className="w-5 h-5" />;
      case 7: return <Zap className="w-5 h-5" />;
      case 8: return <Anchor className="w-5 h-5" />;
      case 9: return <Users className="w-5 h-5" />;
      default: return <UserPlus className="w-5 h-5" />;
    }
  };

  const characterAdvice = [
    {
      typeId: 1,
      archetype: "The Precision Specialist",
      advice: "Look for characters with high skill floors and clear, logical mechanics. You excel when there is a 'correct' way to play. Avoid chaotic or RNG-heavy characters.",
      examples: "Sniper, Sentinel, Chess Grandmaster, Control Mage.",
      deepDive: {
        strengths: ["Unmatched consistency", "Flawless execution of complex combos", "High positional discipline"],
        weaknesses: ["Frustration with teammate errors", "Difficulty adapting to chaotic, non-logical playstyles", "Over-focusing on minor mistakes"],
        tiltManagement: "Focus on your own mechanical purity. If a teammate fails, treat it as an environmental variable rather than a personal affront to the game's logic.",
        synergies: "Thrives with Type 6 (Security) and Type 5 (Information)."
      }
    },
    {
      typeId: 2,
      archetype: "The Force Multiplier",
      advice: "Choose characters that directly enable others. Your map awareness is naturally tuned to ally needs. Look for utility-heavy kits that reward selfless play.",
      examples: "Healer, Enchanter, Guardian, Buff Specialist.",
      deepDive: {
        strengths: ["Exceptional team awareness", "High emotional resilience", "Natural ability to peel and protect"],
        weaknesses: ["Neglecting own safety for others", "Feeling unappreciated if the team doesn't acknowledge support", "Difficulty playing selfish carry roles"],
        tiltManagement: "Your value isn't just in the 'Thank You' messages. Watch the replay to see how your peel literally saved the round.",
        synergies: "Thrives with Type 8 (Aggression) and Type 3 (High Agency)."
      }
    },
    {
      typeId: 3,
      archetype: "The High-Agency Carry",
      advice: "Pick characters that can dictate the game's outcome through individual performance. You thrive on the scoreboard and being the clear MVP.",
      examples: "Duelist, Hyper-Carry, Assassin, Star Striker.",
      deepDive: {
        strengths: ["Incredible clutch potential", "High motivation to improve", "Efficient resource management"],
        weaknesses: ["Over-extending for 'clips'", "Blaming the team for lack of resources", "Burnout from constant high-pressure play"],
        tiltManagement: "Winning is the ultimate metric, not just your K/D. Sometimes the most 'MVP' play is baiting for your team to secure the objective.",
        synergies: "Thrives with Type 2 (Support) and Type 9 (Flexibility)."
      }
    },
    {
      typeId: 4,
      archetype: "The Off-Meta Artist",
      advice: "Seek out unique, complex characters with high expressive potential. You want to play something that feels like 'you', even if it's not the meta pick.",
      examples: "Specialist, One-Trick, Creative Pathmaker, Lore-Heavy Hero.",
      deepDive: {
        strengths: ["Unpredictable strategies", "Deep mastery of niche mechanics", "High creative problem solving"],
        weaknesses: ["Refusing to play meta even when necessary", "Feeling misunderstood by teammates", "Emotional volatility during losing streaks"],
        tiltManagement: "Your uniqueness is your edge. When the meta fails, your 'weird' pick is often the only thing that can break the stalemate.",
        synergies: "Thrives with Type 5 (Knowledge) and Type 7 (Stimulation)."
      }
    },
    {
      typeId: 5,
      archetype: "The Information Architect",
      advice: "Select characters that reward deep knowledge and preparation. You win by out-thinking the opponent and having more data than they do.",
      examples: "Jungler, Tactician, Trapper, Long-Range Scout.",
      deepDive: {
        strengths: ["Perfect map control", "Anticipating enemy rotations", "Efficient utility usage"],
        weaknesses: ["Analysis paralysis", "Difficulty with sudden, aggressive rushes", "Detachment from the team's immediate needs"],
        tiltManagement: "Information is power, but action is the payoff. Don't wait for 100% certainty; 70% is often enough to make the winning play.",
        synergies: "Thrives with Type 1 (Precision) and Type 6 (Security)."
      }
    },
    {
      typeId: 6,
      archetype: "The Defensive Anchor",
      advice: "Look for characters that provide security and stability. You are the best at predicting threats and holding the line when things get chaotic.",
      examples: "Tank, Point Man, Area Denial, Prophylactic Player.",
      deepDive: {
        strengths: ["Unshakeable defense", "High reliability under pressure", "Excellent threat assessment"],
        weaknesses: ["Hesitation to take risks", "Anxiety about unknown variables", "Over-preparing for unlikely scenarios"],
        tiltManagement: "Trust your preparation. You've already accounted for the worst-case scenario; now execute the plan.",
        synergies: "Thrives with Type 9 (Stability) and Type 1 (Order)."
      }
    },
    {
      typeId: 7,
      archetype: "The Kinetic Disruptor",
      advice: "Choose high-mobility, fast-paced characters with lots of options. You need constant stimulation and the ability to pivot strategies on the fly.",
      examples: "Roamer, Flanker, Entry Fragger, High-APM Hero.",
      deepDive: {
        strengths: ["High mechanical speed", "Unpredictable movement", "Great at breaking stalemates"],
        weaknesses: ["Boredom in slow-paced games", "Lack of focus on boring objectives", "Impulsive decision making"],
        tiltManagement: "Channel your energy into the objective. The 'fun' comes from the win, not just the flashy movement.",
        synergies: "Thrives with Type 3 (Success) and Type 8 (Power)."
      }
    },
    {
      typeId: 8,
      archetype: "The Frontline Commander",
      advice: "Pick characters that can force engagements and command space. You want to be the one who decides when and where the fight happens.",
      examples: "Main Tank, Initiator, Bruiser, In-Game Leader.",
      deepDive: {
        strengths: ["Fearless initiation", "High physical/mental presence", "Natural leadership"],
        weaknesses: ["Aggression without backup", "Intimidating teammates unintentionally", "Difficulty playing passive roles"],
        tiltManagement: "Leadership requires followers. Make sure your team is ready before you dive in. Your strength is only as effective as the follow-up.",
        synergies: "Thrives with Type 2 (Helper) and Type 5 (Strategist)."
      }
    },
    {
      typeId: 9,
      archetype: "The Versatile Flex",
      advice: "You are the ultimate 'fill' player. Look for well-rounded characters that can adapt to what the team needs in the moment.",
      examples: "Flex Role, Utility Tank, Support-Damage Hybrid, All-Rounder.",
      deepDive: {
        strengths: ["High adaptability", "Conflict resolution in comms", "Broad hero pool"],
        weaknesses: ["Lack of 'killer instinct'", "Being too passive in key moments", "Losing your own identity in the team's needs"],
        tiltManagement: "Your peace is your power. When the team is screaming, your calm voice is the anchor they need to refocus.",
        synergies: "Thrives with Type 6 (Loyalty) and Type 3 (Achievement)."
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-full flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {!viewingTypeId ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col h-full"
          >
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 shrink-0">
              <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
                Character <span className="text-cyan-500">Selection</span> Guide
              </h1>
              <p className="text-gray-400">
                Stop fighting your nature. Choose the character archetype that aligns with your Enneagram core to maximize performance and minimize tilt.
              </p>
            </div>

            <div 
              ref={scrollRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 overflow-y-auto pb-12 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {enneagramData.map((type) => {
                const advice = characterAdvice.find(a => a.typeId === type.id);
                return (
                  <motion.div
                    key={type.id}
                    layout
                    onClick={() => setViewingTypeId(type.id)}
                    whileHover={{ scale: 1.02, y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex flex-col p-10 md:p-12 min-h-[520px] rounded-[40px] border border-white/5 bg-[#0f0f0f] hover:border-white/20 transition-all duration-300 cursor-pointer shadow-2xl overflow-hidden group"
                  >
                    {/* Center Accent Background */}
                    <div className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[100px] opacity-10 transition-all duration-500 group-hover:opacity-20 ${
                      type.center === 'Head' ? 'bg-cyan-500' : type.center === 'Heart' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />

                    <div className="flex items-start justify-between mb-10 relative z-10">
                      <div className="flex items-center gap-6">
                        <div className={`text-6xl font-mono font-black tracking-tighter ${getCenterColor(type.center).split(' ')[0]}`}>
                          {type.id}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-white font-black uppercase text-lg tracking-tight leading-none">{type.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              type.center === 'Head' ? 'bg-cyan-500' : type.center === 'Heart' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                            <span className="text-[11px] text-gray-500 font-mono uppercase tracking-[0.2em]">{type.center} Center</span>
                          </div>
                        </div>
                      </div>
                      <div className={`${getCenterColor(type.center).split(' ')[0]} p-4 rounded-2xl bg-white/5 border border-white/5`}>
                        {getArchetypeIcon(type.id)}
                      </div>
                    </div>

                    <div className="space-y-10 flex-1 relative z-10">
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-mono text-cyan-500 uppercase tracking-[0.2em] font-bold">Recommended Archetype</h4>
                        <p className="text-3xl font-black text-white tracking-tight uppercase italic leading-tight">{advice?.archetype}</p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">Strategic Advice</h4>
                        <p className="text-base text-gray-400 leading-relaxed font-medium">
                          {advice?.advice}
                        </p>
                      </div>

                      <div className="pt-10 border-t border-white/5 mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">View Full Profile</span>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-cyan-500 rotate-180 group-hover:text-black transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <button
              className="md:hidden fixed bottom-6 right-6 z-50 bg-cyan-600 text-white p-4 rounded-full shadow-lg"
              onClick={() => scrollRef.current?.scrollBy({ top: 300, behavior: 'smooth' })}
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full overflow-hidden"
          >
            <button 
              onClick={() => setViewingTypeId(null)}
              className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest w-fit mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Selection
            </button>

            {(() => {
              const type = enneagramData.find(t => t.id === viewingTypeId);
              const advice = characterAdvice.find(a => a.typeId === viewingTypeId);
              if (!type || !advice) return null;

              return (
                <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-12 pb-12">
                  {/* Hero Section */}
                  <div className="relative p-12 rounded-[40px] bg-[#0f0f0f] border border-white/5 overflow-hidden">
                    <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${
                      type.center === 'Head' ? 'bg-cyan-500' : type.center === 'Heart' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-6">
                          <span className={`text-8xl font-mono font-black tracking-tighter ${getCenterColor(type.center).split(' ')[0]}`}>
                            {type.id}
                          </span>
                          <div className="space-y-2">
                            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">{type.name}</h2>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${getCenterColor(type.center)}`}>
                                {type.center} Center
                              </span>
                              <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">Tactical Profile // {advice.archetype}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl italic">
                          "{advice.advice}"
                        </p>
                      </div>
                      <div className={`${getCenterColor(type.center).split(' ')[0]} p-8 rounded-[32px] bg-white/5 border border-white/5 scale-150 lg:mr-12`}>
                        {getArchetypeIcon(type.id)}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Strengths & Weaknesses */}
                    <div className="space-y-8">
                      <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 space-y-6">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          Core Strengths
                        </h3>
                        <div className="space-y-4">
                          {advice.deepDive.strengths.map((s, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <p className="text-gray-400 text-sm">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 space-y-6">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          Potential Pitfalls
                        </h3>
                        <div className="space-y-4">
                          {advice.deepDive.weaknesses.map((w, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                              <p className="text-gray-400 text-sm">{w}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tilt & Synergy */}
                    <div className="space-y-8">
                      <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 space-y-6">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <Brain className="w-5 h-5 text-cyan-500" />
                          Tilt Management
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                          {advice.deepDive.tiltManagement}
                        </p>
                      </div>

                      <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 space-y-6">
                        <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <Users className="w-5 h-5 text-yellow-500" />
                          Team Synergy
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {advice.deepDive.synergies}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-3">
                          {advice.examples.split(', ').map((ex, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                              <Trophy className="w-3 h-3 text-cyan-500" />
                              <span className="text-xs font-mono text-white">{ex}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterSelectionPage;
