// For Next.js 14 App Router, we'll use the built-in metadata API instead of Helmet
// This component now generates structured data that can be included in pages

import { 
  generateStructuredData, 
  optimizeImageForSocial 
} from '../utils/seo-enhanced';

export default function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
  canonical,
  structuredData,
  breadcrumbs,
  children
}) {
  // Generate structured data
  const jsonLdData = generateStructuredData({
    type: structuredData?.type,
    data: structuredData?.data,
    breadcrumbs,
    organization: true
  });

  // Add custom structured data if provided
  if (structuredData?.additional) {
    jsonLdData.push(...structuredData.additional);
  }

  return (
    <>
      {/* Structured Data */}
      {jsonLdData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 2)
          }}
        />
      ))}

      {/* Additional custom content */}
      {children}
    </>
  );
}

// Simplified specialized SEO components that just generate structured data

export function ArticleSEO({
  article,
  content,
  breadcrumbs,
  children
}) {
  const readingTime = content ? Math.ceil(content.split(' ').length / 200) : 5;
  
  return (
    <SEO
      structuredData={{
        type: 'Article',
        data: {
          headline: article.title,
          description: article.description,
          image: optimizeImageForSocial(article.image),
          url: `https://www.6pack.co.nz/articles/${article.slug}`,
          datePublished: article.publishDate,
          dateModified: article.updatedDate || article.publishDate,
          author: {
            '@type': 'Person',
            name: article.author || '6Pack NZ Team',
            url: 'https://www.6pack.co.nz'
          },
          publisher: {
            '@type': 'Organization',
            name: '6Pack NZ',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.6pack.co.nz/og-image.jpg'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.6pack.co.nz/articles/${article.slug}`
          },
          wordCount: content ? content.split(' ').length : undefined,
          timeRequired: `PT${readingTime}M`,
          articleSection: article.category,
          keywords: (article.keywords || []).join(', '),
          about: {
            '@type': 'Thing',
            name: 'Fitness and Health'
          }
        }
      }}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </SEO>
  );
}

export function WorkoutSEO({
  workout,
  breadcrumbs,
  children
}) {
  return (
    <SEO
      structuredData={{
        type: 'ExercisePlan',
        data: {
          name: workout.title,
          description: workout.description,
          image: optimizeImageForSocial(workout.image),
          url: `https://www.6pack.co.nz/workouts/${workout.slug}`,
          exerciseType: 'Strength Training',
          intensity: workout.difficulty,
          duration: `PT${workout.duration || 45}M`,
          equipment: workout.equipment,
          muscleGroups: workout.muscleGroups,
          workload: workout.exercises?.length ? `${workout.exercises.length} exercises` : undefined,
          author: {
            '@type': 'Organization',
            name: '6Pack NZ'
          }
        }
      }}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </SEO>
  );
}

export function CalculatorSEO({
  calculator,
  breadcrumbs,
  children
}) {
  return (
    <SEO
      structuredData={{
        type: 'SoftwareApplication',
        data: {
          name: calculator.name,
          description: calculator.description,
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Web Browser',
          url: `https://www.6pack.co.nz${calculator.url}`,
          image: optimizeImageForSocial(calculator.image),
          author: {
            '@type': 'Organization',
            name: '6Pack NZ'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'NZD',
            availability: 'https://schema.org/InStock'
          }
          // AggregateRating removed - should only be added when real user reviews are implemented
          // aggregateRating: {
          //   '@type': 'AggregateRating',
          //   ratingValue: '4.8',
          //   ratingCount: '250',
          //   bestRating: '5',
          //   worstRating: '1'
          // }
        }
      }}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </SEO>
  );
}

export function GymFinderSEO({ 
  breadcrumbs,
  children 
}) {
  return (
    <SEO
      structuredData={{
        type: 'WebApplication',
        data: {
          name: '6Pack Gym Finder',
          description: 'Find the best gyms and fitness centers across New Zealand',
          url: 'https://www.6pack.co.nz/gym-finder',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Web Browser',
          browserRequirements: 'JavaScript',
          author: {
            '@type': 'Organization',
            name: '6Pack NZ'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'NZD'
          }
        }
      }}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </SEO>
  );
}