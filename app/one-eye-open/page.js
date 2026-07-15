import OneEyeOpenContent from '@/components/OneEyeOpenContent';

export const metadata = {
  title: 'One Eye Open',
  description:
    "A state coming apart, seen through the moral doubt in a soldier's eyes. A documentary by Tom Giat.",
  alternates: {
    canonical: '/one-eye-open/',
  },
  openGraph: {
    title: 'One Eye Open · Tom Giat',
    description:
      "A state coming apart, seen through the moral doubt in a soldier's eyes. A documentary by Tom Giat.",
    url: '/one-eye-open/',
    siteName: 'Tom Giat',
    locale: 'en_US',
    type: 'website',
  },
};

export default function OneEyeOpenPage() {
  return <OneEyeOpenContent />;
}
