"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function Tiptap({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-2xl border p-4">
      <EditorContent editor={editor} />
    </div>
  );
}