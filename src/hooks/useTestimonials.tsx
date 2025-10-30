import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface Testimonial {
  id: string
  patient_name: string
  content: string
  rating: number | null
  photo_url: string | null
  active: boolean
  created_at: string
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os depoimentos",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
        .single()

      if (error) throw error

      setTestimonials(prev => [data, ...prev])
      toast({
        title: "Sucesso",
        description: "Depoimento criado com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao criar depoimento:', error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o depoimento",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(testimonial)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setTestimonials(prev => prev.map(t => t.id === id ? data : t))
      toast({
        title: "Sucesso",
        description: "Depoimento atualizado com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao atualizar depoimento:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o depoimento",
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTestimonials(prev => prev.filter(t => t.id !== id))
      toast({
        title: "Sucesso",
        description: "Depoimento excluído com sucesso!"
      })
    } catch (error) {
      console.error('Erro ao excluir depoimento:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o depoimento",
        variant: "destructive"
      })
      throw error
    }
  }

  const toggleTestimonialStatus = async (id: string, active: boolean) => {
    return updateTestimonial(id, { active })
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  return {
    testimonials,
    isLoading,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialStatus,
    refetch: fetchTestimonials
  }
}