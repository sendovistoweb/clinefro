import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface Doctor {
  id: string
  name: string
  specialty_id: string | null
  crm: string
  bio: string | null
  photo_url: string | null
  education: string[] | null
  experience: string[] | null
  available_days: string[] | null
  available_hours: string | null
  created_at: string
  updated_at: string
}

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchDoctors = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('name')

      if (error) throw error
      setDoctors(data || [])
    } catch (error) {
      console.error('Erro ao buscar médicos:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os médicos",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createDoctor = async (doctor: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .insert([doctor])
        .select()
        .single()

      if (error) throw error

      setDoctors(prev => [...prev, data])
      toast({
        title: "Sucesso",
        description: "Médico criado com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao criar médico:', error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o médico",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateDoctor = async (id: string, doctor: Partial<Doctor>) => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .update(doctor)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setDoctors(prev => prev.map(d => d.id === id ? data : d))
      toast({
        title: "Sucesso",
        description: "Médico atualizado com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao atualizar médico:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o médico",
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteDoctor = async (id: string) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', id)

      if (error) throw error

      setDoctors(prev => prev.filter(d => d.id !== id))
      toast({
        title: "Sucesso",
        description: "Médico excluído com sucesso!"
      })
    } catch (error) {
      console.error('Erro ao excluir médico:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o médico",
        variant: "destructive"
      })
      throw error
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  return {
    doctors,
    isLoading,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    refetch: fetchDoctors
  }
}