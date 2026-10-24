'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Leaf, Linkedin, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ABOUT, INVITE } from './content';
import { EASE, PaintReveal, Reveal, RevealText } from './motion';

/**
 * About us, after altcarbon.com/about: a full-bleed mission hero, the story beside
 * a stacked photo and painted art, a contact strip, the founders, and a closing
 * painted panel with ways to work together.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <div className="bg-paper-texture relative z-10">
        <AboutStory />
        <TalkStrip />
        <Team />
        <Closing />
      </div>
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} aria-labelledby="about-title" className="relative flex min-h-[88svh] items-end overflow-hidden bg-brand-ink">
      <motion.div aria-hidden="true" style={{ scale: artScale }} className="absolute inset-0">
        <Image src={ABOUT.hero.art} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      {/* deep-forest wash so the white type reads on the light painting; darker under the header and the copy */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/55 to-brand-ink/45" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-ink/60 via-transparent to-transparent" />

      <motion.div style={{ y: copyY }} className="relative mx-auto w-full max-w-[1440px] px-6 pb-16 pt-40 sm:px-10 lg:px-12 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85"
        >
          {ABOUT.hero.eyebrow}
        </motion.p>
        <RevealText
          as="h1"
          id="about-title"
          text={ABOUT.hero.title}
          immediate
          delay={0.35}
          className="mt-5 max-w-4xl font-gambetta text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.015em] !text-white [text-wrap:balance]"
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
          className="mt-6 max-w-xl font-montserrat text-[16px] font-medium leading-relaxed text-white/90 sm:text-[18px]"
        >
          {ABOUT.hero.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
          className="mt-8"
        >
          <Link
            href="/#contact"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-white/60 px-7 font-montserrat text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Get in touch
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Story ───────────────────────── */

function AboutStory() {
  const { story } = ABOUT;
  return (
    <section aria-labelledby="about-story-title" className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0 lg:px-12 lg:py-32">
      {/* Stacked print, like a photo pinned to the page */}
      <Reveal className="lg:pr-14">
        <figure className="relative mx-auto aspect-[4/3] w-full max-w-[560px] lg:sticky lg:top-28">
          <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[22px] border border-ink/15" />
          <span aria-hidden="true" className="absolute inset-0 translate-x-6 translate-y-6 rounded-[22px] border border-ink/10" />
          <div className="absolute inset-0 overflow-hidden rounded-[22px] border-[6px] border-white bg-white shadow-[0_25px_50px_-20px_rgba(15,46,34,0.45)]">
            <Image src={story.photo} alt={story.photoAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </figure>
      </Reveal>

      <div className="border-ink/10 lg:border-l lg:pl-14">
        <header className="border-b border-ink/15 pb-4">
          <h2 id="about-story-title" className="font-playfair text-[26px] font-normal leading-none !text-ink sm:text-[30px]">
            {story.label}
          </h2>
        </header>
        <PaintReveal src={story.art} className="mt-8 aspect-[1090/328] w-full rounded-[18px]" />
        <Reveal as="p" className="mt-10 max-w-2xl font-montserrat text-[17px] leading-[1.75] text-ink/80">
          {story.description}
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact strip ───────────────────────── */

function TalkStrip() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-12">
      <Reveal className="flex flex-col gap-6 rounded-[22px] border border-ink/15 bg-paper/60 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-xl font-playfair text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight text-ink">{ABOUT.talk}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={INVITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/25 px-6 font-montserrat text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/50"
          >
            <Linkedin size={17} aria-hidden="true" />
            Connect on LinkedIn
          </a>
          <a
            href={`mailto:${INVITE.email}`}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-green px-6 font-montserrat text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(70,153,39,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-hover"
          >
            <Mail size={17} aria-hidden="true" />
            Email Us
          </a>
        </div>
      </Reveal>
    </div>
  );
}

/* ───────────────────────── Team ───────────────────────── */

function Team() {
  const { team } = ABOUT;
  return (
    <section aria-labelledby="team-title" className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <RevealText
        as="h2"
        id="team-title"
        text={team.title}
        className="mx-auto max-w-3xl text-center font-playfair text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.015em] !text-ink"
      />
      {/* Two founders: a centred pair */}
      <ul className="mx-auto mt-14 grid max-w-[880px] gap-x-10 gap-y-14 sm:grid-cols-2">
        {team.members.map((member, i) => (
          <Reveal key={member.name} as="li" delay={i * 0.12}>
            <Portrait name={member.name} initials={member.initials} photo={member.photo} />
            <div className="mt-6 border-b border-ink/15 pb-5 text-center">
              <p className="font-montserrat text-[19px] font-semibold text-ink">{member.name}</p>
              <p className="mt-1.5 font-montserrat text-[14px] font-medium text-brand-green">{member.role}</p>
              <p className="mt-3 font-montserrat text-[13px] leading-snug text-ink/60">{member.education}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** Square portrait; until a photo is supplied it shows a designed paper placeholder. */
function Portrait({ name, initials, photo }: { name: string; initials: string; photo: string | null }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-[22px] border border-ink/10 bg-[#EFE8DA] shadow-[0_25px_50px_-30px_rgba(15,46,34,0.45)]">
      {photo ? (
        <Image
          src={photo}
          alt={`Portrait of ${name}`}
          fill
          sizes="(min-width: 640px) 420px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div role="img" aria-label={`Photo of ${name} coming soon`} className="bg-paper-texture absolute inset-0 flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/textures/wash-sage.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 w-3/4 opacity-50" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/textures/wash-peach.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 w-2/3 opacity-40" />
          <span aria-hidden="true" className="relative font-gambetta text-[clamp(4rem,9vw,6.5rem)] font-semibold leading-none text-ink/25">
            {initials}
          </span>
          <span aria-hidden="true" className="relative mt-4 inline-flex items-center gap-1.5 font-montserrat text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/40">
            <Leaf size={13} /> Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Closing ───────────────────────── */

function Closing() {
  const { closing } = ABOUT;
  return (
    <section aria-labelledby="closing-title" className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 lg:px-12 lg:pb-32">
      <div className="grid overflow-hidden rounded-[22px] border border-ink/15 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative min-h-[320px] overflow-hidden bg-brand-ink lg:min-h-[520px]">
          <PaintReveal src={closing.art} className="absolute inset-0" sizes="(min-width: 1024px) 40vw, 100vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/35 to-transparent" />
          <RevealText
            as="h2"
            id="closing-title"
            text={closing.title}
            className="absolute inset-x-7 bottom-7 font-playfair text-[clamp(2.1rem,3.6vw,3.4rem)] font-normal leading-[1.05] !text-white sm:inset-x-10 sm:bottom-10"
          />
        </div>
        <ul className="flex flex-col divide-y divide-ink/15">
          {closing.rows.map((row, i) => (
            <Reveal key={row.cta} as="li" delay={i * 0.1} className="flex flex-1 flex-col justify-center gap-5 p-7 sm:p-10">
              <p className="max-w-xl font-montserrat text-[16px] leading-relaxed text-ink/80">{row.text}</p>
              <a
                href={row.href}
                {...(row.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-12 max-w-md items-center justify-between rounded-full border border-ink/25 px-6 font-montserrat text-[14px] font-semibold text-ink transition-all duration-300 hover:border-brand-green hover:bg-brand-green hover:text-white"
              >
                {row.cta}
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
