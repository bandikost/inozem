
"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Pilcrow,
  ImagePlus,
  Undo2,
  Redo2,
} from "lucide-react";

type DescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionEditor({
  value,
  onChange,
}: DescriptionEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] px-4 py-3 outline-none text-sm text-gray-800",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    const next = value || "<p></p>";

    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[260px] animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
    );
  }

  const buttonClass = (active = false) =>
    `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-2.5 text-sm transition ${
      active
        ? "border-blue-300 bg-blue-50 text-blue-700"
        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
    }`;

  const insertImage = () => {
    const url = window.prompt(
      "Укажите URL изображения (например, адрес загруженной картинки)"
    );

    if (!url) return;

    try {
      const parsed = new URL(url);

      if (!["http:", "https:"].includes(parsed.protocol)) {
        window.alert("Допускаются только HTTP и HTTPS ссылки.");
        return;
      }

      editor.chain().focus().setImage({ src: parsed.href }).run();
    } catch {
      window.alert("Укажите корректный URL изображения.");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap gap-1.5 border-b border-gray-200 bg-gray-50 p-2">
        <button
          type="button"
          title="Абзац"
          className={buttonClass(editor.isActive("paragraph"))}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow size={16} />
        </button>

        <button
          type="button"
          title="Заголовок 2"
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={17} />
        </button>

        <button
          type="button"
          title="Заголовок 3"
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={17} />
        </button>

        <button
          type="button"
          title="Жирный"
          className={buttonClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          title="Курсив"
          className={buttonClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          title="Маркированный список"
          className={buttonClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={17} />
        </button>

        <button
          type="button"
          title="Нумерованный список"
          className={buttonClass(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={17} />
        </button>

        <button
          type="button"
          title="Вставить изображение по URL"
          className={buttonClass()}
          onClick={insertImage}
        >
          <ImagePlus size={16} />
        </button>

        <div className="mx-1 border-l border-gray-200" />

        <button
          type="button"
          title="Отменить"
          className={buttonClass()}
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={16} />
        </button>

        <button
          type="button"
          title="Повторить"
          className={buttonClass()}
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={16} />
        </button>
      </div>

      <EditorContent editor={editor} />

      <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
        Можно вставлять форматированный текст из Word через Ctrl+V.
      </div>

      <style jsx global>{`
        .tiptap {
          min-height: 220px;
        }

        .tiptap p {
          margin: 0 0 12px;
          line-height: 1.7;
        }

        .tiptap h2 {
          margin: 24px 0 12px;
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .tiptap h3 {
          margin: 20px 0 10px;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        .tiptap ul,
        .tiptap ol {
          margin: 0 0 16px;
          padding-left: 24px;
        }

        .tiptap ul {
          list-style: disc;
        }

        .tiptap ol {
          list-style: decimal;
        }

        .tiptap li {
          margin: 4px 0;
        }

        .tiptap img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 16px 0;
          border-radius: 8px;
        }

        .tiptap:focus {
          outline: none;
        }

        .tiptap > *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
