import { defineStore } from 'pinia'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config' // Ensure path is correct
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    caretakerId: null,
    user: null,
    loading: true,
    error: null,
    someState: '',
    otherState: {}
  }),
  actions: {
    updateSomeState(newValue) {
      this.someState = newValue
    },

    fetchUser() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.caretakerId = user.uid
          this.user = {
            uid: user.uid,
            name: user.displayName || 'Anonymous',
            email: user.email
          }
        } else {
          this.caretakerId = null
          this.user = null
        }
        this.loading = false
      })
    },

    async loginWithGoogle() {
      this.loading = true
      this.error = null
      const provider = new GoogleAuthProvider()

      try {
        const auth = getAuth()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        // Set local state
        this.user = {
          uid: user.uid,
          name: user.displayName || 'Anonymous',
          email: user.email
        }

        // Check if user exists in Firestore
        const userRef = doc(getFirestore(), 'users', user.uid)
        const userSnap = await getDoc(userRef)

        let role = 'student' // default

        if (!userSnap.exists()) {
          // Create document
          await setDoc(userRef, {
            email: user.email,
            role: role
          })
          console.log('New user document created.')
        } else {
          // Use saved role
          const data = userSnap.data()
          role = data.role || 'student'
        }

        // Redirect based on role
        if (role === 'admin') {
          router.push('/admin')
        } else if (role === 'caretaker') {
          router.push('/caretaker')
        } else {
          router.push('/console')
        }

        console.log('Logged in with UID:', user.uid)
      } catch (error) {
        this.error = error.message
        console.error('Login error:', error)
      } finally {
        this.loading = false
      }
    },

    async logOut() {
      this.loading = true
      try {
        await signOut(getAuth())
        this.user = null
        this.caretakerId = null
        router.push('/')
      } finally {
        this.loading = false
      }
    },

    isLoggedIn() {
      return !!this.user
    }
  },
  persist: true
})
