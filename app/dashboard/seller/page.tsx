'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Map, Activity, Coins, CreditCard,
  PlusCircle, Leaf, TreePine, Sprout,
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import PanelCard from '@/components/dashboard/PanelCard';
import OrderRow from '@/components/dashboard/OrderRow';
import BarChart from '@/components/dashboard/BarChart';
import MRVTimeline from '@/components/dashboard/MRVTimeline';
import StatusBadge from '@/components/dashboard/StatusBadge';
import type { NavSection } from '@/components/dashboard/Sidebar';
import {
  sellerUser, sellerMetrics, sellerPlots, sellerEarningsBreakdown,
  sellerMRVSteps, sellerPayouts,
} from '@/lib/dashboardData';

const plotIcons: Record<string, React.ReactNode> = {
  A: <Leaf size={16} />,
  B: <TreePine size={16} />,
  C: <Sprout size={16} />,
};

const sellerNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
      { id: 'plots', label: 'My plots', icon: <Map size={16} />, badge: 3 },
    ],
  },
  {
    title: 'Projects',
    items: [
      { id: 'mrv', label: 'MRV status', icon: <Activity size={16} /> },
      { id: 'issuance', label: 'Credit issuance', icon: <Coins size={16} /> },
    ],
  },
  {
    title: 'Earnings',
    items: [
      { id: 'payouts', label: 'Payout history', icon: <CreditCard size={16} /> },
      { id: 'add-plot', label: 'Add new plot', icon: <PlusCircle size={16} /> },
    ],
  },
];

export default function SellerDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const { user } = useAuth();

  // Use real logged-in user, fall back to mock
  const displayName = user?.name || sellerUser.name;
  const displayInitials = user?.initials || sellerUser.initials;
  const displayLocation = user?.taluka ? `${user.taluka}, Goa` : sellerUser.location;
  const firstName = displayName.split(' ')[0];

  return (
    <DashboardLayout
      userName={displayName}
      userInitials={displayInitials}
      userLocation={displayLocation}
      userRole={user?.role || sellerUser.role}
      userVariant="seller"
      navSections={sellerNav}
      activeItem={activeNav}
      onNavItemClick={setActiveNav}
    >
      {/* Page title */}
      <div style={{ marginBottom: 24 }}>
        <h1
          className="font-playfair"
          style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}
        >
          Welcome, {firstName} — your land, your earnings
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Track your plots, MRV progress, and credit payouts
        </p>
      </div>

      {/* ROW 1 — Metric cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}
      >
        <MetricCard
          label="Total land registered"
          value={`${sellerMetrics.totalLand} ha`}
          subText="Across 3 plots"
        />
        <MetricCard
          label="Credits issued"
          value={`${sellerMetrics.creditsIssued} tCO₂e`}
          subText="This year · Includes fractional sales"
          deltaType="positive"
        />
        <MetricCard
          label="Total earnings"
          value={`₹${(sellerMetrics.totalEarnings / 100000).toFixed(1)}L`}
          subText="+₹42K this month"
          deltaType="positive"
        />
        <MetricCard
          label="Next payout"
          value={`₹${(sellerMetrics.nextPayout / 1000).toFixed(0)}K`}
          subText={`Est. ${sellerMetrics.nextPayoutDate}`}
          deltaType="warning"
        />
      </div>

      {/* ROW 2 — Two column (left 2/3, right 1/3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 18,
          marginBottom: 24,
        }}
        className="lg:!grid-cols-[2fr_1fr]"
      >
        {/* Left column stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* My plots */}
          <PanelCard title="My plots" subtitle="Registered land parcels">
            {sellerPlots.map((plot, i) => (
              <OrderRow
                key={plot.id}
                icon={
                  <div style={{
                    color: plot.badge === 'Under audit' ? 'var(--amber)' : 'var(--forest-light)',
                  }}>
                    {plotIcons[plot.id] || <Leaf size={16} />}
                  </div>
                }
                name={plot.name}
                meta={`${plot.ha} ha · ${plot.type} · Survey no. ${plot.survey}`}
                value={plot.status}
                status={plot.badge}
                isLast={i === sellerPlots.length - 1}
              />
            ))}
          </PanelCard>

          {/* Earnings breakdown */}
          <PanelCard title="Earnings breakdown" subtitle="Revenue per plot this year">
            <BarChart rows={sellerEarningsBreakdown} />
          </PanelCard>
        </div>

        {/* Right column stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* MRV progress */}
          <PanelCard title="MRV progress — Plot A" subtitle="Netravali cashew grove">
            <MRVTimeline steps={sellerMRVSteps} />
          </PanelCard>

          {/* Payout history */}
          <PanelCard title="Payout history" subtitle="Payments to your UPI account">
            {sellerPayouts.map((payout, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: i < sellerPayouts.length - 1 ? '1px solid var(--warm-white)' : 'none',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                    {payout.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {payout.meta}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: payout.status === 'Paid' ? 'var(--forest-light)' : 'var(--text-primary)',
                      marginBottom: 3,
                    }}
                  >
                    {payout.amount}
                  </div>
                  <StatusBadge status={payout.status} />
                </div>
              </div>
            ))}

            {/* Add new plot button */}
            <div style={{ marginTop: 14 }}>
              <button
                style={{
                  width: '100%',
                  background: 'var(--forest)',
                  color: 'var(--cream)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 20px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--forest-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--forest)')}
              >
                Add new plot
              </button>
            </div>
          </PanelCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
