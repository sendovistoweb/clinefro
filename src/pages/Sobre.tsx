import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Calendar, 
  CheckCircle,
  Star,
  Target,
  Eye,
  Lightbulb
} from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Humanização",
    description: "Tratamos cada paciente com carinho, respeito e atenção individualizada."
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos sempre a mais alta qualidade em nossos serviços e tratamentos."
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Priorizamos a segurança do paciente em todos os procedimentos e protocolos."
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Investimos em tecnologia e métodos avançados para melhor atendimento."
  }
]

const achievements = [
  { number: "15+", label: "Anos de Experiência" },
  { number: "50+", label: "Médicos Especialistas" },
  { number: "10k+", label: "Pacientes Atendidos" },
  { number: "98%", label: "Satisfação dos Pacientes" }
]

const timeline = [
  {
    year: "2009",
    title: "Fundação da Clínica",
    description: "Início das atividades com foco em atendimento humanizado e qualidade médica."
  },
  {
    year: "2012",
    title: "Expansão das Especialidades",
    description: "Incorporação de novas especialidades médicas para atendimento integral."
  },
  {
    year: "2015",
    title: "Certificação ISO",
    description: "Obtenção de certificação internacional de qualidade em serviços de saúde."
  },
  {
    year: "2018",
    title: "Modernização Tecnológica",
    description: "Implementação de sistema digital e equipamentos de última geração."
  },
  {
    year: "2020",
    title: "Telemedicina",
    description: "Início dos serviços de consulta online e acompanhamento remoto."
  },
  {
    year: "2024",
    title: "Centro de Excelência",
    description: "Reconhecimento como centro de referência em medicina preventiva."
  }
]

export default function Sobre() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sobre Nossa Clínica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossa história, missão e os valores que nos guiam na busca 
              pela excelência em cuidados médicos há mais de 15 anos.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Fundada em 2009, nossa clínica nasceu com o propósito de oferecer 
                  cuidados médicos de excelência aliados ao atendimento humanizado. 
                  Desde o início, nossa missão tem sido proporcionar saúde e bem-estar 
                  para toda a família.
                </p>
                <p>
                  Ao longo dos anos, crescemos e evoluímos, sempre mantendo nossos 
                  valores fundamentais: qualidade, segurança, inovação e, principalmente, 
                  o cuidado personalizado com cada paciente.
                </p>
                <p>
                  Hoje, somos reconhecidos como uma das principais clínicas da região, 
                  contando com uma equipe multidisciplinar de especialistas e 
                  tecnologia de ponta para oferecer o melhor tratamento possível.
                </p>
              </div>
              <Button size="lg" className="mt-8" asChild>
                <Link to="/equipe" className="gap-2">
                  <Users className="w-5 h-5" />
                  Conheça Nossa Equipe
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                alt="Clínica Médica"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-bold text-gray-900">15+ Anos</p>
                    <p className="text-sm text-gray-600">de Experiência</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Propósitos
            </h2>
            <p className="text-xl text-gray-600">
              Os pilares que guiam nossas ações e decisões no dia a dia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Missão */}
            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Oferecer cuidados médicos de excelência com atendimento humanizado, 
                  promovendo saúde e bem-estar para nossos pacientes e suas famílias.
                </p>
              </CardContent>
            </Card>

            {/* Visão */}
            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Ser reconhecida como referência em medicina preventiva e curativa, 
                  inovando constantemente para melhor servir nossa comunidade.
                </p>
              </CardContent>
            </Card>

            {/* Valores */}
            <Card className="text-center">
              <CardHeader>
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Humanização, excelência, segurança, inovação, ética, respeito 
                  e compromisso com a qualidade de vida de nossos pacientes.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Valores Detalhados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Números e Conquistas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Números
            </h2>
            <p className="text-xl text-gray-600">
              Conquistas que refletem nosso compromisso com a excelência.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossa Trajetória
            </h2>
            <p className="text-xl text-gray-600">
              Principais marcos da nossa jornada de crescimento e evolução.
            </p>
          </div>
          
          <div className="relative">
            {/* Linha do tempo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8'}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="default">{item.year}</Badge>
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Ponto na linha do tempo */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-white shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Faça Parte da Nossa História
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Venha conhecer nossa clínica e experimente o cuidado que você merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/agendamento" className="gap-2">
                <Calendar className="w-5 h-5" />
                Agendar Consulta
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contato" className="gap-2 text-white border-white hover:bg-white hover:text-primary">
                Entrar em Contato
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}