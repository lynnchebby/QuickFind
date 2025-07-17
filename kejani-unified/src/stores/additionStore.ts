// services/firestoreService.js OR stores/additionStore.ts
import { doc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore' // Added updateDoc, deleteDoc
import { db } from '../firebase/config.js'
import { defineStore } from 'pinia'

// Define the types for your data
interface University {
  id: string
  name: string
}

interface Location {
  id: string
  name: string
  // Add any other properties your location documents might have
}

interface Hostel { // Renamed from 'Home' for consistency with your code's 'hostels' collection name
  id: string
  name: string
  address?: string // Optional property
  rooms?: number // Optional property
  // Add any other properties your hostel documents might have
}

export const useUniversityStore = defineStore('university', {
  state: () => ({
    universities: [] as University[]
    // If you want to store locations and homes in the store as well,
    // you'd add them here:
    // locations: [] as Location[],
    // homes: [] as Hostel[],
  }),

  actions: {
    // Add a new university with custom document ID
    async addUniversity(universityId: string, universityName: string) {
      try {
        console.log('Attempting to add university with ID:', universityId)

        const universityRef = doc(db, 'Universities', universityId)

        await setDoc(universityRef, {
          name: universityName
        })

        // Create a default 'locations' subcollection document
        // It's good practice to add a placeholder or initial structure
        const locationsCollectionRef = collection(universityRef, 'locations')
        await addDoc(locationsCollectionRef, { placeholder: true }) // Added placeholder field

        console.log('University and initial locations collection created successfully')
      } catch (error) {
        console.error('Error adding university:', error)
        throw error // Re-throw to allow component to catch and display error
      }
    },

    // Fetch all universities
    async fetchUniversities() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Universities'))
        const universitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown University'
        }))

        console.log('Fetched Universities in store:', universitiesData)

        this.universities = universitiesData
      } catch (error) {
        console.error('Error fetching universities:', error)
        throw error // Re-throw to allow component to catch and display error
      }
    },

    // --- NEW: Update University ---
    async updateUniversity(universityId: string, newData: { name: string }) {
      try {
        console.log(`Attempting to update university ID: ${universityId} with data:`, newData);
        const universityRef = doc(db, 'Universities', universityId);
        await updateDoc(universityRef, newData);
        console.log('University updated successfully!');
      } catch (error) {
        console.error('Error updating university:', error);
        throw error;
      }
    },

    // --- NEW: Delete University ---
    async deleteUniversity(universityId: string) {
      try {
        console.log(`Attempting to delete university ID: ${universityId}`);
        const universityRef = doc(db, 'Universities', universityId);
        await deleteDoc(universityRef);
        // Important: Firestore does not automatically delete subcollections.
        // For recursive deletion of locations and hostels, you would typically
        // implement a Firebase Cloud Function. This action only deletes the
        // parent university document.
        console.log('University deleted successfully!');
      } catch (error) {
        console.error('Error deleting university:', error);
        throw error;
      }
    },

    // Add a new location under a university
    async addLocation(locationId: string, locationName: string, universityId: string) {
      try {
        const locationRef = doc(db, `Universities/${universityId}/locations`, locationId)
        await setDoc(locationRef, { name: locationName })

        // Create a default 'hostels' subcollection document under the new location
        // Similar to universities, it's good practice to have a placeholder
        const hostelsCollectionRef = collection(db, `Universities/${universityId}/locations/${locationId}/hostels`);
        await addDoc(hostelsCollectionRef, { placeholder: true }); // Added placeholder field

        console.log(`Location "${locationName}" added under university ID "${universityId}"`)
      } catch (error) {
        console.error('Error adding location:', error)
        throw error
      }
    },

    // Fetch all locations for a specific university
    async getLocations(universityId: string) {
      try {
        const locationCollectionRef = collection(db, `Universities/${universityId}/locations`)
        const locationSnapshot = await getDocs(locationCollectionRef)
        const locations = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log('Fetched Locations:', locations)
        return locations as Location[]
      } catch (error) {
        console.error('Error fetching locations:', error)
        throw error
      }
    },

    // --- NEW: Update Location ---
    async updateLocation(universityId: string, locationId: string, newData: { name: string }) {
      try {
        console.log(`Attempting to update location ID: ${locationId} under university ${universityId} with data:`, newData);
        const locationRef = doc(db, `Universities/${universityId}/locations`, locationId);
        await updateDoc(locationRef, newData);
        console.log('Location updated successfully!');
      } catch (error) {
        console.error('Error updating location:', error);
        throw error;
      }
    },

    // --- NEW: Delete Location ---
    async deleteLocation(universityId: string, locationId: string) {
      try {
        console.log(`Attempting to delete location ID: ${locationId} under university ${universityId}`);
        const locationRef = doc(db, `Universities/${universityId}/locations`, locationId);
        await deleteDoc(locationRef);
        // Important: Firestore does not automatically delete subcollections.
        // For recursive deletion of hostels, you would typically use a Cloud Function.
        console.log('Location deleted successfully!');
      } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
      }
    },

    // Add a new hostel under a specific university and location
    async addNewHostel(universityId: string, locationId: string, hostelId: string, hostelData: any) { // Changed hostelName to hostelId to match doc() usage
      try {
        const hostelRef = doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId) // Use hostelId for doc name
        await setDoc(hostelRef, hostelData)
        console.log(`Hostel "${hostelData.name}" added under university "${universityId}" and location "${locationId}"`)
      } catch (error) {
        console.error('Error adding hostel:', error)
        throw error
      }
    },

    // --- NEW: Update Hostel (Home) ---
    async updateHostel(universityId: string, locationId: string, hostelId: string, newData: any) { // newData can include address, rooms etc.
      try {
        console.log(`Attempting to update hostel ID: ${hostelId} under university ${universityId}, location ${locationId} with data:`, newData);
        const hostelRef = doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId);
        await updateDoc(hostelRef, newData);
        console.log('Hostel updated successfully!');
      } catch (error) {
        console.error('Error updating hostel:', error);
        throw error;
      }
    },

    // --- NEW: Delete Hostel (Home) ---
    async deleteHostel(universityId: string, locationId: string, hostelId: string) {
      try {
        console.log(`Attempting to delete hostel ID: ${hostelId} under university ${universityId}, location ${locationId}`);
        const hostelRef = doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId);
        await deleteDoc(hostelRef);
        console.log('Hostel deleted successfully!');
      } catch (error) {
        console.error('Error deleting hostel:', error);
        throw error;
      }
    },

    // You might also want to add a getHostels action if your main component
    // needs to fetch them directly, though fetchHomes in the component already does this.
    // This is just for completeness if the store should manage this state too.
    async getHostels(universityId: string, locationId: string) {
      try {
        const hostelCollectionRef = collection(db, `Universities/${universityId}/locations/${locationId}/hostels`);
        const hostelSnapshot = await getDocs(hostelCollectionRef);
        const hostels = hostelSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched Hostels:', hostels);
        return hostels as Hostel[];
      } catch (error) {
        console.error('Error fetching hostels:', error);
        throw error;
      }
    }
  }
})