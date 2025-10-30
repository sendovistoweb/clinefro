-- Tabela para conteúdo editável da home
CREATE TABLE public.home_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title TEXT NOT NULL DEFAULT 'Cuidando da sua saúde com excelência',
  hero_subtitle TEXT NOT NULL DEFAULT 'Oferecemos atendimento médico de qualidade com profissionais especializados',
  hero_image_url TEXT,
  about_title TEXT NOT NULL DEFAULT 'Sobre Nós',
  about_content TEXT NOT NULL DEFAULT 'Nossa clínica está comprometida em oferecer os melhores cuidados médicos.',
  services_title TEXT NOT NULL DEFAULT 'Nossos Serviços',
  services_subtitle TEXT NOT NULL DEFAULT 'Especialidades médicas completas para toda a família',
  testimonials_title TEXT NOT NULL DEFAULT 'O que nossos pacientes dizem',
  contact_title TEXT NOT NULL DEFAULT 'Entre em Contato',
  contact_subtitle TEXT NOT NULL DEFAULT 'Estamos aqui para ajudar você',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública do conteúdo da home
CREATE POLICY "Conteúdo da home é público" 
ON public.home_content 
FOR SELECT 
USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_home_content_updated_at 
BEFORE UPDATE ON public.home_content 
FOR EACH ROW 
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados iniciais da home
INSERT INTO public.home_content (hero_title, hero_subtitle, about_content) 
VALUES (
  'Cuidando da sua saúde com excelência',
  'Oferecemos atendimento médico de qualidade com profissionais especializados em diversas áreas da medicina',
  'Nossa clínica está comprometida em oferecer os melhores cuidados médicos, combinando tecnologia de ponta com atendimento humanizado. Nossa equipe de profissionais qualificados está sempre pronta para atender você e sua família.'
);