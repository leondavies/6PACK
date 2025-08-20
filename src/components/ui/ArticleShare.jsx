'use client';

import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Copy, Check } from 'lucide-react';

const ArticleShare = ({ 
  title, 
  excerpt,
  url,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = url || window.location.href;
  const shareText = `${title}\n\n${excerpt}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const tweetText = `${shareText}\n\nRead more at 6Pack.co.nz #Fitness #6PackNZ`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Share2 size={16} className="mr-2" />
        Share
      </button>

      {/* Share Options Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Share Article</h3>
            
            <div className="space-y-1">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                {copied ? (
                  <Check size={16} className="mr-3 text-green-600" />
                ) : (
                  <Copy size={16} className="mr-3 text-gray-600" />
                )}
                <span className={`text-sm ${copied ? 'text-green-600' : 'text-gray-700'}`}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>

              {/* Social Media */}
              <button
                onClick={handleFacebookShare}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                <Facebook size={16} className="mr-3 text-blue-600" />
                <span className="text-gray-700 text-sm">Share on Facebook</span>
              </button>

              <button
                onClick={handleTwitterShare}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                <Twitter size={16} className="mr-3 text-sky-500" />
                <span className="text-gray-700 text-sm">Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ArticleShare;