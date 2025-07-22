// src/stores/universityStore.ts

import { defineStore } from 'pinia';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc, // For adding/updating specific documents
  updateDoc, // For updating existing documents
  deleteDoc, // For deleting documents
  Timestamp, // For handling Firestore Timestamps
} from 'firebase/firestore';
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
}

interface Hostel {
  id: string; // Document ID from Firestore
  name: string;
  universityId: string;
  locationId: string;
  price: number;
  deposit: number;
  hostelType: string;
  imageUrls: string[];
  caretakerPhoneNumber: string;
  isAvailable: boolean;
  caretakerUid: string;
  createdAt?: Date;
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
        console.log('UniversityStore: Fetched Universities:', universitiesData);
      } catch (error: any) {
        console.error('UniversityStore: Error fetching universities:', error);
        this.error = 'Failed to fetch universities: ' + error.message;
        throw error; // Re-throw to allow component to catch and display error
      } finally {
        this.loading = false;
      }
    },

    /**
     * Adds a new university to Firestore.
     * @param {string} id - The ID for the new university document.
     * @param {string} name - The name of the university.
     */
    async addUniversity(id: string, name: string) {
      this.loading = true;
      this.error = null;
      try {
        const universityDocRef = doc(db, 'Universities', id);
        await setDoc(universityDocRef, { name, createdAt: Timestamp.now() });
        console.log(`UniversityStore: University "${name}" added with ID: ${id}`);
        // Re-fetch universities to update the UI
        await this.fetchUniversities();
      } catch (error: any) {
        console.error('UniversityStore: Error adding university:', error);
        this.error = 'Failed to add university: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Updates an existing university in Firestore.
     * @param {string} id - The ID of the university to update.
     * @param {Partial<University>} newData - The new data to update.
     */
    async updateUniversity(id: string, newData: Partial<University>) {
      this.loading = true;
      this.error = null;
      try {
        const universityDocRef = doc(db, 'Universities', id);
        await updateDoc(universityDocRef, newData);
        console.log(`UniversityStore: University "${id}" updated with data:`, newData);
        // Re-fetch universities to update the UI
        await this.fetchUniversities();
      } catch (error: any) {
        console.error('UniversityStore: Error updating university:', error);
        this.error = 'Failed to update university: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Deletes a university and all its subcollections (locations and hostels).
     * IMPORTANT: Deleting subcollections recursively requires a Cloud Function or manual deletion.
     * This client-side function will iterate and delete. For very large datasets,
     * a Firebase Cloud Function is highly recommended for performance and reliability.
     * @param {string} id - The ID of the university to delete.
     */
    async deleteUniversity(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const universityDocRef = doc(db, 'Universities', id);

        // First, delete all hostels and locations within this university
        const locationsSnapshot = await getDocs(collection(db, `Universities/${id}/locations`));
        for (const locDoc of locationsSnapshot.docs) {
          const hostelsSnapshot = await getDocs(collection(db, `Universities/${id}/locations/${locDoc.id}/hostels`));
          for (const hostelDoc of hostelsSnapshot.docs) {
            await deleteDoc(doc(db, `Universities/${id}/locations/${locDoc.id}/hostels`, hostelDoc.id));
            console.log(`UniversityStore: Deleted hostel ${hostelDoc.id} under location ${locDoc.id}`);
          }
          await deleteDoc(doc(db, `Universities/${id}/locations`, locDoc.id));
          console.log(`UniversityStore: Deleted location ${locDoc.id} under university ${id}`);
        }

        // Finally, delete the university document itself
        await deleteDoc(universityDocRef);
        console.log(`UniversityStore: University "${id}" deleted.`);

        // Re-fetch universities to update the UI
        await this.fetchUniversities();
        // Also re-fetch all locations as some might have been deleted
        await this.fetchAllLocations();
      } catch (error: any) {
        console.error('UniversityStore: Error deleting university:', error);
        this.error = 'Failed to delete university: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches all locations for a specific university.
     * @param {string} universityId - The ID of the university to fetch locations for.
     * @returns {Promise<Location[]>} An array of location objects.
     */
    async getLocations(universityId: string): Promise<Location[]> {
      try {
        const locationCollectionRef = collection(db, `Universities/${universityId}/locations`);
        const locationSnapshot = await getDocs(query(locationCollectionRef));
        const locations = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown Location',
          universityId: universityId,
        }));
        console.log(`UniversityStore: Fetched Locations for ${universityId}:`, locations);
        return locations as Location[];
      } catch (error: any) {
        console.error(`UniversityStore: Error fetching locations for university ${universityId}:`, error);
        this.error = 'Failed to fetch locations: ' + error.message;
        throw error;
      }
    },

    /**
     * Adds a new location under a specific university.
     * @param {string} id - The ID for the new location document.
     * @param {string} name - The name of the location.
     * @param {string} universityId - The ID of the parent university.
     */
    async addLocation(id: string, name: string, universityId: string) {
      this.loading = true;
      this.error = null;
      try {
        const locationDocRef = doc(db, `Universities/${universityId}/locations`, id);
        await setDoc(locationDocRef, { name, universityId, createdAt: Timestamp.now() });
        console.log(`UniversityStore: Location "${name}" added with ID: ${id} under University ${universityId}`);
        // Re-fetch all locations to update the UI
        await this.fetchAllLocations();
      } catch (error: any) {
        console.error('UniversityStore: Error adding location:', error);
        this.error = 'Failed to add location: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Updates an existing location under a specific university.
     * @param {string} universityId - The ID of the parent university.
     * @param {string} locationId - The ID of the location to update.
     * @param {Partial<Location>} newData - The new data to update.
     */
    async updateLocation(universityId: string, locationId: string, newData: Partial<Location>) {
      this.loading = true;
      this.error = null;
      try {
        const locationDocRef = doc(db, `Universities/${universityId}/locations`, locationId);
        await updateDoc(locationDocRef, newData);
        console.log(`UniversityStore: Location "${locationId}" under University "${universityId}" updated with data:`, newData);
        // Re-fetch all locations to update the UI
        await this.fetchAllLocations();
      } catch (error: any) {
        console.error('UniversityStore: Error updating location:', error);
        this.error = 'Failed to update location: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Deletes a location and all its subcollections (hostels).
     * IMPORTANT: Deleting subcollections recursively requires a Cloud Function or manual deletion.
     * This client-side function will iterate and delete. For very large datasets,
     * a Firebase Cloud Function is highly recommended for performance and reliability.
     * @param {string} universityId - The ID of the parent university.
     * @param {string} locationId - The ID of the location to delete.
     */
    async deleteLocation(universityId: string, locationId: string) {
      this.loading = true;
      this.error = null;
      try {
        const locationDocRef = doc(db, `Universities/${universityId}/locations`, locationId);

        // First, delete all hostels within this location
        const hostelsSnapshot = await getDocs(collection(db, `Universities/${universityId}/locations/${locationId}/hostels`));
        for (const hostelDoc of hostelsSnapshot.docs) {
          await deleteDoc(doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelDoc.id));
          console.log(`UniversityStore: Deleted hostel ${hostelDoc.id} under location ${locationId}`);
        }

        // Finally, delete the location document itself
        await deleteDoc(locationDocRef);
        console.log(`UniversityStore: Location "${locationId}" under University "${universityId}" deleted.`);

        // Re-fetch all locations to update the UI
        await this.fetchAllLocations();
      } catch (error: any) {
        console.error('UniversityStore: Error deleting location:', error);
        this.error = 'Failed to delete location: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches hostels for a specific university and location.
     * This is used by the admin dashboard to display public hostel listings.
     * @param {string} universityId - The ID of the university.
     * @param {string} locationId - The ID of the location.
     * @returns {Promise<Hostel[]>} An array of hostel objects.
     */
    async getHostels(universityId: string, locationId: string): Promise<Hostel[]> {
      this.loading = true;
      this.error = null;
      try {
        const hostelsCollectionRef = collection(db, `Universities/${universityId}/locations/${locationId}/hostels`);
        const hostelSnapshot = await getDocs(query(hostelsCollectionRef));
        const hostelsData = hostelSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unnamed Hostel',
          universityId: universityId,
          locationId: locationId,
          price: doc.data().price || 0,
          deposit: doc.data().deposit || 0,
          hostelType: doc.data().hostelType || 'Unknown',
          imageUrls: doc.data().imageUrls || [], // Assuming this is stored in public reference now
          caretakerPhoneNumber: doc.data().caretakerPhoneNumber || '', // Assuming this is stored
          isAvailable: doc.data().isAvailable || false,
          caretakerUid: doc.data().caretakerUid || '', // Crucial for admin/caretaker logic
          createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : undefined,
        }));
        console.log(`UniversityStore: Fetched Hostels for ${universityId}/${locationId}:`, hostelsData);
        return hostelsData as Hostel[];
      } catch (error: any) {
        console.error(`UniversityStore: Error fetching hostels for ${universityId}/${locationId}:`, error);
        this.error = 'Failed to fetch hostels: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * ✅ NEW: Fetches all locations across all universities and populates the allLocations state.
     * This is used for displaying location names in the hostel list.
     */
    async fetchAllLocations() {
      this.loading = true; // Use the main loading for this as it's a significant fetch
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
        console.log('UniversityStore: Fetched ALL Locations:', this.allLocations);
      } catch (error: any) {
        console.error('UniversityStore: Error fetching all locations:', error);
        this.error = 'Failed to fetch all locations: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Resets the store's state
    $reset() {
      this.universities = [];
      this.allLocations = [];
      this.loading = false;
      this.error = null;
    }
  },
});
