import { FilePenLine, Inbox, MailWarning, Send, Star, Trash } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
