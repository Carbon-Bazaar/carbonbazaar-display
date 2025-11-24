'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.pageYOffset;
      const heroContent = heroRef.current.querySelector('.hero-content') as HTMLElement;
      const heroBackground = heroRef.current.querySelector('.hero-background') as HTMLElement;

      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        heroContent.style.opacity = String(1 - scrolled / 800);
      }

      if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="hero-section">
      <div className="hero-background" />
      <div className="hero-overlay" />

      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{ animationDelay: `${i * 1}s` }} />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <b>Building a Sustainable Future</b>
        </div>
        <h1 className="hero-title">
          Revolutionizing the
          <br />
          <span className="highlight-text">Carbon Economy</span>
        </h1>
        <p className="hero-description">
          Empowering Coastal Communities. Enabling SMEs.
          <br />
          Driving Global Sustainability.
        </p>
        <div className="cta-buttons">
          <button onClick={() => scrollToSection('contact')} className="btn-primary">
            Join the Movement
          </button>
          <button onClick={() => scrollToSection('what-we-do')} className="btn-secondary">
            Explore the Platform
          </button>
        </div>
      </div>
    </section>
  );
}
