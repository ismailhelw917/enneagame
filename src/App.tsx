import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PrivacyPage from './pages/PrivacyPage';
import StrategyPage from './components/StrategyPage';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Brain, Heart, Crosshair, Zap, Activity, Target, Sword, Search, Play, ArrowLeft, Monitor } from 'lucide-react';
import { GameStrategy } from './data/types';
import { enneagramData, gameStrategies } from './data/enneagram';

const AdUnit = () => {
  const adRef = React.useRef<HTMLModElement>(null);

  React.useEffect(() => {
    const initAd = () => {
      try {
        // Only push if the element exists and hasn't been initialized yet
        if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        // Suppress the specific "already have ads" error which is common in SPAs
        if (e instanceof Error && !e.message.includes("already have ads")) {
          console.error('AdSense error:', e);
        }
      }
    };

    // Small delay to ensure script is ready and DOM is stable
    const timer = setTimeout(initAd, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-8">
      <div className="w-full min-h-[100px] bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4">
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-2">Sponsored Intelligence</span>
        <ins 
             ref={adRef}
             className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-0000000000000000"
             data-ad-slot="0000000000"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

function App() {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'synthesis' | 'games' | 'strategy'>('synthesis');
  const [selectedGame, setSelectedGame] = useState<GameStrategy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isPrivacyPage = location.pathname === '/privacy';

  const getCenterColor = (center: string) => {
    switch (center) {
      case 'Head': return 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30';
      case 'Heart': return 'text-yellow-400 border-yellow-400/30 bg-yellow-950/30';
      case 'Gut': return 'text-red-400 border-red-400/30 bg-red-950/30';
      default: return 'text-gray-400';
    }
  };

  const getCenterIcon = (center: string) => {
    switch (center) {
      case 'Head': return <Brain className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4" />;
      case 'Gut': return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredGames = useMemo(() => {
    return gameStrategies.filter(game => 
      game.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500/30 pb-12">
      {isPrivacyPage ? (
        <PrivacyPage />
      ) : (
        <>
          {/* Header */}
          <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('synthesis'); setSelectedGame(null); }}>
            <Target className="w-6 h-6 text-cyan-500" />
            <span className="font-mono font-bold tracking-tighter text-xl">Enneagram & Games</span>
          </Link>
          <nav className="flex gap-1 bg-white/5 p-1 rounded-lg">
            <button
              onClick={() => { setActiveTab('synthesis'); setSelectedGame(null); }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'synthesis' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Synthesis
            </button>
            <button
              onClick={() => { setActiveTab('strategy'); setSelectedGame(null); }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'strategy' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Strategy
            </button>
            <button
              onClick={() => { setActiveTab('games'); setSelectedGame(null); }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'games' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Games
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'synthesis' ? (
            <motion.div
              key="synthesis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col h-full items-center justify-start pt-20 p-4"
            >
              <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 relative z-20">
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase italic leading-none">
                  Enneagram <span className="text-cyan-500">Gaming</span> Theory
                </h1>
              </div>

              {/* Enneagram Geometry */}
              <div className="flex flex-col items-center justify-center flex-1 w-full max-h-[65vh] relative z-10">
                <div className="relative w-full max-w-2xl aspect-square">
                  <svg viewBox="-300 -300 600 600" className="w-full h-full drop-shadow-2xl overflow-visible">
                    {/* Circle */}
                    <circle cx="0" cy="0" r="150" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                    
                    {/* Triangle (9-6-3) */}
                    <path 
                      d={`M ${150 * Math.cos((9 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((9 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((6 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((6 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((3 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((3 * 40 - 90) * Math.PI / 180)} Z`}
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      className="text-white/20"
                    />

                    {/* Hexad (1-4-2-8-5-7) */}
                    <path 
                      d={`M ${150 * Math.cos((1 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((1 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((4 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((4 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((2 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((2 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((8 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((8 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((5 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((5 * 40 - 90) * Math.PI / 180)} 
                          L ${150 * Math.cos((7 * 40 - 90) * Math.PI / 180)} ${150 * Math.sin((7 * 40 - 90) * Math.PI / 180)} Z`}
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      className="text-white/20"
                    />

                    {/* Geometry Points & Nodes */}
                    {enneagramData.map((type) => {
                      const angle = (type.id * 40 - 90) * Math.PI / 180;
                      const x = 150 * Math.cos(angle);
                      const y = 150 * Math.sin(angle);
                      
                      const labelConfig: Record<number, {x: number, y: number, align: string}> = {
                        1: { x: 180, y: -180, align: "start" },
                        2: { x: 230, y: -40, align: "start" },
                        3: { x: 210, y: 110, align: "start" },
                        4: { x: 100, y: 220, align: "middle" },
                        5: { x: -100, y: 220, align: "middle" },
                        6: { x: -210, y: 110, align: "end" },
                        7: { x: -230, y: -40, align: "end" },
                        8: { x: -180, y: -180, align: "end" },
                        9: { x: 0, y: -198, align: "middle" }
                      };

                      const config = labelConfig[type.id];

                      return (
                        <g key={`node-${type.id}`} onClick={() => setSelectedType(type.id)} className="cursor-pointer group">
                          {/* Connecting Line to Label */}
                          <line x1={x} y1={y} x2={config.x} y2={config.y} stroke="currentColor" strokeWidth="1" className="text-white/5 group-hover:text-cyan-500/30 transition-colors" />
                          
                          {/* Node Circle */}
                          <circle 
                            cx={x} 
                            cy={y} 
                            r="18" 
                            className={`fill-[#050505] stroke-2 transition-all duration-300 ${
                              type.center === 'Head' ? 'stroke-cyan-500 group-hover:fill-cyan-900' : 
                              type.center === 'Heart' ? 'stroke-yellow-500 group-hover:fill-yellow-900' : 
                              'stroke-red-500 group-hover:fill-red-900'
                            }`} 
                          />
                          
                          {/* Number */}
                          <text 
                            x={x} 
                            y={y} 
                            dy="0.35em" 
                            textAnchor="middle" 
                            className="fill-white text-[12px] font-mono font-bold pointer-events-none"
                          >
                            {type.id}
                          </text>
                        </g>
                      );
                    })}

                    {/* Labels Layer (Rendered last to be on top) */}
                    {enneagramData.map((type) => {
                      const labelConfig: Record<number, {x: number, y: number, align: string}> = {
                        1: { x: 180, y: -180, align: "start" },
                        2: { x: 230, y: -40, align: "start" },
                        3: { x: 210, y: 110, align: "start" },
                        4: { x: 100, y: 220, align: "middle" },
                        5: { x: -100, y: 220, align: "middle" },
                        6: { x: -210, y: 110, align: "end" },
                        7: { x: -230, y: -40, align: "end" },
                        8: { x: -180, y: -180, align: "end" },
                        9: { x: 0, y: -198, align: "middle" }
                      };
                      const config = labelConfig[type.id];

                      return (
                        <foreignObject 
                          key={`label-${type.id}`}
                          x={config.align === 'middle' ? config.x - 125 : config.align === 'end' ? config.x - 250 : config.x} 
                          y={config.y - 12} 
                          width="250" 
                          height="32"
                          className="pointer-events-none"
                        >
                          <div className={`text-[10px] md:text-xs font-mono font-bold transition-all duration-300 ${
                            type.center === 'Head' ? 'text-cyan-500' : 
                            type.center === 'Heart' ? 'text-yellow-500' : 
                            'text-red-500'
                          } opacity-90 whitespace-nowrap ${
                            config.align === 'middle' ? 'text-center' : config.align === 'end' ? 'text-right pr-4' : 'text-left pl-4'
                          }`}>
                            {type.name.toUpperCase()}
                          </div>
                        </foreignObject>
                      );
                    })}
                  </svg>
                </div>
                
                <p className="mt-4 text-[10px] font-mono text-gray-500 animate-pulse">
                  CLICK NODE TO ACCESS INTEL
                </p>
              </div>
            </motion.div>
          ) : activeTab === 'strategy' ? (
            <motion.div
              key="strategy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col h-full overflow-y-auto pt-20 p-4"
            >
              <StrategyPage />
            </motion.div>
          ) : (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col h-full overflow-y-auto pt-20 p-4"
            >
              {!selectedGame ? (
                <div className="max-w-7xl mx-auto w-full space-y-6">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                      Choose Your Game
                    </h1>
                    <p className="text-gray-400 text-base">
                      Select a simulation to view tactical profiles.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search games..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>

                  {/* Games Grid - Logo Centric */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
                    {filteredGames.map((game) => (
                      <motion.div
                        key={game.id}
                        layoutId={`game-${game.id}`}
                        onClick={() => setSelectedGame(game)}
                        className="group bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-900/10 aspect-square flex flex-col items-center justify-center relative"
                      >
                        {/* Background Image with heavy blur/overlay to simulate "Logo on dark background" */}
                        <div className="absolute inset-0">
                          <img 
                            src={game.thumbnail} 
                            alt={game.game} 
                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity blur-sm"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/60" />
                        </div>
                        
                        <div className="relative z-10 text-center p-4">
                           {/* Simulated Logo Text */}
                           <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-none mb-2 drop-shadow-lg">
                             {game.game.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                           </h3>
                           <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded inline-block backdrop-blur-sm border border-cyan-500/20">
                              {game.genre}
                           </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-7xl mx-auto w-full space-y-6 pb-8"
                >
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    BACK TO SELECTION
                  </button>

                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3 space-y-6">
                      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square relative flex items-center justify-center bg-[#050505]">
                         {/* Logo-style display for detail view */}
                         <img 
                            src={selectedGame.thumbnail} 
                            alt={selectedGame.game} 
                            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md"
                            referrerPolicy="no-referrer"
                          />
                          <div className="relative z-10 text-center p-8">
                             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4 drop-shadow-2xl">
                               {selectedGame.game}
                             </h1>
                             <span className="text-sm font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded border border-cyan-500/30">
                               {selectedGame.genre}
                             </span>
                          </div>
                      </div>
                      <div>
                        <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                          {selectedGame.description}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3 grid gap-4">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                        <Crosshair className="w-5 h-5 text-cyan-500" />
                        Type-Specific Tactics
                      </h2>
                      {selectedGame.advice.map((advice, i) => {
                        const type = enneagramData.find(t => t.id === advice.typeId);
                        return (
                          <div key={i} className="flex gap-4 p-6 rounded-xl bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-colors group">
                            <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-2xl border bg-opacity-10 ${getCenterColor(type?.center || '')}`}>
                              {type?.id}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-bold text-gray-200 text-base">{type?.name}</h4>
                                <span className="text-[10px] uppercase tracking-wider font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                                  {type?.gamingStyle.role.split('/')[0]}
                                </span>
                              </div>
                              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {advice.tip}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedType !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedType(null)}
          >
            <motion.div
              layoutId={`card-${selectedType}`}
              className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const type = enneagramData.find(t => t.id === selectedType);
                if (!type) return null;
                return (
                  <div>
                    <div className={`h-2 w-full ${type.center === 'Head' ? 'bg-cyan-500' : type.center === 'Heart' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <div className="p-8 space-y-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className={`text-5xl font-mono font-bold ${getCenterColor(type.center).split(' ')[0]}`}>
                                {type.id}
                             </span>
                             <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-white leading-none">{type.name}</h2>
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                                  {type.center} Center
                                </span>
                             </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedType(null)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <span className="sr-only">Close</span>
                          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                          <h3 className="text-xs font-mono text-gray-500 uppercase mb-2">Synthesis Source</h3>
                          <p className="text-gray-300 leading-relaxed">{type.synthesis}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <h3 className="text-xs font-mono text-green-500 uppercase flex items-center gap-2">
                               <Target className="w-3 h-3" /> Core Desire
                             </h3>
                             <p className="text-sm text-gray-300">{type.coreDesire}</p>
                          </div>
                          <div className="space-y-2">
                             <h3 className="text-xs font-mono text-red-500 uppercase flex items-center gap-2">
                               <Zap className="w-3 h-3" /> Core Fear
                             </h3>
                             <p className="text-sm text-gray-300">{type.coreFear}</p>
                          </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Sword className="w-5 h-5 text-cyan-500" />
                            Combat Profile: {type.gamingStyle.role}
                          </h3>
                          
                          <div className="grid gap-4">
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                              <span className="text-sm font-mono text-gray-500 text-right">Strengths</span>
                              <span className="text-sm text-gray-300">{type.gamingStyle.strengths}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                              <span className="text-sm font-mono text-gray-500 text-right">Weaknesses</span>
                              <span className="text-sm text-gray-300">{type.gamingStyle.weaknesses}</span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                              <span className="text-sm font-mono text-cyan-500 text-right">Advantage</span>
                              <span className="text-sm text-white font-medium">{type.gamingStyle.advantage}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AdUnit />
      <Footer />
        </>
      )}
    </div>
  );
}

export default App;
