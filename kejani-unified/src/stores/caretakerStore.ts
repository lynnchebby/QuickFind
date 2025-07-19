// src/stores/caretakerStore.ts
import { defineStore } from 'pinia';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  addDoc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '../firebase/config.js';

// --- Interfaces ---
interface Hostel {
  id: string; // Document ID from Firestore
  name: string;
  universityId: string;
  locationId: string;
  price: number;
  deposit: number;
  hostelType: string;
  imageUrl: string; // Single image URL
  caretakerPhoneNumber: string; // Contact for *this specific* hostel listing
  isAvailable: boolean;
  createdAt?: Date; // Timestamp for creation
}

interface CaretakerProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string; // Caretaker's primary personal contact number
  createdAt?: Date;
  // Add any other caretaker-specific profile fields here (e.g., bio, other contact info)
}

export const useCaretakerStore = defineStore('caretaker', {
  state: () => ({
    caretakerProfile: null as CaretakerProfile | null, // Stores the caretaker's own profile
    hostels: [] as Hostel[], // Stores hostels managed by the logged-in caretaker
    loading: false,
    error: null as string | null,
  }),

  actions: {
    /**
     * Initializes or fetches the caretaker's profile document in the 'caretakers' collection.
     * This should be called once a caretaker user logs in (e.g., from auth.ts).
     * @param {string} userUid - The Firebase User UID.
     * @param {string} userEmail - The user's email.
     * @param {string} userDisplayName - The user's display name.
     * @param {string} [phoneNumber=''] - An optional primary phone number for the caretaker's profile.
     */
    async setupCaretakerProfile(userUid: string, userEmail: string, userDisplayName: string, phoneNumber: string = '') {
      this.loading = true;
      this.error = null;
      try {
        const caretakerDocRef = doc(db, 'caretakers', userUid);
        const docSnap = await getDoc(caretakerDocRef);

        if (!docSnap.exists()) {
          // If caretaker profile doesn't exist, create it for the first time
          await setDoc(caretakerDocRef, {
            email: userEmail,
            displayName: userDisplayName,
            phoneNumber: phoneNumber,
            createdAt: new Date(),
          });
          console.log('New caretaker profile created for UID:', userUid);
          this.caretakerProfile = {
            uid: userUid,
            email: userEmail,
            displayName: userDisplayName,
            phoneNumber: phoneNumber,
            createdAt: new Date()
          };
        } else {
          // If profile exists, load its data
          const data = docSnap.data();
          console.log('Caretaker profile loaded:', data);
          this.caretakerProfile = {
            uid: userUid,
            email: data.email,
            displayName: data.displayName,
            phoneNumber: data.phoneNumber || phoneNumber, // Use existing or provided
            createdAt: data.createdAt?.toDate() || new Date()
          };
        }
      } catch (err: any) {
        console.error('Error setting up caretaker profile:', err);
        this.error = 'Failed to set up caretaker profile: ' + err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Adds a new hostel managed by the caretaker.
     * This creates the main hostel document and a lightweight discovery reference.
     * @param {string} caretakerUid - The UID of the caretaker managing this hostel.
     * @param {string} universityId - The ID of the university this hostel belongs to.
     * @param {string} locationId - The ID of the location within the university.
     * @param {string} hostelName - The name of the hostel.
     * @param {string} caretakerPhoneNumber - The specific contact number for this hostel listing.
     * @param {number} rent - Monthly rent amount.
     * @param {number} deposit - Deposit amount.
     * @param {string} hostelType - Type of hostel (e.g., "Bedsitter", "One Bedroom").
     * @param {File} imageFile - The single image file to upload.
     */
    async addHostel(
      caretakerUid: string,
      universityId: string,    // Moved up
      locationId: string,      // Moved up
      hostelName: string,      // Moved up
      caretakerPhoneNumber: string,
      rent: number,
      deposit: number,
      hostelType: string,
      imageFile: File
    ) {
      if (!imageFile) {
        this.error = 'Please select an image file.';
        console.error('Error: No image file selected.');
        return;
      }
      this.loading = true;
      this.error = null;

      try {
        const storage = getStorage();

        // 1. Upload image to Firebase Storage
        // Use a unique path based on caretaker ID and a timestamp for the image name
        const imageStorageRef = storageRef(storage, `hostel_images/${caretakerUid}/${imageFile.name}_${Date.now()}`);
        const uploadResult = await uploadBytes(imageStorageRef, imageFile);
        const imageUrl = await getDownloadURL(uploadResult.ref);
        console.log('Image uploaded successfully:', imageUrl);

        // 2. Add the MAIN hostel document under the caretaker's 'hostels' subcollection
        // Use addDoc to get an auto-generated ID for the hostel.
        const caretakerHostelsCollectionRef = collection(db, `caretakers/${caretakerUid}/hostels`);
        const newHostelRef = await addDoc(caretakerHostelsCollectionRef, {
          name: hostelName,
          universityId: universityId,
          locationId: locationId,
          caretakerPhoneNumber: caretakerPhoneNumber, // Specific phone for this hostel
          price: rent,
          deposit: deposit,
          hostelType: hostelType,
          imageUrl: imageUrl, // Storing the single image URL
          isAvailable: true, // Default to available
          createdAt: new Date(),
        });

        // 3. Create a lightweight REFERENCE in the University/Location's 'hostels' subcollection
        // This is crucial for public discovery by students. Use the SAME auto-generated ID.
        const universityLocationHostelRef = doc(
          db,
          `Universities/${universityId}/locations/${locationId}/hostels`,
          newHostelRef.id // Use the same document ID generated for the main hostel
        );
        await setDoc(universityLocationHostelRef, {
          caretakerUid: caretakerUid,
          hostelDocId: newHostelRef.id, // Explicitly store the ID again for clarity in reference
          // You could include other minimal, denormalized data here for faster display in search results,
          // e.g., name: hostelName, imageUrl: imageUrl, price: rent
        });

        console.log('Hostel added successfully with ID:', newHostelRef.id);
        // Refresh the caretaker's local list of hostels
        await this.fetchCaretakerHostels(caretakerUid);
      } catch (error: any) {
        console.error('Error adding hostel: ', error);
        this.error = 'Failed to add hostel: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches all hostels managed by a specific caretaker UID from their dedicated subcollection.
     * This is the efficient query for the caretaker's dashboard.
     * @param {string} caretakerUid - The UID of the caretaker to fetch hostels for.
     */
    async fetchCaretakerHostels(caretakerUid: string) {
      console.log('Fetching hostels for caretaker:', caretakerUid);
      this.loading = true;
      this.error = null;
      try {
        // Direct query to the caretaker's specific hostels subcollection
        const caretakerHostelsCollectionRef = collection(db, `caretakers/${caretakerUid}/hostels`);
        const querySnapshot = await getDocs(query(caretakerHostelsCollectionRef));

        const fetchedHostels: Hostel[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          universityId: doc.data().universityId,
          locationId: doc.data().locationId,
          price: doc.data().price,
          deposit: doc.data().deposit,
          hostelType: doc.data().hostelType,
          imageUrl: doc.data().imageUrl,
          caretakerPhoneNumber: doc.data().caretakerPhoneNumber,
          isAvailable: doc.data().isAvailable,
          createdAt: doc.data().createdAt?.toDate() || new Date(), // Convert Firestore Timestamp to Date
        }));

        if (fetchedHostels.length === 0) {
          console.log('No hostels found for this caretaker.');
        } else {
          console.log('Hostels found:', fetchedHostels);
        }
        this.hostels = fetchedHostels;
      } catch (error: any) {
        console.error('Error fetching caretaker hostels:', error);
        this.error = 'Failed to fetch your hostels: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Toggles the availability status of a specific hostel managed by the caretaker.
     * This updates the main hostel document under the caretaker's subcollection.
     * @param {string} caretakerUid - The UID of the caretaker who owns the hostel.
     * @param {string} hostelId - The ID of the hostel document to toggle.
     * @param {boolean} currentAvailability - The current availability status.
     */
    async toggleHostelAvailability(
      caretakerUid: string,
      hostelId: string,
      currentAvailability: boolean
    ) {
      this.loading = true;
      this.error = null;
      try {
        // Update the main hostel document in the caretaker's subcollection
        const hostelRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
        await updateDoc(hostelRef, { isAvailable: !currentAvailability });

        console.log(`Hostel ${hostelId} availability toggled to ${!currentAvailability}.`);

        // Immediately update the local state to reflect the change
        const index = this.hostels.findIndex((h) => h.id === hostelId);
        if (index !== -1) {
          this.hostels[index].isAvailable = !currentAvailability;
        }
      } catch (error: any) {
        console.error('Error toggling hostel availability:', error);
        this.error = 'Failed to toggle availability: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Updates an existing hostel's details managed by the caretaker.
     * Only updates the main hostel document under the caretaker's subcollection.
     * @param {string} caretakerUid - The UID of the caretaker.
     * @param {string} hostelId - The ID of the hostel to update.
     * @param {Partial<Hostel>} newData - An object containing the fields to update.
     */
    async updateHostel(caretakerUid: string, hostelId: string, newData: Partial<Hostel>) {
        this.loading = true;
        this.error = null;
        try {
            const hostelRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
            await updateDoc(hostelRef, newData);
            console.log(`Hostel ${hostelId} updated successfully.`);
            await this.fetchCaretakerHostels(caretakerUid); // Refetch to ensure local state is fresh
        } catch (error: any) {
            console.error('Error updating hostel:', error);
            this.error = 'Failed to update hostel: ' + error.message;
            throw error;
        } finally {
            this.loading = false;
        }
    },

    /**
     * Deletes a hostel managed by a caretaker, its corresponding reference, and associated image.
     * @param {string} caretakerUid - The UID of the caretaker.
     * @param {string} hostelId - The ID of the hostel to delete.
     * @param {string} universityId - The ID of the university the hostel belongs to (for removing reference).
     * @param {string} locationId - The ID of the location the hostel belongs to (for removing reference).
     * @param {string} imageUrl - The URL of the image to delete from Storage.
     */
    async deleteHostel(caretakerUid: string, hostelId: string, universityId: string, locationId: string, imageUrl: string) {
        this.loading = true;
        this.error = null;
        try {
            // 1. Attempt to delete the image from Firebase Storage
            const storage = getStorage();
            const imageRef = storageRef(storage, imageUrl);
            try {
                await deleteObject(imageRef);
                console.log('Image deleted from storage successfully.');
            } catch (storageError: any) {
                // Warn if image deletion fails (e.g., image already gone or permissions)
                console.warn('Could not delete image from storage (it might not exist or permissions issue):', storageError.message);
            }

            // 2. Delete the actual hostel document from the caretaker's subcollection
            const hostelDocRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
            await deleteDoc(hostelDocRef);

            // 3. Delete the reference from the University/Location's 'hostels' subcollection
            const universityLocationHostelRef = doc(
                db,
                `Universities/${universityId}/locations/${locationId}/hostels`,
                hostelId
            );
            await deleteDoc(universityLocationHostelRef);

            console.log(`Hostel ${hostelId} and its reference deleted successfully.`);
            // Update the local state to remove the deleted hostel
            this.hostels = this.hostels.filter(h => h.id !== hostelId);
        } catch (error: any) {
            console.error('Error deleting hostel:', error);
            this.error = 'Failed to delete hostel: ' + error.message;
            throw error;
        } finally {
            this.loading = false;
        }
    },
  },
});