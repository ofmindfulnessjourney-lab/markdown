export type TabName = 'Home' | 'Insert' | 'View' | 'Help';

export interface EditorSettings {
  fontFamily: string;
  fontSize: string; // Tailwind class or pixel value
  viewMode: 'split' | 'edit' | 'preview';
  showLineNumbers: boolean;
  theme: 'light' | 'dark';
}

export const FONTS = [
  { name: 'LXGW WenKai', value: 'font-lxgw' },
  { name: 'Sans Serif', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Monospace', value: 'font-mono' },
];

export const FONT_SIZES = [
  { label: 'Small', value: 'text-sm' },
  { label: 'Normal', value: 'text-base' },
  { label: 'Medium', value: 'text-lg' },
  { label: 'Large', value: 'text-xl' },
  { label: 'Extra Large', value: 'text-2xl' },
];

export const HIGHLIGHT_COLORS = [
    { name: 'Yellow', value: '#fef08a' },
    { name: 'Green', value: '#bbf7d0' },
    { name: 'Blue', value: '#bfdbfe' },
    { name: 'Pink', value: '#fbcfe8' },
    { name: 'None', value: 'transparent' }
];

export const TEXT_COLORS = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Gray', value: '#64748b' }
];

export enum ThemeType {
  GITHUB = 'github',
  NOTEBOOK = 'notebook',
  DARK = 'dark',
  MINIMAL = 'minimal',
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  className: string;
  proseClass: string;
}

export interface MarkdownDoc {
  id: string;
  name: string;
  content: string;
  lastModified?: number;
}