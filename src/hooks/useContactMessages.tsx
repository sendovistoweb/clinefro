import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  created_at: string
}

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as mensagens",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setMessages(prev => prev.map(m => m.id === id ? data : m))
      toast({
        title: "Sucesso",
        description: "Status da mensagem atualizado!"
      })
      return data
    } catch (error) {
      console.error('Erro ao atualizar mensagem:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a mensagem",
        variant: "destructive"
      })
      throw error
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessages(prev => prev.filter(m => m.id !== id))
      toast({
        title: "Sucesso",
        description: "Mensagem excluída com sucesso!"
      })
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a mensagem",
        variant: "destructive"
      })
      throw error
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return {
    messages,
    isLoading,
    updateMessageStatus,
    deleteMessage,
    refetch: fetchMessages
  }
}