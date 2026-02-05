"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Upload,
  Trash2,
  ArrowRight,
  Heart,
  Info,
  X,
  User,
  Stethoscope,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface PatientData {
  date: string
  animalName: string
  age: string
  ageUnit: string
  species: string
  breed: string
  gender: string
  referringProfessional: string
  professionalEmail: string
  guardian: string
  guardianEmail: string
  studyType: string
  images: File[]
  // Hallazgos (findings)
  findings: string
}

type WizardStep = 1 | 2 | 3 | 4 | 5

// Breed database by species
const breedsBySpecies: Record<string, string[]> = {
  canine: [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Yorkshire Terrier",
    "Boxer",
    "Dachshund",
    "Mixed Breed",
  ],
  feline: [
    "Persian",
    "Siamese",
    "Maine Coon",
    "Ragdoll",
    "British Shorthair",
    "American Shorthair",
    "Sphynx",
    "Domestic Shorthair",
    "Domestic Longhair",
    "Mixed Breed",
  ],
  avian: ["Parrot", "Canary", "Cockatiel", "Macaw", "Parakeet", "Other"],
  reptile: ["Turtle", "Lizard", "Snake", "Iguana", "Gecko", "Other"],
  exotic: ["Rabbit", "Guinea Pig", "Hamster", "Ferret", "Chinchilla", "Other"],
}

export function AnalyzePatientWizard() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<WizardStep>(1)
  const [patientData, setPatientData] = useState<PatientData>({
    date: new Date().toISOString().split("T")[0],
    animalName: "",
    age: "",
    ageUnit: "Year(s)",
    species: "",
    breed: "",
    gender: "",
    referringProfessional: "",
    professionalEmail: "",
    guardian: "",
    guardianEmail: "",
    studyType: "",
    images: [],
    findings: "",
  })

  const [dragActive, setDragActive] = useState(false)
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([])
  const [isGeneratingFindings, setIsGeneratingFindings] = useState(false)

  // Load saved preferences
  useEffect(() => {
    const savedProfessional = localStorage.getItem("lastReferringProfessional")
    const savedProfessionalEmail = localStorage.getItem("lastProfessionalEmail")
    const savedSpecies = localStorage.getItem("lastSpecies")

    if (savedProfessional) {
      setPatientData((prev) => ({
        ...prev,
        referringProfessional: savedProfessional,
      }))
    }
    if (savedProfessionalEmail) {
      setPatientData((prev) => ({
        ...prev,
        professionalEmail: savedProfessionalEmail,
      }))
    }
    if (savedSpecies) {
      setPatientData((prev) => ({ ...prev, species: savedSpecies }))
      setAvailableBreeds(breedsBySpecies[savedSpecies] || [])
    }
  }, [])

  // Update available breeds when species changes
  useEffect(() => {
    if (patientData.species) {
      setAvailableBreeds(breedsBySpecies[patientData.species] || [])
      // Reset breed when species changes
      setPatientData((prev) => ({ ...prev, breed: "" }))
    }
  }, [patientData.species])

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files)
      setPatientData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }))
    }
  }

  const handleRemoveImage = (index: number) => {
    setPatientData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as WizardStep)
    } else {
      // Generate PDF and finish
      handleGeneratePDF()
    }
  }

  const handleGenerateFindings = async () => {
    setIsGeneratingFindings(true)
    
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Generate mock findings based on study type
    const mockFindings = `Hígado: Parénquima homogéneo. Textura levemente granular. Contorno liso y regular, delineado por una fina cápsula hiperecogénica. La porción caudo ventral no sobrepasa el fundus gástrico. Las venas hepáticas se aprecian fácilmente en el parénquima hepático como estructuras anecogénicas tubulares. Las venas portales se diferencian de las venas sistémicas en el parénquima por sus paredes hiperecogénicas.

Vesícula Biliar: Distención media por contenido anecoico, con un volumen de 6.61 cm³. Pared fina y lisa. Mide 41.54 mm x 15.70 mm x 19.35 mm.

Bazo: De topografía habitual. Espesor de 11.05 mm, conservando contornos regulares y márgenes preservados. Parénquima de ecotextura homogénea de grano fino. Se observan múltiples lesiones nodulares hipoecoicas, de contornos definidos, que miden entre 2.91 mm y 8.69 mm. Arquitectura vascular preservada.

Estómago: Distendido, presenta contenido alimenticio normal, adecuado peristaltismo y paredes de espesor conservado (4.69 mm en porción evaluada) que conservan estratificación mural.

Intestino Delgado: Peristaltismo adecuado en asas delgadas evaluadas con estratificación mural preservada, con carga mucosa a gaseosa intra luminal. Duodeno de 4.01 mm, yeyuno de espesor mural conservado.

Intestino Grueso: Colon presentó grosor de pared de 0.76 mm en región evaluada, con contenido fecal sólido en región descendente. Ciego presenta un espesor mural conservado.

Páncreas: Ecoestructura normal. Espesor 6.52 mm por 13.48 mm, normal.

Riñón Izquierdo: Tamaño 46.51 mm por 27.53 mm, conservado. Con contornos regulares. Corteza de ecotextura homogénea de grano fino. Relación cortico medular conservada. Diferenciación cortico medular normal. Pelvis renal conservada.`

    setPatientData({ ...patientData, findings: mockFindings })
    setIsGeneratingFindings(false)
    
    toast({
      title: "✨ Hallazgos Generados",
      description: "La IA ha generado los hallazgos. Puedes editarlos según necesites.",
      duration: 3000,
    })
  }

  const handleGeneratePDF = () => {
    // Save preferences
    if (patientData.referringProfessional) {
      localStorage.setItem(
        "lastReferringProfessional",
        patientData.referringProfessional
      )
    }
    if (patientData.professionalEmail) {
      localStorage.setItem(
        "lastProfessionalEmail",
        patientData.professionalEmail
      )
    }
    if (patientData.species) {
      localStorage.setItem("lastSpecies", patientData.species)
    }

    // Show success message
    toast({
      title: "📄 PDF Generado",
      description: `El reporte de ${patientData.animalName} ha sido generado exitosamente.`,
      duration: 5000,
    })

    // In a real app, this would generate and download a PDF
    console.log("Generating PDF with data:", patientData)
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep)
    }
  }

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return (
          patientData.animalName &&
          patientData.species &&
          patientData.age &&
          patientData.studyType
        )
      case 2:
        return true // All fields optional
      case 3:
        return patientData.images.length > 0
      case 4:
        return patientData.findings.trim().length > 0
      case 5:
        return true
      default:
        return false
    }
  }

  const getStepIcon = (step: WizardStep) => {
    switch (step) {
      case 1:
        return Stethoscope
      case 2:
        return User
      case 3:
        return ImageIcon
      case 4:
        return FileText
      case 5:
        return CheckCircle2
    }
  }

  const getStepTitle = (step: WizardStep) => {
    switch (step) {
      case 1:
        return "Información del Paciente"
      case 2:
        return "Tutor y Profesional"
      case 3:
        return "Subir Imágenes"
      case 4:
        return "Hallazgos"
      case 5:
        return "Revisar y Confirmar"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="text-muted-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-violet-600" />
                <h1 className="text-xl font-bold text-foreground">
                  Nuevo Estudio de Paciente
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => {
              const StepIcon = getStepIcon(step as WizardStep)
              const isActive = currentStep === step
              const isCompleted = currentStep > step
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                        isCompleted &&
                          "bg-green-600 text-white",
                        isActive &&
                          "bg-violet-600 text-white ring-4 ring-violet-600/20",
                        !isActive &&
                          !isCompleted &&
                          "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium text-center hidden sm:block",
                        isActive && "text-foreground",
                        !isActive && "text-muted-foreground"
                      )}
                    >
                      {getStepTitle(step as WizardStep)}
                    </span>
                  </div>
                  {step < 5 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 transition-all",
                        currentStep > step ? "bg-green-600" : "bg-border"
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Patient Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-violet-600" />
                    Información del Paciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Patient Data */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="animalName">
                        Nombre del Animal <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="animalName"
                        placeholder="Ingrese el nombre del paciente"
                        value={patientData.animalName}
                        onChange={(e) =>
                          handleInputChange("animalName", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="species">
                          Especie <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={patientData.species}
                          onValueChange={(value) =>
                            handleInputChange("species", value)
                          }
                        >
                          <SelectTrigger id="species">
                            <SelectValue placeholder="Seleccione la especie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="canine">Perro</SelectItem>
                            <SelectItem value="feline">Gato</SelectItem>
                            <SelectItem value="avian">Ave</SelectItem>
                            <SelectItem value="reptile">Reptil</SelectItem>
                            <SelectItem value="exotic">Exótico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="breed">Raza</Label>
                        <Select
                          value={patientData.breed}
                          onValueChange={(value) => handleInputChange("breed", value)}
                          disabled={!patientData.species}
                        >
                          <SelectTrigger id="breed">
                            <SelectValue
                              placeholder={
                                patientData.species
                                  ? "Seleccione la raza"
                                  : "Seleccione primero la especie"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {availableBreeds.map((breed) => (
                              <SelectItem key={breed} value={breed.toLowerCase()}>
                                {breed}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">
                          Edad <span className="text-destructive">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="age"
                            type="number"
                            placeholder="0"
                            value={patientData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            className="flex-1"
                          />
                          <Select
                            value={patientData.ageUnit}
                            onValueChange={(value) =>
                              handleInputChange("ageUnit", value)
                            }
                          >
                            <SelectTrigger className="w-[110px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Day(s)">Días</SelectItem>
                              <SelectItem value="Week(s)">Semanas</SelectItem>
                              <SelectItem value="Month(s)">Meses</SelectItem>
                              <SelectItem value="Year(s)">Años</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Sexo</Label>
                        <Select
                          value={patientData.gender}
                          onValueChange={(value) => handleInputChange("gender", value)}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Seleccione el sexo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Macho</SelectItem>
                            <SelectItem value="female">Hembra</SelectItem>
                            <SelectItem value="neutered-male">
                              Macho Castrado
                            </SelectItem>
                            <SelectItem value="spayed-female">
                              Hembra Esterilizada
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Study Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Detalles del Estudio
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studyType">
                          Tipo de Estudio <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={patientData.studyType}
                          onValueChange={(value) =>
                            handleInputChange("studyType", value)
                          }
                        >
                          <SelectTrigger id="studyType">
                            <SelectValue placeholder="Seleccione el tipo de estudio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="radiography">Radiografía</SelectItem>
                            <SelectItem value="ultrasound">Ultrasonido</SelectItem>
                            <SelectItem value="ct-scan">Tomografía</SelectItem>
                            <SelectItem value="mri">Resonancia Magnética</SelectItem>
                            <SelectItem value="echocardiogram">
                              Ecocardiograma
                            </SelectItem>
                            <SelectItem value="endoscopy">Endoscopía</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Fecha del Estudio</Label>
                        <Input
                          id="date"
                          type="date"
                          value={patientData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Guardian & Professional */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-violet-600" />
                    Información del Tutor y Profesional
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Todos los campos de esta sección son opcionales
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Guardian Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Información del Tutor
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guardian">Nombre del Tutor</Label>
                        <Input
                          id="guardian"
                          placeholder="Nombre completo del dueño"
                          value={patientData.guardian}
                          onChange={(e) =>
                            handleInputChange("guardian", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianEmail">Email del Tutor</Label>
                        <Input
                          id="guardianEmail"
                          type="email"
                          placeholder="tutor@ejemplo.com"
                          value={patientData.guardianEmail}
                          onChange={(e) =>
                            handleInputChange("guardianEmail", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Referring Professional */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Profesional Referente
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="referringProfessional">
                          Nombre del Profesional
                        </Label>
                        <Input
                          id="referringProfessional"
                          placeholder="Dr. Nombre"
                          value={patientData.referringProfessional}
                          onChange={(e) =>
                            handleInputChange("referringProfessional", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="professionalEmail">
                          Email del Profesional
                        </Label>
                        <Input
                          id="professionalEmail"
                          type="email"
                          placeholder="doctor@clinica.com"
                          value={patientData.professionalEmail}
                          onChange={(e) =>
                            handleInputChange("professionalEmail", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Upload Images */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-violet-600" />
                    Subir Imágenes del Estudio
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sube al menos una imagen para continuar
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">

                  {/* Drag & Drop Area */}
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer",
                      dragActive
                        ? "border-violet-600 bg-violet-50 dark:bg-violet-950/20"
                        : "border-border hover:border-violet-400"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files)}
                    />
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-foreground">
                          Arrastra imágenes aquí o haz clic para subir
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Soporta: JPG, PNG, DICOM • Máx 10MB por archivo
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Images Grid */}
                  {patientData.images.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          Imágenes Subidas ({patientData.images.length})
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => document.getElementById("file-upload")?.click()}
                          className="text-violet-600"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Agregar Más
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {patientData.images.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative group aspect-square rounded-lg overflow-hidden border border-border"
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Eliminar
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Hallazgos */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-violet-600" />
                    Hallazgos del Estudio
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Describe los hallazgos del estudio o genera un informe con IA
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="findings">Hallazgos</Label>
                    <Textarea
                      id="findings"
                      value={patientData.findings}
                      onChange={(e) =>
                        setPatientData({ ...patientData, findings: e.target.value })
                      }
                      placeholder="Describe los hallazgos encontrados en el estudio..."
                      className="min-h-[300px] resize-none font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      {patientData.findings.length} caracteres
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={handleGenerateFindings}
                      disabled={isGeneratingFindings}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                    >
                      {isGeneratingFindings ? (
                        <>
                          <motion.div
                            className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Generando...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Generar con IA
                        </>
                      )}
                    </Button>
                    {patientData.findings && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setPatientData({ ...patientData, findings: "" })
                        }
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Limpiar
                      </Button>
                    )}
                  </div>

                  {isGeneratingFindings && (
                    <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <motion.div
                            className="h-5 w-5 border-2 border-violet-600 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-violet-900 dark:text-violet-100">
                            Analizando imágenes con IA...
                          </p>
                          <p className="text-xs text-violet-700 dark:text-violet-300 mt-1">
                            Estamos procesando las imágenes y generando un informe detallado
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Review & Confirm */}
          {currentStep === 5 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Revisar y Confirmar
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Por favor revisa toda la información antes de enviar
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Patient Summary */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">
                      Información del Paciente
                    </h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nombre:</span>
                        <span className="text-sm font-medium">
                          {patientData.animalName || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Especie:</span>
                        <span className="text-sm font-medium capitalize">
                          {patientData.species || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Raza:</span>
                        <span className="text-sm font-medium capitalize">
                          {patientData.breed || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Edad:</span>
                        <span className="text-sm font-medium">
                          {patientData.age
                            ? `${patientData.age} ${patientData.ageUnit}`
                            : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sexo:</span>
                        <span className="text-sm font-medium capitalize">
                          {patientData.gender || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Study Summary */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Detalles del Estudio</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Tipo de Estudio:
                        </span>
                        <span className="text-sm font-medium capitalize">
                          {patientData.studyType || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fecha:</span>
                        <span className="text-sm font-medium">
                          {patientData.date || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Imágenes:</span>
                        <span className="text-sm font-medium">
                          {patientData.images.length} subidas
                        </span>
                      </div>
                    </div>
                  </div>

                  {(patientData.guardian || patientData.referringProfessional) && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">
                          Información de Contacto
                        </h3>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          {patientData.guardian && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Tutor:
                              </span>
                              <span className="text-sm font-medium">
                                {patientData.guardian}
                              </span>
                            </div>
                          )}
                          {patientData.referringProfessional && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Profesional:
                              </span>
                              <span className="text-sm font-medium">
                                {patientData.referringProfessional}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Image Preview */}
                  {patientData.images.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">
                          Imágenes del Estudio ({patientData.images.length})
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {patientData.images.slice(0, 8).map((image, index) => (
                            <div
                              key={index}
                              className="aspect-square rounded-lg overflow-hidden border border-border"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {patientData.images.length > 8 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{patientData.images.length - 8} imágenes más
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Findings Preview */}
                  {patientData.findings && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Hallazgos</h3>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm text-foreground whitespace-pre-wrap font-mono">
                            {patientData.findings}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mt-8">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-muted-foreground text-sm"
              onClick={() => router.push("/")}
            >
              Cancelar
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white min-w-[140px]"
              onClick={handleContinue}
              disabled={!canContinue()}
            >
              {currentStep === 5 ? (
                <>
                  Generar PDF
                  <CheckCircle2 className="h-5 w-5 ml-2" />
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
