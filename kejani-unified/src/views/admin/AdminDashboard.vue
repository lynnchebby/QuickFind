<template>
  <div class="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-4">
    <!-- Admin Dashboard Heading -->
    <h1 class="text-4xl font-bold mb-10 tracking-tight text-center">
      Admin Dashboard
    </h1>

    <!-- AdminView component -->
    <div class="w-full max-w-6xl">
      <AdminView />
    </div>
    <div>
    <!-- stats -->
    <statsVue />
    <!-- end of stats -->
    <!-- add  -->
    <addVue />
    <!-- end of add -->
  </div>
  </div>
</template>

<script setup>
import statsVue from '@/components/admin/stats.vue'
import addVue from '@/components/admin/add.vue'


</script>

<style scoped>
body {
  margin: 0;
}
</style>
