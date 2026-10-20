'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { SECTION_IDS, SUPPORTERS } from './content';
import { RevealText } from './motion';

/** Four supporters repeated so the strip is wider than any screen before it loops. */
const STRIP = [...SUPPORTERS, ...SUPPORTERS, ...SUPPORTERS];

/**
 * A sheet of paper that slides up over the pinned hero — corners square off and
 * edges widen to full-bleed as it lands — carrying the supporters marquee.
 */
export default function BackedBySheet() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const radius = useTransform(scrollYProgress, [0, 0.85], [44, 0]);
  const inset = useTransform(scrollYProgress, [0, 0.85], ['4vw', '0vw']);

  return (
    <section
      id={SECTION_IDS.backedBy}
      ref={ref}
      aria-labelledby="backed-by-title"
      className="relative z-10 -mt-[100svh]"
    >
      <motion.div style={{ marginInline: inset }}>
        <motion.div
          style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius }}
          className="bg-paper-texture overflow-hidden pb-16 pt-14 shadow-[0_-30px_60px_-30px_rgba(15,46,34,0.35)] sm:pt-20"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-12">
            <RevealText
              as="h2"
              text="Backed by the institutions building India’s climate future"
              className="max-w-2xl font-playfair text-[clamp(1.75rem,3.2vw,2.9rem)] font-normal leading-[1.08] tracking-[-0.01em] !text-ink"
            />
            <p id="backed-by-title" className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55">
              Supported by
            </p>
          </div>

          {/* Marquee */}
          <div className="group relative mt-12 overflow-hidden border-y border-ink/10 py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <ul className="flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-24 sm:pr-24">
              {[...STRIP, ...STRIP].map((supporter, i) => (
                <li
                  key={`${supporter.name}-${i}`}
                  aria-hidden={i >= SUPPORTERS.length}
                  className="flex shrink-0 items-center gap-4 opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                >
                  {supporter.logo ? (
                    <Image src={supporter.logo} alt="" width={56} height={56} className="h-12 w-auto object-contain" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-montserrat text-xs font-bold text-white">
                      SPC
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className="font-playfair text-[22px] leading-tight text-ink">{supporter.name}</span>
                    <span className="max-w-[240px] font-montserrat text-[11px] leading-snug text-ink/55">{supporter.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
