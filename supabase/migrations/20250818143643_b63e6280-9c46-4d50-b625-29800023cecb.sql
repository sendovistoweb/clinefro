-- Add slider functionality to home_content table
ALTER TABLE home_content 
ADD COLUMN slide_enabled boolean NOT NULL DEFAULT false,
ADD COLUMN slide_images jsonb DEFAULT '[]'::jsonb;

-- Update RLS policy for home_content to allow updates by authenticated users
CREATE POLICY "Authenticated users can update home content" 
ON home_content 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);