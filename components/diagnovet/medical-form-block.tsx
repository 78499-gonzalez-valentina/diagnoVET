"use client"

import React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface VitalSign {
  id: string
  label: string
  value: string
  unit: string
  icon: React.ReactNode
  tooltip?: string
  min?: number
  max?: number
  onChange: (value: string) => void
}

interface MedicalFormBlockProps {
  title: string
  description?: string
  children?: React.ReactNode
  vitalSigns?: VitalSign[]
}

export function MedicalFormBlock({
  title,
  description,
  children,
  vitalSigns,
}: MedicalFormBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {vitalSigns && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vitalSigns.map((vital) => (
            <VitalSignInput key={vital.id} vital={vital} />
          ))}
        </div>
      )}

      {children}
    </motion.div>
  )
}

function VitalSignInput({ vital }: { vital: VitalSign }) {
  const isInRange =
    vital.value === "" ||
    ((!vital.min || Number(vital.value) >= vital.min) &&
      (!vital.max || Number(vital.value) <= vital.max))

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={vital.id} className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="text-primary">{vital.icon}</span>
          {vital.label}
        </Label>
        {vital.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-foreground">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{vital.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        <Input
          id={vital.id}
          type="number"
          value={vital.value}
          onChange={(e) => vital.onChange(e.target.value)}
          placeholder="0"
          className={cn(
            "pr-12 transition-colors",
            !isInRange && "border-destructive focus-visible:ring-destructive"
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {vital.unit}
        </span>
      </div>
      {!isInRange && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive"
        >
          Valor fuera del rango normal ({vital.min}-{vital.max} {vital.unit})
        </motion.p>
      )}
    </div>
  )
}
