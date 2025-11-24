'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.highlight-item').forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('fade-in-up');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const highlights = sectionRef.current?.querySelector('.mission-highlights');
    if (highlights) observer.observe(highlights);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="section-padding bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
              alt="Coastal ecosystem"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="section-title-left">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              CarbonBazaar is building a decentralized carbon credit marketplace that empowers
              coastal communities, restores blue carbon ecosystems, and makes sustainable
              offsetting accessible for SMEs through blockchain-based transparency.
            </p>
            <div className="mission-highlights flex gap-8 flex-wrap">
              <div className="highlight-item opacity-0">
                <span className="highlight-number">100%</span>
                <span className="highlight-text">Transparent</span>
              </div>
              <div className="highlight-item opacity-0">
                <span className="highlight-number">0</span>
                <span className="highlight-text">Middlemen</span>
              </div>
              <div className="highlight-item opacity-0">
                <span className="highlight-number">24/7</span>
                <span className="highlight-text">Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
