-- Criar tabela para rastreamento de analytics do site
CREATE TABLE public.site_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para logs de atividades do admin
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  description TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies para site_analytics (apenas inserção pública)
CREATE POLICY "Qualquer um pode registrar analytics" 
ON public.site_analytics 
FOR INSERT 
WITH CHECK (true);

-- Policies para admin_activity_logs (apenas admins podem ver)
CREATE POLICY "Apenas admins podem ver logs de atividade" 
ON public.admin_activity_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() 
  AND role = 'admin'
));

CREATE POLICY "Sistema pode criar logs de atividade" 
ON public.admin_activity_logs 
FOR INSERT 
WITH CHECK (true);

-- Criar índices para performance
CREATE INDEX idx_site_analytics_created_at ON public.site_analytics(created_at);
CREATE INDEX idx_site_analytics_page_path ON public.site_analytics(page_path);
CREATE INDEX idx_admin_activity_logs_created_at ON public.admin_activity_logs(created_at);
CREATE INDEX idx_admin_activity_logs_user_id ON public.admin_activity_logs(user_id);