import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Users, Phone, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useDoctors } from "@/hooks/useDoctors"
import { useSpecialties } from "@/hooks/useSpecialties"
import { DoctorForm } from "@/components/admin/DoctorForm"

export default function Medicos() {
  const { doctors, isLoading, createDoctor, updateDoctor, deleteDoctor } = useDoctors()
  const { specialties } = useSpecialties()

  const getSpecialtyName = (specialtyId: string | null) => {
    if (!specialtyId) return 'Sem especialidade'
    const specialty = specialties.find(s => s.id === specialtyId)
    return specialty?.name || 'Especialidade desconhecida'
  }

  const handleDelete = async (id: string) => {
    await deleteDoctor(id)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando médicos...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Médicos</h2>
            <p className="text-muted-foreground">
              Gerencie a equipe médica da clínica
            </p>
          </div>
          <DoctorForm onSubmit={createDoctor} />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Médicos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctors.length}</div>
              <p className="text-xs text-muted-foreground">Médicos cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Especialidade</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {doctors.filter(d => d.specialty_id).length}
              </div>
              <p className="text-xs text-muted-foreground">Especialidades definidas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Especialidades</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{specialties.length}</div>
              <p className="text-xs text-muted-foreground">Áreas disponíveis</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Médicos */}
        {doctors.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-muted-foreground">Nenhum médico cadastrado</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((medico) => (
              <Card key={medico.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={medico.photo_url || ''} />
                      <AvatarFallback>
                        {medico.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{medico.name}</CardTitle>
                      <CardDescription>{medico.crm}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-primary">
                      {getSpecialtyName(medico.specialty_id)}
                    </span>
                  </div>
                  
                  {medico.bio && (
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {medico.bio}
                    </div>
                  )}
                  
                  {medico.available_hours && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Horários:</strong> {medico.available_hours}
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <DoctorForm 
                      doctor={medico}
                      onSubmit={(data) => updateDoctor(medico.id, data)}
                      trigger={
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      }
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o médico "{medico.name}"? 
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(medico.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}