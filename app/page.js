import HomeContent from '@/components/HomeContent';

export const metadata = {
  title: 'תם גיאת',
  description:
    'תם גיאת, יוצר קולנוע תיעודי ישראלי, במאי הסרט עין אחת פקוחה - חשבון נפש של חייל על אמונה, מחויבות וזהות בעקבות ה-7 באוקטובר.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'תם גיאת — יוצר קולנוע תיעודי',
    description:
      'תם גיאת, יוצר קולנוע תיעודי ישראלי, במאי הסרט עין אחת פקוחה - חשבון נפש של חייל על אמונה, מחויבות וזהות בעקבות ה-7 באוקטובר.',
    url: '/',
    siteName: 'Tom Giat',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
