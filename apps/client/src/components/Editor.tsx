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
import { Tooltip,TooltipContent,TooltipTrigger } from "./ui/tooltip";

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
          <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>Heading</TooltipContent>
            </Tooltip>

            {/* Paragraph */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("paragraph")}
                  onPressedChange={() => editor.chain().focus().setParagraph().run()}
                >
                  <Pilcrow />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Paragraph</TooltipContent>
            </Tooltip>

            {/* Bold */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("bold")}
                  onPressedChange={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            {/* Italic */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("italic")}
                  onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            {/* Underline */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("underline")}
                  onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>

            {/* Alignments */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                >
                  <AlignLeft />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                >
                  <AlignCenter />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                >
                  <AlignRight />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>

            {/* Lists & Blockquote */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={editor.isActive("blockquote")}
                  onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                >
                  <Quote />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Blockquote</TooltipContent>
            </Tooltip>

            {/* Set Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle pressed={false} onPressedChange={handleOpenLinkDialog}>
                  <LinkIcon />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>

            {/* Unlink */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={hasLink ? "" : "opacity-50 cursor-not-allowed"}>
                <Toggle
                  pressed={false}
                  disabled={!hasLink}
                  onPressedChange={() => editor.chain().focus().unsetLink().run()}
                >
                  <Link2Off />
                </Toggle>
                 </div>
              </TooltipTrigger>
              <TooltipContent>Remove Link</TooltipContent>
            </Tooltip>

            {/* Clear Format */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  pressed={false}
                  onPressedChange={() =>
                    editor.chain().focus().unsetAllMarks().clearNodes().run()
                  }
                >
                  <Eraser />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Clear Format</TooltipContent>
            </Tooltip>
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
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            className="fixed bottom-6 left-51"
            pressed={showToolbar}
            onPressedChange={() => setShowToolbar(!showToolbar)}
          >
            <CaseSensitive />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent >Show/Hide Toolbar</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default Editor;
