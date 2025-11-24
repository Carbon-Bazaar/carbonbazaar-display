'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const cards = [
  {
    title: 'Direct Marketplace',
    description: 'Connecting coastal communities directly with buyers, ensuring fair compensation and transparency.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
  },
  {
    title: 'Fractional Credits',
    description: 'Making carbon credits accessible to MSMEs through affordable fractional ownership.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&q=80',
  },
  {
    title: 'Blockchain Transparency',
    description: 'Every transaction verified and recorded on blockchain for complete accountability.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
  },
  {
    title: 'Blue Carbon Focus',
    description: 'Specializing in mangrove and coastal ecosystem restoration projects.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1548',
  },
  {
    title: 'Climate Impact',
    description: 'Measurable, verifiable impact on global carbon reduction goals.',
    image: 'https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=1740',
  },
  {
    title: 'Fair Compensation',
    description: 'Ensuring communities receive fair value for their conservation efforts.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&q=80',
  },
];

export default function WhatWeDo() {
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

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="what-we-do" ref={sectionRef} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">What We Do</h2>
        <p className="section-subtitle">
          Transforming the carbon credit landscape with innovation and integrity
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="feature-card opacity-0 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark-green dark:text-eco-green-light mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
