'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/marketplace/AuthModal';

export default function CTA() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleRegister = () => {
    if (isLoggedIn) {
      router.push('/marketplace');
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--warm-white)' }}
      >
        {/* Subtle decorative mesh */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 30% 50%, rgba(149, 213, 178, 0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 70% 50%, rgba(45, 106, 79, 0.06) 0%, transparent 60%)',
          }}
        />

        <div className="section-container relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--sage)' }}
            >
              Get Started
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-playfair leading-tight"
              style={{ color: 'var(--forest)' }}
            >
              Ready to Join the
              <br />
              Carbon Revolution?
            </h2>
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Whether you&apos;re a community restoring ecosystems or a business looking to
              offset emissions — we&apos;d love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleRegister}
                className="btn-primary"
              >
                <span className="flex items-center gap-2">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              <a
                href="mailto:contact@carbonbazaar.shop"
                className="btn-ghost flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab="signup" onSuccess={msg => setToast(msg)} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-5 z-[300] bg-white border border-[#95D5B2]/40 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3 animate-in slide-in-from-right-5 fade-in duration-300 max-w-sm">
          <span className="text-sm text-[#1A2E1A]">{toast}</span>
        </div>
      )}
    </>
  );
}
