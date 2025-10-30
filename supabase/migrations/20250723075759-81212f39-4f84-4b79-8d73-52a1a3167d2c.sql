
-- Criar tabela para informações da clínica
CREATE TABLE public.clinic_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  logo_url TEXT,
  description TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para permitir apenas leitura pública
ALTER TABLE public.clinic_info ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública das informações da clínica
CREATE POLICY "Informações da clínica são públicas" 
  ON public.clinic_info 
  FOR SELECT 
  USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_clinic_info_updated_at 
  BEFORE UPDATE ON public.clinic_info 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados iniciais da clínica
INSERT INTO public.clinic_info (name, description) 
VALUES ('Clínica Médica', 'Cuidando da sua saúde com excelência');
