<template>
  <div>
    <!-- ENCABEZADO -->
    <header class="post-header">
      <div style="display: flex; align-items: center;">
        <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="header-logo">
      </div>
      <div style="display: flex; align-items: center; gap: 24px;">
        <div class="usuario-nombre">Bienvenid@ {{ nombreCompleto }} - <b>{{ usuario }}</b></div>
        <button class="btn-salir-header" @click="cerrarSesion">Cerrar sesión</button>
      </div>
    </header>

    <main>
      <div class="post-card post-horizontal">
        <h2>TIPO DE BECA O AYUDA ECONÓMICA</h2>
        <form @submit.prevent="enviarPostulacion">
          <div class="form-row">
            <label for="periodo">PERIODO ACADÉMICO</label>
            <select id="periodo" v-model="periodo" @change="asignarPromedio">
              <option value="">Seleccione periodo</option>
              <option value="2025">2025-1</option>
            </select>
          </div>
          <div class="form-row">
            <label for="tipo-beca">BECA O AYUDA ECONÓMICA</label>
            <select id="tipo-beca" v-model="tipoBeca">
              <option value="">Seleccione una opción</option>
              <option value="socioeconomica">Beca Socioeconómica</option>
              <option value="rendimiento">Beca Alto Rendimiento</option>
              <option value="afirmativa">Ayuda Acciones Afirmativas</option>
              <option value="seminario">Ayuda por Asistir a Seminarios</option>
            </select>
          </div>
          <div class="form-row">
            <label for="fecha">FECHA DE ELABORACIÓN</label>
            <input type="date" id="fecha" :value="fechaActual" readonly>
          </div>
          <div class="form-row">
            <label for="promedio">PROMEDIO DE DOS PERIODOS ANTERIORES</label>
            <input type="text" id="promedio" :value="promedio" readonly>
          </div>
          <div class="form-row form-upload-row">
            <label for="documento-url">DOCUMENTO DE REQUISITOS</label>
            <input type="text" id="documento-url" v-model="nombreArchivo" placeholder="Pegue el enlace aquí..." readonly>
            <input type="file" id="archivo-pdf" ref="archivoInput" @change="seleccionarArchivo" accept="application/pdf" style="display:none;">
            <button type="button" class="btn-examinar" @click="abrirSelectorArchivo">Examinar</button>
          </div>
          <div class="post-error">{{ error }}</div>
          <div class="form-row">
            <button type="submit" class="btn-postular">AGREGAR POSTULACIÓN</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/styles/postulacion.css'

const router = useRouter()
// Datos reactivamente vinculados
const usuario = ref('')
const nombreCompleto = ref('')
const periodo = ref('')
const tipoBeca = ref('')
const promedio = ref('')
const nombreArchivo = ref('')
const archivoSeleccionado = ref(null)
const error = ref('')

const archivoInput = ref(null)

const fechaActual = new Date().toISOString().split('T')[0]

const promediosPorUsuario = {
  "e0804297828": "8.92",
  "e0803711142": "7.88",
  "e0803470863": "9.20",
  "e1314097542": "10",
}

onMounted(() => {
  usuario.value = sessionStorage.getItem("usuario") || ""
  nombreCompleto.value = sessionStorage.getItem("nombreCompleto") || ""
})

const asignarPromedio = () => {
  if (periodo.value === "2025") {
    promedio.value = promediosPorUsuario[usuario.value] || ""
  } else {
    promedio.value = ""
  }
}

const abrirSelectorArchivo = () => {
  archivoInput.value?.click()
}

const seleccionarArchivo = (event) => {
  const archivo = event.target.files[0]
  if (archivo) {
    nombreArchivo.value = archivo.name
    archivoSeleccionado.value = archivo
  }
}

const enviarPostulacion = () => {
  error.value = ''

  if (!periodo.value) {
    error.value = "Debe seleccionar un periodo académico."
    return
  }
  if (!tipoBeca.value) {
    error.value = "Debe seleccionar un tipo de beca o ayuda económica."
    return
  }
  if (!archivoSeleccionado.value) {
    error.value = "Debe seleccionar un archivo PDF de requisitos."
    return
  }

  let postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || []
  const idx = postulaciones.findIndex(p => p.usuario === usuario.value && p.periodo === periodo.value)

  if (idx === -1) {
    error.value = "Debe llenar los datos generales primero."
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    postulaciones[idx].tipoBeca = tipoBeca.value
    postulaciones[idx].fecha = fechaActual
    postulaciones[idx].promedio = promedio.value
    postulaciones[idx].documento = archivoSeleccionado.value.name
    postulaciones[idx].documentoBase64 = e.target.result
    postulaciones[idx].estado = "Pendiente" 

    localStorage.setItem('postulaciones', JSON.stringify(postulaciones))

    if (tipoBeca.value === 'socioeconomica' || tipoBeca.value === 'rendimiento') {
    router.push('/encuesta-beca')
    } else if (tipoBeca.value === 'afirmativa' || tipoBeca.value === 'seminario') {
    router.push('/encuesta-ayuda')
    } else {
    alert("¡Postulación enviada correctamente!")
    router.push('/interfaz-principal')
  }
  }

  reader.readAsDataURL(archivoSeleccionado.value)
}

const cerrarSesion = () => {
  const confirmar = confirm("¿Estás seguro de que quieres cerrar sesión? Si cierras, cancelas el proceso de postulación.")
  if (confirmar) {
    sessionStorage.clear()
    router.push('/')
  }
}
</script>
