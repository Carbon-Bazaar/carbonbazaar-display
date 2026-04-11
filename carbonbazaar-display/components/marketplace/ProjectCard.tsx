'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onRequireAuth: (action: string) => void;
  isLoggedIn: boolean;
}

const statusStyles = {
  verified: { bg: 'bg-[#1B4332]/10 border-[#1B4332]/20', text: 'text-[#1B4332]', label: 'Verified' },
  live: { bg: 'bg-[#52796F]/10 border-[#52796F]/20', text: 'text-[#52796F]', label: 'Live' },
  pending: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-700', label: 'Pending MRV' },
};

const dotColors = {
  verified: 'bg-[#1B4332]',
  live: 'bg-[#52796F]',
  pending: 'bg-amber-500',
};

// Light-mode gradient backgrounds for card images
const lightGradients: Record<string, string> = {
  'from-[#1e3d1a] to-[#0f2410]': 'from-[#B7E4C7] to-[#95D5B2]',
  'from-[#1a3330] to-[#0f2420]': 'from-[#a7d8c8] to-[#7fc4b0]',
  'from-[#1a2d3d] to-[#0f1f2e]': 'from-[#a3c4d9] to-[#7eaec8]',
  'from-[#1e3318] to-[#142510]': 'from-[#c2ddb5] to-[#a5ce94]',
};

export default function ProjectCard({ project, index, onRequireAuth, isLoggedIn }: ProjectCardProps) {
  const [liked, setLiked] = useState(false);
  const status = statusStyles[project.status];
  const lightGrad = lightGradients[project.gradient] || 'from-[#B7E4C7] to-[#95D5B2]';

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
    <div
      className="group bg-white border border-[#E8E4DE] rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:border-[#52796F]/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-12px_rgba(27,67,50,0.12)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className={`h-40 bg-gradient-to-br ${lightGrad} relative flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 25% 75%, rgba(27,67,50,0.08) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(82,121,111,0.06) 0%, transparent 50%)'
        }} />
        <span className="text-[44px] relative z-[1] opacity-60 transition-transform duration-300 group-hover:scale-110">{project.icon}</span>

        {/* Badge */}
        <div className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-md border uppercase tracking-wide ${status.bg} ${status.text}`}>
          {status.label}
        </div>

        {/* Wishlist */}
        <button onClick={toggleLike}
          className={`absolute top-3 right-3 w-[30px] h-[30px] rounded-full flex items-center justify-center border transition-all z-[2] ${liked
            ? 'bg-red-50 border-red-200'
            : 'bg-white/70 backdrop-blur-sm border-white/50 hover:bg-white hover:border-[#52796F]/30'
          }`}>
          <Heart size={14} className={`transition-all ${liked ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-[#4A5D4A]/50'}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 text-[11px] text-[#7A8F7A]">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[project.status]}`} />
          {project.location}
        </div>
        <h3 className="text-[15px] font-medium text-[#1A2E1A] leading-snug">{project.name}</h3>
        <p className="text-xs text-[#7A8F7A] leading-relaxed flex-1">{project.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 bg-[#F5F7F2] rounded-xl p-2.5">
          {[
            { val: project.hectares, label: 'Hectares' },
            { val: project.credits, label: 'tCO₂e' },
            { val: project.owners, label: 'Owners' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <span className="text-[15px] font-semibold text-[#1B4332] block leading-none">{s.val}</span>
              <span className="text-[10px] text-[#7A8F7A] uppercase tracking-wider mt-1 block">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#E8E4DE]" />

        {/* Price */}
        {project.price ? (
          <div className="flex items-end justify-between">
            <div>
              <div className="text-lg font-semibold text-[#1A2E1A] leading-none">₹{project.price.toLocaleString()}</div>
              <div className="text-[11px] text-[#7A8F7A] mt-1">per tCO₂e</div>
            </div>
            {project.fractional && (
              <div className="bg-[#52796F]/5 border border-[#52796F]/15 rounded-lg px-2.5 py-1.5 text-right">
                <div className="text-[9px] text-[#52796F]/60 uppercase tracking-wider">Fractional</div>
                <div className="text-xs font-medium text-[#52796F]">{project.fractional}</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="text-sm text-[#7A8F7A]">Pending verification</div>
            <div className="text-[11px] text-[#7A8F7A]/60">Price TBD</div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {project.price ? (
            <>
              <button onClick={handleBuy}
                className="flex-1 bg-gradient-to-r from-[#1B4332] to-[#52796F] text-white font-semibold text-xs py-2.5 rounded-xl transition-all hover:shadow-md hover:shadow-[#1B4332]/15 hover:-translate-y-0.5">
                Buy credits
              </button>
              <button className="bg-transparent text-[#4A5D4A] border border-[#E8E4DE] rounded-xl px-3 text-xs transition-all hover:border-[#52796F]/40 hover:text-[#1B4332]">
                Details
              </button>
            </>
          ) : (
            <button onClick={handleBuy}
              className="flex-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl py-2.5 text-xs transition-all hover:bg-amber-100">
              Notify me when live
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
