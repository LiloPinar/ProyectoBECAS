<template>
  <div class="login-bg">
    <div class="login-card">
      <!-- Encabezado -->
      <div class="login-header">
        <span class="header-title">INICIAR SESIÓN</span>
        <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="header-logo">
      </div>

      <!-- Formulario -->
      <div class="login-body">
        <div class="login-title">
          Estimado estudiante, debe usar el mismo usuario y contraseña de su aula virtual
        </div>

        <form @submit.prevent="handleLogin">
          <label class="login-label" for="usuario">Usuario</label>
          <input type="text" v-model="usuario" class="login-input" required />

          <label class="login-label" for="contrasena">Contraseña</label>
          <div class="login-pass-wrapper">
            <input :type="mostrarContrasena ? 'text' : 'password'" v-model="contrasena" class="login-input" required />
            <button type="button" class="toggle-pass" @click="togglePassword">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M1.999 12s4.000-7 10-7c6.001 0 10 7 10 7s-4.000 7-10 7c-6.001 0-10-7-10-7zm10 5c-2.761 0-5-2.239-5-5 0-2.762 2.239-5 5-5 2.762 0 5 2.238 5 5 0 2.761-2.238 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" fill="#333"/>
              </svg>
            </button>
          </div>

          <label class="login-label" for="rol">Iniciar sesión desde</label>
          <select v-model="rol" class="login-input" required>
            <option value="estudiante">Aula virtual - Estudiantes</option>
            <option value="admin">Administrador</option>
          </select>

          <div class="login-error">{{ error }}</div>

          <button type="submit" class="btn-login">
            <span style="font-size: 1.15em; vertical-align: middle;">&#10003;</span>
            &nbsp;Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/styles/login.css' 
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref('')
const contrasena = ref('')
const rol = ref('estudiante')
const error = ref('')
const mostrarContrasena = ref(false)

const togglePassword = () => {
  mostrarContrasena.value = !mostrarContrasena.value
}

const usuariosValidos = [
  {
    usuario: "e0804297828",
    contrasena: "12345",
    nombreCompleto: "Lilibeth Jamileth Pinarqote Intriago"
  },
  {
    usuario: " ",
    contrasena: "123456",
    nombreCompleto: "Melany Mabel Pinargote Molina"
  },
  {
    usuario: "e0803470863",
    contrasena: "12345678",
    nombreCompleto: "Milena Mileidy Ortíz Chere"
  },
  {
    usuario: "e1314097542",
    contrasena: "123456789",
    nombreCompleto: "Kelly Dayana Canchingre Quevedo "
  },
]

const handleLogin = () => {
  error.value = ''

  if (rol.value === "admin") {
    if (usuario.value === "admin" && contrasena.value === "admin123") {
      router.push('/admin')
    } else {
      error.value = "Usuario o contraseña de administrador incorrectos."
    }
  } else {
    const formatoValido = /^e\d{10}$/.test(usuario.value)
    if (!formatoValido) {
      error.value = "El usuario debe tener el formato 'e' seguido con su número de cédula"
      return
    }

    const encontrado = usuariosValidos.find(u =>
      u.usuario === usuario.value && u.contrasena === contrasena.value
    )

    if (encontrado) {
      const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || []
      const yaPostulo = postulaciones.some(p => p.usuario === encontrado.usuario)
      if (yaPostulo) {
        alert("Usted ya tiene registrada una postulación en este proceso.")
        return
      }

      sessionStorage.setItem("usuario", encontrado.usuario)
      sessionStorage.setItem("nombreCompleto", encontrado.nombreCompleto)
      router.push('/datos-generales')
    } else {
      error.value = "Usuario o contraseña incorrectos."
    }
  }
}
</script>




