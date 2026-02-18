import React from 'react';
import * as Lucide from 'lucide-react';
import { TabName, FONTS, FONT_SIZES, TEXT_COLORS, HIGHLIGHT_COLORS } from '../types';

interface RibbonProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  onAction: (action: string, value?: string) => void;
  editorSettings: any;
}

export const Ribbon: React.FC<RibbonProps> = ({
  activeTab,
  onTabChange,
  onAction,
  editorSettings,
}) => {
  const renderGroup = (title: string, children: React.ReactNode) => (
    <div className="flex flex-col h-full px-3 border-r border-slate-200 last:border-0 relative group min-w-max">
      <div className="flex-1 flex items-center gap-2 justify-center">
        {children}
      </div>
      <div className="text-[11px] text-slate-400 text-center w-full font-medium pb-1 mt-auto select-none uppercase tracking-wide">
        {title}
      </div>
    </div>
  );

  const LargeButton = ({ icon: Icon, label, onClick, className = "" }: any) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-2 py-1 hover:bg-slate-100 active:bg-slate-200 rounded-md transition-colors h-[68px] min-w-[56px] text-slate-700 ${className}`}
      title={label}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[11px] font-medium leading-tight text-center">{label}</span>
    </button>
  );

  const SmallButton = ({ icon: Icon, onClick, active = false, title }: any) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-sm transition-colors ${active ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="flex flex-col bg-white border-b border-slate-200 shadow-sm z-30 sticky top-0 font-sans">
      {/* Top Strip (File/Tabs) */}
      <div className="bg-[#2b579a] text-white flex items-end px-4 pt-2 gap-1 select-none">
        <div className="font-bold mr-6 text-sm pb-2 px-1 tracking-tight">WordDown</div>
        {(['Home', 'Insert', 'View', 'Help'] as TabName[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              px-5 py-1.5 text-xs rounded-t-md transition-colors duration-150
              ${activeTab === tab 
                ? 'bg-slate-50 text-slate-800 font-bold shadow-[0_-2px_4px_rgba(0,0,0,0.1)] translate-y-[1px]' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'}
            `}
          >
            {tab}
          </button>
        ))}
        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2 pb-1.5">
           <button 
              onClick={() => onAction('upload')}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-[11px] font-medium transition-colors"
           >
              <Lucide.Upload className="w-3 h-3" />
              Import
           </button>
           <button 
              onClick={() => onAction('download')}
              className="flex items-center gap-1.5 px-3 py-1 bg-blue-500 hover:bg-blue-400 text-white rounded text-[11px] font-medium transition-colors shadow-sm"
           >
              <Lucide.Download className="w-3 h-3" />
              Export
           </button>
        </div>
      </div>

      {/* Ribbon Toolbar Area */}
      <div className="h-28 bg-slate-50 flex items-stretch px-2 overflow-x-auto whitespace-nowrap custom-scrollbar">
        
        {/* Undo/Redo Group (Always visible) */}
        <div className="flex flex-col h-full px-2 border-r border-slate-200 justify-center gap-2">
            <div className="flex gap-0.5">
                 <SmallButton icon={Lucide.Undo2} onClick={() => onAction('undo')} title="Undo (Ctrl+Z)" />
                 <SmallButton icon={Lucide.Redo2} onClick={() => onAction('redo')} title="Redo (Ctrl+Y)" />
            </div>
            <div className="text-[10px] text-slate-400 text-center">History</div>
        </div>

        {activeTab === 'Home' && (
          <>
            {renderGroup('Clipboard', (
              <div className="flex gap-1 items-center">
                 <LargeButton icon={Lucide.ClipboardPaste} label="Paste" onClick={() => onAction('paste')} />
                 <div className="flex flex-col gap-1 justify-center">
                    <SmallButton icon={Lucide.Copy} onClick={() => onAction('copy')} title="Copy" />
                    <SmallButton icon={Lucide.Scissors} onClick={() => onAction('cut')} title="Cut" />
                 </div>
              </div>
            ))}

            {renderGroup('Font', (
              <div className="flex flex-col gap-2 justify-center px-1">
                <div className="flex gap-2">
                  <select 
                    className="text-xs border border-slate-300 py-1 pl-2 pr-6 rounded-sm w-32 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
                    value={editorSettings.fontFamily}
                    onChange={(e) => onAction('font-family', e.target.value)}
                  >
                    {FONTS.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
                  </select>
                  <select 
                    className="text-xs border border-slate-300 py-1 pl-2 pr-6 rounded-sm w-20 bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
                    value={editorSettings.fontSize}
                    onChange={(e) => onAction('font-size', e.target.value)}
                  >
                     {FONT_SIZES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                  <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                     <button className="p-1 hover:bg-slate-200 rounded" title="Text Color" onClick={() => onAction('color-menu')}>
                        <div className="flex flex-col items-center">
                            <span className="font-serif font-bold text-sm leading-none">A</span>
                            <div className="w-4 h-1 bg-red-500 mt-0.5"></div>
                        </div>
                     </button>
                     <button className="p-1 hover:bg-slate-200 rounded" title="Highlight Color" onClick={() => onAction('highlight-menu')}>
                        <div className="flex flex-col items-center">
                            <Lucide.Highlighter className="w-3.5 h-3.5" />
                            <div className="w-4 h-1 bg-yellow-300 mt-0.5"></div>
                        </div>
                     </button>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <SmallButton icon={Lucide.Bold} onClick={() => onAction('bold')} title="Bold" />
                  <SmallButton icon={Lucide.Italic} onClick={() => onAction('italic')} title="Italic" />
                  <SmallButton icon={Lucide.Underline} onClick={() => onAction('underline')} title="Underline (HTML)" />
                  <SmallButton icon={Lucide.Strikethrough} onClick={() => onAction('strikethrough')} title="Strikethrough" />
                  <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
                  <SmallButton icon={Lucide.Code} onClick={() => onAction('code')} title="Inline Code" />
                  <SmallButton icon={Lucide.Subscript} onClick={() => onAction('subscript')} title="Subscript" />
                  <SmallButton icon={Lucide.Superscript} onClick={() => onAction('superscript')} title="Superscript" />
                </div>
              </div>
            ))}

            {renderGroup('Paragraph', (
              <div className="flex flex-col gap-2 justify-center px-1">
                 <div className="flex gap-1">
                    <SmallButton icon={Lucide.List} onClick={() => onAction('list-ul')} title="Bulleted List" />
                    <SmallButton icon={Lucide.ListOrdered} onClick={() => onAction('list-ol')} title="Numbered List" />
                    <SmallButton icon={Lucide.CheckSquare} onClick={() => onAction('todo')} title="Task List" />
                    <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
                    <SmallButton icon={Lucide.IndentDecrease} onClick={() => onAction('indent-decrease')} title="Decrease Indent" />
                    <SmallButton icon={Lucide.IndentIncrease} onClick={() => onAction('indent-increase')} title="Increase Indent" />
                 </div>
                 <div className="flex gap-1">
                    <SmallButton icon={Lucide.AlignLeft} onClick={() => onAction('align-left')} title="Align Left" />
                    <SmallButton icon={Lucide.AlignCenter} onClick={() => onAction('align-center')} title="Align Center" />
                    <SmallButton icon={Lucide.AlignRight} onClick={() => onAction('align-right')} title="Align Right" />
                    <SmallButton icon={Lucide.AlignJustify} onClick={() => onAction('align-justify')} title="Justify" />
                 </div>
              </div>
            ))}

            {renderGroup('Styles', (
               <div className="flex items-center gap-1 px-1">
                   <div className="grid grid-cols-3 gap-1">
                        <LargeButton icon={Lucide.Heading1} label="Heading 1" onClick={() => onAction('h1')} />
                        <LargeButton icon={Lucide.Heading2} label="Heading 2" onClick={() => onAction('h2')} />
                        <LargeButton icon={Lucide.Heading3} label="Heading 3" onClick={() => onAction('h3')} />
                   </div>
                   <div className="flex flex-col gap-1 pl-1">
                       <SmallButton icon={Lucide.Quote} onClick={() => onAction('quote')} title="Blockquote" />
                       <SmallButton icon={Lucide.Pilcrow} onClick={() => onAction('paragraph')} title="Normal Paragraph" />
                   </div>
               </div>
            ))}
          </>
        )}

        {activeTab === 'Insert' && (
          <>
            {renderGroup('Pages', (
                <LargeButton icon={Lucide.FilePlus} label="Break" onClick={() => onAction('hr')} />
            ))}
            {renderGroup('Tables', (
                <LargeButton icon={Lucide.Table} label="Table" onClick={() => onAction('table')} />
            ))}
            {renderGroup('Media', (
                <div className="flex gap-2">
                    <LargeButton icon={Lucide.Image} label="Picture" onClick={() => onAction('image')} />
                    <LargeButton icon={Lucide.Link} label="Link" onClick={() => onAction('link')} />
                </div>
            ))}
            {renderGroup('Symbols', (
                 <LargeButton icon={Lucide.Smile} label="Icons" onClick={() => onAction('open-icons')} className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100" />
            ))}
          </>
        )}

        {activeTab === 'View' && (
            <>
                {renderGroup('Document Views', (
                    <div className="flex gap-2">
                        <LargeButton 
                            icon={Lucide.Layout} 
                            label="Editor" 
                            onClick={() => onAction('view-edit')} 
                            className={editorSettings.viewMode === 'edit' ? 'bg-blue-50 text-blue-600' : ''}
                        />
                        <LargeButton 
                            icon={Lucide.Columns} 
                            label="Split" 
                            onClick={() => onAction('view-split')} 
                            className={editorSettings.viewMode === 'split' ? 'bg-blue-50 text-blue-600' : ''}
                        />
                        <LargeButton 
                            icon={Lucide.Eye} 
                            label="Read" 
                            onClick={() => onAction('view-preview')} 
                            className={editorSettings.viewMode === 'preview' ? 'bg-blue-50 text-blue-600' : ''}
                        />
                    </div>
                ))}
                {renderGroup('Show', (
                    <div className="flex flex-col gap-2 justify-center px-2 min-w-[100px]">
                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={editorSettings.showLineNumbers}
                                onChange={() => onAction('toggle-line-numbers')}
                                className="rounded text-blue-600 focus:ring-blue-500" 
                            />
                            Line Numbers
                        </label>
                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input type="checkbox" checked readOnly className="rounded text-blue-600 focus:ring-blue-500 opacity-50" />
                            Ruler
                        </label>
                    </div>
                ))}
            </>
        )}

        {activeTab === 'Help' && (
            <>
                {renderGroup('About', (
                     <LargeButton icon={Lucide.Info} label="About" onClick={() => alert('WordDown v1.0\nCreated for Markdown Enthusiasts.')} />
                ))}
                {renderGroup('Shortcuts', (
                     <LargeButton icon={Lucide.Keyboard} label="Keys" onClick={() => alert('Ctrl+B: Bold\nCtrl+I: Italic\nCtrl+S: Save (Download)')} />
                ))}
            </>
        )}

      </div>
    </div>
  );
};