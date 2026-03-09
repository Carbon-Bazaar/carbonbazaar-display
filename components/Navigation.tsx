'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Mission', id: 'mission' },
  { label: 'What We Do', id: 'what-we-do' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Impact', id: 'impact' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 dark:bg-[#0F1A14]/90 backdrop-blur-xl shadow-sm'
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
            <span className="font-playfair text-xl font-bold text-forest dark:text-mint-light tracking-tight">
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
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
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
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white/95 dark:bg-[#0F1A14]/95 backdrop-blur-xl border-t border-mint/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="mobile-nav-link w-full text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
