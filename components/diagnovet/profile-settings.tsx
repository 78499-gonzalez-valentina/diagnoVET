"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  User,
  Building2,
  Upload,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileSignature,
  X,
  Check,
  ChevronDown,
} from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Tab = "personal" | "veterinaria"

interface UserProfile {
  // Personal data
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phone: string
  professionalTitle: string
  professionalLicense: string
  memberSince: string
  // Veterinary clinic data
  clinicName: string
  clinicAddress: string
  clinicCountryCode: string
  clinicPhone: string
  // Settings
  language: string
  signature: string | null
}

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
]

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

export function ProfileSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<Tab>("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+54",
    phone: "",
    professionalTitle: "",
    professionalLicense: "",
    memberSince: "",
    clinicName: "",
    clinicAddress: "",
    clinicCountryCode: "+54",
    clinicPhone: "",
    language: "es",
    signature: null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const user = JSON.parse(userData)
      
      // Split full name into first and last name
      const nameParts = (user.fullName || user.name || "").split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      setProfile({
        firstName,
        lastName,
        email: user.email || "",
        countryCode: user.countryCode || "+54",
        phone: user.phone || "",
        professionalTitle: user.professionalTitle || "",
        professionalLicense: user.professionalLicense || "",
        memberSince: "11/20/2025",
        clinicName: user.clinicName || "",
        clinicAddress: user.address || "",
        clinicCountryCode: user.clinicCountryCode || "+54",
        clinicPhone: user.clinicPhone || "",
        language: user.language || "es",
        signature: user.signature || null,
      })

      if (user.signature) {
        setSignaturePreview(user.signature)
      }
    }
  }, [])

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validatePersonalData = () => {
    const newErrors: Record<string, string> = {}

    if (!profile.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido"
    } else if (profile.firstName.length < 2) {
      newErrors.firstName = "El nombre debe tener al menos 2 caracteres"
    }

    if (!profile.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido"
    } else if (profile.lastName.length < 2) {
      newErrors.lastName = "El apellido debe tener al menos 2 caracteres"
    }

    if (!profile.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Email inválido"
    }

    if (profile.phone.trim()) {
      if (!/^[\d\s\-\(\)]+$/.test(profile.phone)) {
        newErrors.phone = "Solo números, espacios y guiones"
      } else if (profile.phone.replace(/\D/g, "").length < 6) {
        newErrors.phone = "El teléfono debe tener al menos 6 dígitos"
      }
    }

    if (!profile.professionalTitle) {
      newErrors.professionalTitle = "El título profesional es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateVeterinaryData = () => {
    const newErrors: Record<string, string> = {}

    if (!profile.clinicName.trim()) {
      newErrors.clinicName = "El nombre de la clínica es requerido"
    } else if (profile.clinicName.length < 3) {
      newErrors.clinicName = "El nombre debe tener al menos 3 caracteres"
    }

    if (!profile.clinicAddress.trim()) {
      newErrors.clinicAddress = "La dirección es requerida"
    }

    if (profile.clinicPhone.trim()) {
      if (!/^[\d\s\-\(\)]+$/.test(profile.clinicPhone)) {
        newErrors.clinicPhone = "Solo números, espacios y guiones"
      } else if (profile.clinicPhone.replace(/\D/g, "").length < 6) {
        newErrors.clinicPhone = "El teléfono debe tener al menos 6 dígitos"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        toast({
          title: "Formato no válido",
          description: "Solo se permiten archivos PNG, JPG o JPEG",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: "La firma debe pesar menos de 2MB",
          variant: "destructive",
        })
        return
      }

      setSignatureFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveSignature = () => {
    setSignatureFile(null)
    setSignaturePreview(null)
  }

  const handleSave = async () => {
    // Validate based on active tab
    let isValid = false
    if (activeTab === "personal") {
      isValid = validatePersonalData()
    } else {
      isValid = validateVeterinaryData()
    }

    if (!isValid) {
      return
    }

    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const user = JSON.parse(userData)
      const updatedUser = {
        ...user,
        fullName: `${profile.firstName} ${profile.lastName}`,
        name: `${profile.firstName} ${profile.lastName}`,
        email: profile.email,
        countryCode: profile.countryCode,
        phone: profile.phone,
        professionalTitle: profile.professionalTitle,
        professionalLicense: profile.professionalLicense,
        clinicName: profile.clinicName,
        address: profile.clinicAddress,
        clinicCountryCode: profile.clinicCountryCode,
        clinicPhone: profile.clinicPhone,
        language: profile.language,
        signature: signaturePreview,
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }

    toast({
      title: "✅ Cambios guardados",
      description: "Tu perfil ha sido actualizado correctamente",
      duration: 3000,
    })

    setIsSaving(false)
  }

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/dashboard")}
                className="text-muted-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Configuración</h1>
                <p className="text-xs text-muted-foreground">
                  Gestiona tu perfil y preferencias
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Overview */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24 border-4 border-violet-200 dark:border-violet-800">
                    <AvatarImage src="" alt={profile.firstName} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl font-bold">
                      {getInitials() || "DV"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  Miembro desde {profile.memberSince}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-violet-50 dark:bg-violet-950/20 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
                  <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 mb-2">
                    <Building2 className="h-4 w-4" />
                    <span className="font-semibold text-sm">Clínica</span>
                  </div>
                  <p className="text-sm text-violet-900 dark:text-violet-100 font-medium">
                    {profile.clinicName || "No configurada"}
                  </p>
                </div>

                <Separator />

                {/* Quick Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium truncate ml-2">{profile.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Teléfono</span>
                    <span className="font-medium">{profile.phone || "No agregado"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Idioma</span>
                    <span className="font-medium">
                      {LANGUAGES.find((l) => l.value === profile.language)?.label}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Settings Tabs */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="veterinaria" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Veterinaria
                </TabsTrigger>
              </TabsList>

              {/* Personal Tab */}
              <TabsContent value="personal" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-violet-600" />
                      Vista General del Perfil
                    </CardTitle>
                    <CardDescription>
                      Tu información básica de perfil y detalles de cuenta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Información de Contacto
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            Nombre <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Fernanda"
                            value={profile.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && (
                            <p className="text-xs text-red-500">{errors.firstName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Apellido <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Barbero"
                            value={profile.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && (
                            <p className="text-xs text-red-500">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="fer.divet.test@gmail.com"
                            value={profile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <div className="flex gap-2">
                          <Select
                            value={profile.countryCode}
                            onValueChange={(value) =>
                              handleInputChange("countryCode", value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
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
                          <div className="relative flex-1">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="123456789"
                              value={profile.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="professionalTitle">
                            Título Profesional <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={profile.professionalTitle}
                            onValueChange={(value) =>
                              handleInputChange("professionalTitle", value)
                            }
                          >
                            <SelectTrigger
                              className={errors.professionalTitle ? "border-red-500" : ""}
                            >
                              <SelectValue placeholder="Selecciona" />
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
                          <Label htmlFor="professionalLicense">
                            Matrícula Profesional{" "}
                            <span className="text-xs text-muted-foreground">(Opcional)</span>
                          </Label>
                          <Input
                            id="professionalLicense"
                            placeholder="MP 12345"
                            value={profile.professionalLicense}
                            onChange={(e) =>
                              handleInputChange("professionalLicense", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Digital Signature */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <FileSignature className="h-4 w-4 text-green-600" />
                            Firma Digital
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Sube tu firma digital para los informes
                          </p>
                        </div>
                        {signaturePreview && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("signature-upload")?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Cambiar Firma
                          </Button>
                        )}
                      </div>

                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-8 transition-colors",
                          signaturePreview
                            ? "border-green-300 bg-green-50 dark:bg-green-950/10"
                            : "border-gray-300 hover:border-gray-400 cursor-pointer"
                        )}
                        onClick={() =>
                          !signaturePreview &&
                          document.getElementById("signature-upload")?.click()
                        }
                      >
                        <input
                          id="signature-upload"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="hidden"
                          onChange={handleSignatureUpload}
                        />

                        {signaturePreview ? (
                          <div className="relative">
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200">
                              <img
                                src={signaturePreview}
                                alt="Firma digital"
                                className="max-h-32 mx-auto object-contain"
                              />
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveSignature()
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <FileSignature className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-foreground">
                              No hay firma subida
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Sube un archivo PNG, JPG o BMP para agregar tu firma digital
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Language Preferences */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          <Globe className="h-4 w-4 text-orange-600" />
                          Preferencias de Idioma
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Elige tu idioma preferido para la interfaz de la aplicación
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select
                          value={profile.language}
                          onValueChange={(value) => handleInputChange("language", value)}
                        >
                          <SelectTrigger id="language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Selecciona tu idioma preferido para la interfaz
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-violet-600 hover:bg-violet-700 text-white min-w-[140px]"
                  >
                    {isSaving ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Veterinaria Tab */}
              <TabsContent value="veterinaria" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-violet-600" />
                      Información de la Veterinaria
                    </CardTitle>
                    <CardDescription>
                      Datos de tu clínica veterinaria
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="clinicName">
                          Nombre de la Veterinaria <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="clinicName"
                            placeholder="DIVET Centro de diagnóstico veterinario"
                            value={profile.clinicName}
                            onChange={(e) => handleInputChange("clinicName", e.target.value)}
                            className={`pl-10 ${errors.clinicName ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.clinicName && (
                          <p className="text-xs text-red-500">{errors.clinicName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinicAddress">
                          Dirección <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="clinicAddress"
                            placeholder="Av. Principal 123, Ciudad"
                            value={profile.clinicAddress}
                            onChange={(e) =>
                              handleInputChange("clinicAddress", e.target.value)
                            }
                            className={`pl-10 ${errors.clinicAddress ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.clinicAddress && (
                          <p className="text-xs text-red-500">{errors.clinicAddress}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinicPhone">Teléfono de la Clínica</Label>
                        <div className="flex gap-2">
                          <Select
                            value={profile.clinicCountryCode}
                            onValueChange={(value) =>
                              handleInputChange("clinicCountryCode", value)
                            }
                          >
                            <SelectTrigger className="w-[140px]">
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
                          <div className="relative flex-1">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="clinicPhone"
                              type="tel"
                              placeholder="123456789"
                              value={profile.clinicPhone}
                              onChange={(e) => handleInputChange("clinicPhone", e.target.value)}
                              className={`pl-10 ${errors.clinicPhone ? "border-red-500" : ""}`}
                            />
                          </div>
                        </div>
                        {errors.clinicPhone && (
                          <p className="text-xs text-red-500">{errors.clinicPhone}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-violet-50 dark:bg-violet-950/20 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
                      <div className="flex gap-3">
                        <Building2 className="h-5 w-5 text-violet-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1 text-sm text-violet-900 dark:text-violet-100">
                          <p className="font-semibold">¿Por qué necesitamos esta información?</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Identificar tu clínica en el sistema</li>
                            <li>• Incluir datos en reportes e informes</li>
                            <li>• Facilitar comunicación con clientes</li>
                            <li>• Cumplir con requisitos legales</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-violet-600 hover:bg-violet-700 text-white min-w-[140px]"
                  >
                    {isSaving ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
