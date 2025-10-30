import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Calendar, Star, MapPin, Clock, GraduationCap } from "lucide-react"
import { useDoctors } from "@/hooks/useDoctors"

export default function Equipe() {
  const { doctors, isLoading } = useDoctors()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando equipe médica...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nossa Equipe Médica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Conheça nossos especialistas altamente qualificados, dedicados a oferecer 
              o melhor cuidado médico com experiência e humanização.
            </p>
            <Button size="lg" asChild>
              <Link to="/agendamento" className="gap-2">
                <Calendar className="w-5 h-5" />
                Agendar Consulta
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <img 
                      src={doctor.photo_url || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{doctor.name}</CardTitle>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{doctor.crm}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {doctor.bio}
                  </p>
                  
                  {/* Formação */}
                  {doctor.education && doctor.education.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        Formação
                      </h4>
                      <ul className="space-y-1">
                        {doctor.education.map((edu, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Experiência */}
                  {doctor.experience && doctor.experience.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Experiência</h4>
                      <ul className="space-y-1">
                        {doctor.experience.map((exp, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {exp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Disponibilidade */}
                  {doctor.available_hours && (
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-gray-900 text-sm">Horários</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{doctor.available_hours}</p>
                      {doctor.available_days && doctor.available_days.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {doctor.available_days.map((day, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    className="w-full group-hover:bg-primary/90 transition-colors"
                    asChild
                  >
                    <Link to="/agendamento" className="gap-2">
                      <Calendar className="w-4 h-4" />
                      Agendar com {doctor.name.split(' ')[0]}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Excelência em Números
            </h2>
            <p className="text-xl text-gray-600">
              Nossa equipe é reconhecida pela qualidade e dedicação ao cuidado médico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{doctors.length}+</div>
              <div className="text-gray-600">Médicos Especialistas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">Anos de Experiência Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Satisfação dos Pacientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-gray-600">Pacientes Atendidos</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}