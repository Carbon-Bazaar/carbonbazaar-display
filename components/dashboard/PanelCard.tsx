'use client';

import { ReactNode } from 'react';

interface PanelCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PanelCard({ title, subtitle, children }: PanelCardProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--sand)',
        borderRadius: 10,
        padding: '18px 20px',
      }}
    >
      <div style={{ marginBottom: subtitle ? 16 : 12 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: subtitle ? 2 : 0,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {subtitle}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
