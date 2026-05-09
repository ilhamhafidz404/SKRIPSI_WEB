import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { IconBoldFill, IconItalicFill, IconUnderlineFill } from "@intentui/icons";
import { useEffect } from "react";

interface RichEditorProps {
    value?: string;
    onChange: (html: string) => void;
    error?: boolean;
    hint?: string;
    placeholder?: string;
}


const RichEditor = ({ value, onChange, error, hint }: RichEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                codeBlock: false,
                bulletList: false,
                orderedList: false,
            }),
            Underline,
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }: { editor: Editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none max-w-none min-h-[150px] p-4 text-sm dark:text-white/90 dark:prose-invert",
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    if (!editor) return null;

    const containerClasses = `rounded-lg border shadow-theme-xs overflow-hidden transition-all focus-within:ring-3 ${error
        ? "border-error-500 focus-within:ring-error-500/10"
        : "border-gray-300 dark:border-gray-700 focus-within:border-brand-300 focus-within:ring-brand-500/10"
        }`;

    return (
        <div className="w-full">
            <div className={containerClasses}>
                {/* Toolbar */}
                <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-1.5">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive("bold")}
                        icon={<IconBoldFill />}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive("italic")}
                        icon={<IconItalicFill />}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editor.isActive("underline")}
                        icon={<IconUnderlineFill />}
                    />
                </div>

                {/* Editor Area */}
                <div className="bg-transparent dark:bg-gray-900">
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Hint / Error Message */}
            {hint && (
                <p className={`mt-1.5 text-xs ${error ? "text-error-500" : "text-gray-500"}`}>
                    {hint}
                </p>
            )}
        </div>
    );
};

// Komponen Helper untuk Button Toolbar
const ToolbarButton = ({
    onClick,
    active,
    icon
}: {
    onClick: () => void;
    active: boolean;
    icon: React.ReactNode
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-2 rounded-md transition-colors ${active
            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400"
            : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
    >
        {icon}
    </button>
);

export default RichEditor;