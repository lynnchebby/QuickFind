<template>
  <div class="admin-dashboard-wrapper">
    <div class="admin-dashboard-waves"></div>
    <div class="admin-dashboard container mx-auto p-6 min-h-screen relative z-10">
      <h1 class="text-3xl font-bold mb-8 text-center text-white">Admin Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CardItem
          v-for="(card, index) in statsCards"
          :key="index"
          :title="card.title"
          :value="card.value"
          :icon="card.icon"
          class="bg-gray-800 text-white shadow-lg rounded-lg p-4"
        />
      </div>

      <hr class="my-8 border-gray-600" />

      <div class="bg-white p-6 rounded-lg shadow-xl mb-8 text-gray-900">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">Manage Universities</h2>
          <button @click="toggleUniversityView" class="btn-primary">
            {{ showUniversityView ? 'Hide Universities' : 'View Universities' }}
          </button>
        </div>

        <div v-if="showUniversityView">
          <div class="flex items-center space-x-4 mb-4">
            <label for="university-select" class="font-medium text-gray-700">Choose a University:</label>
            <select
              id="university-select"
              v-model="selectedUniversityId"
              @change="selectUniversity(selectedUniversityId)"
              class="p-2 border border-gray-300 rounded-md shadow-sm flex-grow bg-white text-gray-900"
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
            <button @click="showAddUniversityInput = !showAddUniversityInput" class="btn-secondary">
              {{ showAddUniversityInput ? 'Cancel Add' : 'Add New' }}
            </button>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-700 mb-3">All Universities:</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="uni in universityStore.universities" :key="uni.id" class="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <span>{{ uni.name }}</span>
                <div class="space-x-2">
                  <button @click="editUniversity(uni.id, uni.name)" class="text-blue-600 hover:text-blue-800 text-lg" title="Edit University">✏️</button>
                  <button @click="deleteUniversity(uni.id, uni.name)" class="text-red-600 hover:text-red-800 text-lg" title="Delete University">🗑️</button>
                </div>
              </li>
              <li v-if="universityStore.universities.length === 0" class="text-gray-500">No universities found.</li>
            </ul>
          </div>

          <div v-if="showAddUniversityInput" class="mt-6 p-4 border border-gray-300 rounded-md bg-gray-100">
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Add New University</h3>
            <input
              type="text"
              v-model="newUniversityName"
              placeholder="New University Name"
              class="p-2 border border-gray-300 rounded-md w-full mb-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
            <button @click="submitNewUniversity" class="btn-success w-full">Add University</button>
            <p v-if="duplicateError" class="text-red-600 text-sm mt-2">
              University with this name already exists.
            </p>
            <p v-if="successMessage" class="text-green-600 text-sm mt-2">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <hr class="my-8 border-gray-600" />

      <div class="bg-white p-6 rounded-lg shadow-xl mb-8 text-gray-900">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">Manage Locations</h2>
          <button
            @click="toggleLocationView"
            class="btn-primary"
            :disabled="!selectedUniversityId"
          >
            {{ showLocationView ? 'Hide Locations' : 'View Locations' }}
          </button>
        </div>

        <p v-if="!selectedUniversityId && showLocationView" class="text-red-600 mb-4 text-sm">
          Please select a university first to manage locations.
        </p>

        <div v-if="showLocationView && selectedUniversityId">
          <div class="flex items-center space-x-4 mb-4">
            <label for="location-select" class="font-medium text-gray-700">Choose a Location:</label>
            <select
              id="location-select"
              v-model="locationId"
              @change="selectLocation(locationId)"
              class="p-2 border border-gray-300 rounded-md shadow-sm flex-grow bg-white text-gray-900"
            >
              <option value="">-- Select Location --</option>
              <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                {{ loc.name }}
              </option>
            </select>
            <button @click="showAddLocationInput = !showAddLocationInput" class="btn-secondary">
              {{ showAddLocationInput ? 'Cancel Add' : 'Add New' }}
            </button>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-700 mb-3">Locations for {{ getUniversityName(selectedUniversityId) }}:</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="loc in locations" :key="loc.id" class="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <span>{{ loc.name }}</span>
                <div class="space-x-2">
                  <button @click="editLocation(loc.id, loc.name)" class="text-blue-600 hover:text-blue-800 text-lg" title="Edit Location">✏️</button>
                  <button @click="deleteLocation(loc.id, loc.name)" class="text-red-600 hover:text-red-800 text-lg" title="Delete Location">🗑️</button>
                </div>
              </li>
              <li v-if="locations.length === 0" class="text-gray-500">No locations found for this university.</li>
            </ul>
          </div>

          <div v-if="showAddLocationInput" class="mt-6 p-4 border border-gray-300 rounded-md bg-gray-100">
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Add New Location for {{ getUniversityName(selectedUniversityId) }}</h3>
            <input
              type="text"
              v-model="newLocationName"
              placeholder="New Location Name"
              class="p-2 border border-gray-300 rounded-md w-full mb-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
            <button @click="submitNewLocation" class="btn-success w-full">Add Location</button>
            <p v-if="duplicateLocationError" class="text-red-600 text-sm mt-2">
              Location with this name already exists or fields are empty.
            </p>
            <p v-if="locationSuccessMessage" class="text-green-600 text-sm mt-2">{{ locationSuccessMessage }}</p>
          </div>
        </div>
      </div>

      <hr class="my-8 border-gray-600" />

      <div class="bg-white p-6 rounded-lg shadow-xl mb-8 text-gray-900">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">Manage Homes</h2>
          <button
            @click="toggleHomesView"
            class="btn-primary"
            :disabled="!selectedUniversityId || !locationId"
          >
            {{ showHomesView ? 'Hide Homes' : 'View Homes' }}
          </button>
        </div>

        <p v-if="(!selectedUniversityId || !locationId) && showHomesView" class="text-red-600 mb-4 text-sm">
          Please select a university and a location first to manage homes.
        </p>

        <div v-if="showHomesView && selectedUniversityId && locationId">
          <div class="flex items-center space-x-4 mb-4">
            <label for="home-select" class="font-medium text-gray-700">Choose a Home:</label>
            <select
              id="home-select"
              v-model="selectedHomeId"
              @change="selectHome(selectedHomeId)"
              class="p-2 border border-gray-300 rounded-md shadow-sm flex-grow bg-white text-gray-900"
            >
              <option value="">-- Select Home --</option>
              <option v-for="home in homes" :key="home.id" :value="home.id">
                {{ home.name || 'Unnamed Home' }}
              </option>
            </select>
            <button @click="showAddNewHomeInput = !showAddNewHomeInput" class="btn-secondary">
              {{ showAddNewHomeInput ? 'Cancel Add' : 'Add New' }}
            </button>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-700 mb-3">Homes for {{ getUniversityName(selectedUniversityId) }} - {{ getLocationName(locationId) }}:</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="home in homes" :key="home.id" class="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <span>{{ home.name || 'Unnamed Home' }}</span>
                <div class="space-x-2">
                  <button @click="editHome(home.id, home.name)" class="text-blue-600 hover:text-blue-800 text-lg" title="Edit Home">✏️</button>
                  <button @click="deleteHome(home.id, home.name)" class="text-red-600 hover:text-red-800 text-lg" title="Delete Home">🗑️</button>
                </div>
              </li>
              <li v-if="homes.length === 0" class="text-gray-500">No homes found for this location.</li>
            </ul>
          </div>

          <div v-if="showAddNewHomeInput" class="mt-6 p-4 border border-gray-300 rounded-md bg-gray-100">
            <h3 class="text-lg font-semibold mb-3 text-gray-700">Add New Home</h3>
            <input
              type="text"
              v-model="newHomeName"
              placeholder="New Home Name"
              class="p-2 border border-gray-300 rounded-md w-full mb-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
            <input
              type="text"
              v-model="newHomeAddress"
              placeholder="Home Address (Optional)"
              class="p-2 border border-gray-300 rounded-md w-full mb-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
            <input
              type="number"
              v-model.number="newHomeRooms"
              placeholder="Number of Rooms (Optional)"
              class="p-2 border border-gray-300 rounded-md w-full mb-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
            <button @click="addNewHome" class="btn-success w-full">Add Home</button>
            <p v-if="homeError" class="text-red-600 text-sm mt-2">{{ homeError }}</p>
            <p v-if="homeSuccessMessage" class="text-green-600 text-sm mt-2">{{ homeSuccessMessage }}</p>
          </div>
        </div>
      </div>

      <hr class="my-8 border-gray-600" />

      <div class="text-center mb-8">
        <button @click="downloadData" class="btn-info">Download All Data</button>
      </div>

      <div v-if="isLoading" class="text-center mt-8 text-blue-400 font-medium">Loading...</div>
      <div v-if="error" class="text-red-400 text-center mt-8 font-medium">{{ error }}</div>
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
const selectedUniversityForLocation = ref('')
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

const stats = ref({
  totalUsers: 0,
  sessions: 0,
  clickRate: 0,
  pageviews: 0
})

const filteredUniversities = computed(() => {
  if (!searchQuery.value) return universityStore.universities
  return universityStore.universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const statsCards = computed(() => [
  {
    title: 'Total users',
    value: stats.value.totalUsers.toLocaleString(),
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 2 0 0 0-3-3.87"/><path d="M16 3.13a4 2 0 0 1 0 7.75"/></svg>'
    }
  },
  {
    title: 'Sessions',
    value: `${stats.value.sessions}%`,
    icon: {
      template:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 0 0 0 .586 1.414L12 12l4.414-4.414A2 0 0 0 17 6.172V2"/></svg>'
    }
  },
  {
    title: 'Avg. Click Rate',
    value: `${stats.value.clickRate}%`,
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
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"/><path d="M12 13a1 1 0 1 0 0-2 1 0 0 0 0 2z"/><path d="M21 17v2a2 0 0 1-2 2H5a2 0 0 1-2-2v-2"/><path d="M21 7V5a2 0 0 0-2-2H5a2 0 0 0-2 2v2"/></svg>'
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
    successMessage.value = 'University added successfully!'
    newUniversityName.value = ''
    setTimeout(() => {
      showAddUniversityInput.value = false
      successMessage.value = ''
    }, 2500)
  } catch (err) {
    console.error("Error adding university:", err)
    error.value = `Error adding university: ${err.message}`
  }
}

const editUniversity = async (universityId, currentName) => {
  setEditing(universityId, currentName)
  // In a real app, you'd show a modal here. For now, let's use a prompt.
  const newName = prompt(`Enter new name for ${currentName}:`, currentName);
  if (newName && newName.trim() !== currentName) {
    try {
      await universityStore.updateUniversity(universityId, { name: newName.trim() });
      await universityStore.fetchUniversities(); // Re-fetch to update UI
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
  if (confirm(`Are you sure you want to delete the university "${universityName}"? This will also delete all its locations and homes.`)) {
    try {
      await universityStore.deleteUniversity(universityId);
      await universityStore.fetchUniversities(); // Re-fetch to update UI
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
  if (!trimmed || !selectedUniversityId.value) { // Changed from selectedUniversityForLocation to selectedUniversityId
    locationSuccessMessage.value = 'Please fill in all details and select a university.'
    return
  }

  try {
    const snapshot = await getDocs(collection(db, `Universities/${selectedUniversityId.value}/locations`)) // Changed from selectedUniversityForLocation
    const exists = snapshot.docs.some(doc => (doc.data().name || '').toLowerCase() === trimmed.toLowerCase())

    if (exists) {
      duplicateLocationError.value = true
      locationSuccessMessage.value = 'Location with this name already exists.'
      return
    }

    const newId = trimmed.replace(/\s+/g, '-').toLowerCase()
    await universityStore.addLocation(newId, trimmed, selectedUniversityId.value) // Changed from selectedUniversityForLocation
    locationSuccessMessage.value = 'Location added successfully!'
    newLocationName.value = ''
    fetchLocations(selectedUniversityId.value); // Re-fetch locations
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
  const newName = prompt(`Enter new name for ${currentName}:`, currentName);
  if (newName && newName.trim() !== currentName) {
    try {
      await universityStore.updateLocation(selectedUniversityId.value, locId, { name: newName.trim() });
      await fetchLocations(selectedUniversityId.value); // Re-fetch to update UI
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
  if (confirm(`Are you sure you want to delete the location "${locName}"? This will also delete all homes within it.`)) {
    try {
      await universityStore.deleteLocation(selectedUniversityId.value, locId);
      await fetchLocations(selectedUniversityId.value); // Re-fetch to update UI
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
  const newName = prompt(`Enter new name for ${currentName}:`, currentName);
  if (newName && newName.trim() !== currentName) {
    try {
      await universityStore.updateHostel(selectedUniversityId.value, locationId.value, homeId, { name: newName.trim() });
      await fetchHomes(selectedUniversityId.value, locationId.value); // Re-fetch to update UI
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
  if (confirm(`Are you sure you want to delete the home "${homeName}"?`)) {
    try {
      await universityStore.deleteHostel(selectedUniversityId.value, locationId.value, homeId);
      await fetchHomes(selectedUniversityId.value, locationId.value); // Re-fetch to update UI
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
  try {
    isLoading.value = true
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const sessionsSnapshot = await getDocs(collection(db, 'sessions'))

    stats.value = {
      totalUsers: usersSnapshot.size,
      sessions: sessionsSnapshot.size,
      clickRate: Math.round(Math.random() * 100),
      pageviews: usersSnapshot.size * 10
    }
  } catch (err) {
    error.value = `Error fetching stats: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

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
      fetchStats()
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


/* --- Tailwind-like styles (adjusted for dark theme) --- */
.btn-primary {
  /* Using your existing Tailwind color variable, which likely maps to #007bff or similar */
  @apply bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out;
}
.btn-secondary {
  @apply bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out;
}
.btn-success {
  @apply bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out;
}
.btn-info {
  @apply bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out;
}
input[type="text"],
input[type="number"],
select {
  @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500;
}
</style>