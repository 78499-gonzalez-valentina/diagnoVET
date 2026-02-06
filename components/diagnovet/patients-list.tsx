"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Copy,
  FileText,
  Archive,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MainNav } from "./main-nav"
import { NewPatientModal } from "./new-patient-modal"

// Tipos de estados
type PatientStatus = "pending" | "in-progress" | "completed" | "requires-attention" | "archived"

interface Patient {
  id: string
  name: string
  species: string
  breed?: string
  tutor: string
  studyType: string
  status: PatientStatus
  activeStudies: number
  lastUpdate: string
  priority?: "high" | "medium" | "low"
}

// Datos de ejemplo
const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Pacha",
    species: "Canino",
    breed: "Golden Retriever",
    tutor: "Nobile",
    studyType: "Ecografía",
    status: "in-progress",
    activeStudies: 1,
    lastUpdate: "12 de noviembre de 2025",
    priority: "medium",
  },
  {
    id: "2",
    name: "Lara",
    species: "Canino",
    breed: "Labrador",
    tutor: "Rosales",
    studyType: "Ecografía",
    status: "in-progress",
    activeStudies: 1,
    lastUpdate: "12 de noviembre de 2025",
    priority: "medium",
  },
  {
    id: "3",
    name: "Puki",
    species: "Canino",
    breed: "Bulldog",
    tutor: "Fermanelli",
    studyType: "Ecografía",
    status: "in-progress",
    activeStudies: 1,
    lastUpdate: "12 de noviembre de 2025",
    priority: "medium",
  },
  {
    id: "4",
    name: "Cira Test Cris Dos",
    species: "Canino",
    breed: "Pastor Alemán",
    tutor: "Cristian",
    studyType: "Ecografía",
    status: "in-progress",
    activeStudies: 2,
    lastUpdate: "12 de noviembre de 2025",
    priority: "high",
  },
  {
    id: "5",
    name: "Kali Test Siete",
    species: "Canino",
    breed: "Beagle",
    tutor: "Cristian",
    studyType: "Ecografía",
    status: "in-progress",
    activeStudies: 1,
    lastUpdate: "12 de noviembre de 2025",
    priority: "medium",
  },
  {
    id: "6",
    name: "Uma",
    species: "Canino",
    breed: "Husky",
    tutor: "Saiki",
    studyType: "Radiografía",
    status: "in-progress",
    activeStudies: 1,
    lastUpdate: "11 de noviembre de 2025",
    priority: "medium",
  },
  {
    id: "7",
    name: "Kali Test Cinco",
    species: "Canino",
    breed: "Cocker",
    tutor: "Cristian",
    studyType: "Ecografía",
    status: "in-progress",
    activeStudies: 1,
    lastUpdate: "11 de noviembre de 2025",
    priority: "low",
  },
]

const STATUS_CONFIG: Record<PatientStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
  pending: { label: "Pendiente", variant: "outline", color: "text-yellow-600" },
  "in-progress": { label: "En progreso", variant: "default", color: "text-blue-600" },
  completed: { label: "Completado", variant: "secondary", color: "text-green-600" },
  "requires-attention": { label: "Requiere atención", variant: "destructive", color: "text-red-600" },
  archived: { label: "Archivado", variant: "secondary", color: "text-gray-600" },
}

export function PatientsList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [patients] = useState<Patient[]>(MOCK_PATIENTS)
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.tutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.studyType.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewPatient = (patientId: string) => {
    router.push(`/pacientes/${patientId}`)
  }

  const handleContinueStudy = (patientId: string) => {
    router.push(`/analizar-paciente?patientId=${patientId}`)
  }

  return (
    <MainNav>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestión de Pacientes
            </h1>
            <p className="text-muted-foreground mt-1">
              Administra y da seguimiento a todos tus pacientes
            </p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setIsNewPatientModalOpen(true)}>
            <Plus className="h-5 w-5" />
            Nuevo Paciente
          </Button>
        </motion.div>

        {/* Filtros y búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, tutor o tipo de estudio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </motion.div>

        {/* Tabla de pacientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border shadow-sm overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Paciente</TableHead>
                <TableHead className="font-semibold">Tutor</TableHead>
                <TableHead className="font-semibold">Tipo de estudio</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient, index) => (
                <TableRow
                  key={patient.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  {/* Paciente */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {patient.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground flex items-center gap-2">
                          {patient.name}
                          {patient.activeStudies > 1 && (
                            <Badge variant="secondary" className="text-xs">
                              {patient.activeStudies} estudios
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {patient.species}
                          {patient.breed && ` • ${patient.breed}`}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Tutor */}
                  <TableCell className="text-foreground">
                    {patient.tutor}
                  </TableCell>

                  {/* Tipo de estudio */}
                  <TableCell className="text-foreground">
                    {patient.studyType}
                  </TableCell>

                  {/* Estado */}
                  <TableCell>
                    <Badge variant={STATUS_CONFIG[patient.status].variant}>
                      {STATUS_CONFIG[patient.status].label}
                    </Badge>
                  </TableCell>

                  {/* Fecha */}
                  <TableCell className="text-muted-foreground">
                    {patient.lastUpdate}
                  </TableCell>

                  {/* Acciones */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleContinueStudy(patient.id)}
                        className="gap-2"
                      >
                        <ChevronRight className="h-4 w-4" />
                        Continuar
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewPatient(patient.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver perfil completo
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Ver historial
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar información
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-muted-foreground">
                            <Archive className="h-4 w-4 mr-2" />
                            Archivar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPatients.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron pacientes que coincidan con tu búsqueda
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer info */}
        <div className="text-sm text-muted-foreground text-center">
          Mostrando {filteredPatients.length} de {patients.length} pacientes
        </div>
      </div>

      {/* Modal de Nuevo Paciente */}
      <NewPatientModal 
        open={isNewPatientModalOpen} 
        onOpenChange={setIsNewPatientModalOpen}
      />
    </MainNav>
  )
}
