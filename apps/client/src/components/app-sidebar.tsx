import { FilePenLine, Inbox, MailWarning, Send, Star, Trash } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

// Menu items.
const items = [
  {
    title: "Inbox",
    url: "inbox",
    icon: Inbox,
  },
  {
    title: "Starred",
    url: "starred",
    icon: Star,
  },
  {
    title: "Draft",
    url: "drafts",
    icon: FilePenLine,
  },
  {
    title: "Sent",
    url: "sent",
    icon: Send,
  },
  {
    title: "Spam",
    url: "spam",
    icon: MailWarning,
  },
  {
    title: "Trash",
    url: "trash",
    icon: Trash,
  }
];


export function AppSidebar() {
  let { pathname } = useLocation();
  let path = pathname.split("/")[2];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={
                    item.url == path ?
                      "bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary hover:text-primary-foreground"
                      :
                      "text-muted-foreground"
                  }>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
