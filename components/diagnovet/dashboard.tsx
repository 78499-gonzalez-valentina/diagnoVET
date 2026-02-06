"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Calendar,
  ChevronRight,
  FileText,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Stethoscope,
  User,
  UserPlus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Timeline, type TimelineItem } from "./timeline"
import { OnboardingTour } from "./onboarding-tour"
import { MainNav } from "./main-nav"
import { NewPatientModal } from "./new-patient-modal"
import { cn } from "@/lib/utils"

const recentActivity: TimelineItem[] = [
  {
    id: "1",
    type: "consultation",
    title: "Consulta completada",
    description: "Revisión general y vacunación",
    time: "Hace 2 horas",
    patient: "Max (Labrador)",
  },
  {
    id: "2",
    type: "patient",
    title: "Nuevo paciente registrado",
    description: "Luna - Gato Siamés",
    time: "Hace 4 horas",
  },
  {
    id: "3",
    type: "diagnosis",
    title: "Diagnóstico actualizado",
    description: "Dermatitis alérgica - Tratamiento iniciado",
    time: "Ayer",
    patient: "Rocky (Bulldog)",
  },
  {
    id: "4",
    type: "treatment",
    title: "Tratamiento prescrito",
    description: "Amoxicilina 250mg - 7 días",
    time: "Ayer",
    patient: "Mia (Persa)",
  },
  {
    id: "5",
    type: "appointment",
    title: "Cita programada",
    description: "Control post-operatorio",
    time: "Hace 2 días",
    patient: "Coco (Cacatúa)",
  },
]

const quickStats = [
  { label: "Consultas hoy", value: "12", change: "+3" },
  { label: "Pacientes activos", value: "156", change: "+8" },
  { label: "Citas pendientes", value: "5", change: "-2" },
]

export function Dashboard() {
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false)

  return (
    <MainNav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Buenos días, Dra. Valentina
          </h2>
          <p className="text-muted-foreground">
            Tienes {quickStats[2].value} citas pendientes para hoy
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    stat.change.startsWith("+") ? "text-green-600" : "text-amber-600"
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    ¿Qué quieres hacer hoy?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Acciones rápidas para tu día a día
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/nueva-consulta">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 transition-all cursor-pointer group"
                    data-tour="nueva-consulta"
                  >
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">Nueva Consulta</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Iniciar consulta guiada
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>

                <Link href="/analizar-paciente">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border bg-gradient-to-br from-violet-500/5 to-violet-500/10 hover:border-violet-500/50 transition-all cursor-pointer group"
                    data-tour="analizar-paciente"
                  >
                    <div className="p-4 rounded-full bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
                      <Stethoscope className="h-8 w-8 text-violet-600" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">Analizar Paciente</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Diagnóstico con IA
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsNewPatientModalOpen(true)}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all cursor-pointer group"
                >
                  <div className="p-4 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <UserPlus className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Crear Paciente</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Registrar nuevo paciente
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-1 transition-all" />
                </motion.div>

                <Link href="/agenda">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-chart-3/50 transition-all cursor-pointer group"
                  >
                    <div className="p-4 rounded-full bg-chart-3/10 group-hover:bg-chart-3/20 transition-colors">
                      <Calendar className="h-8 w-8 text-chart-3" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">Agenda</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ver citas del día
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-chart-3 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Today's Schedule Preview */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Próximas citas</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todas
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { time: "10:00", patient: "Max", owner: "María García", type: "Control" },
                  { time: "11:30", patient: "Luna", owner: "Carlos López", type: "Vacunación" },
                  { time: "14:00", patient: "Rocky", owner: "Ana Martínez", type: "Revisión" },
                ].map((appointment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary/10">
                      <span className="text-lg font-bold text-primary">{appointment.time.split(":")[0]}</span>
                      <span className="text-xs text-primary">:{appointment.time.split(":")[1]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {appointment.owner} • {appointment.type}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Actividad reciente</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todo
                </Button>
              </div>
              <Timeline items={recentActivity} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 diagnoVET x Valentina Gonzalez. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Soporte
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Onboarding Tour */}
      <OnboardingTour />

      {/* Modal de Nuevo Paciente */}
      <NewPatientModal 
        open={isNewPatientModalOpen} 
        onOpenChange={setIsNewPatientModalOpen}
      />
    </MainNav>
  )
}
