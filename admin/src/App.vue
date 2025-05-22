<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'

import { type IStaticMethods } from 'preline/preline'

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

const route = useRoute()

onMounted(() => {
  setTimeout(() => {
    window.HSStaticMethods.autoInit()
  }, 100)
})
</script>

<template>
  <router-view />
</template>
