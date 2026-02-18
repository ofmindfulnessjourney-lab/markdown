import React, { useState, useRef } from 'react';
import { Ribbon } from './components/Ribbon';
import { WordEditor } from './components/WordEditor';
import { IconPicker } from './components/IconPicker';
import { TabName, FONTS, FONT_SIZES, EditorSettings, TEXT_COLORS, HIGHLIGHT_COLORS } from './types';
import { insertAtCursor, downloadFile, SAMPLE_DOC } from './utils/editorHelpers';

const App: React.FC = () => {
  const [content, setContent] = useState(SAMPLE_DOC);
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [colorMenuType, setColorMenuType] = useState<'text' | 'highlight' | null>(null);
  
  const [settings, setSettings] = useState<EditorSettings>({
      fontFamily: FONTS[0].value,
      fontSize: FONT_SIZES[1].value,
      viewMode: 'split',
      showLineNumbers: true,
      theme: 'light'
  });
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateSettings = (key: keyof EditorSettings, value: any) => {
      setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleEditorAction = (action: string, value?: string) => {
    // Focus Editor
    if (['font-family', 'font-size', 'view-edit', 'view-split', 'view-preview', 'upload', 'download', 'toggle-line-numbers'].includes(action)) {
        // Actions that don't need text focus logic
    } else {
        textareaRef.current?.focus();
    }
    
    const input = textareaRef.current;
    if (!input && !['upload', 'download'].includes(action)) return;

    let result;

    switch (action) {
      // --- History ---
      case 'undo': document.execCommand('undo'); break;
      case 'redo': document.execCommand('redo'); break;
      
      // --- Clipboard ---
      case 'copy': 
        if(input && input.selectionStart !== input.selectionEnd) {
             navigator.clipboard.writeText(input.value.substring(input.selectionStart, input.selectionEnd));
        }
        break;
      case 'cut':
         if(input) {
             navigator.clipboard.writeText(input.value.substring(input.selectionStart, input.selectionEnd));
             result = insertAtCursor(input, '', '');
         }
         break;
      case 'paste':
        navigator.clipboard.readText().then(text => {
            if(input) {
                const res = insertAtCursor(input, text);
                setContent(res.text);
            }
        });
        break;

      // --- Font ---
      case 'font-family': updateSettings('fontFamily', value); break;
      case 'font-size': updateSettings('fontSize', value); break;
      case 'bold': result = insertAtCursor(input!, '**', '**'); break;
      case 'italic': result = insertAtCursor(input!, '*', '*'); break;
      case 'underline': result = insertAtCursor(input!, '<u>', '</u>'); break; // HTML
      case 'strikethrough': result = insertAtCursor(input!, '~~', '~~'); break;
      case 'code': result = insertAtCursor(input!, '`', '`'); break;
      case 'subscript': result = insertAtCursor(input!, '<sub>', '</sub>'); break;
      case 'superscript': result = insertAtCursor(input!, '<sup>', '</sup>'); break;
      
      // --- Color Menus ---
      case 'color-menu': setColorMenuType('text'); break;
      case 'highlight-menu': setColorMenuType('highlight'); break;
      case 'apply-color': 
        result = insertAtCursor(input!, `<span style="color: ${value}">`, '</span>'); 
        setColorMenuType(null);
        break;
      case 'apply-highlight': 
        result = insertAtCursor(input!, `<mark style="background-color: ${value}">`, '</mark>'); 
        setColorMenuType(null);
        break;

      // --- Paragraph ---
      case 'list-ul': result = insertAtCursor(input!, '- ', ''); break;
      case 'list-ol': result = insertAtCursor(input!, '1. ', ''); break;
      case 'todo': result = insertAtCursor(input!, '- [ ] ', ''); break;
      case 'indent-increase': 
          // Simple tab insertion at start of line
          const start = input!.selectionStart;
          // Find start of line
          // This is a simplified indent logic
          result = insertAtCursor(input!, '\t', ''); 
          break;
      case 'indent-decrease':
          // Not easily implementable in textarea without advanced logic
          break;
      case 'align-left': result = insertAtCursor(input!, '<div align="left">\n', '\n</div>'); break;
      case 'align-center': result = insertAtCursor(input!, '<div align="center">\n', '\n</div>'); break;
      case 'align-right': result = insertAtCursor(input!, '<div align="right">\n', '\n</div>'); break;
      case 'align-justify': result = insertAtCursor(input!, '<div align="justify">\n', '\n</div>'); break;

      // --- Styles ---
      case 'h1': result = insertAtCursor(input!, '# ', ''); break;
      case 'h2': result = insertAtCursor(input!, '## ', ''); break;
      case 'h3': result = insertAtCursor(input!, '### ', ''); break;
      case 'quote': result = insertAtCursor(input!, '> ', ''); break;
      case 'paragraph': 
          // Remove heading markers? Simple replacement logic
          const currentText = input!.value.substring(input!.selectionStart, input!.selectionEnd);
          const cleanText = currentText.replace(/^#+\s/, '');
          result = insertAtCursor(input!, '', '', cleanText);
          break;

      // --- Insert ---
      case 'hr': result = insertAtCursor(input!, '\n---\n', ''); break;
      case 'table': 
         result = insertAtCursor(input!, `\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n`); 
         break;
      case 'image': 
         const url = prompt("Enter Image URL:", "https://");
         if(url) result = insertAtCursor(input!, `![Image](${url})`, '');
         break;
      case 'link': 
         const linkUrl = prompt("Enter Link URL:", "https://");
         if(linkUrl) result = insertAtCursor(input!, `[Link Text](${linkUrl})`, '');
         break;
      case 'open-icons': setIsIconPickerOpen(true); break;

      // --- View ---
      case 'view-edit': updateSettings('viewMode', 'edit'); break;
      case 'view-split': updateSettings('viewMode', 'split'); break;
      case 'view-preview': updateSettings('viewMode', 'preview'); break;
      case 'toggle-line-numbers': updateSettings('showLineNumbers', !settings.showLineNumbers); break;

      // --- File ---
      case 'download': downloadFile(content, 'worddown-doc.md'); break;
      case 'upload':
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.md,.txt';
        fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file) {
                file.text().then(setContent);
            }
        };
        fileInput.click();
        break;
    }

    if (result && input) {
      setContent(result.text);
      setTimeout(() => {
        input.setSelectionRange(result.cursorStart, result.cursorEnd);
        input.focus();
      }, 0);
    }
  };

  const handleIconSelect = (iconName: string) => {
      if(!textareaRef.current) return;
      // Insert our custom icon tag
      const result = insertAtCursor(textareaRef.current, `<icon name="${iconName}" size="24" /> `);
      setContent(result.text);
      setIsIconPickerOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100">
      
      {/* Color Picker Overlay */}
      {colorMenuType && (
          <div 
            className="fixed inset-0 z-50 bg-transparent" 
            onClick={() => setColorMenuType(null)}
          >
              <div 
                className="absolute bg-white shadow-xl border border-slate-200 rounded-lg p-3 z-50 top-[110px] left-[300px] flex flex-col gap-2 animate-in fade-in zoom-in duration-150"
                onClick={e => e.stopPropagation()}
              >
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      {colorMenuType === 'text' ? 'Text Color' : 'Highlight'}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                      {(colorMenuType === 'text' ? TEXT_COLORS : HIGHLIGHT_COLORS).map(c => (
                          <button
                            key={c.name}
                            className="w-8 h-8 rounded-full border border-slate-200 hover:scale-110 transition-transform"
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                            onClick={() => handleEditorAction(colorMenuType === 'text' ? 'apply-color' : 'apply-highlight', c.value)}
                          />
                      ))}
                  </div>
              </div>
          </div>
      )}

      <Ribbon 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAction={handleEditorAction}
        editorSettings={settings}
      />
      
      <WordEditor 
        content={content} 
        onChange={setContent}
        settings={settings}
        inputRef={textareaRef}
      />

      <IconPicker 
        isOpen={isIconPickerOpen} 
        onClose={() => setIsIconPickerOpen(false)} 
        onSelect={handleIconSelect} 
      />
      
      {/* Footer Status Bar */}
      <div className="bg-[#2b579a] text-white/90 text-[11px] py-1 px-4 flex justify-between items-center z-10 select-none shadow-inner">
         <div className="flex gap-6">
             <span className="font-medium">Page 1 of 1</span>
             <span>{content.split(/\s+/).filter(w => w.length > 0).length} words</span>
             <span>English (US)</span>
         </div>
         <div className="flex gap-6 items-center">
            <span className="uppercase tracking-wider opacity-80">{settings.viewMode} MODE</span>
            <div className="flex items-center gap-2">
                 <span>100%</span>
                 <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                     <div className="w-1/2 h-full bg-white/80"></div>
                 </div>
                 <span className="text-lg leading-none pb-0.5">+</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default App;