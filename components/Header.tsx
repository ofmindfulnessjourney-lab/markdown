import React from 'react';
import { Upload, Palette } from 'lucide-react';
import { ThemeType, ThemeConfig } from '../types';

interface HeaderProps {
  themes: ThemeConfig[];
  currentThemeId: ThemeType;
  onThemeChange: (id: ThemeType) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  themes,
  currentThemeId,
  onThemeChange,
  onFileUpload,
}) => {
  return (
    <header className="bg-white px-4 md:px-8 py-3 border-b border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 z-30 relative">
      <div className="flex items-center gap-3 self-start sm:self-auto">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none">
            Markdown Atelier
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Knowledge Base & Viewer</p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 bg-slate-50 rounded-full px-1 py-1 border border-slate-200 flex-1 sm:flex-none">
            <div className="pl-3 pr-1 text-slate-400">
                <Palette className="w-4 h-4" />
            </div>
            <select
              value={currentThemeId}
              onChange={(e) => onThemeChange(e.target.value as ThemeType)}
              className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 cursor-pointer py-1.5 pr-8"
              style={{ backgroundImage: 'none' }} // Removing default arrow for cleaner look if desired, but retaining for functionality usually better
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
        </div>

        <label className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer transition-all shadow-md shadow-indigo-200 active:scale-95 flex-shrink-0">
          <Upload className="w-4 h-4" />
          <span>Import .md</span>
          <input
            type="file"
            accept=".md,.markdown,text/markdown"
            multiple
            className="hidden"
            onChange={onFileUpload}
          />
        </label>
      </div>
    </header>
  );
};