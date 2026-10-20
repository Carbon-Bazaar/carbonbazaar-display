import { cn } from '@/lib/utils';

/**
 * CarbonBazaar wordmark — "CARB(leaf)N BAZAAR" with the
 * "Transparency · Traceability · Trust" strapline, rebuilt in type + SVG so it
 * stays crisp at every size. Replace with the official vector when supplied.
 */
interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  /** "light" for use over dark imagery. */
  tone?: 'brand' | 'light';
  className?: string;
}

const TONES = {
  brand: { carbon: 'text-brand-green', bazaar: 'text-brand-blue', tagline: 'text-brand-ink', leafFill: '#EAF4E2', leafStroke: '#2F3A30' },
  light: { carbon: 'text-[#B5E39A]', bazaar: 'text-[#A9D3F2]', tagline: 'text-white/80', leafFill: 'rgba(255,255,255,0.15)', leafStroke: '#FFFFFF' },
} as const;

const SIZES = {
  sm: 'text-[26px]',
  md: 'text-[34px]',
  lg: 'text-[46px]',
} as const;

function LeafGlyph({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <svg
      viewBox="0 0 24 34"
      className="mx-[0.02em] inline-block h-[0.9em] w-[0.62em] translate-y-[0.06em] align-baseline"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 1.5C6.2 5.6 3.2 10.6 3.2 16.2c0 5.2 3.7 8.8 8.8 8.8s8.8-3.6 8.8-8.8C20.8 10.6 17.8 5.6 12 1.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.3"
      />
      <path d="M12 4.5V33" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M12 9.5 8.2 6.8M12 9.5l3.8-2.7M12 13.5 6.4 9.8M12 13.5l5.6-3.7M12 17.5 5.6 13.4M12 17.5l6.4-4.1M12 21.5l-5.4-3.6M12 21.5l5.4-3.6"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BrandLogo({ size = 'md', showTagline = true, tone = 'brand', className }: BrandLogoProps) {
  const t = TONES[tone];
  return (
    <span
      role="img"
      aria-label="Carbon Bazaar"
      className={cn('inline-flex flex-col items-center leading-none', SIZES[size], className)}
    >
      <span aria-hidden="true" className="whitespace-nowrap font-bebas tracking-[0.045em]">
        <span className={cn('transition-colors duration-500', t.carbon)}>CARB</span>
        <LeafGlyph fill={t.leafFill} stroke={t.leafStroke} />
        <span className={cn('transition-colors duration-500', t.carbon)}>N</span>{' '}
        <span className={cn('transition-colors duration-500', t.bazaar)}>BAZAAR</span>
      </span>
      {showTagline && (
        <span
          aria-hidden="true"
          className={cn('mt-[0.12em] whitespace-nowrap font-bebas text-[0.23em] tracking-[0.12em] transition-colors duration-500', t.tagline)}
        >
          Transparency Traceability Trust
        </span>
      )}
    </span>
  );
}
