import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "/6pack.webp", 
  className = "",
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

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={imageError ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;