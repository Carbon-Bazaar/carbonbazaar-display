'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/lib/projects';

interface FeaturedCardProps {
  project: Project;
  onRequireAuth: (action: string) => void;
  isLoggedIn: boolean;
}

export default function FeaturedCard({ project, onRequireAuth, isLoggedIn }: FeaturedCardProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) { onRequireAuth('save to wishlist'); return; }
    setLiked(!liked);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) { onRequireAuth('buy credits'); return; }
  };

  return (
    <div className="col-span-full group bg-white border border-[#95D5B2]/30 rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-[#52796F]/30 hover:shadow-[0_20px_60px_-12px_rgba(27,67,50,0.12)] relative">
      {/* Image */}
      <div className="w-full md:w-56 flex-shrink-0 bg-gradient-to-br from-[#B7E4C7] to-[#95D5B2] flex items-center justify-center relative overflow-hidden min-h-[160px]">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(27,67,50,0.1) 0%, transparent 55%), radial-gradient(circle at 70% 30%, rgba(82,121,111,0.08) 0%, transparent 50%)'
        }} />
        <span className="text-[56px] opacity-50 relative z-[1] transition-transform duration-300 group-hover:scale-110">{project.icon}</span>

        <button onClick={toggleLike}
          className={`absolute top-3 right-3 md:top-auto md:bottom-3 md:right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all z-[2] ${liked
            ? 'bg-red-50 border-red-200'
            : 'bg-white/70 backdrop-blur-sm border-white/50 hover:bg-white hover:border-[#52796F]/30'
          }`}>
          <Heart size={14} className={`transition-all ${liked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-[#4A5D4A]/50'}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#52796F] bg-[#52796F]/8 border border-[#52796F]/20 rounded-md px-2.5 py-1 mb-3 uppercase tracking-wider">
            ★ Featured
          </div>
          <h3 className="font-playfair text-xl text-[#1A2E1A] font-medium mb-2">{project.name}</h3>
          <p className="text-xs text-[#7A8F7A] leading-relaxed max-w-md mb-4">{project.description}</p>
          <div className="flex gap-6">
            {[
              { val: project.hectares, label: 'Hectares' },
              { val: project.credits, label: 'tCO₂e/yr' },
              { val: project.owners, label: 'Landowners' },
              ...(project.rating ? [{ val: project.rating, label: 'Rating' }] : []),
            ].map(s => (
              <div key={s.label}>
                <span className="text-lg font-semibold text-[#1B4332] block leading-none">{s.val}</span>
                <span className="text-[10px] text-[#7A8F7A] uppercase tracking-wider mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-2xl font-semibold text-[#1A2E1A] leading-none">₹{project.price?.toLocaleString()}</div>
            <div className="text-[11px] text-[#7A8F7A] mt-1">per tCO₂e</div>
          </div>
          {project.fractional && (
            <div className="bg-[#52796F]/5 border border-[#52796F]/15 rounded-xl px-3 py-2 text-right">
              <div className="text-[9px] text-[#52796F]/60 uppercase tracking-wider mb-0.5">Fractional from</div>
              <div className="text-[13px] font-medium text-[#52796F]">{project.fractional}</div>
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={handleBuy}
              className="bg-gradient-to-r from-[#1B4332] to-[#52796F] text-white font-semibold text-[13px] px-5 py-2.5 rounded-xl transition-all hover:shadow-md hover:shadow-[#1B4332]/15 hover:-translate-y-0.5 whitespace-nowrap">
              Buy credits
            </button>
            <button className="bg-transparent text-[#4A5D4A] border border-[#E8E4DE] rounded-xl px-4 py-2.5 text-[13px] transition-all hover:border-[#52796F]/40 hover:text-[#1B4332] whitespace-nowrap">
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
