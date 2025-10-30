-- Create storage bucket for clinic logos if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('clinic-logos', 'clinic-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for clinic logo uploads
CREATE POLICY "Anyone can view clinic logos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'clinic-logos');

CREATE POLICY "Admins can upload clinic logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'clinic-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can update clinic logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'clinic-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can delete clinic logos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'clinic-logos' AND auth.role() = 'authenticated');

-- Update clinic_info RLS policies to allow authenticated users to update
CREATE POLICY "Authenticated users can update clinic info" 
ON clinic_info 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert clinic info" 
ON clinic_info 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');