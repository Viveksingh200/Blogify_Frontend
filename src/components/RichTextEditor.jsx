import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ToolbarButton = ({ onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
      active
        ? "bg-slate-900 text-white border-slate-900"
        : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
    }`}
  >
    {children}
  </button>
);

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] focus:outline-none px-4 py-3 text-slate-800 " +
          "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-4 " +
          "[&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex gap-2 p-3 border-b bg-slate-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          Bold
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          Italic
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          H2
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;