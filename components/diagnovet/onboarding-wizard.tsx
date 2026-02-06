"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Info, Stethoscope } from "lucide-react"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

type OnboardingStep = 1 | 2

interface OnboardingData {
  // Step 1: Veterinary Clinic Info
  clinicName: string
  address: string
  countryCode: string
  phoneNumber: string
  // Step 2: Professional Info (integrado)
  professionalTitle: string
  fullName: string
  professionalLicense: string
}

const PROFESSIONAL_TITLES = [
  "Dr.",
  "Dra.",
  "M.V.",
  "Med. Vet.",
  "Veterinario",
  "Veterinaria",
]

const COUNTRY_CODES = [
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { code: "+34", country: "España", flag: "🇪🇸" },
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { code: "+504", country: "Honduras", flag: "🇭🇳" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { code: "+507", country: "Panamá", flag: "🇵🇦" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾" },
  { code: "+51", country: "Perú", flag: "🇵🇪" },
  { code: "+1-787", country: "Puerto Rico", flag: "🇵🇷" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
]

export function OnboardingWizard() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    clinicName: "",
    address: "",
    countryCode: "+54",
    phoneNumber: "",
    professionalTitle: "",
    fullName: "",
    professionalLicense: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Pre-fill full name from registration if available
  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const user = JSON.parse(userData)
      setOnboardingData((prev) => ({
        ...prev,
        fullName: user.name || "",
      }))
    }
  }, [])

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!onboardingData.clinicName.trim()) {
      newErrors.clinicName = "El nombre de la clínica es requerido"
    } else if (onboardingData.clinicName.length < 3) {
      newErrors.clinicName = "El nombre debe tener al menos 3 caracteres"
    }

    if (!onboardingData.address.trim()) {
      newErrors.address = "La dirección es requerida"
    }

    if (!onboardingData.phoneNumber.trim()) {
      newErrors.phoneNumber = "El teléfono es requerido"
    } else if (!/^[\d\s\-\(\)]+$/.test(onboardingData.phoneNumber)) {
      newErrors.phoneNumber = "Solo números, espacios y guiones"
    } else if (onboardingData.phoneNumber.replace(/\D/g, "").length < 6) {
      newErrors.phoneNumber = "El teléfono debe tener al menos 6 dígitos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!onboardingData.professionalTitle) {
      newErrors.professionalTitle = "El título profesional es requerido"
    }

    if (!onboardingData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido"
    } else if (onboardingData.fullName.length < 3) {
      newErrors.fullName = "El nombre debe tener al menos 3 caracteres"
    }

    // License is optional, but validate format if provided
    if (onboardingData.professionalLicense.trim()) {
      if (onboardingData.professionalLicense.length < 3) {
        newErrors.professionalLicense = "Formato de matrícula inválido"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = async () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2)
      }
    } else {
      if (validateStep2()) {
        // Save onboarding data
        const userData = localStorage.getItem("currentUser")
        if (userData) {
          const user = JSON.parse(userData)
          user.hasCompletedOnboarding = true
          user.clinicName = onboardingData.clinicName
          user.professionalTitle = onboardingData.professionalTitle
          user.fullName = onboardingData.fullName
          localStorage.setItem("currentUser", JSON.stringify(user))
        }

        toast({
          title: "¡Perfil completado!",
          description: "Tu cuenta está lista para usar",
          duration: 3000,
        })

        // Simulate saving
        await new Promise((resolve) => setTimeout(resolve, 1000))

        router.push("/dashboard?tour=true")
      }
    }
  }

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setOnboardingData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-primary/5 to-background dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Veterinary Clinic Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Left: Image */}
              <div className="hidden md:flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-cyan-400 rounded-full blur-3xl opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl">
                    <div className="text-8xl text-center">🐕</div>
                    <p className="text-center mt-4 text-sm text-muted-foreground">
                      Mascotas esperando atención veterinaria
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <Card className="border-2 shadow-2xl">
                <CardHeader className="space-y-2">
                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl text-center">
                    Información de la Veterinaria
                  </CardTitle>
                  <CardDescription className="text-center">
                    Completa los datos de tu clínica veterinaria para continuar
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinicName">
                        Nombre legal de la veterinaria{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="clinicName"
                        placeholder="Ej: Veterinaria San Juan"
                        value={onboardingData.clinicName}
                        onChange={(e) =>
                          handleInputChange("clinicName", e.target.value)
                        }
                        className={`h-12 ${
                          errors.clinicName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.clinicName && (
                        <p className="text-xs text-red-500">{errors.clinicName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Dirección <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="address"
                        placeholder="Ej: Av. Principal 123, Ciudad"
                        value={onboardingData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className={`h-12 ${errors.address ? "border-red-500" : ""}`}
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">
                        Número de teléfono <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={onboardingData.countryCode}
                          onValueChange={(value) =>
                            handleInputChange("countryCode", value)
                          }
                        >
                          <SelectTrigger className="w-[140px] h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRY_CODES.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.flag} {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phoneNumber"
                          placeholder="123456789"
                          value={onboardingData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className={`h-12 flex-1 ${
                            errors.phoneNumber ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-xs text-red-500">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Info Box */}
                  <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border border-primary/20 dark:border-primary/30">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 text-sm text-foreground">
                        <p className="font-semibold">
                          ¿Por qué necesitamos esta información?
                        </p>
                        <ul className="space-y-1 text-xs">
                          <li>• Identificar tu clínica en el sistema</li>
                          <li>• Facilitar la comunicación con clientes</li>
                          <li>• Cumplir con requisitos legales</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Professional Info */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Left: Image */}
              <div className="hidden md:flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-cyan-400 rounded-full blur-3xl opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl">
                    <div className="text-8xl text-center">🐾</div>
                    <p className="text-center mt-4 text-sm text-muted-foreground">
                      Mascotas listas para su chequeo
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <Card className="border-2 shadow-2xl">
                <CardHeader className="space-y-2">
                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl text-center">
                    Casi listo...
                  </CardTitle>
                  <CardDescription className="text-center">
                    Necesitamos algunos detalles más para mejorar tu experiencia
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="professionalTitle">
                        Título Profesional <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={onboardingData.professionalTitle}
                        onValueChange={(value) =>
                          handleInputChange("professionalTitle", value)
                        }
                      >
                        <SelectTrigger
                          id="professionalTitle"
                          className={`h-12 ${
                            errors.professionalTitle ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Selecciona tu título" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROFESSIONAL_TITLES.map((title) => (
                            <SelectItem key={title} value={title}>
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.professionalTitle && (
                        <p className="text-xs text-red-500">
                          {errors.professionalTitle}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Nombre Completo <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Fernanda Barbero"
                        value={onboardingData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className={`h-12 ${errors.fullName ? "border-red-500" : ""}`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="professionalLicense">
                        Matrícula Profesional{" "}
                        <span className="text-muted-foreground text-xs">
                          (Opcional)
                        </span>
                      </Label>
                      <Input
                        id="professionalLicense"
                        placeholder="Ej: MP 12345"
                        value={onboardingData.professionalLicense}
                        onChange={(e) =>
                          handleInputChange("professionalLicense", e.target.value)
                        }
                        className={`h-12 ${
                          errors.professionalLicense ? "border-red-500" : ""
                        }`}
                      />
                      {errors.professionalLicense && (
                        <p className="text-xs text-red-500">
                          {errors.professionalLicense}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white shadow-lg shadow-emerald-500/30"
                  >
                    Completar Perfil
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Info Box */}
                  <div className="bg-primary/10 dark:from-emerald-950/20 dark:to-cyan-950/20 rounded-lg p-4 border border-primary/20 dark:border-primary/30">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 text-sm text-emerald-900 dark:text-emerald-100">
                        <p className="font-semibold">
                          ¿Por qué necesitamos esta información?
                        </p>
                        <ul className="space-y-1 text-xs">
                          <li>• Personalizar tu perfil profesional</li>
                          <li>• Mostrar tus credenciales a los clientes</li>
                          <li>• Generar informes con tu información</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          <div
            className={`h-2 w-16 rounded-full transition-all ${
              currentStep === 1 ? "bg-gradient-to-r from-emerald-500 to-cyan-600" : "bg-emerald-200 dark:bg-emerald-800"
            }`}
          />
          <div
            className={`h-2 w-16 rounded-full transition-all ${
              currentStep === 2 ? "bg-gradient-to-r from-emerald-500 to-cyan-600" : "bg-emerald-200 dark:bg-emerald-800"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
