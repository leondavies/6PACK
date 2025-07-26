import React, { useState, useEffect } from 'react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    try {
      // Extract headings from markdown content
      const lines = content.split('\n');
      const matches = [];
      
      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('##') && !trimmedLine.startsWith('###')) {
          // H2 heading
          const text = trimmedLine.replace(/^##\s*/, '').trim();
          if (text) {
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/^-+|-+$/g, '');
            
            matches.push({
              level: 2,
              text,
              id: id || `heading-${index}`
            });
          }
        } else if (trimmedLine.startsWith('###')) {
          // H3 heading
          const text = trimmedLine.replace(/^###\s*/, '').trim();
          if (text) {
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/^-+|-+$/g, '');
            
            matches.push({
              level: 3,
              text,
              id: id || `heading-${index}`
            });
          }
        }
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
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#${heading.id}`}
            className={`block hover:text-primary-600 transition-colors ${
              heading.level === 2 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-600 ml-4'
            }`}
          >
            {heading.level === 2 ? `${index + 1}. ` : '• '}
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;