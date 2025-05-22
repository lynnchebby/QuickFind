<template>
  <!-- Pricing -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div
      class="relative before:absolute before:inset-0 before:-z-[1] before:bg-[radial-gradient(closest-side,theme(colors.gray.300),transparent)] dark:before:bg-[radial-gradient(closest-side,theme(colors.neutral.600),transparent)] mt-12"
    >
      <div class="grid gap-px sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
        <!-- Card -->
        <div class="flex flex-col h-full text-center">
          <div class="bg-white pt-8 pb-5 px-8 dark:bg-neutral-900">
            <h4 class="font-medium text-lg text-gray-800 dark:text-neutral-200">University</h4>
          </div>

          <div class="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-neutral-900">
            <span class="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">
              University
            </span>
          </div>

          <div class="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-neutral-900">
            <ul class="space-y-2.5 text-center text-sm">
              <li class="text-gray-800 dark:text-neutral-400">1 user</li>

              <li class="text-gray-800 dark:text-neutral-400">Plan features</li>

              <li class="text-gray-800 dark:text-neutral-400">Product support</li>
            </ul>
          </div>
          <div class="bg-white py-8 px-8 dark:bg-neutral-900">
            <button
              type="button"
              class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-vertically-centered-modal"
              data-hs-overlay="#hs-vertically-centered-modal"
            >
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add University
            </button>

            <form
              @submit.prevent="submitUniversity"
              id="hs-vertically-centered-modal"
              class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
              role="dialog"
              tabindex="-1"
              aria-labelledby="hs-vertically-centered-modal-label"
            >
              <div
                class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center"
              >
                <div
                  class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
                >
                  <div
                    class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700"
                  >
                    <h3
                      id="hs-vertically-centered-modal-label"
                      class="font-bold text-gray-800 dark:text-white"
                    >
                      Add a new University
                    </h3>
                    <button
                      type="button"
                      class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                      aria-label="Close"
                      data-hs-overlay="#hs-vertically-centered-modal"
                    >
                      <span class="sr-only">Close</span>
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
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="p-4 overflow-y-auto">
                    <label for="input-label" class="block text-sm font-medium mb-2 dark:text-white"
                      >University</label
                    >
                    <input
                      v-model="universityId"
                      type="text"
                      id="input-label"
                      class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
                      placeholder="university ID"
                      autofocus=""
                    />
                    <input
                      v-model="universityName"
                      type="text"
                      id="input-label"
                      class="py-3 px-4 block w-full mt-3 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
                      placeholder="university name"
                      autofocus=""
                    />
                  </div>
                  <div
                    class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700"
                  >
                    <button
                      type="button"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-focus-management-modal"
                    >
                      Close
                    </button>
                    <button
                      type=""
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col h-full text-center">
          <div class="bg-white pt-8 pb-5 px-8 dark:bg-neutral-900">
            <h4 class="font-medium text-lg text-gray-800 dark:text-neutral-200">location</h4>
          </div>

          <div class="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-neutral-900">
            <span class="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">
              location
            </span>
          </div>

          <div class="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-neutral-900">
            <ul class="space-y-2.5 text-center text-sm">
              <li class="text-gray-800 dark:text-neutral-400">2 users</li>

              <li class="text-gray-800 dark:text-neutral-400">Plan features</li>

              <li class="text-gray-800 dark:text-neutral-400">Product support</li>
            </ul>
          </div>

          <div class="bg-white py-8 px-8 dark:bg-neutral-900">
            <button
              type="button"
              class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-vertically-centered-scrollable-modal"
              data-hs-overlay="#hs-vertically-centered-scrollable-modal"
            >
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add Location
            </button>

            <div
              id="hs-vertically-centered-scrollable-modal"
              class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
              role="dialog"
              tabindex="-1"
              aria-labelledby="hs-vertically-centered-scrollable-modal-label"
            >
              <div
                class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center"
              >
                <div
                  class="w-full max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
                >
                  <div
                    class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700"
                  >
                    <h3
                      id="hs-vertically-centered-scrollable-modal-label"
                      class="font-bold text-gray-800 dark:text-white"
                    >
                      Add new Location
                    </h3>
                    <button
                      type="button"
                      class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                      aria-label="Close"
                      data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                    >
                      <span class="sr-only">Close</span>
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
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="p-4 overflow-y-auto">
                    <div class="space-y-4">
                      <label
                        for="input-label"
                        class="block text-sm font-medium mb-2 dark:text-white"
                        >Location</label
                      >
                      <!-- Hire Us -->
                      <form class="space-y-4">
                        <div>
                          <select
                            v-model="selectedUniversityId"
                            id="university"
                            class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="" disabled>Select a university</option>
                            <option
                              v-for="university in universityStore.universities"
                              :key="university.id"
                              :value="university.id"
                            >
                              {{ university.name }}
                              <!-- Display university name -->
                            </option>
                          </select>
                        </div>

                        <input
                          v-model="locationId"
                          id="locationId"
                          type="text"
                          class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
                          placeholder="Location Id"
                          autofocus=""
                        />
                        <input
                          v-model="locationName"
                          id="locationName"
                          type="text"
                          class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
                          placeholder="Location Name"
                          autofocus=""
                        />
                      </form>
                      <!-- End Hire Us -->
                    </div>
                  </div>
                  <div
                    class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700"
                  >
                    <button
                      type="button"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                    >
                      Close
                    </button>
                    <button
                      @click="addLocation"
                      type="button"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Submit
                    </button>
                    <!-- Error Message -->
                    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col h-full text-center">
          <div class="bg-white pt-8 pb-5 px-8 dark:bg-neutral-900">
            <h4 class="font-medium text-lg text-gray-800 dark:text-neutral-200">Hostel</h4>
          </div>

          <div class="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-neutral-900">
            <span class="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">
              Hostel
            </span>
          </div>

          <div class="bg-white flex justify-center lg:mt-px pt-7 px-8 dark:bg-neutral-900">
            <ul class="space-y-2.5 text-center text-sm">
              <li class="text-gray-800 dark:text-neutral-400">5 users</li>

              <li class="text-gray-800 dark:text-neutral-400">Plan features</li>

              <li class="text-gray-800 dark:text-neutral-400">Product support</li>
            </ul>
          </div>

          <div class="bg-white py-8 px-8 dark:bg-neutral-900">
            <a
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add
            </a>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->

        <!-- End Card -->
      </div>
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Pricing -->
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
const errorMessage = ref('')

const submitUniversity = async () => {
  console.log('Form Submitted with ID:', universityId.value, 'Name:', universityName.value) // Debugging

  if (!universityId.value || !universityName.value) {
    errorMessage.value = 'All fields are required'
    return
  }

  try {
    // Add university and create an initial document in the 'locations' subcollection
    await universityStore.addUniversity(universityId.value, universityName.value)
    errorMessage.value = 'University and location created successfully!'

    // Reset fields
    universityId.value = ''
    universityName.value = ''
  } catch (error) {
    errorMessage.value = 'Error: ' + error.message
  }
}

// Fetch the universities when the component is mounted

onMounted(async () => {
  await universityStore.fetchUniversities()
  console.log('Fetched Universities UI:', universityStore.universities)
})

// Function to add the location
const addLocation = async () => {
  if (selectedUniversityId.value && locationId.value && locationName.value) {
    try {
      await universityStore.addLocation(
        locationId.value,
        locationName.value,
        selectedUniversityId.value
      )
      // Optionally reset form fields
      selectedUniversityId.value = ''
      locationId.value = ''
      locationName.value = ''

      alert('Location added successfully!')
    } catch (error) {
      console.error('Error adding location:', error)
      alert('Failed to add location.')
    }
  } else {
    alert('Please fill in all fields.')
  }
}
</script>
