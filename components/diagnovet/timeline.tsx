"use client"

import { motion } from "framer-motion"
import { FileText, UserPlus, Calendar, Stethoscope, Pill } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TimelineItem {
  id: string
  type: "consultation" | "patient" | "appointment" | "diagnosis" | "treatment"
  title: string
  description: string
  time: string
  patient?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

const typeConfig = {
  consultation: {
    icon: FileText,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  patient: {
    icon: UserPlus,
    color: "bg-success/10 text-success border-success/20",
  },
  appointment: {
    icon: Calendar,
    color: "bg-accent/10 text-accent-foreground border-accent/20",
  },
  diagnosis: {
    icon: Stethoscope,
    color: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  treatment: {
    icon: Pill,
    color: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
}

export function Timeline({ items }: TimelineProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No hay actividad reciente</p>
        <p className="text-sm text-muted-foreground mt-1">
          Tu actividad aparecerá aquí
        </p>
      </div>
    )
  }

  return (
    <div className="relative space-y-4">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

      {items.map((item, index) => {
        const config = typeConfig[item.type]
        const Icon = config.icon

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4 pl-2"
          >
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-6 h-6 rounded-full border",
                config.color
              )}
            >
              <Icon className="h-3 w-3" />
            </div>
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.description}
                  </p>
                  {item.patient && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Paciente: {item.patient}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
