import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export type ClinicInfo = {
  id: string
  name: string
  cnpj: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  logo_url: string | null
  description: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export function useClinicInfo() {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchClinicInfo = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("clinic_info")
        .select("*")
        .maybeSingle()

      if (error) throw error
      setClinicInfo(data)
    } catch (error) {
      console.error("Error fetching clinic info:", error)
      // Não mostrar erro se for apenas ausência de dados
      if (error.code !== 'PGRST116') {
        toast({
          title: "Erro",
          description: "Erro ao carregar informações da clínica",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const updateClinicInfo = async (updates: Partial<Omit<ClinicInfo, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      let result

      if (!clinicInfo) {
        // Se não existe info da clínica, criar nova
        const insertData = {
          name: updates.name || 'Clínica Médica',
          ...updates
        }
        
        const { data, error } = await supabase
          .from("clinic_info")
          .insert(insertData)
          .select()
          .single()

        if (error) throw error
        result = data
      } else {
        // Se existe, atualizar
        const { data, error } = await supabase
          .from("clinic_info")
          .update(updates)
          .eq("id", clinicInfo.id)
          .select()
          .maybeSingle()

        if (error) throw error
        
        if (!data) {
          // Se o update não retornou dados, pode ser que o registro foi deletado
          // Tentar criar novo
          const insertData = {
            name: updates.name || 'Clínica Médica',
            ...updates
          }
          
          const { data: newData, error: insertError } = await supabase
            .from("clinic_info")
            .insert(insertData)
            .select()
            .single()

          if (insertError) throw insertError
          result = newData
        } else {
          result = data
        }
      }

      setClinicInfo(result)
      toast({
        title: "Sucesso",
        description: "Informações da clínica atualizadas com sucesso",
      })

      return result
    } catch (error) {
      console.error("Error updating clinic info:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar informações da clínica",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchClinicInfo()
  }, [])

  return {
    clinicInfo,
    loading,
    updateClinicInfo,
    refetch: fetchClinicInfo,
  }
}