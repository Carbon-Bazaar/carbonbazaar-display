// ── Mock data for Buyer & Seller dashboards ──

export interface Order {
  id: number;
  project: string;
  qty: number;
  registry: string;
  date: string;
  amount: number;
  status: 'Retired' | 'Processing' | 'Pending MRV';
  icon: string;
}

export interface Certificate {
  name: string;
  id: string;
  qty: string;
  registry: string;
  sdg: string;
}

export interface SpendBreakdown {
  label: string;
  pct: number;
  value: string;
  color: 'forest-light' | 'sage' | 'mint';
}

export interface ImpactItem {
  value: string;
  label: string;
}

export interface Plot {
  id: string;
  name: string;
  ha: number;
  type: string;
  survey: string;
  status: string;
  badge: string;
}

export interface EarningsBreakdown {
  label: string;
  pct: number;
  value: string;
  color: 'forest-light' | 'amber';
}

export interface MRVStep {
  name: string;
  date: string;
  status: 'done' | 'active' | 'pending';
}

export interface Payout {
  label: string;
  meta: string;
  amount: string;
  status: 'Paid' | 'Upcoming';
}

// ────────────────────────────────────────
// BUYER DATA — Arjun Rao
// ────────────────────────────────────────

export const buyerUser = {
  name: 'Arjun Rao',
  initials: 'AR',
  role: 'MSME Buyer',
  location: 'Mumbai',
};

export const buyerMetrics = {
  totalRetired: 340,
  creditsPending: 80,
  totalSpent: 380000,
  activeProjects: 6,
};

export const buyerOrders: Order[] = [
  { id: 1, project: 'Netravali cashew grove',    qty: 50, registry: 'Verra VCS',      date: '12 Jan 2025', amount: 60000,  status: 'Retired',     icon: 'cashew' },
  { id: 2, project: 'Quepem agroforestry block', qty: 30, registry: 'Plan Vivo',      date: '5 Feb 2025',  amount: 29400,  status: 'Retired',     icon: 'tree' },
  { id: 3, project: 'Ponda mixed forest block',  qty: 80, registry: 'Gold Standard',  date: '1 Mar 2025',  amount: 84000,  status: 'Processing',  icon: 'forest' },
  { id: 4, project: 'Canacona coastal cashew',   qty: 40, registry: 'Verra VCS',      date: '18 Mar 2025', amount: 48000,  status: 'Pending MRV', icon: 'leaf' },
];

export const buyerCertificates: Certificate[] = [
  { name: 'Netravali grove · 2025', id: 'VCS-GOA-2025-0041', qty: '50 tCO₂e', registry: 'Verra',     sdg: 'SDG 13' },
  { name: 'Quepem block · 2025',    id: 'PV-GOA-2025-0018',  qty: '30 tCO₂e', registry: 'Plan Vivo', sdg: 'SDG 15' },
];

export const buyerImpact: ImpactItem[] = [
  { value: '340',  label: 'tCO₂e offset' },
  { value: '29',   label: 'Landowners supported' },
  { value: '375',  label: 'ha Land protected' },
  { value: '3',    label: 'SDGs aligned' },
];

export const buyerSpendBreakdown: SpendBreakdown[] = [
  { label: 'Cashew',       pct: 62, value: '₹2.3L', color: 'forest-light' },
  { label: 'Agroforestry', pct: 32, value: '₹1.2L', color: 'sage' },
  { label: 'Forest',       pct: 8,  value: '₹0.3L', color: 'mint' },
];

// ────────────────────────────────────────
// SELLER DATA — Suresh Naik
// ────────────────────────────────────────

export const sellerUser = {
  name: 'Suresh Naik',
  initials: 'SN',
  role: 'Landowner',
  location: 'Sanguem, Goa',
};

export const sellerMetrics = {
  totalLand: 47,
  creditsIssued: 188,
  totalEarnings: 160000,
  nextPayout: 28000,
  nextPayoutDate: 'Apr 20',
};

export const sellerPlots: Plot[] = [
  { id: 'A', name: 'Netravali plot — Plot A',  ha: 18, type: 'Cashew plantation',   survey: '124/A', status: 'Active',      badge: 'In project' },
  { id: 'B', name: 'Netravali plot — Plot B',  ha: 14, type: 'Cashew + forest mix', survey: '131/B', status: 'Active',      badge: 'In project' },
  { id: 'C', name: 'Quepem farmland — Plot C', ha: 15, type: 'Agroforestry',        survey: '88/C',  status: 'MRV pending', badge: 'Under audit' },
];

export const sellerEarningsBreakdown: EarningsBreakdown[] = [
  { label: 'Plot A', pct: 68, value: '₹88K', color: 'forest-light' },
  { label: 'Plot B', pct: 48, value: '₹62K', color: 'forest-light' },
  { label: 'Plot C', pct: 8,  value: '₹12K', color: 'amber' },
];

export const sellerMRVSteps: MRVStep[] = [
  { name: 'Plot registered',          date: 'Completed · Oct 2024',        status: 'done' },
  { name: 'Baseline survey done',     date: 'Completed · Nov 2024',        status: 'done' },
  { name: 'Biomass measurement',      date: 'Completed · Jan 2025',        status: 'done' },
  { name: 'Third-party audit',        date: 'In progress · Est. Apr 2025', status: 'active' },
  { name: 'Credits issued on Verra',  date: 'Pending audit completion',    status: 'pending' },
  { name: 'Payout released',          date: 'Pending issuance',            status: 'pending' },
];

export const sellerPayouts: Payout[] = [
  { label: 'Plot A — Q4 2024', meta: '80 tCO₂e sold · Dec 2024',  amount: '+₹62,000', status: 'Paid' },
  { label: 'Plot B — Q4 2024', meta: '55 tCO₂e sold · Dec 2024',  amount: '+₹42,000', status: 'Paid' },
  { label: 'Plot A — Q1 2025', meta: '53 tCO₂e · Apr 20 est.',    amount: ' ₹28,000', status: 'Upcoming' },
];
