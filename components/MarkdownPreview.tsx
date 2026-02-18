import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ThemeConfig, ThemeType } from '../types';

// We import the CSS in index.html, so rehype-highlight will just add the classes.

interface MarkdownPreviewProps {
  content: string;
  theme: ThemeConfig;
  docName: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  theme,
  docName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Syntax Highlighting Theme Swap (Simulated via stylesheet toggle if we had multiple css files, 
  // but here we just rely on generic highlighters. For dark mode, we might want to invert colors).
  useEffect(() => {
    // In a real production app with multiple highlight.js themes, we would dynamically swap the <link> tag.
    // For this demo, we use a neutral theme, but we can add specific adjustments via CSS filters for the dark theme.
    const highlightLink = document.getElementById('highlight-style') as HTMLLinkElement;
    if (highlightLink) {
        if (theme.id === ThemeType.DARK) {
             highlightLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css";
        } else if (theme.id === ThemeType.NOTEBOOK) {
             highlightLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/panda-syntax-light.min.css"; // A warmer theme
        } else {
             highlightLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";
        }
    }
  }, [theme.id]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto transition-colors duration-300 ${theme.className}`}
    >
      <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-16 min-h-full">
        <article className={`prose ${theme.proseClass} transition-all duration-300`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                // Custom component overrides if needed
                code: ({node, className, children, ...props}) => {
                   const match = /language-(\w+)/.exec(className || '')
                   return match ? (
                     <code className={className} {...props}>
                       {children}
                     </code>
                   ) : (
                     <code className={`${className} bg-black/5 rounded px-1 py-0.5 text-[0.9em] before:content-[''] after:content-['']`} {...props}>
                       {children}
                     </code>
                   )
                }
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
        
        <div className={`mt-16 pt-8 border-t text-xs text-right opacity-60 font-medium ${theme.id === ThemeType.DARK ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
            <span>DOC: {docName}</span>
        </div>
      </div>
    </div>
  );
};