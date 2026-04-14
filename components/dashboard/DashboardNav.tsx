'use client';

import { Leaf, MapPin } from 'lucide-react';
import Link from 'next/link';

interface DashboardNavProps {
  pageLabel: string;
  userName: string;
  userInitials: string;
  userLocation: string;
}

export default function DashboardNav({ pageLabel, userName, userInitials, userLocation }: DashboardNavProps) {
  return (
    <nav
      style={{
        background: 'var(--forest-darkest)',
        height: 56,
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'rgba(149, 213, 178, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Leaf size={16} style={{ color: 'var(--mint)' }} />
        </div>
        <span
          className="font-playfair"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--mint)',
          }}
        >
          CarbonBazaar
        </span>
      </Link>

      {/* Center — page label */}
      <div
        style={{
          fontSize: 12,
          color: 'rgba(250, 253, 247, 0.55)',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {pageLabel}
      </div>

      {/* Right — location + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 12,
            color: 'rgba(250, 253, 247, 0.55)',
          }}
        >
          <MapPin size={12} />
          {userLocation}
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(149, 213, 178, 0.15)',
            border: '1px solid rgba(149, 213, 178, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--mint)',
          }}
          title={userName}
        >
          {userInitials}
        </div>
      </div>
    </nav>
  );
}
