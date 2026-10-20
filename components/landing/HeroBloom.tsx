'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import BrandLogo from './BrandLogo';
import { HERO, SECTION_IDS } from './content';
import { EASE, RevealText, useScrollToId } from './motion';

const BLOOM_MASK = 'url(/textures/ink-bloom-mask.webp)';

/** Pigment washes floating on the paper around the bloom (decorative). */
const WASHES = [
  { src: '/textures/wash-peach.webp', className: '-left-[8vw] top-[6vh] w-[34vw] max-w-[520px]', speed: -160 },
  { src: '/textures/wash-sky.webp', className: '-right-[6vw] top-[10vh] w-[30vw] max-w-[460px]', speed: -260 },
  { src: '/textures/wash-sand.webp', className: 'left-[18vw] -bottom-[10vh] w-[28vw] max-w-[420px]', speed: -90 },
  { src: '/textures/wash-sage.webp', className: '-right-[4vw] bottom-[2vh] w-[22vw] max-w-[340px]', speed: -200 },
] as const;

/**
 * Pinned hero. On load a watercolour blot "blooms" open to reveal the landscape;
 * scrolling swells the bloom to full-bleed while the headline lifts away and the
 * next sheet of paper rises over it.
 */
export default function HeroBloom() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollToId = useScrollToId();
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Same behaviour as before: reveal once the video can play, or after 2.5s regardless.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const bloom = useMotionValue(0);
  useEffect(() => {
    if (!ready) return;
    const controls = animate(bloom, 1, { duration: reduceMotion ? 0 : 2.4, ease: EASE });
    return () => controls.stop();
  }, [ready, reduceMotion, bloom]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  // Bloom size: the intro spreads pigment across the paper until it covers any aspect ratio
  // (ragged edges belong to the opening moment); scrolling keeps swelling it.
  const maskSize = useTransform(() => {
    const size = bloom.get() * (260 + scrollYProgress.get() * 240);
    return `${size}vmax ${size}vmax`;
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.45], [0, -160]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const washOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id={SECTION_IDS.home} ref={sectionRef} aria-label="Introduction" className="relative h-[240vh]">
      <div className="bg-paper-texture sticky top-0 h-[100svh] overflow-hidden">
        {/* Pigment washes on the paper */}
        <motion.div aria-hidden="true" style={{ opacity: washOpacity }} className="pointer-events-none absolute inset-0">
          {WASHES.map((wash) => (
            <Wash key={wash.src} {...wash} progress={scrollYProgress} />
          ))}
        </motion.div>

        {/* The bloom: landscape video seen through a watercolour blot */}
        <motion.div
          className="absolute inset-0 bg-brand-pine"
          style={{
            WebkitMaskImage: BLOOM_MASK,
            maskImage: BLOOM_MASK,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: '50% 50%',
            maskPosition: '50% 50%',
            WebkitMaskSize: maskSize,
            maskSize,
          }}
        >
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            style={{ scale: videoScale }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={HERO.videoSrc} type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,46,34,0.55)_0%,rgba(15,46,34,0.45)_45%,rgba(15,46,34,0.7)_100%)]" />
          {/* focused scrim behind the copy so it reads over the white surf */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_48%_at_50%_50%,rgba(8,24,18,0.55)_0%,rgba(8,24,18,0.25)_60%,transparent_100%)]" />
        </motion.div>

        {/* Copy */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white [text-shadow:0_1px_2px_rgba(8,24,18,0.35),0_2px_24px_rgba(8,24,18,0.5)]"
        >
          {ready && (
            <>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.5 }}
                className="mb-6 font-montserrat text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 sm:text-xs"
              >
                {HERO.eyebrow}
              </motion.p>
              <h1 className="max-w-5xl font-gambetta text-[clamp(2.1rem,5.2vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.015em] !text-white">
                <RevealText as="span" text={HERO.lines[0]} immediate delay={0.7} className="block" />
                <RevealText as="span" text={HERO.lines[1]} immediate delay={0.95} className="block text-[#C8EBB0]" />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 1.5 }}
                className="mt-7 max-w-xl font-montserrat text-[15px] font-medium leading-relaxed text-white/95 sm:text-[17px]"
              >
                {HERO.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 1.7 }}
                className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={() => scrollToId(SECTION_IDS.contact)}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-green px-7 font-montserrat text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(70,153,39,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-hover"
                >
                  Start your project
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId(SECTION_IDS.howItWorks)}
                  className="inline-flex h-12 items-center rounded-full border border-white/60 px-7 font-montserrat text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  See how it works
                </button>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Preparing the canvas */}
        <motion.div
          aria-hidden={ready}
          initial={false}
          animate={{ opacity: ready ? 0 : 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-5"
        >
          <BrandLogo size="lg" />
          <span className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/60">
            Preparing ecosystem
          </span>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={() => scrollToId(SECTION_IDS.backedBy)}
          style={{ opacity: cueOpacity }}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80"
        >
          Scroll to explore
          <span className="relative h-10 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_2.2s_ease-in-out_infinite] bg-white motion-reduce:animate-none" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

interface WashProps {
  src: string;
  className: string;
  speed: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Wash({ src, className, speed, progress }: WashProps) {
  const y = useTransform(progress, [0, 1], [0, speed]);
  // eslint-disable-next-line @next/next/no-img-element
  return <motion.img src={src} alt="" style={{ y }} className={`absolute ${className}`} />;
}
