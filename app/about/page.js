import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About',
  description:
    'Tom Giat is an Israeli documentary filmmaker and director of One Eye Open.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About · Tom Giat',
    description: 'Tom Giat is an Israeli documentary filmmaker and director of One Eye Open.',
    url: '/about/',
    siteName: 'Tom Giat',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
