"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  Users,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MainNav } from "./main-nav"
import { cn } from "@/lib/utils"

// Tipos
interface Appointment {
  id: string
  time: string
  patient: string
  owner: string
  type: string
  status: "confirmed" | "pending" | "cancelled"
  duration: number
  notes?: string
}

interface WorkingHours {
  day: string
  start: string
  end: string
  enabled: boolean
}

// Datos de ejemplo
const MOCK_APPOINTMENTS: { [key: string]: Appointment[] } = {
  "2026-02-06": [
    {
      id: "1",
      time: "09:00",
      patient: "Max",
      owner: "María García",
      type: "Control",
      status: "confirmed",
      duration: 30,
    },
    {
      id: "2",
      time: "10:00",
      patient: "Luna",
      owner: "Carlos López",
      type: "Vacunación",
      status: "confirmed",
      duration: 30,
    },
    {
      id: "3",
      time: "11:30",
      patient: "Rocky",
      owner: "Ana Martínez",
      type: "Revisión",
      status: "pending",
      duration: 45,
    },
    {
      id: "4",
      time: "14:00",
      patient: "Mia",
      owner: "Pedro Ruiz",
      type: "Ecografía",
      status: "confirmed",
      duration: 60,
    },
    {
      id: "5",
      time: "16:00",
      patient: "Toby",
      owner: "Laura Sánchez",
      type: "Cirugía menor",
      status: "confirmed",
      duration: 90,
    },
  ],
  "2026-02-07": [
    {
      id: "6",
      time: "09:30",
      patient: "Coco",
      owner: "Jorge Díaz",
      type: "Control",
      status: "confirmed",
      duration: 30,
    },
    {
      id: "7",
      time: "15:00",
      patient: "Bella",
      owner: "Sandra Torres",
      type: "Consulta",
      status: "pending",
      duration: 30,
    },
  ],
  "2026-02-10": [
    {
      id: "8",
      time: "10:00",
      patient: "Rex",
      owner: "Miguel Ángel",
      type: "Vacunación",
      status: "confirmed",
      duration: 30,
    },
  ],
  "2026-02-12": [
    {
      id: "9",
      time: "09:00",
      patient: "Simba",
      owner: "Patricia López",
      type: "Control post-operatorio",
      status: "confirmed",
      duration: 45,
    },
    {
      id: "10",
      time: "11:00",
      patient: "Nala",
      owner: "Roberto García",
      type: "Ecografía",
      status: "pending",
      duration: 60,
    },
  ],
}

const WORKING_HOURS: WorkingHours[] = [
  { day: "Lunes", start: "09:00", end: "18:00", enabled: true },
  { day: "Martes", start: "09:00", end: "18:00", enabled: true },
  { day: "Miércoles", start: "09:00", end: "18:00", enabled: true },
  { day: "Jueves", start: "09:00", end: "18:00", enabled: true },
  { day: "Viernes", start: "09:00", end: "17:00", enabled: true },
  { day: "Sábado", start: "09:00", end: "13:00", enabled: true },
  { day: "Domingo", start: "09:00", end: "13:00", enabled: false },
]

const STATUS_CONFIG = {
  confirmed: { label: "Confirmado", color: "bg-green-500/10 text-green-700 border-green-500/20" },
  pending: { label: "Pendiente", color: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-700 border-red-500/20" },
}

export function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 6)) // 6 de febrero 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 6))
  const [view, setView] = useState<"day" | "week">("day")

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const hasAppointments = (date: Date | null) => {
    if (!date) return false
    const dateStr = formatDate(date)
    return MOCK_APPOINTMENTS[dateStr] && MOCK_APPOINTMENTS[dateStr].length > 0
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return MOCK_APPOINTMENTS[dateStr] || []
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date(2026, 1, 6) // Fecha de prueba
    return formatDate(date) === formatDate(today)
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return formatDate(date) === formatDate(selectedDate)
  }

  const changeMonth = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    )
  }

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const selectedAppointments = getAppointmentsForDate(selectedDate)
  const pendingAppointments = selectedAppointments.filter(a => a.status === "pending")

  return (
    <MainNav>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tus citas y horarios de atención
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg" className="gap-2">
              <Settings className="h-5 w-5" />
              Configurar horarios
            </Button>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nueva cita
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changeMonth(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(2026, 1, 6))}
                  >
                    Hoy
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changeMonth(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentDate).map((date, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: date ? 1.05 : 1 }}
                      whileTap={{ scale: date ? 0.95 : 1 }}
                      onClick={() => date && setSelectedDate(date)}
                      disabled={!date}
                      className={cn(
                        "aspect-square p-2 rounded-lg text-sm font-medium transition-all relative",
                        !date && "invisible",
                        date && "hover:bg-muted",
                        isToday(date) && "bg-primary/10 text-primary border-2 border-primary",
                        isSelected(date) && !isToday(date) && "bg-primary text-primary-foreground",
                        !isToday(date) && !isSelected(date) && "text-foreground"
                      )}
                    >
                      {date && date.getDate()}
                      {date && hasAppointments(date) && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          <div className="w-1 h-1 rounded-full bg-primary" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Horario de atención */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Horario de atención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {WORKING_HOURS.map((schedule) => (
                    <div
                      key={schedule.day}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        schedule.enabled ? "bg-muted/30" : "bg-muted/10 opacity-50"
                      )}
                    >
                      <span className="font-medium text-sm">{schedule.day}</span>
                      {schedule.enabled ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{schedule.start}</span>
                          <span>-</span>
                          <span>{schedule.end}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Cerrado</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Panel lateral - Citas del día seleccionado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Resumen del día */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Total de citas</span>
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">
                    {selectedAppointments.length}
                  </Badge>
                </div>

                {pendingAppointments.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">Pendientes</span>
                    </div>
                    <Badge className="bg-amber-500 hover:bg-amber-600">
                      {pendingAppointments.length}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lista de citas */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">
                  Citas programadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No hay citas programadas</p>
                    <Button variant="link" className="mt-2">
                      Crear nueva cita
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedAppointments.map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative p-4 rounded-lg border bg-card hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg font-bold text-primary">
                                {appointment.time}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn("text-xs", STATUS_CONFIG[appointment.status].color)}
                              >
                                {STATUS_CONFIG[appointment.status].label}
                              </Badge>
                            </div>
                            <p className="font-semibold text-foreground mb-1">
                              {appointment.patient}
                            </p>
                            <p className="text-sm text-muted-foreground mb-1">
                              Tutor: {appointment.owner}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="px-2 py-1 bg-muted rounded">
                                {appointment.type}
                              </span>
                              <span>•</span>
                              <span>{appointment.duration} min</span>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              {appointment.status === "pending" && (
                                <DropdownMenuItem>
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                  Confirmar
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancelar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainNav>
  )
}
