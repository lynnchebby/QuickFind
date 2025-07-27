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
          QuickFind
        </h1>
        <h2 v-if="user && user.name" class="mt-4 text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-neutral-300 animate-fade-in-up">
          Ready to add and view your hostel? We've got you covered, <span class="text-blue-700 dark:text-blue-300">{{ user.name }}</span>!
        </h2>
        <p v-else class="mt-4 text-xl text-gray-600 dark:text-neutral-400 animate-fade-in-up">
          Your trusted platform for managing multiple properties.
        </p>
      </div>

      <div v-if="authStore.loading" class="text-center text-blue-600 dark:text-blue-400 my-8 py-4 px-6 bg-blue-50 dark:bg-neutral-900 rounded-lg shadow-md border border-blue-200 dark:border-blue-700">
        <div class="flex items-center justify-center space-x-2">
          <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading user data...</p>
        </div>
      </div>
      <div v-else-if="authStore.error" class="text-center bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 my-8 py-4 px-6 rounded-lg shadow-md border border-red-200 dark:border-red-700">
        Error: {{ authStore.error }}. Please try logging in again.
      </div>
      <div v-else-if="!user || !user.uid" class="text-center bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 my-8 py-4 px-6 rounded-lg shadow-md border border-yellow-200 dark:border-yellow-700">
        You must be logged in to access this page. Please <router-link to="/login" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-semibold underline">log in</router-link>.
      </div>

      <div v-if="user && user.uid && !authStore.loading && !authStore.error" class="bg-blue-50 dark:bg-neutral-900 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-100 dark:border-neutral-800">
        <h2 class="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-neutral-200 text-center mb-8 animate-fade-in-up">
          Caretaker Dashboard
        </h2>

        <div class="mb-8 flex justify-center gap-4 border-b border-gray-200 dark:border-neutral-700 pb-4">
          <button
            @click="currentView = 'hostelList'"
            :class="{
              'bg-blue-600 text-white shadow-md': currentView === 'hostelList',
              'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': currentView !== 'hostelList'
            }"
            class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            My Hostels
          </button>
          <button
            @click="currentView = 'addHostelForm'"
            :class="{
              'bg-blue-600 text-white shadow-md': currentView === 'addHostelForm',
              'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700': currentView !== 'addHostelForm'
            }"
            class="py-2 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          >
            Add New Hostel
          </button>
        </div>

        <div v-if="caretakerStore.loading || universityStore.loading" class="text-center text-blue-600 dark:text-blue-400 my-8 py-4 px-6 bg-blue-50 dark:bg-neutral-800 rounded-lg border border-blue-200 dark:border-blue-700">
            <div class="flex items-center justify-center space-x-2">
                <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading hostels or universities...</p>
            </div>
        </div>
        <div v-if="caretakerStore.error || universityStore.error" class="text-center bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 my-8 py-4 px-6 rounded-lg shadow-md border border-red-200 dark:border-red-700">
          Error: {{ caretakerStore.error || universityStore.error }}
        </div>

        <div v-if="currentView === 'hostelList'">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div v-if="!caretakerStore.loading && caretakerStore.hostels.length === 0" class="lg:col-span-2 text-center text-gray-500 dark:text-neutral-500 p-8 border rounded-xl bg-white dark:bg-neutral-900 shadow-inner">
              <p class="text-lg">No hostels found.</p>
              <p class="mt-2 text-md">Click "Add New Hostel" to get started and list your first apartment!</p>
            </div>

            <div v-for="hostel in caretakerStore.hostels" :key="hostel.id" class="animate-fade-in-right">
              <div
                class="p-6 relative bg-white border border-gray-200 rounded-xl shadow-md md:p-10 dark:bg-neutral-900 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-1">
                  {{ hostel.name }}
                </h3>
                <div class="text-md text-gray-600 dark:text-neutral-400 mb-4">
                  {{ hostel.hostelType }} apartment
                </div>

                <div v-if="hostel.imageUrls && hostel.imageUrls.length > 0" class="mt-4 flex gap-3 overflow-x-auto pb-3 border-t border-b border-gray-200 dark:border-neutral-700 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-neutral-700 dark:scrollbar-track-neutral-800">
                  <img
                    v-for="(imageUrl, index) in hostel.imageUrls"
                    :key="index"
                    :src="imageUrl"
                    alt="Hostel Image"
                    class="h-28 w-28 object-cover rounded-lg shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105"
                    @click="openImageViewer(imageUrl)"
                  />
                </div>
                <div v-else class="text-gray-400 text-sm italic mt-4 mb-5 p-2 bg-gray-50 dark:bg-neutral-800 rounded">No images available</div>

                <div class="mt-5 flex items-baseline">
                  <span class="text-5xl font-extrabold text-blue-700 dark:text-blue-300">Ksh {{ hostel.price }}</span>
                  <span class="ms-3 text-lg text-gray-600 dark:text-neutral-400">/ monthly</span>
                </div>

                <div
                  class="mt-6 grid sm:grid-cols-2 gap-y-3 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0 border-t border-gray-200 dark:border-neutral-700 pt-4"
                >
                  <ul class="space-y-2 text-md sm:text-lg">
                    <li class="flex gap-x-3 items-center">
                      <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span class="text-gray-800 dark:text-neutral-200">
                        Ksh {{ hostel.deposit }} deposit
                      </span>
                    </li>
                    <li class="flex gap-x-3 items-center">
                      <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span class="text-gray-800 dark:text-neutral-200">
                        Location: <span class="font-medium">{{ getPlaceName(hostel.locationId, universityStore.allLocations) }}</span>
                      </span>
                    </li>
                  </ul>
                  <ul class="space-y-2 text-md sm:text-lg">
                    <li class="flex gap-x-3 items-center">
                      <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span class="text-gray-800 dark:text-neutral-200">
                        University: <span class="font-medium">{{ getPlaceName(hostel.universityId, universityStore.universities) }}</span>
                      </span>
                    </li>
                    <li class="flex gap-x-3 items-center">
                      <CheckIcon class="flex-shrink-0 w-5 h-5 text-green-500" />
                      <span class="text-gray-800 dark:text-neutral-200">
                        Contact: <span class="font-medium">{{ hostel.caretakerPhoneNumber }}</span>
                      </span>
                    </li>
                  </ul>
                </div>

                <div class="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        @click="editHostel(hostel)"
                        class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                        :disabled="caretakerStore.loading"
                    >
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646L6.5 13.086V16h2.914l6.364-6.364-2.828-2.828z" />
                        </svg>
                        Edit
                    </button>
                    <button
  @click="deleteHostel(hostel)"
  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
  :disabled="caretakerStore.loading"
>
  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z" clip-rule="evenodd" />
  </svg>
  Delete
</button>

                    <button
                        @click="toggleAvailability(hostel)"
                        :class="{
                            'bg-green-600 hover:bg-green-700 focus:ring-green-500': hostel.isAvailable,
                            'bg-red-600 hover:bg-red-700 focus:ring-red-500': !hostel.isAvailable
                        }"
                        class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                        :disabled="caretakerStore.loading"
                    >
                        Mark as {{ hostel.isAvailable ? 'Not Available' : 'Available' }}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentView === 'addHostelForm'">
          <form @submit.prevent="submitHostelForm" class="bg-white rounded-xl shadow-lg dark:bg-neutral-900 p-7 sm:p-10 border border-gray-200 dark:border-neutral-800 animate-fade-in-down">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-neutral-200 mb-8 text-center">Add New Apartment Hostel</h2>

            <div class="grid sm:grid-cols-12 gap-6">
              <div class="sm:col-span-12 lg:col-span-3">
                <label for="university-select" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  University <span class="text-red-500">*</span>
                </label>
              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <select
                  id="university-select"
                  v-model="form.selectedUniversity"
                  @change="fetchLocationsForUniversity"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  required
                >
                  <option value="" disabled selected>Select University</option>
                  <option v-for="uni in universityStore.universities" :key="uni.id" :value="uni.id">
                    {{ uni.name }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-12 lg:col-span-3">
                <label for="location-select" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Location <span class="text-red-500">*</span>
                </label>
              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <select
                  id="location-select"
                  v-model="form.selectedLocation"
                  :disabled="locations.length === 0"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  required
                >
                  <option value="" disabled selected>Select Location</option>
                  <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                    {{ loc.name }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-12 lg:col-span-3">
                <label for="hostel-name" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Hostel Name <span class="text-red-500">*</span>
                </label>
              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <input
                  id="hostel-name"
                  type="text"
                  v-model="form.hostelName"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  required
                />
              </div>

              <div class="sm:col-span-12 lg:col-span-3">
                <label for="caretaker-phone-number" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Hostel Contact Number <span class="text-red-500">*</span>
                </label>
              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <input
                  id="caretaker-phone-number"
                  type="text"
                  v-model="form.caretakerPhoneNumber"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  placeholder="+2547XXXXXXXX"
                  required
                />
              </div>

              <div class="sm:col-span-12 lg:col-span-3">
                <label for="rent" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Rent (Ksh) <span class="text-red-500">*</span>
                </label>
              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <input
                  id="rent"
                  type="number"
                  v-model.number="form.rent"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  required
                />
              </div>

              <div class="sm:col-span-12 lg:col-span-3">
                <label for="deposit" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Deposit (Ksh) <span class="text-red-500">*</span>
                </label>
              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <input
                  id="deposit"
                  type="number"
                  v-model.number="form.deposit"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  required
                />
              </div>

              <div class="sm:col-span-12 lg:col-span-3">
                <label for="hostel-type" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Hostel Type <span class="text-red-500">*</span>
                </label>
                <div class="sm:col-span-12 lg:col-span-3">
  <label for="available-rooms" class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
    Available Rooms <span class="text-red-500">*</span>
  </label>
</div>
<div class="sm:col-span-12 lg:col-span-9">
  <input
    id="available-rooms"
    type="number"
    v-model.number="form.availableRooms"
    min="0"
    class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
    required
  />
</div>

              </div>
              <div class="sm:col-span-12 lg:col-span-9">
                <select
                  id="hostel-type"
                  v-model="form.hostelType"
                  class="py-2.5 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
                  required
                >
                  <option value="" disabled selected>Select Type</option>
                  <option value="Bedsitter">Bedsitter</option>
                  <option value="One bedroom">One bedroom</option>
                  <option value="Two bedRoom">Two bedroom</option>
                </select>
              </div>

              <div class="sm:col-span-full">
                <label class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                  Upload Images (Max 3) <span class="text-red-500">*</span>
                </label>
                <div
                  @dragover.prevent="isDragging = true"
                  @dragleave="isDragging = false"
                  @drop.prevent="handleFileDrop"
                  @click="triggerFileInput"
                  :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500': isDragging }"
                  class="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white dark:bg-neutral-800 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all duration-200 ease-in-out group"
                >
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileInputChange"
                    accept="image/*"
                    multiple="multiple" class="hidden"
                  />
                  <svg
                    class="w-12 h-12 text-gray-400 dark:text-neutral-500 mb-3 group-hover:text-blue-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-md text-gray-600 dark:text-neutral-400">
                    <span class="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-neutral-400">
                    PNG, JPG, GIF (Max 3 files)
                  </p>
                  <div v-if="form.imageFiles && form.imageFiles.length > 0" class="mt-4 flex flex-wrap gap-2 justify-center">
                    <div v-for="(file, index) in form.imageFiles" :key="index" class="flex items-center gap-2 p-2 border border-gray-200 dark:border-neutral-700 rounded-md bg-gray-50 dark:bg-neutral-800 shadow-sm">
                      <span class="text-sm text-gray-700 dark:text-neutral-300">{{ file.name }}</span>
                      <button type="button" @click.stop="removeImage(index)" class="text-red-500 hover:text-red-700 text-lg font-bold">
                          &times;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 flex justify-end gap-x-3">
              <button
                type="button"
                @click="resetForm"
                class="py-2.5 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-full border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-900 transition-all duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                :disabled="caretakerStore.loading || universityStore.loading"
                class="py-2.5 px-6 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
              >
                <span v-if="caretakerStore.loading || universityStore.loading">Adding...</span>
                <span v-else>Submit Hostel</span>
              </button>
            </div>
            <p v-if="caretakerStore.error" class="text-red-600 dark:text-red-400 text-center mt-6 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">{{ caretakerStore.error }}</p>
            <p v-if="caretakerStore.addHostelSuccess" class="text-green-600 dark:text-green-400 text-center mt-6 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">Hostel added successfully!</p>
          </form>
        </div>
      </div>
    </div>

    <ImageViewerModal v-model:modelValue="showImageViewer" :image-url="currentImageUrl" />
  </div>
  <!-- Edit Hostel Modal -->
<Transition name="fade">
  <div v-if="showEditHostelModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-neutral-900 p-6 w-full max-w-2xl rounded-lg shadow-lg relative">
      <h3 class="text-2xl font-bold text-gray-800 dark:text-neutral-100 mb-6">Edit Hostel</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-700 dark:text-neutral-300 mb-1">Hostel Name</label>
          <input v-model="editingHostel.name" type="text" class="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100" />
        </div>
        <div>
          <label class="block text-sm text-gray-700 dark:text-neutral-300 mb-1">Phone</label>
          <input v-model="editingHostel.caretakerPhoneNumber" type="text" class="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100" />
        </div>
        <div>
          <label class="block text-sm text-gray-700 dark:text-neutral-300 mb-1">Rent</label>
          <input v-model.number="editingHostel.price" type="number" class="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100" />
        </div>
        <div>
          <label class="block text-sm text-gray-700 dark:text-neutral-300 mb-1">Deposit</label>
          <input v-model.number="editingHostel.deposit" type="number" class="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100" />
        </div>
        <div>
          <label class="block text-sm text-gray-700 dark:text-neutral-300 mb-1">Hostel Type</label>
          <select v-model="editingHostel.hostelType" class="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100">
            <option value="Bedsitter">Bedsitter</option>
            <option value="One bedroom">One bedroom</option>
            <option value="Two bedroom">Two bedroom</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm text-gray-700 dark:text-neutral-300 mb-1">Available Rooms</label>
          <input v-model.number="editingHostel.availableRooms" type="number" class="w-full p-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100" />
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button @click="cancelEdit" class="px-4 py-2 rounded bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-white hover:bg-gray-300">Cancel</button>
        <button @click="submitEditHostelForm" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  </div>
</Transition>

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useCaretakerStore } from '../../stores/caretakerStore';
import { useUniversityStore } from '../../stores/universityStore';
import { getAuth } from 'firebase/auth';
import ImageViewerModal from '@/components/ImageViewerModal.vue';

const authStore = useAuthStore();
const caretakerStore = useCaretakerStore();
const universityStore = useUniversityStore();
const router = useRouter();

const user = computed(() => authStore.user);
const currentView = ref('hostelList');

const form = reactive({
  hostelName: '',
  selectedUniversity: '',
  selectedLocation: '',
  caretakerPhoneNumber: '',
  rent: null,
  deposit: null,
  hostelType: '',
  availableRooms: null,
  imageFiles: []
});

// Locations
const locations = ref([]);

// File upload
const fileInput = ref(null);
const isDragging = ref(false);

const showImageViewer = ref(false);
const currentImageUrl = ref('');
const openImageViewer = (url) => {
  currentImageUrl.value = url;
  showImageViewer.value = true;
};

// Edit Modal
const showEditHostelModal = ref(false);
const editingHostel = ref(null);
const editingImageFiles = ref([]); // Holds new images selected in edit modal

const getPlaceName = (id, list) => {
  if (!Array.isArray(list)) return 'Loading...';
  const item = list.find(item => item.id === id);
  return item ? item.name : 'Unknown';
};

const fetchLocationsForUniversity = () => {
  if (!form.selectedUniversity) {
    locations.value = [];
    return;
  }

  locations.value = universityStore.allLocations.filter(
    (loc) => loc.universityId === form.selectedUniversity
  );
};

// File upload helpers
const handleFileInputChange = (e) => {
  const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
  appendFiles(files);
};

const appendFiles = (files) => {
  const max = 3;
  const current = form.imageFiles.length;
  const toAdd = Math.min(files.length, max - current);

  if (toAdd <= 0) {
    caretakerStore.error = `You can only upload a maximum of ${max} images.`;
    return;
  }

  const validFiles = files.slice(0, toAdd);
  form.imageFiles = [...form.imageFiles, ...validFiles];
  if (fileInput.value) fileInput.value.value = '';
  caretakerStore.error = null;
};

const removeImage = (i) => {
  form.imageFiles.splice(i, 1);
  caretakerStore.error = null;
};

const triggerFileInput = () => fileInput.value?.click();

const handleFileDrop = (event) => {
  isDragging.value = false;
  const droppedFiles = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  appendFiles(droppedFiles);
};

// ✅ Add Hostel
const submitHostelForm = async () => {
  caretakerStore.error = null;
  caretakerStore.addHostelSuccess = false;

  if (!user.value?.uid) {
    caretakerStore.error = 'Login required.';
    return;
  }

  const requiredFields = [
    form.hostelName,
    form.selectedUniversity,
    form.selectedLocation,
    form.caretakerPhoneNumber,
    form.rent,
    form.deposit,
    form.hostelType,
  ];

  if (requiredFields.includes('') || requiredFields.includes(null)) {
    caretakerStore.error = 'All fields are required.';
    return;
  }

  if (!form.imageFiles.length) {
    caretakerStore.error = 'Please upload at least one image.';
    return;
  }

  try {
    await caretakerStore.addHostel(
      user.value.uid,
      form.selectedUniversity,
      form.selectedLocation,
      form.hostelName,
      form.caretakerPhoneNumber,
      form.rent,
      form.deposit,
      form.hostelType,
      form.imageFiles,
      form.availableRooms
    );

    if (!caretakerStore.error) {
      caretakerStore.addHostelSuccess = true;
      resetForm();
      currentView.value = 'hostelList';
    }
  } catch (err) {
    caretakerStore.error = 'An unexpected error occurred.';
    console.error(err);
  }
};

const resetForm = () => {
  form.hostelName = '';
  form.selectedUniversity = '';
  form.selectedLocation = '';
  form.caretakerPhoneNumber = '';
  form.rent = null;
  form.deposit = null;
  form.hostelType = '';
  form.availableRooms = null;
  form.imageFiles = [];
  caretakerStore.error = null;
  caretakerStore.addHostelSuccess = false;
  if (fileInput.value) fileInput.value.value = '';
  locations.value = [];
};

// ✅ Edit a Hostel (open modal and populate)
const editHostel = (hostel) => {
  editingHostel.value = { ...hostel };
  editingImageFiles.value = [];
  showEditHostelModal.value = true;
};

// ✅ Save changes from Edit Modal
const submitEditHostelForm = async () => {
  caretakerStore.error = null;

  if (!user.value?.uid || !editingHostel.value) return;

  const required = [
    editingHostel.value.name,
    editingHostel.value.caretakerPhoneNumber,
    editingHostel.value.price,
    editingHostel.value.deposit,
    editingHostel.value.hostelType,
    editingHostel.value.availableRooms,
  ];

  if (required.includes('') || required.includes(null)) {
    caretakerStore.error = 'All fields are required to edit hostel.';
    return;
  }

  try {
await caretakerStore.updateHostel(
  user.value.uid, // ✅ Fix: add the missing caretakerUid
  editingHostel.value.universityId,
  editingHostel.value.locationId,
  editingHostel.value.id,
  {
    ...editingHostel.value,
    updatedAt: new Date(),
    ...(editingImageFiles.value.length > 0 && { imageFiles: editingImageFiles.value })
  }
);

    showEditHostelModal.value = false;
    editingHostel.value = null;
    await caretakerStore.fetchCaretakerHostels(user.value.uid);
  } catch (err) {
    caretakerStore.error = 'Failed to update hostel.';
    console.error(err);
  }
};

const cancelEdit = () => {
  showEditHostelModal.value = false;
  editingHostel.value = null;
};

// ✅ Delete Hostel
const deleteHostel = async (hostel) => {
  if (!confirm('Are you sure you want to delete this hostel?')) return;

  try {
    await caretakerStore.deleteHostel(
      user.value.uid,              
      hostel.universityId,
      hostel.locationId,
      hostel.id,
      hostel.imageUrls || []        // ✅ optional image URLs for later use
    );
    await caretakerStore.fetchCaretakerHostels(user.value.uid);
  } catch (err) {
    caretakerStore.error = 'Failed to delete hostel.';
    console.error(err);
  }
};


// ✅ Toggle Availability
const toggleAvailability = async (hostel) => {
  try {
    await caretakerStore.updateHostel(
      user.value.uid,               // ✅ caretakerUid
      hostel.universityId,
      hostel.locationId,
      hostel.id,
      {
        ...hostel,
        isAvailable: !hostel.isAvailable
      }
    );
    await caretakerStore.fetchCaretakerHostels(user.value.uid);
  } catch (err) {
    caretakerStore.error = 'Failed to update availability.';
    console.error(err);
  }
};


// 🔁 Lifecycle
onMounted(async () => {
  if (!authStore.user) {
    await new Promise(resolve => {
      const unsub = getAuth().onAuthStateChanged(user => {
        if (user) authStore.setUser(user);
        else authStore.clearUser();
        unsub();
        resolve();
      });
    });
  }

  if (user.value?.uid) {
    await universityStore.fetchUniversities();
    await universityStore.fetchAllLocations();
    await caretakerStore.setupCaretakerProfile(
      user.value.uid,
      user.value.email,
      user.value.name || user.value.displayName || '',
      user.value.phoneNumber || ''
    );
    await caretakerStore.fetchCaretakerHostels(user.value.uid);
  }
});
</script>

<style>
/* Add a subtle fade-in animation for overall content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Animations for floating elements */
@keyframes float1 {
  0% { transform: translate(-25%, -25%) rotate(0deg); }
  50% { transform: translate(-30%, -35%) rotate(5deg); }
  100% { transform: translate(-25%, -25%) rotate(0deg); }
}

@keyframes float2 {
  0% { transform: translate(25%, 25%) rotate(0deg); }
  50% { transform: translate(30%, 35%) rotate(-5deg); }
  100% { transform: translate(25%, 25%) rotate(0deg); }
}

@keyframes float3 {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  50% { transform: translate(-55%, -45%) rotate(8deg); }
  100% { transform: translate(-50%, -50%) rotate(0deg); }
}

.animate-float-1 {
  animation: float1 15s ease-in-out infinite;
}

.animate-float-2 {
  animation: float2 18s ease-in-out infinite reverse;
}

.animate-float-3 {
  animation: float3 12s ease-in-out infinite;
}

/* Custom scrollbar for image gallery */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--tw-scrollbar-thumb) var(--tw-scrollbar-track);
}

.scrollbar-thin::-webkit-scrollbar {
  height: 8px; /* For horizontal scrollbar */
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--tw-scrollbar-thumb);
  border-radius: 10px;
  border: 2px solid var(--tw-scrollbar-track);
}

.scrollbar-thin::-webkit-scrollbar-track {
  background-color: var(--tw-scrollbar-track);
  border-radius: 10px;
}

/* Tailwind JIT or custom CSS variables for scrollbar colors */
:root {
  --tw-scrollbar-thumb: theme('colors.gray.300');
  --tw-scrollbar-track: theme('colors.gray.100');
}
.dark {
  --tw-scrollbar-thumb: theme('colors.neutral.700');
  --tw-scrollbar-track: theme('colors.neutral.800');
}
</style>