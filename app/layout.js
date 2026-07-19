import './globals.css';
import { Playfair_Display, Inter, Heebo, Frank_Ruhl_Libre } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/i18n';

const displayEn = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-en',
  display: 'swap',
});

const bodyEn = Inter({
  subsets: ['latin'],
  variable: '--font-body-en',
  display: 'swap',
});

const displayHe = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['500', '700'],
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
    default: 'תם גיאת — יוצר קולנוע תיעודי',
    template: '%s · Tom Giat',
  },
  description:
    'תם גיאת, יוצר קולנוע תיעודי ישראלי, במאי הסרט עין אחת פקוחה - חשבון נפש של חייל על אמונה, מחויבות וזהות בעקבות ה-7 באוקטובר.',
  openGraph: {
    title: 'תם גיאת — יוצר קולנוע תיעודי',
    description:
      'תם גיאת, יוצר קולנוע תיעודי ישראלי, במאי הסרט עין אחת פקוחה - חשבון נפש של חייל על אמונה, מחויבות וזהות בעקבות ה-7 באוקטובר.',
    url: 'https://tomgiat.com',
    siteName: 'Tom Giat',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
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
      <body className="flex min-h-screen flex-col bg-cream-200 font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
