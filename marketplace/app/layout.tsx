import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { BASE_PATH } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700']
});

export const metadata = {
  title: 'CarbonBazaar Marketplace - Verified Carbon Credits from Goa',
  description: 'Browse and buy full or fractional verified carbon credits from agroforestry, mangrove and cashew-grove projects in Goa.',
  icons: {
    icon: `${BASE_PATH}/simple-leaf.png`,
    apple: `${BASE_PATH}/simple-leaf.png`,
  },
  themeColor: '#7FB069',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
