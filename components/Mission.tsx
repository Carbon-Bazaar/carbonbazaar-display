'use client';

import { useEffect, useRef } from 'react';
import { TreePine, Shield, Users } from 'lucide-react';

const stats = [
  { icon: TreePine, number: '100%', label: 'Transparent' },
  { icon: Shield, number: '0', label: 'Middlemen' },
  { icon: Users, number: '24/7', label: 'Access' },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--cream)' }}
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Side */}
          <div className="reveal relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
                alt="Coastal mangrove ecosystem restoration"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
            </div>
            {/* Decorative floating card */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 glass-card p-4 md:p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mint/30 flex items-center justify-center">
                  <TreePine className="w-5 h-5" style={{ color: 'var(--forest)' }} />
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--forest)' }}>
                    Ecosystem First
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Community-driven restoration
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <div className="reveal">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--sage)' }}
              >
                Our Mission
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ color: 'var(--forest)' }}
              >
                Making Carbon Markets
                <br />
                <span style={{ color: 'var(--sage)' }}>Accessible to All</span>
              </h2>
            </div>

            <div className="reveal reveal-delay-1">
              <p
                className="text-lg leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Many communities preserve forests, plantations, and coastal ecosystems but
                can't access carbon markets due to complex verification processes, high costs,
                and lack of transparency.
              </p>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                CarbonBazaar simplifies this by integrating project onboarding, third-party
                verification workflows, and blockchain-based tokenization — creating a trusted
                marketplace where environmental impact is transparently recorded, traded, and retired.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 flex-wrap">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i + 2} flex flex-col items-start`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5" style={{ color: 'var(--sage)' }} />
                    <span className="stat-number text-3xl">{stat.number}</span>
                  </div>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
