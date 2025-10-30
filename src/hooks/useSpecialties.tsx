import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface Specialty {
  id: string
  name: string
  description: string | null
  icon: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export const useSpecialties = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchSpecialties = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('specialties')
        .select('*')
        .order('name')

      if (error) throw error
      setSpecialties(data || [])
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as especialidades",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createSpecialty = async (specialty: Omit<Specialty, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('specialties')
        .insert([specialty])
        .select()
        .single()

      if (error) throw error

      setSpecialties(prev => [...prev, data])
      toast({
        title: "Sucesso",
        description: "Especialidade criada com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao criar especialidade:', error)
      toast({
        title: "Erro",
        description: "Não foi possível criar a especialidade",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateSpecialty = async (id: string, specialty: Partial<Specialty>) => {
    try {
      const { data, error } = await supabase
        .from('specialties')
        .update(specialty)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setSpecialties(prev => prev.map(s => s.id === id ? data : s))
      toast({
        title: "Sucesso",
        description: "Especialidade atualizada com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao atualizar especialidade:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a especialidade",
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteSpecialty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('specialties')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSpecialties(prev => prev.filter(s => s.id !== id))
      toast({
        title: "Sucesso",
        description: "Especialidade excluída com sucesso!"
      })
    } catch (error) {
      console.error('Erro ao excluir especialidade:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a especialidade",
        variant: "destructive"
      })
      throw error
    }
  }

  useEffect(() => {
    fetchSpecialties()
  }, [])

  return {
    specialties,
    isLoading,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    refetch: fetchSpecialties
  }
}