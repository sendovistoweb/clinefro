import { AdminLayout } from "@/components/admin/AdminLayout"
import { ClinicInfoForm } from "@/components/admin/ClinicInfoForm"
import { useClinicInfo } from "@/hooks/useClinicInfo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2 } from "lucide-react"

export default function ClinicaInfo() {
  const { clinicInfo, loading, updateClinicInfo } = useClinicInfo()

  const handleSubmit = async (data: any) => {
    await updateClinicInfo(data)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Informações da Clínica</h1>
              <p className="text-muted-foreground">Gerencie os dados da sua clínica</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          <div>
            <h1 className="text-2xl font-bold">Informações da Clínica</h1>
            <p className="text-muted-foreground">Gerencie os dados da sua clínica</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados da Clínica</CardTitle>
            <CardDescription>
              Atualize as informações básicas da sua clínica, incluindo dados de contato, logo e descrição.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClinicInfoForm
              clinicInfo={clinicInfo}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}