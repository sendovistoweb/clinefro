import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Palette, RefreshCw } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

interface ColorEditorProps {
  form: UseFormReturn<any>
}

const colorFields = [
  { 
    name: "primary_color", 
    label: "Cor Primária", 
    description: "Cor principal da marca",
    defaultValue: "142 69% 58%" 
  },
  { 
    name: "secondary_color", 
    label: "Cor Secundária", 
    description: "Cor para elementos secundários",
    defaultValue: "210 40% 96.1%" 
  },
  { 
    name: "accent_color", 
    label: "Cor de Destaque", 
    description: "Cor para botões e elementos de destaque",
    defaultValue: "210 40% 96.1%" 
  },
  { 
    name: "background_color", 
    label: "Cor de Fundo", 
    description: "Cor de fundo principal do site",
    defaultValue: "210 20% 96%" 
  },
  { 
    name: "card_color", 
    label: "Cor dos Cards", 
    description: "Cor de fundo dos cartões e elementos",
    defaultValue: "0 0% 100%" 
  }
]

export function ColorEditor({ form }: ColorEditorProps) {
  const resetToDefaults = () => {
    colorFields.forEach(field => {
      form.setValue(field.name, field.defaultValue)
    })
  }

  const parseHslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(val => parseFloat(val.replace('%', '')))
    
    const c = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100)
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = (l / 100) - c / 2
    
    let r, g, b
    
    if (h < 60) {
      r = c; g = x; b = 0
    } else if (h < 120) {
      r = x; g = c; b = 0
    } else if (h < 180) {
      r = 0; g = c; b = x
    } else if (h < 240) {
      r = 0; g = x; b = c
    } else if (h < 300) {
      r = x; g = 0; b = c
    } else {
      r = c; g = 0; b = x
    }
    
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  }

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            <CardTitle>Editor de Cores</CardTitle>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={resetToDefaults}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Restaurar Padrão
          </Button>
        </div>
        <CardDescription>
          Personalize as cores do seu site. Use valores HSL (ex: 142 69% 58%) ou cores HEX
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          {...formField} 
                          placeholder={field.defaultValue}
                          className="flex-1"
                        />
                      </FormControl>
                      <div className="flex gap-1">
                        <div 
                          className="w-10 h-10 border rounded-md shadow-sm"
                          style={{ 
                            backgroundColor: `hsl(${formField.value || field.defaultValue})` 
                          }}
                        />
                        <input
                          type="color"
                          value={parseHslToHex(formField.value || field.defaultValue)}
                          onChange={(e) => formField.onChange(hexToHsl(e.target.value))}
                          className="w-10 h-10 border rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Preview das Cores</h4>
          <div className="grid grid-cols-5 gap-2">
            {colorFields.map((field) => (
              <div key={field.name} className="text-center">
                <div 
                  className="w-full h-12 rounded-md border shadow-sm mb-1"
                  style={{ 
                    backgroundColor: `hsl(${form.watch(field.name) || field.defaultValue})` 
                  }}
                />
                <p className="text-xs text-muted-foreground">{field.label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}