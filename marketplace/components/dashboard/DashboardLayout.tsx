'use client';

import { ReactNode, useState, useCallback, useEffect } from 'react';
import { Menu, X, Leaf, Linkedin, Mail, MapPin } from 'lucide-react';
import { websiteHref } from '@/lib/site';
import MarketplaceNav from '@/components/marketplace/MarketplaceNav';
import AuthModal from '@/components/marketplace/AuthModal';
import Sidebar, { NavSection } from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  userName: string;
  userInitials: string;
  userLocation: string;
  userRole: string;
  userVariant: 'buyer' | 'seller';
  navSections: NavSection[];
  activeItem: string;
  onNavItemClick: (id: string) => void;
}

export default function DashboardLayout({
  children,
  userName,
  userInitials,
  userLocation,
  userRole,
  userVariant,
  navSections,
  activeItem,
  onNavItemClick,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [toast, setToast] = useState<string | null>(null);

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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* MarketplaceNav — same as marketplace page */}
      <MarketplaceNav onOpenAuth={openAuth} onToast={setToast} />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            user={{ initials: userInitials, name: userName, role: `${userRole} · ${userLocation}`, variant: userVariant }}
            sections={navSections}
            activeItem={activeItem}
            onItemClick={onNavItemClick}
          />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              style={{
                position: 'fixed',
                inset: 0,
                top: 80,
                background: 'rgba(0,0,0,0.3)',
                zIndex: 40,
              }}
              onClick={() => setSidebarOpen(false)}
            />
            <div
              style={{
                position: 'fixed',
                top: 80,
                left: 0,
                bottom: 0,
                zIndex: 41,
              }}
              className="lg:hidden"
            >
              <Sidebar
                user={{ initials: userInitials, name: userName, role: `${userRole} · ${userLocation}`, variant: userVariant }}
                sections={navSections}
                activeItem={activeItem}
                onItemClick={(id) => { onNavItemClick(id); setSidebarOpen(false); }}
              />
            </div>
          </>
        )}

        {/* Main content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowX: 'hidden' }}>
          {/* Mobile sidebar toggle */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 16,
              fontSize: 13,
              color: 'var(--text-secondary)',
              background: 'var(--warm-white)',
              border: '1px solid var(--sand)',
              borderRadius: 8,
              padding: '8px 14px',
              cursor: 'pointer',
            }}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            Menu
          </button>

          {children}
        </main>
      </div>

      {/* Footer — same as marketplace page */}
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
