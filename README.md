<h1 align="center" style="color:#2e86de;">💡 ParkinsonTap-Web</h1>

<p align="center" style="color:#34495e;">
Una plataforma web interactiva para el análisis de síntomas motores del Parkinson a través de una prueba de tapping.
</p>

---

### 🎯 <span style="color:#27ae60;">¿Qué es ParkinsonTap-Web?</span>

ParkinsonTap-Web es una plataforma **web interactiva** diseñada para apoyar a profesionales de la salud en la evaluación y seguimiento de evaluados con enfermedad o indicios de Parkinson. A través de una prueba de **tapping**, donde la persona realiza movimientos repetitivos de **toque entre el índice y el pulgar**, se capturan datos mediante un **sensor inercial (MPU)**, estos datos permiten analizar características del movimiento, como la **frecuencia, amplitud y regularidad**, siendo útiles para la evaluación de **la bradicinesia**, uno de los síntomas motores característicos de la enfermedad.

---

### ⚙️ <span style="color:#e67e22;">Tecnología e Integración</span>

- 🌐 Plataforma web responsiva desarrollada con React
- 🔌 Integración con hardware ESP32 y sensor MPU6050, programados con _PlatformIO_
- 🖥️ Compatible con computadoras de escritorio y portátiles
- 🧠 Diseñada para entornos clínicos, domésticos o de investigación
- 🛠️ Backend desarrollado con _Spring Boot_
- 🗄️ Base de datos gestionada con _PostgreSQL_
- 📦 Uso de herramientas del ecosistema _npm_ para gestión de dependencias del frontend

---

### 🛠️ <span style="color:#c0392b;">Arquitectura del Proyecto</span>

- Módulo de configuración en ESP32 para recolección y transmisión eficiente de datos  
- Separación clara entre frontend y backend  
- Preparado para la **escalabilidad y mantenimiento futuro**  
- Sincronización entre hardware e interfaz

---

### 📊 <span style="color:#16a085;">Visualización de Resultados</span>

La plataforma incluye una interfaz para:
- Visualizar gráficamente los movimientos capturados por el sensor, como los cambios en orientación y aceleración durante la prueba de tapping
- Exportar los datos para análisis más detallado o para compartir con profesionales de la salud
- Gestionar usuarios y roles: los administradores pueden registrar y administrar doctores, mientras que los doctores tienen acceso a la gestión de pacientes evaluados, tests realizados y las mediciones 

---

### 📁 <span style="color:#2980b9;">Organización del Repositorio</span>

- Carpetas separadas para:  
  - 🖥️ **Frontend**  
  - 🔧 **Backend**  
  - 🛠️ **Configuración ESP32**  
 
---
