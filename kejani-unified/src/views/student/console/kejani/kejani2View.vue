<template>
  <div class="min-h-screen bg-white text-gray-800 dark:text-neutral-200 overflow-hidden relative">
    <!-- Decorative SVGs (optional, for style) -->
    <div class="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 z-0 opacity-20 hidden md:block pointer-events-none">
      <svg class="w-64 h-auto text-blue-200 dark:text-blue-800" fill="none" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="5" stroke-dasharray="10 5" /></svg>
    </div>
    <div class="absolute bottom-0 start-0 translate-y-1/4 -translate-x-1/4 z-0 opacity-20 hidden md:block pointer-events-none">
      <svg class="w-72 h-auto text-purple-200 dark:text-purple-800" fill="none" viewBox="0 0 250 150"><rect x="20" y="20" width="210" height="110" rx="20" ry="20" stroke="currentColor" stroke-width="4" /></svg>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-10">
        <h1 class="text-5xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow-lg">Quick Find</h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-neutral-400">Find student accommodation near your university</p>
      </div>

      <!-- Step 1: Choose University -->
      <div class="mb-6">
        <label for="university-select" class="block mb-2 font-medium text-gray-800 dark:text-neutral-200">Choose University</label>
        <select
          id="university-select"
          v-model="selectedUniversityId"
          @change="selectUniversity(selectedUniversityId)"
          class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
        >
          <option value="">-- Select University --</option>
          <option v-for="uni in universities" :key="uni.id" :value="uni.id">
            {{ uni.name }}
          </option>
        </select>
      </div>

      <!-- Step 2: Choose Location -->
      <div class="mb-6" v-if="locations.length > 0">
        <label for="location-select" class="block mb-2 font-medium text-gray-800 dark:text-neutral-200">Choose Location</label>
        <select
          id="location-select"
          v-model="selectedLocationId"
          @change="selectLocation(selectedLocationId)"
          class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
          :disabled="!selectedUniversityId"
        >
          <option value="">-- Select Location --</option>
          <option v-for="loc in locations" :key="loc.id" :value="loc.id">
            {{ loc.name }}
          </option>
        </select>
      </div>

      <!-- Step 3: Filter by Availability -->
      <div class="flex gap-4 mb-8 justify-center">
        <button
          @click="filterVacancy = 'all'"
          :class="filterVacancy === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'"
          class="py-2 px-4 rounded transition"
        >
          All
        </button>
        <button
          @click="filterVacancy = 'vacant'"
          :class="filterVacancy === 'vacant' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-600'"
          class="py-2 px-4 rounded transition"
        >
          Vacant
        </button>
        <button
          @click="filterVacancy = 'non-vacant'"
          :class="filterVacancy === 'non-vacant' ? 'bg-red-600 text-white' : 'bg-white text-red-600 border border-red-600'"
          class="py-2 px-4 rounded transition"
        >
          Not Vacant
        </button>
      </div>

      <!-- Step 4: Homes Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="hostel in filteredHostels"
          :key="hostel.id"
          class="flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 transition hover:shadow-lg"
        >
          <div class="mb-4">
            <img
              v-if="hostel.imageUrls && hostel.imageUrls.length > 0"
              :src="hostel.imageUrls[0]"
              alt="Hostel Image"
              class="w-full h-48 object-cover rounded-t-xl"
            />
            <div v-else class="h-48 flex items-center justify-center bg-gray-200 rounded-t-xl">
              <span class="text-gray-500">No image</span>
            </div>
          </div>
          <div class="flex-1 flex flex-col p-5">
            <h3 class="text-lg font-bold text-gray-800 dark:text-neutral-200 mb-2">{{ hostel.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-neutral-400 mb-4">
              Self contained apartments with water, wifi and security
            </p>
            <div class="flex flex-col gap-2 mb-2">
              <span class="flex items-center gap-1 text-blue-600 font-semibold">
                {{ hostel.price }} KES
              </span>
              <span class="flex items-center gap-1 text-gray-700 dark:text-neutral-300">
                {{ hostel.hostelType }}
              </span>
              <span class="flex items-center gap-1 text-gray-700 dark:text-neutral-300">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"/></svg>
                {{ hostel.caretakerPhoneNumber || 'No phone' }}
              </span>
            </div>
            <span
              v-if="hostel.isAvailable"
              class="mt-3 inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
            >Vacant</span>
            <span
              v-else
              class="mt-3 inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
            >Not Vacant</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import {
  fetchUniversities,
  fetchLocationsByUniversity,
  fetchHostelsByLocation
} from '@/stores/fireStoreService'

const router = useRouter()

const universities = ref([])
const locations = ref([])
const hostels = ref([])
const searchQuery = ref('')
const selectedUniversityId = ref('')
const selectedLocationId = ref('')
const filterVacancy = ref('all')

// --- Cloudinary Configuration (Only Cloud Name is strictly needed for display) ---
// Your Cloudinary Cloud Name
const CLOUDINARY_CLOUD_NAME = 'dqny92tgm';
// CLOUDINARY_UPLOAD_PRESET is not needed for displaying images
// --- END Cloudinary Configuration ---

// Filter universities by search
const filteredUniversities = computed(() => {
  if (!searchQuery.value) return universities.value
  const query = searchQuery.value.toLowerCase()
  return universities.value.filter(u => u.name.toLowerCase().includes(query))
})

// When a university is selected
const selectUniversity = async (universityId) => {
  selectedUniversityId.value = universityId
  selectedLocationId.value = ''
  locations.value = await fetchLocationsByUniversity(universityId)
  hostels.value = []
}

// When a location is selected
const selectLocation = async (locationId) => {
  selectedLocationId.value = locationId
  if (selectedUniversityId.value && locationId) {
    hostels.value = await fetchHostelsByLocation(selectedUniversityId.value, locationId)
  } else {
    hostels.value = []
  }
}

// Filter hostels by vacancy
const filteredHostels = computed(() => {
  if (filterVacancy.value === 'all') return hostels.value
  if (filterVacancy.value === 'vacant') return hostels.value.filter(h => h.isAvailable)
  if (filterVacancy.value === 'non-vacant') return hostels.value.filter(h => !h.isAvailable)
  return hostels.value
})

// Logout function
const logout = async () => {
  const auth = getAuth()
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
