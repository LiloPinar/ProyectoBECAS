import { createRouter, createWebHistory } from 'vue-router'
import InterfazPrincipal from '../components/InterfazPrincipal.vue'
import Login from '../components/Login.vue'
import DatosGenerales from '../components/DatosGenerales.vue'
import Postulacion from '../components/Postulacion.vue'
import EncuestaBeca from '../components/EncuestaBeca.vue'
import EncuestaAyuda from '../components/EncuestaAyuda.vue'
import Confirmacion from '../components/Confirmacion.vue'
import Admin from '../components/Admin.vue'

const routes = [
  { path: '/', component: InterfazPrincipal },     
  { path: '/login', component: Login },
  { path: '/datos-generales', component: DatosGenerales },
  { path: '/postulacion', component: Postulacion },
  { path: '/encuesta-beca', component: EncuestaBeca },
  { path: '/encuesta-ayuda', component: EncuestaAyuda },
  { path: '/confirmacion', component: Confirmacion },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

