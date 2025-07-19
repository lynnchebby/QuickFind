<template>
  <div class="overflow-hidden">
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
        <h1 class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">
          QuickFind
        </h1>
        <h2 v-if="user && user.displayName" class="text-3xl lg:text-4xl text-gray-800 font-bold dark:text-neutral-200">
          More than one Apartment? We’ve got you covered, {{ user.displayName }}!
        </h2>
      </div>
      <div class="mb-8 flex justify-center gap-4">
        <button
          @click="currentView = 'hostelList'"
          :class="{
            'bg-blue-600 text-white': currentView === 'hostelList',
            'bg-gray-200 text-gray-800 hover:bg-gray-300': currentView !== 'hostelList'
          }"
          class="py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          My Hostels
        </button>
        <button
          @click="currentView = 'addHostelForm'"
          :class="{
            'bg-blue-600 text-white': currentView === 'addHostelForm',
            'bg-gray-200 text-gray-800 hover:bg-gray-300': currentView !== 'addHostelForm'
          }"
          class="py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Add New Hostel
        </button>
      </div>
      <div v-if="caretakerStore.loading || universityStore.loading" class="text-center text-blue-600 dark:text-blue-400 my-4">
        Loading...
      </div>
      <div v-if="caretakerStore.error || universityStore.error" class="text-center text-red-600 dark:text-red-400 my-4">
        Error: {{ caretakerStore.error || universityStore.error }}
      </div>

      <div v-if="currentView === 'hostelList'" class="relative xl:w-10/12 xl:mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div v-if="!caretakerStore.loading && caretakerStore.hostels.length === 0 && user" class="lg:col-span-2 text-center text-gray-500 dark:text-neutral-500 p-8 border rounded-xl bg-white dark:bg-neutral-900">
            No hostels found. Click "Add New Hostel" to get started!
          </div>
          <div v-else-if="!user" class="lg:col-span-2 text-center text-gray-500 dark:text-neutral-500 p-8 border rounded-xl bg-white dark:bg-neutral-900">
            Please log in to view and manage your hostels.
          </div>

          <div v-for="hostel in caretakerStore.hostels" :key="hostel.id">
            <div
              class="p-4 relative z-10 bg-white border rounded-xl md:p-10 dark:bg-neutral-900 dark:border-neutral-800"
            >
              <h3 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
                {{ hostel.name }}
              </h3>
              <div class="text-sm text-gray-500 dark:text-neutral-500">
                {{ hostel.hostelType }} apartment
              </div>

              <div class="mt-5 flex gap-2 overflow-x-auto p-2 border-t border-b border-gray-200 dark:border-neutral-700">
                <img
                  v-for="(imageUrl, index) in hostel.imageUrls"
                  :key="index"
                  :src="imageUrl"
                  alt="Hostel Image"
                  class="h-24 w-24 object-cover rounded-lg shadow-sm"
                />
                <span v-if="hostel.imageUrls && hostel.imageUrls.length === 0" class="text-gray-400 text-sm">No images available</span>
              </div>

              <div class="mt-5">
                <span class="text-6xl font-bold text-gray-800 dark:text-neutral-200">{{
                  hostel.price
                }}</span>
                <span class="ms-3 text-gray-500 dark:text-neutral-500">ksh / monthly</span>
              </div>

              <div
                class="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0"
              >
                <ul class="space-y-2 text-sm sm:text-base">
                  <li class="flex gap-x-3 items-center">
                    <CheckIcon />
                    <span class="text-gray-800 dark:text-neutral-200">
                      ksh {{ hostel.deposit }} deposit
                    </span>
                  </li>
                  <li class="flex gap-x-3 items-center">
                    <CheckIcon />
                    <span class="text-gray-800 dark:text-neutral-200">
                      Location: {{ hostel.locationId }}
                    </span>
                  </li>
                </ul>
                <ul class="space-y-2 text-sm sm:text-base">
                  <li class="flex gap-x-3 items-center">
                    <CheckIcon />
                    <span class="text-gray-800 dark:text-neutral-200">
                      University: {{ hostel.universityId }}
                    </span>
                  </li>
                  <li class="flex gap-x-3 items-center">
                    <CheckIcon />
                    <span class="text-gray-800 dark:text-neutral-200">
                      Contact: {{ hostel.caretakerPhoneNumber }}
                    </span>
                  </li>
                </ul>
              </div>

              <div class="mt-5 flex justify-end">
                <button
                  @click="toggleAvailability(hostel)"
                  :class="{
                    'bg-green-600 hover:bg-green-700': hostel.isAvailable,
                    'bg-red-600 hover:bg-red-700': !hostel.isAvailable
                  }"
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  Mark as {{ hostel.isAvailable ? 'Not Available' : 'Available' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden md:block absolute top-0 end-0 translate-y-16 translate-x-16">
          <svg class="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
            <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
            <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="hidden md:block absolute bottom-0 start-0 translate-y-16 -translate-x-16">
          <svg class="w-56 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div v-if="currentView === 'addHostelForm'" class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <form @submit.prevent="submitHostelForm" class="bg-white rounded-xl shadow dark:bg-neutral-900 p-7">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-6">Add New Apartment Hostel</h2>

          <div class="grid sm:grid-cols-12 gap-4 sm:gap-6">
            

            <div class="sm:col-span-3">
              <label for="university-select" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                University
              </label>
            </div>
            <div class="sm:col-span-9">
              <select
                id="university-select"
                v-model="form.selectedUniversity"
                @change="fetchLocationsForUniversity"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                required
              >
                <option value="" disabled>Select University</option>
                <option v-for="uni in universityStore.universities" :key="uni.id" :value="uni.id">
                  {{ uni.name }}
                </option>
              </select>
            </div>

            <div class="sm:col-span-3">
              <label for="location-select" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Location
              </label>
            </div>
            <div class="sm:col-span-9">
              <select
                id="location-select"
                v-model="form.selectedLocation"
                :disabled="locations.length === 0"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                required
              >
                <option value="" disabled>Select Location</option>
                <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                  {{ loc.name }}
                </option>
              </select>
            </div>
<div class="sm:col-span-3">
              <label for="hostel-name" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Hostel Name
              </label>
            </div>
            <div class="sm:col-span-9">
              <input
                id="hostel-name"
                type="text"
                v-model="form.hostelName"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                required
              />
            </div>
            <div class="sm:col-span-3">
              <label for="caretaker-phone-number" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Hostel Contact Number
              </label>
            </div>
            <div class="sm:col-span-9">
              <input
                id="caretaker-phone-number"
                type="text"
                v-model="form.caretakerPhoneNumber"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                placeholder="+x(xxx)xxx-xx-xx"
                required
              />
            </div>

            <div class="sm:col-span-3">
              <label for="rent" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Rent (Ksh)
              </label>
            </div>
            <div class="sm:col-span-9">
              <input
                id="rent"
                type="number"
                v-model.number="form.rent"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                required
              />
            </div>

            <div class="sm:col-span-3">
              <label for="deposit" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Deposit (Ksh)
              </label>
            </div>
            <div class="sm:col-span-9">
              <input
                id="deposit"
                type="number"
                v-model.number="form.deposit"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                required
              />
            </div>

            <div class="sm:col-span-3">
              <label for="hostel-type" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Hostel Type
              </label>
            </div>
            <div class="sm:col-span-9">
              <select
                id="hostel-type"
                v-model="form.hostelType"
                class="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="Bedsitter">Bedsitter</option>
                <option value="One bedroom">One bedroom</option>
                <option value="Two bedRoom">Two bedRoom</option>
              </select>
            </div>

            <div class="sm:col-span-full">
              <label class="inline-block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-2">
                Upload Images (Max 3)
              </label>
              <div
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="handleFileDrop"
                @click="triggerFileInput"
                :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': isDragging }"
                class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileInputChange"
                  accept="image/*"
                  multiple="multiple" class="hidden"
                />
                <svg
                  class="w-10 h-10 text-gray-400 dark:text-neutral-500 mb-3"
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
                <p class="mb-2 text-sm text-gray-500 dark:text-neutral-400">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-neutral-400">
                  PNG, JPG, GIF (Max 3 files)
                </p>
                <div v-if="form.imageFiles && form.imageFiles.length > 0" class="mt-3 text-sm text-gray-700 dark:text-neutral-300 flex flex-wrap gap-2 justify-center">
                  <div v-for="(file, index) in form.imageFiles" :key="index" class="flex items-center gap-1 p-1 border rounded-md">
                    <span>{{ file.name }}</span>
                    <button type="button" @click.stop="removeImage(index)" class="text-red-500 hover:text-red-700 text-xs">
                        &times;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-x-2">
            <button
              type="button"
              @click="resetForm"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="caretakerStore.loading || universityStore.loading"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              <span v-if="caretakerStore.loading || universityStore.loading">Adding...</span>
              <span v-else>Finish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useCaretakerStore } from '../../stores/caretakerStore';
import { useUniversityStore } from '../../stores/universityStore'; // Ensure this is correct

// Icons
import CheckIcon from '@/components/icons/CheckIcon.vue';

const authStore = useAuthStore();
const caretakerStore = useCaretakerStore();
const universityStore = useUniversityStore();

const user = ref(authStore.user);
const currentView = ref('hostelList');

const form = reactive({
  hostelName: '',
  selectedUniversity: '',
  selectedLocation: '',
  caretakerPhoneNumber: '',
  rent: 0,
  deposit: 0,
  hostelType: '',
  imageFiles: [] // <--- CHANGED: Now an array to hold multiple File objects
});

const locations = ref([]);
const isDragging = ref(false);
const fileInput = ref(null);

watch(() => authStore.user, async (newUser) => {
  user.value = newUser;
  if (newUser && newUser.uid) {
    await caretakerStore.setupCaretakerProfile(newUser.uid, newUser.email, newUser.displayName || '', '');
    await caretakerStore.fetchCaretakerHostels(newUser.uid);
  } else {
    caretakerStore.hostels = [];
    caretakerStore.caretakerProfile = null;
    caretakerStore.error = 'Please log in to view and manage hostels.';
  }
}, { immediate: true });

// --- Form Actions ---

const fetchLocationsForUniversity = async () => {
  form.selectedLocation = '';
  locations.value = [];
  if (form.selectedUniversity) {
    try {
      const fetchedLocations = await universityStore.getLocations(form.selectedUniversity);
      locations.value = fetchedLocations;
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
};

/**
 * Handles file drop event for drag-and-drop upload.
 * Limits to a maximum of 3 files.
 */
const handleFileDrop = (event) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'));
  appendFiles(files);
};

/**
 * Handles file selection via the hidden file input.
 * Limits to a maximum of 3 files.
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
  const currentCount = form.imageFiles.length;
  const filesToAdd = 3 - currentCount; // How many more files can be added

  if (filesToAdd > 0) {
    const filesToProcess = newFiles.slice(0, filesToAdd);
    form.imageFiles = [...form.imageFiles, ...filesToProcess];
  } else {
    alert('You can only upload a maximum of 3 images.');
  }

  // Clear the file input's value so the same file can be selected again if needed
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
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const submitHostelForm = async () => {
  if (!user.value || !user.value.uid) {
    caretakerStore.error = 'User not authenticated or UID not found.';
    return;
  }
  if (!form.imageFiles || form.imageFiles.length === 0) { // <--- CHANGED: Check imageFiles array
    caretakerStore.error = 'Please select at least one image file.';
    return;
  }

  await caretakerStore.addHostel(
    user.value.uid,
    form.selectedUniversity,
    form.selectedLocation,
    form.hostelName,
    form.caretakerPhoneNumber,
    form.rent,
    form.deposit,
    form.hostelType,
    form.imageFiles // <--- CHANGED: Pass the array of files
  );

  if (!caretakerStore.error) {
    resetForm();
    currentView.value = 'hostelList';
  }
};

const resetForm = () => {
  form.hostelName = '';
  form.selectedUniversity = '';
  form.selectedLocation = '';
  form.caretakerPhoneNumber = '';
  form.rent = 0;
  form.deposit = 0;
  form.hostelType = '';
  form.imageFiles = []; // <--- CHANGED: Reset imageFiles array
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  locations.value = [];
};

// --- Hostel List Actions ---

const toggleAvailability = async (hostel) => {
  if (!user.value || !user.value.uid) {
    caretakerStore.error = 'User not authenticated.';
    return;
  }
  await caretakerStore.toggleHostelAvailability(
    user.value.uid,
    hostel.id,
    hostel.isAvailable
  );
};

onMounted(async () => {
  await universityStore.fetchUniversities();
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>