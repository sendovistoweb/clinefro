import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b bg-card px-2 sm:px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <SidebarTrigger className="shrink-0" />
              <div className="min-w-0 hidden sm:block">
                <h1 className="text-lg font-semibold truncate">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground hidden md:block">Sistema de gerenciamento da clínica</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}