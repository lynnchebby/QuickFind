<template>
  <div :class="['min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-500 relative overflow-hidden', isDark ? 'bg-gradient-to-br from-black to-neutral-900' : 'bg-gradient-to-br from-blue-50 to-white']">

    <div class="absolute inset-0 z-0 opacity-20">
      <div class="w-full h-full animate-pulse-slow">
        <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-40 h-40 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>

    <button @click="toggleTheme" class="absolute top-6 right-6 text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-700 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out z-10">
      {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>

    <h1 class="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-gray-300 transition-colors duration-500 ease-in-out transform scale-95 opacity-0 animate-fade-in-up z-10">
        Welcome to QuickFind!!!
    </h1>

    <div class="w-full max-w-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-3xl shadow-2xl p-9 transition-all duration-700 ease-out transform scale-95 opacity-0 animate-fade-in-up delay-200 z-10">
      <div class="text-center mb-7">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Sign In</h2>
        <p class="text-md text-gray-600 dark:text-neutral-400">
          Don't have an account?
          <router-link to="/signup" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Sign up here</router-link>
        </p>
      </div>
<button
  @click="signInWithGoogle"
  type="button"
  class="w-full flex items-center justify-center gap-3 py-3 px-5 bg-white dark:bg-white text-gray-800 font-medium rounded-xl shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out border border-gray-200"
>
  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" class="w-5 h-5" />
  Sign in with Google
</button>


      <div class="flex items-center my-7 text-sm text-gray-500 dark:text-neutral-400 before:flex-1 before:border-t before:border-gray-300 dark:before:border-neutral-700 before:mr-4 after:flex-1 after:border-t after:border-gray-300 dark:after:border-neutral-700 after:ml-4">
        or
      </div>

      <form @submit.prevent="handleEmailLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Email address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label for="password" class="text-sm font-medium text-gray-800 dark:text-gray-200">Password</label>
            <router-link to="/reset-password" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</router-link>
          </div>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12"
              required
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 cursor-pointer text-xl" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input type="checkbox" id="remember" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 accent-blue-600" />
          <label for="remember" class="text-sm text-gray-800 dark:text-gray-200">Remember me</label>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
    const isDark = ref(false)

    onMounted(() => {
      isDark.value = localStorage.getItem('theme') === 'dark'
      document.documentElement.classList.toggle('dark', isDark.value)
    })

    function toggleTheme() {
      isDark.value = !isDark.value
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark.value)
    }

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
      signInWithGoogle,
      isDark,
      toggleTheme
    }
  }
}
</script>

<style scoped>
/* Custom animations for the blobs */
@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite cubic-bezier(0.6, 0.2, 0.3, 0.7);
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Keyframe for fade-in-up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in-up.delay-200 {
  animation-delay: 0.2s;
}

/* No need for form-input and form-button classes if using direct Tailwind classes */
/* If you still want to use them for reusability, define them here: */
/* .form-input {
  @apply w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg bg-gray-50 dark:bg-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200;
}

.form-button {
  @apply w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800;
} */
</style>