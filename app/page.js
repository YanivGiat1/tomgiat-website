import HomeContent from '@/components/HomeContent';

export const metadata = {
  title: 'Home',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tom Giat — Documentary Filmmaker',
    description:
      "Israeli documentary filmmaker Tom Giat, director of One Eye Open — a soldier's inner reckoning with faith, duty, and identity after October 7th.",
    url: '/',
    siteName: 'Tom Giat',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
