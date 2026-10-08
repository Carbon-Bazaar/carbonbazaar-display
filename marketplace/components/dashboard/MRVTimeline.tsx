'use client';

import { Check, Circle } from 'lucide-react';
import type { MRVStep } from '@/lib/dashboardData';

interface MRVTimelineProps {
  steps: MRVStep[];
}

export default function MRVTimeline({ steps }: MRVTimelineProps) {
  return (
    <div style={{ position: 'relative', paddingLeft: 24 }}>
      {/* Connector line */}
      <div
        style={{
          position: 'absolute',
          left: 9,
          top: 10,
          bottom: 10,
          width: 1,
          background: 'var(--sand)',
        }}
      />

      {steps.map((step, i) => {
        const isDone   = step.status === 'done';
        const isActive = step.status === 'active';

        // Dot colors
        const dotBorder = isDone ? 'var(--forest)' : isActive ? 'var(--amber)' : 'var(--sand)';
        const dotBg     = isDone ? 'rgba(27, 67, 50, 0.08)' : isActive ? 'rgba(133, 79, 11, 0.08)' : 'transparent';
        const dotColor  = isDone ? 'var(--forest)' : isActive ? 'var(--amber)' : 'var(--text-muted)';

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              marginBottom: i < steps.length - 1 ? 20 : 0,
              position: 'relative',
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: -24,
                top: 1,
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2px solid ${dotBorder}`,
                background: dotBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              {isDone ? (
                <Check size={10} style={{ color: dotColor }} strokeWidth={3} />
              ) : (
                <Circle
                  size={isActive ? 6 : 4}
                  style={{ color: dotColor, fill: isActive ? dotColor : 'transparent' }}
                />
              )}
            </div>

            {/* Content */}
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                }}
              >
                {step.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                {step.date}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
