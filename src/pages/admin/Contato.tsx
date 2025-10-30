import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Phone, Clock, Eye, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mensagens = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-9999",
    assunto: "Dúvida sobre agendamento",
    mensagem: "Gostaria de saber como agendar uma consulta com cardiologista...",
    status: "unread",
    data: "2024-01-20T10:30:00",
  },
  {
    id: 2,
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    telefone: "(11) 88888-8888",
    assunto: "Informações sobre planos",
    mensagem: "Preciso saber quais planos de saúde vocês aceitam...",
    status: "read",
    data: "2024-01-19T14:15:00",
  },
  {
    id: 3,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 77777-7777",
    assunto: "Cancelamento de consulta",
    mensagem: "Preciso cancelar minha consulta marcada para amanhã...",
    status: "replied",
    data: "2024-01-19T09:45:00",
  },
  {
    id: 4,
    nome: "João Santos",
    email: "joao.santos@email.com",
    telefone: "(11) 66666-6666",
    assunto: "Elogio ao atendimento",
    mensagem: "Quero parabenizar toda a equipe pelo excelente atendimento...",
    status: "read",
    data: "2024-01-18T16:20:00",
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "unread":
      return "bg-red-100 text-red-800"
    case "read":
      return "bg-yellow-100 text-yellow-800"
    case "replied":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "unread":
      return "Não lida"
    case "read":
      return "Lida"
    case "replied":
      return "Respondida"
    default:
      return status
  }
}

export default function Contato() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mensagens de Contato</h2>
            <p className="text-muted-foreground">
              Gerencie as mensagens recebidas através do formulário de contato
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 esta semana</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
              <Mail className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Requer atenção</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">132</div>
              <p className="text-xs text-muted-foreground">84% de taxa de resposta</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4h</div>
              <p className="text-xs text-muted-foreground">Tempo de resposta</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Mensagens */}
        <Card>
          <CardHeader>
            <CardTitle>Mensagens Recebidas</CardTitle>
            <CardDescription>
              Todas as mensagens de contato dos pacientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Remetente</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mensagens.map((mensagem) => (
                  <TableRow key={mensagem.id} className={mensagem.status === 'unread' ? 'bg-red-50' : ''}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{mensagem.nome}</div>
                        <div className="text-sm text-muted-foreground">{mensagem.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{mensagem.assunto}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {mensagem.mensagem}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {mensagem.telefone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(mensagem.data).toLocaleDateString('pt-BR')}</div>
                        <div className="text-muted-foreground">
                          {new Date(mensagem.data).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(mensagem.status)}>
                        {getStatusText(mensagem.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-primary">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}