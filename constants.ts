import { ThemeConfig, ThemeType } from './types';

export const THEMES: ThemeConfig[] = [
  {
    id: ThemeType.GITHUB,
    name: 'GitHub Classic',
    className: 'bg-white',
    proseClass: 'prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-pre:bg-slate-100 prose-pre:text-slate-900 prose-pre:border prose-pre:border-slate-200 prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-img:rounded-xl',
  },
  {
    id: ThemeType.NOTEBOOK,
    name: 'Warm Notebook',
    className: 'bg-[#fef7e9]',
    proseClass: 'prose-stone max-w-none font-serif prose-headings:font-serif prose-headings:text-amber-900 prose-headings:border-b prose-headings:border-amber-200 prose-headings:pb-2 prose-p:text-stone-700 prose-a:text-amber-700 prose-blockquote:border-l-amber-400 prose-blockquote:bg-amber-100/50 prose-blockquote:italic prose-pre:bg-[#f5e6d3] prose-pre:text-amber-900 prose-code:bg-[#f5e6d3] prose-code:text-amber-800 prose-code:px-1 prose-code:rounded prose-img:shadow-md prose-img:border-4 prose-img:border-white prose-img:rotate-1',
  },
  {
    id: ThemeType.DARK,
    name: 'Nebula Dark',
    className: 'bg-[#0d1117]',
    proseClass: 'prose-invert max-w-none prose-headings:text-blue-100 prose-a:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-900/20 prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-slate-700 prose-code:text-blue-200 prose-img:opacity-90 prose-img:rounded-lg',
  },
  {
    id: ThemeType.MINIMAL,
    name: 'Minimalist',
    className: 'bg-white',
    proseClass: 'prose-neutral max-w-none font-sans tracking-wide prose-headings:font-light prose-headings:tracking-tight prose-p:leading-relaxed prose-a:underline prose-a:decoration-slate-300 prose-a:underline-offset-4 prose-pre:bg-gray-50 prose-blockquote:border-l-2 prose-blockquote:border-slate-200 prose-blockquote:pl-4 prose-blockquote:not-italic',
  },
];