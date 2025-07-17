<template>
  <!-- Add University Button -->
  <button
    type="button"
    class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="hs-vertically-centered-modal"
    data-hs-overlay="#hs-vertically-centered-modal"
  >
    ➕ Add University
  </button>

  <!-- University Modal -->
  <div
    id="hs-vertically-centered-modal"
    class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-vertically-centered-modal-label"
  >
    <div
      class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center"
    >
      <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
        <div class="flex justify-between items-center py-3 px-4 border-b">
          <h3 id="hs-vertically-centered-modal-label" class="font-bold text-gray-800">Add University</h3>
          <button type="button" class="size-8 rounded-full bg-gray-100 hover:bg-gray-200" data-hs-overlay="#hs-vertically-centered-modal">
            ✖
          </button>
        </div>
        <div class="p-4">
          <input v-model="universityId" placeholder="University ID" class="mb-2 p-2 border w-full rounded" />
          <input v-model="universityName" placeholder="University Name" class="p-2 border w-full rounded" />
        </div>
        <div class="flex justify-end gap-x-2 py-3 px-4 border-t">
          <button class="px-3 py-2 border rounded bg-white" data-hs-overlay="#hs-vertically-centered-modal">Cancel</button>
          <button @click="submitUniversity" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Location Button -->
  <button
    type="button"
    class="py-3 px-4 mt-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="hs-vertically-centered-scrollable-modal"
    data-hs-overlay="#hs-vertically-centered-scrollable-modal"
  >
    ➕ Add Location
  </button>

  <!-- Location Modal -->
  <div
    id="hs-vertically-centered-scrollable-modal"
    class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-vertically-centered-scrollable-modal-label"
  >
    <div
      class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] flex items-center"
    >
      <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
        <div class="flex justify-between items-center py-3 px-4 border-b">
          <h3 id="hs-vertically-centered-scrollable-modal-label" class="font-bold text-gray-800">Add Location</h3>
          <button type="button" class="size-8 rounded-full bg-gray-100 hover:bg-gray-200" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
            ✖
          </button>
        </div>
        <div class="p-4">
          <select v-model="selectedUniversityId" class="mb-2 p-2 border w-full rounded">
            <option disabled value="">Select University</option>
            <option v-for="uni in universityStore.universities" :key="uni.id" :value="uni.id">{{ uni.name }}</option>
          </select>
          <input v-model="locationId" placeholder="Location ID" class="mb-2 p-2 border w-full rounded" />
          <input v-model="locationName" placeholder="Location Name" class="p-2 border w-full rounded" />
        </div>
        <div class="flex justify-end gap-x-2 py-3 px-4 border-t">
          <button class="px-3 py-2 border rounded bg-white" data-hs-overlay="#hs-vertically-centered-scrollable-modal">Cancel</button>
          <button @click="addLocation" class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUniversityStore } from '@/stores/additionStore'

const universityStore = useUniversityStore()

const universityId = ref('')
const universityName = ref('')
const selectedUniversityId = ref('')
const locationId = ref('')
const locationName = ref('')

onMounted(() => {
  universityStore.fetchUniversities()
})

const submitUniversity = async () => {
  if (!universityId.value || !universityName.value) return alert('Please fill in all fields.')
  await universityStore.addUniversity(universityId.value, universityName.value)
  universityId.value = ''
  universityName.value = ''
  alert('University added!')
}

const addLocation = async () => {
  if (!selectedUniversityId.value || !locationId.value || !locationName.value) return alert('Please fill in all fields.')
  await universityStore.addLocation(locationId.value, locationName.value, selectedUniversityId.value)
  locationId.value = ''
  locationName.value = ''
  selectedUniversityId.value = ''
  alert('Location added!')
}
</script>
