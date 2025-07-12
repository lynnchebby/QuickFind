<template>
  <!-- Section Container -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid of Cards -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- University Card -->
      <CardItem
        title="University"
    
        :features="['Add universities', 'Manage records', 'Link locations']"
        buttonText="Add University"
        :action="openUniversityModal"
      />

      <!-- Location Card -->
      <CardItem
        title="Location"
        :features="['Assign to university', 'Manage locations', 'Support mapping']"
        buttonText="Add Location"
        :action="openLocationModal"
      />

      <!-- Hostel Card -->
      <CardItem
        title="Hostel"
        :features="['Assign to location', 'List hostels', 'Manage capacity']"
        buttonText="Add Hostel"
        :action="openHostelModal"
      />
    </div>

    <!-- Modals -->

    <!-- University Modal -->
    <form
      @submit.prevent="submitUniversity"
      id="hs-vertically-centered-modal"
      class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabindex="-1"
    >
      <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <h3 class="font-bold text-gray-800 dark:text-white">Add a new University</h3>
            <button type="button" class="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600" data-hs-overlay="#hs-vertically-centered-modal">
              ✕
            </button>
          </div>
          <div class="p-4 space-y-4">
            <input v-model="universityId" type="text" placeholder="University ID" class="w-full p-2 border rounded dark:bg-neutral-900" />
            <input v-model="universityName" type="text" placeholder="University Name" class="w-full p-2 border rounded dark:bg-neutral-900" />
          </div>
          <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button type="button" class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 dark:bg-neutral-700 dark:text-white" data-hs-overlay="#hs-vertically-centered-modal">Close</button>
            <button type="submit" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
          </div>
        </div>
      </div>
    </form>

    <!-- Location Modal -->
    <div
      id="hs-vertically-centered-scrollable-modal"
      class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabindex="-1"
    >
      <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div class="w-full max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700">
          <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <h3 class="font-bold text-gray-800 dark:text-white">Add new Location</h3>
            <button type="button" class="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
              ✕
            </button>
          </div>
          <div class="p-4 space-y-4">
            <select v-model="selectedUniversityId" class="w-full p-2 border rounded dark:bg-neutral-900">
              <option value="" disabled>Select a university</option>
              <option v-for="university in universityStore.universities" :key="university.id" :value="university.id">
                {{ university.name }}
              </option>
            </select>
            <input v-model="locationId" type="text" placeholder="Location ID" class="w-full p-2 border rounded dark:bg-neutral-900" />
            <input v-model="locationName" type="text" placeholder="Location Name" class="w-full p-2 border rounded dark:bg-neutral-900" />
          </div>
          <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button type="button" class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 dark:bg-neutral-700 dark:text-white" data-hs-overlay="#hs-vertically-centered-scrollable-modal">Close</button>
            <button @click="addLocation" type="button" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CardItem from '@/components/CardItem.vue' // ✅ Make sure this is declared only once
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

const openUniversityModal = () => {
  document.querySelector('[data-hs-overlay="#hs-vertically-centered-modal"]')?.click()
}
const openLocationModal = () => {
  document.querySelector('[data-hs-overlay="#hs-vertically-centered-scrollable-modal"]')?.click()
}
const openHostelModal = () => {
  alert('Add Hostel functionality coming soon!')
}
</script>
