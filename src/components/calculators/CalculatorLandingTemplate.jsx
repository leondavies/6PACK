import Link from 'next/link';
import { articles } from '../../data/products';
import CalculatorHero from './CalculatorHero';
import { CalculatorSEO, FAQPageSchema } from '../SEO';

// Shared layout for every calculator landing page. Renders the hero, intro,
// the interactive calculator widget (passed as children), educational sections,
// FAQ (+ schema), and related links. Keeps each calculator's [variant]/page.jsx
// thin and consistent.
//
// Props:
//   page           - the variant data object from calculatorLandingPages
//   calculatorName - parent calculator label (e.g. "BMR Calculator")
//   basePath       - parent calculator path (e.g. "/calculators/bmr")
//   children       - the interactive calculator widget element
export default function CalculatorLandingTemplate({ page, calculatorName, basePath, children }) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators/' },
    { name: calculatorName, url: `${basePath}/` },
    { name: page.h1, url: `${basePath}/${page.slug}/` },
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
          url: `${basePath}/${page.slug}/`,
          image: '/og-image.jpg',
        }}
        breadcrumbs={breadcrumbs}
      />
      <FAQPageSchema faqs={page.faqs} />

      <div className="min-h-screen bg-gray-50">
        <CalculatorHero eyebrow="Free calculator" title={page.h1} subtitle={page.heroSubtitle} />

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
        {children}

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
