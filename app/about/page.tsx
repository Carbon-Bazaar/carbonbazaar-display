import LandingNav from '@/components/landing/LandingNav';
import AboutPage from '@/components/landing/AboutPage';
import LandingFooter from '@/components/landing/LandingFooter';
import { SmoothScroll } from '@/components/landing/motion';

export default function About() {
  return (
    <SmoothScroll>
      <LandingNav />
      <main className="bg-paper">
        <AboutPage />
      </main>
      <LandingFooter />
    </SmoothScroll>
  );
}
