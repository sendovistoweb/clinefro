import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  tags: string[] | null
  featured_image_url: string | null
  created_at: string
  updated_at: string
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os posts",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single()

      if (error) throw error

      setPosts(prev => [data, ...prev])
      toast({
        title: "Sucesso",
        description: "Post criado com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao criar post:', error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o post",
        variant: "destructive"
      })
      throw error
    }
  }

  const updatePost = async (id: string, post: Partial<BlogPost>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setPosts(prev => prev.map(p => p.id === id ? data : p))
      toast({
        title: "Sucesso",
        description: "Post atualizado com sucesso!"
      })
      return data
    } catch (error) {
      console.error('Erro ao atualizar post:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o post",
        variant: "destructive"
      })
      throw error
    }
  }

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPosts(prev => prev.filter(p => p.id !== id))
      toast({
        title: "Sucesso",
        description: "Post excluído com sucesso!"
      })
    } catch (error) {
      console.error('Erro ao excluir post:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o post",
        variant: "destructive"
      })
      throw error
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    isLoading,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  }
}