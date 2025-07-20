// src/stores/universityStore.ts

import { defineStore } from 'pinia';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config'; // Use consistent db import path

// Define the types for your data
interface University {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
  universityId: string; // Added to link location to its university
  // Add any other properties your location documents might have
}

export const useUniversityStore = defineStore('UniversityStore', {
  state: () => ({
    universities: [] as University[],
    // ✅ NEW: Add a state property to hold all locations fetched globally
    allLocations: [] as Location[],
    loading: false, // Added loading state
    error: null as string | null, // Added error state
  }),
  actions: {
    /**
     * Fetches all universities from Firestore and populates the store's state.
     */
    async fetchUniversities() {
      this.loading = true;
      this.error = null;
      try {
        const universityCollectionRef = collection(db, 'Universities');
        const universitySnapshot = await getDocs(query(universityCollectionRef));
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
     * This is primarily used for populating the "Add New Hostel" form's location dropdown.
     * @param {string} universityId - The ID of the university to fetch locations for.
     * @returns {Promise<Location[]>} An array of location objects.
     */
    async getLocations(universityId: string): Promise<Location[]> {
      // Note: This action's loading state might be shared, consider a dedicated 'locationsLoading' if needed
      // this.loading = true;
      // this.error = null;
      try {
        const locationCollectionRef = collection(db, `Universities/${universityId}/locations`);
        const locationSnapshot = await getDocs(query(locationCollectionRef));
        const locations = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown Location',
          universityId: universityId, // Include universityId for clarity
          // ...doc.data() // Include other data if any
        }));
        console.log(`Fetched Locations for ${universityId}:`, locations);
        return locations as Location[];
      } catch (error: any) {
        console.error(`Error fetching locations for university ${universityId}:`, error);
        this.error = 'Failed to fetch locations: ' + error.message;
        throw error;
      } finally {
        // this.loading = false;
      }
    },

    /**
     * ✅ NEW: Fetches all locations across all universities and populates the allLocations state.
     * This is used for displaying location names in the hostel list.
     */
    async fetchAllLocations() {
      // Use a separate loading state if this fetch is independent of other loading indicators
      // this.allLocationsLoading = true;
      this.error = null; // Clear previous errors
      try {
        // Ensure universities are loaded first, as we iterate through them
        if (this.universities.length === 0) {
          await this.fetchUniversities();
        }

        let combinedLocations: Location[] = [];
        for (const university of this.universities) {
          // Re-using getLocations to fetch locations for each university
          const locationsForUni = await this.getLocations(university.id);
          combinedLocations = combinedLocations.concat(locationsForUni);
        }
        this.allLocations = combinedLocations;
        console.log('Fetched ALL Locations in store:', this.allLocations);
      } catch (error: any) {
        console.error('Error fetching all locations:', error);
        this.error = 'Failed to fetch all locations: ' + error.message;
        throw error;
      } finally {
        // this.allLocationsLoading = false;
      }
    }
  }
});