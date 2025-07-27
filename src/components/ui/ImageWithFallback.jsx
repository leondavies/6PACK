import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "https://www.6pack.co.nz/og-image.jpg", 
  className = "",
  priority = false,
  width,
  height,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate optimized Unsplash URLs
  const generateOptimizedUrl = (url, targetWidth = 800) => {
    if (!url || !url.includes('unsplash.com')) return url;
    
    const photoId = url.match(/photo-([a-zA-Z0-9_-]+)/)?.[1];
    if (!photoId) return url;
    
    const aspectRatio = height && width ? height / width : 0.5; // Default aspect ratio
    const targetHeight = Math.round(targetWidth * aspectRatio);
    
    return `https://images.unsplash.com/photo-${photoId}?w=${targetWidth}&h=${targetHeight}&fit=crop&fm=webp&q=85`;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (url) => {
    if (!url || !url.includes('unsplash.com')) return '';
    
    const sizes = [400, 600, 800, 1200];
    return sizes
      .map(size => `${generateOptimizedUrl(url, size)} ${size}w`)
      .join(', ');
  };

  const optimizedSrc = generateOptimizedUrl(imageError ? fallbackSrc : src, width || 600);
  const srcSet = generateSrcSet(imageError ? fallbackSrc : src);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;