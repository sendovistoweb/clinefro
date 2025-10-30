import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ImageSlider } from "@/components/ImageSlider"
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  Shield,
  Award,
  Phone
} from "lucide-react"
import { Link } from "react-router-dom"
import { useHomeContent } from "@/hooks/useHomeContent"
import { useSpecialties } from "@/hooks/useSpecialties"
import { useTestimonials } from "@/hooks/useTestimonials"
import { useAnalytics } from "@/hooks/useAnalytics"

const Index = () => {
  const { homeContent, loading: homeLoading } = useHomeContent()
  const { specialties, isLoading: specialtiesLoading } = useSpecialties()
  const { testimonials, isLoading: testimonialsLoading } = useTestimonials()
  
  // Registrar analytics da página
  useAnalytics()

  const iconMap: { [key: string]: any } = {
    Heart,
    Users,
    Stethoscope,
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Image Slider */}
      {homeContent?.slide_enabled && homeContent?.slide_images?.length > 0 && (
        <section className="mb-0">
          <ImageSlider slides={homeContent.slide_images} />
        </section>
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {homeContent?.hero_title || "Cuidado Médico de Excelência"}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              {homeContent?.hero_subtitle || "Oferecemos atendimento médico personalizado com uma equipe de especialistas comprometidos com sua saúde e bem-estar."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-lg sm:max-w-none mx-auto">
              <Link to="/agendamento" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 min-h-[48px]">
                  Agendar Consulta
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/sobre" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Conheça a Clínica
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">1000+</h3>
              <p className="text-muted-foreground">Pacientes Atendidos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">15+</h3>
              <p className="text-muted-foreground">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">100%</h3>
              <p className="text-muted-foreground">Segurança e Qualidade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossas Especialidades
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma ampla gama de especialidades médicas com profissionais altamente qualificados.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {specialties.slice(0, 3).map((specialty, index) => {
              const IconComponent = iconMap[specialty.icon || 'Stethoscope'] || Stethoscope
              return (
                <Card key={specialty.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>{specialty.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{specialty.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center">
            <Link to="/especialidades">
              <Button variant="outline" size="lg">
                Ver Todas as Especialidades
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que nossos pacientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Depoimentos reais de quem confia em nosso cuidado médico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold text-foreground">- {testimonial.patient_name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronto para cuidar da sua saúde?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Agende sua consulta hoje mesmo e tenha acesso ao melhor cuidado médico da região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agendamento">
              <Button size="lg" variant="secondary">
                Agendar Consulta
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Phone className="w-4 h-4 mr-2" />
                Entre em Contato
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-destructive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-destructive-foreground mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Emergência Médica?</h3>
              <p className="text-destructive-foreground/90">
                Em caso de emergência, ligue imediatamente ou procure o pronto-socorro mais próximo.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
                <Phone className="w-4 h-4 mr-2" />
                (11) 9999-9999
              </Badge>
              <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
                SAMU: 192
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
