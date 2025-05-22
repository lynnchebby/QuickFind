import { defineStore } from 'pinia'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    caretakerId: null as string | null, // Holds caretaker's UID
    user: null as { uid: string; name: string; email: string | null } | null, // User info
    loading: true as boolean, // Loading state
    error: null as string | null,
    someState: '',
    otherState: {}
  }),
  actions: {
    updateSomeState(newValue: string) {
      this.someState = newValue
    },
    // Track the currently logged-in user
    fetchUser() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Set caretaker's UID and user details
          this.caretakerId = user.uid
          this.user = {
            uid: user.uid,
            name: user.displayName || 'Anonymous',
            email: user.email
          }
        } else {
          // Reset if no user is logged in
          this.caretakerId = null
          this.user = null
        }
        this.loading = false
      })
    },
    // login with google
    async loginWithGoogle() {
      this.loading = true
      this.error = null
      const provider = new GoogleAuthProvider()
      try {
        const { user } = await signInWithPopup(getAuth(), provider)
        router.push('/console')
        console.log('Caretaker logged in with UID:', user.uid)
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    // logout
    async logOut() {
      this.loading = true
      try {
        await signOut(getAuth())
        this.user = null
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
