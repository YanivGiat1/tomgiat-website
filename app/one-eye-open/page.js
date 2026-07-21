import OneEyeOpenContent from '@/components/OneEyeOpenContent';

export const metadata = {
  title: 'עין אחת פקוחה',
  description:
    'חייל מילואים לכוד בין ויתור על העצמי למשבר הולך וגובר. סרט תיעודי מאת תם גיאת - זוכה פרס הביכורים דוקאביב 2026.',
  alternates: {
    canonical: '/one-eye-open/',
  },
  openGraph: {
    title: 'עין אחת פקוחה · Tom Giat',
    description:
      'חייל מילואים לכוד בין ויתור על העצמי למשבר הולך וגובר. סרט תיעודי מאת תם גיאת - זוכה פרס הביכורים דוקאביב 2026.',
    url: '/one-eye-open/',
    siteName: 'Tom Giat',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    type: 'website',
  },
};

// Structured data (schema.org Movie) so search engines can tie the
// exact title "עין אחת פקוחה" to this URL as a distinct film entity,
// separate from the generic page <title>/description above.
const movieJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'עין אחת פקוחה',
  alternateName: 'ONE EYE OPEN',
  url: 'https://www.tomgiat.com/one-eye-open/',
  image: 'https://www.tomgiat.com/images/poster.jpg',
  description:
    'חייל מילואים לכוד בין ויתור על העצמי למשבר הולך וגובר. סרט תיעודי מאת תם גיאת - זוכה פרס הביכורים דוקאביב 2026.',
  director: {
    '@type': 'Person',
    name: 'תם גיאת',
  },
  producer: {
    '@type': 'Person',
    name: 'אוהד מילשטיין',
  },
  duration: 'PT55M',
  genre: 'Documentary',
  countryOfOrigin: {
    '@type': 'Country',
    name: 'Israel',
  },
  inLanguage: 'he',
  datePublished: '2026',
  award: 'זוכה פרס הביכורים דוקאביב 2026',
};

export default function OneEyeOpenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieJsonLd) }}
      />
      <OneEyeOpenContent />
    </>
  );
}
