import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  Navigation
} from "lucide-react"

const contactReasons = [
  "Informações sobre consultas",
  "Agendamento de exames",
  "Segunda via de receitas",
  "Convênios aceitos",
  "Reclamações",
  "Elogios",
  "Outros"
]

export default function Contato() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aqui para ajudar você. Entre em contato conosco através de qualquer 
              um dos canais abaixo ou visite nossa clínica.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de Contato */}
          <div className="space-y-6">
            {/* Localização */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Nossa Localização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Clínica Médica</p>
                  <p className="text-gray-600">Rua das Flores, 123</p>
                  <p className="text-gray-600">Centro - Cidade/Estado</p>
                  <p className="text-gray-600">CEP: 01234-567</p>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Navigation className="w-4 h-4" />
                  Ver no Mapa
                </Button>
              </CardContent>
            </Card>

            {/* Telefones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Telefones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Agendamentos</p>
                  <p className="text-gray-600">(11) 9999-9999</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Emergências</p>
                  <p className="text-gray-600">(11) 8888-8888</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <p className="text-gray-600">(11) 7777-7777</p>
                </div>
              </CardContent>
            </Card>

            {/* E-mail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  E-mail
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Geral</p>
                  <p className="text-gray-600">contato@clinicamedica.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Agendamentos</p>
                  <p className="text-gray-600">agendamento@clinicamedica.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Administrativo</p>
                  <p className="text-gray-600">admin@clinicamedica.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Horários */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segunda - Sexta</span>
                  <span className="font-medium">07:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-medium">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-medium text-red-600">Fechado</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Emergências:</strong> Atendimento 24h
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Envie uma Mensagem
                </CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e responderemos o mais breve possível
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Dados Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label>Motivo do Contato *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Assunto */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto *</Label>
                  <Input id="subject" placeholder="Assunto da sua mensagem" />
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea 
                    id="message"
                    placeholder="Descreva sua dúvida, sugestão ou solicitação com o máximo de detalhes possível..."
                    className="min-h-[150px]"
                  />
                </div>

                {/* Botão de Enviar */}
                <Button size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensagem
                </Button>

                {/* Aviso */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Importante:</strong> Para emergências médicas, ligue diretamente para 
                    (11) 8888-8888 ou procure o pronto-socorro mais próximo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Como Chegar</CardTitle>
              <CardDescription>
                Nossa clínica está localizada em uma região de fácil acesso, com estacionamento disponível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">Mapa da Localização</p>
                  <p className="text-sm">Rua das Flores, 123 - Centro</p>
                  <Button variant="outline" size="sm" className="mt-4 gap-2">
                    <Navigation className="w-4 h-4" />
                    Abrir no Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estacionamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Estacionamento gratuito disponível para pacientes e acompanhantes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transporte Público</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Próximo às estações de metrô e várias linhas de ônibus.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acessibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Instalações totalmente acessíveis para pessoas com mobilidade reduzida.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}