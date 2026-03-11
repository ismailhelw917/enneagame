import React from 'react';

interface ExternalAdSlotProps {
  id: string;
  format?: 'banner' | 'leaderboard' | 'rectangle';
  className?: string;
}

const ExternalAdSlot: React.FC<ExternalAdSlotProps> = ({ id, format = 'leaderboard', className = "" }) => {
  // In a real scenario, this is where you'd inject AdSense, Carbon, or other ad scripts.
  // For now, we provide a high-fidelity placeholder that matches the app's aesthetic.
  
  const dimensions = {
    banner: 'h-[60px] max-w-[468px]',
    leaderboard: 'h-[90px] max-w-[728px]',
    rectangle: 'h-[250px] max-w-[300px]'
  };

  return (
    <div 
      id={`ad-slot-${id}`}
      className={`mx-auto w-full flex items-center justify-center bg-[#080808] border border-dashed border-white/5 rounded-lg overflow-hidden relative group ${dimensions[format]} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-1">External Intelligence Partner</div>
        <div className="text-[8px] font-mono text-gray-700 uppercase">Slot ID: {id}</div>
      </div>
      
      {/* This is where the external ad script would render its content */}
      <div className="relative z-10 text-[9px] font-mono text-gray-800 uppercase tracking-widest pointer-events-none">
        [ ADVERTISEMENT SPACE ]
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/10" />
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/10" />
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/10" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/10" />
    </div>
  );
};

export default ExternalAdSlot;
