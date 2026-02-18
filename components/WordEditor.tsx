import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import * as LucideIcons from 'lucide-react';
import { EditorSettings } from '../types';

interface WordEditorProps {
  content: string;
  onChange: (value: string) => void;
  settings: EditorSettings;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export const WordEditor: React.FC<WordEditorProps> = ({
  content,
  onChange,
  settings,
  inputRef
}) => {

  // Custom component map to handle our custom <icon> tag
  const components = {
    // Mapping for the <icon> HTML tag we insert
    icon: ({node, className, name, size, ...props}: any) => {
        if (!name) return <span className="text-red-500 text-xs">[Invalid Icon]</span>;
        
        const IconComponent = (LucideIcons as any)[name];
        if (!IconComponent) return <span className="text-red-500 text-xs">[Icon Not Found: {name}]</span>;
        
        const iconSize = size ? parseInt(size) : 20;
        
        return (
            <span className="inline-flex align-bottom mx-0.5" title={name}>
                <IconComponent size={iconSize} className={className || 'text-slate-800'} {...props} />
            </span>
        );
    },
    // Ensure table styling matches Word-like tables
    table: ({children}: any) => (
        <div className="overflow-x-auto my-4 border border-slate-300 rounded-sm">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
                {children}
            </table>
        </div>
    ),
    thead: ({children}: any) => <thead className="bg-slate-50">{children}</thead>,
    th: ({children}: any) => <th className="px-4 py-2 text-left font-semibold text-slate-700 border-r border-slate-200 last:border-0">{children}</th>,
    td: ({children}: any) => <td className="px-4 py-2 text-slate-600 border-r border-slate-200 last:border-0 border-t">{children}</td>,
  };

  const isSplit = settings.viewMode === 'split';
  const showEditor = settings.viewMode === 'edit' || isSplit;
  const showPreview = settings.viewMode === 'preview' || isSplit;

  return (
    <div className="flex-1 flex overflow-hidden bg-[#eef2f5] relative">
      
      {/* Editor Pane */}
      {showEditor && (
        <div className={`
            flex flex-col border-r border-slate-300 min-w-0 bg-white
            ${isSplit ? 'w-1/2' : 'w-full max-w-4xl mx-auto my-4 shadow-lg'}
        `}>
            {settings.showLineNumbers && (
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-50 border-r border-slate-200 z-10 pointer-events-none text-right pr-1 pt-6 text-[10px] text-slate-400 leading-relaxed font-mono hidden md:block">
                    {/* Placeholder for line numbers - implementing real line numbers in textarea is complex, sticking to visual cue for now */}
                    {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
            )}
            <textarea
                ref={inputRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className={`
                    flex-1 resize-none p-6 outline-none text-sm leading-relaxed text-slate-800 bg-white font-editor
                    ${settings.showLineNumbers ? 'pl-10' : ''}
                `}
                placeholder="Start typing..."
                spellCheck={false}
            />
        </div>
      )}

      {/* Preview Pane (The "Paper") */}
      {showPreview && (
        <div className={`
            flex-1 overflow-y-auto relative flex flex-col items-center bg-[#eef2f5] custom-scrollbar
            ${isSplit ? '' : 'w-full'}
        `}>
            <div className="py-8 px-4 w-full flex justify-center">
                <div className={`
                    bg-white page-shadow min-h-[1123px] w-full max-w-[816px] 
                    p-[50px] md:p-[72px] transition-all duration-300
                    ${settings.fontFamily} ${settings.fontSize}
                `}>
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-md">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={components as any}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
                </div>
            </div>
            <div className="pb-8 text-xs text-slate-400">End of Document</div>
        </div>
      )}
    </div>
  );
};