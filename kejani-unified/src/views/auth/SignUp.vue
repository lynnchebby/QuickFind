<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-neutral-900 px-4">
    <div class="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white">Sign up</h1>
        <p class="text-sm text-neutral-400 mt-2">
          Already have an account?
          <router-link to="/" class="text-blue-500 hover:underline">Sign in here</router-link>
        </p>
      </div>

      <!-- Google Sign Up -->
      <button
        @click="signUpWithGoogle"
        type="button"
        class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" class="w-5 h-5" />
        Sign up with Google
      </button>

      <div class="flex items-center my-6 text-sm text-neutral-400 before:flex-1 before:border-t before:border-neutral-700 before:mr-3 after:flex-1 after:border-t after:border-neutral-700 after:ml-3">
        or
      </div>

      <!-- Sign Up Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="email" class="block text-sm text-white mb-1">Email address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm text-white mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm text-white mb-1">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="role" class="block text-sm text-white mb-1">Select Role</label>
          <select
            v-model="role"
            id="role"
            class="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select your role</option>
            <option value="admin">Admin</option>
            <option value="caretaker">Caretaker</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Sign up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const role = ref('')

    const handleRegister = async () => {
      if (!role.value) {
        alert('Please select a role.')
        return
      }

      if (password.value !== confirmPassword.value) {
        alert('Passwords do not match.')
        return
      }

      try {
        const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = result.user

        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: role.value,
          createdAt: new Date()
        })

        localStorage.setItem('user', JSON.stringify({ uid: user.uid, role: role.value }))
        router.push(`/${role.value}`)
      } catch (error) {
        alert('Sign-up failed: ' + error.message)
      }
    }

    const signUpWithGoogle = async () => {
      if (!role.value) {
        alert('Please select a role before continuing with Google.')
        return
      }

      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user.displayName,
          role: role.value,
          createdAt: new Date()
        })

        localStorage.setItem('user', JSON.stringify({ uid: user.uid, role: role.value }))
        router.push(`/${role.value}`)
      } catch (error) {
        console.error('Google sign-up failed:', error)
        alert('Google sign-up error: ' + error.message)
      }
    }

    return {
      email,
      password,
      confirmPassword,
      role,
      handleRegister,
      signUpWithGoogle
    }
  }
}
</script>
