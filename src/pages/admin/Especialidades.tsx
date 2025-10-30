import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Stethoscope } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useSpecialties } from "@/hooks/useSpecialties"
import { SpecialtyForm } from "@/components/admin/SpecialtyForm"

export default function Especialidades() {
  const { specialties, isLoading, createSpecialty, updateSpecialty, deleteSpecialty } = useSpecialties()

  const handleDelete = async (id: string) => {
    await deleteSpecialty(id)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando especialidades...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Especialidades</h2>
            <p className="text-muted-foreground">
              Gerencie as especialidades médicas da clínica
            </p>
          </div>
          <SpecialtyForm onSubmit={createSpecialty} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Lista de Especialidades
            </CardTitle>
            <CardDescription>
              Todas as especialidades médicas disponíveis na clínica
            </CardDescription>
          </CardHeader>
          <CardContent>
            {specialties.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma especialidade cadastrada
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Ícone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specialties.map((especialidade) => (
                    <TableRow key={especialidade.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{especialidade.icon}</span>
                          <span>{especialidade.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md text-sm text-muted-foreground">
                          {especialidade.description || 'Sem descrição'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-2xl">{especialidade.icon}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <SpecialtyForm 
                            specialty={especialidade}
                            onSubmit={(data) => updateSpecialty(especialidade.id, data)}
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
                                  Tem certeza que deseja excluir a especialidade "{especialidade.name}"? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(especialidade.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}