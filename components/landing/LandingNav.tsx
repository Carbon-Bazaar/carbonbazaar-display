'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { cn } from '@/lib/utils';
import BrandLogo from './BrandLogo';
import { ABOUT_LINK, NAV_LINKS, SECTION_IDS } from './content';
import { EASE, useScrollToId } from './motion';

/** Section links (scroll on the home page) with the About page slotted in before Contact. */
const ITEMS = [...NAV_LINKS.slice(0, -1), ABOUT_LINK, ...NAV_LINKS.slice(-1)];
type Item = (typeof ITEMS)[number] | { label: string; id: string };

const itemKey = (item: Item) => ('href' in item ? item.href : item.id);

/**
 * Landing navigation: transparent over the hero at first, a frosted paper bar
 * once scrolled; it stays pinned to the top while scrolling.
 */
export default function LandingNav() {
  const scrollToId = useScrollToId();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Scroll-spy for the active section dot (home page only; other pages have none of these ids).
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

  const isActive = (item: Item) => ('href' in item ? pathname?.startsWith(item.href) ?? false : activeId === item.id);

  // Over the hero (top of page) the bar is transparent with light type.
  const light = !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          scrolled && !menuOpen && 'bg-paper/80 shadow-[0_1px_0_rgba(31,42,36,0.08)] backdrop-blur-xl',
          light && 'bg-gradient-to-b from-black/35 to-transparent',
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-12">
          <button type="button" onClick={() => go(SECTION_IDS.home)} aria-label="Carbon Bazaar, home" className="shrink-0">
            <BrandLogo size="sm" tone={light ? 'light' : 'brand'} />
          </button>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {ITEMS.map((item) => {
              const active = isActive(item);
              const className = cn(
                'group relative py-2 font-montserrat text-[14px] font-medium transition-colors',
                light ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-ink',
              );
              const dot = (
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-green transition-all duration-500',
                    active ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                  )}
                />
              );
              return 'href' in item ? (
                <Link key={itemKey(item)} href={item.href} aria-current={active ? 'page' : undefined} className={className}>
                  {item.label}
                  {dot}
                </Link>
              ) : (
                <button key={itemKey(item)} type="button" onClick={() => go(item.id)} aria-current={active ? 'true' : undefined} className={className}>
                  {item.label}
                  {dot}
                </button>
              );
            })}
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
      </header>

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
            <nav aria-label="Main" className="flex flex-col">
              {([{ label: 'Home', id: SECTION_IDS.home }, ...ITEMS] as Item[]).map((item, i) => (
                <motion.div
                  key={itemKey(item)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                  className="border-b border-ink/10"
                >
                  {'href' in item ? (
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className="block w-full">
                      <MenuRow index={i} label={item.label} />
                    </Link>
                  ) : (
                    <button type="button" onClick={() => go(item.id)} className="block w-full">
                      <MenuRow index={i} label={item.label} />
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuRow({ index, label }: { index: number; label: ReactNode }) {
  return (
    <span className="flex items-baseline gap-4 py-4 text-left">
      <span className="font-montserrat text-xs font-semibold tabular-nums text-ink/40">{String(index + 1).padStart(2, '0')}</span>
      <span className="font-playfair text-[34px] leading-none text-ink">{label}</span>
    </span>
  );
}
