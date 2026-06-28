import Link from 'next/link';
import { notFound } from 'next/navigation';
import { calculatorLandingPages, getLandingPage } from '../../../../data/calculatorLandingPages';
import { articles } from '../../../../data/products';
import BmrCalculator from '../../../../components/calculators/BmrCalculator';
import CalculatorHero from '../../../../components/calculators/CalculatorHero';
import { CalculatorSEO, FAQPageSchema } from '../../../../components/SEO';

const CALCULATOR = 'bmr';
const BASE_PATH = `/calculators/${CALCULATOR}`;
const SITE = 'https://www.6pack.co.nz';

export function generateStaticParams() {
  return (calculatorLandingPages[CALCULATOR] || []).map((v) => ({ variant: v.slug }));
}

export function generateMetadata({ params }) {
  const page = getLandingPage(CALCULATOR, params.variant);
  if (!page) return { title: 'Calculator Not Found | 6Pack NZ' };

  const url = `${SITE}${BASE_PATH}/${page.slug}/`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords?.join(', '),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
    },
    alternates: { canonical: url },
  };
}

export default function CalculatorLandingPage({ params }) {
  const page = getLandingPage(CALCULATOR, params.variant);
  if (!page) return notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators/' },
    { name: 'BMR Calculator', url: `${BASE_PATH}/` },
    { name: page.h1, url: `${BASE_PATH}/${page.slug}/` },
  ];

  const relatedArticles = (page.relatedArticles || [])
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean);

  return (
    <>
      <CalculatorSEO
        calculator={{
          name: page.h1,
          description: page.metaDescription,
          url: `${BASE_PATH}/${page.slug}/`,
          image: '/og-image.jpg',
        }}
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema faqs={page.faqs} />

      <div className="min-h-screen bg-gray-50">
        <CalculatorHero
          eyebrow="Free calculator"
          title={page.h1}
          subtitle={page.heroSubtitle}
        />

        {/* Intro */}
        {page.intro?.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <div className="prose prose-lg prose-gray max-w-none">
              {page.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Interactive calculator widget */}
        <BmrCalculator prefill={page.prefill} />

        {/* Educational sections */}
        {page.sections?.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="space-y-8">
              {page.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {page.faqs?.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {page.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related links */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {page.relatedCalculators?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related calculators</h2>
                <ul className="space-y-2">
                  {page.relatedCalculators.map((calc) => (
                    <li key={calc}>
                      <Link
                        href={`/calculators/${calc}/`}
                        className="text-primary-600 hover:text-primary-700 hover:underline capitalize"
                      >
                        {calc.replace('-', ' ')} calculator
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related reading</h2>
                <ul className="space-y-2">
                  {relatedArticles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/articles/${article.slug}/`}
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
