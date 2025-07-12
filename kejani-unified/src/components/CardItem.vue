<template>
  <div class="flex flex-col h-full text-center bg-white rounded-xl shadow-md p-6 dark:bg-neutral-900">
    <h4 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">{{ title }}</h4>
    
    <div class="mt-2">
      <span class="text-4xl font-bold text-gray-800 dark:text-neutral-200">{{ value }}</span>
    </div>

    <ul class="mt-4 space-y-1 text-sm text-gray-600 dark:text-neutral-400">
      <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
    </ul>

    <div class="mt-6">
      <button
        @click="action"
        class="w-full py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  features: Array,
  buttonText: String,
  action: Function
})
</script>
