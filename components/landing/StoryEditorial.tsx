'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';
import { ART, CHAPTERS, FEATURES, MISSION, PLACES, REASONS } from './content';
import { Counter, EASE, PaintReveal, Reveal, RevealText, useScrollToId } from './motion';

/**
 * The editorial heart of the page (after altcarbon.com): a sticky left rail with
 * a chapter index and a reshuffling deck of Goa photographs, and a right column
 * of chapters — pinned headings, brush-painted art, statements and detail.
 */
export default function StoryEditorial() {
  const [active, setActive] = useState(0);

  return (
    <section aria-label="Our story" className="bg-paper-texture relative z-10">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-[72px] flex h-[calc(100vh-72px)] flex-col justify-between px-12 pb-12 pt-10">
            <ChapterIndex active={active} />
            <PhotoDeck active={active} />
          </div>
        </aside>

        <div className="border-ink/10 lg:border-l">
          <Chapter index={0} onActive={setActive} art={ART.mission}>
            <MissionBody />
          </Chapter>
          <Chapter index={1} onActive={setActive} art={ART.whatWeDo}>
            <FeaturesBody />
          </Chapter>
          <Chapter index={2} onActive={setActive} art={ART.whyUs}>
            <ReasonsBody />
          </Chapter>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Left rail ───────────────────────── */

function ChapterIndex({ active }: { active: number }) {
  const scrollToId = useScrollToId();
  return (
    <nav aria-label="Chapters">
      <p className="mb-5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/45">In this story</p>
      <ol className="space-y-1">
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <button
              type="button"
              onClick={() => scrollToId(chapter.id)}
              aria-current={active === i ? 'true' : undefined}
              className={cn(
                'group relative flex items-baseline gap-4 py-1.5 text-left transition-colors duration-500',
                active === i ? 'text-ink' : 'text-ink/40 hover:text-ink/70',
              )}
            >
              <span className="font-montserrat text-[11px] font-semibold tabular-nums">{chapter.index}</span>
              <span className="font-playfair text-[22px] leading-tight">{chapter.label}</span>
              {active === i && (
                <motion.span
                  layoutId="chapter-marker"
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  className="absolute -left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-green"
                />
              )}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Deck position for each card relative to the active one (0 = on top). */
const DECK_POSE = [
  { rotate: 0, x: 0, y: 0, scale: 1, zIndex: 3, filter: 'saturate(1)' },
  { rotate: -5, x: -18, y: 12, scale: 0.95, zIndex: 2, filter: 'saturate(0.7)' },
  { rotate: 6, x: 20, y: 22, scale: 0.9, zIndex: 1, filter: 'saturate(0.5)' },
] as const;

function PhotoDeck({ active }: { active: number }) {
  const place = PLACES[active];
  return (
    <figure className="w-full max-w-[330px]">
      <div className="relative aspect-[4/5]">
        {/* Offset outlines echo a stack of prints */}
        <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[22px] border border-ink/15" />
        <span aria-hidden="true" className="absolute inset-0 translate-x-6 translate-y-6 rounded-[22px] border border-ink/10" />
        {PLACES.map((photo, i) => {
          const pose = DECK_POSE[(i - active + PLACES.length) % PLACES.length];
          return (
            <motion.div
              key={photo.src}
              initial={false}
              animate={pose}
              transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }}
              className="absolute inset-0 overflow-hidden rounded-[22px] border-[6px] border-white bg-white shadow-[0_25px_50px_-20px_rgba(15,46,34,0.45)]"
            >
              <Image src={photo.src} alt={`${photo.note} in ${photo.place}, Goa`} fill sizes="330px" className="object-cover" />
            </motion.div>
          );
        })}
      </div>
      <figcaption className="mt-10 h-10 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={place.place}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-baseline gap-3"
          >
            <span className="font-playfair text-xl text-ink">{place.place}</span>
            <span className="font-montserrat text-xs font-medium uppercase tracking-[0.2em] text-ink/50">{place.note}</span>
          </motion.div>
        </AnimatePresence>
      </figcaption>
    </figure>
  );
}

/* ───────────────────────── Chapters ───────────────────────── */

interface ChapterProps {
  index: number;
  art: string;
  onActive: (index: number) => void;
  children: React.ReactNode;
}

function Chapter({ index, art, onActive, children }: ChapterProps) {
  const chapter = CHAPTERS[index];
  const ref = useRef<HTMLElement>(null);
  // Active while the chapter crosses the middle of the viewport.
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px' });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article id={chapter.id} ref={ref} aria-labelledby={`${chapter.id}-title`} className="relative px-6 pb-24 sm:px-10 lg:px-14 lg:pb-32">
      <header className="bg-paper-texture sticky top-[72px] z-10 -mx-6 flex items-baseline justify-between border-b border-ink/15 px-6 py-5 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14">
        <h2 id={`${chapter.id}-title`} className="font-playfair text-[26px] font-normal leading-none !text-ink sm:text-[30px]">
          {chapter.label}
        </h2>
        <span className="font-montserrat text-xs font-semibold tabular-nums text-ink/40">{chapter.index} / 03</span>
      </header>

      <PaintReveal src={art} className="mt-8 aspect-[1090/328] w-full rounded-[18px]" />

      <RevealText
        as="p"
        text={chapter.statement}
        className="mt-12 max-w-3xl font-playfair text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[1.08] tracking-[-0.015em] text-ink"
      />

      <div className="mt-12">{children}</div>
    </article>
  );
}

function MissionBody() {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {MISSION.paragraphs.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.12} as="p" className="font-montserrat text-[16px] leading-[1.75] text-ink/75">
            {paragraph}
          </Reveal>
        ))}
      </div>
      <dl className="mt-14 grid grid-cols-3 border-t border-ink/15">
        {MISSION.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className={cn('flex flex-col pt-6', i > 0 && 'border-l border-ink/15 pl-5 sm:pl-8')}>
            <dt className="order-2 mt-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/50">{stat.label}</dt>
            <dd className="order-1 font-playfair text-[clamp(2.2rem,4.4vw,4rem)] leading-none text-brand-green">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </>
  );
}

function FeaturesBody() {
  return (
    <ol className="border-t border-ink/15">
      {FEATURES.items.map((item, i) => (
        <Reveal key={item.title} as="li" delay={(i % 3) * 0.08} className="border-b border-ink/15">
          <div className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-start gap-x-4 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_auto]">
            <span className="pt-1 font-montserrat text-xs font-semibold tabular-nums text-ink/35 transition-colors duration-500 group-hover:text-brand-green">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-playfair text-[24px] font-normal leading-tight !text-ink transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xl font-montserrat text-[15px] leading-relaxed text-ink/65">{item.body}</p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              size={22}
              className="mt-1 text-ink/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-green"
            />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

const REASON_WASHES = ['wash-sage', 'wash-sky', 'wash-sand', 'wash-peach', 'wash-sage'] as const;

function ReasonsBody() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[22px] border border-ink/15 bg-ink/15 sm:grid-cols-2">
      {REASONS.items.map((item, i) => (
        <Reveal
          key={item.title}
          as="li"
          delay={(i % 2) * 0.1}
          className={cn('group relative overflow-hidden bg-paper p-8', i === REASONS.items.length - 1 && 'sm:col-span-2')}
        >
          {/* A pigment wash blooms behind the card on hover */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/textures/${REASON_WASHES[i]}.webp`}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 w-64 scale-50 opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-70"
          />
          <span className="relative font-montserrat text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-green">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="relative mt-4 font-playfair text-[26px] font-normal leading-tight !text-ink">{item.title}</h3>
          <p className="relative mt-3 max-w-md font-montserrat text-[15px] leading-relaxed text-ink/65">{item.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
