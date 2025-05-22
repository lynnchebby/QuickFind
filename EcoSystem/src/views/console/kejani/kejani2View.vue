<template>
  <!-- Hero -->
  <div class="relative overflow-hidden">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
      <div class="text-center">
        <h1 class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">KEJANI</h1>

        <p class="mt-3 text-gray-600 dark:text-neutral-400">
          Get accomodation around universities near you
        </p>

        <div class="mt-7 sm:mt-12 mx-auto max-w-xl relative text-gray-600 dark:text-neutral-400">
          <form>
            <div
              class="p-1.5 flex flex-col sm:flex-row items-center gap-2 border border-gray-200 rounded-lg dark:border-neutral-700"
            >
              <div class="relative w-full">
                <label for="hero-input" class="sr-only">Subscribe</label>
                <div
                  class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3"
                ></div>
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="filterUniversities"
                  id="hero-input"
                  name="hero-input"
                  class="py-2 ps-9 pe-3 block w-full border-transparent rounded-lg text-sm focus:border-transparent focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
                  placeholder="Enter your university"
                />
              </div>
              <a
                @click="selectUniversity(university.id)"
                class="w-full sm:w-auto whitespace-nowrap py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200"
                href="#"
              >
                search
                <svg
                  class="shrink-0 size-3.5"
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
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
            <ul class="max-w-xs flex flex-col" v-if="filteredUniversities.length > 0">
              <li
                class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                v-for="university in filteredUniversities"
                :key="university.id"
                @click="selectUniversity(university.id)"
              >
                {{ university.name }}
              </li>
            </ul>
            <p v-else class="mt-2 text-xs text-gray-500 dark:text-neutral-500">
              No universities found
            </p>
          </form>
          <!-- End Input -->

          <!-- SVG Element -->
          <div class="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
            <svg
              class="w-16 h-auto text-orange-500"
              width="121"
              height="135"
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <!-- End SVG Element -->

          <!-- SVG Element -->
          <div class="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
            <svg
              class="w-40 h-auto text-cyan-500"
              width="347"
              height="188"
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                stroke-width="7"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <!-- End SVG Element -->
        </div>

        <div class="mt-5 sm:mt-10">
          <a
            v-for="location in locations"
            :key="location.id"
            @click="selectLocation(location.id)"
            class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href="#"
          >
            {{ location.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- End Hero -->

  <!-- Card Blog -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card -->

      <div
        v-for="hostel in hostels"
        :key="hostel.id"
        class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
      >
        <img
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-full-screen-modal"
          data-hs-overlay="#hs-full-screen-modal"
          v-if="hostel.images && hostel.images.length > 0"
          class="h-60 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl"
          :src="hostel.images[0]"
        />
        <div class="p-4 md:p-6">
          <div class="grid grid-cols-2">
            <div>
              <h3
                class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white"
              >
                {{ hostel.name }}
              </h3>
            </div>
            <!-- vacant -->
            <div class="ml-8">
              <span
                :class="
                  hostel.vacant
                    ? 'py-1 px-1.5 ml-20 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500'
                    : 'py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500'
                "
                class="font-semibold"
              >
                {{ hostel.vacant ? 'Vacant' : 'No Vacant' }}
              </span>
            </div>
            <!-- end of vacant -->
          </div>

          <p class="mt-3 text-gray-500 dark:text-neutral-500">
            Self contained apartments with water, wifi and security
          </p>
        </div>
        <div
          class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700"
        >
          <a
            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            {{ hostel.price }}
          </a>

          <button
            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            {{ hostel.houseType }}
          </button>
        </div>
      </div>
      <!-- modal -->
      <Portal to="body">
        <div
          id="hs-full-screen-modal"
          class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
          role="dialog"
          tabindex="-1"
          aria-labelledby="hs-full-screen-label"
        >
          <div
            class="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full"
          >
            <div
              class="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800"
            >
              <div
                class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700"
              >
                <h3 id="hs-full-screen-label" class="font-bold text-gray-800 dark:text-white">
                  Modal title
                </h3>
                <button
                  type="button"
                  class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                  data-hs-overlay="#hs-full-screen-modal"
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
                <p class="mt-1 text-gray-800 dark:text-neutral-400">
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div
                class="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700"
              >
                <button
                  type="button"
                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-full-screen-modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Portal>

      <!-- End Card -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Card Blog -->

  <!-- Card -->
  <div class="mt-12 text-center">
    <button
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="hs-full-screen-modal"
      data-hs-overlay="#hs-full-screen-modal"
      type="button"
      class="py-3 px-4 inline-flex items-center gap-x-1 text-sm font-medium rounded-full border border-gray-200 bg-white text-blue-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-blue-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
    >
      View more
    </button>
  </div>
  <!-- End Card -->

  <!-- modal -->

  <div
    id="hs-full-screen-modal"
    class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-full-screen-label"
  >
    <div
      class="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 opacity-0 transition-all max-w-full max-h-full h-full"
    >
      <div
        class="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800"
      >
        <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
          <h3 id="hs-full-screen-label" class="font-bold text-gray-800 dark:text-white">
            Modal title
          </h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
            aria-label="Close"
            data-hs-overlay="#hs-full-screen-modal"
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
        <!-- main  -->
        <div class="py-10 w-full max-w-xl mx-auto">
          <!-- Slider -->
          <div
            data-hs-carousel='{
  "loadingClasses": "opacity-0",
  "isInfiniteLoop": true,
  "slidesQty": 1
}'
            class="relative"
          >
            <div class="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
              <div
                class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0"
              >
                <div class="hs-carousel-slide">
                  <div class="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900">
                    <span
                      class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white"
                      >First slide</span
                    >
                  </div>
                </div>
                <div class="hs-carousel-slide">
                  <div class="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800">
                    <span
                      class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white"
                      >Second slide</span
                    >
                  </div>
                </div>
                <div class="hs-carousel-slide">
                  <div class="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700">
                    <span
                      class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white"
                      >Third slide</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
              <span class="text-2xl" aria-hidden="true">
                <svg
                  class="shrink-0 size-5"
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
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </span>
              <span class="sr-only">Previous</span>
            </button>
            <button
              type="button"
              class="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
              <span class="sr-only">Next</span>
              <span class="text-2xl" aria-hidden="true">
                <svg
                  class="shrink-0 size-5"
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
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
            </button>

            <div
              class="hs-carousel-info inline-flex justify-center px-4 absolute bottom-3 start-[50%] -translate-x-[50%] bg-white rounded-lg"
            >
              <span class="hs-carousel-info-current me-1">0</span>
              /
              <span class="hs-carousel-info-total ms-1">3</span>
            </div>
          </div>
          <!-- End Slider -->
        </div>
        <!-- end of main -->
        <div
          class="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700"
        >
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#hs-full-screen-modal"
          >
            Close
          </button>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  fetchUniversities,
  fetchLocationsByUniversity,
  fetchHostelsByLocation
} from '@/stores/fireStoreService'

const universities = ref([])
const filteredUniversities = ref([])
const locations = ref([])
const hostels = ref([])
const selectedUniversityName = ref('')
const selectedLocationName = ref('')
const searchQuery = ref('')
const selectedUniversityId = ref('')

// Load universities on mount
onMounted(async () => {
  universities.value = await fetchUniversities()
})

// Function to handle selecting a university
const selectUniversity = async (universityId) => {
  const university = universities.value.find((u) => u.id === universityId)
  selectedUniversityName.value = university.name
  selectedUniversityId.value = universityId
  locations.value = await fetchLocationsByUniversity(universityId)
  hostels.value = [] // Reset hostels list
}

// Function to handle selecting a location
const selectLocation = async (locationId) => {
  const location = locations.value.find((l) => l.id === locationId)
  selectedLocationName.value = location.name
  hostels.value = await fetchHostelsByLocation(selectedUniversityId.value, locationId)
}

// Function to filter universities based on search input
const filterUniversities = () => {
  if (searchQuery.value === '') {
    filteredUniversities.value = universities.value // Reset to all universities if search is empty
  } else {
    const query = searchQuery.value.toLowerCase()
    filteredUniversities.value = universities.value.filter((university) =>
      university.name.toLowerCase().includes(query)
    )
  }
}
</script>
