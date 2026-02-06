"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Plus,
  FileText,
  Download,
  Send,
  Archive,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Stethoscope,
  Activity,
  Pill,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "./main-nav"

interface TimelineEvent {
  id: string
  type: "study" | "consultation" | "treatment" | "appointment"
  title: string
  description: string
  date: string
  status: "completed" | "in-progress" | "scheduled"
  responsible?: string
}

interface ActiveProcess {
  id: string
  type: string
  status: "pending" | "in-progress" | "completed"
  responsible: string
  startDate: string
  endDate?: string
}

interface HistoricalStudy {
  id: string
  type: string
  date: string
  responsible: string
  diagnosis?: string
  files: number
}

// Datos mock del paciente
const MOCK_PATIENT = {
  id: "1",
  name: "Pacha",
  species: "Canino",
  breed: "Golden Retriever",
  age: "5 años",
  weight: "32 kg",
  tutor: "Nobile",
  tutorPhone: "+54 9 11 2345-6789",
  tutorEmail: "nobile@email.com",
  status: "En seguimiento",
  registrationDate: "15 de enero de 2024",
  chip: "982000123456789",
}

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "1",
    type: "study",
    title: "Ecografía abdominal",
    description: "Estudio en curso - Análisis de órganos internos",
    date: "12 de noviembre de 2025",
    status: "in-progress",
    responsible: "Dra. Valentina Gonzalez",
  },
  {
    id: "2",
    type: "consultation",
    title: "Consulta de seguimiento",
    description: "Control general y revisión de medicación",
    date: "05 de noviembre de 2025",
    status: "completed",
    responsible: "Dr. Carlos Méndez",
  },
  {
    id: "3",
    type: "treatment",
    title: "Tratamiento antibiótico",
    description: "Amoxicilina 250mg - Completado",
    date: "28 de octubre de 2025",
    status: "completed",
  },
  {
    id: "4",
    type: "study",
    title: "Radiografía torácica",
    description: "Estudio finalizado - Sin anomalías",
    date: "20 de octubre de 2025",
    status: "completed",
    responsible: "Dra. Valentina Gonzalez",
  },
  {
    id: "5",
    type: "appointment",
    title: "Vacunación anual",
    description: "Programado para próximo mes",
    date: "15 de diciembre de 2025",
    status: "scheduled",
  },
]

const MOCK_ACTIVE_PROCESSES: ActiveProcess[] = [
  {
    id: "1",
    type: "Ecografía abdominal",
    status: "in-progress",
    responsible: "Dra. Valentina Gonzalez",
    startDate: "12 de noviembre de 2025",
  },
  {
    id: "2",
    type: "Análisis de sangre",
    status: "pending",
    responsible: "Lab. Veterinario Central",
    startDate: "15 de noviembre de 2025",
  },
]

const MOCK_HISTORY: HistoricalStudy[] = [
  {
    id: "1",
    type: "Radiografía torácica",
    date: "20 de octubre de 2025",
    responsible: "Dra. Valentina Gonzalez",
    diagnosis: "Sin anomalías detectadas",
    files: 4,
  },
  {
    id: "2",
    type: "Ecografía renal",
    date: "15 de septiembre de 2025",
    responsible: "Dr. Mario Fernández",
    diagnosis: "Función renal normal",
    files: 6,
  },
  {
    id: "3",
    type: "Análisis de orina",
    date: "10 de agosto de 2025",
    responsible: "Lab. Veterinario Central",
    diagnosis: "Valores dentro de parámetros normales",
    files: 1,
  },
]

const TIMELINE_ICONS = {
  study: FileText,
  consultation: Stethoscope,
  treatment: Pill,
  appointment: Calendar,
}

const STATUS_ICONS = {
  completed: CheckCircle2,
  "in-progress": Activity,
  scheduled: Clock,
}

export function PatientDetail({ patientId }: { patientId: string }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const getProcessStatusBadge = (status: string) => {
    const config = {
      pending: { label: "Pendiente", variant: "outline" as const },
      "in-progress": { label: "En progreso", variant: "default" as const },
      completed: { label: "Completado", variant: "secondary" as const },
    }
    return config[status as keyof typeof config]
  }

  return (
    <MainNav>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a pacientes
        </Button>

        {/* Patient Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Avatar y info principal */}
                <div className="flex gap-4">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                      {MOCK_PATIENT.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">
                        🐾 {MOCK_PATIENT.name}
                      </h1>
                      <p className="text-muted-foreground">
                        {MOCK_PATIENT.species} • {MOCK_PATIENT.breed}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{MOCK_PATIENT.age}</Badge>
                      <Badge variant="outline">{MOCK_PATIENT.weight}</Badge>
                      <Badge variant="default" className="bg-primary">
                        {MOCK_PATIENT.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Info del tutor */}
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Tutor</p>
                    <p className="font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {MOCK_PATIENT.tutor}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Contacto</p>
                      <p className="text-sm text-foreground flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {MOCK_PATIENT.tutorPhone}
                      </p>
                      <p className="text-sm text-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {MOCK_PATIENT.tutorEmail}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Información</p>
                      <p className="text-sm text-foreground">
                        Chip: {MOCK_PATIENT.chip}
                      </p>
                      <p className="text-sm text-foreground">
                        Registro: {MOCK_PATIENT.registrationDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="flex flex-col gap-2">
                  <Button className="gap-2" size="sm">
                    <Plus className="h-4 w-4" />
                    Nuevo estudio
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Informe integral
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Send className="h-4 w-4" />
                    Enviar a tutor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          {/* Vista General */}
          <TabsContent value="overview" className="space-y-6">
            {/* Procesos Activos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Procesos Activos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MOCK_ACTIVE_PROCESSES.map((process) => (
                    <div
                      key={process.id}
                      className="flex items-start justify-between p-4 rounded-lg border bg-muted/50"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge {...getProcessStatusBadge(process.status)}>
                            {getProcessStatusBadge(process.status).label}
                          </Badge>
                          <h3 className="font-semibold text-foreground">
                            {process.type}
                          </h3>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Responsable: {process.responsible}</p>
                          <p>Inicio: {process.startDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2">
                          <ChevronRight className="h-4 w-4" />
                          Continuar
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Actividad reciente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_TIMELINE.slice(0, 3).map((event, index) => {
                      const Icon = TIMELINE_ICONS[event.type]
                      const StatusIcon = STATUS_ICONS[event.status]
                      return (
                        <div key={event.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            {index < 2 && (
                              <div className="w-px h-full bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-foreground flex items-center gap-2">
                                  {event.title}
                                  <StatusIcon className="h-4 w-4 text-muted-foreground" />
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                                {event.responsible && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {event.responsible}
                                  </p>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground whitespace-nowrap">
                                {event.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Timeline completo */}
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Timeline Completo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {MOCK_TIMELINE.map((event, index) => {
                    const Icon = TIMELINE_ICONS[event.type]
                    const StatusIcon = STATUS_ICONS[event.status]
                    return (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-primary/10 p-3 border-2 border-background shadow-sm">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          {index < MOCK_TIMELINE.length - 1 && (
                            <div className="w-px flex-1 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <Card className="border-2">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                  {event.title}
                                  <StatusIcon className="h-4 w-4 text-muted-foreground" />
                                </h3>
                                <Badge variant="outline">{event.date}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                              {event.responsible && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Responsable: {event.responsible}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Historial */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Historial de Estudios</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudio</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Diagnóstico</TableHead>
                      <TableHead>Archivos</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_HISTORY.map((study) => (
                      <TableRow key={study.id}>
                        <TableCell className="font-medium">
                          {study.type}
                        </TableCell>
                        <TableCell>{study.date}</TableCell>
                        <TableCell>{study.responsible}</TableCell>
                        <TableCell className="max-w-xs">
                          {study.diagnosis}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{study.files} archivos</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              Ver
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Panel de acciones */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">
              Acciones Disponibles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva consulta
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Generar informe
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Contactar tutor
              </Button>
              <Button variant="outline" className="gap-2 text-muted-foreground">
                <Archive className="h-4 w-4" />
                Archivar paciente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainNav>
  )
}
