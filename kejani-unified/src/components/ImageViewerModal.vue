<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300"
    @click.self="close"
  >
    <div class="relative max-w-4xl max-h-screen p-4">
      <button
        @click="close"
        class="absolute top-4 right-4 text-white text-4xl font-bold p-2 leading-none z-10 opacity-75 hover:opacity-100 transition-opacity duration-200"
      >
        &times;
      </button>
      <img
        :src="imageUrl"
        alt="Enlarged Hostel Image"
        class="max-w-full max-h-[90vh] object-contain mx-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: { // Used for v-model:show
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

// Watch for changes in modelValue (from parent) to update internal state
watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal;
  if (newVal) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  } else {
    document.body.style.overflow = '';
  }
});

// Watch for changes in internal state to emit update to parent
watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal);
});

const close = () => {
  isVisible.value = false;
};

// Handle escape key to close modal
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isVisible.value) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = ''; // Ensure body scroll is re-enabled on component unmount
});
</script>

<style scoped>
/* Basic fade in/out transition for the modal overlay */
.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>