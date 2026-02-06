"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TourStep {
  title: string
  description: string
  target: string // CSS selector del elemento a resaltar
  position: "top" | "bottom" | "left" | "right"
}

const tourSteps: TourStep[] = [
  {
    title: "¡Bienvenido a diagnoVET! 🎉",
    description:
      "Esta es tu plataforma de diagnóstico veterinario asistida por IA. Te guiaremos en un recorrido rápido por las funciones principales.",
    target: "body",
    position: "bottom",
  },
  {
    title: "Analizar Paciente",
    description:
      'Haz clic aquí para crear un nuevo estudio diagnóstico. Podrás subir imágenes, agregar información del paciente y generar hallazgos con IA.',
    target: "[data-tour='analizar-paciente']",
    position: "bottom",
  },
  {
    title: "Nueva Consulta",
    description:
      "Registra consultas veterinarias completas con diagnósticos, tratamientos y seguimientos. Todo organizado en un solo lugar.",
    target: "[data-tour='nueva-consulta']",
    position: "bottom",
  },
  {
    title: "Tu Perfil",
    description:
      "Accede a tu perfil en cualquier momento para actualizar tu información personal, configuración de la veterinaria y preferencias.",
    target: "[data-tour='perfil']",
    position: "left",
  },
]

export function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user has seen the tour or comes from onboarding
    const hasSeenTour = localStorage.getItem("hasSeenTour")
    const urlParams = new URLSearchParams(window.location.search)
    const showTour = urlParams.get("tour") === "true"
    
    if (!hasSeenTour || showTour) {
      // Show tour after a short delay
      setTimeout(() => {
        setIsVisible(true)
      }, 800)
      
      // Clean up URL parameter
      if (showTour) {
        window.history.replaceState({}, "", "/dashboard")
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const updatePosition = () => {
      const currentTourStep = tourSteps[currentStep]
      let targetElement: HTMLElement | null = null

      if (currentTourStep.target === "body") {
        // First step - center of screen
        setTargetRect(null)
        setTooltipPosition({
          top: window.innerHeight / 2 - 150,
          left: window.innerWidth / 2 - 200,
        })
      } else {
        targetElement = document.querySelector(currentTourStep.target)
        
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect()
          setTargetRect(rect)

          // Calculate tooltip position based on target position
          const cardWidth = 400
          const cardHeight = 250
          const gap = 20
          const padding = 32

          let top = 0
          let left = 0
          let finalPosition = currentTourStep.position

          // Calculate initial position
          switch (currentTourStep.position) {
            case "bottom":
              top = rect.bottom + gap
              left = rect.left + rect.width / 2 - cardWidth / 2
              // If doesn't fit below, try above
              if (top + cardHeight > window.innerHeight - padding) {
                top = rect.top - cardHeight - gap
                finalPosition = "top"
              }
              break
            case "top":
              top = rect.top - cardHeight - gap
              left = rect.left + rect.width / 2 - cardWidth / 2
              // If doesn't fit above, try below
              if (top < padding) {
                top = rect.bottom + gap
                finalPosition = "bottom"
              }
              break
            case "left":
              top = rect.top + rect.height / 2 - cardHeight / 2
              left = rect.left - cardWidth - gap
              // If doesn't fit left, try right
              if (left < padding) {
                left = rect.right + gap
                finalPosition = "right"
              }
              break
            case "right":
              top = rect.top + rect.height / 2 - cardHeight / 2
              left = rect.right + gap
              // If doesn't fit right, try left
              if (left + cardWidth > window.innerWidth - padding) {
                left = rect.left - cardWidth - gap
                finalPosition = "left"
              }
              break
          }

          // Final adjustments to keep within viewport
          if (left < padding) left = padding
          if (left + cardWidth > window.innerWidth - padding) {
            left = window.innerWidth - cardWidth - padding
          }
          if (top < padding) top = padding
          if (top + cardHeight > window.innerHeight - padding) {
            top = window.innerHeight - cardHeight - padding
          }

          setTooltipPosition({ top, left })

          // Scroll element into view if needed
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [isVisible, currentStep])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenTour", "true")
  }

  const handleSkip = () => {
    handleClose()
  }

  if (!isVisible) return null

  const currentTourStep = tourSteps[currentStep]
  const isLastStep = currentStep === tourSteps.length - 1
  const isFirstStep = currentStep === 0

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay with spotlight effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{
              background: targetRect
                ? `radial-gradient(circle at ${targetRect.left + targetRect.width / 2}px ${
                    targetRect.top + targetRect.height / 2
                  }px, transparent ${Math.max(targetRect.width, targetRect.height) / 2 + 20}px, rgba(0, 0, 0, 0.4) ${
                    Math.max(targetRect.width, targetRect.height) / 2 + 150
                  }px)`
                : "rgba(0, 0, 0, 0.4)",
            }}
          />

          {/* Highlight border around target */}
          {targetRect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed z-[9999] pointer-events-none"
              style={{
                top: targetRect.top - 4,
                left: targetRect.left - 4,
                width: targetRect.width + 8,
                height: targetRect.height + 8,
                border: "3px solid",
                borderColor: "var(--primary)",
                borderRadius: "8px",
                boxShadow: "0 0 0 4px rgba(var(--primary-rgb), 0.2), 0 0 20px rgba(var(--primary-rgb), 0.4)",
              }}
            />
          )}

          {/* Tour Tooltip */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed z-[10000] pointer-events-auto"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              width: isFirstStep ? "400px" : "400px",
            }}
          >
            <Card className="shadow-2xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
              <CardContent className="p-5">
                {/* Close Button */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      Paso {currentStep + 1} de {tourSteps.length}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground -mr-2 -mt-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Content */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 mb-4"
                >
                  <h3 className="text-lg font-bold text-foreground">
                    {currentTourStep.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentTourStep.description}
                  </p>
                </motion.div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-1.5 mb-4">
                  {tourSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentStep
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-muted-foreground text-sm h-9"
                  >
                    Saltar tour
                  </Button>

                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={handlePrev}
                        size="sm"
                        className="h-9"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Atrás
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      className="bg-primary hover:bg-primary/90 h-9"
                      size="sm"
                    >
                      {isLastStep ? (
                        <>
                          ¡Empezar!
                          <Sparkles className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Siguiente
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
