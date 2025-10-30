import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useLayoutSettings, type MenuItem, type FooterHour, type FooterContactInfo } from "@/hooks/useLayoutSettings"
import { Upload, Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { ColorEditor } from "./ColorEditor"
import { FooterEditor } from "./FooterEditor"

const formSchema = z.object({
  site_name: z.string().min(1, "Nome do site é obrigatório"),
  contact_button_text: z.string().min(1, "Texto do botão de contato é obrigatório"),
  contact_button_link: z.string().min(1, "Link do botão de contato é obrigatório"),
  appointment_button_text: z.string().min(1, "Texto do botão de agendamento é obrigatório"),
  appointment_button_link: z.string().min(1, "Link do botão de agendamento é obrigatório"),
  show_contact_button: z.boolean(),
  show_appointment_button: z.boolean(),
  footer_description: z.string().optional(),
  show_footer_hours: z.boolean(),
  show_footer_contact: z.boolean(),
  show_footer_links: z.boolean(),
  primary_color: z.string().min(1, "Cor primária é obrigatória"),
  secondary_color: z.string().min(1, "Cor secundária é obrigatória"),
  accent_color: z.string().min(1, "Cor de destaque é obrigatória"),
  background_color: z.string().min(1, "Cor de fundo é obrigatória"),
  card_color: z.string().min(1, "Cor dos cards é obrigatória"),
})

type FormData = z.infer<typeof formSchema>

export function LayoutEditorForm() {
  const { layoutSettings, loading, updateLayoutSettings, uploadLogo } = useLayoutSettings()
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoUploading, setLogoUploading] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [footerHours, setFooterHours] = useState<FooterHour[]>([])
  const [footerContactInfo, setFooterContactInfo] = useState<FooterContactInfo>({
    address: "",
    city: "",
    phone: "",
    email: ""
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: layoutSettings ? {
      site_name: layoutSettings.site_name,
      contact_button_text: layoutSettings.contact_button_text,
      contact_button_link: layoutSettings.contact_button_link,
      appointment_button_text: layoutSettings.appointment_button_text,
      appointment_button_link: layoutSettings.appointment_button_link,
      show_contact_button: layoutSettings.show_contact_button,
      show_appointment_button: layoutSettings.show_appointment_button,
      footer_description: layoutSettings.footer_description || "",
      show_footer_hours: layoutSettings.show_footer_hours,
      show_footer_contact: layoutSettings.show_footer_contact,
      show_footer_links: layoutSettings.show_footer_links,
      primary_color: layoutSettings.primary_color,
      secondary_color: layoutSettings.secondary_color,
      accent_color: layoutSettings.accent_color,
      background_color: layoutSettings.background_color,
      card_color: layoutSettings.card_color,
    } : {
      site_name: "",
      contact_button_text: "",
      contact_button_link: "",
      appointment_button_text: "",
      appointment_button_link: "",
      show_contact_button: true,
      show_appointment_button: true,
      footer_description: "",
      show_footer_hours: true,
      show_footer_contact: true,
      show_footer_links: true,
      primary_color: "142 69% 58%",
      secondary_color: "210 40% 96.1%",
      accent_color: "210 40% 96.1%",
      background_color: "210 20% 96%",
      card_color: "0 0% 100%",
    }
  })

  // Update menu items and footer data when layout settings change
  React.useEffect(() => {
    if (layoutSettings?.menu_items) {
      setMenuItems(layoutSettings.menu_items)
    }
    if (layoutSettings?.footer_hours) {
      setFooterHours(layoutSettings.footer_hours)
    }
    if (layoutSettings?.footer_contact_info) {
      setFooterContactInfo(layoutSettings.footer_contact_info)
    }
  }, [layoutSettings])

  const onSubmit = async (data: FormData) => {
    await updateLayoutSettings({
      ...data,
      menu_items: menuItems,
      footer_hours: footerHours,
      footer_contact_info: footerContactInfo
    })
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLogoFile(file)
    setLogoUploading(true)
    try {
      await uploadLogo(file)
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
    } finally {
      setLogoUploading(false)
    }
  }

  const toggleMenuItem = (index: number) => {
    const updated = [...menuItems]
    updated[index].visible = !updated[index].visible
    setMenuItems(updated)
  }

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string) => {
    const updated = [...menuItems]
    updated[index] = { ...updated[index], [field]: value }
    setMenuItems(updated)
  }

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: "", href: "", visible: true }])
  }

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index))
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Editor de Layout</h2>
          <p className="text-muted-foreground">Configure o cabeçalho e rodapé do seu site</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Section */}
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
              <CardDescription>Faça upload do logo da sua clínica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {layoutSettings?.logo_url && (
                  <img 
                    src={layoutSettings.logo_url} 
                    alt="Logo atual" 
                    className="h-16 w-16 object-contain border rounded"
                  />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    disabled={logoUploading}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {logoUploading ? "Enviando..." : "Fazer Upload"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Site Name */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="site_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Site</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Menu Items */}
          <Card>
            <CardHeader>
              <CardTitle>Itens do Menu</CardTitle>
              <CardDescription>Configure quais seções aparecerão no menu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleMenuItem(index)}
                    className="flex-shrink-0"
                  >
                    {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Nome do item"
                      value={item.name}
                      onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Link (ex: /especialidades)"
                      value={item.href}
                      onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                    />
                  </div>
                  
                  <Badge variant={item.visible ? "default" : "secondary"}>
                    {item.visible ? "Visível" : "Oculto"}
                  </Badge>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMenuItem(index)}
                    className="flex-shrink-0 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addMenuItem}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Item do Menu
              </Button>
            </CardContent>
          </Card>

          {/* Header Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Botões do Cabeçalho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="show_contact_button"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Mostrar Botão de Contato</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contact_button_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Texto do Botão</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contact_button_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Botão</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="show_appointment_button"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Mostrar Botão de Agendamento</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="appointment_button_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Texto do Botão</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="appointment_button_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Botão</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Editor */}
          <ColorEditor form={form} />

          {/* Footer Editor */}
          <FooterEditor 
            form={form}
            footerHours={footerHours}
            setFooterHours={setFooterHours}
            footerContactInfo={footerContactInfo}
            setFooterContactInfo={setFooterContactInfo}
          />

          <Button type="submit" className="w-full">
            Salvar Configurações
          </Button>
        </form>
      </Form>
    </div>
  )
}