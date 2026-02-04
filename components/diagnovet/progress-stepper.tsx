"use client"

import React from "react"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Step {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (index: number) => void
}

export function ProgressStepper({ steps, currentStep, onStepClick }: ProgressStepperProps) {
  return (
    <div className="w-full">
      {/* Mobile view */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">
          Paso {currentStep + 1} de {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">{steps[currentStep]?.title}</span>
      </div>
      
      {/* Progress bar mobile */}
      <div className="md:hidden w-full h-2 bg-muted rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        
        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = onStepClick && index <= currentStep

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={cn(
                "relative flex flex-col items-center gap-2 z-10",
                isClickable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? "var(--primary)" : "var(--muted)",
                }}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  isCompleted || isCurrent
                    ? "border-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              <div className="text-center max-w-[100px]">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
