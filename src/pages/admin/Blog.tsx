import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, FileText, Eye, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useBlogPosts } from "@/hooks/useBlogPosts"
import { BlogPostForm } from "@/components/admin/BlogPostForm"

export default function Blog() {
  const { posts, isLoading, createPost, updatePost, deletePost } = useBlogPosts()

  const getStatusColor = (published: boolean) => {
    return published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusText = (published: boolean) => {
    return published ? "Publicado" : "Rascunho"
  }

  const handleDelete = async (id: string) => {
    await deletePost(id)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando posts...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
            <p className="text-muted-foreground">
              Gerencie os posts e artigos do blog da clínica
            </p>
          </div>
          <BlogPostForm onSubmit={createPost} />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+3 este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publicados</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38</div>
              <p className="text-xs text-muted-foreground">Disponíveis no site</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Em desenvolvimento</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5k</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Posts */}
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-2">
                       <CardTitle className="text-lg">{post.title}</CardTitle>
                       <Badge className={getStatusColor(post.published)}>
                         {getStatusText(post.published)}
                       </Badge>
                     </div>
                     <CardDescription className="text-sm mb-3">
                       {post.excerpt}
                     </CardDescription>
                     
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       {post.published_at && (
                         <div className="flex items-center gap-1">
                           <Calendar className="w-4 h-4" />
                           <span>{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
                         </div>
                       )}
                     </div>
                     
                     {post.tags && post.tags.length > 0 && (
                       <div className="flex gap-1 mt-3">
                         {post.tags.map((tag) => (
                           <Badge key={tag} variant="outline" className="text-xs">
                             {tag}
                           </Badge>
                         ))}
                       </div>
                     )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}