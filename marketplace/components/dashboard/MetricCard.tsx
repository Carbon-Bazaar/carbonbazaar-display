'use client';

interface MetricCardProps {
  label: string;
  value: string;
  subText: string;
  deltaType?: 'positive' | 'warning' | 'neutral';
}

export default function MetricCard({ label, value, subText, deltaType = 'neutral' }: MetricCardProps) {
  const deltaColor =
    deltaType === 'positive' ? 'var(--forest-light)' :
    deltaType === 'warning'  ? 'var(--amber)' :
    'var(--text-secondary)';

  return (
    <div
      style={{
        background: 'var(--warm-white)',
        border: '1px solid var(--sand)',
        borderRadius: 10,
        padding: '16px 20px',
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: deltaColor, fontWeight: 500 }}>
        {subText}
      </div>
    </div>
  );
}
