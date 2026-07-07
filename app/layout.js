import './globals.css';
import { Bebas_Neue, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-charcoal-950 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
