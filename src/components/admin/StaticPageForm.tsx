import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Save, Eye, EyeOff } from "lucide-react";
import { useCreateStaticPage, useUpdateStaticPage, type StaticPage } from "@/hooks/useStaticPages";

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  meta_description: z.string().optional(),
  published: z.boolean().default(false),
  featured_image_url: z.string().url("URL inválida").optional().or(z.literal("")),
  show_in_menu: z.boolean().default(false),
  menu_order: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface StaticPageFormProps {
  page?: StaticPage;
  onSuccess?: () => void;
}

export function StaticPageForm({ page, onSuccess }: StaticPageFormProps) {
  const [isPreview, setIsPreview] = useState(false);
  const createStaticPage = useCreateStaticPage();
  const updateStaticPage = useUpdateStaticPage();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      meta_description: "",
      published: false,
      featured_image_url: "",
      show_in_menu: false,
      menu_order: 0,
    },
  });

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (watchTitle && !page) {
      const slug = watchTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  }, [watchTitle, form, page]);

  // Load page data if editing
  useEffect(() => {
    if (page) {
      form.reset({
        title: page.title,
        slug: page.slug,
        content: page.content,
        meta_description: page.meta_description || "",
        published: page.published,
        featured_image_url: page.featured_image_url || "",
        show_in_menu: page.show_in_menu || false,
        menu_order: page.menu_order || 0,
      });
    }
  }, [page, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        published: data.published,
        featured_image_url: data.featured_image_url || undefined,
        meta_description: data.meta_description || undefined,
        show_in_menu: data.show_in_menu,
        menu_order: data.menu_order,
      };

      if (page) {
        await updateStaticPage.mutateAsync({ id: page.id, ...submitData });
      } else {
        await createStaticPage.mutateAsync(submitData);
      }
      
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao salvar página:", error);
    }
  };

  const isLoading = createStaticPage.isPending || updateStaticPage.isPending;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {page ? "Editar Página" : "Nova Página"}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isPreview ? "Editor" : "Preview"}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Título da página" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="slug-da-pagina" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição para SEO (opcional)"
                      className="resize-none"
                      rows={2}
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem de Destaque</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://exemplo.com/imagem.jpg (opcional)" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isPreview ? (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Conteúdo da página em HTML ou texto simples"
                        className="resize-none min-h-[300px]"
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="space-y-2">
                <FormLabel>Preview do Conteúdo</FormLabel>
                <div 
                  className="border rounded-md p-4 min-h-[300px] bg-background prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: form.watch("content") || "Nenhum conteúdo ainda..." }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel>Publicar página</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="show_in_menu"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel>Mostrar no menu</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="menu_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordem no Menu</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Salvando..." : "Salvar Página"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}