"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface NewPatientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewPatientModal({ open, onOpenChange }: NewPatientModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    // Información del Paciente
    patientName: "",
    species: "",
    breed: "",
    sex: "",
    birthDate: "",
    weight: "",
    color: "",
    
    // Información del Tutor
    tutorName: "",
    tutorPhone: "",
    tutorEmail: "",
    tutorAddress: "",
    
    // Información Médica
    allergies: "",
    previousConditions: "",
    currentMedications: "",
    observations: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "¡Paciente creado exitosamente!",
      description: `${formData.patientName} ha sido registrado en el sistema.`,
      duration: 4000,
    })

    // Resetear formulario y cerrar modal
    setFormData({
      patientName: "",
      species: "",
      breed: "",
      sex: "",
      birthDate: "",
      weight: "",
      color: "",
      tutorName: "",
      tutorPhone: "",
      tutorEmail: "",
      tutorAddress: "",
      allergies: "",
      previousConditions: "",
      currentMedications: "",
      observations: "",
    })

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[55vw] w-[55vw] max-h-[80vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🐾</span>
            </div>
            Nuevo Paciente
          </DialogTitle>
          <DialogDescription>
            Complete los datos del paciente y su tutor para crear un nuevo registro.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Información del Paciente */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b">
              <span className="text-lg font-semibold">🐕 Datos del Paciente</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="text-sm font-medium">
                  Nombre del paciente *
                </Label>
                <Input
                  id="patientName"
                  name="patientName"
                  placeholder="Ej: Max, Luna, Bobby"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="species" className="text-sm font-medium">
                  Especie *
                </Label>
                <Select
                  value={formData.species}
                  onValueChange={(value) => handleSelectChange("species", value)}
                  required
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar especie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canino">Canino</SelectItem>
                    <SelectItem value="felino">Felino</SelectItem>
                    <SelectItem value="ave">Ave</SelectItem>
                    <SelectItem value="reptil">Reptil</SelectItem>
                    <SelectItem value="roedor">Roedor</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed" className="text-sm font-medium">
                  Raza
                </Label>
                <Input
                  id="breed"
                  name="breed"
                  placeholder="Ej: Golden Retriever, Mestizo"
                  value={formData.breed}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex" className="text-sm font-medium">
                  Sexo *
                </Label>
                <Select
                  value={formData.sex}
                  onValueChange={(value) => handleSelectChange("sex", value)}
                  required
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macho">Macho</SelectItem>
                    <SelectItem value="hembra">Hembra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-medium">
                  Fecha de nacimiento
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  placeholder="Ej: 15.5"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color" className="text-sm font-medium">
                  Color/Pelaje
                </Label>
                <Input
                  id="color"
                  name="color"
                  placeholder="Ej: Dorado, Negro, Tricolor"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Información del Tutor */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b">
              <span className="text-lg font-semibold">👤 Datos del Tutor</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="tutorName" className="text-sm font-medium">
                  Nombre del tutor *
                </Label>
                <Input
                  id="tutorName"
                  name="tutorName"
                  placeholder="Nombre completo"
                  value={formData.tutorName}
                  onChange={handleInputChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutorPhone" className="text-sm font-medium">
                  Teléfono *
                </Label>
                <Input
                  id="tutorPhone"
                  name="tutorPhone"
                  type="tel"
                  placeholder="Ej: +54 9 11 1234-5678"
                  value={formData.tutorPhone}
                  onChange={handleInputChange}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutorEmail" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="tutorEmail"
                  name="tutorEmail"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.tutorEmail}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tutorAddress" className="text-sm font-medium">
                  Dirección
                </Label>
                <Input
                  id="tutorAddress"
                  name="tutorAddress"
                  placeholder="Calle, número, ciudad"
                  value={formData.tutorAddress}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Información Médica */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b">
              <span className="text-lg font-semibold">🩺 Información Médica</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-sm font-medium">
                  Alergias conocidas
                </Label>
                <Textarea
                  id="allergies"
                  name="allergies"
                  placeholder="Describa cualquier alergia a medicamentos, alimentos, etc."
                  value={formData.allergies}
                  onChange={handleInputChange}
                  rows={2}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousConditions" className="text-sm font-medium">
                  Condiciones médicas previas
                </Label>
                <Textarea
                  id="previousConditions"
                  name="previousConditions"
                  placeholder="Enfermedades, cirugías previas, etc."
                  value={formData.previousConditions}
                  onChange={handleInputChange}
                  rows={2}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications" className="text-sm font-medium">
                  Medicación actual
                </Label>
                <Textarea
                  id="currentMedications"
                  name="currentMedications"
                  placeholder="Medicamentos que está tomando actualmente"
                  value={formData.currentMedications}
                  onChange={handleInputChange}
                  rows={2}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations" className="text-sm font-medium">
                  Observaciones adicionales
                </Label>
                <Textarea
                  id="observations"
                  name="observations"
                  placeholder="Cualquier información adicional relevante"
                  value={formData.observations}
                  onChange={handleInputChange}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Guardando...
                </>
              ) : (
                <>
                  <span className="mr-2">✓</span>
                  Crear Paciente
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center -mt-2">
            Los campos marcados con * son obligatorios
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
