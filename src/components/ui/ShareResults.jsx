import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Link2, Download, Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';

const ShareResults = ({ 
  title, 
  results, 
  url, 
  hashtags = [],
  resultData = {},
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate URL with result parameters
  const generateResultUrl = () => {
    const baseUrl = url || window.location.href.split('?')[0];
    const params = new URLSearchParams();
    
    // Add result data as URL parameters
    Object.keys(resultData).forEach(key => {
      if (resultData[key] !== null && resultData[key] !== undefined && resultData[key] !== '') {
        params.set(key, resultData[key]);
      }
    });
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  const shareText = `${title}\n${results}\n\nCalculated with 6Pack NZ`;
  const fullUrl = generateResultUrl();

  const handleSaveResults = () => {
    const savedResults = JSON.parse(localStorage.getItem('6pack-saved-results') || '[]');
    const newResult = {
      id: Date.now(),
      title,
      results,
      url: fullUrl,
      date: new Date().toISOString(),
      type: title.split(' ')[0].toLowerCase() // bmi, bmr, etc.
    };

    savedResults.push(newResult);
    localStorage.setItem('6pack-saved-results', JSON.stringify(savedResults));
    setIsSaved(true);
    
    setTimeout(() => setIsSaved(false), 2000);
  };

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
    const tweetText = `${shareText}\n${hashtags.map(tag => `#${tag}`).join(' ')}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleDownloadResults = () => {
    const dataStr = `${title}\n${'='.repeat(title.length)}\n\n${results}\n\nCalculated: ${new Date().toLocaleDateString()}\nSource: ${fullUrl}\n\n6Pack.co.nz - New Zealand's Premier Fitness Hub`;
    const dataBlob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_Results.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!results) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Share2 size={16} className="mr-2" />
        Share Results
      </button>

      {/* Share Options Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Share Your Results</h3>
            
            <div className="space-y-2">
              {/* Save Results */}
              <button
                onClick={handleSaveResults}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                {isSaved ? (
                  <BookmarkCheck size={16} className="mr-3 text-green-600" />
                ) : (
                  <Bookmark size={16} className="mr-3 text-gray-600" />
                )}
                <span className={isSaved ? 'text-green-600' : 'text-gray-700'}>
                  {isSaved ? 'Saved!' : 'Save Results'}
                </span>
              </button>

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
                <span className={copied ? 'text-green-600' : 'text-gray-700'}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>

              {/* Social Media */}
              <button
                onClick={handleFacebookShare}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                <Facebook size={16} className="mr-3 text-blue-600" />
                <span className="text-gray-700">Share on Facebook</span>
              </button>

              <button
                onClick={handleTwitterShare}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                <Twitter size={16} className="mr-3 text-sky-500" />
                <span className="text-gray-700">Share on Twitter</span>
              </button>

              {/* Download Results */}
              <button
                onClick={handleDownloadResults}
                className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                <Download size={16} className="mr-3 text-gray-600" />
                <span className="text-gray-700">Download Results</span>
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

export default ShareResults;