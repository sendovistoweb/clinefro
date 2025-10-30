import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { StaticPageForm } from "@/components/admin/StaticPageForm";
import { useStaticPages, useDeleteStaticPage, type StaticPage } from "@/hooks/useStaticPages";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function PaginasEstaticas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState<StaticPage | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { data: pages = [], isLoading } = useStaticPages();
  const deleteStaticPage = useDeleteStaticPage();

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditPage = (page: StaticPage) => {
    setSelectedPage(page);
    setIsFormOpen(true);
  };

  const handleCreatePage = () => {
    setSelectedPage(null);
    setIsFormOpen(true);
  };

  const handleDeletePage = async (id: string) => {
    try {
      await deleteStaticPage.mutateAsync(id);
    } catch (error) {
      console.error("Erro ao excluir página:", error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedPage(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Carregando páginas...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Páginas Estáticas</h1>
            <p className="text-muted-foreground">
              Gerencie as páginas personalizadas do seu site
            </p>
          </div>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreatePage}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Página
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedPage ? "Editar Página" : "Nova Página"}
                </DialogTitle>
              </DialogHeader>
              <StaticPageForm page={selectedPage || undefined} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Pesquisar páginas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {filteredPages.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm ? "Nenhuma página encontrada" : "Nenhuma página criada"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? "Tente pesquisar com outros termos" 
                    : "Comece criando sua primeira página estática"
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={handleCreatePage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeira Página
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{page.title}</h3>
                        <Badge variant={page.published ? "default" : "secondary"}>
                          {page.published ? "Publicado" : "Rascunho"}
                        </Badge>
                        {page.show_in_menu && (
                          <Badge variant="outline">No Menu</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-mono">/{page.slug}</span>
                        {page.show_in_menu && (
                          <span>Ordem: {page.menu_order}</span>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(page.updated_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </div>
                      </div>
                      
                      {page.meta_description && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {page.meta_description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {page.published && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                        >
                          <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditPage(page)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir página</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza de que deseja excluir a página "{page.title}"? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePage(page.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}