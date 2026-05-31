'use client';

import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      setTimeout(() => setVisible(false), 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(handleLoad, 500);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-[#0F1A14] transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Loader Ring and Icon */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-sage/20 border-t-forest dark:border-sage/10 dark:border-t-mint-light animate-spin" />
          
          {/* Inner spinning ring (anticlockwise) */}
          <div 
            className="absolute inset-2 rounded-full border-[2px] border-sage/10 border-b-sage/40 dark:border-sage/5 dark:border-b-mint-light/40 animate-spin" 
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          />
          
          <Leaf className="w-8 h-8 text-forest dark:text-mint-light relative z-10" strokeWidth={1.5} />
        </div>
        
        {/* Text */}
        <h2 className="mt-8 text-xs font-medium text-forest/70 dark:text-mint-light/70 tracking-[0.25em] uppercase">
          Preparing Ecosystem
        </h2>
      </div>
    </div>
  );
}
