import PageHeader from "@/components/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Archive, Funnel, MailCheck, RotateCw, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";


interface MailListProps {
  pageName: string;
}

interface Mail {
  id: string;
  name: string;
  headshot: string;
  msg: string;
  checked: boolean;
}

const demoMails: Mail[] = [
  { id: "4c8f6d82-e4c6-4478-92eb-d9342500f006", name: "Postori Team", headshot: "", msg: "Welcome to postori", checked: false },
  { id: "331541d6-617d-4464-b7d0-9b346b87f41c", name: "Next Pointer", headshot: "nextpointer", msg: "Let's Connect", checked: false }
];

export default function MailList({ pageName }: MailListProps) {
  const [mails, setMails] = useState<Mail[]>(demoMails);
  const [allMailsChecked, setAllMailsChecked] = useState(false);

  useEffect(() => {
    setMails((mails) => {
      return mails.map((mail) => {
        return { ...mail, checked: allMailsChecked }
      })
    })
  }, [allMailsChecked]);

  return (
    <div className="w-[50%] outline">
      <PageHeader heading={pageName} />
      <MailListControls setAllMailsChecked={setAllMailsChecked} />
      {
        mails.map((mail: Mail) => (
          <MailCard key={mail.id} mail={mail} setMails={setMails} />
        ))
      }
    </div>
  )
}

interface MailListControlsProps {
  setAllMailsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function MailListControls({ setAllMailsChecked }: MailListControlsProps) {
  return (
    <div className="px-4 py-2 flex gap-6 items-center border-b-1">
      <Checkbox onClick={() => setAllMailsChecked((allMailsChecked) => !allMailsChecked)} />
      <RotateCw className="text-muted-foreground" size={16} />
      <Select defaultValue={"all"}>
        <SelectTrigger className="w-fit border-none shadow-none focus-visible:ring-0">
          <Funnel />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filters</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

interface MailCardProps {
  mail: Mail;
  setMails: React.Dispatch<React.SetStateAction<Mail[]>>;
}

function MailCard({ mail, setMails }: MailCardProps) {

  const handleCheckedChange = () => {
    setMails(mails => mails.map((m) => {
      if (m.id != mail.id) return m;
      return { ...m, checked: !m.checked }
    }))
  }

  return (
    <div className="group px-4 py-4 flex items-center gap-4 border-b-1">
      <Checkbox
        onClick={handleCheckedChange}
        checked={mail.checked} />
      <Avatar className="rounded-sm">
        <AvatarImage src={`https://github.com/${mail.headshot}.png`} />
        <AvatarFallback className="rounded-sm bg-amber-300 text-amber-700">
          {mail.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="w-30 text-sm font-semibold text-muted-foreground">{mail.name}</div>
      <div className="w-36 text-sm text-muted-foreground">{mail.msg}</div>

      <div className="ml-auto flex gap-2 transition-opacity opacity-0 duration-75
                  group-hover:opacity-100 group-hover:duration-700 *:text-muted-foreground">
        <MailCheck size={16} />
        <Archive size={16} />
        <Trash size={16} />
      </div>
    </div>
  )
}
