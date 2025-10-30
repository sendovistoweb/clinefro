import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Calendar as CalendarIcon, User, Stethoscope, CheckCircle, Phone, Mail } from "lucide-react"
import { useAppointments } from "@/hooks/useAppointments"
import { useDoctors } from "@/hooks/useDoctors"
import { useSpecialties } from "@/hooks/useSpecialties"
import { useToast } from "@/hooks/use-toast"

export default function Agendamento() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [patientCpf, setPatientCpf] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { createAppointment } = useAppointments()
  const { doctors } = useDoctors()
  const { specialties } = useSpecialties()
  const { toast } = useToast()

  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doctor => doctor.specialty_id === selectedSpecialty)
    : doctors

  const handleSubmit = async () => {
    if (!patientName || !patientEmail || !patientPhone || !selectedSpecialty || !selectedDoctor) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createAppointment({
        patient_name: patientName,
        patient_email: patientEmail,
        patient_phone: patientPhone,
        patient_cpf: patientCpf || null,
        doctor_id: selectedDoctor,
        specialty_id: selectedSpecialty,
        appointment_date: new Date().toISOString().split('T')[0], // Data será marcada pelo admin
        appointment_time: "09:00", // Horário será marcado pelo admin
        notes: notes || null,
        status: "pending"
      })

      // Reset form
      setPatientName("")
      setPatientEmail("")
      setPatientPhone("")
      setPatientCpf("")
      setSelectedSpecialty("")
      setSelectedDoctor("")
      setNotes("")

      toast({
        title: "Sucesso!",
        description: "Sua solicitação de agendamento foi enviada. Nossa equipe entrará em contato para confirmar a data e horário."
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua solicitação. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Agende sua Consulta
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha a especialidade, médico e horário que melhor se adequa à sua necessidade. 
              Nosso agendamento é simples e rápido.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Agendamento */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Dados do Agendamento
                </CardTitle>
                <CardDescription>
                  Preencha as informações para agendar sua consulta
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Dados Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input 
                      id="name" 
                      placeholder="Seu nome completo" 
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input 
                      id="cpf" 
                      placeholder="000.000.000-00" 
                      value={patientCpf}
                      onChange={(e) => setPatientCpf(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com" 
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input 
                      id="phone" 
                      placeholder="(11) 99999-9999" 
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Especialidade e Médico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Especialidade *</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a especialidade" />
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
                    <Label>Médico *</Label>
                    <Select 
                      value={selectedDoctor} 
                      onValueChange={setSelectedDoctor}
                      disabled={!selectedSpecialty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o médico" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredDoctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Aviso sobre agendamento */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Como funciona o agendamento</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Após enviar sua solicitação, nossa equipe entrará em contato em até 2 horas úteis 
                        para confirmar a data e horário disponível que melhor se adequa à sua agenda.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Descreva brevemente o motivo da consulta ou observações importantes..."
                    className="min-h-[100px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Botão de Agendar */}
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Enviando..." : "Solicitar Agendamento"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com informações */}
          <div className="space-y-6">
            {/* Resumo do Agendamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Resumo do Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <strong>Paciente:</strong> {patientName || "Não informado"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <strong>Especialidade:</strong> {
                        selectedSpecialty 
                          ? specialties.find(s => s.id === selectedSpecialty)?.name || "Especialidade não encontrada"
                          : "Não selecionada"
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <strong>Médico:</strong> {
                        selectedDoctor 
                          ? doctors.find(d => d.id === selectedDoctor)?.name || "Médico não encontrado"
                          : "Não selecionado"
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <strong>Data/Horário:</strong> Será confirmado pela equipe
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <Card>
              <CardHeader>
                <CardTitle>Precisa de Ajuda?</CardTitle>
                <CardDescription>
                  Nossa equipe está pronta para ajudar você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">(11) 9999-9999</p>
                    <p className="text-sm text-gray-600">Segunda a Sexta, 7h às 18h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">agendamento@clinica.com</p>
                    <p className="text-sm text-gray-600">Resposta em até 2h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dicas */}
            <Card>
              <CardHeader>
                <CardTitle>Dicas Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Nossa equipe entrará em contato em até 2 horas úteis</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Confirmaremos data e horário disponível por telefone</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Traga um documento com foto e cartão do convênio</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Chegue 15 minutos antes do horário agendado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}