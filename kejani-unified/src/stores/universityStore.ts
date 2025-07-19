// src/stores/universityStore.ts

import { defineStore } from 'pinia';
import { collection, getDocs } from 'firebase/firestore'; // Removed doc and setDoc as addNewHostel is gone
import { db } from '../firebase/config.js'; // Use consistent db import

// Define the types for your data
interface University {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
  // Add any other properties your location documents might have
}

export const useUniversityStore = defineStore('UniversityStore', {
  state: () => ({
    universities: [] as University[],
    loading: false, // Added loading state
    error: null as string | null, // Added error state
  }),
  actions: {
    /**
     * Fetches all universities from Firestore and populates the store's state.
     */
    async fetchUniversities() { // Renamed from getUniversities to better indicate it populates state
      this.loading = true;
      this.error = null;
      try {
        const universityCollectionRef = collection(db, 'Universities');
        const universitySnapshot = await getDocs(universityCollectionRef);
        const universitiesData = universitySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown University'
        }));
        this.universities = universitiesData;
        console.log('Fetched Universities in store:', universitiesData);
      } catch (error: any) {
        console.error('Error fetching universities:', error);
        this.error = 'Failed to fetch universities: ' + error.message;
        throw error; // Re-throw to allow component to catch and display error
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches all locations for a specific university.
     * @param {string} universityId - The ID of the university to fetch locations for.
     * @returns {Promise<Location[]>} An array of location objects.
     */
    async getLocations(universityId: string) {
      this.loading = true;
      this.error = null;
      try {
        const locationCollectionRef = collection(db, `Universities/${universityId}/locations`);
        const locationSnapshot = await getDocs(locationCollectionRef);
        const locations = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown Location', // Ensure name is pulled from data
          ...doc.data() // Include other data if any
        }));
        console.log(`Fetched Locations for ${universityId}:`, locations);
        return locations as Location[];
      } catch (error: any) {
        console.error(`Error fetching locations for university ${universityId}:`, error);
        this.error = 'Failed to fetch locations: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // --- REMOVED: addNewHostel action ---
    // This action is removed because hostel creation and management (including creating
    // the discovery reference) is now solely handled by the caretakerStore.
    // The Universities/{uniId}/locations/{locId}/hostels path now only contains
    // lightweight references, not the full hostel documents.
  }
});