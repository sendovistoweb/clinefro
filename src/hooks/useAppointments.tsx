import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const logActivity = async (action: string, entityType: string, description: string, entityId?: string) => {
  try {
    await supabase
      .from('admin_activity_logs')
      .insert([{
        action,
        entity_type: entityType,
        entity_id: entityId,
        description,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
  } catch (error) {
    console.error('Erro ao registrar atividade:', error)
  }
}

export interface Appointment {
  id: string
  doctor_id: string
  specialty_id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  patient_cpf: string | null
  appointment_date: string
  appointment_time: string
  notes: string | null
  status: string
  created_at: string
  updated_at: string
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchAppointments = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: false })

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os agendamentos",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointment])
        .select()
        .single()

      if (error) throw error

      setAppointments(prev => [data, ...prev])
      toast({
        title: "Sucesso",
        description: "Agendamento criado com sucesso!"
      })
      
      // Log da atividade
      await logActivity(
        'CREATE',
        'appointment',
        `Agendamento criado para ${appointment.patient_name}`,
        data.id
      )
      
      return data
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o agendamento",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(appointment)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setAppointments(prev => prev.map(a => a.id === id ? data : a))
      toast({
        title: "Sucesso",
        description: "Agendamento atualizado com sucesso!"
      })
      
      // Log da atividade
      await logActivity(
        'UPDATE',
        'appointment',
        `Agendamento atualizado para ${data.patient_name}`,
        id
      )
      
      return data
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o agendamento",
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)

      if (error) throw error

      setAppointments(prev => prev.filter(a => a.id !== id))
      toast({
        title: "Sucesso",
        description: "Agendamento excluído com sucesso!"
      })
      
      // Log da atividade
      await logActivity(
        'DELETE',
        'appointment',
        `Agendamento excluído`,
        id
      )
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o agendamento",
        variant: "destructive"
      })
      throw error
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    isLoading,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    refetch: fetchAppointments
  }
}