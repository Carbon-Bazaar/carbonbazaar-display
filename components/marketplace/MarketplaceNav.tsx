'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Menu, X, LayoutDashboard, Heart, FileText, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MarketplaceNavProps {
  onOpenAuth: (tab: 'login' | 'signup') => void;
  onToast: (msg: string) => void;
}

export default function MarketplaceNav({ onOpenAuth, onToast }: MarketplaceNavProps) {
  const { user, isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Same links as main page Navigation
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Mission', href: '/#mission' },
    { label: 'What We Do', href: '/#what-we-do' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Impact', href: '/#impact' },
    { label: 'Contact', href: '/#contact' },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    onToast('Signed out successfully');
  };

  const dashboardHref = `/dashboard/${user?.role || 'buyer'}`;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 border-b ${scrolled
      ? 'bg-white/90 backdrop-blur-xl shadow-sm border-[#E8E4DE]'
      : 'bg-white/70 backdrop-blur-md border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest to-sage flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-playfair text-xl font-bold text-forest tracking-tight">CarbonBazaar</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-sm font-medium transition-all duration-300 relative text-[#4A5D4A] hover:text-[#1B4332]">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth / User */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center text-sm font-semibold text-white border-2 border-transparent hover:border-mint/50 hover:shadow-md transition-all">
                {user?.initials}
              </button>
              {dropdownOpen && (
                <div className="absolute top-14 right-0 w-56 bg-white border border-[#E8E4DE] rounded-2xl shadow-xl p-2 animate-in slide-in-from-top-2 fade-in duration-200">
                  <div className="px-3 py-2.5 border-b border-[#E8E4DE] mb-1">
                    <div className="text-sm font-medium text-[#1A2E1A]">{user?.name}</div>
                    <div className="text-xs text-[#7A8F7A] mt-0.5">{user?.email}</div>
                  </div>
                  <Link href={dashboardHref} onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#F5F7F2] transition-all">
                    <LayoutDashboard size={16} className="opacity-50" />
                    My Dashboard
                  </Link>
                  <Link href={dashboardHref} onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#F5F7F2] transition-all">
                    <FileText size={16} className="opacity-50" />
                    My Orders
                  </Link>
                  <button onClick={() => { setDropdownOpen(false); onToast('Wishlist coming soon!'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#F5F7F2] transition-all">
                    <Heart size={16} className="opacity-50" />
                    My Wishlist
                  </button>
                  <button onClick={() => { setDropdownOpen(false); onToast('Settings coming soon!'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#F5F7F2] transition-all">
                    <Settings size={16} className="opacity-50" />
                    Settings
                  </button>
                  <div className="h-px bg-[#E8E4DE] my-1" />
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-all">
                    <LogOut size={16} className="opacity-50" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => onOpenAuth('login')}
                className="hidden sm:block text-sm font-medium text-[#4A5D4A] hover:text-[#1B4332] transition-all">
                Sign in
              </button>
              <button onClick={() => onOpenAuth('signup')}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-forest to-sage transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest/30 relative overflow-hidden">
                <span className="relative z-10">Get started</span>
              </button>
            </>
          )}
          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl transition-colors hover:bg-[#B7E4C7]/30" style={{ color: 'var(--text-secondary)' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-[#95D5B2]/10 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="block font-medium py-3 px-4 rounded-xl transition-all duration-300 text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#B7E4C7]/30">
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link href={dashboardHref} onClick={() => setMobileOpen(false)}
              className="block font-medium py-3 px-4 rounded-xl transition-all duration-300 text-[#4A5D4A] hover:text-[#1B4332] hover:bg-[#B7E4C7]/30">
              📊 Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
