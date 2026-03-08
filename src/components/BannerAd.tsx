import React from 'react';
import { Monitor, Activity, Sparkles } from 'lucide-react';

interface BannerAdProps {
  type?: 'adsense' | 'network' | 'internal';
  className?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({ type = 'adsense', className = '' }) => {
  const adRef = React.useRef<HTMLModElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (type === 'adsense') {
      let checkCount = 0;
      const maxChecks = 10;

      const initAd = () => {
        try {
          if (!adRef.current || !containerRef.current) return;
          const width = containerRef.current.offsetWidth;
          
          if (width === 0 && checkCount < maxChecks) {
            checkCount++;
            setTimeout(initAd, 200);
            return;
          }

          if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
            // @ts-expect-error - adsbygoogle is added by external script
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          if (e instanceof Error && !e.message.includes("already have ads")) {
            console.error('AdSense error:', e);
          }
        }
      };

      const timer = setTimeout(initAd, 500);
      return () => clearTimeout(timer);
    } else if (type === 'network') {
      const script = document.createElement('script');
      script.src = "https://pl28873464.effectivegatecpm.com/a75e4c94fb427779457ccb016d36e01d/invoke.js";
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [type]);

  if (type === 'internal') {
    return (
      <div className={`max-w-7xl mx-auto px-4 w-full ${className}`}>
        <div className="w-full min-h-[100px] bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/20 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 relative group cursor-pointer hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-bold text-lg leading-tight uppercase tracking-tighter italic">Enneagaming Premium</h4>
              <p className="text-cyan-400/70 text-xs font-mono uppercase tracking-widest">Unlock Advanced Behavioral Analytics</p>
            </div>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-2 bg-cyan-500 text-black font-black uppercase tracking-widest text-xs rounded-lg hover:bg-cyan-400 transition-colors relative z-10">
            Upgrade Now
          </button>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 w-full ${className}`} ref={containerRef}>
      <div className={`w-full min-h-[120px] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 relative group`}>
        <div className="absolute top-2 left-4 flex items-center gap-2">
          <span className={`text-[9px] font-mono ${type === 'adsense' ? 'text-cyan-500/50' : 'text-emerald-500/50'} uppercase tracking-widest`}>
            {type === 'adsense' ? 'AdSense Intelligence' : 'Network Distribution'}
          </span>
          <div className={`w-1 h-1 rounded-full ${type === 'adsense' ? 'bg-cyan-500/30' : 'bg-emerald-500/30'} animate-pulse`} />
        </div>
        
        {/* Visual Placeholder for Dev/Iframe */}
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${type === 'adsense' ? 'from-cyan-500/5' : 'from-emerald-500/5'} to-transparent pointer-events-none`}>
          <div className="text-center opacity-40 group-hover:opacity-60 transition-opacity">
            {type === 'adsense' ? <Monitor className="w-8 h-8 text-cyan-500/20 mx-auto mb-2" /> : <Activity className="w-8 h-8 text-emerald-500/20 mx-auto mb-2" />}
            <div className={`text-[10px] font-mono ${type === 'adsense' ? 'text-cyan-500' : 'text-emerald-500'} uppercase tracking-tighter`}>
              {type === 'adsense' ? 'Responsive Ad Slot Active' : 'EffectiveGate Container Loaded'}
            </div>
            <div className="text-[8px] font-mono text-gray-600 mt-1">
              {type === 'adsense' ? 'Waiting for valid Publisher ID & Domain Approval' : 'ID: a75e4c94fb427779457ccb016d36e01d'}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center relative z-10">
          {type === 'adsense' ? (
            <ins 
              ref={adRef}
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', minWidth: '250px' }}
              data-ad-client="ca-pub-0000000000000000"
              data-ad-slot="0000000000"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          ) : (
            <div id="container-a75e4c94fb427779457ccb016d36e01d"></div>
          )}
        </div>
      </div>
    </div>
  );
};
