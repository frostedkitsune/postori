import { FilePenLine, Inbox, MailWarning, Send, Settings, Star, Trash } from "lucide-react";;
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";;
import { Link, useLocation, useLocation } from "react-router";;

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
  },
  {
    title: "Setting",
    url: "settings",
    icon: Settings,
  }
];


export function AppSidebar() {
  let { pathname } = useLocation();
  let path = pathname.split("/")[2];

  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname.includes(item.url)} className="text-sm data-[active=true]:bg-primary data-[active=true]:text-primary-foreground">
                    <Link to={item.url} className="">
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
