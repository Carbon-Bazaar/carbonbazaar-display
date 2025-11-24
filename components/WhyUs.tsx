'use client';

import { useEffect, useRef } from 'react';
import { Check, DollarSign, Users, CheckCircle, TrendingUp } from 'lucide-react';

const badges = [
  {
    icon: Check,
    title: 'Transparent',
    description: 'Full visibility into every transaction and carbon credit',
  },
  {
    icon: DollarSign,
    title: 'Affordable',
    description: 'Accessible pricing for businesses of all sizes',
  },
  {
    icon: Users,
    title: 'Inclusive',
    description: 'Empowering communities at the grassroots level',
  },
  {
    icon: CheckCircle,
    title: 'Verifiable',
    description: 'Blockchain-backed certification and validation',
  },
  {
    icon: TrendingUp,
    title: 'Scalable',
    description: 'Built to grow with global sustainability needs',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const badges = sectionRef.current?.querySelectorAll('.badge-card');
    badges?.forEach((badge) => observer.observe(badge));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="why-us-background" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">Why CarbonBazaar?</h2>
        <p className="section-subtitle">Building trust through transparency and innovation</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="badge-card opacity-0 bg-white dark:bg-gray-800 p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="badge-icon mb-6">
                <badge.icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold text-dark-green dark:text-eco-green-light mb-3">
                {badge.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
