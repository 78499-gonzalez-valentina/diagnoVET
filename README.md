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

## 📄 Documento “El Por Qué”

Si bien exploré y prototipé mejoras en distintas áreas para comprender el flujo completo del veterinario, decidí profundizar específicamente en el rediseño del proceso “Analizar Paciente”, por ser el núcleo del producto y donde se detectó el mayor impacto en términos de eficiencia y experiencia de usuario.

Explicación detallada de la principal mejora elegida y su impacto:  
/docs/WHY.md

# 🧭 Strategic Overview — Otras mejoras propuestas

### 1. Simplificación del flujo “Analizar Paciente”
Se detalla en el documento WHY
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

### 3. Gestión Integral del Día a Día
**Problema actual:** falta de herramientas para organizar citas y disponibilidad.

**Cambio propuesto:**
- Sistema de agenda integrado  
- Gestión de citas por estados  
- Visualización clara de horarios  

**Impacto esperado:** mejor planificación y control del tiempo.

---

### 4. Reportes para Toma de Decisiones
**Problema actual:** ausencia de métricas y análisis.

**Cambio propuesto:**
- Panel de reportes con KPIs  
- Estadísticas de demanda  
- Análisis de ingresos y actividad  

**Impacto esperado:** decisiones más informadas y mejor gestión de la clínica.

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

##  Consideraciones de Seguridad y Validación

### Validación de Identidad Profesional

**Propuesta de implementación futura:**

Para garantizar la integridad y seguridad de la plataforma, se propone implementar un sistema de **validación previa de identidad** antes de otorgar acceso completo al sistema:

#### Validación de Veterinarios
- **Verificación de matrícula profesional** ante organismos reguladores competentes
- **Validación de título habilitante** (Médico Veterinario certificado)
- **Verificación de identidad** mediante documentación oficial
- **Confirmación de estado activo** de la matrícula (no suspendida o revocada)

#### Validación de Establecimientos
- **Verificación de habilitación municipal/estatal** de la veterinaria
- **Confirmación de domicilio legal** del establecimiento
- **Validación de permisos sanitarios** vigentes

####  Restricción de Acceso
- Hasta **no obtener la validación completa**, los usuarios no podrían acceder a las funcionalidades de la plataforma

#### Beneficios del Sistema de Validación
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
