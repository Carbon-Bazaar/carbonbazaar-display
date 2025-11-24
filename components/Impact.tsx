'use client';

import { useEffect, useRef, useState } from 'react';

const goals = [
  { icon: '🌊', target: 10000, label: 'Coastal Community Members Empowered', prefix: '', suffix: '+' },
  { icon: '💰', target: 100, label: 'Crores in Carbon Trades Facilitated', prefix: '₹', suffix: ' Cr' },
  { icon: '🏢', target: 50000, label: 'SMEs Onboarded into Sustainable Offsetting', prefix: '', suffix: '+' },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [counted]);

  const animateCounters = () => {
    const counters = document.querySelectorAll('.goal-number');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = target / 100;
      const duration = 2000;
      const stepTime = duration / 100;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = prefix + target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  return (
    <section id="impact" ref={sectionRef} className="section-padding impact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-white">Our 2030 Vision</h2>
        <p className="section-subtitle text-white/90">Ambitious targets for a sustainable future</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="goal-card text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{goal.icon}</div>
              <div
                className="goal-number text-5xl font-bold text-white mb-4 font-playfair"
                data-target={goal.target}
                data-prefix={goal.prefix}
                data-suffix={goal.suffix}
              >
                {goal.prefix}0{goal.suffix}
              </div>
              <p className="text-lg text-white/95 leading-relaxed">{goal.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
