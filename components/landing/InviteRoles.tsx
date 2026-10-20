'use client';

import { useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { LandPlot, Linkedin, Mail, ShieldCheck, type LucideIcon } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';
import { CARD_PATHS, maskFor } from './notch';
import { INVITE, SECTION_IDS } from './content';
import { EASE, Reveal, RevealText } from './motion';

/*
 * The scene is the designer's role-selection artwork with the logo, baked-in
 * cards and divider removed. Everything is placed in the mockup's own 1600×900
 * pixel space, so cards, divider and copy land exactly where the designer drew
 * them. Phones show a tighter crop around the seedling.
 */
const SCENE = '/images/landing/sapling-scene.webp';
const CARD_W = 306; // px in scene space; cards keep the notch paths' 3:4 shape
const STEM_X = 798.5;

type Role = 'buyer' | 'seller';

/** Glass measured from the mockup (total-least-squares fit across every card edge). */
const GLASS: Record<Role, string> = {
  buyer: 'rgba(255,250,243,0.66)',
  seller: 'rgba(43,70,45,0.78)',
};

interface RoleCard {
  role: Role;
  label: string;
  desc: string;
  Icon: LucideIcon;
  path: string;
  /** Top-left corner in scene space. */
  x: number;
  y: number;
  align: 'left' | 'right';
}

const CARDS: RoleCard[] = [
  { role: 'buyer', label: 'Buyer', desc: 'MSME purchasing credit', Icon: ShieldCheck, path: CARD_PATHS.buyer, x: 459.5, y: 358.5, align: 'left' },
  { role: 'seller', label: 'Landowner', desc: 'Selling carbon credits', Icon: LandPlot, path: CARD_PATHS.seller, x: 827.5, y: 359, align: 'right' },
];

/** Scene-space → stage-percentage helpers (the crop comes from responsive CSS variables). */
const sx = (x: number) => `calc((${x} - var(--cx)) / var(--cw) * 100%)`;
const sy = (y: number) => `calc((${y} - var(--cy)) / var(--ch) * 100%)`;
const sw = (w: number) => `calc(${w} / var(--cw) * 100%)`;
const sh = (h: number) => `calc(${h} / var(--ch) * 100%)`;

const placeCard = (card: RoleCard): CSSProperties => ({ left: sx(card.x), top: sy(card.y), width: sw(CARD_W), aspectRatio: '3 / 4' });

/** Seeds & pollen drifting up out of the soil (scene-space start positions). */
const SEEDS = [
  { x: 640, y: 780, size: 6, color: '#E9A58A', delay: 0, dur: 9 },
  { x: 720, y: 800, size: 4, color: '#9FC08C', delay: 2.4, dur: 11 },
  { x: 880, y: 790, size: 5, color: '#F2D6A2', delay: 1.1, dur: 10 },
  { x: 960, y: 810, size: 3, color: '#FFFFFF', delay: 3.6, dur: 8 },
  { x: 560, y: 820, size: 4, color: '#F2D6A2', delay: 4.8, dur: 12 },
  { x: 1040, y: 800, size: 6, color: '#E9A58A', delay: 5.5, dur: 10 },
  { x: 790, y: 770, size: 3, color: '#FFFFFF', delay: 6.6, dur: 9 },
  { x: 1180, y: 830, size: 4, color: '#9FC08C', delay: 7.4, dur: 13 },
  { x: 420, y: 830, size: 5, color: '#E9A58A', delay: 8.2, dur: 11 },
];

/**
 * Closing invitation: "I am a Buyer / I am a Landowner" on the designer's
 * watercolour seedling, with the site's existing actions (LinkedIn, email).
 */
export default function InviteRoles() {
  const reduceMotion = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  // Bloom while the seedling is on screen: from the stage top at 55% of the viewport to 5%.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start 55%', 'start 5%'] });
  // The painting (and its glass) blooms open from the seedling as the stage scrolls in.
  // Sizes in the stage's container units keep the blot circular at any crop (motion can't tween "auto").
  const bloomSize = useTransform(scrollYProgress, (p: number) => {
    const size = reduceMotion ? 420 : 40 + Math.pow(p, 1.4) * 380;
    return `${size}cqi ${size}cqi`;
  });
  const artY = useTransform(scrollYProgress, [0, 1], ['-3%', '0%']);
  const artScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  // Cards (and the divider) arrive once their glass has bloomed in — white type needs the glass behind it.
  const [bloomed, setBloomed] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p > 0.45) setBloomed(true);
  });
  const show = bloomed || !!reduceMotion;

  return (
    <section id={SECTION_IDS.contact} aria-labelledby="invite-title" className="bg-paper-texture relative z-10 overflow-hidden">
      {/* Copy above the scene on phones / tablets */}
      <div className="px-6 pb-4 pt-24 text-center sm:px-10 lg:hidden">
        <InviteCopy titleId="invite-title" />
      </div>

      <div
        ref={stageRef}
        className={cn(
          'relative w-full [container-type:inline-size]',
          // Crop of the 1600×900 scene: tight around the seedling on small screens, the full scene on desktop.
          '[--cx:430] [--cy:130] [--cw:730] [--ch:770] lg:[--cx:0] lg:[--cy:0] lg:[--cw:1600] lg:[--ch:900]',
          // Soften the crop's top and bottom edges into the paper on small screens.
          '[mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] lg:[mask-image:none]',
        )}
        style={{ aspectRatio: 'var(--cw) / var(--ch)' }}
      >
        {/* Painting + glass bloom in together — the glass is part of the picture */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'url(/textures/ink-bloom-mask.webp)',
            maskImage: 'url(/textures/ink-bloom-mask.webp)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: '50% 64%',
            maskPosition: '50% 64%',
            WebkitMaskSize: bloomSize,
            maskSize: bloomSize,
          }}
        >
          <motion.div className="absolute" style={{ left: sx(0), top: sy(0), width: sw(1600), height: sh(900), y: artY, scale: artScale, originY: 1 }}>
            <Image src={SCENE} alt="" fill sizes="(min-width: 1024px) 100vw, 220vw" className="object-cover" />
          </motion.div>

          {CARDS.map((card) => (
            <span key={card.role} className="absolute" style={{ ...placeCard(card), ...maskFor(card.path), backgroundColor: GLASS[card.role] }} />
          ))}
        </motion.div>

        {/* Dashed divider drawn down the stem */}
        <motion.span
          aria-hidden="true"
          className="absolute w-0 origin-top border-l-2 border-dashed border-white/90"
          style={{ left: sx(STEM_X), top: sy(150), height: sh(610) }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: show ? 1 : 0 }}
          transition={{ duration: 1.6, ease: EASE }}
        />

        {/* Seeds drifting up from the soil */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 motion-reduce:hidden">
          {SEEDS.map((seed, i) => (
            <span
              key={i}
              className="absolute rounded-full opacity-0 [animation:seed-drift_var(--dur)_ease-in-out_var(--delay)_infinite]"
              style={
                {
                  left: sx(seed.x),
                  top: sy(seed.y),
                  width: seed.size,
                  height: seed.size,
                  background: seed.color,
                  boxShadow: `0 0 ${seed.size * 2}px ${seed.color}`,
                  '--dur': `${seed.dur}s`,
                  '--delay': `${seed.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Role cards: outline draws in, copy rises */}
        {CARDS.map((card, i) => (
          <RoleCardArt key={card.role} card={card} index={i} show={show} />
        ))}

        {/* Desktop copy — where the mockup's tagline sits — and the contact actions on the right */}
        <div className="absolute hidden lg:block" style={{ left: sx(90), top: sy(120), width: sw(560) }}>
          <InviteCopy align="left" />
        </div>
        <div className="absolute hidden lg:block" style={{ left: sx(1150), top: sy(420), width: sw(400) }}>
          <ContactActions align="right" />
        </div>
      </div>

      <div className="px-6 pb-20 pt-8 sm:px-10 lg:hidden">
        <ContactActions align="center" />
      </div>
    </section>
  );
}

function InviteCopy({ align = 'center', titleId }: { align?: 'left' | 'center'; titleId?: string }) {
  const left = align === 'left';
  return (
    <div className={cn('flex flex-col', left ? 'items-start text-left' : 'items-center text-center')}>
      <p className={cn('font-montserrat font-semibold uppercase tracking-[0.3em] text-brand-green', left ? 'text-[clamp(10px,0.8cqi,13px)]' : 'text-[11px]')}>
        {INVITE.eyebrow}
      </p>
      <RevealText
        as="h2"
        id={titleId}
        text={INVITE.title}
        className={cn(
          'mt-[0.45em] font-playfair font-normal leading-[0.98] tracking-[-0.02em] !text-ink',
          left ? 'text-[clamp(2.2rem,3.7cqi,4.4rem)]' : 'max-w-xl text-[clamp(2.3rem,9vw,3.6rem)]',
        )}
      />
      <Reveal
        delay={0.2}
        as="p"
        className={cn('mt-5 font-montserrat leading-relaxed text-ink/75', left ? 'max-w-[34ch] text-[clamp(14px,1.05cqi,17px)]' : 'max-w-md text-[15px]')}
      >
        {INVITE.body}
      </Reveal>
    </div>
  );
}

/** The site's existing actions: connect on LinkedIn or email us. */
function ContactActions({ align }: { align: 'right' | 'center' }) {
  const right = align === 'right';
  return (
    <Reveal delay={0.6} className={cn('flex flex-col gap-4 font-montserrat', right ? 'items-end text-right' : 'items-center text-center')}>
      <p className={cn('leading-relaxed text-ink/75', right ? 'text-[clamp(13px,1cqi,16px)]' : 'text-[15px]')}>Prefer a conversation?</p>
      <div className={cn('flex flex-wrap gap-3', right ? 'justify-end' : 'justify-center')}>
        <a
          href={INVITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/25 bg-paper/75 px-5 text-[14px] font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/50"
        >
          <Linkedin size={16} aria-hidden="true" />
          Connect on LinkedIn
        </a>
        <a
          href={`mailto:${INVITE.email}`}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-green px-5 text-[14px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(70,153,39,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-hover"
        >
          <Mail size={16} aria-hidden="true" />
          Email Us
        </a>
      </div>
    </Reveal>
  );
}

function RoleCardArt({ card, index, show }: { card: RoleCard; index: number; show: boolean }) {
  const isBuyer = card.role === 'buyer';
  const right = card.align === 'right';
  const delay = 0.25 + index * 0.15;

  return (
    <div className="absolute [container-type:inline-size]" style={placeCard(card)}>
      {/* Outline follows the notch and draws itself in */}
      <svg aria-hidden="true" viewBox="0 0 300 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <motion.path
          d={card.path}
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: show ? 1 : 0 }}
          transition={{ duration: 1.6, ease: EASE, delay }}
          className={cn('[stroke-width:1.5px]', isBuyer ? 'stroke-[#1E3A2A]/80' : 'stroke-white/60')}
        />
      </svg>

      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.8, ease: EASE, delay: delay + 0.5 }}
        className={cn(
          'absolute top-[9cqi] flex h-[clamp(30px,17cqi,54px)] w-[clamp(30px,17cqi,54px)] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(15,46,34,0.18)]',
          right ? 'right-[10cqi]' : 'left-[10cqi]',
        )}
      >
        <card.Icon className="h-[46%] w-[46%] text-brand-green" strokeWidth={1.8} />
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 1.1, ease: EASE, delay: delay + 0.35 }}
        className={cn(
          'absolute inset-x-[10cqi] bottom-[15cqi] flex flex-col font-montserrat',
          right ? 'items-end text-right' : 'items-start',
          isBuyer ? 'text-brand-ink' : 'text-white',
        )}
      >
        <span className="text-[clamp(12px,8.4cqi,26px)] italic leading-tight">I am a</span>
        <span className="text-[clamp(18px,13cqi,40px)] font-bold leading-[1.1]">{card.label}</span>
        <span aria-hidden="true" className={cn('my-[5cqi] h-px w-full', isBuyer ? 'bg-brand-ink/60' : 'bg-white/60')} />
        <span className="text-[clamp(10px,6.4cqi,20px)] font-medium italic leading-snug">{card.desc}</span>
      </motion.p>
    </div>
  );
}
