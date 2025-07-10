// ✅ Import Tailwind CSS first (only once)
import './assets/tailwind.css'

// Existing imports
import 'preline/preline'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'

// ✅ Firebase imports with duplicate-check fix
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: 'AIzaSyC7573Y8YUZWcfOB7kuMA74YKDknYUY-Mw',
  authDomain: 'ecosystem-a6cee.firebaseapp.com',
  projectId: 'ecosystem-a6cee',
  storageBucket: 'ecosystem-a6cee.appspot.com',
  messagingSenderId: '188115516270',
  appId: '1:188115516270:web:aa52973174423028c49f7f'
}

// ✅ Only initialize if no app already exists
let firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = getApps()[0]
}

const db = getFirestore(firebaseApp)
export { db }

// ✅ Create and mount the Vue app
const app = createApp(App)
app.use(createPinia())
app.use(PortalVue)
app.use(router)

app.mount('#app')
