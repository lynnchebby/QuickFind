<template>
  <!-- ========== MAIN CONTENT ========== -->
  <main
    id="content"
    class="relative max-w-3xl px-4 mt-12 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto size-full before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2"
  >
    <div class="text-center py-8 px-4 sm:px-6 lg:px-8">
      <h1 v-if="user" class="text-2xl text-white sm:text-4xl">Welcome, {{ user.displayName }}!</h1>
      <h1 class="text-2xl text-white sm:text-4xl">Get notified when we launch</h1>
      <h2 class="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
        <span class="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent"
          >EcoSystem</span
        >
      </h2>

      <form>
        <div class="mt-8 space-y-4">
          <div>
            <label for="hs-cover-with-gradient-form-email-1" class="sr-only">Email address</label>
            <div class="relative">
              <input
                type="email"
                id="hs-cover-with-gradient-form-email-1"
                class="py-3 ps-11 pe-4 block w-full bg-white/10 border-white/20 text-white placeholder:text-white rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                placeholder="Email address"
              />
              <div
                class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4"
              >
                <svg
                  class="shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </div>
          </div>

          <div class="grid">
            <button
              type="submit"
              class="sm:p-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:bg-white/20 disabled:opacity-50 disabled:pointer-events-none"
            >
              Join the waitlist
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
  <!-- Icon Blocks -->
  <div class="max-w-[65rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-6">
      <!-- Card -->
      <a
        @click="goToKejani"
        class="group border border-gray-200 rounded-lg dark:border-neutral-700 flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      >
        <svg
          class="shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-neutral-200"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
          />
        </svg>

        <div>
          <div>
            <h3 class="block font-bold text-gray-800 dark:text-white">KEJANI</h3>
            <p class="text-gray-600 dark:text-neutral-400">
              The simplest way to find accomodation around Universities.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200"
          >
            Learn more
            <svg
              class="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->

      <!-- Card -->
      <a
        class="group border border-gray-200 rounded-lg dark:border-neutral-700 flex gap-y-6 size-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href="#"
      >
        <svg
          class="shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-neutral-200"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <path d="M2 7h20" />
          <path
            d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"
          />
        </svg>

        <div>
          <div>
            <h3 class="block font-bold text-gray-800 dark:text-white">SokoMpya</h3>
            <p class="text-gray-600 dark:text-neutral-400">
              Get your goods in front of thousands of potential university students with ease.
            </p>
          </div>

          <p
            class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200"
          >
            Learn more
            <svg
              class="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </p>
        </div>
      </a>
      <!-- End Card -->
    </div>
  </div>
  <!-- End Icon Blocks -->

  <!-- ========== END MAIN CONTENT ========== -->

  <!-- ========== FOOTER ========== -->
  <footer class="absolute bottom-0 inset-x-0 text-center py-5">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm text-white/50">
        © 2024. A product of
        <a
          class="text-white font-medium hover:text-white/80 focus:outline-none focus:text-white/80"
          href="../index.html"
          >EcoSystem</a
        >
      </p>
    </div>
  </footer>
  <!-- ========== END FOOTER ========== -->
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToKejani() {
  router.push('/kejani')
}

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
