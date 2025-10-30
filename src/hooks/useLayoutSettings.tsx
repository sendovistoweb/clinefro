import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export type MenuItem = {
  name: string
  href: string
  visible: boolean
}

export type FooterHour = {
  day: string
  hours: string
}

export type FooterContactInfo = {
  address: string
  city: string
  phone: string
  email: string
}

export type LayoutSettings = {
  id: string
  logo_url: string | null
  site_name: string
  menu_items: MenuItem[]
  contact_button_text: string
  contact_button_link: string
  appointment_button_text: string
  appointment_button_link: string
  show_contact_button: boolean
  show_appointment_button: boolean
  footer_description: string | null
  show_footer_hours: boolean
  show_footer_contact: boolean
  show_footer_links: boolean
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  card_color: string
  footer_hours: FooterHour[]
  footer_contact_info: FooterContactInfo
  created_at: string
  updated_at: string
}

export function useLayoutSettings() {
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchLayoutSettings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("layout_settings")
        .select("*")
        .maybeSingle()

      if (error) throw error
      if (data) {
        setLayoutSettings({
          ...data,
          menu_items: Array.isArray(data.menu_items) ? data.menu_items as MenuItem[] : JSON.parse(data.menu_items as string),
          footer_hours: Array.isArray(data.footer_hours) ? data.footer_hours as FooterHour[] : JSON.parse(data.footer_hours as string),
          footer_contact_info: typeof data.footer_contact_info === 'object' ? data.footer_contact_info as FooterContactInfo : JSON.parse(data.footer_contact_info as string)
        })
      }
    } catch (error) {
      console.error("Error fetching layout settings:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar configurações do layout",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateLayoutSettings = async (updates: Partial<Omit<LayoutSettings, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      if (!layoutSettings) return

      const { data, error } = await supabase
        .from("layout_settings")
        .update(updates)
        .eq("id", layoutSettings.id)
        .select()
        .single()

      if (error) throw error

      if (data) {
        setLayoutSettings({
          ...data,
          menu_items: Array.isArray(data.menu_items) ? data.menu_items as MenuItem[] : JSON.parse(data.menu_items as string),
          footer_hours: Array.isArray(data.footer_hours) ? data.footer_hours as FooterHour[] : JSON.parse(data.footer_hours as string),
          footer_contact_info: typeof data.footer_contact_info === 'object' ? data.footer_contact_info as FooterContactInfo : JSON.parse(data.footer_contact_info as string)
        })
      }
      toast({
        title: "Sucesso",
        description: "Configurações do layout atualizadas com sucesso",
      })

      return data
    } catch (error) {
      console.error("Error updating layout settings:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar configurações do layout",
        variant: "destructive",
      })
      throw error
    }
  }

  const uploadLogo = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath)

      await updateLayoutSettings({ logo_url: publicUrl })

      return publicUrl
    } catch (error) {
      console.error("Error uploading logo:", error)
      toast({
        title: "Erro",
        description: "Erro ao fazer upload do logo",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchLayoutSettings()
  }, [])

  return {
    layoutSettings,
    loading,
    updateLayoutSettings,
    uploadLogo,
    refetch: fetchLayoutSettings,
  }
}