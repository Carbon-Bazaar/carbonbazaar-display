'use client';

import { ReactNode } from 'react';
import StatusBadge from './StatusBadge';

interface OrderRowProps {
  icon: ReactNode;
  name: string;
  meta: string;
  value: string;
  status: string;
  isLast?: boolean;
}

export default function OrderRow({ icon, name, meta, value, status, isLast = false }: OrderRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--warm-white)',
      }}
    >
      {/* Icon block */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: 'rgba(149, 213, 178, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--forest-light)',
        }}
      >
        {icon}
      </div>

      {/* Info block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
          {meta}
        </div>
      </div>

      {/* Right block */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>
          {value}
        </div>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
