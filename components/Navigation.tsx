'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 dark:bg-gray-900/98 shadow-lg backdrop-blur-md'
          : 'bg-white/95 dark:bg-gray-900/95 shadow-sm backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="font-playfair text-2xl font-bold text-eco-green dark:text-eco-green-light">
            CarbonBazaar
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('mission')} className="nav-link">
              Mission
            </button>
            <button onClick={() => scrollToSection('what-we-do')} className="nav-link">
              What We Do
            </button>
            <button onClick={() => scrollToSection('impact')} className="nav-link">
              Impact
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="mobile-nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('mission')} className="mobile-nav-link">
              Mission
            </button>
            <button onClick={() => scrollToSection('what-we-do')} className="mobile-nav-link">
              What We Do
            </button>
            <button onClick={() => scrollToSection('impact')} className="mobile-nav-link">
              Impact
            </button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
