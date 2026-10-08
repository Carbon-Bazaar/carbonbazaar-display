# CarbonBazaar Marketplace

The CarbonBazaar carbon-credit marketplace is a standalone Next.js 13 (App Router) app. It is separate from the main
CarbonBazaar website and is served on the website at **`/marketplace`**.

## Features

- **Project listing** (`app/page.tsx`): carbon-credit projects from Goa (cashew groves, agroforestry, mangroves),
  with search by name, taluka, or registry; filter chips (Cashew, Agroforestry, Mangrove, Fractional, Verra,
  Plan Vivo, CBAM ready); sorting by price or credits; a featured project card; and an empty state.
- **Project cards**: hectares, credits, landowner count, price per tCO₂e, fractional pricing, verification status
  (verified / live / pending), wishlist, and buy buttons. Wishlist and buy actions ask the user to sign in first.
- **Sign in / Register** (`components/marketplace/AuthModal.tsx`): a role-based sign-up with two roles.
  - **Buyer** (company): company name, GSTIN, industry sector, and compliance intent.
  - **Seller** (landowner): mobile, taluka, land area, land/vegetation type, survey/RTC number, UPI ID, and Aadhaar.
  - The form validates every field and shows a password-strength meter. After sign-in or sign-up, the user goes to
    the dashboard for their role.
- **Buyer dashboard** (`/dashboard/buyer`): metrics, orders, a spend breakdown chart, fractional-credit banner,
  retirement certificates, and an impact grid.
- **Seller dashboard** (`/dashboard/seller`): metrics, registered plots, earnings per plot, an MRV (measurement,
  reporting and verification) progress timeline, and payout history.
- **Shared layout**: a sticky nav with a user dropdown (dashboard, orders, sign out), a sidebar on the dashboards,
  a mobile menu, toasts, and a footer.

> This is a frontend prototype. Accounts and sessions are stored in the browser's `localStorage`
> (`contexts/AuthContext.tsx`), and the project and dashboard data are mock data (`lib/projects.ts`,
> `lib/dashboardData.ts`). There is no backend or payment integration yet.

## Run it

```bash
cd marketplace
npm install
npm run dev        # http://localhost:3001/marketplace
```

The marketplace's nav links (Home, Mission, ...) point to the main website, which runs on `http://localhost:3000`
in development (`.env.development`). From the repo root, run `npm run dev` to start the website.

## Build and deploy

```bash
npm run build      # static export to marketplace/out
```

From the repo root, `npm run build:all` builds the website and the marketplace, then copies the marketplace into
`out/marketplace`. Upload `out/` to the host and both parts are live:

- `carbonbazaar.shop/` is the website.
- `carbonbazaar.shop/marketplace` is the marketplace.

To host the marketplace on its own domain instead, build it with `MARKETPLACE_BASE_PATH=""` and set
`NEXT_PUBLIC_WEBSITE_URL` to the website's URL.

## Structure

```
app/
  page.tsx                  marketplace listing
  dashboard/buyer/page.tsx  buyer dashboard
  dashboard/seller/page.tsx seller dashboard
components/marketplace/     nav, auth modal, project cards
components/dashboard/       dashboard layout, sidebar, charts, cards, MRV timeline
contexts/AuthContext.tsx    local auth (sign up / sign in / sign out)
lib/projects.ts             project listing data
lib/dashboardData.ts        dashboard mock data
lib/site.ts                 links back to the main website
```
