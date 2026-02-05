
# diagnoVET — Plataforma de Diagnóstico Veterinario

Prototipo de interfaz y mejoras de flujo para una plataforma de diagnóstico veterinario asistida por IA.

---

## 🌐 Demo en Vivo

- **Aplicación desplegada:**  
  https://vercel.com/valu322-gmailcoms-projects/v0-diagno-vet

- **Repositorio GitHub:**  
  (agregar enlace a tu repo público)

---

# 🎯 Contexto del Challenge

El desafío solicitado fue:

> “Analizar la plataforma diagnoVET y proponer mejoras concretas de UX/UI que reduzcan la fricción y mejoren la eficiencia del veterinario, construyendo un prototipo funcional de una mejora significativa.”

Entregables requeridos:

- Documento de análisis (“Why Document”)
- Prototipo funcional
- Demo online
- Video explicativo (≤ 5 minutos)
- Perfil profesional (CV / LinkedIn)

Este documento cubre el análisis y las decisiones de diseño tomadas.

---

# 1️⃣ Documento “El Por Qué” — Análisis y Propuesta

## Fuentes Analizadas

Se realizó un análisis detallado de los siguientes videos de la plataforma actual:

- https://www.youtube.com/watch?v=FKd49yNKtUc&list=PLAgYwCOd_QS3I_n459jShKiRoveVLptzR  
- https://www.youtube.com/watch?v=7t1xlc5-0v0  
- https://www.youtube.com/watch?v=PgTmi96Xr_E  

---

## 1.1 Auditoría UX — Principales Problemas Detectados

### A) Flujo “Analizar Paciente”

Este flujo es el núcleo del producto y donde se identificaron más oportunidades de mejora:

**Problemas observados:**

- Demasiados campos obligatorios
- Formularios largos y lineales
- Poca jerarquía visual
- Acciones críticas poco claras
- Carga de imágenes separada del contexto
- Falta de guía paso a paso
- Alto esfuerzo cognitivo para tareas repetitivas

**Impacto real:**

- Lentitud al cargar estudios
- Mayor tasa de error humano
- Fricción innecesaria
- Posible abandono del flujo

---

### B) Carga de Imágenes

- Proceso poco intuitivo
- Sin feedback visual claro
- Separación física entre formulario e imágenes
- Falta de previsualización inmediata

---

### C) Ingreso de Datos Repetitivos

- El sistema no recuerda información frecuente
- Repetición manual de:
  - Profesional referente
  - Emails
  - Especies
  - Unidades

---

### D) Jerarquía de Acciones

- Botones compitiendo visualmente
- Acciones peligrosas demasiado visibles
- Falta de un “camino feliz” claro

---

# 2️⃣ Estrategia de Mejora

## Objetivo Principal

Reducir el tiempo y el esfuerzo necesario para completar un estudio veterinario sin perder calidad de información.

---

## Cambios Propuestos

### 1. Reorganización del Flujo en Wizard

Transformar el formulario único en un flujo guiado:

Paciente → Tutor → Imágenes → Confirmación

**Beneficios:**

- Menos sobrecarga visual
- Proceso guiado
- Validación por pasos
- Mayor claridad mental

---

### 2. Reducción de Campos Obligatorios

Antes: muchos campos obligatorios  
Después: solo 4 esenciales

**Campos obligatorios actuales:**

- Nombre del animal
- Especie
- Edad
- Tipo de estudio

Todo lo demás se volvió opcional.

---

### 3. Carga de Imágenes Integrada

Nuevo diseño:

- Drag & Drop directo en el flujo
- Previsualización inmediata
- Eliminación simple
- Mensajes claros de estado

---

### 4. Autocompletado Inteligente

Se implementó:

- Guardado de datos frecuentes
- Recordatorio del último profesional
- Emails previamente usados
- Valores por defecto inteligentes

---

### 5. Jerarquía de Acciones Mejorada

- Un solo botón principal por paso
- Eliminación de “Clear”
- Acciones secundarias discretas
- Lenguaje más claro y directo

---

# 3️⃣ El Prototipo

## Mejora Elegida para Implementar

Se seleccionó como foco principal:

### 🔹 Rediseño completo del flujo “Analizar Paciente”

Por ser:

- El punto más crítico del sistema
- La tarea más repetitiva
- Donde más tiempo se pierde
- El núcleo del valor del producto

---

## Implementación Realizada

Nueva versión del flujo:

### Paso 1 – Información del Paciente
- Datos esenciales
- Dropdowns inteligentes
- Validaciones en tiempo real

### Paso 2 – Tutor y Profesional
- Campos opcionales
- Autocompletado
- Menor fricción

### Paso 3 – Imágenes
- Drag & drop integrado
- Previews
- Agregar y eliminar fácilmente

### Paso 4 – Revisión Final
- Resumen antes de enviar
- Prevención de errores

---

## Resultados Esperados

| Métrica | Antes | Después |
|-------|-------|---------|
| Tiempo de carga | ~5 min | ~2 min |
| Campos obligatorios | 8+ | 4 |
| Errores de usuario | Alto | Bajo |
| Fricción percibida | Alta | Muy baja |
| Claridad del flujo | Media | Alta |

---

# 4️⃣ Stack Tecnológico

- **Framework:** Next.js 14  
- **UI:** React + TypeScript  
- **Estilos:** Tailwind CSS  
- **Componentes:** shadcn/ui  
- **Animaciones:** Framer Motion  
- **Íconos:** Lucide React  
- **Despliegue:** Vercel  

---

# 5️⃣ Cómo Ejecutar el Proyecto

### Instalación

```bash
npm install

###  Ejecución

```bash
npm run dev
