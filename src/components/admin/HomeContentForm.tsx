import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HomeContent, SlideImage } from "@/hooks/useHomeContent"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, Plus, ExternalLink, Grip } from "lucide-react"

const homeContentSchema = z.object({
  hero_title: z.string().min(1, "Título do hero é obrigatório"),
  hero_subtitle: z.string().min(1, "Subtítulo do hero é obrigatório"),
  hero_image_url: z.string().url("URL inválida").optional().or(z.literal("")),
  about_title: z.string().min(1, "Título sobre é obrigatório"),
  about_content: z.string().min(1, "Conteúdo sobre é obrigatório"),
  services_title: z.string().min(1, "Título dos serviços é obrigatório"),
  services_subtitle: z.string().min(1, "Subtítulo dos serviços é obrigatório"),
  testimonials_title: z.string().min(1, "Título dos depoimentos é obrigatório"),
  contact_title: z.string().min(1, "Título do contato é obrigatório"),
  contact_subtitle: z.string().min(1, "Subtítulo do contato é obrigatório"),
  slide_enabled: z.boolean(),
})

type HomeContentFormData = z.infer<typeof homeContentSchema>

interface HomeContentFormProps {
  homeContent?: HomeContent | null
  onSubmit: (data: HomeContentFormData & { slide_images: SlideImage[] }) => Promise<void>
  loading?: boolean
}

export function HomeContentForm({ homeContent, onSubmit, loading }: HomeContentFormProps) {
  const [slides, setSlides] = useState<SlideImage[]>(homeContent?.slide_images || [])
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const form = useForm<HomeContentFormData>({
    resolver: zodResolver(homeContentSchema),
    defaultValues: {
      hero_title: homeContent?.hero_title || "",
      hero_subtitle: homeContent?.hero_subtitle || "",
      hero_image_url: homeContent?.hero_image_url || "",
      about_title: homeContent?.about_title || "",
      about_content: homeContent?.about_content || "",
      services_title: homeContent?.services_title || "",
      services_subtitle: homeContent?.services_subtitle || "",
      testimonials_title: homeContent?.testimonials_title || "",
      contact_title: homeContent?.contact_title || "",
      contact_subtitle: homeContent?.contact_subtitle || "",
      slide_enabled: homeContent?.slide_enabled || false,
    },
  })

  const handleSlideUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `slide-${Date.now()}.${fileExt}`
      const filePath = `slides/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath)

      const newSlide: SlideImage = {
        id: `slide-${Date.now()}`,
        image_url: publicUrl,
        title: '',
        description: '',
        link_url: '',
        link_text: 'Saiba mais'
      }

      setSlides([...slides, newSlide])
      
      toast({
        title: "Sucesso",
        description: "Imagem do slide enviada com sucesso",
      })
    } catch (error) {
      console.error("Error uploading slide:", error)
      toast({
        title: "Erro",
        description: "Erro ao enviar imagem do slide",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const updateSlide = (index: number, field: keyof SlideImage, value: string) => {
    const newSlides = [...slides]
    newSlides[index] = { ...newSlides[index], [field]: value }
    setSlides(newSlides)
  }

  const removeSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index))
  }

  const handleSubmit = async (data: HomeContentFormData) => {
    await onSubmit({ ...data, slide_images: slides })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Seção Slides */}
        <Card>
          <CardHeader>
            <CardTitle>Slider de Imagens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="slide_enabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Ativar Slider</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Exibe um carrossel de imagens no topo da página
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("slide_enabled") && (
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('slide-upload')?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Enviando..." : "Adicionar Slide"}
                  </Button>
                  <input
                    id="slide-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleSlideUpload}
                    className="hidden"
                  />
                </div>

                <div className="space-y-4">
                  {slides.map((slide, index) => (
                    <Card key={slide.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Grip className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Slide {index + 1}</span>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="ml-auto"
                            onClick={() => removeSlide(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <img 
                              src={slide.image_url} 
                              alt={`Slide ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md border"
                            />
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium">Título</label>
                              <Input
                                value={slide.title || ''}
                                onChange={(e) => updateSlide(index, 'title', e.target.value)}
                                placeholder="Título do slide (opcional)"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Descrição</label>
                              <Textarea
                                value={slide.description || ''}
                                onChange={(e) => updateSlide(index, 'description', e.target.value)}
                                placeholder="Descrição do slide (opcional)"
                                rows={2}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Link (URL)</label>
                              <Input
                                value={slide.link_url || ''}
                                onChange={(e) => updateSlide(index, 'link_url', e.target.value)}
                                placeholder="https://... (opcional)"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Texto do Botão</label>
                              <Input
                                value={slide.link_text || 'Saiba mais'}
                                onChange={(e) => updateSlide(index, 'link_text', e.target.value)}
                                placeholder="Texto do botão"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {slides.length === 0 && form.watch("slide_enabled") && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Nenhum slide adicionado ainda.</p>
                      <p className="text-sm">Clique em "Adicionar Slide" para começar.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seção Hero */}
        <Card>
          <CardHeader>
            <CardTitle>Seção Hero (Cabeçalho)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="hero_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Cuidando da sua saúde..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hero_subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Oferecemos atendimento médico..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hero_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem do Hero</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção Sobre */}
        <Card>
          <CardHeader>
            <CardTitle>Seção Sobre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="about_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Seção</FormLabel>
                  <FormControl>
                    <Input placeholder="Sobre Nós" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nossa clínica está comprometida..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção Serviços */}
        <Card>
          <CardHeader>
            <CardTitle>Seção Serviços</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="services_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Seção</FormLabel>
                  <FormControl>
                    <Input placeholder="Nossos Serviços" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="services_subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Especialidades médicas completas..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção Depoimentos */}
        <Card>
          <CardHeader>
            <CardTitle>Seção Depoimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="testimonials_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Seção</FormLabel>
                  <FormControl>
                    <Input placeholder="O que nossos pacientes dizem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seção Contato */}
        <Card>
          <CardHeader>
            <CardTitle>Seção Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="contact_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Seção</FormLabel>
                  <FormControl>
                    <Input placeholder="Entre em Contato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Estamos aqui para ajudar você" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </Form>
  )
}