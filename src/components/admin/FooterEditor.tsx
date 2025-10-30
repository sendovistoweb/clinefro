import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Clock, MapPin, Phone, Mail } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { FooterHour, FooterContactInfo } from "@/hooks/useLayoutSettings"

interface FooterEditorProps {
  form: UseFormReturn<any>
  footerHours: FooterHour[]
  setFooterHours: (hours: FooterHour[]) => void
  footerContactInfo: FooterContactInfo
  setFooterContactInfo: (info: FooterContactInfo) => void
}

export function FooterEditor({ 
  form, 
  footerHours, 
  setFooterHours, 
  footerContactInfo, 
  setFooterContactInfo 
}: FooterEditorProps) {
  
  const addHour = () => {
    setFooterHours([...footerHours, { day: "", hours: "" }])
  }

  const removeHour = (index: number) => {
    setFooterHours(footerHours.filter((_, i) => i !== index))
  }

  const updateHour = (index: number, field: keyof FooterHour, value: string) => {
    const updated = [...footerHours]
    updated[index] = { ...updated[index], [field]: value }
    setFooterHours(updated)
  }

  const updateContactInfo = (field: keyof FooterContactInfo, value: string) => {
    setFooterContactInfo({ ...footerContactInfo, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Rodapé</CardTitle>
        <CardDescription>
          Configure o conteúdo e a aparência do rodapé do seu site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Footer Description */}
        <FormField
          control={form.control}
          name="footer_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição da Clínica</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Descreva brevemente sua clínica..."
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Separator />
        
        {/* Footer Visibility Settings */}
        <div>
          <h4 className="font-medium mb-4">Seções Visíveis</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="show_footer_contact"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Mostrar Contato</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="show_footer_hours"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Mostrar Horários</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="show_footer_links"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Mostrar Links</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <h4 className="font-medium">Informações de Contato</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Endereço</label>
              <Input
                value={footerContactInfo.address}
                onChange={(e) => updateContactInfo('address', e.target.value)}
                placeholder="Rua Example, 123 - Centro"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <Input
                value={footerContactInfo.city}
                onChange={(e) => updateContactInfo('city', e.target.value)}
                placeholder="São Paulo - SP"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <Input
                value={footerContactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input
                value={footerContactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
                placeholder="contato@clinica.com.br"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Hours Configuration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <h4 className="font-medium">Horários de Funcionamento</h4>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addHour}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Horário
            </Button>
          </div>
          
          <div className="space-y-3">
            {footerHours.map((hour, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <Input
                  placeholder="Dia da semana"
                  value={hour.day}
                  onChange={(e) => updateHour(index, 'day', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Horário (ex: 08:00 - 18:00)"
                  value={hour.hours}
                  onChange={(e) => updateHour(index, 'hours', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHour(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {footerHours.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum horário configurado</p>
              <p className="text-xs">Clique em "Adicionar Horário" para começar</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}