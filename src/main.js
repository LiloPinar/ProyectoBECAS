import { createApp } from 'vue'  // Importa la función para crear la app Vue
import './style.css'             // Importa los estilos globales
import App from './App.vue'      // Importa el componente raíz
import router from './router'    // Importa el router con todas las rutas

createApp(App)                   // Crea la instancia de la app usando App.vue
  .use(router)                   // Le agrega el router (navegación entre vistas)
  .mount('#app')                 // Monta la app en el elemento con id="app"



  

