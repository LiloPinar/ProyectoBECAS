<template>
  <div>
    <!-- ENCABEZADO -->
    <header class="post-header">
      <div style="display: flex; align-items: center;">
        <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="header-logo" />
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
        <h2>ENCUESTA PARA AYUDAS ECONÓMICAS</h2>
        <p>Responder las preguntas con sinceridad</p>
        <form @submit.prevent="guardarEncuesta">
          <label>¿Participas en actividades extracurriculares dentro de la institución?</label>
          <div class="opciones">
            <label><input type="radio" name="extra" value="si" v-model="form.extra" required> Sí</label>
            <label><input type="radio" name="extra" value="no" v-model="form.extra"> No</label>
          </div>

          <label>¿Has asistido a seminarios o talleres en el último año?</label>
          <div class="opciones">
            <label><input type="radio" name="taller" value="si" v-model="form.taller" required> Sí</label>
            <label><input type="radio" name="taller" value="no" v-model="form.taller"> No</label>
          </div>

          <label>¿Actualmente trabajas para costear tus estudios?</label>
          <div class="opciones">
            <label><input type="radio" name="trabaja" value="si" v-model="form.trabaja" required> Sí</label>
            <label><input type="radio" name="trabaja" value="no" v-model="form.trabaja"> No</label>
          </div>

          <label>Describe tu situación económica actual y por qué necesitas esta ayuda.</label>
          <textarea name="situacion" rows="2" maxlength="300" v-model="form.situacion" required style="resize: vertical;"></textarea>

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
import '../assets/styles/encuestaAyuda.css'

const router = useRouter()
const usuario = ref('')
const nombreCompleto = ref('')
const periodo = ref('2025')

const form = reactive({
  extra: '',
  taller: '',
  trabaja: '',
  situacion: ''
})

onMounted(() => {
  usuario.value = sessionStorage.getItem("usuario") || ""
  nombreCompleto.value = sessionStorage.getItem("nombreCompleto") || ""
  periodo.value = sessionStorage.getItem("periodo") || "2025"
})

function guardarEncuesta() {
  if (!form.extra || !form.taller || !form.trabaja || !form.situacion) {
    alert("Por favor, responde todas las preguntas obligatorias.")
    return
  }
  let postulaciones = JSON.parse(localStorage.getItem('postulaciones')) || []
  let idx = postulaciones.findIndex(p => p.usuario === usuario.value && p.periodo === periodo.value)
  if (idx !== -1) {
    postulaciones[idx].encuestaAyuda = {
      participaExtra: form.extra,
      asisteTaller: form.taller,
      trabaja: form.trabaja,
      situacion: form.situacion
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
