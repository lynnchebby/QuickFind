// src/main.js

// ✅ Import Tailwind CSS first (only once)
import './assets/tailwind.css'

// Existing imports
import 'preline/preline'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'

// Import the auth store
import { useAuthStore } from './stores/auth' // Assuming this path is correct

// Create and use Pinia before getting store instances
const pinia = createPinia()
const app = createApp(App)
app.use(pinia) // Pinia must be used before stores can be accessed

app.use(PortalVue)
app.use(router)

// !!! CRITICAL FIX: Initialize and await auth state before mounting the app !!!
async function initializeAndMountApp() { // <--- Correct function name
  const authStore = useAuthStore() // Get auth store instance after pinia is used
  await authStore.fetchUser() // Await the fetchUser action to ensure auth state is determined

  app.mount('#app') // Mount the app only after auth state is determined
  console.log('Vue application mounted after Firebase Auth initialization.')
}

initializeAndMountApp() // <--- Corrected call to the function