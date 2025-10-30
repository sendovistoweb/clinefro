import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Users,
  Stethoscope,
  Calendar,
  MessageSquare,
  FileText,
  Star,
  Home,
  Menu,
  X,
  Building2,
  Settings,
  Palette
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/admin", 
    icon: Home,
    description: "Visão geral do sistema"
  },
  { 
    title: "Editar Home", 
    url: "/admin/home", 
    icon: Home,
    description: "Conteúdo da página inicial"
  },
  { 
    title: "Layout & Cores", 
    url: "/admin/layout", 
    icon: Palette,
    description: "Editor de layout, cores e rodapé"
  },
  { 
    title: "Páginas", 
    url: "/admin/paginas", 
    icon: FileText,
    description: "Editor de páginas estáticas"
  },
  { 
    title: "Especialidades", 
    url: "/admin/especialidades", 
    icon: Stethoscope,
    description: "Gerenciar especialidades médicas"
  },
  { 
    title: "Médicos", 
    url: "/admin/medicos", 
    icon: Users,
    description: "Gerenciar equipe médica"
  },
  { 
    title: "Agendamentos", 
    url: "/admin/agendamentos", 
    icon: Calendar,
    description: "Consultas agendadas"
  },
  { 
    title: "Blog", 
    url: "/admin/blog", 
    icon: FileText,
    description: "Posts e artigos"
  },
  { 
    title: "Mensagens", 
    url: "/admin/contato", 
    icon: MessageSquare,
    description: "Mensagens de contato"
  },
  { 
    title: "Depoimentos", 
    url: "/admin/depoimentos", 
    icon: Star,
    description: "Avaliações de pacientes"
  },
  { 
    title: "Informações", 
    url: "/admin/clinica", 
    icon: Building2,
    description: "Dados da clínica"
  },
  { 
    title: "Usuários", 
    url: "/admin/usuarios", 
    icon: Users,
    description: "Gerenciar usuários do sistema"
  },
]

export function AdminSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === path
    }
    return currentPath.startsWith(path)
  }

  const getNavClasses = (path: string) => {
    return isActive(path) 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground"
  }

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64 lg:w-72"} transition-all duration-300`}>
      <SidebarContent className="bg-card border-r">
        {/* Logo/Header */}
        <div className="p-3 lg:p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h2 className="font-semibold text-sm truncate">Clínica Médica</h2>
                <p className="text-xs text-muted-foreground">Painel Admin</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`h-11 sm:h-12 min-h-[44px] ${collapsed ? "justify-center" : "justify-start"}`}
                  >
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClasses(item.url)} min-h-[44px] flex items-center`}
                      title={collapsed ? `${item.title} - ${item.description}` : item.description}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col ml-3 min-w-0">
                          <span className="font-medium text-sm truncate">{item.title}</span>
                          <span className="text-xs opacity-70 hidden lg:block truncate">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
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