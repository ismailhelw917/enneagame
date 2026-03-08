import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { analytics } from '../services/analyticsService';

const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Enneagaming',
      text: 'Master your Enneagram type in competitive gaming with deep behavioral analytics and tactical intel.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        analytics.trackEvent('share_native', { url: window.location.href });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        analytics.trackEvent('share_clipboard', { url: window.location.href });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 transition-colors border border-cyan-500/20 group"
      title="Share this page"
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
      )}
      <span className="text-xs font-medium hidden md:inline">
        {copied ? 'Copied!' : 'Share'}
      </span>
    </button>
  );
};

export default ShareButton;
