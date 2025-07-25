import { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate optimized Unsplash URLs with different sizes
  const generateUnsplashUrl = (baseUrl, targetWidth, quality = 85) => {
    if (!baseUrl.includes('unsplash.com')) return baseUrl;
    
    // Extract photo ID from Unsplash URL
    const photoId = baseUrl.match(/photo-([a-zA-Z0-9_-]+)/)?.[1];
    if (!photoId) return baseUrl;
    
    const aspectRatio = height && width ? height / width : 0.6; // Default 16:10 ratio
    const targetHeight = Math.round(targetWidth * aspectRatio);
    
    return `https://images.unsplash.com/photo-${photoId}?w=${targetWidth}&h=${targetHeight}&fit=crop&fm=webp&q=${quality}`;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseUrl) => {
    if (!baseUrl.includes('unsplash.com')) return '';
    
    const sizes = [400, 600, 800, 1200, 1600];
    return sizes
      .map(size => `${generateUnsplashUrl(baseUrl, size)} ${size}w`)
      .join(', ');
  };

  const optimizedSrc = generateUnsplashUrl(src, width || 800);
  const srcSet = generateSrcSet(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}
      
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;