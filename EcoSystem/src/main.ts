// ✅ Import Tailwind CSS first
import './assets/tailwind.css' // <--- MAKE SURE this file contains @tailwind directives

// Existing imports
import 'preline/preline'
import './assets/main.css' // if this exists, it's fine to keep after tailwind

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'

// Firebase config
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your Firebase project config
const firebaseConfig = {
  apiKey: 'AIzaSyC7573Y8YUZWcfOB7kuMA74YKDknYUY-Mw',
  authDomain: 'ecosystem-a6cee.firebaseapp.com',
  projectId: 'ecosystem-a6cee',
  storageBucket: 'ecosystem-a6cee.appspot.com',
  messagingSenderId: '188115516270',
  appId: '1:188115516270:web:aa52973174423028c49f7f'
}

const firebaseApp = initializeApp(firebaseConfig)
const app = createApp(App)
const db = getFirestore(firebaseApp)

export { db }

app.use(createPinia())
app.use(PortalVue)
app.use(router)

app.mount('#app')

