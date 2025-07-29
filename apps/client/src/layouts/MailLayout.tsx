import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from 'react-router';


export default function MailLayout() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
