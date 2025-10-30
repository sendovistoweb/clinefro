import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar, Phone } from "lucide-react"
import { useLayoutSettings } from "@/hooks/useLayoutSettings"
import { useStaticPagesForMenu } from "@/hooks/useStaticPages"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { layoutSettings } = useLayoutSettings()
  const { data: staticPagesForMenu } = useStaticPagesForMenu()

  // Combine default menu items with static pages
  const defaultNavigation = layoutSettings?.menu_items?.filter(item => item.visible) || [
    { name: "Home", href: "/" },
    { name: "Especialidades", href: "/especialidades" },
    { name: "Equipe Médica", href: "/equipe" },
    { name: "Blog", href: "/blog" },
    { name: "A Clínica", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ]

  // Add static pages to navigation
  const staticPageItems = staticPagesForMenu?.map(page => ({
    name: page.title,
    href: `/${page.slug}`
  })) || []

  const navigation = [...defaultNavigation, ...staticPageItems]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
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
              <span className="ml-2 text-xl font-bold text-gray-900">
                {layoutSettings?.site_name || "Clínica Médica"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {layoutSettings?.show_contact_button && (
              <Button variant="outline" size="sm" asChild>
                <Link to={layoutSettings.contact_button_link} className="gap-2">
                  <Phone className="w-4 h-4" />
                  {layoutSettings.contact_button_text}
                </Link>
              </Button>
            )}
            {layoutSettings?.show_appointment_button && (
              <Button size="sm" asChild>
                <Link to={layoutSettings.appointment_button_link} className="gap-2">
                  <Calendar className="w-4 h-4" />
                  {layoutSettings.appointment_button_text}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                {layoutSettings?.show_contact_button && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to={layoutSettings.contact_button_link} className="gap-2" onClick={() => setIsOpen(false)}>
                      <Phone className="w-4 h-4" />
                      {layoutSettings.contact_button_text}
                    </Link>
                  </Button>
                )}
                {layoutSettings?.show_appointment_button && (
                  <Button size="sm" asChild>
                    <Link to={layoutSettings.appointment_button_link} className="gap-2" onClick={() => setIsOpen(false)}>
                      <Calendar className="w-4 h-4" />
                      {layoutSettings.appointment_button_text}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}