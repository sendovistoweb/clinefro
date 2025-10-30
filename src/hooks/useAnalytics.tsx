import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

export const useAnalytics = () => {
  const trackPageView = async (pagePath: string) => {
    try {
      // Gerar session ID único para o usuário
      let sessionId = localStorage.getItem('analytics_session')
      if (!sessionId) {
        sessionId = crypto.randomUUID()
        localStorage.setItem('analytics_session', sessionId)
      }

      await supabase
        .from('site_analytics')
        .insert([{
          page_path: pagePath,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          session_id: sessionId
        }])
    } catch (error) {
      console.error('Erro ao registrar analytics:', error)
    }
  }

  // Registrar visita da página atual quando o hook for usado
  useEffect(() => {
    trackPageView(window.location.pathname)
  }, [])

  return {
    trackPageView
  }
}