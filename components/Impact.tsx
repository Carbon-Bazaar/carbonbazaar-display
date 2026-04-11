'use client';

import { useEffect, useRef, useState } from 'react';
import { Waves, TrendingUp, Building2, Leaf } from 'lucide-react';

const goals = [
  {
    icon: Waves,
    target: 10000,
    label: 'Coastal Community Members Empowered',
    prefix: '',
    suffix: '+',
  },
  {
    icon: TrendingUp,
    target: 100,
    label: 'Crores in Carbon Trades Facilitated',
    prefix: '₹',
    suffix: ' Cr',
  },
  {
    icon: Building2,
    target: 50000,
    label: 'SMEs Onboarded into Sustainable Offsetting',
    prefix: '',
    suffix: '+',
  },
  {
    icon: Leaf,
    target: 500,
    label: 'Hectares of Ecosystem Restored',
    prefix: '',
    suffix: '+',
  },
];

function AnimatedCounter({
  target,
  prefix,
  suffix,
  shouldCount,
}: {
  target: number;
  prefix: string;
  suffix: string;
  shouldCount: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldCount) return;
    let current = 0;
    const increment = target / 80;
    const stepTime = 2000 / 80;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [shouldCount, target]);

  return (
    <span className="text-5xl md:text-6xl font-bold text-white font-playfair">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [counted]);

  return (
    <section id="impact" ref={sectionRef} className="section-padding impact-section">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-white/70">
            Our Vision
          </p>
          <h2 className="section-title !text-white">2030 Impact Goals</h2>
          <p className="section-subtitle !text-white/80">
            Ambitious targets driving us toward a more sustainable and equitable future.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5">
                <goal.icon className="w-7 h-7 text-white" />
              </div>
              <AnimatedCounter
                target={goal.target}
                prefix={goal.prefix}
                suffix={goal.suffix}
                shouldCount={counted}
              />
              <p className="text-base text-white/85 mt-3 leading-relaxed">
                {goal.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
