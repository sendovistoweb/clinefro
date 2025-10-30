import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface DashboardStats {
  totalDoctors: number
  totalAppointments: number
  todayAppointments: number
  totalBlogPosts: number
  totalMessages: number
  totalSpecialties: number
  totalTestimonials: number
  totalUsers: number
  siteVisits: number
}

export interface ActivityLog {
  id: string
  action: string
  entity_type: string
  description: string
  created_at: string
  user_id?: string
  profiles?: {
    full_name: string
  } | null
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalDoctors: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    totalBlogPosts: 0,
    totalMessages: 0,
    totalSpecialties: 0,
    totalTestimonials: 0,
    totalUsers: 0,
    siteVisits: 0
  })
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      
      // Buscar todas as estatísticas em paralelo
      const [
        doctorsResult,
        appointmentsResult,
        todayAppointmentsResult,
        blogPostsResult,
        messagesResult,
        specialtiesResult,
        testimonialsResult,
        usersResult,
        analyticsResult
      ] = await Promise.all([
        supabase.from('doctors').select('id', { count: 'exact' }),
        supabase.from('appointments').select('id', { count: 'exact' }),
        supabase.from('appointments').select('id', { count: 'exact' }).eq('appointment_date', new Date().toISOString().split('T')[0]),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('status', 'unread'),
        supabase.from('specialties').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }).eq('active', true),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('site_analytics').select('id', { count: 'exact' })
      ])

      setStats({
        totalDoctors: doctorsResult.count || 0,
        totalAppointments: appointmentsResult.count || 0,
        todayAppointments: todayAppointmentsResult.count || 0,
        totalBlogPosts: blogPostsResult.count || 0,
        totalMessages: messagesResult.count || 0,
        totalSpecialties: specialtiesResult.count || 0,
        totalTestimonials: testimonialsResult.count || 0,
        totalUsers: usersResult.count || 0,
        siteVisits: analyticsResult.count || 0
      })

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as estatísticas",
        variant: "destructive"
      })
    }
  }

  const fetchRecentActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_activity_logs')
        .select(`
          id,
          action,
          entity_type,
          description,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      
      // Buscar nomes dos usuários separadamente
      const activitiesWithProfiles = await Promise.all(
        (data || []).map(async (activity) => {
          if (activity.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('user_id', activity.user_id)
              .single()
            
            return {
              ...activity,
              profiles: profile ? { full_name: profile.full_name } : null
            }
          }
          return {
            ...activity,
            profiles: null
          }
        })
      )
      
      setRecentActivities(activitiesWithProfiles)
    } catch (error) {
      console.error('Erro ao buscar atividades recentes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const logActivity = async (action: string, entityType: string, description: string, entityId?: string) => {
    try {
      await supabase
        .from('admin_activity_logs')
        .insert([{
          action,
          entity_type: entityType,
          entity_id: entityId,
          description
        }])
    } catch (error) {
      console.error('Erro ao registrar atividade:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchStats(), fetchRecentActivities()])
    }
    loadData()
  }, [])

  return {
    stats,
    recentActivities,
    isLoading,
    logActivity,
    refetch: () => Promise.all([fetchStats(), fetchRecentActivities()])
  }
}