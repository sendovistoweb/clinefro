import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLayoutSettings } from "@/hooks/useLayoutSettings"

export function Footer() {
  const { layoutSettings } = useLayoutSettings()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {layoutSettings?.logo_url ? (
                <img 
                  src={layoutSettings.logo_url} 
                  alt="Logo" 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
              )}
              <span className="ml-2 text-xl font-bold">
                {layoutSettings?.site_name || "Clínica Médica"}
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {layoutSettings?.footer_description || "Oferecemos cuidados médicos de excelência com uma equipe especializada e tecnologia de ponta para garantir o melhor atendimento aos nossos pacientes."}
            </p>
            {layoutSettings?.show_footer_contact && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-400">
                    {layoutSettings.footer_contact_info?.address}, {layoutSettings.footer_contact_info?.city}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-gray-400">{layoutSettings.footer_contact_info?.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-gray-400">{layoutSettings.footer_contact_info?.email}</span>
                </div>
              </div>
            )}
          </div>

          {/* Links Rápidos */}
          {layoutSettings?.show_footer_links && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                {layoutSettings.menu_items?.filter(item => item.visible).map((item, index) => (
                  <li key={index}>
                    <Link to={item.href} className="text-gray-400 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Horário de Funcionamento */}
          {layoutSettings?.show_footer_hours && layoutSettings.footer_hours && layoutSettings.footer_hours.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Funcionamento</h3>
              <div className="space-y-2">
                {layoutSettings.footer_hours.map((hour, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="text-gray-400">
                      <div>{hour.day}</div>
                      <div className="text-sm">{hour.hours}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Clínica Médica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}