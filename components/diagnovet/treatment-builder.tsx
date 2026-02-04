"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Pill, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface Medication {
  id: string
  name: string
  dose: string
  unit: string
  frequency: string
  duration: string
  notes?: string
}

interface TreatmentBuilderProps {
  medications: Medication[]
  onChange: (medications: Medication[]) => void
}

const frequencyOptions = [
  { value: "12h", label: "Cada 12 horas" },
  { value: "8h", label: "Cada 8 horas" },
  { value: "24h", label: "Una vez al día" },
  { value: "48h", label: "Cada 48 horas" },
  { value: "prn", label: "Según necesidad" },
]

const durationOptions = [
  { value: "3d", label: "3 días" },
  { value: "5d", label: "5 días" },
  { value: "7d", label: "7 días" },
  { value: "10d", label: "10 días" },
  { value: "14d", label: "14 días" },
  { value: "30d", label: "30 días" },
  { value: "indefinite", label: "Indefinido" },
]

const unitOptions = [
  { value: "mg", label: "mg" },
  { value: "ml", label: "ml" },
  { value: "g", label: "g" },
  { value: "ui", label: "UI" },
  { value: "tab", label: "tableta(s)" },
  { value: "cap", label: "cápsula(s)" },
]

export function TreatmentBuilder({ medications, onChange }: TreatmentBuilderProps) {
  const addMedication = () => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name: "",
      dose: "",
      unit: "mg",
      frequency: "12h",
      duration: "7d",
    }
    onChange([...medications, newMed])
  }

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    onChange(
      medications.map((med) =>
        med.id === id ? { ...med, ...updates } : med
      )
    )
  }

  const removeMedication = (id: string) => {
    onChange(medications.filter((med) => med.id !== id))
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {medications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-xl bg-muted/30"
          >
            <div className="p-4 rounded-full bg-muted mb-4">
              <Pill className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No hay medicamentos agregados</p>
            <p className="text-sm text-muted-foreground mt-1">
              Haz clic en el botón para agregar un tratamiento
            </p>
          </motion.div>
        ) : (
          medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className="relative bg-card border border-border rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">
                    Medicamento {index + 1}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMedication(med.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`name-${med.id}`}>Nombre del medicamento</Label>
                  <Input
                    id={`name-${med.id}`}
                    value={med.name}
                    onChange={(e) => updateMedication(med.id, { name: e.target.value })}
                    placeholder="Ej: Amoxicilina"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`dose-${med.id}`}>Dosis</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`dose-${med.id}`}
                      type="number"
                      value={med.dose}
                      onChange={(e) => updateMedication(med.id, { dose: e.target.value })}
                      placeholder="0"
                      className="flex-1"
                    />
                    <Select
                      value={med.unit}
                      onValueChange={(value) => updateMedication(med.id, { unit: value })}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {unitOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`frequency-${med.id}`} className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Frecuencia
                  </Label>
                  <Select
                    value={med.frequency}
                    onValueChange={(value) => updateMedication(med.id, { frequency: value })}
                  >
                    <SelectTrigger id={`frequency-${med.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`duration-${med.id}`} className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Duración
                  </Label>
                  <Select
                    value={med.duration}
                    onValueChange={(value) => updateMedication(med.id, { duration: value })}
                  >
                    <SelectTrigger id={`duration-${med.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 lg:col-span-3 space-y-2">
                  <Label htmlFor={`notes-${med.id}`}>Notas adicionales</Label>
                  <Input
                    id={`notes-${med.id}`}
                    value={med.notes || ""}
                    onChange={(e) => updateMedication(med.id, { notes: e.target.value })}
                    placeholder="Ej: Administrar con comida"
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addMedication}
        className="w-full border-dashed bg-transparent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar medicamento
      </Button>
    </div>
  )
}
