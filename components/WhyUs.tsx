'use client';

import { useEffect, useRef } from 'react';
import {
  Ban,
  ShieldCheck,
  Building2,
  Heart,
  Scale,
} from 'lucide-react';

const differentiators = [
  {
    icon: Ban,
    title: 'No Middlemen',
    description:
      'Direct connections between communities and buyers eliminate unnecessary intermediaries and reduce costs.',
  },
  {
    icon: ShieldCheck,
    title: 'Blockchain-Verified',
    description:
      'Every credit is tokenized and recorded on-chain for immutable proof of authenticity and ownership.',
  },
  {
    icon: Building2,
    title: 'MSME-Friendly',
    description:
      'Fractional credit ownership makes carbon offsetting accessible and affordable for small businesses.',
  },
  {
    icon: Heart,
    title: 'Community-First',
    description:
      'Fair compensation models ensure that the communities doing the restoration work benefit directly.',
  },
  {
    icon: Scale,
    title: 'Regulation-Ready',
    description:
      'Built to comply with emerging carbon regulations and international verification standards.',
  },
];

export default function WhyUs() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--cream)' }}
    >
      <div className="section-container">
        <div className="reveal text-center mb-14">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--sage)' }}
          >
            Why Choose Us
          </p>
          <h2 className="section-title">Why CarbonBazaar?</h2>
          <p className="section-subtitle">
            Building trust through transparency, technology, and community empowerment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-5">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${(index % 3) + 1} glass-card p-6 flex items-start gap-5`}
            >
              <div className="feature-icon shrink-0 !mb-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4
                  className="text-lg font-semibold mb-1.5"
                  style={{ color: 'var(--forest)' }}
                >
                  {item.title}
                </h4>
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
