-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

-- Create storage policies for logos
CREATE POLICY "Logos são públicos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'logos');

CREATE POLICY "Admins podem fazer upload de logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'logos');

CREATE POLICY "Admins podem atualizar logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'logos');

CREATE POLICY "Admins podem deletar logos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'logos');

-- Create layout settings table
CREATE TABLE public.layout_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  logo_url TEXT,
  site_name TEXT NOT NULL DEFAULT 'Clínica Médica',
  menu_items JSONB NOT NULL DEFAULT '[
    {"name": "Home", "href": "/", "visible": true},
    {"name": "Especialidades", "href": "/especialidades", "visible": true},
    {"name": "Equipe Médica", "href": "/equipe", "visible": true},
    {"name": "Blog", "href": "/blog", "visible": true},
    {"name": "A Clínica", "href": "/sobre", "visible": true},
    {"name": "Contato", "href": "/contato", "visible": true}
  ]'::jsonb,
  contact_button_text TEXT NOT NULL DEFAULT 'Contato',
  contact_button_link TEXT NOT NULL DEFAULT '/contato',
  appointment_button_text TEXT NOT NULL DEFAULT 'Agendar',
  appointment_button_link TEXT NOT NULL DEFAULT '/agendamento',
  show_contact_button BOOLEAN NOT NULL DEFAULT true,
  show_appointment_button BOOLEAN NOT NULL DEFAULT true,
  footer_description TEXT,
  show_footer_hours BOOLEAN NOT NULL DEFAULT true,
  show_footer_contact BOOLEAN NOT NULL DEFAULT true,
  show_footer_links BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.layout_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Configurações de layout são públicas" 
ON public.layout_settings 
FOR SELECT 
USING (true);

-- Insert default settings
INSERT INTO public.layout_settings (site_name, footer_description)
VALUES ('Clínica Médica', 'Nossa clínica está comprometida em oferecer os melhores cuidados médicos com uma equipe de profissionais especializados.');

-- Add trigger for timestamps
CREATE TRIGGER update_layout_settings_updated_at
BEFORE UPDATE ON public.layout_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();