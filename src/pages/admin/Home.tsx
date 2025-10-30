import { AdminLayout } from "@/components/admin/AdminLayout"
import { HomeContentForm } from "@/components/admin/HomeContentForm"
import { useHomeContent } from "@/hooks/useHomeContent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Home } from "lucide-react"

export default function AdminHome() {
  const { homeContent, loading, updateHomeContent } = useHomeContent()

  const handleSubmit = async (data: any) => {
    await updateHomeContent(data)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Editar Home</h1>
              <p className="text-muted-foreground">Gerencie o conteúdo da página inicial</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-5 w-32" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-20 w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
          <Home className="w-6 h-6" />
          <div>
            <h1 className="text-2xl font-bold">Editar Home</h1>
            <p className="text-muted-foreground">Gerencie o conteúdo da página inicial</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo da Página Inicial</CardTitle>
            <CardDescription>
              Edite os textos e imagens que aparecem na página inicial do site. As alterações serão refletidas imediatamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HomeContentForm
              homeContent={homeContent}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}