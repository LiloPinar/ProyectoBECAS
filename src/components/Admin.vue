<template>
  <div>
    <header class="admin-header">
      <img src="https://seekvectors.com/files/download/logo-uleam.png" alt="ULEAM" class="header-logo">
      <div class="usuario-nombre">
        Panel de Administración - <b>admin01</b>
        <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Usuario" class="icono-usuario">
      </div>
    </header>

    <div class="admin-main">
      <nav class="admin-nav">
        <ul>
          <li :class="{active: tab === 0}" @click="tab = 0">Inicio</li>
          <li :class="{active: tab === 1}" @click="tab = 1">Revisar Postulaciones</li>
          <li :class="{active: tab === 2}" @click="tab = 2">Aprobados</li>
          <li :class="{active: tab === 3}" @click="tab = 3">Rechazados</li>
          <li class="cerrar-sesion" @click="cerrarSesion">Cerrar Sesión</li>
        </ul>
      </nav>

      <div class="admin-content">
        <!-- INICIO -->
        <section v-show="tab === 0" id="inicio">
          <h2>Bienvenido al Panel de Administración</h2>
          <div class="cards-resumen">
            <div class="card" id="card-postulaciones" @click="tab = 1">
              <div class="card-num">{{ pendientes }}</div>
              <div>Postulaciones recibidas</div>
            </div>
            <div class="card" id="card-aprobados" @click="tab = 2">
              <div class="card-num">{{ aprobadas }}</div>
              <div>Postulaciones aprobadas</div>
            </div>
            <div class="card" id="card-rechazados" @click="tab = 3">
              <div class="card-num">{{ rechazadas }}</div>
              <div>Postulaciones rechazadas</div>
            </div>
          </div>
        </section>

        <!-- POSTULACIONES PENDIENTES -->
        <section v-show="tab === 1" id="postulaciones">
          <h2>Revisar Postulaciones</h2>
          <table id="tabla-postulaciones">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Periodo</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="post in postulacionesPendientes"
                :key="post.usuario + '-' + post.periodo"
              >
                <td>{{ post.usuario }}</td>
                <td>{{ post.nombre }}</td>
                <td>{{ post.periodo }}</td>
                <td>{{ post.tipoBeca }}</td>
                <td>{{ post.estado || "Pendiente" }}</td>
                <td>
                  <button class="btn-ver" @click="abrirDetalle(post)">Ver</button>
                  <button class="btn-editar" @click="abrirEditar(post)">Editar</button>
                  <button class="btn-eliminar" @click="eliminar(post.usuario, post.periodo)">Eliminar</button>
                </td>
              </tr>
              <tr v-if="postulacionesPendientes.length === 0">
                <td colspan="6">No hay postulaciones registradas</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- APROBADOS -->
      <section v-show="tab === 2" id="aprobados">
         <h2>Postulaciones Aprobadas</h2>
          <table id="tabla-aprobados">
            <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Periodo</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                </tr>
              </thead>
            <tbody>
      <tr v-for="post in postulaciones.filter(p => p.estado === 'Aprobada')" :key="post.usuario + '-' + post.periodo">
        <td>{{ post.usuario }}</td>
        <td>{{ post.nombre }}</td>
        <td>{{ post.periodo }}</td>
        <td>{{ post.tipoBeca }}</td>
        <td>{{ post.estado }}</td>
      </tr>
      <tr v-if="postulaciones.filter(p => p.estado === 'Aprobada').length === 0">
        <td colspan="5">No hay postulaciones aprobadas</td>
      </tr>
    </tbody>
  </table>
</section>


        <!-- RECHAZADOS -->
   <section v-show="tab === 3" id="rechazados">
        <h2>Postulaciones Rechazadas</h2>
        <table id="tabla-rechazados">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Periodo</th>
              <th>Tipo</th>
              <th>Estado</th>
            </tr>
          </thead>
    <tbody>
      <tr v-for="post in postulaciones.filter(p => p.estado === 'Rechazada')" :key="post.usuario + '-' + post.periodo">
        <td>{{ post.usuario }}</td>
        <td>{{ post.nombre }}</td>
        <td>{{ post.periodo }}</td>
        <td>{{ post.tipoBeca }}</td>
        <td>{{ post.estado }}</td>
      </tr>
      <tr v-if="postulaciones.filter(p => p.estado === 'Rechazada').length === 0">
        <td colspan="5">No hay postulaciones rechazadas</td>
      </tr>
    </tbody>
  </table>
</section>


        <!-- MODAL DE DETALLE -->
        <div class="modal-bg" v-show="modalDetalle" id="modal-revision">
          <div class="modal">
            <h3>Detalle de Postulación</h3>
            <div id="detalle-postulacion">
              <div class="detalle-scroll">
                <p><b>Usuario:</b> {{ detalle?.usuario }}</p>
                <p><b>Nombre:</b> {{ detalle?.nombre }}</p>
                <p><b>Periodo:</b> {{ detalle?.periodo }}</p>
                <p><b>Tipo:</b> {{ detalle?.tipoBeca }}</p>
                <p><b>Fecha:</b> {{ detalle?.fecha || '-' }}</p>
                <p><b>Promedio:</b> {{ detalle?.promedio || '-' }}</p>
                <p><b>Documento:</b> {{ detalle?.documento || '-' }}
                  <button v-if="detalle?.documentoBase64" @click="verPdf(detalle?.documentoBase64)" class="detalle-pdf-btn">Ver PDF</button>
                </p>
                <template v-if="detalle?.datosGenerales">
                  <h4 class="detalle-section-title">Datos Generales</h4>
                  <ul class="detalle-lista">
                    <li><b>Nombres:</b> {{ detalle.datosGenerales.nombres }}</li>
                    <li><b>Apellidos:</b> {{ detalle.datosGenerales.apellidos }}</li>
                    <li><b>Cédula:</b> {{ detalle.datosGenerales.cedula }}</li>
                    <li><b>Correo:</b> {{ detalle.datosGenerales.correo }}</li>
                    <li><b>Teléfono:</b> {{ detalle.datosGenerales.telefono }}</li>
                    <li><b>Matriz:</b> {{ detalle.datosGenerales.matriz }}</li>
                    <li><b>Facultad:</b> {{ detalle.datosGenerales.facultad }}</li>
                    <li><b>Carrera:</b> {{ detalle.datosGenerales.carrera }}</li>
                    <li><b>Semestre:</b> {{ detalle.datosGenerales.semestre }}</li>
                  </ul>
                </template>
                <template v-if="detalle?.encuestaBeca || detalle?.encuestaAyuda">
                  <h4 class="detalle-section-title">Encuesta</h4>
                  <ul class="detalle-lista">
                    <template v-if="detalle.encuestaBeca">
                      <li><b>Personas en casa:</b> {{ detalle.encuestaBeca.personas }}</li>
                      <li><b>Dependen de ti:</b> {{ detalle.encuestaBeca.depende }}</li>
                      <li><b>Acceso a internet/computador:</b> {{ detalle.encuestaBeca.acceso }}</li>
                      <li><b>Recibió beca antes:</b> {{ detalle.encuestaBeca.anterior }}</li>
                      <li><b>Frecuencia asistencia:</b> {{ detalle.encuestaBeca.clases }}</li>
                      <li><b>Retos académicos:</b> {{ Array.isArray(detalle.encuestaBeca.retos) ? detalle.encuestaBeca.retos.join(", ") : '-' }}</li>
                    </template>
                    <template v-if="detalle.encuestaAyuda">
                      <li><b>Participa extra:</b> {{ detalle.encuestaAyuda.participaExtra }}</li>
                      <li><b>Asiste a taller:</b> {{ detalle.encuestaAyuda.asisteTaller }}</li>
                      <li><b>Trabaja:</b> {{ detalle.encuestaAyuda.trabaja }}</li>
                      <li><b>Situación económica:</b> {{ detalle.encuestaAyuda.situacion }}</li>
                    </template>
                  </ul>
                </template>
              </div>
            </div>
            <div class="modal-botones">
              <button class="btn-modal verde" @click="aprobar">Aprobar</button>
              <button class="btn-modal rojo" @click="rechazar">Rechazar</button>
              <button class="btn-modal-cerrar" @click="cerrarDetalle">Cerrar</button>
            </div>
          </div>
        </div>

        <!-- MODAL DE EDITAR -->
        <div class="modal-bg" v-show="modalEditar" id="modal-editar">
          <div class="modal">
            <h3>Editar número de teléfono</h3>
            <form @submit.prevent="guardarEdicion">
              <label for="edit-telefono">Teléfono</label>
              <input type="text" id="edit-telefono" maxlength="10" v-model="editTelefono" required>
              <div id="edit-error" style="color:#d32f2f; margin:6px 0;">{{ editError }}</div>
              <div class="modal-botones">
                <button type="submit" class="btn-modal verde">Guardar</button>
                <button type="button" class="btn-modal-cerrar" @click="cerrarEditar">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/styles/admin.css'

const router = useRouter()
const tab = ref(0)
const postulaciones = ref([])
const modalDetalle = ref(false)
const detalle = ref(null)
const idxDetalle = ref(null)
const modalEditar = ref(false)
const idxEditar = ref(null)
const editTelefono = ref('')
const editError = ref('')

// Computed para filtrar por estado
const postulacionesPendientes = computed(() =>
  postulaciones.value.filter(p => !p.estado || p.estado.toLowerCase() === 'pendiente')
)
const postulacionesAprobadas = computed(() =>
  postulaciones.value.filter(p => p.estado && p.estado.toLowerCase() === 'aprobada')
)
const postulacionesRechazadas = computed(() =>
  postulaciones.value.filter(p => p.estado && p.estado.toLowerCase() === 'rechazada')
)

const pendientes = computed(() => postulacionesPendientes.value.length)
const aprobadas = computed(() => postulacionesAprobadas.value.length)
const rechazadas = computed(() => postulacionesRechazadas.value.length)

function cargarPostulaciones() {
  postulaciones.value = JSON.parse(localStorage.getItem("postulaciones")) || []
}

onMounted(cargarPostulaciones)
watch(tab, () => cargarPostulaciones())

// Busca índice real según usuario y periodo
function findIndexByUserAndPeriodo(usuario, periodo) {
  return postulaciones.value.findIndex(
    p => p.usuario === usuario && p.periodo === periodo
  )
}

// Modal Detalle
function abrirDetalle(post) {
  idxDetalle.value = findIndexByUserAndPeriodo(post.usuario, post.periodo)
  detalle.value = { ...post }
  modalDetalle.value = true
}
function cerrarDetalle() {
  modalDetalle.value = false
  detalle.value = null
  idxDetalle.value = null
}

// Modal Editar
function abrirEditar(post) {
  idxEditar.value = findIndexByUserAndPeriodo(post.usuario, post.periodo)
  if (idxEditar.value !== -1) {
    editTelefono.value = postulaciones.value[idxEditar.value].datosGenerales?.telefono || ''
    editError.value = ''
    modalEditar.value = true
  }
}
function cerrarEditar() {
  modalEditar.value = false
  idxEditar.value = null
  editTelefono.value = ''
  editError.value = ''
}

// Guardar edición
function guardarEdicion() {
  if (!/^[0-9]{10}$/.test(editTelefono.value)) {
    editError.value = "El teléfono debe tener 10 dígitos."
    return
  }
  const idx = idxEditar.value
  if (idx !== null && idx !== -1) {
    let posts = JSON.parse(localStorage.getItem("postulaciones")) || []
    posts[idx].datosGenerales.telefono = editTelefono.value
    localStorage.setItem("postulaciones", JSON.stringify(posts))
    cargarPostulaciones()
    cerrarEditar()
  }
}

// Eliminar postulación
function eliminar(usuario, periodo) {
  if (confirm("¿Eliminar esta postulación?")) {
    let posts = JSON.parse(localStorage.getItem("postulaciones")) || []
    const idx = posts.findIndex(
      p => p.usuario === usuario && p.periodo === periodo
    )
    if (idx !== -1) {
      posts.splice(idx, 1)
      localStorage.setItem("postulaciones", JSON.stringify(posts))
      cargarPostulaciones()
    }
  }
}

// Aprobar/Rechazar postulación
function aprobar() {
  if (idxDetalle.value === null || idxDetalle.value === -1) return
  let posts = JSON.parse(localStorage.getItem("postulaciones")) || []
  posts[idxDetalle.value].estado = "Aprobada"
  localStorage.setItem("postulaciones", JSON.stringify(posts))
  alert("Correo enviado al estudiante. Estado: Aprobado")
  cerrarDetalle()
  cargarPostulaciones()
}
function rechazar() {
  if (idxDetalle.value === null || idxDetalle.value === -1) return
  let posts = JSON.parse(localStorage.getItem("postulaciones")) || []
  posts[idxDetalle.value].estado = "Rechazada"
  localStorage.setItem("postulaciones", JSON.stringify(posts))
  alert("Correo enviado al estudiante. Estado: Rechazado")
  cerrarDetalle()
  cargarPostulaciones()
}

// Ver PDF
function verPdf(base64) {
  const win = window.open()
  win.document.write('<iframe src="' + base64 + '" width="100%" height="100%" style="border:none;height:100vh;"></iframe>')
}

// Cerrar sesión
function cerrarSesion() {
  router.push('/')
}
</script>
