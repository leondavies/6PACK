'use client';

import React, { useState, useEffect } from 'react';

// Helper function to decode HTML entities
const decodeHTMLEntities = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    try {
      // Extract headings from HTML content
      const matches = [];
      
      // Use regex to find h2 and h3 tags with IDs
      const h2Regex = /<h2[^>]*id="([^"]*)"[^>]*>([^<]+)<\/h2>/g;
      const h3Regex = /<h3[^>]*id="([^"]*)"[^>]*>([^<]+)<\/h3>/g;
      
      let match;
      
      // Find all h2 headings
      while ((match = h2Regex.exec(content)) !== null) {
        matches.push({
          level: 2,
          text: decodeHTMLEntities(match[2].trim()),
          id: match[1]
        });
      }
      
      // Find all h3 headings
      while ((match = h3Regex.exec(content)) !== null) {
        matches.push({
          level: 3,
          text: decodeHTMLEntities(match[2].trim()),
          id: match[1]
        });
      }
      
      // Sort by position in content
      matches.sort((a, b) => {
        const aPos = content.indexOf(`id="${a.id}"`);
        const bPos = content.indexOf(`id="${b.id}"`);
        return aPos - bPos;
      });
      
      setHeadings(matches);
    } catch (error) {
      console.error('Error parsing table of contents:', error);
      setHeadings([]);
    }
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
      <nav className="space-y-2 text-sm">
        {headings.map((heading, index) => {
          // Count only h2 headings for numbering
          const h2Index = headings.slice(0, index + 1).filter(h => h.level === 2).length;
          
          return (
            <a
              key={index}
              href={`#${heading.id}`}
              className={`block hover:text-primary-600 transition-colors ${
                heading.level === 2 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 ml-4'
              }`}
            >
              {heading.level === 2 ? `${h2Index}. ` : '• '}
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;