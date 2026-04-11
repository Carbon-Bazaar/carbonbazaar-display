'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/marketplace/AuthModal';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Mission', id: 'mission' },
  { label: 'What We Do', id: 'what-we-do' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Impact', id: 'impact' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const { user, isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [toast, setToast] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-dropdown-area')) setDropdownOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const openAuth = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex justify-between items-center h-20">
            {/* Brand */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest to-sage flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-playfair text-xl font-bold text-forest tracking-tight">
                CarbonBazaar
              </span>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="nav-link text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <div className="relative user-dropdown-area">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center text-sm font-semibold text-white border-2 border-transparent hover:border-mint/50 hover:shadow-md transition-all">
                    {user?.initials}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-14 right-0 w-48 bg-white border border-[#E8E4DE] rounded-2xl shadow-xl p-2 animate-in slide-in-from-top-2 fade-in duration-200">
                      <div className="px-3 py-2 border-b border-[#E8E4DE] mb-1">
                        <div className="text-sm font-medium text-[#1A2E1A]">{user?.name}</div>
                        <div className="text-xs text-[#7A8F7A]">{user?.email}</div>
                      </div>
                      <Link href="/marketplace"
                        className="block px-3 py-2.5 rounded-xl text-sm text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#F5F7F2] transition-all">
                        🛒 Marketplace
                      </Link>
                      <button onClick={() => { logout(); setDropdownOpen(false); setToast('Signed out successfully'); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all">
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={() => openAuth('login')}
                    className="text-sm font-medium transition-all duration-300 relative" style={{ color: 'var(--text-secondary)' }}>
                    Sign in
                  </button>
                  <button onClick={() => openAuth('signup')}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-forest to-sage transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/30 relative overflow-hidden">
                    <span className="relative z-10">Sign up</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-3">
              {!isLoggedIn && (
                <button onClick={() => openAuth('signup')}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-forest to-sage">
                  Sign up
                </button>
              )}
              {isLoggedIn && (
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center text-xs font-semibold text-white user-dropdown-area">
                  {user?.initials}
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl transition-colors hover:bg-mint-light/30"
                style={{ color: 'var(--text-secondary)' }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-mint/10 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="mobile-nav-link w-full text-left"
              >
                {link.label}
              </button>
            ))}
            <Link href="/marketplace" className="mobile-nav-link w-full text-left block">
              🛒 Marketplace
            </Link>
            {!isLoggedIn && (
              <button onClick={() => { setIsMobileMenuOpen(false); openAuth('login'); }}
                className="mobile-nav-link w-full text-left">
                Sign in
              </button>
            )}
            {isLoggedIn && (
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); setToast('Signed out'); }}
                className="mobile-nav-link w-full text-left text-red-500/70">
                Sign out
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} onSuccess={msg => setToast(msg)} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-5 z-[300] bg-white border border-[#95D5B2]/40 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3 animate-in slide-in-from-right-5 fade-in duration-300 max-w-sm">
          <span className="text-sm text-[#1A2E1A]">{toast}</span>
        </div>
      )}
    </>
  );
}
