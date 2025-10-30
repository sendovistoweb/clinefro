import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Calendar, Clock, User, Search, ArrowRight, Heart, Brain, Eye, Stethoscope } from "lucide-react"
import { useBlogPosts } from "@/hooks/useBlogPosts"

export default function Blog() {
  const { posts, isLoading } = useBlogPosts()

  const publishedPosts = posts.filter(post => post.published)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando artigos...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Blog da Saúde
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Artigos informativos e dicas de saúde escritos por nossos especialistas 
              para ajudar você a manter uma vida mais saudável.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Pesquisar artigos..." 
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                </CardHeader>
                 <CardContent>
                   <div className="space-y-2">
                     <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                       <div className="flex items-center gap-2">
                         <Stethoscope className="w-4 h-4 text-primary" />
                         <span className="text-sm">Todos</span>
                       </div>
                       <Badge variant="outline" className="text-xs">
                         {publishedPosts.length}
                       </Badge>
                     </button>
                   </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter</CardTitle>
                  <CardDescription>
                    Receba dicas de saúde diretamente no seu e-mail
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input placeholder="Seu e-mail" />
                    <Button className="w-full">
                      Assinar Newsletter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {publishedPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigo em Destaque</h2>
                <Card className="hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative">
                      <img 
                        src={publishedPosts[0].featured_image_url || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"}
                        alt={publishedPosts[0].title}
                        className="w-full h-64 md:h-full object-cover rounded-l-lg"
                      />
                      <Badge className="absolute top-4 left-4">
                        Destaque
                      </Badge>
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {new Date(publishedPosts[0].published_at || publishedPosts[0].created_at).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-3 leading-tight">
                          {publishedPosts[0].title}
                        </CardTitle>
                        <CardDescription className="mb-4 leading-relaxed">
                          {publishedPosts[0].excerpt}
                        </CardDescription>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Ler Artigo
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Recentes</h2>
              {publishedPosts.length > 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {publishedPosts.slice(1).map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow group">
                      <div className="relative">
                        <img 
                          src={post.featured_image_url || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <CardTitle className="text-lg leading-tight line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <CardDescription className="mb-4 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                        
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-white">
                            Ler mais
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum artigo encontrado no momento.</p>
                </div>
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Carregar Mais Artigos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}