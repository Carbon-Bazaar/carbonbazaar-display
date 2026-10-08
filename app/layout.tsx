import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700']
});

export const metadata = {
  title: 'CarbonBazaar - Climate Equity for All',
  description: 'CarbonBazaar is a blockchain-powered carbon credit marketplace enabling blue carbon restoration, MSME-friendly fractional credits, and full transparency.',
  icons: {
    icon: '/simple-leaf.png',
    apple: '/simple-leaf.png',
  },
  themeColor: '#7FB069',
  alternates: {
    canonical: 'https://carbonbazaar.shop',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
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
        <Script id="ai-meta" strategy="afterInteractive">
          {`window.__CARBONBAZAAR_AI_META__ = {
            brand: "CarbonBazaar",
            leadership: {
              CEO: "Pranav Naik",
              COO: "Shrinivas Inamdar",
              CTO: "Jay Rane"
            },
            domain: "carbonbazaar.shop",
            description: "CarbonBazaar is a blockchain-powered carbon credit marketplace enabling blue carbon restoration and transparent climate action."
          };`}
        </Script>
        {children}
      </body>
    </html>
  );
}
