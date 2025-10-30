import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { AuthProvider } from "./hooks/useAuth";
import { AdminRoute } from "./components/AdminRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminEspecialidades from "./pages/admin/Especialidades";
import Medicos from "./pages/admin/Medicos";
import Agendamentos from "./pages/admin/Agendamentos";
import AdminBlog from "./pages/admin/Blog";
import Layout from "./pages/admin/Layout";
import AdminContato from "./pages/admin/Contato";
import Depoimentos from "./pages/admin/Depoimentos";
import ClinicaInfo from "./pages/admin/ClinicaInfo";
import AdminHome from "./pages/admin/Home";
import PaginasEstaticas from "./pages/admin/PaginasEstaticas";
import Usuarios from "./pages/admin/Usuarios";
// Public Pages
import Especialidades from "./pages/Especialidades";
import Equipe from "./pages/Equipe";
import Blog from "./pages/Blog";
import Agendamento from "./pages/Agendamento";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";
import StaticPage from "./pages/StaticPage";

const App = () => {
  useTheme() // Apply theme on app load
  
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Auth Route */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />
          
          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/especialidades" element={<AdminRoute><AdminEspecialidades /></AdminRoute>} />
          <Route path="/admin/medicos" element={<AdminRoute><Medicos /></AdminRoute>} />
          <Route path="/admin/agendamentos" element={<AdminRoute><Agendamentos /></AdminRoute>} />
          <Route path="/admin/blog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
          <Route path="/admin/layout" element={<AdminRoute><Layout /></AdminRoute>} />
          <Route path="/admin/contato" element={<AdminRoute><AdminContato /></AdminRoute>} />
          <Route path="/admin/depoimentos" element={<AdminRoute><Depoimentos /></AdminRoute>} />
          <Route path="/admin/clinica" element={<AdminRoute><ClinicaInfo /></AdminRoute>} />
          <Route path="/admin/home" element={<AdminRoute><AdminHome /></AdminRoute>} />
          <Route path="/admin/paginas" element={<AdminRoute><PaginasEstaticas /></AdminRoute>} />
          <Route path="/admin/usuarios" element={<AdminRoute><Usuarios /></AdminRoute>} />
          
          {/* Static Pages Route - MUST be last before 404 */}
          <Route path="/:slug" element={<StaticPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  )
}

export default App;