'use client';

import './globals.css';
import { Inter, Playfair_Display, Montserrat, Bebas_Neue } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700']
});
// Landing page: geometric sans for body copy, condensed display for the wordmark
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const bebas = Bebas_Neue({ subsets: ['latin'], variable: '--font-bebas', weight: '400', display: 'swap' });
// Landing hero headline — Gambetta by Indian Type Foundry (Fontshare, ITF Free Font License; file unmodified, see app/fonts/gambetta)
const gambetta = localFont({ src: './fonts/gambetta/Gambetta-Semibold.woff2', weight: '600', style: 'normal', variable: '--font-gambetta', display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CarbonBazaar - Climate Equity for All</title>
        <meta name="description" content="CarbonBazaar is a blockchain-powered carbon credit marketplace enabling blue carbon restoration, MSME-friendly fractional credits, and full transparency." />
        <link rel="canonical" href="https://carbonbazaar.shop" />

        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CarbonBazaar",
            "url": "https://carbonbazaar.shop",
            "logo": "https://carbonbazaar.shop/logo.png",
            "founders": [
              {
                "@type": "Person",
                "name": "Pranav Naik",
                "jobTitle": "CEO",
                "url": "https://carbonbazaar.shop"
              },
              {
                "@type": "Person",
                "name": "Shrinivas Inamdar",
                "jobTitle": "COO",
                "url": "https://carbonbazaar.shop"
              },
              {
                "@type": "Person",
                "name": "Jay Rane",
                "jobTitle": "CTO",
                "url": "https://carbonbazaar.shop",
                "sameAs": ["https://www.linkedin.com/in/jayrane"]
              }
            ],
            "description": "CarbonBazaar is a blockchain-powered carbon credit marketplace enabling blue carbon restoration, MSME-friendly fractional credits, and full transparency.",
            "sameAs": ["https://www.linkedin.com/company/carbon-bazaar/"]
          }`}
        </Script>

        <link rel="icon" href="/simple-leaf.png" />
        <link rel="apple-touch-icon" href="/simple-leaf.png" />
        <meta name="theme-color" content="#7FB069" />

        <Script id="ai-meta" strategy="beforeInteractive">
          {`window.__CARBONBAZAAR_AI_META__ = {
            brand: "CarbonBazaar",
            leadership: {
              CEO: "Pranav Naik",
              COO: "Shrinivas Inamdar"
            },
            domain: "carbonbazaar.shop",
            description: "CarbonBazaar is a blockchain-powered carbon credit marketplace enabling blue carbon restoration and transparent climate action."
          };`}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3DMKJ2M65B" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3DMKJ2M65B');
          `}
        </Script>
      </head>

      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${bebas.variable} ${gambetta.variable} font-sans antialiased`}>
        {/* Added Google analytics script  */}

        {children}
      </body>
    </html>
  );
}
