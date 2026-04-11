'use client';

import { Linkedin, Leaf, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Mission', id: 'mission' },
    { label: 'What We Do', id: 'what-we-do' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Impact', id: 'impact' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#0d2818] text-white/80 transition-colors duration-500">
      {/* Gradient top border */}
      <div
        className="h-1"
        style={{
          background: 'linear-gradient(90deg, var(--mint), var(--sage), var(--forest-light), var(--mint))',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 6s ease-in-out infinite',
        }}
      />

      <div className="section-container py-14">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-mint" />
              </div>
              <span className="font-playfair text-xl font-bold text-white">
                CarbonBazaar
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-white/60">
              A climate-tech platform enabling communities to convert ecosystem
              restoration into verified carbon credits through a transparent
              digital marketplace.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin className="w-4 h-4" />
              Goa, India
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-white/60 hover:text-mint transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">
              Connect
            </h4>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/company/carbon-bazaar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-mint transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                LinkedIn
              </a>
              <a
                href="mailto:contact@carbonbazaar.shop"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-mint transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                contact@carbonbazaar.shop
              </a>
            </div>

            {/* Supporter micro-badges */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Supported By</p>
              <div className="flex flex-wrap gap-2">
                {['Gov. of Goa', 'FIIRE Goa', 'MeitY', 'SPC Goa'].map((name) => (
                  <span
                    key={name}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/50"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <p className="text-center text-sm text-white/40">
          &copy; {currentYear} CarbonBazaar. All rights reserved. Climate Equity for All.
        </p>
      </div>
    </footer>
  );
}
