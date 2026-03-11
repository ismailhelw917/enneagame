import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Shield, FileText, Mail } from 'lucide-react';
import ShareButton from './ShareButton';
import ExternalAdSlot from './ExternalAdSlot';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* External Ad Section - Leaderboard */}
        <div className="mb-16">
          <ExternalAdSlot id="footer-top-leaderboard" format="leaderboard" className="mb-4" />
          <p className="text-center text-[8px] font-mono text-gray-700 uppercase tracking-widest">Advertisement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-cyan-500" />
              <span className="font-mono font-bold tracking-tighter text-xl text-white">Enneagram & Games</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Synthesizing ancient personality wisdom with modern tactical gaming intelligence. 
              Built for competitive players who seek a deeper understanding of their own mental framework.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Intelligence</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">Synthesis Theory</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">Tactical Profiles</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-cyan-500 transition-colors">Game Database</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Legal & Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-500 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-500 transition-colors">
                  <FileText className="w-4 h-4" /> Terms of Service
                </button>
              </li>
              <li>
                <a href="mailto:contact@enneagramtactics.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-500 transition-colors">
                  <Mail className="w-4 h-4" /> Contact Command
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            © 2026 Tactical Intelligence Command. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <ShareButton />
            <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">Status: Operational</span>
            <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">v1.0.42-STABLE</span>
          </div>
        </div>
        
        <div className="mt-12">
          <ExternalAdSlot id="footer-bottom-banner" format="banner" className="mb-2" />
          <p className="text-center text-[7px] font-mono text-gray-800 uppercase tracking-widest">Advertisement</p>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[9px] font-mono text-gray-800 uppercase tracking-[0.2em]">
            ADVERTISEMENT: ENHANCE YOUR COGNITIVE LOAD WITH TACTICAL SUPPLEMENTS. 
            <a href="#" className="text-cyan-900 hover:text-cyan-700 ml-2 transition-colors">LEARN MORE</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
