import React, { useState, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import { X, Search } from 'lucide-react';

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  // Get all valid icon names from Lucide
  const iconList = useMemo(() => {
    return Object.keys(Lucide)
      .filter((key) => key !== 'createLucideIcon' && key !== 'default' && key !== 'icons')
      .sort();
  }, []);

  const filteredIcons = iconList.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Lucide.Smile className="w-5 h-5 text-indigo-600" />
            Insert Icon
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search icons (e.g. arrow, user, star)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-shadow"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                />
            </div>
            <p className="text-xs text-slate-500 mt-2 ml-1">
                Found {filteredIcons.length} icons. Click to insert.
            </p>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 custom-scrollbar">
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {filteredIcons.slice(0, 150).map((iconName) => {
                    const IconComponent = (Lucide as any)[iconName];
                    return (
                        <button 
                            key={iconName}
                            onClick={() => onSelect(iconName)}
                            className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-100 hover:text-indigo-600 transition-all group shadow-sm"
                            title={iconName}
                        >
                            <IconComponent className="w-6 h-6 text-slate-600 group-hover:text-indigo-600" />
                            <span className="text-[10px] text-slate-500 group-hover:text-indigo-600 truncate w-full text-center font-medium">
                                {iconName}
                            </span>
                        </button>
                    )
                })}
            </div>
            
            {filteredIcons.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                    <Lucide.SearchX className="w-8 h-8 mb-2 opacity-50" />
                    <p>No icons found matching "{search}"</p>
                </div>
            )}
            
            {filteredIcons.length > 150 && (
                <div className="text-center py-6 text-xs text-slate-400 border-t border-slate-100 mt-4">
                    Showing top 150 matches... Refine search to see more.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};