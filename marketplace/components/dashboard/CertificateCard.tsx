'use client';

import { Download } from 'lucide-react';
import type { Certificate } from '@/lib/dashboardData';

interface CertificateCardProps {
  cert: Certificate;
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  return (
    <div
      style={{
        background: 'var(--warm-white)',
        border: '1px solid var(--sand)',
        borderRadius: 8,
        padding: 14,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
            {cert.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            Cert #{cert.id}
          </div>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'transparent',
            border: '1px solid var(--sage)',
            color: 'var(--forest)',
            borderRadius: 6,
            padding: '5px 10px',
            fontSize: 11,
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--warm-white)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <Download size={12} />
          Download PDF
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16 }}>
        {[
          { label: 'Retired', val: cert.qty },
          { label: 'Registry', val: cert.registry },
          { label: 'Co-benefit', val: cert.sdg },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 2 }}>
              {s.label}
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
