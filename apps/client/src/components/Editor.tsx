"use client";

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
  Link2Off,
  Eraser,
  CaseSensitive,
  Pilcrow,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Editor: React.FC<{
  content: string;
  setHtml: (html: string) => void;
  setPlainText: (text: string) => void;
}> = ({ content, setHtml, setPlainText }) => {

  // for style toolbar
  const [showToolbar, setShowToolbar] = useState(false);
  // for link dialog open or close
  const [openLinkDialog, setOpenLinkDialog] = useState(false);
  // for set link
  const [linkUrl, setLinkUrl] = useState("");

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
        autolink: true,
        defaultProtocol: "https",
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

  // handler for link dialog
  const handleOpenLinkDialog = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setOpenLinkDialog(true);
  };

  // check link is there or not
  const hasLink = editor.isActive("link") || !!editor.getAttributes("link").href;

  return (
    <div className="relative max-h-[350px] min-h-48 p-1 overflow-y-scroll text-sm pb-14 cursor-text">
      <EditorContent editor={editor} />

      {showToolbar && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2
          bg-background/30 backdrop-blur-md shadow-lg p-1 rounded-xl border border-white/20 z-50"
        >
          {/* Headings */}
          <Select
            onValueChange={(value) => {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 })
                .run();
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={<Heading />} />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  H{level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Paragraph Mode */}
          <Toggle
            pressed={editor.isActive("paragraph")}
            onPressedChange={() => editor.chain().focus().setParagraph().run()}
          >
            <Pilcrow />
          </Toggle>

          {/* Bold */}
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </Toggle>

          {/* Italic */}
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </Toggle>

          {/* Underline */}
          <Toggle
            pressed={editor.isActive("underline")}
            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon />
          </Toggle>

          {/* Alignments */}
          <Toggle
            pressed={editor.isActive({ textAlign: "left" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft />
          </Toggle>
          <Toggle
            pressed={editor.isActive({ textAlign: "center" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter />
          </Toggle>
          <Toggle
            pressed={editor.isActive({ textAlign: "right" })}
            onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight />
          </Toggle>

          {/* Lists & Blockquote */}
          <Toggle
            pressed={editor.isActive("bulletList")}
            onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List />
          </Toggle>
          <Toggle
            pressed={editor.isActive("orderedList")}
            onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered />
          </Toggle>
          <Toggle
            pressed={editor.isActive("blockquote")}
            onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote />
          </Toggle>

          {/* Set Link */}
          <Toggle pressed={false} onPressedChange={handleOpenLinkDialog}>
            <LinkIcon />
          </Toggle>

          {/* Unlink */}
          <Toggle
            pressed={false}
            disabled={!hasLink}
            onPressedChange={() => editor.chain().focus().unsetLink().run()}
          >
            <Link2Off />
          </Toggle>

          {/* Clear Format */}
          <Toggle
            pressed={false}
            onPressedChange={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
          >
            <Eraser />
          </Toggle>
        </div>
      )}

      {/* Link Dialog */}
      <Dialog open={openLinkDialog} onOpenChange={setOpenLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Link</DialogTitle>
            <DialogDescription>
              Enter the URL for the selected text.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => {
                if (linkUrl.trim() === "") {
                  editor.chain().focus().unsetLink().run();
                } else {
                  editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
                }
                setOpenLinkDialog(false);
                setLinkUrl("");
              }}
            >
              Save Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*toolbar toggle*/}
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
