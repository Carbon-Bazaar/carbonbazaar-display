'use client';

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  'Retired':     { bg: 'rgba(149, 213, 178, 0.2)', color: 'var(--forest)',       border: '1px solid var(--mint)' },
  'Verified':    { bg: 'rgba(149, 213, 178, 0.2)', color: 'var(--forest)',       border: '1px solid var(--mint)' },
  'Paid':        { bg: 'rgba(149, 213, 178, 0.2)', color: 'var(--forest)',       border: '1px solid var(--mint)' },
  'Active':      { bg: 'rgba(45, 106, 79, 0.1)',   color: 'var(--forest-light)', border: '1px solid rgba(45, 106, 79, 0.3)' },
  'In project':  { bg: 'rgba(45, 106, 79, 0.1)',   color: 'var(--forest-light)', border: '1px solid rgba(45, 106, 79, 0.3)' },
  'Live':        { bg: 'rgba(45, 106, 79, 0.1)',   color: 'var(--forest-light)', border: '1px solid rgba(45, 106, 79, 0.3)' },
  'Processing':  { bg: 'var(--amber-bg)',           color: '#633806',             border: '1px solid var(--amber-border)' },
  'Pending MRV': { bg: 'var(--amber-bg)',           color: '#633806',             border: '1px solid var(--amber-border)' },
  'Pending':     { bg: 'var(--amber-bg)',           color: '#633806',             border: '1px solid var(--amber-border)' },
  'MRV pending': { bg: 'var(--amber-bg)',           color: '#633806',             border: '1px solid var(--amber-border)' },
  'Under audit': { bg: 'var(--amber-bg)',           color: '#633806',             border: '1px solid var(--amber-border)' },
  'Upcoming':    { bg: 'var(--amber-bg)',           color: '#633806',             border: '1px solid var(--amber-border)' },
};

const defaultStyle = { bg: 'var(--warm-white)', color: 'var(--text-muted)', border: '1px solid var(--sand)' };

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = statusStyles[status] || defaultStyle;

  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: s.border,
        borderRadius: 5,
        padding: '2px 8px',
        fontSize: 10,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        lineHeight: '16px',
      }}
    >
      {status}
    </span>
  );
}
