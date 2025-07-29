import  { Dialog, DialogTrigger, DialogContent, DialogTitle,DialogHeader } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pen, Image, Link, Paperclip, CaseSensitive, Trash } from "lucide-react";


export function Compose (){
  return (
    <>
      <Dialog>
        <DialogTrigger><Button>
          <Pen /> Compose
        </Button></DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="">

          </div>
          <div className="h-16 w-full flex justify-start items-center gap-2">
              <Button>send</Button>
              <Button variant={"ghost"} ><CaseSensitive /></Button>
              <Button variant={"ghost"}><Image /></Button>
              <Button variant={"ghost"}><Link /></Button>
              <Button variant={"ghost"}><Paperclip /></Button>
              <Button variant={"ghost"} className=" text-red-500 ml-auto"><Trash /></Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
