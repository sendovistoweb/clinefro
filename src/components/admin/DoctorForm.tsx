import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit } from "lucide-react"
import { Doctor } from "@/hooks/useDoctors"
import { useSpecialties } from "@/hooks/useSpecialties"

interface DoctorFormProps {
  doctor?: Doctor
  onSubmit: (data: any) => Promise<any>
  trigger?: React.ReactNode
}

export const DoctorForm = ({ doctor, onSubmit, trigger }: DoctorFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { specialties } = useSpecialties()
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    crm: doctor?.crm || '',
    bio: doctor?.bio || '',
    specialty_id: doctor?.specialty_id || '',
    photo_url: doctor?.photo_url || '',
    available_hours: doctor?.available_hours || '',
    education: doctor?.education?.join('\n') || '',
    experience: doctor?.experience?.join('\n') || '',
    available_days: doctor?.available_days || []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData = {
        ...formData,
        education: formData.education ? formData.education.split('\n').filter(Boolean) : null,
        experience: formData.experience ? formData.experience.split('\n').filter(Boolean) : null,
        specialty_id: formData.specialty_id || null
      }
      await onSubmit(submitData)
      setIsOpen(false)
      if (!doctor) {
        setFormData({
          name: '', crm: '', bio: '', specialty_id: '', photo_url: '',
          available_hours: '', education: '', experience: '', available_days: []
        })
      }
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  const daysOfWeek = [
    { value: 'monday', label: 'Segunda-feira' },
    { value: 'tuesday', label: 'Terça-feira' },
    { value: 'wednesday', label: 'Quarta-feira' },
    { value: 'thursday', label: 'Quinta-feira' },
    { value: 'friday', label: 'Sexta-feira' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            {doctor ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {doctor ? 'Editar' : 'Novo Médico'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {doctor ? 'Editar Médico' : 'Novo Médico'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crm">CRM</Label>
              <Input
                id="crm"
                value={formData.crm}
                onChange={(e) => setFormData(prev => ({ ...prev, crm: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidade</Label>
            <Select value={formData.specialty_id} onValueChange={(value) => setFormData(prev => ({ ...prev, specialty_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma especialidade" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo_url">URL da Foto</Label>
            <Input
              id="photo_url"
              type="url"
              value={formData.photo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="available_hours">Horários Disponíveis</Label>
            <Input
              id="available_hours"
              value={formData.available_hours}
              onChange={(e) => setFormData(prev => ({ ...prev, available_hours: e.target.value }))}
              placeholder="08:00 - 17:00"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education">Formação (uma por linha)</Label>
            <Textarea
              id="education"
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              rows={3}
              placeholder="Medicina - USP (2010)
Residência em Cardiologia - InCor (2013)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Experiência (uma por linha)</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              rows={3}
              placeholder="Hospital das Clínicas (2013-2018)
Clínica Cardiológica (2018-presente)"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {doctor ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}