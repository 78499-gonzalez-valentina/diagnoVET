"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Activity,
  DollarSign,
  FileText,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MainNav } from "./main-nav"
import { cn } from "@/lib/utils"

// Datos de ejemplo
const MONTHLY_STATS = {
  totalConsultations: 342,
  totalPatients: 156,
  totalRevenue: 45800,
  avgConsultationTime: 35,
  trends: {
    consultations: +12,
    patients: +8,
    revenue: +15,
    time: -5,
  },
}

const CONSULTATIONS_BY_TYPE = [
  { name: "Consulta general", value: 45, color: "bg-blue-500" },
  { name: "Vacunación", value: 25, color: "bg-green-500" },
  { name: "Cirugía", value: 15, color: "bg-purple-500" },
  { name: "Ecografía", value: 10, color: "bg-amber-500" },
  { name: "Emergencias", value: 5, color: "bg-red-500" },
]

const SPECIES_DISTRIBUTION = [
  { name: "Caninos", value: 65, count: 101, color: "bg-primary" },
  { name: "Felinos", value: 28, count: 44, color: "bg-violet-500" },
  { name: "Aves", value: 5, count: 8, color: "bg-amber-500" },
  { name: "Otros", value: 2, count: 3, color: "bg-gray-500" },
]

const MONTHLY_REVENUE = [
  { month: "Ene", amount: 38500 },
  { month: "Feb", amount: 42300 },
  { month: "Mar", amount: 39800 },
  { month: "Abr", amount: 45200 },
  { month: "May", amount: 43900 },
  { month: "Jun", amount: 45800 },
]

const TOP_TREATMENTS = [
  { name: "Vacuna antirrábica", count: 89, trend: +5 },
  { name: "Desparasitación", count: 76, trend: +12 },
  { name: "Control de peso", count: 68, trend: -3 },
  { name: "Limpieza dental", count: 54, trend: +8 },
  { name: "Análisis de sangre", count: 42, trend: +15 },
]

const APPOINTMENT_HOURS = [
  { hour: "09:00", count: 8 },
  { hour: "10:00", count: 12 },
  { hour: "11:00", count: 15 },
  { hour: "12:00", count: 10 },
  { hour: "14:00", count: 14 },
  { hour: "15:00", count: 18 },
  { hour: "16:00", count: 16 },
  { hour: "17:00", count: 12 },
]

export function Reportes() {
  const [period, setPeriod] = useState("month")
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.amount))

  return (
    <MainNav>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reportes y Estadísticas</h1>
            <p className="text-muted-foreground mt-1">
              Análisis de rendimiento y métricas clave de tu clínica
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Exportar
            </Button>
          </div>
        </motion.div>

        {/* KPIs principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "gap-1",
                      MONTHLY_STATS.trends.consultations > 0
                        ? "text-green-600 bg-green-500/10"
                        : "text-red-600 bg-red-500/10"
                    )}
                  >
                    {MONTHLY_STATS.trends.consultations > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(MONTHLY_STATS.trends.consultations)}%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {MONTHLY_STATS.totalConsultations}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Consultas totales</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "gap-1",
                      MONTHLY_STATS.trends.patients > 0
                        ? "text-green-600 bg-green-500/10"
                        : "text-red-600 bg-red-500/10"
                    )}
                  >
                    {MONTHLY_STATS.trends.patients > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(MONTHLY_STATS.trends.patients)}%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {MONTHLY_STATS.totalPatients}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Pacientes activos</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "gap-1",
                      MONTHLY_STATS.trends.revenue > 0
                        ? "text-green-600 bg-green-500/10"
                        : "text-red-600 bg-red-500/10"
                    )}
                  >
                    {MONTHLY_STATS.trends.revenue > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(MONTHLY_STATS.trends.revenue)}%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  ${MONTHLY_STATS.totalRevenue.toLocaleString()}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Ingresos del mes</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Activity className="h-5 w-5 text-amber-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "gap-1",
                      MONTHLY_STATS.trends.time < 0
                        ? "text-green-600 bg-green-500/10"
                        : "text-red-600 bg-red-500/10"
                    )}
                  >
                    {MONTHLY_STATS.trends.time < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : (
                      <TrendingUp className="h-3 w-3" />
                    )}
                    {Math.abs(MONTHLY_STATS.trends.time)}%
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {MONTHLY_STATS.avgConsultationTime} min
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Tiempo promedio</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de ingresos mensuales */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Evolución de Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MONTHLY_REVENUE.map((item, index) => {
                    const percentage = (item.amount / maxRevenue) * 100
                    return (
                      <div key={item.month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.month}</span>
                          <span className="text-muted-foreground">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Distribución de especies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Distribución por Especies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {SPECIES_DISTRIBUTION.map((item, index) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-3 h-3 rounded-full", item.color)} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{item.count} pacientes</span>
                          <span className="font-semibold">{item.value}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                          className={cn("h-full rounded-full", item.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tipos de consulta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Consultas por Tipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {CONSULTATIONS_BY_TYPE.map((item, index) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          className={cn("h-full rounded-full", item.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Horarios más demandados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Horarios Más Solicitados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {APPOINTMENT_HOURS.map((item, index) => {
                    const maxCount = Math.max(...APPOINTMENT_HOURS.map((h) => h.count))
                    const percentage = (item.count / maxCount) * 100
                    return (
                      <div key={item.hour} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-16">{item.hour}</span>
                        <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-lg"
                          />
                          <span className="absolute inset-0 flex items-center justify-end pr-3 text-xs font-semibold text-foreground">
                            {item.count} citas
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tratamientos más frecuentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Top 5 Tratamientos Más Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {TOP_TREATMENTS.map((treatment, index) => (
                  <motion.div
                    key={treatment.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-primary">{index + 1}</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "gap-1 text-xs",
                          treatment.trend > 0
                            ? "text-green-600 bg-green-500/10"
                            : "text-red-600 bg-red-500/10"
                        )}
                      >
                        {treatment.trend > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(treatment.trend)}%
                      </Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">{treatment.name}</p>
                    <p className="text-xs text-muted-foreground">{treatment.count} veces</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainNav>
  )
}
