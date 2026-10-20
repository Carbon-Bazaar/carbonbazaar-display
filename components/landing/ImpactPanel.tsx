'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ART, IMPACT, SECTION_IDS } from './content';
import { Counter, Reveal, RevealText } from './motion';

/**
 * 2030 goals on a deep-forest panel that grows from an inset card to full-bleed
 * as it scrolls into view, the watercolour art drifting slower behind it.
 */
export default function ImpactPanel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], ['-10%', '0%']);

  return (
    <section id={SECTION_IDS.impact} ref={ref} aria-labelledby="impact-title" className="relative z-10 bg-white">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative flex min-h-screen origin-top flex-col justify-center overflow-hidden bg-brand-ink px-6 py-28 text-white sm:px-10 lg:px-16"
      >
        {/* The painting at its own banner shape (stays sharp), in full colour, fading into the forest green */}
        <motion.div
          aria-hidden="true"
          style={{ y: artY }}
          className="absolute inset-x-0 top-0 aspect-[1090/328] min-h-[200px] [mask-image:linear-gradient(to_bottom,#000_40%,transparent_100%)]"
        >
          <Image src={ART.impact} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/20 via-brand-ink/35 to-brand-ink/70" />
          {/* deepen only the side where the heading sits; the right of the painting stays vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/70 via-brand-ink/30 to-transparent" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1300px]">
          <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">{IMPACT.eyebrow}</p>
          <RevealText
            as="h2"
            id="impact-title"
            text={IMPACT.title}
            className="mt-5 font-playfair text-[clamp(2.8rem,7vw,7rem)] font-normal leading-[0.95] tracking-[-0.02em] !text-white"
          />
          <Reveal delay={0.25} as="p" className="mt-6 max-w-lg font-montserrat text-[16px] leading-relaxed text-white/70">
            {IMPACT.intro}
          </Reveal>

          <dl className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {IMPACT.goals.map((goal, i) => (
              <Reveal key={goal.label} delay={i * 0.1} className="flex flex-col border-t border-white/20 pt-6">
                <dt className="order-2 mt-4 max-w-[16rem] font-montserrat text-[14px] leading-snug text-white/65">{goal.label}</dt>
                <dd className="order-1 font-playfair text-[clamp(3rem,5vw,4.75rem)] leading-none text-white">
                  <Counter value={goal.value} prefix={goal.prefix} suffix={goal.suffix} duration={2.6} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
