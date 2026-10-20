'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { cn } from '@/lib/utils';
import BrandLogo from './BrandLogo';
import { NAV_LINKS, SECTION_IDS } from './content';
import { EASE, useScrollToId } from './motion';

/**
 * Landing navigation: transparent on the paper at first, a frosted paper bar
 * once scrolled; slips away while reading down and returns on scroll-up.
 * Section links only, as on the current site.
 */
export default function LandingNav() {
  const scrollToId = useScrollToId();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > previous && !menuOpen);
  });

  // Scroll-spy for the active section dot.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveId(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    [SECTION_IDS.home, ...NAV_LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock page scroll behind the full-screen menu.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  // Over the hero video (top of page) the bar is transparent with light type.
  const light = !scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled && !menuOpen && 'bg-paper/80 shadow-[0_1px_0_rgba(31,42,36,0.08)] backdrop-blur-xl',
          light && 'bg-gradient-to-b from-black/35 to-transparent',
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-12">
          <button type="button" onClick={() => go(SECTION_IDS.home)} aria-label="Carbon Bazaar, back to top" className="shrink-0">
            <BrandLogo size="sm" tone={light ? 'light' : 'brand'} />
          </button>

          <nav aria-label="Sections" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                aria-current={activeId === link.id ? 'true' : undefined}
                className={cn(
                  'group relative py-2 font-montserrat text-[14px] font-medium transition-colors',
                  light ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-ink',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-green transition-all duration-500',
                    activeId === link.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                  )}
                />
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="landing-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={cn(
              'relative z-10 flex h-10 items-center gap-2 rounded-full border px-4 font-montserrat text-[13px] font-semibold backdrop-blur transition-colors lg:hidden',
              light ? 'border-white/40 bg-white/10 text-white' : 'border-ink/15 bg-paper/70 text-ink',
            )}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.header>

      {/* Full-screen menu (mobile / tablet) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="landing-menu"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="bg-paper-texture fixed inset-0 z-40 flex flex-col overflow-y-auto px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Sections" className="flex flex-col">
              {[{ label: 'Home', id: SECTION_IDS.home }, ...NAV_LINKS].map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                  className="flex items-baseline gap-4 border-b border-ink/10 py-4 text-left"
                >
                  <span className="font-montserrat text-xs font-semibold tabular-nums text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-playfair text-[34px] leading-none text-ink">{link.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
