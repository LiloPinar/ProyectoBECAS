<template>
  <div>
    <!-- Header -->
    <header>
      <div class="contenedor-header">
        <a href="#" class="logo-link">
          <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="logo" />
        </a>
        <div class="redes">
          <a href="https://x.com/UleamEcuador" target="_blank" aria-label="Twitter">
            <img src="https://images.seeklogo.com/logo-png/31/1/twitter-logo-png_seeklogo-318424.png" alt="Twitter" class="icono" />
          </a>
          <a href="https://www.facebook.com/UleamEc?locale=es_LA" target="_blank" aria-label="Facebook">
            <img src="https://cdn-icons-png.flaticon.com/512/20/20673.png" alt="Facebook" class="icono" />
          </a>
          <a href="https://www.youtube.com/@uleamecuador4175" target="_blank" aria-label="YouTube">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733646.png" alt="YouTube" class="icono" />
          </a>
        </div>
      </div>
    </header>
    <h1 class="titulo-principal">Becas y Ayudas Económicas ULEAM</h1>

    <section class="banner">
     <img src="/img/imageninicio.jpg" alt="Programa de becas y ayudas económicas" class="img-banner" />
    </section>

    <section class="contenido">
      <!-- Normativa -->
      <h2>NORMATIVA</h2>
      <hr class="separador" />
      <a href="/docs/ULEAM-005-REGLAMENTO-DE-AYUDAS-ECONÓMICAS.pdf" target="_blank">
    <div class="tarjeta-normativa">
       <img src="https://cdn-icons-png.flaticon.com/512/2421/2421033.png" alt="Normativa" class="icono-tarjeta" />
    <div class="texto-tarjeta">Becas y Ayudas Económicas</div>
  </div>
</a>

      <!-- Requisitos Generales -->
      <h2>REQUISITOS GENERALES</h2>
      <hr class="separador" />
      <div class="columnas">
        <div>
          <button class="btn-toggle" @click="toggle('reqBecas')">Becas</button>
          <div v-show="mostrar.reqBecas" class="contenido-oculto">
            <ol>
              <li>Ser estudiante regular;</li>
              <li>No tener asignatura reprobada;</li>
              <li>No haber sido sancionado disciplinariamente;</li>
              <li>Otros específicos de acuerdo con el tipo de beca solicitada.</li>
            </ol>
          </div>
        </div>
        <div>
          <button class="btn-toggle" @click="toggle('reqAyudas')">Ayudas Económicas</button>
          <div v-show="mostrar.reqAyudas" class="contenido-oculto">
            <ol>
              <li>Ser estudiante regular;</li>
              <li>No tener asignatura reprobada;</li>
              <li>No haber sido sancionado disciplinariamente;</li>
              <li>Otros específicos de acuerdo con el tipo de ayuda solicitada.</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Requisitos Específicos -->
      <h2>REQUISITOS ESPECÍFICOS</h2>
      <hr class="separador" />
      <div class="columnas">
        <div>
          <h3>TIPOS DE BECAS</h3>
          <button class="btn-toggle" @click="toggle('becaSocio')">Beca por Situación Socioeconómica</button>
          <div v-show="mostrar.becaSocio" class="contenido-oculto">
            <ol>
              <li>Copia de cédula de ciudadanía/identidad;</li>
              <li>Certificado de matrícula y asistencia;</li>
              <li>Certificado de no afiliación al IESS;</li>
              <li>Cuenta bancaria activa;</li>
              <li>Notas (2 últimos periodos);</li>
            </ol>
          </div>

          <button class="btn-toggle" @click="toggle('becaRend')">Beca por Alto Rendimiento</button>
          <div v-show="mostrar.becaRend" class="contenido-oculto">
            <ol>
              <li>Copia de cédula de ciudadanía/identidad;</li>
              <li>Certificado de matrícula, asistencia y alto promedio;</li>
              <li>Acta de compromiso;</li>
              <li>Cuenta bancaria activa;</li>
            </ol>
          </div>
        </div>

        <div>
          <h3>TIPOS DE AYUDAS ECONÓMICAS</h3>
          <button class="btn-toggle" @click="toggle('ayudaAcciones')">Ayuda por Acciones Afirmativas</button>
          <div v-show="mostrar.ayudaAcciones" class="contenido-oculto">
            <ol>
              <li>Copia de cédula de ciudadanía/identidad;</li>
              <li>Certificado de matrícula, asistencia y disciplina;</li>
              <li>Solicitud de acciones afirmativas;</li>
              <li>Certificado de grupo vulnerable;</li>
              <li>Cuenta bancaria activa;</li>
            </ol>
          </div>

          <button class="btn-toggle" @click="toggle('ayudaSeminarios')">Ayuda por Asistir a Seminarios</button>
          <div v-show="mostrar.ayudaSeminarios" class="contenido-oculto">
            <ol>
              <li>Copia de cédula de ciudadanía/identidad;</li>
              <li>Certificado de matrícula, asistencia y disciplina;</li>
              <li>Solicitud de acciones afirmativas;</li>
              <li>Certificado de grupo vulnerable;</li>
              <li>Cuenta bancaria activa;</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Botón para ir al login -->
      <div class="centrado">
        <router-link to="/login" class="btn-postular">Postular</router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="footer-superior">
        <div class="footer-logo">
          <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="Uleam" />
        </div>
        <div class="footer-direccion">
          <strong>Dirección:</strong> Av. Circunvalación - Vía a San Mateo - Manta - Manabí - Ecuador
        </div>
        <div class="footer-redes">
          <a href="https://x.com/UleamEcuador" target="_blank"><img src="https://pngimg.com/d/twitter_PNG34.png" alt="Twitter" /></a>
          <a href="https://www.facebook.com/UleamEc?locale=es_LA" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/20/20673.png" alt="Facebook" /></a>
          <a href="https://www.youtube.com/@uleamecuador4175" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733646.png" alt="YouTube" /></a>
        </div>
      </div>
      <div class="footer-inferior">
        Copyright © 2025 Dirección de Bienestar Universitario - Uleam |
        Powered by Dirección de Bienestar Universitario - Uleam.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import '../assets/styles/interfazPrincipal.css'

const mostrar = reactive({
  reqBecas: false,
  reqAyudas: false,
  becaSocio: false,
  becaRend: false,
  ayudaAcciones: false,
  ayudaSeminarios: false
})

const toggle = (clave) => {
  mostrar[clave] = !mostrar[clave]
}
</script>
