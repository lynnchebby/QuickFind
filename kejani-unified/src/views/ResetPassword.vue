
<template>
 
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-neutral-900 px-4">
    <div class="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white">Reset Password</h1>
        <p class="text-sm text-neutral-400 mt-2">
          Enter your email to receive a reset link
        </p>
      </div>

      <form @submit.prevent="handleReset" class="space-y-4">
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

        <button
          type="submit"
          class="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Send Reset Link
        </button>
      </form>

      <div class="mt-6 text-sm text-center text-neutral-400">
        <router-link to="/" class="text-blue-500 hover:underline">Back to Sign In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/config'

export default {
  setup() {
    const email = ref('')
    const router = useRouter()

    const handleReset = async () => {
      try {
        await sendPasswordResetEmail(auth, email.value) // ✅ Uses Firebase's default reset page
        alert('✅ Reset link sent! Check your inbox.')
        router.push('/')
      } catch (error) {
        console.error('Reset Error:', error)
        alert('❌ ' + error.message)
      }
    }

    return { email, handleReset }
  }
}
</script>
