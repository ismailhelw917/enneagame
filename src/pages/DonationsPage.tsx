import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Coffee, Zap, Shield, Trophy, ArrowRight, Loader2, CreditCard } from 'lucide-react';

const DonationsPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const savedAccountId = localStorage.getItem('stripeAccountId');
    if (savedAccountId) {
      setAccountId(savedAccountId);
    } else {
      // Set default account ID provided by the user
      setAccountId('acct_1T8gKbFObBPpBaOO');
      localStorage.setItem('stripeAccountId', 'acct_1T8gKbFObBPpBaOO');
    }
  }, []);

  const handleDonate = async (amount: number, label: string) => {
    if (!accountId) {
      setError('Please create a Connect account first.');
      return;
    }

    // Open a blank window immediately to avoid popup blocker
    const newWindow = window.open('', '_blank');

    setLoading(label);
    setError(null);
    console.log('Origin:', window.location.origin);
    try {
      const response = await fetch(`${window.location.origin}/create-donation-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, label, destinationAccountId: accountId }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server error response status:', response.status);
        console.error('Server error response text:', text);
        throw new Error(`Server returned ${response.status}: ${text.substring(0, 50)}...`);
      }

      const data = await response.json();

      if (data.url) {
        if (newWindow) {
          newWindow.location.href = data.url;
        } else {
          // Fallback if window.open failed
          window.location.href = data.url;
        }
      } else {
        if (newWindow) newWindow.close();
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err) {
      if (newWindow) newWindow.close();
      console.error('Donation error:', err);
      setError(err instanceof Error ? err.message : 'Could not initiate payment. Please ensure Stripe is configured.');
    } finally {
      setLoading(null);
    }
  };

  const donationTiers = [
    {
      id: 'coffee',
      label: 'Buy a Coffee',
      amount: 500, // $5.00
      icon: <Coffee className="w-6 h-6" />,
      description: 'Fuel the development of new tactical profiles.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
    {
      id: 'supporter',
      label: 'Tactical Supporter',
      amount: 1500, // $15.00
      icon: <Shield className="w-6 h-6" />,
      description: 'Help keep the servers running and the intel fresh.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      borderColor: 'border-cyan-400/20'
    },
    {
      id: 'champion',
      label: 'Enneagaming Champion',
      amount: 5000, // $50.00
      icon: <Trophy className="w-6 h-6" />,
      description: 'Become a top-tier patron of behavioral gaming science.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-full flex flex-col">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 shrink-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 mb-2"
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500/20" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">
          Support the <span className="text-cyan-500">Mission</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Enneagaming is a labor of love dedicated to bringing psychological depth to competitive play. Your support helps us expand our research and build better tools.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-10 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
        >
          <Zap className="w-4 h-4 shrink-0" />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-12">
        {donationTiers.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ y: -5 }}
            className={`relative flex flex-col p-8 rounded-3xl border ${tier.borderColor} bg-[#0f0f0f] shadow-xl overflow-hidden group`}
          >
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-10 transition-all duration-500 group-hover:opacity-20 ${tier.bgColor.replace('/10', '')}`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className={`p-3.5 rounded-xl ${tier.bgColor} ${tier.color} w-fit mb-6`}>
                {tier.icon}
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{tier.label}</h3>
              <div className="text-3xl font-black text-white mb-4">
                ${(tier.amount / 100).toFixed(2)}
              </div>
              
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
                {tier.description}
              </p>

              <button
                onClick={() => handleDonate(tier.amount, tier.label)}
                disabled={loading !== null}
                className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2.5 ${
                  loading === tier.label
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : `bg-white text-black hover:bg-cyan-400 active:scale-[0.98]`
                }`}
              >
                {loading === tier.label ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Support Now
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto pt-8 text-center text-gray-600 text-[10px] font-mono uppercase tracking-[0.4em]">
        Secure payments powered by Stripe
      </div>
    </div>
  );
};

export default DonationsPage;
