'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

// Lazy-load below-the-fold sections — they only load when needed
const Mission = dynamic(() => import('@/components/Mission'));
const WhatWeDo = dynamic(() => import('@/components/WhatWeDo'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const WhyUs = dynamic(() => import('@/components/WhyUs'));
const Impact = dynamic(() => import('@/components/Impact'));
const BackedBy = dynamic(() => import('@/components/BackedBy'));
const CTA = dynamic(() => import('@/components/CTA'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Mission />
      <WhatWeDo />
      <HowItWorks />
      <WhyUs />
      <Impact />
      <BackedBy />
      <CTA />
      <Footer />
    </main>
  );
}
