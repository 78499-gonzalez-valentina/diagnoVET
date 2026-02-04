"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Search,
  Plus,
  Heart,
  Thermometer,
  Activity,
  Scale,
  Wind,
  ChevronLeft,
  ChevronRight,
  Save,
  Loader2,
  Check,
  FileText,
  Stethoscope,
  Pill,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProgressStepper, type Step } from "./progress-stepper"
import { PatientCard, type Patient } from "./patient-card"
import { MedicalFormBlock } from "./medical-form-block"
import { TreatmentBuilder, type Medication } from "./treatment-builder"
import { cn } from "@/lib/utils"

// Mock patients data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Max",
    species: "dog",
    breed: "Labrador Retriever",
    age: "5 años",
    weight: "32 kg",
    owner: "María García",
    lastVisit: "15 Ene 2026",
  },
  {
    id: "2",
    name: "Luna",
    species: "cat",
    breed: "Siamés",
    age: "3 años",
    weight: "4.5 kg",
    owner: "Carlos López",
    lastVisit: "28 Dic 2025",
  },
  {
    id: "3",
    name: "Rocky",
    species: "dog",
    breed: "Bulldog Francés",
    age: "2 años",
    weight: "12 kg",
    owner: "Ana Martínez",
    lastVisit: "5 Ene 2026",
  },
  {
    id: "4",
    name: "Mia",
    species: "cat",
    breed: "Persa",
    age: "7 años",
    weight: "5 kg",
    owner: "Roberto Sánchez",
  },
  {
    id: "5",
    name: "Coco",
    species: "bird",
    breed: "Cacatúa",
    age: "4 años",
    weight: "350 g",
    owner: "Laura Pérez",
  },
]

const consultTemplates = [
  { id: "1", label: "Revisión general", text: "Paciente acude a revisión de rutina. Propietario reporta que el animal se encuentra bien de ánimo y apetito." },
  { id: "2", label: "Vómitos/Diarrea", text: "Paciente presenta episodios de vómitos/diarrea desde hace ___ días. Propietario reporta ___ episodios en las últimas 24 horas." },
  { id: "3", label: "Cojera", text: "Paciente presenta cojera en extremidad ___. Propietario reporta inicio hace ___ días. Sin antecedente traumático conocido." },
  { id: "4", label: "Dermatología", text: "Paciente presenta lesiones cutáneas en ___. Propietario reporta prurito ___. Sin tratamiento previo." },
  { id: "5", label: "Vacunación", text: "Paciente acude para aplicación de vacuna ___. Sin reacciones adversas previas reportadas." },
]

const diagnosisOptions = [
  "Gastroenteritis aguda",
  "Dermatitis alérgica",
  "Otitis externa",
  "Infección urinaria",
  "Artritis",
  "Parvovirus",
  "Insuficiencia renal",
  "Diabetes mellitus",
  "Hipotiroidismo",
  "Enfermedad periodontal",
]

const steps: Step[] = [
  { id: "patient", title: "Paciente" },
  { id: "reason", title: "Motivo" },
  { id: "exam", title: "Examen" },
  { id: "diagnosis", title: "Diagnóstico" },
  { id: "treatment", title: "Tratamiento" },
  { id: "summary", title: "Resumen" },
]

interface ConsultData {
  patient: Patient | null
  reason: string
  vitalSigns: {
    temperature: string
    heartRate: string
    respiratoryRate: string
    weight: string
    capillaryRefill: string
  }
  diagnosis: string[]
  medications: Medication[]
}

export function ConsultWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [diagnosisSearch, setDiagnosisSearch] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [consultData, setConsultData] = useState<ConsultData>({
    patient: null,
    reason: "",
    vitalSigns: {
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      weight: "",
      capillaryRefill: "",
    },
    diagnosis: [],
    medications: [],
  })

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (consultData.patient || consultData.reason) {
        setShowSaved(true)
        setTimeout(() => setShowSaved(false), 2000)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [consultData])

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredDiagnosis = diagnosisOptions.filter((d) =>
    d.toLowerCase().includes(diagnosisSearch.toLowerCase())
  )

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return consultData.patient !== null
      case 1:
        return consultData.reason.trim().length > 0
      case 2:
        return true // Vital signs are optional
      case 3:
        return consultData.diagnosis.length > 0
      case 4:
        return true // Treatment can be empty for diagnostic visits
      case 5:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    router.push("/")
  }

  const toggleDiagnosis = (diagnosis: string) => {
    setConsultData((prev) => ({
      ...prev,
      diagnosis: prev.diagnosis.includes(diagnosis)
        ? prev.diagnosis.filter((d) => d !== diagnosis)
        : [...prev.diagnosis, diagnosis],
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="patient"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Seleccionar Paciente
              </h2>
              <p className="text-muted-foreground">
                Busca y selecciona el paciente para esta consulta
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre del paciente o propietario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  selected={consultData.patient?.id === patient.id}
                  onClick={() => setConsultData({ ...consultData, patient })}
                />
              ))}
            </div>

            <Button variant="outline" className="w-full border-dashed bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Crear nuevo paciente
            </Button>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            key="reason"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Motivo de Consulta
              </h2>
              <p className="text-muted-foreground">
                Describe el motivo de la visita del paciente
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {consultTemplates.map((template) => (
                  <Button
                    key={template.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setConsultData({ ...consultData, reason: template.text })
                    }
                    className="text-xs"
                  >
                    {template.label}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Notas clínicas</Label>
                <Textarea
                  id="reason"
                  value={consultData.reason}
                  onChange={(e) =>
                    setConsultData({ ...consultData, reason: e.target.value })
                  }
                  placeholder="Describe el motivo de consulta, síntomas reportados por el propietario, etc."
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {consultData.reason.length} caracteres
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="exam"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Examen Clínico
              </h2>
              <p className="text-muted-foreground">
                Registra los signos vitales y hallazgos del examen físico
              </p>
            </div>

            <MedicalFormBlock
              title="Signos Vitales"
              description="Ingresa los valores obtenidos en el examen físico"
              vitalSigns={[
                {
                  id: "temperature",
                  label: "Temperatura",
                  value: consultData.vitalSigns.temperature,
                  unit: "°C",
                  icon: <Thermometer className="h-4 w-4" />,
                  tooltip: "Temperatura rectal normal: 38.0-39.2°C (perros), 38.1-39.2°C (gatos)",
                  min: 35,
                  max: 42,
                  onChange: (value) =>
                    setConsultData({
                      ...consultData,
                      vitalSigns: { ...consultData.vitalSigns, temperature: value },
                    }),
                },
                {
                  id: "heartRate",
                  label: "Frecuencia cardíaca",
                  value: consultData.vitalSigns.heartRate,
                  unit: "lpm",
                  icon: <Heart className="h-4 w-4" />,
                  tooltip: "Normal: 60-140 lpm (perros), 140-220 lpm (gatos)",
                  min: 40,
                  max: 300,
                  onChange: (value) =>
                    setConsultData({
                      ...consultData,
                      vitalSigns: { ...consultData.vitalSigns, heartRate: value },
                    }),
                },
                {
                  id: "respiratoryRate",
                  label: "Frecuencia respiratoria",
                  value: consultData.vitalSigns.respiratoryRate,
                  unit: "rpm",
                  icon: <Wind className="h-4 w-4" />,
                  tooltip: "Normal: 10-30 rpm (perros), 20-30 rpm (gatos)",
                  min: 5,
                  max: 100,
                  onChange: (value) =>
                    setConsultData({
                      ...consultData,
                      vitalSigns: { ...consultData.vitalSigns, respiratoryRate: value },
                    }),
                },
                {
                  id: "weight",
                  label: "Peso actual",
                  value: consultData.vitalSigns.weight,
                  unit: "kg",
                  icon: <Scale className="h-4 w-4" />,
                  tooltip: "Registra el peso del paciente para seguimiento",
                  onChange: (value) =>
                    setConsultData({
                      ...consultData,
                      vitalSigns: { ...consultData.vitalSigns, weight: value },
                    }),
                },
                {
                  id: "capillaryRefill",
                  label: "Llenado capilar",
                  value: consultData.vitalSigns.capillaryRefill,
                  unit: "seg",
                  icon: <Activity className="h-4 w-4" />,
                  tooltip: "Normal: < 2 segundos",
                  max: 5,
                  onChange: (value) =>
                    setConsultData({
                      ...consultData,
                      vitalSigns: { ...consultData.vitalSigns, capillaryRefill: value },
                    }),
                },
              ]}
            />
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="diagnosis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Diagnóstico
              </h2>
              <p className="text-muted-foreground">
                Selecciona o busca los diagnósticos aplicables
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar diagnóstico..."
                value={diagnosisSearch}
                onChange={(e) => setDiagnosisSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {consultData.diagnosis.length > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Diagnósticos seleccionados:
                </p>
                <div className="flex flex-wrap gap-2">
                  {consultData.diagnosis.map((d) => (
                    <motion.button
                      key={d}
                      type="button"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => toggleDiagnosis(d)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm"
                    >
                      {d}
                      <span className="ml-1">×</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDiagnosis.map((diagnosis) => (
                <motion.button
                  key={diagnosis}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleDiagnosis(diagnosis)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border text-left transition-all",
                    consultData.diagnosis.includes(diagnosis)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full border transition-colors",
                      consultData.diagnosis.includes(diagnosis)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground"
                    )}
                  >
                    {consultData.diagnosis.includes(diagnosis) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  <span className="font-medium text-foreground">{diagnosis}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="treatment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Tratamiento
              </h2>
              <p className="text-muted-foreground">
                Agrega los medicamentos y tratamientos prescritos
              </p>
            </div>

            <TreatmentBuilder
              medications={consultData.medications}
              onChange={(medications) =>
                setConsultData({ ...consultData, medications })
              }
            />
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Resumen de Consulta
              </h2>
              <p className="text-muted-foreground">
                Revisa los datos antes de guardar
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-primary/5 border-b border-border p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      Ficha de Consulta
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              {consultData.patient && (
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-foreground">Paciente</h4>
                  </div>
                  <PatientCard patient={consultData.patient} compact />
                </div>
              )}

              {/* Reason */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">Motivo de Consulta</h4>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {consultData.reason || "No especificado"}
                </p>
              </div>

              {/* Vital Signs */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">Signos Vitales</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {[
                    { label: "Temp.", value: consultData.vitalSigns.temperature, unit: "°C" },
                    { label: "FC", value: consultData.vitalSigns.heartRate, unit: "lpm" },
                    { label: "FR", value: consultData.vitalSigns.respiratoryRate, unit: "rpm" },
                    { label: "Peso", value: consultData.vitalSigns.weight, unit: "kg" },
                    { label: "LLC", value: consultData.vitalSigns.capillaryRefill, unit: "seg" },
                  ].map((vital) => (
                    <div key={vital.label} className="text-center p-2 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">{vital.label}</p>
                      <p className="font-semibold text-foreground">
                        {vital.value || "-"} {vital.value && vital.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnosis */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">Diagnóstico</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {consultData.diagnosis.length > 0 ? (
                    consultData.diagnosis.map((d) => (
                      <span
                        key={d}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No especificado</span>
                  )}
                </div>
              </div>

              {/* Treatment */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">Tratamiento</h4>
                </div>
                {consultData.medications.length > 0 ? (
                  <div className="space-y-2">
                    {consultData.medications.map((med, index) => (
                      <div
                        key={med.id}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {med.name || "Sin nombre"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {med.dose} {med.unit} •{" "}
                            {frequencyOptions.find((f) => f.value === med.frequency)?.label} •{" "}
                            {durationOptions.find((d) => d.value === med.duration)?.label}
                          </p>
                          {med.notes && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Nota: {med.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Sin tratamiento</span>
                )}
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Button>
            <AnimatePresence>
              {showSaved && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-green-500" />
                  Guardado automáticamente
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ProgressStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Consulta
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
