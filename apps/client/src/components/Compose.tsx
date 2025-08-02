import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pen, Image, Link, Paperclip, CaseSensitive, Trash, Minimize2, Maximize2 } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { TagInput } from "./TagInput";
import Editor from "./Editor";

const LabelTag: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-row items-start gap-2 mb-2">
    <span className="w-12 text-zinc-400 mb-auto">{label}:</span>
    {children}
  </div>
);

export function Compose() {
  const [ccState, setCcState] = useState<boolean>(false);
  const [bccState, setBccState] = useState<boolean>(false);

  // for maximize minmize state
  const [maximized, setMaximized] = useState(false);

  // state for tags
  const [toEmails, setToEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [bccEmails, setBccEmails] = useState<string[]>([]);
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Pen className="mr-2" /> Compose
        </Button>
      </DialogTrigger>
      <DialogContent className={`${maximized ? "min-w-[90vw] h-[90vh] max-w-none" : "sm:max-w-xl"} flex flex-col justify-start`} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="mb-2">New Message</DialogTitle>
        </DialogHeader>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setMaximized(!maximized)}
            className="p-1 rounded hover:bg-accent">
                {maximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <DialogClose className="p-1 rounded hover:bg-accent">
            <span className="sr-only">Close</span>
                ✕
          </DialogClose>
        </div>

        {/* To + CC/BCC */}
        <LabelTag label="from">
          <span className="text-[12px] py-1">postori@error.party</span>
        </LabelTag>
        <div className="flex flex-row items-start gap-2">
          <div className="flex-1">
            <LabelTag label="to">
              <TagInput value={toEmails} onChange={setToEmails}/>
            </LabelTag>
          </div>
          <div className="flex flex-row gap-1 h-full">
            {!ccState && <Button variant="ghost" size="sm" onClick={() => setCcState(true)}>
              CC
            </Button>}
            {!bccState && <Button variant="ghost" size="sm" onClick={() => setBccState(true)}>
              BCC
            </Button>}
          </div>
        </div>
        {
          ccState && <><LabelTag label="cc">
            <TagInput value={ccEmails} onChange={setCcEmails}/>
          </LabelTag></>
        }
        {
          bccState && <><LabelTag label="bcc">
            <TagInput value={bccEmails} onChange={setBccEmails}/>
          </LabelTag></>
        }

        <LabelTag label="subject">
          <Input className=" border-none outline-none focus:shadow-none shadow-none focus-visible:ring-0 font-semibold pb-4"/>
        </LabelTag>

        {/*Editor*/}
        <Editor/>

        <div className="flex items-center gap-2 mt-auto">
          <Button>Send</Button>
          <Button variant="ghost">
            <CaseSensitive />
          </Button>
          <Button variant="ghost">
            <Image />
          </Button>
          <Button variant="ghost">
            <Link />
          </Button>
          <Button variant="ghost">
            <Paperclip />
          </Button>
          <Button variant="ghost" className="text-destructive ml-auto">
            <Trash />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
