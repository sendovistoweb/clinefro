import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  published: boolean;
  featured_image_url?: string;
  show_in_menu: boolean;
  menu_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateStaticPageData {
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  published?: boolean;
  featured_image_url?: string;
  show_in_menu?: boolean;
  menu_order?: number;
}

export interface UpdateStaticPageData extends CreateStaticPageData {
  id: string;
}

export const useStaticPages = () => {
  return useQuery({
    queryKey: ["static-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as StaticPage[];
    },
  });
};

export const usePublishedStaticPages = () => {
  return useQuery({
    queryKey: ["published-static-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as StaticPage[];
    },
  });
};

export const useStaticPageBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["static-page", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      return data as StaticPage;
    },
    enabled: !!slug,
  });
};

export const useCreateStaticPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateStaticPageData) => {
      const { data: result, error } = await supabase
        .from("static_pages")
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["static-pages"] });
      queryClient.invalidateQueries({ queryKey: ["static-pages-menu"] });
      toast.success("Página criada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao criar página:", error);
      toast.error("Erro ao criar página. Tente novamente.");
    },
  });
};

export const useUpdateStaticPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateStaticPageData) => {
      const { data: result, error } = await supabase
        .from("static_pages")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["static-pages"] });
      queryClient.invalidateQueries({ queryKey: ["published-static-pages"] });
      queryClient.invalidateQueries({ queryKey: ["static-pages-menu"] });
      toast.success("Página atualizada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar página:", error);
      toast.error("Erro ao atualizar página. Tente novamente.");
    },
  });
};

export const useStaticPagesForMenu = () => {
  return useQuery({
    queryKey: ["static-pages-menu"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("static_pages")
        .select("*")
        .eq("published", true)
        .eq("show_in_menu", true)
        .order("menu_order", { ascending: true });

      if (error) throw error;
      return data as StaticPage[];
    },
  });
};

export const useDeleteStaticPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("static_pages")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["static-pages"] });
      queryClient.invalidateQueries({ queryKey: ["published-static-pages"] });
      queryClient.invalidateQueries({ queryKey: ["static-pages-menu"] });
      toast.success("Página excluída com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao excluir página:", error);
      toast.error("Erro ao excluir página. Tente novamente.");
    },
  });
};