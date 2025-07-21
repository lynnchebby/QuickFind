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

      <!-- Custom Message Display (Add this near the top of your <template> for global messages) -->
      <div v-if="showMessage" :class="{ 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400': messageType === 'success', 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400': messageType === 'error' }"
           class="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg text-center transition-all duration-300 ease-out"
           style="min-width: 300px;">
        {{ messageText }}
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
                        @click="deleteHostel(hostel.universityId, hostel.locationId, hostel.id)"
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

    <!-- Custom Confirmation Modal -->
    <div v-if="showConfirmationModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-sm w-full p-6 sm:p-8 relative text-center">
        <h3 class="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-4">Confirm Action</h3>
        <p class="text-gray-700 dark:text-neutral-300 mb-6">{{ confirmationMessage }}</p>
        <div class="flex justify-center gap-4">
          <button type="button" @click="cancelConfirmedAction"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600 transition-all duration-200">
            Cancel
          </button>
          <button type="button" @click="executeConfirmedAction"
                  class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all duration-200">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Hostel Edit Modal -->
    <div v-if="showEditHostelModal" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-40 p-4">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-lg w-full p-6 sm:p-8 relative">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-6 text-center">Edit Hostel</h3>

        <form @submit.prevent="submitEditHostelForm" class="space-y-4">
          <div>
            <label for="editHostelName" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Hostel Name</label>
            <input type="text" id="editHostelName" v-model="editingHostel.name"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                   required>
          </div>

          <div>
            <label for="editPhoneNumber" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Caretaker Phone Number</label>
            <input type="text" id="editPhoneNumber" v-model="editingHostel.caretakerPhoneNumber"
                   class="py-2 px-3 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                   required>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="editRent" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Rent</label>
              <input type="number" id="editRent" v-model.number="editingHostel.price"
                     class="py-2 px-3 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                     required min="1">
            </div>
            <div>
              <label for="editDeposit" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Deposit</label>
              <input type="number" id="editDeposit" v-model.number="editingHostel.deposit"
                     class="py-2 px-3 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                     required min="0">
            </div>
          </div>

          <div>
            <label for="editHostelType" class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Hostel Type</label>
            <select id="editHostelType" v-model="editingHostel.hostelType"
                    class="py-2 px-3 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200"
                    required>
              <option value="">Select Type</option>
              <option value="Bedsitter">Bedsitter</option>
              <option value="One Bedroom">One Bedroom</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <input type="checkbox" id="editIsAvailable" v-model="editingHostel.isAvailable"
                   class="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
            <label for="editIsAvailable" class="text-sm text-gray-700 dark:text-neutral-300">Is Available</label>
          </div>

          <!-- Image Upload for Edit (Simplified - you'll need to expand this) -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Current Images:</label>
            <div v-if="editingHostel.imageUrls && editingHostel.imageUrls.length > 0" class="flex flex-wrap gap-2">
              <img v-for="(url, index) in editingHostel.imageUrls" :key="index" :src="url"
                   class="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-neutral-600"
                   alt="Hostel Image">
            </div>
            <p v-else class="text-sm text-gray-500 dark:text-neutral-400">No current images.</p>
            <p class="text-sm text-red-500 mt-2">
              *Image re-upload/management during edit is not fully implemented in this example.
              You would add input for new images here and handle their upload/replacement logic.
            </p>
          </div>


          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="cancelEdit"
                    class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600 transition-all duration-200">
              Cancel
            </button>
            <button type="submit"
                    class="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all duration-200">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useCaretakerStore } from '../../stores/caretakerStore';
import { useUniversityStore } from '../../stores/universityStore';
import { getAuth } from 'firebase/auth'; // Import getAuth for onAuthStateChanged listener

// Icons
import CheckIcon from '@/components/icons/CheckIcon.vue';
// Import ImageViewerModal (assuming you have this component)
import ImageViewerModal from '@/components/ImageViewerModal.vue';

const authStore = useAuthStore();
const caretakerStore = useCaretakerStore();
const universityStore = useUniversityStore();
const router = useRouter();

const user = computed(() => authStore.user);

const currentView = ref('hostelList');

// Reactive form data for adding new hostels
const form = reactive({
  hostelName: '',
  selectedUniversity: '',
  selectedLocation: '',
  caretakerPhoneNumber: '',
  rent: null,
  deposit: null,
  hostelType: '',
  imageFiles: []
});

// Reactive state for managing locations in the form dropdown
const locations = ref([]);
const isDragging = ref(false); // State for drag-and-drop
const fileInput = ref(null); // Ref to the hidden file input element

// Reactive state for the image viewer modal
const showImageViewer = ref(false);
const currentImageUrl = ref('');

// Reactive state for edit modal
const showEditHostelModal = ref(false);
const editingHostel = reactive({
  id: '',
  name: '',
  universityId: '',
  locationId: '',
  caretakerPhoneNumber: '',
  price: null, // Renamed from rent in interface, ensure consistency
  deposit: null,
  hostelType: '',
  imageUrls: [],
  isAvailable: false,
  caretakerUid: ''
});
const newImageFilesForEdit = ref([]); // To hold new image files during edit

// Reactive state for custom alerts/messages
const showMessage = ref(false);
const messageText = ref('');
const messageType = ref('success'); // 'success' or 'error'

// --- Message Display Functions ---
const displayMessage = (text, type = 'success') => {
  messageText.value = text;
  messageType.value = type;
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
    messageText.value = '';
  }, 3000); // Message disappears after 3 seconds
};

// --- Image Viewer Functions ---
const openImageViewer = (imageUrl) => {
  currentImageUrl.value = imageUrl;
  showImageViewer.value = true;
};

// --- Helper Functions ---

/**
 * Retrieves the name of a place (university or location) from its ID.
 * @param {string} id - The ID of the place.
 * @param {Array} list - The list of places (e.g., universityStore.universities or universityStore.allLocations).
 * @returns {string} The name of the place, or 'Unknown'/'Loading...' if not found/loaded.
 */
const getPlaceName = (id, list) => {
  if (!Array.isArray(list)) {
    return 'Loading...'; // Placeholder while data is loading
  }
  const item = list.find(item => item.id === id);
  return item ? item.name : 'Unknown';
};


// --- Form Actions ---

/**
 * Fetches locations associated with the selected university for the form.
 */
const fetchLocationsForUniversity = async () => {
  form.selectedLocation = ''; // Reset selected location
  locations.value = []; // Clear current locations
  if (form.selectedUniversity) {
    try {
      const fetchedLocations = await universityStore.getLocations(form.selectedUniversity);
      locations.value = fetchedLocations;
    } catch (error) {
      console.error('Error fetching locations for form:', error);
      universityStore.error = 'Failed to fetch locations for selected university.';
    }
  }
};

/**
 * Handles file drop event for drag-and-drop upload.
 * Limits to a maximum of 3 files.
 * @param {Event} event - The drag event.
 */
const handleFileDrop = (event) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'));
  appendFiles(files);
};

/**
 * Handles file selection via the hidden file input.
 * Limits to a maximum of 3 files.
 * @param {Event} event - The change event from the file input.
 */
const handleFileInputChange = (event) => {
  const files = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
  appendFiles(files);
};

/**
 * Helper to append files to the form.imageFiles array,
 * respecting the max limit of 3.
 * @param {File[]} newFiles - Array of files to append.
 */
const appendFiles = (newFiles) => {
  const maxFiles = 3;
  const currentCount = form.imageFiles.length;
  const filesToAddCount = Math.min(newFiles.length, maxFiles - currentCount);

  if (filesToAddCount > 0) {
    const filesToProcess = newFiles.slice(0, filesToAddCount);
    form.imageFiles = [...form.imageFiles, ...filesToProcess];
  } else if (newFiles.length > 0) {
    displayMessage(`You can only upload a maximum of ${maxFiles} images.`, 'error');
  }

  // Clear the file input value to allow selecting the same file(s) again
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

/**
 * Removes an image from the selection by its index.
 * @param {number} index - The index of the file to remove.
 */
const removeImage = (index) => {
  form.imageFiles.splice(index, 1);
  caretakerStore.error = null; // Clear error if files are removed
};

/**
 * Triggers a click on the hidden file input element.
 */
const triggerFileInput = () => {
  fileInput.value.click();
};

/**
 * Submits the new hostel form data to the caretaker store.
 */
const submitHostelForm = async () => {
  caretakerStore.error = null; // Clear previous errors
  caretakerStore.addHostelSuccess = false; // Reset success state
  showMessage.value = false; // Clear any existing messages

  if (!user.value || !user.value.uid) {
    displayMessage('User not authenticated or UID not found. Please log in.', 'error');
    console.error('Submit error: User not authenticated.');
    return;
  }
  if (!form.imageFiles || form.imageFiles.length === 0) {
    displayMessage('Please select at least one image file.', 'error');
    console.error('Submit error: No image files.');
    return;
  }
  if (!form.hostelName || !form.selectedUniversity || !form.selectedLocation ||
      !form.caretakerPhoneNumber || form.rent === null || form.deposit === null || !form.hostelType) {
    displayMessage('Please fill in all required form fields.', 'error');
    return;
  }
  if (form.rent <= 0 || form.deposit <= 0) {
    displayMessage('Rent and deposit must be greater than zero.', 'error');
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
      form.imageFiles
    );

    if (!caretakerStore.error) { // Check store's error state after action
      displayMessage('Hostel added successfully!', 'success');
      resetForm();
      // Optional: switch to hostel list view after successful addition
      currentView.value = 'hostelList';
    } else {
      displayMessage(caretakerStore.error, 'error'); // Display error from store
    }

  } catch (err) {
    console.error('Error during hostel submission:', err);
    if (!caretakerStore.error) { // Only set generic error if not already set by store
        displayMessage('An unexpected error occurred during submission.', 'error');
    }
  }
};

/**
 * Resets the add hostel form to its initial state.
 */
const resetForm = () => {
  form.hostelName = '';
  form.selectedUniversity = '';
  form.selectedLocation = '';
  form.caretakerPhoneNumber = '';
  form.rent = null;
  form.deposit = null;
  form.hostelType = '';
  form.imageFiles = [];
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  locations.value = [];
  caretakerStore.error = null; // Clear form errors
  caretakerStore.addHostelSuccess = false; // Clear success message
};

// --- Hostel List Actions ---

/**
 * Toggles the availability status of a hostel.
 * @param {Object} hostel - The hostel object to toggle.
 */
const toggleAvailability = async (hostel) => {
  caretakerStore.error = null; // Clear previous errors
  if (!user.value || !user.value.uid) {
    displayMessage('User not authenticated.', 'error');
    return;
  }
  try {
    await caretakerStore.toggleHostelAvailability(
      user.value.uid,
      hostel.id,
      hostel.isAvailable, // Pass current availability
      hostel.universityId,
      hostel.locationId
    );
    if (!caretakerStore.error) {
      displayMessage('Hostel availability updated!', 'success');
    } else {
      displayMessage(caretakerStore.error, 'error');
    }
  } catch (err) {
    console.error('Error toggling availability:', err);
    if (!caretakerStore.error) {
      displayMessage('Failed to update hostel availability.', 'error');
    }
  }
};

/**
 * Initiates the editing process for a hostel by opening a modal.
 * @param {Object} hostel - The hostel object to edit.
 */
const editHostel = (hostel) => {
   console.log('--- EDIT HOSTEL DEBUG ---');
  console.log('Logged-in User UID:', user.value ? user.value.uid : 'Not logged in');
  console.log('Hostel to edit:', hostel);
  console.log('Hostel caretakerUid:', hostel.caretakerUid);
  console.log('Match check (user UID === hostel caretakerUid):', user.value && user.value.uid === hostel.caretakerUid);
  console.log('-------------------------');
  // Populate the reactive editingHostel object with current hostel data
  // Ensure all fields match the interface and are correctly assigned
  Object.assign(editingHostel, {
    id: hostel.id,
    name: hostel.name,
    universityId: hostel.universityId,
    locationId: hostel.locationId,
    caretakerPhoneNumber: hostel.caretakerPhoneNumber,
    price: hostel.price, // Use 'price' as per your Hostel interface
    deposit: hostel.deposit,
    hostelType: hostel.hostelType,
    imageUrls: [...hostel.imageUrls], // Clone array to prevent direct mutation
    isAvailable: hostel.isAvailable,
    caretakerUid: hostel.caretakerUid // Crucial for permission checks
  });
  newImageFilesForEdit.value = []; // Clear any previously selected new image files
  showEditHostelModal.value = true; // Show the edit modal
};

/**
 * Handles the submission of the edit hostel form from the modal.
 */
const submitEditHostelForm = async () => {
  caretakerStore.error = null;
  showMessage.value = false;

  if (!user.value || !user.value.uid) {
    displayMessage('User not authenticated for editing.', 'error');
    return;
  }
  if (!editingHostel.name || !editingHostel.caretakerPhoneNumber || editingHostel.price === null || editingHostel.deposit === null || !editingHostel.hostelType) {
    displayMessage('Please fill in all required fields for editing.', 'error');
    return;
  }
  if (editingHostel.price <= 0 || editingHostel.deposit <= 0) {
    displayMessage('Rent and deposit must be greater than zero.', 'error');
    return;
  }

  try {
    // --- Image Handling for Edit (Placeholder) ---
    // This is where you'd implement logic to upload new images,
    // delete old ones, and update the imageUrls array in editingHostel.imageUrls.
    // For now, we'll proceed with updating other fields.
    if (newImageFilesForEdit.value.length > 0) {
      displayMessage('New image upload for editing is not fully implemented in this example. Images will not be updated.', 'error');
      // A more complete solution would involve:
      // 1. Uploading newImageFilesForEdit to Cloudinary.
      // 2. Getting the new URLs.
      // 3. Merging/replacing these with editingHostel.imageUrls.
      // 4. (Backend) Deleting old images from Cloudinary if they are no longer needed.
    }
    // --- End Image Handling Placeholder ---

    const dataToUpdate = {
      name: editingHostel.name,
      caretakerPhoneNumber: editingHostel.caretakerPhoneNumber,
      price: editingHostel.price,
      deposit: editingHostel.deposit,
      hostelType: editingHostel.hostelType,
      isAvailable: editingHostel.isAvailable,
      // If images were handled above, you'd include:
      // imageUrls: editingHostel.imageUrls,
    };

    await caretakerStore.updateHostel(
      user.value.uid,
      editingHostel.id,
      editingHostel.universityId,
      editingHostel.locationId,
      dataToUpdate
    );

    if (!caretakerStore.error) {
      displayMessage('Hostel updated successfully!', 'success');
      showEditHostelModal.value = false; // Close modal on success
    } else {
      displayMessage(caretakerStore.error, 'error');
    }

  } catch (err) {
    console.error('Error during hostel update:', err);
    displayMessage(`Failed to update hostel: ${err.message || 'An unknown error occurred.'}`, 'error');
  }
};

const cancelEdit = () => {
  showEditHostelModal.value = false;
  newImageFilesForEdit.value = []; // Clear new image files on cancel
};


/**
 * Deletes a hostel after user confirmation.
 * @param {string} universityId - The ID of the university the hostel belongs to.
 * @param {string} locationId - The ID of the location the hostel belongs to.
 * @param {string} hostelId - The ID of the hostel to delete.
 */
const deleteHostel = async (universityId, locationId, hostelId) => {
  caretakerStore.error = null; // Clear previous errors
  showMessage.value = false; // Clear any existing messages

  if (!user.value || !user.value.uid) {
    displayMessage('You must be logged in to delete hostels.', 'error');
    return;
  }

  const hostelToDelete = caretakerStore.hostels.find(h => h.id === hostelId);
  console.log('--- DELETE HOSTEL DEBUG ---');
  console.log('Logged-in User UID:', user.value.uid);
  console.log('Hostel to delete:', hostelToDelete);
  console.log('Hostel caretakerUid:', hostelToDelete ? hostelToDelete.caretakerUid : 'N/A');
  console.log('Match check (user UID === hostel caretakerUid):', hostelToDelete && user.value.uid === hostelToDelete.caretakerUid);
  console.log('---------------------------');

  if (!hostelToDelete) {
    displayMessage('Hostel not found in your list.', 'error');
    return;
  }

  // Client-side check for ownership
  if (user.value.uid !== hostelToDelete.caretakerUid) {
    displayMessage('You do not own this hostel and cannot delete it.', 'error');
    return;
  }

  // Custom confirmation message (replace with a modal for better UX)
  // IMPORTANT: window.confirm will not show in Canvas iframe. Replace with custom modal.
  const confirmed = window.confirm(`Are you sure you want to delete "${hostelToDelete.name}"? This action cannot be undone.`);
  if (!confirmed) {
    return;
  }

  try {
    await caretakerStore.deleteHostel(
      user.value.uid,
      universityId,
      locationId,
      hostelId,
      hostelToDelete.imageUrls // Pass image URLs for potential Cloudinary deletion (though handled server-side)
    );
    if (!caretakerStore.error) {
      displayMessage('Hostel deleted successfully!', 'success');
    } else {
      displayMessage(caretakerStore.error, 'error');
    }
  } catch (error) {
    console.error('Error deleting hostel:', error);
    displayMessage(`Failed to delete hostel: ${error.message || 'An unknown error occurred.'}`, 'error');
  }
};


// --- Lifecycle Hook for Initial Data Fetch ---
onMounted(async () => {
  // Ensure user is loaded before fetching caretaker-specific data
  if (!authStore.user) {
    // Wait for auth state to be resolved if it's still loading
    await new Promise(resolve => {
      const unsubscribe = getAuth().onAuthStateChanged(user => {
        if (user) {
          authStore.setUser(user); // Manually set user if not already set by Pinia listener
        } else {
          authStore.clearUser();
        }
        unsubscribe(); // Stop listening after first state
        resolve();
      });
    });
  }

  // Fetch initial data only if user is logged in
  if (user.value && user.value.uid) {
    await universityStore.fetchUniversities();
    await universityStore.fetchAllLocations(); // Fetch all locations for display

    await caretakerStore.setupCaretakerProfile(user.value.uid, user.value.email, user.value.displayName || '', user.value.phoneNumber || '');
    await caretakerStore.fetchCaretakerHostels(user.value.uid);
  }
});
</script>


<style >
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