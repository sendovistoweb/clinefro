-- Adicionar campos para configurações de cores e horários personalizados do rodapé
ALTER TABLE layout_settings 
ADD COLUMN primary_color text DEFAULT '142 69% 58%',
ADD COLUMN secondary_color text DEFAULT '210 40% 96.1%',
ADD COLUMN accent_color text DEFAULT '210 40% 96.1%',
ADD COLUMN background_color text DEFAULT '210 20% 96%',
ADD COLUMN card_color text DEFAULT '0 0% 100%',
ADD COLUMN footer_hours jsonb DEFAULT '[
  {"day": "Segunda a Sexta", "hours": "08:00 - 18:00"},
  {"day": "Sábado", "hours": "08:00 - 12:00"}, 
  {"day": "Domingo", "hours": "Fechado"}
]'::jsonb,
ADD COLUMN footer_contact_info jsonb DEFAULT '{
  "address": "Rua Example, 123 - Centro",
  "city": "São Paulo - SP",
  "phone": "(11) 99999-9999",
  "email": "contato@clinica.com.br"
}'::jsonb;

-- Permitir que usuários autenticados atualizem as configurações de layout
CREATE POLICY "Authenticated users can update layout settings" 
ON layout_settings 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);