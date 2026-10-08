'use client';

interface FractionalBannerProps {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
}

export default function FractionalBanner({ title, description, ctaLabel, onCtaClick }: FractionalBannerProps) {
  return (
    <div
      style={{
        background: 'rgba(82, 121, 111, 0.08)',
        border: '1px solid rgba(82, 121, 111, 0.25)',
        borderRadius: 10,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--forest)',
            marginBottom: 2,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
      <button
        onClick={onCtaClick}
        style={{
          background: 'transparent',
          border: '1px solid var(--sage)',
          color: 'var(--forest)',
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--warm-white)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
