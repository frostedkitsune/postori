import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pen, Image, Link, Paperclip, CaseSensitive, Trash } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";
import { TagInput } from "./TagInput";

const LabelTag: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-row items-center gap-2 mb-2">
    <span className="w-12 text-zinc-400 mb-auto">{label}:</span>
    {children}
  </div>
);

export function Compose() {
  const [ccState, setCcState] = useState<boolean>(false);
  const [bccState, setBccState] = useState<boolean>(false);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">New Message</DialogTitle>
        </DialogHeader>

        {/* To + CC/BCC */}
        <LabelTag label="from">
          <span className="text-[12px] ">postori@error.party</span>
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
          <Input className="m-0 border-none outline-none focus:shadow-none shadow-none focus-visible:ring-0 font-semibold h-full"/>
        </LabelTag>

        <Textarea
          className="p-0 border-none outline-none focus:shadow-none shadow-none focus-visible:ring-0 max-h-48 min-h-32"
          placeholder="..."
        />

        <div className="flex items-center gap-2 mt-4">
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
