import {
  FilePenLine,
  Inbox,
  MailWarning,
  Send,
  Settings,
  Star,
  Trash,
} from "lucide-react";

import { Link, useLocation } from "react-router";
import Compose from "@/components/Compose";
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
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Compose />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.includes(item.url)}
                    className="text-sm data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                  >
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
  );
}
