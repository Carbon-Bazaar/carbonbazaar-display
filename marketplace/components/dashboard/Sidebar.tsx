'use client';

import { ReactNode, useState } from 'react';

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string | number;
}

interface UserBlock {
  initials: string;
  name: string;
  role: string;
  variant: 'buyer' | 'seller';
}

interface SidebarProps {
  user: UserBlock;
  sections: NavSection[];
  activeItem: string;
  onItemClick: (id: string) => void;
}

export default function Sidebar({ user, sections, activeItem, onItemClick }: SidebarProps) {
  const avatarBg = user.variant === 'buyer'
    ? 'rgba(149, 213, 178, 0.15)'
    : 'rgba(116, 166, 157, 0.15)';

  return (
    <aside
      style={{
        width: 220,
        minHeight: '100%',
        background: 'var(--warm-white)',
        borderRight: '1px solid var(--sand)',
        padding: '24px 0',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* User block */}
      <div style={{ padding: '0 16px 20px', borderBottom: '1px solid var(--sand)', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: avatarBg,
              border: '1px solid rgba(149, 213, 178, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--forest-light)',
              flexShrink: 0,
            }}
          >
            {user.initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
              {user.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {user.role}
            </div>
          </div>
        </div>
      </div>

      {/* Nav sections */}
      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: 4 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              padding: '8px 20px 4px',
            }}
          >
            {section.title}
          </div>
          {section.items.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: 'calc(100% - 16px)',
                  margin: '0 8px',
                  padding: '9px 12px',
                  borderRadius: 7,
                  fontSize: 13,
                  color: isActive ? 'var(--forest)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 500 : 400,
                  background: isActive ? 'rgba(27, 67, 50, 0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--sand)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      background: 'rgba(149, 213, 178, 0.2)',
                      color: 'var(--forest)',
                      borderRadius: 10,
                      padding: '1px 7px',
                      lineHeight: '16px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
