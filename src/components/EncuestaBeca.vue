<template>
  <div>
    <!-- ENCABEZADO -->
    <header class="post-header">
      <div style="display: flex; align-items: center;">
        <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="header-logo">
      </div>
      <div style="display: flex; align-items: center; gap: 22px;">
        <div class="usuario-nombre">
          <b>Bienvenid@ {{ nombreCompleto }} – {{ usuario }}</b>
        </div>
        <button class="btn-salir-header" @click="cerrarSesion">Cerrar sesión</button>
      </div>
    </header>

    <main>
      <div class="form-card">
        <h2>ENCUESTA PARA BECAS</h2>
        <form @submit.prevent="guardarEncuesta" autocomplete="off">
          <div class="instruccion">
            Responder las preguntas con sinceridad
          </div>
          <!-- Pregunta 1 -->
          <div class="pregunta">
            <label><b>¿Cuántas personas viven en tu casa?</b></label>
            <div class="opciones">
              <label><input type="radio" name="personas" value="1-2" v-model="form.personas" required> 1 - 2</label>
              <label><input type="radio" name="personas" value="3-4" v-model="form.personas"> 3 - 4</label>
              <label><input type="radio" name="personas" value="mas4" v-model="form.personas"> Más de 4</label>
            </div>
          </div>
          <!-- Pregunta 2 -->
          <div class="pregunta">
            <label><b>¿Alguien en tu hogar depende económicamente de ti?</b></label>
            <div class="opciones">
              <label><input type="radio" name="depende" value="si" v-model="form.depende" required> Sí</label>
              <label><input type="radio" name="depende" value="no" v-model="form.depende"> No</label>
              <label><input type="radio" name="depende" value="independiente" v-model="form.depende"> Soy independiente</label>
            </div>
          </div>
          <!-- Pregunta 3 -->
          <div class="pregunta">
            <label><b>¿Tienes acceso a Internet y computador en casa?</b></label>
            <div class="opciones">
              <label><input type="radio" name="acceso" value="ambos" v-model="form.acceso" required> Sí, ambos</label>
              <label><input type="radio" name="acceso" value="uno" v-model="form.acceso"> Solo uno de los dos</label>
              <label><input type="radio" name="acceso" value="ninguno" v-model="form.acceso"> No tengo acceso</label>
            </div>
          </div>
          <!-- Pregunta 4 -->
          <div class="pregunta">
            <label><b>¿Has recibido becas anteriormente?</b></label>
            <div class="opciones">
              <label><input type="radio" name="anterior" value="si" v-model="form.anterior" required> Sí</label>
              <label><input type="radio" name="anterior" value="no" v-model="form.anterior"> No</label>
            </div>
          </div>
          <!-- Pregunta 5 -->
          <div class="pregunta">
            <label><b>¿Con qué frecuencia asistes a clases?</b></label>
            <div class="opciones">
              <label><input type="radio" name="clases" value="siempre" v-model="form.clases" required> Siempre</label>
              <label><input type="radio" name="clases" value="regularmente" v-model="form.clases"> Regularmente</label>
              <label><input type="radio" name="clases" value="ocasionalmente" v-model="form.clases"> Ocasionalmente</label>
            </div>
          </div>
          <!-- Pregunta 6 -->
          <div class="pregunta">
            <label><b>¿Cuáles son los principales retos que enfrentas para mantener tu rendimiento académico?</b></label>
            <div class="opciones opciones-checkbox">
              <label><input type="checkbox" name="retos" value="tiempo" v-model="form.retos"> Falta de tiempo</label>
              <label><input type="checkbox" name="retos" value="familiares" v-model="form.retos"> Problemas familiares</label>
              <label><input type="checkbox" name="retos" value="conexion" v-model="form.retos"> Mala conexión</label>
              <label><input type="checkbox" name="retos" value="otros" v-model="form.retos"> Otros</label>
            </div>
          </div>
          <div class="botones-form">
            <button type="submit" class="btn-siguiente">GUARDAR INFORMACIÓN</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/styles/encuestaBeca.css'

const router = useRouter()
const usuario = ref('')
const nombreCompleto = ref('')
const periodo = ref('2025')
const form = reactive({
  personas: '',
  depende: '',
  acceso: '',
  anterior: '',
  clases: '',
  retos: []
})

onMounted(() => {
  usuario.value = sessionStorage.getItem("usuario") || ""
  nombreCompleto.value = sessionStorage.getItem("nombreCompleto") || ""
  periodo.value = sessionStorage.getItem("periodo") || "2025"
})

function guardarEncuesta() {
  if (!form.personas || !form.depende || !form.acceso || !form.anterior || !form.clases) {
    alert("Por favor, responde todas las preguntas obligatorias.")
    return
  }
  let postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || []
  const idx = postulaciones.findIndex(p => p.usuario === usuario.value && p.periodo === periodo.value)
  if (idx !== -1) {
    postulaciones[idx].encuestaBeca = {
      personas: form.personas,
      depende: form.depende,
      acceso: form.acceso,
      anterior: form.anterior,
      clases: form.clases,
      retos: form.retos
    }
    localStorage.setItem('postulaciones', JSON.stringify(postulaciones))
    router.push('/confirmacion')
  } else {
    alert("No se encontró la postulación. Por favor, completa primero tus datos generales y la postulación.")
  }
}

function cerrarSesion() {
  const confirmar = confirm("Si cierra sesión su postulación quedará incompleta y no será evaluada.")
  if (confirmar) {
    sessionStorage.clear()
    router.push('/')
  }
}
</script>
