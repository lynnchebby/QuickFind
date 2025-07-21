<template>
  <div class="min-h-screen bg-white text-gray-800 dark:text-neutral-200 overflow-hidden relative">
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

      <div v-if="isLoading" class="text-center text-blue-600 dark:text-blue-400 my-8 py-4 px-6 bg-blue-50 dark:bg-neutral-900 rounded-lg shadow-md border border-blue-200 dark:border-blue-700">
        <div class="flex items-center justify-center space-x-2">
          <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading data...</p>
        </div>
      </div>
      <div v-if="error" class="text-center bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 my-8 py-4 px-6 rounded-lg shadow-md border border-red-200 dark:border-red-700">
        Error: {{ error }}
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

        <div class="bg-white rounded-xl shadow-lg dark:bg-neutral-900 p-7 sm:p-10 border border-gray-200 dark:border-neutral-800 mb-8 animate-fade-in-down">
          <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-4 sm:mb-0">Manage Universities</h2>
            <button
              @click="toggleUniversityView"
              :class="{
                'bg-blue-600 text-white shadow-md': showUniversityView,
                'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !showUniversityView
              }"
              class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
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
              <button
                @click="showAddUniversityInput = !showAddUniversityInput"
                :class="{
                  'bg-blue-600 text-white shadow-md': showAddUniversityInput,
                  'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !showAddUniversityInput
                }"
                class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto"
              >
                {{ showAddUniversityInput ? 'Cancel Add' : 'Add New' }}
              </button>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200 mb-4">All Universities:</h3>
              <ul class="space-y-3">
                <li v-for="uni in universityStore.universities" :key="uni.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-neutral-700">
                  <span class="text-gray-800 dark:text-neutral-300 font-medium mb-2 sm:mb-0">{{ uni.name }}</span>
                  <div class="flex space-x-2">
                    <button @click="editUniversity(uni.id, uni.name)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Edit University">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                      </svg>
                      Edit
                    </button>
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

            <div v-if="showAddUniversityInput" class="mt-8 p-6 border border-gray-300 rounded-lg bg-gray-50 dark:bg-neutral-800 shadow-md">
              <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-neutral-200">Add New University</h3>
              <input
                type="text"
                v-model="newUniversityName"
                placeholder="New University Name"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 focus:ring-offset-white dark:focus:ring-offset-neutral-900 mb-4"
              />
              <button @click="submitNewUniversity" class="py-2.5 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 w-full">
                Add University
              </button>
              <p v-if="duplicateError" class="text-red-600 dark:text-red-400 text-sm mt-3">
                University with this name already exists.
              </p>
              <p v-if="successMessage" class="text-green-600 dark:text-green-400 text-sm mt-3">{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-neutral-700" />

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
              <button
                @click="showAddLocationInput = !showAddLocationInput"
                :class="{
                  'bg-blue-600 text-white shadow-md': showAddLocationInput,
                  'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !showAddLocationInput
                }"
                class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto"
              >
                {{ showAddLocationInput ? 'Cancel Add' : 'Add New' }}
              </button>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200 mb-4">Locations for {{ getUniversityName(selectedUniversityId) }}:</h3>
              <ul class="space-y-3">
                <li v-for="loc in locations" :key="loc.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-neutral-700">
                  <span class="text-gray-800 dark:text-neutral-300 font-medium mb-2 sm:mb-0">{{ loc.name }}</span>
                  <div class="flex space-x-2">
                    <button @click="editLocation(loc.id, loc.name)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Edit Location">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                      </svg>
                      Edit
                    </button>
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

            <div v-if="showAddLocationInput" class="mt-8 p-6 border border-gray-300 rounded-lg bg-gray-50 dark:bg-neutral-800 shadow-md">
              <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-neutral-200">Add New Location for {{ getUniversityName(selectedUniversityId) }}</h3>
              <input
                type="text"
                v-model="newLocationName"
                placeholder="New Location Name"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 focus:ring-offset-white dark:focus:ring-offset-neutral-900 mb-4"
              />
              <button @click="submitNewLocation" class="py-2.5 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 w-full">
                Add Location
              </button>
              <p v-if="duplicateLocationError" class="text-red-600 dark:text-red-400 text-sm mt-3">
                Location with this name already exists or fields are empty.
              </p>
              <p v-if="locationSuccessMessage" class="text-green-600 dark:text-green-400 text-sm mt-3">{{ locationSuccessMessage }}</p>
            </div>
          </div>
        </div>

        <hr class="my-8 border-gray-200 dark:border-neutral-700" />

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
              <button
                @click="showAddNewHomeInput = !showAddNewHomeInput"
                :class="{
                  'bg-blue-600 text-white shadow-md': showAddNewHomeInput,
                  'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': !showAddNewHomeInput
                }"
                class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 w-full sm:w-auto"
              >
                {{ showAddNewHomeInput ? 'Cancel Add' : 'Add New' }}
              </button>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200 mb-4">Homes for {{ getUniversityName(selectedUniversityId) }} - {{ getLocationName(locationId) }}:</h3>
              <ul class="space-y-3">
                <li v-for="home in homes" :key="home.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 dark:bg-neutral-800 p-3 rounded-md shadow-sm border border-gray-200 dark:border-neutral-700">
                  <span class="text-gray-800 dark:text-neutral-300 font-medium mb-2 sm:mb-0">{{ home.name || 'Unnamed Home' }}</span>
                  <div class="flex space-x-2">
                    <button @click="editHome(home.id, home.name)" class="py-1.5 px-3 inline-flex items-center justify-center gap-x-1 text-xs font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-all duration-200" title="Edit Home">
                      <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                      </svg>
                      Edit
                    </button>
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

            <div v-if="showAddNewHomeInput" class="mt-8 p-6 border border-gray-300 rounded-lg bg-gray-50 dark:bg-neutral-800 shadow-md">
              <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-neutral-200">Add New Home</h3>
              <input
                type="text"
                v-model="newHomeName"
                placeholder="New Home Name"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 focus:ring-offset-white dark:focus:ring-offset-neutral-900 mb-4"
              />
              <input
                type="text"
                v-model="newHomeAddress"
                placeholder="Home Address (Optional)"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 focus:ring-offset-white dark:focus:ring-offset-neutral-900 mb-4"
              />
              <input
                type="number"
                v-model.number="newHomeRooms"
                placeholder="Number of Rooms (Optional)"
                class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 focus:ring-offset-white dark:focus:ring-offset-neutral-900 mb-4"
              />
              <button @click="addNewHome" class="py-2.5 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 w-full">
                Add Home
              </button>
              <p v-if="homeError" class="text-red-600 dark:text-red-400 text-sm mt-3">{{ homeError }}</p>
              <p v-if="homeSuccessMessage" class="text-green-600 dark:text-green-400 text-sm mt-3">{{ homeSuccessMessage }}</p>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CardItem from '@/components/CardItem.vue'
import { useUniversityStore } from '@/stores/additionStore'

import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

const universityStore = useUniversityStore()
const isLoading = ref(false)
const error = ref(null)
const searchQuery = ref('')

// View toggles
const showUniversityView = ref(false)
const showLocationView = ref(false)
const showHomesView = ref(false)

// Selected IDs
const selectedUniversityId = ref('')
const locationId = ref('')
const selectedHomeId = ref('')

// Data arrays
const locations = ref([])
const homes = ref([])

// State for adding universities
const showAddUniversityInput = ref(false)
const newUniversityName = ref('')
const duplicateError = ref(false)
const successMessage = ref('')

// State for adding locations
const showAddLocationInput = ref(false)
const newLocationName = ref('')
const selectedUniversityForLocation = ref('') // This ref seems unused, relying on selectedUniversityId
const duplicateLocationError = ref(false)
const locationSuccessMessage = ref('')

// State for adding homes
const showAddNewHomeInput = ref(false)
const newHomeName = ref('')
const newHomeAddress = ref('')
const newHomeRooms = ref(0)
const duplicateHomeError = ref(false)
const homeSuccessMessage = ref('')
const homeError = ref('')

// State for editing
const editingItemId = ref(null)
const nameForEdit = ref('') // To hold the name being edited

// Updated stats object to reflect actual data counts
const stats = ref({
  totalUniversities: 0,
  totalLocations: 0,
  totalHomes: 0,
  sessions: 0, // Keeping these as placeholders, update if you have actual sources
  clickRate: 0, // Keeping these as placeholders, update if you have actual sources
  pageviews: 0 // Derived or placeholder
})

const filteredUniversities = computed(() => {
  if (!searchQuery.value) return universityStore.universities
  return universityStore.universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Updated statsCards computed property to use the new stats keys
const statsCards = computed(() => [
  {
    title: 'Total Universities',
    value: stats.value.totalUniversities.toLocaleString(),
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 2 0 0 0-3-3.87"/><path d="M16 3.13a4 2 0 0 1 0 7.75"/></svg>'
    }
  },
  {
    title: 'Total Locations',
    value: stats.value.totalLocations.toLocaleString(),
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 0 0 0 .586 1.414L12 12l4.414-4.414A2 0 0 0 17 6.172V2"/></svg>'
    }
  },
  {
    title: 'Total Homes',
    value: stats.value.totalHomes.toLocaleString(),
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 11V5a2 0 0 0-2-2H5a2 0 0 0-2 2v14a2 0 0 0 2 2h6"/><path d="m12 12 4 10 1.7-4.3L22 16Z"/></svg>'
    }
  },
  {
    title: 'Pageviews',
    value: stats.value.pageviews.toLocaleString(),
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"/><path d="M12 13a1 1 0 1 0 0-2 1 0 0 0 0 2z"/><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><path d="M21 7V5a2 2 0 0 0-2-2H5a2 0 0 0-2 2v2"/></svg>'
    }
  }
])

const getUniversityName = (id) => {
  const university = universityStore.universities.find((u) => u.id === id)
  return university?.name || 'Unknown University'
}
const getLocationName = (id) => {
  const location = locations.value.find((l) => l.id === id)
  return location?.name || 'Unknown Location'
}
const getHomeName = (id) => {
  const home = homes.value.find((h) => h.id === id)
  return home?.name || 'Unnamed Home'
}

// --- Generic Edit/Delete Helpers ---
const setEditing = (id, currentName) => {
  editingItemId.value = id
  nameForEdit.value = currentName
}

const cancelEditing = () => {
  editingItemId.value = null
  nameForEdit.value = ''
}

const resetNameForEdit = () => {
  nameForEdit.value = ''
  editingItemId.value = null
}

// --- University Actions ---
const submitNewUniversity = async () => {
  duplicateError.value = false
  successMessage.value = ''

  const trimmed = newUniversityName.value.trim()
  if (!trimmed) return

  const exists = universityStore.universities.some(
    (u) => u.name.toLowerCase() === trimmed.toLowerCase()
  )

  if (exists) {
    duplicateError.value = true
    return
  }

  const newId = trimmed.replace(/\s+/g, '-').toLowerCase()

  try {
    await universityStore.addUniversity(newId, trimmed)
    await universityStore.fetchUniversities()
    await fetchStats(); // <--- Update stats after adding university
    successMessage.value = 'University added successfully!'
    newUniversityName.value = ''
    setTimeout(() => {
      showAddUniversityInput.value = false
      successMessage.value = ''
      duplicateError.value = false // Also clear the duplicate error
    }, 2500)
  } catch (err) {
    console.error("Error adding university:", err)
    error.value = `Error adding university: ${err.message}`
  }
}

const editUniversity = async (universityId, currentName) => {
  setEditing(universityId, currentName)
  const newName = prompt(`Enter new name for ${currentName}:`, currentName);
  if (newName && newName.trim() !== currentName) {
    try {
      await universityStore.updateUniversity(universityId, { name: newName.trim() });
      await universityStore.fetchUniversities(); // Re-fetch to update UI
      await fetchStats(); // <--- Update stats after editing university
      successMessage.value = 'University updated successfully!';
      setTimeout(() => successMessage.value = '', 2500);
    } catch (err) {
      console.error("Error updating university:", err);
      error.value = `Error updating university: ${err.message}`;
    }
  }
  cancelEditing();
}

const deleteUniversity = async (universityId, universityName) => {
  // IMPORTANT: Replace prompt/confirm with a custom modal UI for better UX
  if (confirm(`Are you sure you want to delete the university "${universityName}"? This will also delete all its locations and homes.`)) {
    try {
      await universityStore.deleteUniversity(universityId);
      await universityStore.fetchUniversities(); // Re-fetch to update UI
      await fetchStats(); // <--- Update stats after deleting university
      selectedUniversityId.value = ''; // Reset selections
      locationId.value = '';
      selectedHomeId.value = '';
      locations.value = [];
      homes.value = [];
      successMessage.value = 'University deleted successfully!';
      setTimeout(() => successMessage.value = '', 2500);
    } catch (err) {
      console.error("Error deleting university:", err);
      error.value = `Error deleting university: ${err.message}`;
    }
  }
}

// --- Location Actions ---
const submitNewLocation = async () => {
  duplicateLocationError.value = false
  locationSuccessMessage.value = ''

  const trimmed = newLocationName.value.trim()
  if (!trimmed || !selectedUniversityId.value) {
    locationSuccessMessage.value = 'Please fill in all details and select a university.'
    return
  }

  try {
    const snapshot = await getDocs(collection(db, `Universities/${selectedUniversityId.value}/locations`))
    const exists = snapshot.docs.some(doc => (doc.data().name || '').toLowerCase() === trimmed.toLowerCase())

    if (exists) {
      duplicateLocationError.value = true
      locationSuccessMessage.value = 'Location with this name already exists.'
      return
    }

    const newId = trimmed.replace(/\s+/g, '-').toLowerCase()
    await universityStore.addLocation(newId, trimmed, selectedUniversityId.value)
    locationSuccessMessage.value = 'Location added successfully!'
    newLocationName.value = ''
    fetchLocations(selectedUniversityId.value); // Re-fetch locations
    await fetchStats(); // <--- Update stats after adding location
    setTimeout(() => {
      showAddLocationInput.value = false
      locationSuccessMessage.value = ''
      duplicateLocationError.value = false; // Clear error on success
    }, 2500)
  } catch (err) {
    console.error("Error adding location:", err);
    locationSuccessMessage.value = `Error adding location: ${err.message}`;
    duplicateLocationError.value = true;
  }
}

const editLocation = async (locId, currentName) => {
  setEditing(locId, currentName)
  // IMPORTANT: Replace prompt/confirm with a custom modal UI for better UX
  const newName = prompt(`Enter new name for ${currentName}:`, currentName);
  if (newName && newName.trim() !== currentName) {
    try {
      await universityStore.updateLocation(selectedUniversityId.value, locId, { name: newName.trim() });
      await fetchLocations(selectedUniversityId.value); // Re-fetch to update UI
      await fetchStats(); // <--- Update stats after editing location
      locationSuccessMessage.value = 'Location updated successfully!';
      setTimeout(() => locationSuccessMessage.value = '', 2500);
    } catch (err) {
      console.error("Error updating location:", err);
      locationSuccessMessage.value = `Error updating location: ${err.message}`;
    }
  }
  cancelEditing();
}

const deleteLocation = async (locId, locName) => {
  // IMPORTANT: Replace prompt/confirm with a custom modal UI for better UX
  if (confirm(`Are you sure you want to delete the location "${locName}"? This will also delete all homes within it.`)) {
    try {
      await universityStore.deleteLocation(selectedUniversityId.value, locId);
      await fetchLocations(selectedUniversityId.value); // Re-fetch to update UI
      await fetchStats(); // <--- Update stats after deleting location
      locationId.value = ''; // Reset selected location
      selectedHomeId.value = '';
      homes.value = [];
      locationSuccessMessage.value = 'Location deleted successfully!';
      setTimeout(() => locationSuccessMessage.value = '', 2500);
    } catch (err) {
      console.error("Error deleting location:", err);
      locationSuccessMessage.value = `Error deleting location: ${err.message}`;
    }
  }
}

// --- Home Actions ---
const addNewHome = async () => {
  duplicateHomeError.value = false
  homeSuccessMessage.value = ''
  homeError.value = ''

  const trimmedName = newHomeName.value.trim()

  if (!trimmedName || !selectedUniversityId.value || !locationId.value) {
    homeError.value = 'Please fill in all home details and ensure university/location are selected.'
    return
  }

  try {
    const snapshot = await getDocs(
      collection(db, `Universities/${selectedUniversityId.value}/locations/${locationId.value}/hostels`)
    )
    const exists = snapshot.docs.some(
      doc => (doc.data().name || '').toLowerCase() === trimmedName.toLowerCase()
    )

    if (exists) {
      duplicateHomeError.value = true
      homeError.value = 'Home with this name already exists at this location.'
      return
    }

    const newId = trimmedName.replace(/\s+/g, '-').toLowerCase()

    await universityStore.addNewHostel(
      selectedUniversityId.value,
      locationId.value,
      newId,
      { name: trimmedName, address: newHomeAddress.value, rooms: newHomeRooms.value }
    )

    homeSuccessMessage.value = 'New home added successfully!'
    newHomeName.value = ''
    newHomeAddress.value = ''
    newHomeRooms.value = 0

    await fetchHomes(selectedUniversityId.value, locationId.value);
    await fetchStats(); // <--- Update stats after adding home

    setTimeout(() => {
      showAddNewHomeInput.value = false
      homeSuccessMessage.value = ''
      duplicateHomeError.value = false; // Clear error on success
    }, 2500)
  } catch (err) {
    console.error("Error adding home:", err)
    homeError.value = `Error adding home: ${err.message}`
  }
}

const editHome = async (homeId, currentName) => {
  setEditing(homeId, currentName)
  // IMPORTANT: Replace prompt/confirm with a custom modal UI for better UX
  const newName = prompt(`Enter new name for ${currentName}:`, currentName);
  if (newName && newName.trim() !== currentName) {
    try {
      await universityStore.updateHostel(selectedUniversityId.value, locationId.value, homeId, { name: newName.trim() });
      await fetchHomes(selectedUniversityId.value, locationId.value); // Re-fetch to update UI
      await fetchStats(); // <--- Update stats after editing home
      homeSuccessMessage.value = 'Home updated successfully!';
      setTimeout(() => homeSuccessMessage.value = '', 2500);
    } catch (err) {
      console.error("Error updating home:", err);
      homeError.value = `Error updating home: ${err.message}`;
    }
  }
  cancelEditing();
}

const deleteHome = async (homeId, homeName) => {
  // IMPORTANT: Replace prompt/confirm with a custom modal UI for better UX
  if (confirm(`Are you sure you want to delete the home "${homeName}"?`)) {
    try {
      await universityStore.deleteHostel(selectedUniversityId.value, locationId.value, homeId);
      await fetchHomes(selectedUniversityId.value, locationId.value); // Re-fetch to update UI
      await fetchStats(); // <--- Update stats after deleting home
      selectedHomeId.value = ''; // Reset selected home
      homeSuccessMessage.value = 'Home deleted successfully!';
      setTimeout(() => homeSuccessMessage.value = '', 2500);
    } catch (err) {
      console.error("Error deleting home:", err);
      homeError.value = `Error deleting home: ${err.message}`;
    }
  }
}

// --- Fetching Data ---
const fetchStats = async () => {
  isLoading.value = true;
  error.value = null;
  let totalUniversitiesCount = 0;
  let totalLocationsCount = 0;
  let totalHomesCount = 0;

  try {
    // 1. Get Universities Count
    const universitiesSnapshot = await getDocs(collection(db, 'Universities'));
    totalUniversitiesCount = universitiesSnapshot.size;

    // 2. Get Locations Count (nested under Universities)
    for (const uniDoc of universitiesSnapshot.docs) {
      const locationsSnapshot = await getDocs(collection(db, `Universities/${uniDoc.id}/locations`));
      totalLocationsCount += locationsSnapshot.size;

      // 3. Get Homes Count (nested under Locations)
      for (const locDoc of locationsSnapshot.docs) {
        const homesSnapshot = await getDocs(collection(db, `Universities/${uniDoc.id}/locations/${locDoc.id}/hostels`));
        totalHomesCount += homesSnapshot.size;
      }
    }

    // Update the reactive stats object
    stats.value.totalUniversities = totalUniversitiesCount;
    stats.value.totalLocations = totalLocationsCount;
    stats.value.totalHomes = totalHomesCount;

    // Retaining original random/derived values for sessions and pageviews
    // as their source is not clear from the provided code.
    stats.value.sessions = Math.round(Math.random() * 100); // Placeholder
    stats.value.clickRate = Math.round(Math.random() * 100); // Placeholder
    stats.value.pageviews = totalUniversitiesCount * 10; // Derived from totalUniversities

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    error.value = `Failed to load dashboard statistics: ${err.message}`;
  } finally {
    isLoading.value = false;
  }
};


const fetchLocations = async (universityId) => {
  if (!universityId) {
    locations.value = []
    return
  }
  try {
    isLoading.value = true
    const querySnapshot = await getDocs(collection(db, `Universities/${universityId}/locations`))
    locations.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    error.value = `Error fetching locations: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

const fetchHomes = async (universityId, locId) => {
  if (!universityId || !locId) {
    homes.value = []
    return
  }
  try {
    isLoading.value = true
    const querySnapshot = await getDocs(
      collection(db, `Universities/${universityId}/locations/${locId}/hostels`)
    )
    homes.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    error.value = `Error fetching homes: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

// --- Selection Handlers ---
const selectUniversity = (id) => {
  selectedUniversityId.value = id
  locationId.value = ''
  selectedHomeId.value = ''
  homes.value = []
  fetchLocations(id)
}

const selectLocation = (id) => {
  locationId.value = id
  selectedHomeId.value = ''
  fetchHomes(selectedUniversityId.value, id)
}

const selectHome = (id) => {
  selectedHomeId.value = id
}

// --- View Toggles ---
const toggleUniversityView = () => {
  showUniversityView.value = !showUniversityView.value
  if (showUniversityView.value) universityStore.fetchUniversities()
  showLocationView.value = false;
  showHomesView.value = false;
  selectedUniversityId.value = ''; // Reset selections when collapsing
  locationId.value = '';
  selectedHomeId.value = '';
  locations.value = [];
  homes.value = [];
}

const toggleLocationView = () => {
  showLocationView.value = !showLocationView.value
  if (showLocationView.value && selectedUniversityId.value) fetchLocations(selectedUniversityId.value)
  showUniversityView.value = false;
  showHomesView.value = false;
  locationId.value = ''; // Reset selections when collapsing
  selectedHomeId.value = '';
  homes.value = [];
}

const toggleHomesView = () => {
  showHomesView.value = !showHomesView.value
  if (showHomesView.value && selectedUniversityId.value && locationId.value) {
    fetchHomes(selectedUniversityId.value, locationId.value)
  }
  showUniversityView.value = false;
  showLocationView.value = false;
  selectedHomeId.value = ''; // Reset selection when collapsing
}

// --- Data Download ---
const downloadData = () => {
  const data = [
    'Universities:',
    ...universityStore.universities.map((u) => `- ${u.name}`),
    '\nLocations:',
    ...locations.value.map((l) => `- ${l.name}`),
    '\nHomes:',
    ...homes.value.map((h) => `- ${h.name || 'Unnamed Home'}`)
  ].join('\n')

  const blob = new Blob([data], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'admin_data.txt'
  link.click()
  URL.revokeObjectURL(url)
}

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

// --- On Mounted ---
onMounted(async () => {
  try {
    await Promise.all([
      universityStore.fetchUniversities(),
      fetchStats() // Fetch initial stats on mount
    ])
  } catch (err) {
    error.value = `Error initializing data: ${err.message}`
  }
})
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