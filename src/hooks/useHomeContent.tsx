import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export type HomeContent = {
  id: string
  hero_title: string
  hero_subtitle: string
  hero_image_url: string | null
  about_title: string
  about_content: string
  services_title: string
  services_subtitle: string
  testimonials_title: string
  contact_title: string
  contact_subtitle: string
  slide_enabled: boolean
  slide_images: SlideImage[]
  created_at: string
  updated_at: string
}

export type SlideImage = {
  id: string
  image_url: string
  title?: string
  description?: string
  link_url?: string
  link_text?: string
}

export function useHomeContent() {
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchHomeContent = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("home_content")
        .select("*")
        .maybeSingle()

      if (error) throw error
      
      // Parse JSON fields
      const parsedData = data ? {
        ...data,
        slide_images: Array.isArray(data.slide_images) 
          ? data.slide_images as SlideImage[]
          : JSON.parse((data.slide_images as string) || '[]') as SlideImage[]
      } : null
      
      setHomeContent(parsedData)
    } catch (error) {
      console.error("Error fetching home content:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar conteúdo da home",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateHomeContent = async (updates: Partial<Omit<HomeContent, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      if (!homeContent) {
        // Se não existe conteúdo, criar novo
        const { data, error } = await supabase
          .from("home_content")
          .insert({
            hero_title: updates.hero_title || 'Cuidado Médico de Excelência',
            hero_subtitle: updates.hero_subtitle || 'Oferecemos atendimento médico personalizado',
            ...updates
          })
          .select()
          .single()

        if (error) throw error
        
        // Parse JSON fields
        const parsedData = {
          ...data,
          slide_images: Array.isArray(data.slide_images) 
            ? data.slide_images as SlideImage[]
            : JSON.parse((data.slide_images as string) || '[]') as SlideImage[]
        }
        
        setHomeContent(parsedData)
        toast({
          title: "Sucesso",
          description: "Conteúdo da home criado com sucesso",
        })
        return parsedData
      }

      const { data, error } = await supabase
        .from("home_content")
        .update(updates)
        .eq("id", homeContent.id)
        .select()
        .single()

      if (error) throw error

      // Parse JSON fields
      const parsedData = {
        ...data,
        slide_images: Array.isArray(data.slide_images) 
          ? data.slide_images as SlideImage[]
          : JSON.parse((data.slide_images as string) || '[]') as SlideImage[]
      }

      setHomeContent(parsedData)
      toast({
        title: "Sucesso",
        description: "Conteúdo da home atualizado com sucesso",
      })

      return parsedData
    } catch (error) {
      console.error("Error updating home content:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar conteúdo da home",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchHomeContent()
  }, [])

  return {
    homeContent,
    loading,
    updateHomeContent,
    refetch: fetchHomeContent,
  }
}