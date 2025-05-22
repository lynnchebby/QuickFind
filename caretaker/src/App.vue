<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

import { type IStaticMethods } from 'preline/preline'
import { useAuthStore } from './stores/auth'
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

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})
</script>

<template>
  <RouterView />
</template>
