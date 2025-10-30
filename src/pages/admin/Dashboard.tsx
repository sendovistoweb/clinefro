import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, MessageSquare, Stethoscope, Star, Activity, Eye, UserCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDashboardStats } from "@/hooks/useDashboardStats"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton"


export default function Dashboard() {
  const navigate = useNavigate()
  const { stats, recentActivities, isLoading } = useDashboardStats()

  const statsCards = [
    {
      title: "Total de Médicos",
      value: isLoading ? "..." : stats.totalDoctors.toString(),
      description: "Equipe médica ativa",
      icon: Users,
      color: "bg-blue-500",
      route: "/admin/medicos"
    },
    {
      title: "Agendamentos Hoje",
      value: isLoading ? "..." : stats.todayAppointments.toString(),
      description: "Consultas marcadas",
      icon: Calendar,
      color: "bg-green-500",
      route: "/admin/agendamentos"
    },
    {
      title: "Posts no Blog",
      value: isLoading ? "..." : stats.totalBlogPosts.toString(),
      description: "Artigos publicados",
      icon: FileText,
      color: "bg-purple-500",
      route: "/admin/blog"
    },
    {
      title: "Mensagens",
      value: isLoading ? "..." : stats.totalMessages.toString(),
      description: "Novas mensagens",
      icon: MessageSquare,
      color: "bg-orange-500",
      route: "/admin/contato"
    },
    {
      title: "Especialidades",
      value: isLoading ? "..." : stats.totalSpecialties.toString(),
      description: "Áreas de atendimento",
      icon: Stethoscope,
      color: "bg-cyan-500",
      route: "/admin/especialidades"
    },
    {
      title: "Depoimentos",
      value: isLoading ? "..." : stats.totalTestimonials.toString(),
      description: "Avaliações de pacientes",
      icon: Star,
      color: "bg-yellow-500",
      route: "/admin/depoimentos"
    },
    {
      title: "Usuários do Sistema",
      value: isLoading ? "..." : stats.totalUsers.toString(),
      description: "Total de usuários",
      icon: UserCheck,
      color: "bg-indigo-500",
      route: "/admin/usuarios"
    },
    {
      title: "Acessos ao Site",
      value: isLoading ? "..." : stats.siteVisits.toString(),
      description: "Visitas registradas",
      icon: Eye,
      color: "bg-teal-500",
      route: "/admin"
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral do sistema de gerenciamento da clínica
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-md transition-shadow cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(stat.route)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>
                Últimas ações realizadas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="w-2 h-2 rounded-full" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                      <Skeleton className="h-3 w-8" />
                    </div>
                  ))
                ) : recentActivities.length > 0 ? (
                  recentActivities.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {activity.profiles?.full_name || 'Sistema'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(activity.created_at), 'HH:mm', { locale: ptBR })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma atividade recente encontrada
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Gerais</CardTitle>
              <CardDescription>
                Resumo dos dados do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Total de Agendamentos</span>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-4 w-8" />
                  ) : (
                    <span className="font-medium">{stats.totalAppointments}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Usuários Cadastrados</span>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-4 w-8" />
                  ) : (
                    <span className="font-medium">{stats.totalUsers}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Visitas ao Site</span>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-4 w-8" />
                  ) : (
                    <span className="font-medium">{stats.siteVisits}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Depoimentos Ativos</span>
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-4 w-8" />
                  ) : (
                    <span className="font-medium">{stats.totalTestimonials}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}