'use client';

import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { animate, motion, MotionConfig, useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/** Signature easing — a long, soft deceleration (expo-out family). */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Height of the fixed landing nav; anchor scrolls stop just below it. */
const NAV_OFFSET = -72;

/* ───────────────────────── Smooth scroll ───────────────────────── */

type ScrollToId = (id: string) => void;
const ScrollToContext = createContext<ScrollToId>(() => {});

/**
 * Smooth-scrolls to an element id (Lenis when available, native otherwise).
 * From another page (e.g. /about) it navigates home and lands on that section.
 */
export function useScrollToId() {
  return useContext(ScrollToContext);
}

/**
 * Lenis momentum scrolling for the landing page + a shared MotionConfig that
 * honours the visitor's reduced-motion preference everywhere below it.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  const scrollToId = useCallback<ScrollToId>(
    (id) => {
      const el = document.getElementById(id);
      if (!el) {
        router.push(id === 'home' ? '/' : `/#${id}`, { scroll: false });
        return;
      }
      const offset = id === 'home' ? 0 : NAV_OFFSET;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset, duration: 1.6 });
      } else {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    },
    [reduceMotion, router],
  );

  // Arriving with a hash (e.g. "/#impact" from the About page): land below the fixed header.
  // Sections above can still grow after mount (the pinned journey measures its track), so keep
  // re-aiming while the page settles, and stop the moment the visitor scrolls themselves.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const land = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = id === 'home' ? 0 : NAV_OFFSET;
      if (lenisRef.current) {
        lenisRef.current.resize(); // Lenis caches the scroll limit; the page may just have grown
        lenisRef.current.scrollTo(el, { offset, immediate: true, force: true });
      }
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
    };
    const resize = new ResizeObserver(land);
    const stop = () => {
      resize.disconnect();
      clearTimeout(timer);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
    const timer = setTimeout(stop, 2500);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    resize.observe(document.body);
    land();
    return stop;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToContext.Provider value={scrollToId}>{children}</ScrollToContext.Provider>
    </MotionConfig>
  );
}

/* ───────────────────────── Reveals ───────────────────────── */

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

interface RevealTextProps {
  text: string;
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

const wordVariants = {
  hidden: { y: '130%' },
  visible: (i: number) => ({ y: '0%', transition: { duration: 1, ease: EASE, delay: i } }),
};

/**
 * Editorial headline reveal: each word rises out of its own clipping mask.
 * Visibility is observed on the whole line — a word translated inside an
 * overflow-hidden mask never reports as intersecting on its own.
 */
export function RevealText({ text, id, as = 'h2', className, delay = 0, stagger = 0.055, immediate }: RevealTextProps) {
  const MotionTag = motion[as];
  const words = text.split(' ');
  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT })}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden="true" className="-my-[0.18em] inline-block overflow-hidden py-[0.18em] align-bottom">
            <motion.span className="inline-block will-change-transform" variants={wordVariants} custom={delay + i * stagger}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </MotionTag>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'p' | 'section';
}

/** Soft fade-and-rise for blocks of content. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

interface PaintRevealProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
}

// The brush mask is 3× wider than the art; sliding it from 100% → 0% drags the
// ragged dry-brush edge across. Position is driven through a CSS variable.
const BRUSH_MASK = {
  WebkitMaskImage: 'url(/textures/brush-wipe-mask.webp)',
  maskImage: 'url(/textures/brush-wipe-mask.webp)',
  WebkitMaskSize: '300% 100%',
  maskSize: '300% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'var(--brush-x) 0%',
  maskPosition: 'var(--brush-x) 0%',
} as const;

/**
 * Watercolour art "painted" onto the page: a dry-brush mask sweeps left → right
 * while the image settles from a slight zoom.
 */
export function PaintReveal({ src, alt = '', className, sizes = '(min-width: 1024px) 55vw, 100vw', priority, delay = 0 }: PaintRevealProps) {
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      style={BRUSH_MASK}
      initial={{ '--brush-x': '100%' }}
      whileInView={{ '--brush-x': '0%' }}
      viewport={VIEWPORT}
      transition={{ duration: 1.8, ease: EASE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 2.4, ease: EASE, delay }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Counter ───────────────────────── */

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const formatCount = (n: number) => Math.round(n).toLocaleString('en-IN');

/** Counts up from zero the first time it scrolls into view (final value is server-rendered). */
export function Counter({ value, prefix = '', suffix = '', duration = 2.2, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node || reduceMotion || value === 0) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${formatCount(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {formatCount(value)}
      {suffix}
    </span>
  );
}
