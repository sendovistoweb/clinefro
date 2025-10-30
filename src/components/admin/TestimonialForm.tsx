import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Star } from "lucide-react"
import { Testimonial } from "@/hooks/useTestimonials"

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSubmit: (data: any) => Promise<any>
  trigger?: React.ReactNode
}

export const TestimonialForm = ({ testimonial, onSubmit, trigger }: TestimonialFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    patient_name: testimonial?.patient_name || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
    photo_url: testimonial?.photo_url || '',
    active: testimonial?.active ?? true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      setIsOpen(false)
      if (!testimonial) {
        setFormData({
          patient_name: '', content: '', rating: 5, photo_url: '', active: true
        })
      }
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            type="button"
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
          >
            <Star 
              className={`w-5 h-5 ${
                star <= formData.rating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          </Button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {formData.rating} estrela{formData.rating !== 1 ? 's' : ''}
        </span>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            {testimonial ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {testimonial ? 'Editar' : 'Novo Depoimento'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient_name">Nome do Paciente</Label>
            <Input
              id="patient_name"
              value={formData.patient_name}
              onChange={(e) => setFormData(prev => ({ ...prev, patient_name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Depoimento</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Avaliação</Label>
            {renderStarRating()}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo_url">URL da Foto (opcional)</Label>
            <Input
              id="photo_url"
              type="url"
              value={formData.photo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(active) => setFormData(prev => ({ ...prev, active }))}
            />
            <Label htmlFor="active">Visível no site</Label>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {testimonial ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}