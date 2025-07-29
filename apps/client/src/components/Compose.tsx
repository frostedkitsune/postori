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

const LabelTag: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-row items-center gap-2 mb-2">
    <span className="w-12 text-zinc-400">{label}:</span>
    <div className="flex-1">{children}</div>
  </div>
);

export function Compose() {
  const [ccState, setCcState] = useState<boolean>(false);
  const [bccState, setBccState] = useState<boolean>(false);
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
        <div className="flex flex-row items-start gap-2">
          <div className="flex-1">
            <LabelTag label="to">
              <div className="">

              </div>
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

          </LabelTag></>
        }
        {
          bccState && <><LabelTag label="bcc">

          </LabelTag></>
        }
        <LabelTag label="from">
          <div>

          </div>
        </LabelTag>

        <LabelTag label="subject">
          <Input className="m-0 border-none outline-none focus:shadow-none resize-none shadow-none focus-visible:ring-0 font-semibold h-full"/>
        </LabelTag>

        <Textarea
          className="p-0 border-none outline-none focus:shadow-none resize-none shadow-none focus-visible:ring-0 max-h-48 min-h-32"
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
          <Button variant="ghost" className="text-red-500 ml-auto">
            <Trash />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
