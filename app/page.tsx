import LandingNav from '@/components/landing/LandingNav';
import HeroBloom from '@/components/landing/HeroBloom';
import BackedBySheet from '@/components/landing/BackedBySheet';
import StoryEditorial from '@/components/landing/StoryEditorial';
import JourneyHorizontal from '@/components/landing/JourneyHorizontal';
import ImpactPanel from '@/components/landing/ImpactPanel';
import InviteRoles from '@/components/landing/InviteRoles';
import LandingFooter from '@/components/landing/LandingFooter';
import { SmoothScroll } from '@/components/landing/motion';

export default function Home() {
  return (
    <SmoothScroll>
      <LandingNav />
      <main className="bg-paper">
        <HeroBloom />
        <BackedBySheet />
        <StoryEditorial />
        <JourneyHorizontal />
        <ImpactPanel />
        <InviteRoles />
      </main>
      <LandingFooter />
    </SmoothScroll>
  );
}
