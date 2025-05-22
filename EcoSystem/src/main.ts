import './assets/main.css'
import 'preline/preline'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
