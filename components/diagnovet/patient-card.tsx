"use client"

import { motion } from "framer-motion"
import { Cat, Dog, Bird, Rabbit } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Patient {
  id: string
  name: string
  species: "dog" | "cat" | "bird" | "rabbit" | "other"
  breed: string
  age: string
  weight: string
  owner: string
  lastVisit?: string
  avatar?: string
}

interface PatientCardProps {
  patient: Patient
  selected?: boolean
  onClick?: () => void
  compact?: boolean
}

const speciesIcons = {
  dog: Dog,
  cat: Cat,
  bird: Bird,
  rabbit: Rabbit,
  other: Dog,
}

const speciesColors = {
  dog: "bg-amber-100 text-amber-700",
  cat: "bg-purple-100 text-purple-700",
  bird: "bg-sky-100 text-sky-700",
  rabbit: "bg-pink-100 text-pink-700",
  other: "bg-gray-100 text-gray-700",
}

export function PatientCard({ patient, selected, onClick, compact }: PatientCardProps) {
  const Icon = speciesIcons[patient.species]

  if (compact) {
    return (
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 w-full p-3 rounded-lg border transition-all text-left",
          selected
            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
            : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
        )}
      >
        <div className={cn("p-2 rounded-full", speciesColors[patient.species])}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{patient.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {patient.breed} • {patient.owner}
          </p>
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        )}
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col p-4 rounded-xl border transition-all text-left w-full",
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
          : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
      )}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary"
        />
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className={cn("p-3 rounded-xl", speciesColors[patient.species])}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg">{patient.name}</h3>
          <p className="text-sm text-muted-foreground">{patient.breed}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Edad:</span>{" "}
          <span className="text-foreground font-medium">{patient.age}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Peso:</span>{" "}
          <span className="text-foreground font-medium">{patient.weight}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-sm">
          <span className="text-muted-foreground">Propietario:</span>{" "}
          <span className="text-foreground font-medium">{patient.owner}</span>
        </p>
        {patient.lastVisit && (
          <p className="text-xs text-muted-foreground mt-1">
            Última visita: {patient.lastVisit}
          </p>
        )}
      </div>
    </motion.button>
  )
}
