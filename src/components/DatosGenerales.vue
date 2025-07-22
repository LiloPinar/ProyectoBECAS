<template>
  <div>
    <!-- ENCABEZADO -->
    <header class="post-header">
      <div style="display: flex; align-items: center;">
        <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="header-logo">
      </div>
      <div style="display: flex; align-items: center; gap: 24px;">
        <div class="usuario-nombre">
          <b>Bienvenid@ {{ nombreCompleto }} - {{ usuario }}</b>
        </div>
        <button class="btn-salir-header" @click="cerrarSesion">Cerrar sesión</button>
      </div>
    </header>
    <!-- Formulario de Datos Generales -->
    <main>
      <div class="form-card" id="form-datos-generales">
        <h2>DATOS GENERALES</h2>
        <form autocomplete="off" @submit.prevent="enviarDatos">
          <label for="nombres">Nombres</label>
          <input type="text" id="nombres" :value="nombres" readonly>

          <label for="apellidos">Apellidos</label>
          <input type="text" id="apellidos" :value="apellidos" readonly>

          <label for="cedula">Cédula</label>
          <input type="text" id="cedula" :value="cedula" readonly>

          <label for="fecha">Fecha de nacimiento</label>
          <input type="date" id="fecha" v-model="fecha" @change="validarFecha">
          <div id="fecha-error" class="msg-error">{{ fechaError }}</div>

          <label for="correo">Correo electrónico institucional</label>
          <input type="email" id="correo" :value="correo" readonly>

          <label for="telefono">Número de teléfono</label>
          <input type="tel" id="telefono" v-model="telefono" @input="validarTelefono">
          <div id="telefono-error" class="msg-error">{{ telefonoError }}</div>

          <label for="matriz">Matriz</label>
          <select id="matriz" v-model="matriz" required>
            <option value="">Seleccione una opción</option>
            <option>Manta</option>
            <option>Chone</option>
            <option>El Carmen</option>
          </select>

          <label for="facultad">Facultad</label>
          <select id="facultad" v-model="facultad" @change="cargarCarreras" required>
            <option value="">Seleccione una opción</option>
            <option v-for="f in Object.keys(carrerasPorFacultad)" :key="f">{{ f }}</option>
          </select>

          <label for="carrera">Carrera</label>
          <select id="carrera" v-model="carrera" required>
            <option value="">Seleccione una opción</option>
            <option v-for="c in carrerasDisponibles" :key="c">{{ c }}</option>
          </select>

          <label for="semestre">Semestre actual</label>
          <select id="semestre" v-model="semestre" @change="validarSemestre" required>
            <option value="">Seleccione una opción</option>
            <option v-for="i in 10" :key="i">{{ i }}</option>
          </select>
          <div id="semestre-error" class="msg-error">{{ semestreError }}</div>

          <div class="botones-form">
            <button type="submit" class="btn-siguiente">SIGUIENTE</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/styles/datosGenerales.css'

const router = useRouter()
const usuario = ref('')
const nombreCompleto = ref('')
const nombres = ref('')
const apellidos = ref('')
const cedula = ref('')
const fecha = ref('')
const correo = ref('')
const telefono = ref('')
const matriz = ref('')
const facultad = ref('')
const carrera = ref('')
const semestre = ref('')
const fechaError = ref('')
const telefonoError = ref('')
const semestreError = ref('')
const carrerasDisponibles = ref([])

const carrerasPorFacultad = {
  "Educación, Turismo, Artes y Humanidades": [
    "Educación Básica", "Educación Inicial", "Educación Especial", "Pedagogía de los Idiomas Nacionales y Extranjeros", "Turismo", "Pedagogía de la Actividad Física y Deporte"
  ],
  "Ciencias de la Salud": [
    "Medicina", "Odontología", "Enfermería", "Fisioterapia", "Laboratorio Clínico", "Nutrición"
  ],
  "Ciencias de la Vida y Tecnologías": [
    "Biología", "Software", "Tecnología de la Información", "Ingeniería Agropecuaria", "Ingeniería Ambiental", "Agronegocios"
  ],
  "Ingeniería, Industria y Arquitectura": [
    "Ingeniería Civil", "Arquitectura", "Ingeniería Industrial", "Ingeniería Marítima", "Ingeniería de Alimentos", "Electricidad"
  ],
  "Derecho": ["Derecho", "Criminología"]
}

onMounted(() => {
  usuario.value = sessionStorage.getItem("usuario") || ""
  nombreCompleto.value = sessionStorage.getItem("nombreCompleto") || ""

  let nombreParts = nombreCompleto.value.trim().split(/\s+/)

  if (nombreParts.length >= 4) {
    nombres.value = `${nombreParts[0]} ${nombreParts[1]}`
    apellidos.value = `${nombreParts[2]} ${nombreParts[3]}`
  } else {
    nombres.value = nombreParts.slice(0, 2).join(' ')
    apellidos.value = nombreParts.slice(2).join(' ')
  }

  cedula.value = usuario.value.substring(1)
  if (usuario.value) {
    correo.value = usuario.value + "@live.uleam.edu.ec"
  }
})


function cargarCarreras() {
  carrerasDisponibles.value = carrerasPorFacultad[facultad.value] || []
  carrera.value = ""
}

function validarTelefono() {
  telefono.value = telefono.value.replace(/\D/g, '').substring(0, 10)
  if (telefono.value.length > 0 && telefono.value.length < 10) {
    telefonoError.value = "El teléfono debe contener exactamente 10 dígitos numéricos."
  } else {
    telefonoError.value = ""
  }
}

function validarFecha() {
  fechaError.value = ""
  if (fecha.value) {
    const hoy = new Date()
    const fechaNac = new Date(fecha.value)
    let edad = hoy.getFullYear() - fechaNac.getFullYear()
    const m = hoy.getMonth() - fechaNac.getMonth()
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--
    }
    if (edad < 17) {
      fechaError.value = "Usted debe tener una edad mayor o igual a 17 años."
    }
  }
}

function validarSemestre() {
  if (parseInt(semestre.value) < 3) {
    semestreError.value = "Debe haber cursado al menos dos periodos anteriores (semestre 3 o mayor) para postularse."
  } else {
    semestreError.value = ""
  }
}

function enviarDatos() {
  let hayErrores = false
  // Validación de teléfono
  if (telefono.value.length !== 10) {
    telefonoError.value = "El teléfono debe contener exactamente 10 dígitos numéricos."
    hayErrores = true
  } else {
    telefonoError.value = ""
  }
  // Validación de edad mínima
  if (!fecha.value) {
    fechaError.value = "Debe ingresar la fecha de nacimiento."
    hayErrores = true
  } else {
    const hoy = new Date()
    const fechaNac = new Date(fecha.value)
    let edad = hoy.getFullYear() - fechaNac.getFullYear()
    const m = hoy.getMonth() - fechaNac.getMonth()
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--
    }
    if (edad < 17) {
      fechaError.value = "Usted debe tener una edad mayor o igual a 17 años."
      hayErrores = true
    } else {
      fechaError.value = ""
    }
  }

  // Validación de semestre mínimo
  if (parseInt(semestre.value) < 3) {
    semestreError.value = "Debe haber cursado al menos dos periodos anteriores (semestre 3 o mayor) para postularse."
    hayErrores = true
  } else {
    semestreError.value = ""
  }

  if (hayErrores) return

  // Guardar periodo en sessionStorage
  const periodo = "2025"
  sessionStorage.setItem('periodo', periodo)

  // Crear objeto datosGenerales
  const datosGenerales = {
    nombres: nombres.value,
    apellidos: apellidos.value,
    cedula: cedula.value,
    fecha_nacimiento: fecha.value,
    correo: correo.value,
    telefono: telefono.value,
    matriz: matriz.value,
    facultad: facultad.value,
    carrera: carrera.value,
    semestre: semestre.value
  }

  let postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || []
  let idx = postulaciones.findIndex(p => p.usuario === usuario.value && p.periodo === periodo)
  if (idx === -1) {
    postulaciones.push({
      usuario: usuario.value,
      nombre: nombreCompleto.value,
      periodo: periodo,
      datosGenerales: datosGenerales,
      estado: "Pendiente"
    })
  } else {
    postulaciones[idx].datosGenerales = datosGenerales
  }
  localStorage.setItem('postulaciones', JSON.stringify(postulaciones))
  router.push('/postulacion')
}

function cerrarSesion() {
  const confirmar = confirm("¿Estás seguro de que quieres cerrar sesión? Si cierras, cancelas el proceso de postulación.")
  if (confirmar) {
    sessionStorage.clear()
    router.push('/')
  }
}
</script>
