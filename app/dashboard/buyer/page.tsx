'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, ShoppingCart, Award, FileText, ShoppingBag,
  BarChart3, FileCheck, Leaf, TreePine, Trees, Sprout,
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import PanelCard from '@/components/dashboard/PanelCard';
import OrderRow from '@/components/dashboard/OrderRow';
import BarChart from '@/components/dashboard/BarChart';
import FractionalBanner from '@/components/dashboard/FractionalBanner';
import CertificateCard from '@/components/dashboard/CertificateCard';
import ImpactGrid from '@/components/dashboard/ImpactGrid';
import type { NavSection } from '@/components/dashboard/Sidebar';
import {
  buyerUser, buyerMetrics, buyerOrders, buyerCertificates,
  buyerImpact, buyerSpendBreakdown,
} from '@/lib/dashboardData';

const iconMap: Record<string, React.ReactNode> = {
  cashew:  <Leaf size={16} />,
  tree:    <TreePine size={16} />,
  forest:  <Trees size={16} />,
  leaf:    <Sprout size={16} />,
};

const buyerNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { id: 'overview',  label: 'Overview',   icon: <LayoutDashboard size={16} /> },
      { id: 'orders',    label: 'My orders',  icon: <ShoppingCart size={16} />, badge: 2 },
    ],
  },
  {
    title: 'Credits',
    items: [
      { id: 'retired',      label: 'Retired credits',   icon: <Award size={16} /> },
      { id: 'certificates', label: 'Certificates',      icon: <FileText size={16} /> },
      { id: 'buy-more',     label: 'Buy more credits (from ₹89)', icon: <ShoppingBag size={16} /> },
    ],
  },
  {
    title: 'Reports',
    items: [
      { id: 'impact-report', label: 'Impact report',    icon: <BarChart3 size={16} /> },
      { id: 'cbam-docs',     label: 'CBAM filing docs', icon: <FileCheck size={16} /> },
    ],
  },
];

function formatCurrency(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function BuyerDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const { user } = useAuth();

  // Use real logged-in user, fall back to mock
  const displayName = user?.name || buyerUser.name;
  const displayInitials = user?.initials || buyerUser.initials;
  const displayCompany = user?.companyName || buyerUser.location;
  const firstName = displayName.split(' ')[0];

  return (
    <DashboardLayout
      userName={displayName}
      userInitials={displayInitials}
      userLocation={displayCompany}
      userRole={user?.role || buyerUser.role}
      userVariant="buyer"
      navSections={buyerNav}
      activeItem={activeNav}
      onNavItemClick={setActiveNav}
    >
      {/* Page title */}
      <div style={{ marginBottom: 24 }}>
        <h1
          className="font-playfair"
          style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}
        >
          Good morning, {firstName}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Here&apos;s your carbon portfolio at a glance
        </p>
      </div>

      {/* ROW 1 — Metric cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 14,
          marginBottom: 20,
        }}
      >
        <MetricCard
          label="Total credits retired"
          value={`${buyerMetrics.totalRetired} tCO₂e`}
          subText="+120 this year"
          deltaType="positive"
        />
        <MetricCard
          label="Credits pending"
          value={`${buyerMetrics.creditsPending} tCO₂e`}
          subText="Awaiting issuance"
          deltaType="warning"
        />
        <MetricCard
          label="Total spent"
          value={formatCurrency(buyerMetrics.totalSpent)}
          subText="Across 6 projects"
        />
        <MetricCard
          label="Active projects"
          value={String(buyerMetrics.activeProjects)}
          subText="3 verified, 3 live"
          deltaType="positive"
        />
      </div>

      {/* Fractional banner */}
      <div style={{ marginBottom: 24 }}>
        <FractionalBanner
          title="Fractional credits available — start from ₹89"
          description="Buy 0.1 tCO₂e units from verified projects. Perfect for MSMEs offsetting smaller footprints."
          ctaLabel="Browse fractional"
        />
      </div>

      {/* ROW 2 — Two column */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 18,
          marginBottom: 24,
        }}
        className="lg:!grid-cols-[1.6fr_1fr]"
      >
        {/* Left — Recent orders */}
        <PanelCard title="Recent orders" subtitle="Your last 4 credit purchases">
          {buyerOrders.map((order, i) => (
            <OrderRow
              key={order.id}
              icon={iconMap[order.icon] || <Leaf size={16} />}
              name={order.project}
              meta={`${order.qty} tCO₂e · ${order.registry} · ${order.date}`}
              value={`₹${order.amount.toLocaleString('en-IN')}`}
              status={order.status}
              isLast={i === buyerOrders.length - 1}
            />
          ))}
        </PanelCard>

        {/* Right column stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Certificates */}
          <PanelCard title="Retirement certificates" subtitle="Download for CBAM filing">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
              {buyerCertificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Tip: You can retire fractional credits (0.1 tCO₂e) too.
            </div>
          </PanelCard>

          {/* Impact */}
          <PanelCard title="Impact summary" subtitle="What your credits represent">
            <ImpactGrid items={buyerImpact} />
          </PanelCard>
        </div>
      </div>

      {/* ROW 3 — Two column */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 18,
        }}
        className="lg:!grid-cols-[1.6fr_1fr]"
      >
        {/* Left — Spending breakdown */}
        <PanelCard title="Spending by project type" subtitle="Breakdown of ₹3.8L invested">
          <BarChart rows={buyerSpendBreakdown} />
        </PanelCard>

        {/* Right — Quick actions */}
        <PanelCard title="Quick actions" subtitle="What would you like to do?">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              style={{
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
              Browse marketplace
            </button>
            <button
              style={{
                background: 'transparent',
                border: '1px solid var(--sage)',
                color: 'var(--forest)',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--warm-white)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Download CBAM report
            </button>
            <button
              style={{
                background: 'transparent',
                border: '1px solid var(--sage)',
                color: 'var(--forest)',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--warm-white)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Request bulk quote
            </button>
          </div>
        </PanelCard>
      </div>
    </DashboardLayout>
  );
}
