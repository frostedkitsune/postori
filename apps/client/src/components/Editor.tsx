import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";



const Editor = () =>{
  const editor = useEditor({
      extensions: [StarterKit],
      content: "<p>Hello</p>",
    });

  if (!editor) {
     return null;
   }
  return (<>
    <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-2">
            <Button
              variant={editor.isActive("bold") ? "secondary" : "outline"}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </Button>
            <Button
              variant={editor.isActive("italic") ? "secondary" : "outline"}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </Button>
            <Button
              variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "outline"}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              H1
            </Button>
            <Button
              variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "outline"}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </Button>
          </div>

          {/* Editor content */}
          <div className="border rounded p-4 min-h-[200px]">
            <EditorContent editor={editor} />
          </div>
        </div>

  </>);
}


export default Editor;
