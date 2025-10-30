import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import {
  Heart,
  Brain,
  Eye,
  Baby,
  Bone,
  Stethoscope,
  Activity,
  Pill,
  Microscope,
  UserCheck,
  Calendar,
  ArrowRight
} from "lucide-react"
import { useSpecialties } from "@/hooks/useSpecialties"

export default function Especialidades() {
  const { specialties, isLoading } = useSpecialties()

  const iconMap: { [key: string]: any } = {
    Heart,
    Brain,
    Eye,
    Baby,
    Bone,
    Stethoscope,
    Activity,
    Pill,
    Microscope,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando especialidades...</p>
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
              Nossas Especialidades
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Contamos com uma equipe multidisciplinar de especialistas altamente qualificados 
              para oferecer o melhor tratamento em diversas áreas da medicina.
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

      {/* Especialidades Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => {
              const IconComponent = iconMap[specialty.icon || 'Stethoscope'] || Stethoscope
              return (
                <Card key={specialty.id} className="hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={specialty.image_url || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"} 
                      alt={specialty.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 p-2 rounded-lg">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{specialty.name}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {specialty.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      asChild
                    >
                      <Link to="/agendamento" className="gap-2">
                        Agendar Consulta
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Não encontrou a especialidade que procura?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Entre em contato conosco e teremos prazer em ajudá-lo a encontrar o especialista ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contato" className="gap-2">
                Entrar em Contato
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/equipe" className="gap-2">
                Conheça Nossa Equipe
                <UserCheck className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}