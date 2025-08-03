import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Tooltip,TooltipTrigger,TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Pen, Image, Paperclip, Trash, Minimize2, Maximize2 } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { TagInput } from "./TagInput";
import Editor from "./Editor";

// this component is for wrap the emails and label
const LabelTag: React.FC<{ label: string; children?: React.ReactNode; handlerForHideCcBcc?():void }> = ({
  label,
  children,
  handlerForHideCcBcc
}) => (
  <div className="flex flex-row items-start gap-2 mb-2" onClick={handlerForHideCcBcc}>
    <span className="w-12 text-zinc-400 mb-auto">{label}:</span>
    {children}
  </div>
);

// main component
const Compose=()=>{
  const [ccState, setCcState] = useState<boolean>(false);
  const [bccState, setBccState] = useState<boolean>(false);

  // for maximize minmize state
  const [maximized, setMaximized] = useState(false);

  // state for tags
  const [toEmails, setToEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [bccEmails, setBccEmails] = useState<string[]>([]);

  // for content
  const [, setHtml] = useState<string>("");
  const [, setPlainText] = useState<string>("");

  // handler for hide (cc+bcc)
  function hideCheckCcBcc() {
    setCcState(ccEmails.length > 0);
    setBccState(bccEmails.length > 0);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Pen className="mr-2" /> Compose
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${maximized ? "min-w-[90vw] h-[90vh] max-w-none" : "sm:max-w-3xl sm:min-h-[90vh"} flex flex-col justify-start`} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="mb-2">New Message</DialogTitle>
        </DialogHeader>
        <div className="absolute top-4 right-4 flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setMaximized(!maximized)}
                className="p-1 rounded hover:bg-accent"
              >
                {maximized ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {maximized ? "Minimize" : "Maximize"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DialogClose className="p-1 rounded hover:bg-accent">
                <span className="sr-only">Close</span>
                ✕
              </DialogClose>
            </TooltipTrigger>
            <TooltipContent side="top">Close</TooltipContent>
          </Tooltip>
        </div>

        {/*From + To + CC/BCC */}
        {/*from*/}
        <LabelTag label="from">
          <span className="text-[12px] py-1">postori@error.party</span>
        </LabelTag>
        <div className="flex flex-row items-start gap-2">
          <div className="flex-1">
            {/*to*/}
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
        {/*cc*/}
        {
          ccState && <><LabelTag label="cc">
            <TagInput value={ccEmails} onChange={setCcEmails}/>
          </LabelTag></>
        }
        {/*bcc*/}
        {
          bccState && <><LabelTag label="bcc">
            <TagInput value={bccEmails} onChange={setBccEmails}/>
          </LabelTag></>
        }

        {/*subject*/}
        <LabelTag label="subject" handlerForHideCcBcc={hideCheckCcBcc}>
          <Input className=" border-none outline-none focus:shadow-none shadow-none focus-visible:ring-0 font-semibold pb-4"/>
        </LabelTag>

        {/*Editor*/}
        <Editor
        content=""
        setHtml={setHtml}
        setPlainText={setPlainText}/>

        {/*footer*/}
        <div className="flex items-center gap-2 mt-auto">
          <Button className="mr-2">Send</Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Image />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Insert Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Paperclip />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild >
              <Button variant="ghost" className="text-destructive ml-auto">
                <Trash />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Reset Draft</TooltipContent>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Compose;
