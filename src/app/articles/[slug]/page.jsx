import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Eye, Calendar } from 'lucide-react';
import { marked } from 'marked';
import { articles } from '../../../data/products';
import ArticleShare from '../../../components/ui/ArticleShare';
import TableOfContents from '../../../components/ui/TableOfContents';
import ClientArticle from '../../../components/ClientArticle';

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = articles.find(a => a.slug === params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | 6Pack NZ',
    };
  }

  return {
    title: `${article.title} | 6Pack NZ`,
    description: article.excerpt,
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image.replace(/w=\d+&h=\d+/, 'w=1200&h=630'),
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      url: `https://www.6pack.co.nz/articles/${article.slug}`,
      type: 'article',
      authors: [article.author],
      publishedTime: article.publishDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image.replace(/w=\d+&h=\d+/, 'w=1200&h=630')],
    },
    alternates: {
      canonical: `https://www.6pack.co.nz/articles/${article.slug}`,
    },
  };
}

export default function ArticlePage({ params }) {
  const { slug } = params;
  const article = articles.find(a => a.slug === slug);
  
  // Process content to add IDs to headings and format TLDR
  const processedContent = article ? (() => {
    let html = marked(article.content);
    
    // Add IDs to h2 and h3 tags
    html = html.replace(/<h([23])>([^<]+)<\/h[23]>/g, (match, level, text) => {
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
      return `<h${level} id="${id}">${text}</h${level}>`;
    });
    
    // Fix TLDR formatting - convert bullet points to proper list items
    html = html.replace(
      /<h2 id="tldr">TLDR<\/h2>\s*<p>(.*?)<\/p>/s,
      (match, content) => {
        // Split by bullet points and create proper list items
        const items = content
          .split('•')
          .filter(item => item.trim())
          .map(item => {
            const trimmed = item.trim();
            // Extract bold text and description
            const boldMatch = trimmed.match(/^<strong>(.*?)<\/strong>:\s*(.*)/);
            if (boldMatch) {
              return `<li class="flex items-start"><span class="text-primary-600 mr-2 mt-1">•</span><div><strong class="text-primary-600">${boldMatch[1]}</strong>: ${boldMatch[2]}</div></li>`;
            }
            return `<li class="flex items-start"><span class="text-primary-600 mr-2 mt-1">•</span><div>${trimmed}</div></li>`;
          });
        
        return `<h2 id="tldr">TLDR</h2>\n<ul class="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 space-y-3 list-none">\n${items.join('\n')}\n</ul>`;
      }
    );
    
    return html;
  })() : '';

  if (!article) {
    return notFound();
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <ClientArticle>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: {
              "@type": "ImageObject",
              url: article.image.replace(/w=\d+&h=\d+/, 'w=1200&h=630'),
              width: 1200,
              height: 630,
            },
            author: {
              "@type": "Person",
              name: article.author,
            },
            publisher: {
              "@type": "Organization",
              name: "6Pack",
              logo: {
                "@type": "ImageObject",
                url: "https://www.6pack.co.nz/logo.png",
              },
            },
            datePublished: article.publishDate,
            dateModified: article.publishDate,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.6pack.co.nz/articles/${article.slug}`,
            },
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/articles"
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors mb-4"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Articles
              </Link>
              
              <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full font-medium">
                  {article.category}
                </span>
                <div className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1" size={16} />
                  {article.views.toLocaleString()} views
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center">
                  <User className="mr-2" size={16} />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2" size={16} />
                  {new Date(article.publishDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-1">
              <article className="prose prose-lg prose-gray max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                  className="article-content"
                />
              </article>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map(relatedArticle => (
                      <Link
                        key={relatedArticle.id}
                        href={`/articles/${relatedArticle.slug}`}
                        className="group"
                      >
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                        />
                        <h4 className="font-semibold group-hover:text-primary-600 transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {relatedArticle.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Table of Contents - Desktop */}
            <div className="lg:col-span-1 order-2 lg:order-2">
              <div className="sticky top-24">
                <TableOfContents content={processedContent} />
                <ArticleShare 
                  url={`https://www.6pack.co.nz/articles/${article.slug}`}
                  title={article.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientArticle>
  );
}