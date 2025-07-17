<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-neutral-900 px-4">
    <div class="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white">Sign in</h1>
        <p class="text-sm text-neutral-400 mt-2">
          Don't have an account?
          <router-link to="/signup" class="text-blue-500 hover:underline">Sign up here</router-link>
        </p>
      </div>

      <!-- Google Sign In -->
      <button
        @click="signInWithGoogle"
        type="button"
        class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" class="w-5 h-5" />
        Sign in with Google
      </button>

      <div class="flex items-center my-6 text-sm text-neutral-400 before:flex-1 before:border-t before:border-neutral-700 before:mr-3 after:flex-1 after:border-t after:border-neutral-700 after:ml-3">
        or
      </div>

      <!-- Email Sign In Form -->
      <form @submit.prevent="handleEmailLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm text-white mb-1">Email address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-input"
            required
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="text-sm text-white">Password</label>
            <router-link to="/reset-password" class="text-sm text-blue-500 hover:underline">Forgot password?</router-link>
          </div>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-input pr-10"
              required
            />
            <span class="absolute right-3 top-3 text-white cursor-pointer" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input type="checkbox" id="remember" class="accent-blue-500" />
          <label for="remember" class="text-sm text-white">Remember me</label>
        </div>

        <button
          type="submit"
          class="form-button"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '@/firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)

    const handleEmailLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const { role } = userDoc.data()
          localStorage.setItem('user', JSON.stringify({ uid: user.uid, role }))
          router.push(`/${role}`)
        } else {
          alert('Account exists but no role is assigned. Please contact admin.')
        }
      } catch (error) {
        console.error('Email login failed:', error)
        alert('Login failed: ' + error.message)
      }
    }

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        let role

        if (!userDoc.exists()) {
          role = 'student'
          await setDoc(userRef, {
            email: user.email,
            name: user.displayName,
            role,
            createdAt: new Date()
          })
        } else {
          role = userDoc.data().role
        }

        localStorage.setItem('user', JSON.stringify({ uid: user.uid, role }))
        router.push(`/${role}`)
      } catch (error) {
        console.error('Google sign-in failed:', error)
        alert('Google login failed: ' + error.message)
      }
    }

    return {
      email,
      password,
      showPassword,
      handleEmailLogin,
      signInWithGoogle
    }
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.form-button {
  @apply w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition;
}
</style>
