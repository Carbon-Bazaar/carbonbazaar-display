'use client';

interface BarChartRow {
  label: string;
  pct: number;
  value: string;
  color: string; // 'forest-light' | 'sage' | 'mint' | 'amber'
}

const colorMap: Record<string, string> = {
  'forest-light': 'var(--forest-light)',
  'sage':         'var(--sage)',
  'mint':         'var(--mint)',
  'amber':        'var(--amber)',
};

interface BarChartProps {
  rows: BarChartRow[];
}

export default function BarChart({ rows }: BarChartProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {rows.map((row) => (
        <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 80,
              textAlign: 'right',
              fontSize: 11,
              color: 'var(--text-muted)',
              flexShrink: 0,
              fontWeight: 500,
            }}
          >
            {row.label}
          </div>
          <div
            style={{
              flex: 1,
              height: 6,
              background: 'var(--sand)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${row.pct}%`,
                height: '100%',
                background: colorMap[row.color] || 'var(--forest-light)',
                borderRadius: 3,
                transition: 'width 0.6s ease',
              }}
            />
          </div>
          <div
            style={{
              width: 40,
              fontSize: 11,
              color: 'var(--text-secondary)',
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}
