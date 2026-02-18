import React from 'react';
import { MarkdownDoc } from '../types';
import { FileText, Trash2, BookOpen } from 'lucide-react';

interface SidebarProps {
  documents: MarkdownDoc[];
  activeDocId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  activeDocId,
  onSelect,
  onDelete,
}) => {
  return (
    <aside className="w-full md:w-72 bg-white flex flex-col border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 h-full">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Library</span>
        </div>
        <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
          {documents.length}
        </span>
      </div>

      <ul className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {documents.length === 0 ? (
          <li className="text-center py-10 px-4 text-slate-400 text-sm flex flex-col items-center gap-2">
            <FileText className="w-8 h-8 opacity-20" />
            <p>No documents found.</p>
            <p className="text-xs">Import a file to get started.</p>
          </li>
        ) : (
          documents.map((doc) => (
            <li key={doc.id}>
              <button
                onClick={() => onSelect(doc.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-sm text-left ${
                  activeDocId === doc.id
                    ? 'bg-indigo-50 text-indigo-700 font-medium ring-1 ring-indigo-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText
                  className={`w-4 h-4 flex-shrink-0 ${
                    activeDocId === doc.id ? 'text-indigo-500' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="truncate flex-1">{doc.name}</span>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => onDelete(doc.id, e)}
                  className={`p-1.5 rounded-full transition-colors ${
                    activeDocId === doc.id
                      ? 'text-indigo-400 hover:bg-indigo-100 hover:text-red-500'
                      : 'text-slate-300 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label="Delete document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </div>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};