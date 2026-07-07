import './globals.css';
import { Bebas_Neue, Inter, Heebo } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/i18n';

const displayEn = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display-en',
  display: 'swap',
});

const bodyEn = Inter({
  subsets: ['latin'],
  variable: '--font-body-en',
  display: 'swap',
});

const displayHe = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['700', '900'],
  variable: '--font-display-he',
  display: 'swap',
});

const bodyHe = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body-he',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://tomgiat.com'),
  title: {
    default: 'Tom Giat — Documentary Filmmaker',
    template: '%s · Tom Giat',
  },
  description:
    "Israeli documentary filmmaker Tom Giat, director of One Eye Open — a soldier's inner reckoning with faith, duty, and identity after October 7th.",
  openGraph: {
    title: 'Tom Giat — Documentary Filmmaker',
    description:
      "Director of One Eye Open — a soldier's inner reckoning with faith, duty, and identity after October 7th.",
    url: 'https://tomgiat.com',
    siteName: 'Tom Giat',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${displayEn.variable} ${bodyEn.variable} ${displayHe.variable} ${bodyHe.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-charcoal-950 font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
