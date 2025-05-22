/* eslint-disable @typescript-eslint/no-unused-vars */
// src/stores/auth.ts
import { defineStore } from 'pinia'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  type User
} from 'firebase/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    // register with email
    async registerWithEmail(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { user } = await createUserWithEmailAndPassword(getAuth(), email, password)
        this.user = user
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    // login with email
    async loginWithEmail(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const { user } = await signInWithEmailAndPassword(getAuth(), email, password)
        this.user = user
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },

    // login with google
    async loginWithGoogle() {
      this.loading = true
      this.error = null
      const provider = new GoogleAuthProvider()
      try {
        const { user } = await signInWithPopup(getAuth(), provider)
        this.user = user
        router.push('/console')
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    // logout
    async logout() {
      this.loading = true
      try {
        await signOut(getAuth())
        this.user = null
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user
  }
})
function provider(): import('@firebase/auth').AuthProvider {
  throw new Error('Function not implemented.')
}
