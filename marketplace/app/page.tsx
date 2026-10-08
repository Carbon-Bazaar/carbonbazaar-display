'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, Leaf, Linkedin, Mail, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MarketplaceNav from '@/components/marketplace/MarketplaceNav';
import AuthModal from '@/components/marketplace/AuthModal';
import ProjectCard from '@/components/marketplace/ProjectCard';
import FeaturedCard from '@/components/marketplace/FeaturedCard';
import { projects } from '@/lib/projects';
import { websiteHref } from '@/lib/site';

const filterChips = ['All', 'Cashew', 'Agroforestry', 'Mangrove', 'Fractional', 'Verra', 'Plan Vivo', 'CBAM ready'];

export default function MarketplacePage() {
  const { isLoggedIn } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [toast, setToast] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // The main website links here with ?auth=login or ?auth=signup to open the sign-in modal directly
  useEffect(() => {
    const auth = new URLSearchParams(window.location.search).get('auth');
    if (auth === 'login' || auth === 'signup') {
      setAuthTab(auth);
      setAuthOpen(true);
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const openAuth = useCallback((tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setAuthOpen(true);
  }, []);

  const requireAuth = useCallback((action: string) => {
    if (!isLoggedIn) {
      openAuth('login');
      setToast(`Please sign in to ${action}`);
    }
  }, [isLoggedIn, openAuth]);

  const filtered = useMemo(() => {
    let list = [...projects];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.location.toLowerCase().includes(q));
    }
    if (activeFilter !== 'All') {
      const f = activeFilter.toLowerCase();
      list = list.filter(p => p.tags.some(t => t.includes(f)));
    }
    if (sortBy === 'price-asc') list.sort((a, b) => (a.price || 9999) - (b.price || 9999));
    else if (sortBy === 'price-desc') list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortBy === 'credits') list.sort((a, b) => parseInt(b.credits) - parseInt(a.credits));
    return list;
  }, [search, activeFilter, sortBy]);

  const featured = filtered.find(p => p.featured);
  const regular = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <MarketplaceNav onOpenAuth={openAuth} onToast={setToast} />

      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-[#E8E4DE]">
        {/* Mesh background like home page */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(149,213,178,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(45,106,79,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 50% 20%, rgba(183,228,199,0.12) 0%, transparent 60%)'
        }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16 relative z-[1] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-sm font-semibold" style={{ background: 'rgba(149,213,178,0.2)', color: 'var(--forest)', border: '1px solid rgba(149,213,178,0.4)' }}>
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              Marketplace
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: '#0d2818' }}>
              Invest in{' '}
              <span className="bg-gradient-to-r from-[#0d2818] via-[#2d6a4f] to-[#1b4332] bg-clip-text text-transparent">
                verified carbon credits
              </span>
              {' '}from Goa
            </h1>
            <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
              Browse agroforestry, mangrove and cashew-grove projects. Buy full or fractional credits with CBAM-compliant retirement certificates.
            </p>
          </div>
          <div className="flex gap-8 md:gap-10 flex-shrink-0">
            {[
              { val: '16', label: 'Projects' },
              { val: '4,200+', label: 'tCO₂e listed' },
              { val: '120+', label: 'Landowners' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="stat-number text-3xl md:text-4xl">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="border-b border-[#E8E4DE]" style={{ background: 'var(--warm-white)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[260px] max-w-xl flex items-center bg-white border border-[#E8E4DE] rounded-full overflow-hidden transition-all focus-within:border-[#52796F] focus-within:shadow-[0_0_0_3px_rgba(149,213,178,0.2)]">
            <Search size={16} className="ml-4 text-[#7A8F7A] flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-3 py-2.5 text-sm text-[#1A2E1A] placeholder-[#7A8F7A]/50 font-sans"
              placeholder="Search projects, talukas, registries..."
            />
            <button className="bg-gradient-to-r from-[#1B4332] to-[#52796F] px-5 h-10 text-sm font-semibold text-white rounded-r-full flex-shrink-0 transition-all hover:brightness-110">
              Search
            </button>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {filterChips.map(chip => (
              <button key={chip} onClick={() => setActiveFilter(chip)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${activeFilter === chip
                  ? 'bg-[#1B4332]/10 border-[#1B4332]/25 text-[#1B4332]'
                  : 'bg-transparent border-[#E8E4DE] text-[#7A8F7A] hover:border-[#52796F]/30 hover:text-[#4A5D4A]'
                }`}>
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 pb-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="section-title !text-left !text-2xl !md:text-3xl !mb-1">Carbon credit projects</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{filtered.length} project{filtered.length !== 1 ? 's' : ''} found across Goa</p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-muted)' }}>Sort by</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-[#E8E4DE] text-[#1A2E1A] rounded-xl px-3 py-2 text-xs outline-none cursor-pointer font-sans">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="credits">Most credits</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured && <FeaturedCard project={featured} onRequireAuth={requireAuth} isLoggedIn={isLoggedIn} />}
          {regular.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onRequireAuth={requireAuth} isLoggedIn={isLoggedIn} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">🌱</div>
            <h3 className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>No projects found</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 mt-10">
          <button className="w-9 h-9 flex items-center justify-center border border-[#E8E4DE] rounded-xl text-[#7A8F7A] hover:border-[#52796F]/30 hover:text-[#1B4332] transition-all">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map(n => (
            <button key={n} className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm transition-all ${n === 1
              ? 'bg-gradient-to-r from-[#1B4332] to-[#52796F] text-white font-semibold'
              : 'border border-[#E8E4DE] text-[#7A8F7A] hover:border-[#52796F]/30 hover:text-[#1B4332]'
            }`}>
              {n}
            </button>
          ))}
          <span className="w-9 h-9 flex items-center justify-center text-[#7A8F7A] text-sm">...</span>
          <button className="w-9 h-9 flex items-center justify-center border border-[#E8E4DE] rounded-xl text-[#7A8F7A] hover:border-[#52796F]/30 hover:text-[#1B4332] transition-all text-sm">6</button>
          <button className="w-9 h-9 flex items-center justify-center border border-[#E8E4DE] rounded-xl text-[#7A8F7A] hover:border-[#52796F]/30 hover:text-[#1B4332] transition-all">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* CTA Strip */}
        <div className="mt-12 relative overflow-hidden rounded-2xl" style={{ background: 'var(--warm-white)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(149,213,178,0.15) 0%, transparent 60%)'
          }} />
          <div className="border border-[#95D5B2]/25 rounded-2xl p-7 flex flex-col md:flex-row items-center justify-between gap-5 relative z-[1]">
            <div>
              <h3 className="font-playfair text-xl font-bold mb-1" style={{ color: 'var(--forest)' }}>Own land in Goa? Turn it into verified income.</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>We handle MRV, registry listing, and credit sales. You just register your land.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href={websiteHref('/#how-it-works')} className="btn-ghost !py-3 !px-6 !text-sm !rounded-xl">
                Learn more
              </a>
              <button onClick={() => requireAuth('register your land')} className="btn-primary !py-3 !px-6 !text-sm !rounded-xl">
                <span>Register your land</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — matching home page Footer style */}
      <footer className="bg-[#0d2818] text-white/80">
        <div className="h-1" style={{
          background: 'linear-gradient(90deg, var(--mint), var(--sage), var(--forest-light), var(--mint))',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 6s ease-in-out infinite',
        }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-mint" />
                </div>
                <span className="font-playfair text-xl font-bold text-white">CarbonBazaar</span>
              </div>
              <p className="text-sm leading-relaxed mb-5 text-white/60">
                A climate-tech platform enabling communities to convert ecosystem restoration into verified carbon credits through a transparent digital marketplace.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4" />
                Goa, India
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Mission', 'How It Works', 'Impact', 'Contact'].map(label => (
                  <li key={label}>
                    <a href={websiteHref(label === 'Home' ? '/' : `/#${label.toLowerCase().replace(/ /g, '-')}`)}
                      className="text-sm text-white/60 hover:text-mint transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Connect</h4>
              <div className="space-y-4">
                <a href="https://www.linkedin.com/company/carbon-bazaar/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-mint transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  LinkedIn
                </a>
                <a href="mailto:contact@carbonbazaar.shop" className="flex items-center gap-3 text-sm text-white/60 hover:text-mint transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  contact@carbonbazaar.shop
                </a>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Supported By</p>
                <div className="flex flex-wrap gap-2">
                  {['Gov. of Goa', 'FIIRE Goa', 'MeitY', 'SPC Goa'].map(name => (
                    <span key={name} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50">{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5">
          <p className="text-center text-sm text-white/40">
            &copy; {new Date().getFullYear()} CarbonBazaar. All rights reserved. Climate Equity for All.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} onSuccess={msg => setToast(msg)} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-5 z-[300] bg-white border border-[#95D5B2]/40 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3 animate-in slide-in-from-right-5 fade-in duration-300 max-w-sm">
          <span className="text-sm text-[#1A2E1A]">{toast}</span>
        </div>
      )}
    </div>
  );
}
