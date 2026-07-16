import OneEyeOpenContent from '@/components/OneEyeOpenContent';

export const metadata = {
  title: 'עין אחת פקוחה',
  description:
    'מדינה שמתפוררת, כפי שנראית דרך הספק המוסרי בעיניו של חייל. סרט תיעודי מאת תם גיאת - זוכה פרס וייל-בלוך 2026.',
  alternates: {
    canonical: '/one-eye-open/',
  },
  openGraph: {
    title: 'עין אחת פקוחה · Tom Giat',
    description:
      'מדינה שמתפוררת, כפי שנראית דרך הספק המוסרי בעיניו של חייל. סרט תיעודי מאת תם גיאת - זוכה פרס וייל-בלוך 2026.',
    url: '/one-eye-open/',
    siteName: 'Tom Giat',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    type: 'website',
  },
};

export default function OneEyeOpenPage() {
  return <OneEyeOpenContent />;
}
