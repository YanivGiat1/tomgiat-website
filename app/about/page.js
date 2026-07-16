import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'אודות',
  description: 'תם גיאת הוא יוצר קולנוע תיעודי ישראלי, במאי הסרט עין אחת פקוחה.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'אודות · Tom Giat',
    description: 'תם גיאת הוא יוצר קולנוע תיעודי ישראלי, במאי הסרט עין אחת פקוחה.',
    url: '/about/',
    siteName: 'Tom Giat',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
