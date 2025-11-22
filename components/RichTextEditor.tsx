'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  return (
    <div className="space-y-2">
      <div className={`rich-text-editor-container ${error ? 'border-destructive' : ''}`}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          className="text-foreground font-serif text-lg"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}