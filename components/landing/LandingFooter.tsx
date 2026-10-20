'use client';

import { useRef } from 'react';
import { ArrowUpRight, Linkedin, Mail, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FOOTER, SECTION_IDS, SUPPORTERS } from './content';
import { useScrollToId } from './motion';

const WORDMARK = ['C', 'A', 'R', 'B', 'O', 'N', ' ', 'B', 'A', 'Z', 'A', 'A', 'R'];

/** Footer with a giant wordmark whose letters rise out of the ground as you reach the end. */
export default function LandingFooter() {
  const ref = useRef<HTMLElement>(null);
  const scrollToId = useScrollToId();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden bg-brand-ink font-montserrat text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/textures/wash-sky.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 w-[560px] opacity-20 mix-blend-screen" />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-24 sm:px-10 lg:px-12">
        <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <p className="max-w-sm font-playfair text-[28px] leading-snug text-white">{FOOTER.blurb}</p>
            <a
              href={`mailto:${FOOTER.email}`}
              className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#CDEBB9] transition-colors hover:text-white"
            >
              {FOOTER.email}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <FooterColumn title="Quick links">
            {FOOTER.links.map((link) => (
              <li key={link.id}>
                <button type="button" onClick={() => scrollToId(link.id)} className="text-[15px] text-white/70 transition-colors hover:text-white">
                  {link.label}
                </button>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            <li>
              <a href={FOOTER.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] text-white/70 transition-colors hover:text-white">
                <Linkedin size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${FOOTER.email}`} className="inline-flex items-center gap-2 text-[15px] text-white/70 transition-colors hover:text-white">
                <Mail size={16} /> Email us
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-[15px] text-white/70">
              <MapPin size={16} /> {FOOTER.location}
            </li>
          </FooterColumn>

          <FooterColumn title="Supported by">
            {SUPPORTERS.map((s) => (
              <li key={s.name} className="text-[15px] text-white/70">
                {s.name}
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-3 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CarbonBazaar. All rights reserved.</p>
          <button type="button" onClick={() => scrollToId(SECTION_IDS.home)} className="self-start transition-colors hover:text-white sm:self-auto">
            Back to top ↑
          </button>
        </div>
      </div>

      {/* Giant wordmark */}
      <p
        aria-hidden="true"
        className="relative flex select-none justify-center whitespace-pre px-2 pb-2 font-bebas text-[clamp(4.5rem,17.5vw,19rem)] leading-[0.8] tracking-[0.01em]"
      >
        {WORDMARK.map((letter, i) => (
          <Letter key={i} letter={letter} index={i} progress={scrollYProgress} />
        ))}
      </p>
    </footer>
  );
}

function Letter({ letter, index, progress }: { letter: string; index: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const start = 0.35 + index * 0.025;
  const y = useTransform(progress, [start, start + 0.35], ['65%', '0%']);
  const isBazaar = index > 6;
  return (
    <span className="inline-block overflow-hidden">
      <motion.span style={{ y }} className={`inline-block ${isBazaar ? 'text-[#7FB3DA]' : 'text-[#8CC66F]'}`}>
        {letter}
      </motion.span>
    </span>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}
