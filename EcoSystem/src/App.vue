<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import navigation from './components/navigation.vue'

import { computed, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const user = authStore.user // Access the user state

import { type IStaticMethods } from 'preline/preline'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

onMounted(() => {
  setTimeout(() => {
    window.HSStaticMethods.autoInit()
  }, 100)
})

const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<template>
  <navigation v-if="!isAuthenticated" />
  <router-view />
</template>
