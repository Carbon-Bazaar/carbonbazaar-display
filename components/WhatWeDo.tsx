'use client';

import { useEffect, useRef } from 'react';
import {
  Upload,
  ShieldCheck,
  Link2,
  Store,
  Puzzle,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Project Onboarding',
    description:
      'Streamlined registration for communities and landowners to submit ecosystem restoration projects with guided workflows.',
  },
  {
    icon: ShieldCheck,
    title: 'Third-Party Verification',
    description:
      'Integrated verification workflows connecting projects with accredited auditors to validate carbon sequestration claims.',
  },
  {
    icon: Link2,
    title: 'Blockchain Tokenization',
    description:
      'Every verified credit is tokenized on-chain, ensuring traceability and eliminating the risk of double counting.',
  },
  {
    icon: Store,
    title: 'Direct Marketplace',
    description:
      'Connecting communities directly with buyers — no middlemen, fair pricing, and complete transaction transparency.',
  },
  {
    icon: Puzzle,
    title: 'Fractional Credits',
    description:
      'Making carbon offsetting accessible to MSMEs through affordable fractional ownership of verified credits.',
  },
  {
    icon: BarChart3,
    title: 'Impact Tracking',
    description:
      'Real-time dashboards showing measurable environmental impact, credit retirement status, and community income generated.',
  },
];

export default function WhatWeDo() {
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--warm-white)' }}
    >
      <div className="section-container">
        <div className="reveal text-center mb-14">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--sage)' }}
          >
            Platform Features
          </p>
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            An end-to-end platform that simplifies the journey from ecosystem
            restoration to verified, tradeable carbon credits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${(index % 3) + 1} glass-card p-7`}
            >
              <div className="feature-icon">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: 'var(--forest)' }}
              >
                {feature.title}
              </h3>
              <p
                className="leading-relaxed text-[0.95rem]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
