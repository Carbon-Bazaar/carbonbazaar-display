'use client';

import { useEffect, useRef, useMemo } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.pageYOffset;
      const content = heroRef.current.querySelector('.hero-content') as HTMLElement;
      if (content && scrolled < window.innerHeight) {
        content.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
        content.style.opacity = String(1 - scrolled / 900);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate leaf particles with stable positions
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${(i * 10) % 100}%`,
        size: 4 + (i % 4) * 3,
        delay: i * 2,
        duration: 18 + (i % 5) * 4,
      })),
    []
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
        >
          {/* Aerial ocean / coastal mangrove — Pexels free stock */}
          <source
            src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── Overlay: keeps text readable while showing video ── */}
      <div className="absolute inset-0 z-[1] dark:hidden" style={{
        background: 'linear-gradient(180deg, rgba(250,253,247,0.55) 0%, rgba(250,253,247,0.45) 40%, rgba(250,253,247,0.60) 100%)',
      }} />

      {/* Dark-mode overlay */}
      <div className="absolute inset-0 z-[1] hidden dark:block" style={{
        background: 'linear-gradient(180deg, rgba(15,26,20,0.65) 0%, rgba(15,26,20,0.55) 40%, rgba(15,26,20,0.70) 100%)',
      }} />

      {/* ── Floating Leaf Particles (above overlay) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="leaf-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              borderRadius: '50% 0 50% 0',
            }}
          />
        ))}
      </div>

      {/* ── Hero Content ── */}
      <div className="hero-content z-[3]">
        <div className="hero-badge">
          <span className="w-2 h-2 rounded-full bg-forest animate-pulse-soft" />
          Building a Sustainable Future
        </div>

        <h1 className="hero-title">
          Turning Ecosystem Restoration
          <br />
          Into <span className="hero-highlight">Verified Carbon Credits</span>
        </h1>

        <p className="hero-description">
          Empowering communities and landowners to convert carbon sequestration
          into tradeable credits through a transparent, blockchain-powered marketplace.
        </p>

        <div className="cta-buttons">
          <button onClick={() => scrollToSection('contact')} className="btn-primary">
            <span className="flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="btn-ghost">
            See How It Works
          </button>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]">
        <button
          onClick={() => scrollToSection('mission')}
          className="scroll-indicator flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
