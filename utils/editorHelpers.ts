export const insertAtCursor = (
  input: HTMLTextAreaElement,
  prefix: string,
  suffix: string = '',
  placeholder: string = ''
) => {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const text = input.value;
  const selection = text.substring(start, end);

  const newText =
    text.substring(0, start) +
    prefix +
    (selection || placeholder) +
    suffix +
    text.substring(end);

  // Return new text and new cursor position
  return {
    text: newText,
    cursorStart: start + prefix.length,
    cursorEnd: start + prefix.length + (selection.length || placeholder.length),
  };
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const SAMPLE_DOC = `# WordDown Studio 📝

Welcome to **WordDown**, a refined Markdown workshop featuring the beautiful **LXGW WenKai** font.

## 1. Typography & Colors (HTML Support)

WordDown allows you to use Markdown for structure and HTML for style.

- <span style="color: #dc2626">This text is Red.</span>
- <span style="color: #2563eb">This text is Blue.</span>
- <mark style="background-color: #fef08a">This text is highlighted in Yellow.</mark>

## 2. Advanced Layout

<div align="center">
  <h3>Centered Content</h3>
  <p>You can align text using the toolbar buttons.</p>
</div>

## 3. Icon Integration

We support inserting Lucide icons directly into the document. 

<icon name="Rocket" size="32" /> <icon name="Heart" size="32" /> <icon name="Zap" size="32" />

## 4. Standard Markdown

| Feature | Support |
| :--- | :--- |
| **Bold** | Yes |
| *Italic* | Yes |
| \`Code\` | Yes |

> "Simplicity is the ultimate sophistication."

`;