# diagnoVET — Plataforma de Diagnóstico Veterinario

Prototipo de interfaz y mejoras de flujo para una plataforma de diagnóstico veterinario asistida por IA.

---

## 🌐 Demo en Vivo

- **Aplicación desplegada:**  
https://diagno-vet-ecru.vercel.app/

---

# 🎯 Contexto del Challenge

El desafío solicitado fue:

> “Analizar la plataforma diagnoVET y proponer mejoras concretas de UX/UI que reduzcan la fricción y mejoren la eficiencia del veterinario, construyendo un prototipo funcional de una mejora significativa.”

---

# 🧭 Strategic Overview — Mejoras Propuestas

Basándome en el análisis de los flujos actuales de diagnoVET, estas son las áreas clave que optimizaría para mejorar directamente la eficiencia del veterinario:

### 1. Simplificación del Flujo “Analizar Paciente”
**Problema actual:** formularios extensos y poco intuitivos, con demasiados campos obligatorios.

**Cambio propuesto:**
- Convertir el proceso en un wizard guiado  
- Reducir campos obligatorios a lo esencial  
- Integrar la carga de imágenes dentro del flujo  
- Validaciones progresivas  

**Impacto esperado:** menor tiempo por estudio y menos errores.

---

### 2. Enfoque Centrado en Pacientes
**Problema actual:** la plataforma gira alrededor de estudios individuales y no del paciente.

**Cambio propuesto:**
- Crear un “Patient Hub” con vista integral  
- Historial completo en una sola pantalla  
- Visualización de procesos activos  
- Timeline de actividades  

**Impacto esperado:** mejor toma de decisiones y acceso rápido a la información clínica.

---

### 3. Automatización de Tareas Repetitivas
**Problema actual:** ingreso manual constante de información repetida.

**Cambio propuesto:**
- Autocompletado inteligente  
- Recordatorio de datos frecuentes  
- Valores por defecto  

**Impacto esperado:** reducción de trabajo administrativo.

---

### 4. Gestión Integral del Día a Día
**Problema actual:** falta de herramientas para organizar citas y disponibilidad.

**Cambio propuesto:**
- Sistema de agenda integrado  
- Gestión de citas por estados  
- Visualización clara de horarios  

**Impacto esperado:** mejor planificación y control del tiempo.

---

### 5. Reportes para Toma de Decisiones
**Problema actual:** ausencia de métricas y análisis.

**Cambio propuesto:**
- Panel de reportes con KPIs  
- Estadísticas de demanda  
- Análisis de ingresos y actividad  

**Impacto esperado:** decisiones más informadas y mejor gestión de la clínica.

---

## Resumen del Enfoque

Todas las mejoras se orientan a:

- Reducir fricción  
- Disminuir carga cognitiva  
- Acelerar tareas repetitivas  
- Centralizar información  
- Apoyar la toma de decisiones  

El objetivo final es que el veterinario dedique más tiempo al paciente y menos tiempo a tareas administrativas.

---

## Auditoría UX — Principales Problemas Detectados

### A) Flujo “Analizar Paciente”

Problemas observados:

- Demasiados campos obligatorios  
- Formularios largos y lineales  
- Poca jerarquía visual  
- Acciones críticas poco claras  
- Carga de imágenes separada del contexto  
- Falta de guía paso a paso  

**Impacto real:**

- Lentitud al cargar estudios  
- Mayor tasa de error humano  
- Fricción innecesaria  

---

### B) Carga de Imágenes

- Proceso poco intuitivo  
- Sin feedback visual claro  
- Falta de previsualización inmediata  

---

### C) Ingreso de Datos Repetitivos

- Repetición manual de información frecuente  
- Falta de autocompletado  

### D) Datos Duplicados y Fricción Inicial

- Solicitud repetida de información durante onboarding   
- Configuración inicial poco optimizada

---

# 2️⃣ Estrategia de Mejora

### Reorganización del Flujo

Transformación a proceso guiado:

Paciente → Tutor → Imágenes → Confirmación


### Cambios clave

- Reducción de campos obligatorios  
- Carga de imágenes integrada  
- Jerarquía clara de acciones  
- Eliminación de botones redundantes  

---

# Módulo de Gestión de Pacientes

## Objetivo

Transformar el sistema de una **lista de estudios** a una verdadera **gestión integral de pacientes**.

### Limitaciones Previas

- No existía perfil del paciente  
- Historial disperso  
- Falta de contexto clínico  
- Información poco accesible  

### Mejoras Implementadas

- Vista lista mejorada  
- Estados claros  
- Perfil detallado del paciente  
- Timeline de actividades  
- Procesos activos visibles  

**Beneficios Clínicos**

- Visión holística del paciente  
- Trazabilidad completa  
- Mejor comunicación con tutores  
- Priorización inteligente  

---

# Sistema de Agenda y Citas

Se incorporó un módulo de agenda para mejorar la organización diaria:

- Calendario interactivo  
- Gestión de horarios  
- Estados de citas  
- Panel de seguimiento  

**Beneficios**

- Organización eficiente  
- Control de disponibilidad  
- Mejor planificación  

---

# Sistema de Reportes y Estadísticas

Panel analítico para apoyar decisiones:

- KPIs clave  
- Tendencias de ingresos  
- Distribución por especies  
- Horarios más solicitados  
- Top tratamientos  

**Beneficios**

- Toma de decisiones basada en datos  
- Optimización operativa  
- Planificación estratégica  

---

# Stack Tecnológico

- **Framework:** Next.js 14  
- **UI:** React + TypeScript  
- **Estilos:** Tailwind CSS  
- **Componentes:** shadcn/ui  
- **Animaciones:** Framer Motion  
- **Íconos:** Lucide React  
- **Despliegue:** Vercel  

---

## 🔒 Consideraciones de Seguridad y Validación

### Validación de Identidad Profesional

**Propuesta de implementación futura:**

Para garantizar la integridad y seguridad de la plataforma, se propone implementar un sistema de **validación previa de identidad** antes de otorgar acceso completo al sistema:

#### 📋 Validación de Veterinarios
- **Verificación de matrícula profesional** ante organismos reguladores competentes
- **Validación de título habilitante** (Médico Veterinario certificado)
- **Verificación de identidad** mediante documentación oficial
- **Confirmación de estado activo** de la matrícula (no suspendida o revocada)

#### 🏥 Validación de Establecimientos
- **Verificación de habilitación municipal/estatal** de la veterinaria
- **Confirmación de domicilio legal** del establecimiento
- **Validación de permisos sanitarios** vigentes

#### 🚫 Restricción de Acceso
- Hasta **no obtener la validación completa**, los usuarios no podrían acceder a las funcionalidades de la plataforma

#### ✅ Beneficios del Sistema de Validación
- **Protección legal** - Cumplimiento con regulaciones sanitarias
- **Confianza del usuario** - Garantía de profesionales certificados
- **Trazabilidad** - Todos los diagnósticos respaldados por profesionales validados
- **Prevención de fraude** - Evita uso indebido de la plataforma
- **Responsabilidad profesional** - Cada acción vinculada a un profesional verificado

> **Nota:** Este sistema de validación es una propuesta de mejora para la versión de producción. El prototipo actual utiliza autenticación simulada con fines demostrativos.

# Cómo Ejecutar el Proyecto

### Instalación

```bash
npm install

### Ejecución

```bash
npm run dev
