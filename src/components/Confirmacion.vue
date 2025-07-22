<template>
  <div class="confirmacion-container">
    <div class="icono-exito">&#10004;</div>
    <h2>¡Postulación realizada con éxito!</h2>
    <p>
      Hemos recibido tu postulación.<br>
      Pronto recibirás un correo electrónico institucional informando si tu postulación fue <b>aprobada</b> o <b>rechazada</b>.<br>
      <br>
      <b>Revisa tu correo:</b>
      <span id="correo-confirmacion" style="color:#1976d2">{{ correo }}</span>
    </p>
    <button @click="volverInicio" class="btn-volver">Volver al inicio</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/styles/confirmacion.css'

const correo = ref('')
const router = useRouter()

onMounted(() => {
  const usuario = sessionStorage.getItem('usuario') || ''
  if (usuario) {
    correo.value = usuario + '@live.uleam.edu.ec'
  }
})

function volverInicio() {
  router.push('/')
}
</script>


