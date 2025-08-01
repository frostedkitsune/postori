import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback, { logError } from "@/components/ErrorFallback";


export default function MailLayout() {

  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "200px",
      } as React.CSSProperties
    }>
      <AppSidebar />
      <main className="w-full flex">
        <ErrorBoundary fallback={<ErrorFallback />} onError={logError}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </SidebarProvider>
  )
}
