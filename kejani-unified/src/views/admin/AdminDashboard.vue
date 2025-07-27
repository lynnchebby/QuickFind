<template>
  <div class="min-h-screen bg-white text-gray-800 dark:text-neutral-200 overflow-hidden relative">
    <!-- Decorative SVG Background Elements -->
    <div class="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 z-0 opacity-30 animate-float-1 hidden md:block">
      <svg class="w-64 h-auto text-blue-200 dark:text-blue-800" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="5" stroke-dasharray="10 5" />
        <path d="M50 100 L150 100 M100 50 L100 150" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
    </div>
    <div class="absolute bottom-0 start-0 translate-y-1/4 -translate-x-1/4 z-0 opacity-30 animate-float-2 hidden md:block">
      <svg class="w-72 h-auto text-purple-200 dark:text-purple-800" fill="none" viewBox="0 0 250 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="210" height="110" rx="20" ry="20" stroke="currentColor" stroke-width="4" />
        <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.7" />
        <circle cx="200" cy="100" r="10" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 z-0 opacity-20 animate-float-3 hidden md:block">
      <svg class="w-48 h-auto text-green-200 dark:text-green-800" fill="none" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <polygon points="75,10 140,140 10,140" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
        <line x1="75" y1="10" x2="75" y2="140" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <div class="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 mx-auto relative z-10">
      <div class="mx-auto max-w-3xl mb-8 lg:mb-12 text-center pt-4 md:pt-6">
        <h1 class="text-6xl sm:text-8xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow-lg animate-fade-in-down">
          Admin Dashboard
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-neutral-400 animate-fade-in-up">
          Manage all universities, locations and homes.
        </p>
      </div>

      <!-- Global Loading and Error Messages -->
      <div v-if="isLoading" class="text-center text-blue-600 dark:text-blue-400 my-8 py-4 px-6 bg-blue-50 dark:bg-neutral-900 rounded-lg shadow-md border border-blue-200 dark:border-blue-700">
        <div class="flex items-center justify-center space-x-2">
          <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading data...</p>
        </div>
      </div>

      <!-- Unified Message Display -->
      <div v-if="showMessage" :class="{
        'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700': messageType === 'success',
        'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700': messageType === 'error'
      }" class="text-center my-8 py-4 px-6 rounded-lg shadow-md border">
        {{ messageText }}
      </div>

      <div class="bg-blue-50 dark:bg-neutral-900 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-100 dark:border-neutral-800">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardItem
            v-for="(card, index) in statsCards"
            :key="index"
            :title="card.title"
            :value="card.value"
            :icon="card.icon"
            class="p-6 relative bg-white border border-gray-200 rounded-xl shadow-md dark:bg-neutral-900 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          />
        </div>

        <hr class="my-8 border-gray-200 dark:border-neutral-700" />

        <!-- Manage Universities Section -->
        <div class="bg-white rounded-xl shadow-lg dark:bg-neutral-900 p-7 sm:p-10 border border-gray-200 dark:border-neutral-800 mb-8 animate-fade-in-down">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-4 sm:mb-0">Manage Universities</h2>
            <button
              @click="toggleUniversityView"
              :class="{
                'bg-blue-600 text-white shadow-md': showUniversityView,
                'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !showUniversityView
              }"
              class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto"
            >
              {{ showUniversityView ? 'Hide Universities' : 'View Universities' }}
            </button>
          </div>

          <div v-if="showUniversityView">
            <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <label for="university-select" class="font-medium text-gray-800 dark:text-neutral-200 w-full sm:w-auto text-sm sm:text-base">Choose a University:</label>
              <select
                id="university-select"
                v-model="selectedUniversityId"
                @change="selectUniversity(selectedUniversityId)"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
              >
                <option value="">-- Select University --</option>
                <option
                  v-for="university in universityStore.universities"
                  :key="university.id"
                  :value="university.id"
                >
                  {{ university.name }}
                </option>
              </select>
              <!-- Changed @click to openAddUniversityModal -->
              <button
                @click="openAddUniversityModal"
                class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto bg-blue-600 text-white shadow-md"
              >
                Add New
              </button>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200 mb-4">All Universities:</h3>
              <ul class="space-y-3">
                <li v-for="uni in universityStore.universities" :key="uni.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-neutral-700">
                  <span class="text-gray-800 dark:text-neutral-300 font-medium mb-2 sm:mb-0">{{ uni.name }}</span>
                  <div class="flex space-x-2">
                    <!-- Changed @click to pass the whole object -->
                    <button @click="editUniversity(uni)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Edit University">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <!-- Changed @click to use confirmAction -->
                    <button @click="deleteUniversity(uni.id, uni.name)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Delete University">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z" clip-rule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </li>
                <li v-if="universityStore.universities.length === 0" class="text-gray-500 dark:text-neutral-500 p-3 bg-gray-50 dark:bg-neutral-800 rounded-md border border-gray-200 dark:border-neutral-700">No universities found.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-neutral-700" />

        <!-- Manage Locations Section -->
        <div class="bg-white rounded-xl shadow-lg dark:bg-neutral-900 p-7 sm:p-10 border border-gray-200 dark:border-neutral-800 mb-8 animate-fade-in-down">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-4 sm:mb-0">Manage Locations</h2>
            <button
              @click="toggleLocationView"
              :class="{
                'bg-blue-600 text-white shadow-md': showLocationView && selectedUniversityId,
                'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !(showLocationView && selectedUniversityId)
              }"
              class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto"
              :disabled="!selectedUniversityId"
            >
              {{ showLocationView ? 'Hide Locations' : 'View Locations' }}
            </button>
          </div>

          <p v-if="!selectedUniversityId && showLocationView" class="text-red-600 dark:text-red-400 mb-4 text-sm bg-red-100 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-700">
            Please select a university first to manage locations.
          </p>

          <div v-if="showLocationView && selectedUniversityId">
            <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <label for="location-select" class="font-medium text-gray-800 dark:text-neutral-200 w-full sm:w-auto text-sm sm:text-base">Choose a Location:</label>
              <select
                id="location-select"
                v-model="locationId"
                @change="selectLocation(locationId)"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
              >
                <option value="">-- Select Location --</option>
                <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                  {{ loc.name }}
                </option>
              </select>
              <!-- Changed @click to openAddLocationModal -->
              <button
                @click="openAddLocationModal"
                class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto bg-blue-600 text-white shadow-md"
              >
                Add New
              </button>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200 mb-4">Locations for {{ getUniversityName(selectedUniversityId) }}:</h3>
              <ul class="space-y-3">
                <li v-for="loc in locations" :key="loc.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-border-neutral-700">
                  <span class="text-gray-800 dark:text-neutral-300 font-medium mb-2 sm:mb-0">{{ loc.name }}</span>
                  <div class="flex space-x-2">
                    <!-- Changed @click to pass the whole object -->
                    <button @click="editLocation(loc)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Edit Location">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <!-- Changed @click to use confirmAction -->
                    <button @click="deleteLocation(loc.id, loc.name)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Delete Location">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z" clip-rule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </li>
                <li v-if="locations.length === 0" class="text-gray-500 dark:text-neutral-500 p-3 bg-gray-50 dark:bg-neutral-800 rounded-md border border-gray-200 dark:border-neutral-700">No locations found for this university.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-neutral-700" />

        <!-- Manage Homes Section -->
        <div class="bg-white rounded-xl shadow-lg dark:bg-neutral-900 p-7 sm:p-10 border border-gray-200 dark:border-neutral-800 mb-8 animate-fade-in-down">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-4 sm:mb-0">Manage Homes</h2>
            <button
              @click="toggleHomesView"
              :class="{
                'bg-blue-600 text-white shadow-md': showHomesView && selectedUniversityId && locationId,
                'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !(showHomesView && selectedUniversityId && locationId)
              }"
              class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto"
              :disabled="!selectedUniversityId || !locationId"
            >
              {{ showHomesView ? 'Hide Homes' : 'View Homes' }}
            </button>
          </div>

          <p v-if="(!selectedUniversityId || !locationId) && showHomesView" class="text-red-600 dark:text-red-400 mb-4 text-sm bg-red-100 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-700">
            Please select a university and a location first to manage homes.
          </p>

          <div v-if="showHomesView && selectedUniversityId && locationId">
            <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <label for="home-select" class="font-medium text-gray-800 dark:text-neutral-200 w-full sm:w-auto text-sm sm:text-base">Choose a Home:</label>
              <select
                id="home-select"
                v-model="selectedHomeId"
                @change="selectHome(selectedHomeId)"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
              >
                <option value="">-- Select Home --</option>
                <option v-for="home in homes" :key="home.id" :value="home.id">
                  {{ home.name || 'Unnamed Home' }}
                </option>
              </select>
              <!-- Changed @click to openAddHomeModal -->
              <button
                @click="openAddHomeModal"
                class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto bg-blue-600 text-white shadow-md"
              >
                Add New
              </button>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200 mb-4">Homes for {{ getUniversityName(selectedUniversityId) }} - {{ getLocationName(locationId) }}:</h3>
              <ul class="space-y-3">
                <li v-for="home in homes" :key="home.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-neutral-700">
                  <span class="text-gray-800 dark:text-neutral-300 font-medium mb-2 sm:mb-0">{{ home.name || 'Unnamed Home' }}</span>
                  <div class="flex space-x-2">
                    <!-- Changed @click to pass the whole object -->
                    <button @click="editHome(home)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Edit Home">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <!-- Changed @click to use confirmAction -->
                    <button @click="deleteHome(home.id, home.name)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Delete Home">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z" clip-rule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </li>
                <li v-if="homes.length === 0" class="text-gray-500 dark:text-neutral-500 p-3 bg-gray-50 dark:bg-neutral-800 rounded-md border border-gray-200 dark:border-neutral-700">No homes found for this location.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-neutral-700" />

        <div class="text-center mb-8">
          <button @click="downloadData" class="py-2.5 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200">
            Download All Data
          </button>
        </div>
      </div>
    </div>

    <!-- Modals (Add/Edit/Confirm) -->

    <!-- Add University Modal -->
    <div v-if="showAddUniversityModal" class="fixed inset-0 z-[100] overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-200 mb-4">Add New University</h3>
        <div class="space-y-4">
          <div>
            <label for="newUniversityName" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">University Name</label>
            <input type="text" id="newUniversityName" v-model="newUniversityName"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
                   placeholder="e.g., University of Nairobi">
          </div>
        </div>
        <div class="flex justify-end gap-x-2 mt-6">
          <button type="button" @click="showAddUniversityModal = false"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
            Cancel
          </button>
          <button type="button" @click="submitAddUniversity"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Add University
          </button>
        </div>
      </div>
    </div>

    <!-- Edit University Modal -->
    <div v-if="showEditUniversityModal" class="fixed inset-0 z-[100] overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-200 mb-4">Edit University</h3>
        <div class="space-y-4">
          <div>
            <label for="editUniversityName" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">University Name</label>
            <input type="text" id="editUniversityName" v-model="editingUniversity.name"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
                   placeholder="University Name">
          </div>
        </div>
        <div class="flex justify-end gap-x-2 mt-6">
          <button type="button" @click="showEditUniversityModal = false"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
            Cancel
          </button>
          <button type="button" @click="submitEditUniversity"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Add Location Modal -->
    <div v-if="showAddLocationModal" class="fixed inset-0 z-[100] overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-200 mb-4">Add New Location</h3>
        <div class="space-y-4">
          <div>
            <label for="addLocationUniversitySelect" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Select University</label>
            <select id="addLocationUniversitySelect" v-model="selectedUniversityId"
                    class="py-2 px-3 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300">
              <option value="">-- Select University --</option>
              <option v-for="uni in universityStore.universities" :key="uni.id" :value="uni.id">
                {{ uni.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="newLocationName" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Location Name</label>
            <input type="text" id="newLocationName" v-model="newLocationName"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
                   placeholder="e.g., Main Campus, Kileleshwa">
          </div>
          <div>
            <label for="newLocationId" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Location ID (e.g., main-campus)</label>
            <input type="text" id="newLocationId" v-model="newLocationId"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
                   placeholder="e.g., main-campus">
          </div>
        </div>
        <div class="flex justify-end gap-x-2 mt-6">
          <button type="button" @click="showAddLocationModal = false"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
            Cancel
          </button>
          <button type="button" @click="submitAddLocation"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Add Location
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Location Modal -->
    <div v-if="showEditLocationModal" class="fixed inset-0 z-[100] overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-200 mb-4">Edit Location</h3>
        <div class="space-y-4">
          <div>
            <label for="editLocationName" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">Location Name</label>
            <input type="text" id="editLocationName" v-model="editingLocation.name"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
                   placeholder="Location Name">
          </div>
        </div>
        <div class="flex justify-end gap-x-2 mt-6">
          <button type="button" @click="showEditLocationModal = false"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
            Cancel
          </button>
          <button type="button" @click="submitEditLocation"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Save Changes
          </button>
        </div>
      </div>
    </div>

   

   <!-- Edit Home Modal - Compact Version -->
<div v-if="showEditHomeModal" class="fixed inset-0 z-[100] overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-2">
  <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-xs p-4 animate-scale-in">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-3">Edit Home</h3>
    
    <div class="space-y-2">
      <!-- Compact Form Fields -->
      <div v-for="field in [
        {id: 'editHomeName', label: 'Name', model: editingHome.name, type: 'text'},
        {id: 'editHomeRooms', label: 'Rooms', model: editingHome.rooms, type: 'number'},
        {id: 'editHomePhone', label: 'Phone', model: editingHome.caretakerPhoneNumber, type: 'text'},
        {id: 'editHomeRent', label: 'Rent', model: editingHome.price, type: 'number'},
        {id: 'editHomeDeposit', label: 'Deposit', model: editingHome.deposit, type: 'number'}
      ]" :key="field.id">
        <label :for="field.id" class="block text-xs font-medium text-gray-700 dark:text-neutral-300 mb-1">{{ field.label }}</label>
        <input :type="field.type" :id="field.id" v-model="field.model"
               class="py-1 px-2 text-xs block w-full border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300">
      </div>

      <!-- Type and Availability -->
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label for="editHomeType" class="block text-xs font-medium text-gray-700 dark:text-neutral-300 mb-1">Type</label>
          <select id="editHomeType" v-model="editingHome.hostelType"
                  class="py-1 px-2 text-xs block w-full border border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300">
            <option v-for="type in ['Bedsitter','One Bedroom','Shared Room','Two Bedroom']" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="flex items-end">
          <input type="checkbox" id="editHomeAvailability" v-model="editingHome.isAvailable"
                 class="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600">
          <label for="editHomeAvailability" class="ml-1 text-xs text-gray-700 dark:text-neutral-300">Available</label>
        </div>
      </div>

      <!-- Images Section -->
      <div class="mt-2">
        <label class="block text-xs font-medium text-gray-700 dark:text-neutral-300 mb-1">Images</label>
        <div v-if="editingHome.imageUrls?.length" class="flex flex-wrap gap-1 mb-1">
          <div v-for="(url, index) in editingHome.imageUrls" :key="index" class="relative">
            <img :src="url" class="w-12 h-12 object-cover rounded border border-gray-300 cursor-pointer" @click="openImageViewer(url)">
          </div>
        </div>
        
        <div class="flex flex-wrap gap-1 mb-1">
          <div v-for="(file, index) in newImageFilesForEdit" :key="index" class="relative">
            <img :src="URL.createObjectURL(file)" class="w-12 h-12 object-cover rounded border border-gray-300">
            <button @click="newImageFilesForEdit.splice(index, 1)" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 text-[8px]">
              ×
            </button>
          </div>
        </div>
        
        <label for="edit-dropzone-file" class="flex items-center justify-center w-full h-16 border border-dashed border-gray-300 rounded cursor-pointer bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600">
          <span class="text-[10px] text-gray-500 dark:text-neutral-400 text-center px-2">
            Click to upload new images
          </span>
          <input id="edit-dropzone-file" type="file" class="hidden" multiple @change="event => newImageFilesForEdit = Array.from(event.target.files)" accept="image/*">
        </label>
      </div>
    </div>

    <!-- Compact Action Buttons -->
    <div class="flex justify-end gap-x-2 mt-3">
      <button @click="showEditHomeModal = false"
              class="py-1 px-3 text-xs font-medium rounded border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300">
        Cancel
      </button>
      <button @click="submitEditHome"
              class="py-1 px-3 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700">
        Save
      </button>
    </div>
  </div>
</div>

    <!-- Confirmation Modal (for delete actions) -->
    <div v-if="showConfirmationModal" class="fixed inset-0 z-[100] overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-sm p-6 animate-scale-in">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-200 mb-4">Confirm Action</h3>
        <p class="text-gray-700 dark:text-neutral-300 mb-6">{{ confirmationMessage }}</p>
        <div class="flex justify-end gap-x-2">
          <button type="button" @click="cancelConfirmedAction"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600">
            Cancel
          </button>
          <button type="button" @click="executeConfirmedAction"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Image Viewer Modal (ensure this component is imported and available) -->
    <ImageViewerModal :show="showImageViewer" :image-url="currentImageUrl" @close="showImageViewer = false" />

  </div>
</template>


<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useUniversityStore } from '../../stores/universityStore';
import { useCaretakerStore } from '../../stores/caretakerStore';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

// Components
import CardItem from '@/components/CardItem.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import ImageViewerModal from '@/components/ImageViewerModal.vue';

// Instantiate Pinia Stores
const authStore = useAuthStore();
const universityStore = useUniversityStore();
const caretakerStore = useCaretakerStore();
const router = useRouter();

// User state
const user = computed(() => authStore.user);

// Loading and Error States
const isLoading = ref(false);
const error = ref(null);

// UI Messages
const showMessage = ref(false);
const messageText = ref('');
const messageType = ref('success');

// Confirmation Modal State
const showConfirmationModal = ref(false);
const confirmationMessage = ref('');
const confirmationAction = ref(null);
const confirmationPayload = ref(null);

// Reactive state for UI views
const showUniversityView = ref(false);
const showLocationView = ref(false);
const showHomesView = ref(false);

// Selected IDs for navigation
const selectedUniversityId = ref('');
const locationId = ref(''); // Keep as locationId to match template for now
const selectedHomeId = ref('');

// Data arrays
const locations = ref([]);
const homes = ref([]);

// State for Add University Modal
const showAddUniversityModal = ref(false);
const newUniversityName = ref('');

// State for Add Location Modal
const showAddLocationModal = ref(false);
const newLocationName = ref('');
const newLocationId = ref('');

// State for Add Home Modal
const showAddHomeModal = ref(false);
const newHomeName = ref('');
const newHomeAddress = ref('');
const newHomeRooms = ref(0);
const newHomeCaretakerPhoneNumber = ref('');
const newHomeRent = ref(null);
const newHomeDeposit = ref(null);
const newHomeType = ref('');
const newHomeImageFiles = ref([]);

// Caretaker selection for adding homes
const caretakersList = computed(() => caretakerStore.allCaretakers);
const selectedCaretakerForHome = ref('');

// State for Editing Modals
const showEditUniversityModal = ref(false);
const editingUniversity = reactive({ id: '', name: '' });

const showEditLocationModal = ref(false);
const editingLocation = reactive({ id: '', name: '', universityId: '' });

const showEditHomeModal = ref(false);
const editingHome = reactive({
  id: '',
  name: '',
  universityId: '',
  locationId: '',
  caretakerPhoneNumber: '',
  price: null,
  deposit: null,
  hostelType: '',
  imageUrls: [],
  isAvailable: false,
  caretakerUid: ''
});
const newImageFilesForEdit = ref([]); // Corrected variable name for edit images

// Search functionality
const searchQuery = ref('');

// Stats
const stats = ref({
  totalUniversities: 0,
  totalLocations: 0,
  totalHomes: 0,
  sessions: 0,
  clickRate: 0,
  pageviews: 0
});

const filteredUniversities = computed(() => {
  if (!searchQuery.value) return universityStore.universities;
  return universityStore.universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const statsCards = computed(() => [
  {
    title: 'Total Universities',
    value: stats.value.totalUniversities.toLocaleString(),
    icon: { template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 2 0 0 0-3-3.87"/><path d="M16 3.13a4 2 0 0 1 0 7.75"/></svg>' }
  },
  {
    title: 'Total Locations',
    value: stats.value.totalLocations.toLocaleString(),
    icon: { template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 0 0 0 .586 1.414L12 12l4.414-4.414A2 0 0 0 17 6.172V2"/></svg>' }
  },
  {
    title: 'Total Homes',
    value: stats.value.totalHomes.toLocaleString(),
    icon: { template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 11V5a2 0 0 0-2-2H5a2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="m12 12 4 10 1.7-4.3L22 16Z"/></svg>' }
  },
  {
    title: 'Pageviews',
    value: stats.value.pageviews.toLocaleString(),
    icon: { template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"/><path d="M12 13a1 1 0 1 0 0-2 1 0 0 0 0 2z"/><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><path d="M21 7V5a2 0 0 0-2-2H5a2 0 0 0-2 2v2"/></svg>' }
  }
]);

// --- Message Display Functions ---
const displayMessage = (text, type = 'success') => {
  messageText.value = text;
  messageType.value = type;
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
    messageText.value = '';
  }, 3000);
};

// --- Custom Confirmation Modal Functions ---
const confirmAction = (message, action, payload = null) => {
  confirmationMessage.value = message;
  confirmationAction.value = action;
  confirmationPayload.value = payload;
  showConfirmationModal.value = true;
};

const executeConfirmedAction = async () => {
  if (confirmationAction.value) {
    try {
      await confirmationAction.value(confirmationPayload.value);
      displayMessage('Operation completed successfully!', 'success');
    } catch (err) {
      console.error("Confirmation action failed:", err);
      displayMessage(`Operation failed: ${err.message || 'An unknown error occurred.'}`, 'error');
    }
  }
  showConfirmationModal.value = false;
  confirmationAction.value = null;
  confirmationPayload.value = null;
  confirmationMessage.value = '';
};

const cancelConfirmedAction = () => {
  showConfirmationModal.value = false;
  confirmationAction.value = null;
  confirmationPayload.value = null;
  confirmationMessage.value = '';
};

// --- Helper Functions for Names ---
const getUniversityName = (id) => {
  const university = universityStore.universities.find((u) => u.id === id);
  return university?.name || 'Unknown University';
};
const getLocationName = (id) => {
  const location = locations.value.find((l) => l.id === id);
  return location?.name || 'Unknown Location';
};
const getHomeName = (id) => {
  const home = homes.value.find((h) => h.id === id);
  return home?.name || 'Unnamed Home';
};

// --- University Management ---
const openAddUniversityModal = () => {
  newUniversityName.value = '';
  showAddUniversityModal.value = true;
  error.value = null;
};

const submitAddUniversity = async () => {
  const trimmed = newUniversityName.value.trim();
  if (!trimmed) {
    displayMessage('University name cannot be empty.', 'error');
    return;
  }

  const newId = trimmed.replace(/\s+/g, '-').toLowerCase();

  try {
    await universityStore.addUniversity(newId, trimmed);
    displayMessage('University added successfully!', 'success');
    showAddUniversityModal.value = false;
    await universityStore.fetchUniversities();
    await fetchStats();
  } catch (err) {
    console.error("Error adding university:", err);
    displayMessage(`Error adding university: ${err.message}`, 'error');
  }
};

// FIX: Updated editUniversity to open modal and populate editing object
const editUniversity = (university) => {
  editingUniversity.id = university.id;
  editingUniversity.name = university.name;
  showEditUniversityModal.value = true;
  error.value = null;
};

// FIX: Added submitEditUniversity function
const submitEditUniversity = async () => {
  if (!editingUniversity.name) {
    displayMessage('University name cannot be empty.', 'error');
    return;
  }
  try {
    await universityStore.updateUniversity(editingUniversity.id, { name: editingUniversity.name.trim() });
    displayMessage('University updated successfully!', 'success');
    showEditUniversityModal.value = false;
    await universityStore.fetchUniversities(); // Re-fetch to update UI
    await fetchStats();
  } catch (err) {
    console.error("Error updating university:", err);
    displayMessage(`Error updating university: ${err.message}`, 'error');
  }
};

const deleteUniversity = async (universityId, universityName) => {
  confirmAction(`Are you sure you want to delete the university "${universityName}"? This will also delete all its locations and homes. This action cannot be undone.`, async () => {
    try {
      await universityStore.deleteUniversity(universityId);
      displayMessage('University deleted successfully!', 'success');
      await universityStore.fetchUniversities();
      await fetchStats();
      selectedUniversityId.value = '';
      locationId.value = '';
      selectedHomeId.value = '';
      locations.value = [];
      homes.value = [];
    } catch (err) {
      console.error("Error deleting university:", err);
      displayMessage(`Error deleting university: ${err.message}`, 'error');
    }
  });
};

// --- Location Management ---
const openAddLocationModal = () => {
  newLocationName.value = '';
  newLocationId.value = '';
  showAddLocationModal.value = true;
  error.value = null;
};

const submitAddLocation = async () => {
  const trimmedName = newLocationName.value.trim();
  if (!trimmedName || !newLocationId.value || !selectedUniversityId.value) {
    displayMessage('Please fill in all location details and select a university.', 'error');
    return;
  }

  try {
    await universityStore.addLocation(newLocationId.value.trim(), trimmedName, selectedUniversityId.value);
    displayMessage('Location added successfully!', 'success');
    showAddLocationModal.value = false;
    await fetchLocations(selectedUniversityId.value);
    await universityStore.fetchAllLocations();
    await fetchStats();
  } catch (err) {
    console.error("Error adding location:", err);
    displayMessage(`Error adding location: ${err.message}`, 'error');
  }
};

const fetchLocations = async (universityId) => {
  if (!universityId) {
    locations.value = [];
    return;
  }
  isLoading.value = true;
  error.value = null;
  try {
    locations.value = await universityStore.getLocations(universityId);
  } catch (err) {
    error.value = `Error fetching locations: ${err.message}`;
    displayMessage(`Error fetching locations: ${err.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
};

// FIX: Updated editLocation to open modal and populate editing object
const editLocation = (location) => {
  editingLocation.id = location.id;
  editingLocation.name = location.name;
  editingLocation.universityId = selectedUniversityId.value; // Ensure universityId is set
  showEditLocationModal.value = true;
  error.value = null;
};

// FIX: Added submitEditLocation function
const submitEditLocation = async () => {
  if (!editingLocation.name) {
    displayMessage('Location name cannot be empty.', 'error');
    return;
  }
  try {
    await universityStore.updateLocation(editingLocation.universityId, editingLocation.id, { name: editingLocation.name.trim() });
    displayMessage('Location updated successfully!', 'success');
    showEditLocationModal.value = false;
    await fetchLocations(editingLocation.universityId); // Re-fetch to update UI
    await universityStore.fetchAllLocations();
    await fetchStats();
  } catch (err) {
    console.error("Error updating location:", err);
    displayMessage(`Error updating location: ${err.message}`, 'error');
  }
};

const deleteLocation = async (locId, locName) => {
  const universityId = selectedUniversityId.value;
  if (!universityId) {
    displayMessage('Please select a university first.', 'error');
    return;
  }
  confirmAction(`Are you sure you want to delete "${locName}" and all its associated homes? This action cannot be undone.`, async () => {
    try {
      await universityStore.deleteLocation(universityId, locId);
      displayMessage('Location deleted successfully!', 'success');
      await fetchLocations(universityId);
      await universityStore.fetchAllLocations();
      locationId.value = '';
      selectedHomeId.value = '';
      homes.value = [];
      await fetchStats();
    } catch (err) {
      console.error("Error deleting location:", err);
      displayMessage(`Error deleting location: ${err.message}`, 'error');
    }
  });
};

// --- Home (Hostel) Management ---
const openAddHomeModal = async () => {
  newHomeName.value = '';
  newHomeAddress.value = '';
  newHomeRooms.value = 0;
  newHomeCaretakerPhoneNumber.value = '';
  newHomeRent.value = null;
  newHomeDeposit.value = null;
  newHomeType.value = '';
  newHomeImageFiles.value = [];
  selectedCaretakerForHome.value = '';
  showAddHomeModal.value = true;
  error.value = null;

  try {
    await caretakerStore.fetchAllCaretakers();
  } catch (err) {
    console.error("Error fetching caretakers for add home modal:", err);
    displayMessage(`Failed to load caretakers: ${err.message}`, 'error');
  }
};

const submitAddHome = async () => {
  if (!newHomeName.value || !selectedUniversityId.value || !locationId.value ||
      !newHomeCaretakerPhoneNumber.value || newHomeRent.value === null || newHomeDeposit.value === null || !newHomeType.value || newHomeImageFiles.value.length === 0 || !selectedCaretakerForHome.value) {
    displayMessage('Please fill in all required fields, select at least one image, and choose a caretaker.', 'error');
    return;
  }
  if (newHomeRent.value <= 0 || newHomeDeposit.value <= 0) {
    displayMessage('Rent and deposit must be greater than zero.', 'error');
    return;
  }

  try {
    await caretakerStore.addHostel(
      selectedCaretakerForHome.value,
      selectedUniversityId.value,
      locationId.value,
      newHomeName.value.trim(),
      newHomeCaretakerPhoneNumber.value.trim(),
      newHomeRent.value,
      newHomeDeposit.value,
      newHomeType.value,
      newHomeImageFiles.value
    );

    if (!caretakerStore.error) {
      displayMessage('Home added successfully!', 'success');
      showAddHomeModal.value = false;
      if (selectedUniversityId.value && locationId.value) {
        await fetchHomes(selectedUniversityId.value, locationId.value);
      }
      await fetchStats();
    } else {
      displayMessage(caretakerStore.error, 'error');
    }

  } catch (err) {
    console.error("Error adding home:", err);
    displayMessage(`Error adding home: ${err.message}`, 'error');
  }
};

const handleHomeImageFileInputChange = (event) => {
  const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
  const maxFiles = 3;
  const currentCount = newHomeImageFiles.value.length;
  const filesToAddCount = Math.min(files.length, maxFiles - currentCount);

  if (filesToAddCount > 0) {
    const filesToProcess = files.slice(0, filesToAddCount);
    newHomeImageFiles.value = [...newHomeImageFiles.value, ...filesToProcess];
  } else if (files.length > 0) {
    displayMessage(`You can only upload a maximum of ${maxFiles} images.`, 'error');
  }
  event.target.value = '';
};

const removeNewHomeImage = (index) => {
  newHomeImageFiles.value.splice(index, 1);
};

const triggerNewHomeFileInput = (event) => {
  event.target.closest('.drop-area').querySelector('input[type="file"]').click();
};

const fetchHomes = async (universityId, locId) => {
  if (!universityId || !locId) {
    homes.value = [];
    return;
  }
  isLoading.value = true;
  error.value = null;
  try {
    homes.value = await universityStore.getHostels(universityId, locId);
  } catch (err) {
    error.value = `Error fetching homes: ${err.message}`;
    displayMessage(`Error fetching homes: ${err.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
};

const editHome = (home) => {
  Object.assign(editingHome, { ...home });
  editingHome.price = Number(home.price);
  editingHome.deposit = Number(home.deposit);
  newImageFilesForEdit.value = []; // Corrected variable name
  showEditHomeModal.value = true;
  error.value = null;
};

const submitEditHome = async () => {
  if (!editingHome.name || !editingHome.caretakerPhoneNumber || editingHome.price === null || editingHome.deposit === null || !editingHome.hostelType) {
    displayMessage('Please fill in all required fields for editing home.', 'error');
    return;
  }
  if (editingHome.price <= 0 || editingHome.deposit <= 0) {
    displayMessage('Rent and deposit must be greater than zero.', 'error');
    return;
  }

  try {
    if (newImageFilesForEdit.value.length > 0) { // Corrected variable name
       displayMessage('New image files selected, but re-upload logic for editing is not fully implemented for admin. Images will not be updated.', 'error');
    }

    const dataToUpdate = {
      name: editingHome.name,
      caretakerPhoneNumber: editingHome.caretakerPhoneNumber,
      price: editingHome.price,
      deposit: editingHome.deposit,
      hostelType: editingHome.hostelType,
      isAvailable: editingHome.isAvailable,
    };

    await caretakerStore.updateHostel(
      editingHome.caretakerUid,
      editingHome.universityId,
      editingHome.locationId,
      editingHome.id,
      dataToUpdate
    );

    displayMessage('Home updated successfully!', 'success');
    showEditHomeModal.value = false;
    await fetchHomes(editingHome.universityId, editingHome.locationId);
    await fetchStats();
  } catch (err) {
    console.error("Error updating home:", err);
    displayMessage(`Failed to update home: ${err.message || 'An unknown error occurred.'}`, 'error');
  }
};

const deleteHome = async (homeId, homeName) => {
  const universityId = selectedUniversityId.value;
  const locId = locationId.value; // Use locationId
  const homeToDelete = homes.value.find(h => h.id === homeId);

  if (!universityId || !locId || !homeToDelete) {
    displayMessage('Please select a university and location, and ensure the home exists.', 'error');
    return;
  }

  confirmAction(`Are you sure you want to delete "${homeName}"? This action cannot be undone.`, async () => {
    try {
      await caretakerStore.deleteHostel(
        homeToDelete.caretakerUid,
        universityId,
        locId, // Use locId
        homeId,
        homeToDelete.imageUrls
      );
      displayMessage('Home deleted successfully!', 'success');
      await fetchHomes(universityId, locId); // Use locId
      selectedHomeId.value = '';
      await fetchStats();
    } catch (err) {
      console.error("Error deleting home:", err);
      displayMessage(`Failed to delete home: ${err.message || 'An unknown error occurred.'}`, 'error');
    }
  });
};


// --- Fetching Data for Stats ---
const fetchStats = async () => {
  isLoading.value = true;
  error.value = null;
  let totalUniversitiesCount = 0;
  let totalLocationsCount = 0;
  let totalHomesCount = 0;

  try {
    const universitiesSnapshot = await getDocs(collection(db, 'Universities'));
    totalUniversitiesCount = universitiesSnapshot.size;

    for (const uniDoc of universitiesSnapshot.docs) {
      const locationsSnapshot = await getDocs(collection(db, `Universities/${uniDoc.id}/locations`));
      totalLocationsCount += locationsSnapshot.size;

      for (const locDoc of locationsSnapshot.docs) {
        const homesSnapshot = await getDocs(collection(db, `Universities/${uniDoc.id}/locations/${locDoc.id}/hostels`));
        totalHomesCount += homesSnapshot.docs.filter(doc => !doc.data().placeholder).length;
      }
    }

    stats.value.totalUniversities = totalUniversitiesCount;
    stats.value.totalLocations = totalLocationsCount;
    stats.value.totalHomes = totalHomesCount;
    stats.value.sessions = Math.round(Math.random() * 100);
    stats.value.clickRate = Math.round(Math.random() * 100);
    stats.value.pageviews = totalUniversitiesCount * 10;

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    error.value = `Failed to load dashboard statistics: ${err.message}`;
    displayMessage(`Failed to load dashboard statistics: ${err.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
};

// --- Selection Handlers ---
const selectUniversity = (id) => {
  selectedUniversityId.value = id;
  locationId.value = '';
  selectedHomeId.value = '';
  homes.value = [];
  fetchLocations(id);
};

const selectLocation = (id) => {
  locationId.value = id;
  selectedHomeId.value = '';
  fetchHomes(selectedUniversityId.value, id);
};

const selectHome = (id) => {
  selectedHomeId.value = id;
};

// --- View Toggles ---
const toggleUniversityView = () => {
  showUniversityView.value = !showUniversityView.value;
  if (showUniversityView.value) {
    universityStore.fetchUniversities();
  }
  showLocationView.value = false;
  showHomesView.value = false;
  selectedUniversityId.value = '';
  locationId.value = '';
  selectedHomeId.value = '';
  locations.value = [];
  homes.value = [];
};

const toggleLocationView = () => {
  showLocationView.value = !showLocationView.value;
  if (showLocationView.value && selectedUniversityId.value) {
    fetchLocations(selectedUniversityId.value);
  }
  showUniversityView.value = false;
  showHomesView.value = false;
  locationId.value = '';
  selectedHomeId.value = '';
  homes.value = [];
};

const toggleHomesView = () => {
  showHomesView.value = !showHomesView.value;
  if (showHomesView.value && selectedUniversityId.value && locationId.value) {
    fetchHomes(selectedUniversityId.value, locationId.value);
  }
  showUniversityView.value = false;
  showLocationView.value = false;
  selectedHomeId.value = '';
};

// --- Data Download ---
const downloadData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await universityStore.fetchUniversities();
    let data = ['Universities:'];
    for (const uni of universityStore.universities) {
      data.push(`- ${uni.name} (ID: ${uni.id})`);
      data.push('  Locations:');
      const uniLocations = await universityStore.getLocations(uni.id);
      if (uniLocations.length > 0) {
        for (const loc of uniLocations) {
          data.push(`  - ${loc.name} (ID: ${loc.id})`);
          data.push('    Homes:');
          const locHomes = await universityStore.getHostels(uni.id, loc.id);
          if (locHomes.length > 0) {
            locHomes.forEach(home => {
              if (!home.placeholder) {
                data.push(`    - ${home.name || 'Unnamed Home'} (ID: ${home.id}, Address: ${home.address || 'N/A'}, Rooms: ${home.rooms || 'N/A'}, Caretaker: ${home.caretakerUid || 'N/A'})`);
              }
            });
          } else {
            data.push('    (No homes)');
          }
        }
      } else {
        data.push('  (No locations)');
      }
    }

    const blob = new Blob([data.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin_data.txt';
    link.click();
    URL.revokeObjectURL(url);
    displayMessage('Data downloaded successfully!', 'success');
  } catch (err) {
    console.error("Error downloading data:", err);
    displayMessage(`Error downloading data: ${err.message}`, 'error');
  } finally {
    isLoading.value = false;
  }
};

// --- Watchers ---
watch(selectedUniversityId, (newVal) => {
  if (newVal && showLocationView.value) {
    fetchLocations(newVal);
  } else if (!newVal) {
    locations.value = [];
    locationId.value = '';
    selectedHomeId.value = '';
    homes.value = [];
  }
});

watch(locationId, (newVal) => {
  if (newVal && selectedUniversityId.value && showHomesView.value) {
    fetchHomes(selectedUniversityId.value, newVal);
  } else if (!newVal) {
    selectedHomeId.value = '';
    homes.value = [];
  }
});

// NEW: Reactive variable to store admin status
const isAdmin = ref(false);

// NEW: Function to check admin access (combining custom claims and Firestore document)
async function checkAdminAccess(uid) {
  const auth = getAuth();
  let isUserAdmin = false;

  try {
    const idTokenResult = await auth.currentUser.getIdTokenResult(true);
    console.log('AdminDashboard: User ID Token Result:', idTokenResult);
    console.log('AdminDashboard: User Claims:', idTokenResult.claims);

    if (idTokenResult.claims.role === 'admin') {
      isUserAdmin = true;
      console.log('AdminDashboard: User is admin via custom claims.');
    } else {
      console.log('AdminDashboard: Custom claim "admin" not found. Checking Firestore document...');
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log('AdminDashboard: User document loaded from Firestore. Role:', userData.role);
        if (userData.role === 'admin') {
          isUserAdmin = true;
          console.log('AdminDashboard: User is admin via Firestore document.');
        } else {
          console.warn('AdminDashboard: Firestore document role is NOT admin.');
        }
      } else {
        console.warn('AdminDashboard: User document not found in Firestore.');
      }
    }
  } catch (tokenError) {
    console.error("AdminDashboard: Error getting ID token or claims/Firestore document:", tokenError);
    displayMessage('Authentication error during role check. Please log in again.', 'error');
  }
  isAdmin.value = isUserAdmin;
  return isUserAdmin;
}

// --- On Mounted ---
onMounted(async () => {
  const auth = getAuth();
  console.log('AdminDashboard: onMounted - Starting authentication check.');
  console.log('AdminDashboard: __initial_auth_token available:', typeof __initial_auth_token !== 'undefined');

  if (!authStore.user) {
    console.log('AdminDashboard: No user in authStore. Waiting for onAuthStateChanged...');
    await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
        console.log('AdminDashboard: onAuthStateChanged fired. User:', firebaseUser ? firebaseUser.uid : 'null');
        if (firebaseUser) {
          authStore.setUser(firebaseUser);
          await checkAdminAccess(firebaseUser.uid);
        } else {
          authStore.clearUser();
          console.log('AdminDashboard: No user logged in. Attempting initial sign-in.');
          try {
            if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
              console.log('AdminDashboard: Attempting signInWithCustomToken...');
              await signInWithCustomToken(auth, __initial_auth_token);
              console.log('AdminDashboard: signInWithCustomToken successful.');
            } else {
              console.log('AdminDashboard: __initial_auth_token not found, attempting signInAnonymously...');
              await signInAnonymously(auth);
              console.log('AdminDashboard: signInAnonymously successful.');
            }
          } catch (signInError) {
            console.error('AdminDashboard: Error during initial sign-in attempt:', signInError);
            displayMessage(`Sign-in failed: ${signInError.message}`, 'error');
            router.push('/login');
          }
        }
        unsubscribe();
        resolve();
      });
    });
  } else {
    console.log('AdminDashboard: authStore.user already exists:', authStore.user.uid);
    await checkAdminAccess(authStore.user.uid);
  }

  // Final check and data fetching if user is confirmed admin
  if (authStore.user && authStore.user.uid && isAdmin.value) {
    console.log('AdminDashboard: Final check - User is confirmed admin. Fetching data.');
    try {
        await universityStore.fetchUniversities();
        await universityStore.fetchAllLocations();
        await fetchStats();
    } catch (err) {
        console.error("AdminDashboard: Error initializing data:", err);
        error.value = `Error initializing data: ${err.message}`;
        displayMessage(`Error initializing data: ${err.message}`, 'error');
        router.push('/login');
    }
  } else if (authStore.user && authStore.user.uid && !isAdmin.value) {
      console.warn('AdminDashboard: User is NOT admin after all attempts. Redirecting.');
      displayMessage('Access Denied: You are not authorized to view the admin dashboard.', 'error');
      router.push('/login');
  } else if (!authStore.user) {
      console.warn('AdminDashboard: No user in authStore after onMounted. Redirecting to login.');
      router.push('/login');
  }
});
</script>


<style scoped>
/* Base styles and dark theme */
.admin-dashboard-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden; /* Hide overflow from waves */
  background-color: #000; /* Solid black background */
}

/* Ensure the content is above the waves */
.admin-dashboard {
  position: relative;
  z-index: 10;
}

/* Moving Waves Background */
.admin-dashboard-waves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* Keep waves behind content */
}

.admin-dashboard-waves::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%; /* Start off-screen */
  width: 200%; /* Make it wide enough for animation */
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    #007bff 20%, /* Blue from btn-primary */
    #0056b3 40%, /* Darker blue */
    #007bff 60%,
    #0056b3 80%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: 200% 100%; /* Control the size of the gradient */
  animation: wave-motion 20s linear infinite; /* Adjust duration for speed */
  opacity: 0.2; /* Make the waves subtle */
  transform: skewY(-2deg); /* Add a slight wave tilt */
  transform-origin: 0% 0%; /* Ensure skew is from top-left */
}

/* Optional: Add a second layer of waves for more depth */
.admin-dashboard-waves::after {
  content: '';
  position: absolute;
  top: 0;
  left: -70%; /* Different starting position for varied effect */
  width: 200%;
  height: 100%;
  background: linear-gradient(
    to left, /* Move in opposite direction */
    rgba(0, 0, 0, 0) 0%,
    #007bff 25%,
    #0056b3 50%,
    #007bff 75%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: 200% 100%;
  animation: wave-motion-reverse 25s linear infinite; /* Different speed */
  opacity: 0.15; /* Even more subtle */
  transform: skewY(1deg); /* Different tilt */
  transform-origin: 0% 0%;
}


/* Keyframe animations for wave motion */
@keyframes wave-motion {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

@keyframes wave-motion-reverse {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

</style>