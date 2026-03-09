'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import WhatWeDo from '@/components/WhatWeDo';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import Impact from '@/components/Impact';
import BackedBy from '@/components/BackedBy';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

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
