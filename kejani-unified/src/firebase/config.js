// src/firebase/config.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 🔐  Firebase values
const firebaseConfig = {
  apiKey: "AIzaSyCJqOFrfyCekuwUx55pCtZTn_bQjYjQ94c",
  authDomain: "kejani-unified.firebaseapp.com",
  projectId: "kejani-unified",
  storageBucket: "kejani-unified.appspot.com", // ✅ corrected here
  messagingSenderId: "624771916185",
  appId: "1:624771916185:web:56bb2183bb105e131bf308",
  measurementId: "G-CYHYPLQ3NX"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
