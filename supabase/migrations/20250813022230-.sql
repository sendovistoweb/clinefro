-- Add show_in_menu field to static_pages table
ALTER TABLE public.static_pages 
ADD COLUMN show_in_menu boolean NOT NULL DEFAULT false;

-- Add menu_order field to control order in menu
ALTER TABLE public.static_pages 
ADD COLUMN menu_order integer DEFAULT 0;