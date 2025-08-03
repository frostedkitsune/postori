import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Heading,
  Link as LinkIcon,
  Eraser,
  CaseSensitive
} from "lucide-react";


import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const Editor: React.FC<{
  content: string;
  setHtml: (html: string) => void;
  setPlainText: (text: string) => void;
}> = ({ content, setHtml, setPlainText }) => {

  // for toogle the toolbar
  const [showToolbar, setShowToolbar] = useState(false);

  // tiptap editor config
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      BulletList,
      OrderedList,
      Blockquote,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
      setPlainText(editor.getText());
    },
  });

  // checks
  if (!editor) return null;

  return (
    <div className="relative max-h-[350px] min-h-48 p-1 overflow-y-scroll text-sm pb-14 cursor-text">
      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Floating Toolbar */}
      {showToolbar && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2
          bg-background/30 backdrop-blur-md shadow-lg p-1 rounded-xl border border-white/20 z-50">


          {/* Headings Selector */}
          <Select
            onValueChange={(value) => {
              editor.chain().focus().toggleHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={ <Heading/>} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  H{level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/*bold*/}
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </Toggle>

          {/*italic*/}
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </Toggle>

          {/*underline*/}
          <Toggle
            pressed={editor.isActive("underline")}
            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon />
          </Toggle>

          {/*left align*/}
          <Toggle
            pressed={editor.isActive({ textAlign: "left" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft />
          </Toggle>

          {/*center align*/}
          <Toggle
            pressed={editor.isActive({ textAlign: "center" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter />
          </Toggle>

          {/*right align*/}
          <Toggle
            pressed={editor.isActive({ textAlign: "right" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight />
          </Toggle>

          {/*unorder*/}
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List />
          </Toggle>

          {/*order*/}
          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered />
          </Toggle>

          {/*quote*/}
          <Toggle
            pressed={editor.isActive("blockquote")}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote />
          </Toggle>

          {/*link*/}
          <Toggle
            pressed={editor.isActive("link")}
            onPressedChange={() => {
              const url = window.prompt("Enter URL");
              if (url) {
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }
            }}
          >
            <LinkIcon />
          </Toggle>

          {/*remove format*/}
          <Toggle
            pressed={false}
            onPressedChange={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          >
            <Eraser />
          </Toggle>
        </div>
      )}

      {/* Show/Hide button */}
      <Toggle
        className="fixed bottom-6 left-64"
        pressed={showToolbar}
        onPressedChange={() => setShowToolbar(!showToolbar)}
        >
        <CaseSensitive />
      </Toggle>
    </div>
  );
};

export default Editor;
