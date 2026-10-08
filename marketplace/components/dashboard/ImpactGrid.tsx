'use client';

import type { ImpactItem } from '@/lib/dashboardData';

interface ImpactGridProps {
  items: ImpactItem[];
}

export default function ImpactGrid({ items }: ImpactGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: 'var(--warm-white)',
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--forest-light)',
              marginBottom: 4,
            }}
          >
            {item.value}
          </div>
          <div
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              fontWeight: 500,
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
