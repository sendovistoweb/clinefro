import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useTestimonials } from "@/hooks/useTestimonials"
import { TestimonialForm } from "@/components/admin/TestimonialForm"

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300'
      }`}
    />
  ))
}

export default function Depoimentos() {
  const { testimonials, isLoading, createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialStatus } = useTestimonials()

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id)
  }

  const handleToggleStatus = async (id: string, active: boolean) => {
    await toggleTestimonialStatus(id, active)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando depoimentos...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Depoimentos</h2>
            <p className="text-muted-foreground">
              Gerencie os depoimentos e avaliações dos pacientes
            </p>
          </div>
          <TestimonialForm onSubmit={createTestimonial} />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Depoimentos</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonials.length}</div>
              <p className="text-xs text-muted-foreground">Depoimentos cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publicados</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonials.filter(t => t.active).length}</div>
              <p className="text-xs text-muted-foreground">Visíveis no site</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testimonials.length > 0 
                  ? (testimonials.reduce((acc, t) => acc + (t.rating || 0), 0) / testimonials.length).toFixed(1)
                  : '0.0'
                }
              </div>
              <p className="text-xs text-muted-foreground">De 5 estrelas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">5 Estrelas</CardTitle>
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {testimonials.length > 0 
                  ? Math.round((testimonials.filter(t => t.rating === 5).length / testimonials.length) * 100)
                  : 0
                }%
              </div>
              <p className="text-xs text-muted-foreground">Avaliações máximas</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Depoimentos */}
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-muted-foreground">Nenhum depoimento cadastrado</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((depoimento) => (
              <Card key={depoimento.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={depoimento.photo_url || ''} />
                        <AvatarFallback>
                          {depoimento.patient_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{depoimento.patient_name}</CardTitle>
                          <div className="flex items-center gap-1">
                            {renderStars(depoimento.rating || 0)}
                          </div>
                        </div>
                        
                        <CardDescription className="text-sm mb-3 leading-relaxed">
                          "{depoimento.content}"
                        </CardDescription>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{new Date(depoimento.created_at).toLocaleDateString('pt-BR')}</span>
                          <div className="flex items-center gap-2">
                            <span>Visível no site:</span>
                            <Switch 
                              checked={depoimento.active}
                              onCheckedChange={(active) => handleToggleStatus(depoimento.id, active)}
                            />
                            {depoimento.active ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <TestimonialForm 
                        testimonial={depoimento}
                        onSubmit={(data) => updateTestimonial(depoimento.id, data)}
                        trigger={
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        }
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o depoimento de "{depoimento.patient_name}"? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(depoimento.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}