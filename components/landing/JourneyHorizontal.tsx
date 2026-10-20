'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { JOURNEY, SECTION_IDS } from './content';
import { EASE, PaintReveal, Reveal, RevealText } from './motion';

const STEP_COUNT = JOURNEY.steps.length;

/** How it works — five painted steps on a pinned, horizontally scrolling track. */
export default function JourneyHorizontal() {
  return (
    <section id={SECTION_IDS.howItWorks} aria-label={JOURNEY.title} className="relative z-10 bg-white">
      <DesktopJourney />
      <MobileJourney />
    </section>
  );
}

/* ───────────────────────── Desktop: pinned horizontal track ───────────────────────── */

function DesktopJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const travelMV = useMotionValue(0);

  // Vertical scroll distance = horizontal overflow of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      setTravel(next);
      setTrackWidth(track.scrollWidth);
      travelMV.set(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [travelMV]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(() => -scrollYProgress.get() * travelMV.get());
  const vine = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });
  const [step, setStep] = useState(1);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setStep(Math.min(STEP_COUNT, Math.max(1, Math.round(p * (STEP_COUNT - 1)) + 1)));
  });

  return (
    <div ref={sectionRef} className="relative hidden lg:block" style={{ height: `calc(100vh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Step counter */}
        <div className="absolute right-12 top-24 flex items-center gap-4 font-montserrat text-xs font-semibold tabular-nums text-ink/50">
          <span className="text-ink">{String(step).padStart(2, '0')}</span>
          <span className="relative h-px w-24 bg-ink/15">
            <motion.span style={{ scaleX: vine }} className="absolute inset-0 origin-left bg-brand-green" />
          </span>
          <span>{String(STEP_COUNT).padStart(2, '0')}</span>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="relative flex w-max items-stretch gap-16 pl-12 pr-[12vw] will-change-transform">
          {/* Intro panel */}
          <div className="flex w-[34vw] max-w-[520px] shrink-0 flex-col justify-center">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-green">{JOURNEY.eyebrow}</p>
            <RevealText
              as="h2"
              text={JOURNEY.title}
              className="mt-5 font-playfair text-[clamp(3rem,6vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.02em] !text-ink"
            />
            <Reveal delay={0.3} as="p" className="mt-6 max-w-sm font-montserrat text-[16px] leading-relaxed text-ink/65">
              {JOURNEY.intro}
            </Reveal>
            <p className="mt-10 flex items-center gap-3 font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">
              Keep scrolling
              <span aria-hidden="true" className="inline-block h-px w-12 bg-ink/30" />
            </p>
          </div>

          {JOURNEY.steps.map((s, i) => (
            <StepPanel key={s.title} index={i} title={s.title} body={s.body} art={s.art} />
          ))}

          {/* The vine growing beneath every step */}
          <Vine progress={vine} width={trackWidth} />
        </motion.div>
      </div>
    </div>
  );
}

function StepPanel({ index, title, body, art }: { index: number; title: string; body: string; art: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const centred = useInView(ref, { margin: '0px -45% 0px -45%' });
  return (
    <article ref={ref} className="relative flex w-[min(58vw,760px)] shrink-0 flex-col justify-center pb-32">
      <PaintReveal src={art} className="aspect-[1090/328] w-full rounded-[18px]" sizes="760px" />
      <div className="mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-8">
        <span
          aria-hidden="true"
          className="font-playfair text-[120px] leading-[0.8] text-transparent transition-colors duration-700 [-webkit-text-stroke:1.5px_rgba(31,42,36,0.35)]"
          style={centred ? { color: '#469927', WebkitTextStroke: '1.5px #469927' } : undefined}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-playfair text-[34px] font-normal leading-tight !text-ink">
            <span className="sr-only">Step {index + 1}: </span>
            {title}
          </h3>
          <p className="mt-3 max-w-md font-montserrat text-[16px] leading-relaxed text-ink/65">{body}</p>
        </div>
      </div>
      {/* Leaf that sprouts from the vine as the step reaches centre stage */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="absolute bottom-[70px] left-1/2 h-9 w-9 -translate-x-1/2 text-brand-green"
        initial={false}
        animate={{ scale: centred ? 1 : 0, rotate: centred ? (index % 2 ? 35 : -35) : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ originX: 0.5, originY: 1 }}
      >
        <path d="M20 40C20 26 12 16 4 12c10-2 22 4 16 28Z" fill="currentColor" opacity="0.85" />
        <path d="M20 40c0-12 4-20 14-26-2 12-6 20-14 26Z" fill="currentColor" opacity="0.55" />
      </motion.svg>
    </article>
  );
}

function Vine({ progress, width }: { progress: ReturnType<typeof useSpring>; width: number }) {
  // A gentle wave drawn at the track's real pixel width, so pathLength maps 1:1 to progress.
  if (!width) return null;
  const period = 180;
  const segments = Math.ceil(width / period);
  let d = 'M0 30';
  for (let i = 1; i <= segments; i++) d += ` Q ${(i - 0.5) * period} ${i % 2 ? 4 : 56} ${i * period} 30`;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${width} 60`} width={width} height={60} className="pointer-events-none absolute bottom-10 left-0">
      <path d={d} fill="none" stroke="rgba(31,42,36,0.14)" strokeWidth="1.5" strokeDasharray="4 8" />
      <motion.path d={d} fill="none" stroke="#469927" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
    </svg>
  );
}

/* ───────────────────────── Mobile / tablet: vertical timeline ───────────────────────── */

function MobileJourney() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const stem = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });

  return (
    <div className="px-6 py-24 sm:px-10 lg:hidden">
      <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-green">{JOURNEY.eyebrow}</p>
      <RevealText
        as="h2"
        text={JOURNEY.title}
        className="mt-4 font-playfair text-[clamp(2.6rem,10vw,4rem)] font-normal leading-[0.95] tracking-[-0.02em] !text-ink"
      />
      <p className="mt-5 font-montserrat text-[15px] leading-relaxed text-ink/65">{JOURNEY.intro}</p>

      <ol ref={listRef} className="relative mt-14 space-y-14 pl-10">
        <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-px bg-ink/15" />
        <motion.span aria-hidden="true" style={{ scaleY: stem }} className="absolute bottom-0 left-[10px] top-0 w-[3px] origin-top rounded-full bg-brand-green" />
        {JOURNEY.steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green font-montserrat text-[10px] font-bold text-white ring-4 ring-white">
              {i + 1}
            </span>
            <PaintReveal src={s.art} className="aspect-[1090/328] w-full rounded-[14px]" />
            <h3 className="mt-5 font-playfair text-[26px] font-normal leading-tight !text-ink">{s.title}</h3>
            <p className="mt-2 font-montserrat text-[15px] leading-relaxed text-ink/65">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
