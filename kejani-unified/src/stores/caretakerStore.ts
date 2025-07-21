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
  deleteDoc,
  Timestamp,
  // Removed 'where' import as it's not used for this specific duplicate check
} from 'firebase/firestore';
import { db } from '../firebase/config'; // <--- Ensure this path is correct for your Firebase config

// --- Interfaces ---
interface Hostel {
  id: string; // Document ID from Firestore
  name: string;
  universityId: string;
  locationId: string;
  price: number;
  deposit: number;
  hostelType: string;
  imageUrls: string[]; // Array of image URLs (now Cloudinary URLs)
  caretakerPhoneNumber: string; // Contact for *this specific* hostel listing
  isAvailable: boolean;
  caretakerUid: string; // Explicitly add caretakerUid to the interface
  createdAt?: Date; // Timestamp for creation
}

interface CaretakerProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  createdAt?: Date;
}

// --- Cloudinary Configuration---
//  Cloudinary Cloud Name and Unsigned Upload Preset name
const CLOUDINARY_CLOUD_NAME = 'dqny92tgm';
const CLOUDINARY_UPLOAD_PRESET = 'hostel_images';
// --- END Cloudinary Configuration ---

export const useCaretakerStore = defineStore('caretaker', {
  state: () => ({
    caretakerProfile: null as CaretakerProfile | null,
    hostels: [] as Hostel[],
    loading: false,
    error: null as string | null,
    addHostelSuccess: false as boolean, // Added for clarity in UI feedback
  }),

  actions: {
    /**
     * Initializes or fetches the caretaker's profile document. (No change here)
     */
    async setupCaretakerProfile(userUid: string, userEmail: string, userDisplayName: string, phoneNumber: string = '') {
      this.loading = true;
      this.error = null;
      try {
        const caretakerDocRef = doc(db, 'caretakers', userUid);
        const docSnap = await getDoc(caretakerDocRef);

        if (!docSnap.exists()) {
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
          const data = docSnap.data();
          console.log('Caretaker profile loaded:', data);
          this.caretakerProfile = {
            uid: userUid,
            email: data.email,
            displayName: data.displayName,
            phoneNumber: data.phoneNumber || phoneNumber,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
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
     * Adds a new hostel managed by the caretaker, including uploading images to Cloudinary.
     * @param {string} caretakerUid - The UID of the caretaker managing this hostel.
     * @param {string} universityId - The ID of the university this hostel belongs to.
     * @param {string} locationId - The ID of the location within the university.
     * @param {string} hostelName - The name of the hostel.
     * @param {string} caretakerPhoneNumber - The specific contact number for this hostel listing.
     * @param {number} rent - Monthly rent amount.
     * @param {number} deposit - Deposit amount.
     * @param {string} hostelType - Type of hostel (e.g., "Bedsitter", "One Bedroom").
     * @param {File[]} imageFiles - The array of image files to upload.
     */
    async addHostel(
      caretakerUid: string,
      universityId: string,
      locationId: string,
      hostelName: string,
      caretakerPhoneNumber: string,
      rent: number,
      deposit: number,
      hostelType: string,
      imageFiles: File[]
    ) {
      // Basic validation for images
      if (!imageFiles || imageFiles.length === 0) {
        this.error = 'Please select at least one image file.';
        console.error('Error: No image file selected.');
        return;
      }
      if (imageFiles.length > 3) {
        this.error = 'You can only upload a maximum of 3 images.';
        console.error('Error: Too many images selected.');
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        // --- START: Duplicate Name Check (Improved for case-insensitivity) ---
        const trimmedHostelName = hostelName.trim();
        const publicHostelsCollectionRef = collection(db, `Universities/${universityId}/locations/${locationId}/hostels`);

        // Fetch ALL documents in this specific location's hostels subcollection
        // This ensures we can perform a reliable case-insensitive check client-side.
        const querySnapshot = await getDocs(publicHostelsCollectionRef);

        const exists = querySnapshot.docs.some(doc =>
          (doc.data().name || '').toLowerCase() === trimmedHostelName.toLowerCase()
        );

        if (exists) {
          this.error = `A home with the name "${trimmedHostelName}" already exists at this location. Please use a different name.`;
          console.error('Duplicate hostel name detected:', trimmedHostelName);
          this.loading = false;
          return; // Stop execution if duplicate
        }
        // --- END: Duplicate Name Check ---

        const imageUrls: string[] = []; // Array to store all uploaded image URLs (from Cloudinary)

        // 1. Upload all images to Cloudinary
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // Your unsigned upload preset

          // Optional: Add folder for better organization in Cloudinary
          formData.append('folder', `hostel_images/${caretakerUid}`);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary upload failed for ${file.name}: ${errorData.error.message || response.statusText}`);
          }

          const data = await response.json();
          imageUrls.push(data.secure_url); // Store the secure URL provided by Cloudinary
          console.log(`Image uploaded to Cloudinary: ${data.secure_url}`);
        }
        console.log('All images uploaded to Cloudinary. URLs:', imageUrls);

        // 2. Add the MAIN hostel document under the caretaker's 'hostels' subcollection
        const caretakerHostelsCollectionRef = collection(db, `caretakers/${caretakerUid}/hostels`);
        const newHostelRef = await addDoc(caretakerHostelsCollectionRef, {
          name: trimmedHostelName, // Use trimmed name
          universityId: universityId,
          locationId: locationId,
          caretakerPhoneNumber: caretakerPhoneNumber,
          price: rent,
          deposit: deposit,
          hostelType: hostelType,
          imageUrls: imageUrls, // Store the Cloudinary URLs
          isAvailable: true,
          caretakerUid: caretakerUid, // Ensure caretakerUid is stored here
          createdAt: new Date(),
        });
        console.log('addHostel: Hostel added to caretaker private collection with ID:', newHostelRef.id, 'by UID:', caretakerUid);


        // 3. Create a lightweight REFERENCE in the University/Location's 'hostels' subcollection
        const universityLocationHostelRef = doc(
          db,
          `Universities/${universityId}/locations/${locationId}/hostels`,
          newHostelRef.id
        );
        await setDoc(universityLocationHostelRef, {
          caretakerUid: caretakerUid, // Ensure caretakerUid is stored in the public reference
          hostelDocId: newHostelRef.id,
          primaryImageUrl: imageUrls[0] || '', // Use the first Cloudinary URL as primary
          name: trimmedHostelName, // Use trimmed name
          price: rent,
          hostelType: hostelType,
          isAvailable: true,
        });
        console.log('Public reference for hostel added successfully with ID:', newHostelRef.id, 'and caretakerUid:', caretakerUid);


        console.log('Hostel added successfully with ID:', newHostelRef.id);
        await this.fetchCaretakerHostels(caretakerUid);
        this.addHostelSuccess = true; // Set success state
      } catch (error: any) {
        console.error('Error adding hostel: ', error);
        this.error = 'Failed to add hostel: ' + error.message;
        // Re-throw to allow component to catch if needed
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches all hostels managed by a specific caretaker UID. (No change here)
     */
    async fetchCaretakerHostels(caretakerUid: string) {
      console.log('Fetching hostels for caretaker:', caretakerUid);
      this.loading = true;
      this.error = null;
      try {
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
          imageUrls: doc.data().imageUrls || [],
          caretakerPhoneNumber: doc.data().caretakerPhoneNumber,
          isAvailable: doc.data().isAvailable,
          caretakerUid: doc.data().caretakerUid || caretakerUid, // Ensure caretakerUid is always present
          createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(),
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
     * Toggles the availability status of a specific hostel. (No change to core logic)
     */
    async toggleHostelAvailability(
      caretakerUid: string,
      hostelId: string,
      currentAvailability: boolean,
      universityId: string,
      locationId: string
    ) {
      this.loading = true;
      this.error = null;
      try {
        const newAvailability = !currentAvailability;

        const hostelRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
        await updateDoc(hostelRef, { isAvailable: newAvailability });
        console.log(`Main hostel document ${hostelId} availability toggled to ${newAvailability}.`);

        const universityLocationHostelRef = doc(
          db,
          `Universities/${universityId}/locations/${locationId}/hostels`,
          hostelId
        );
        await updateDoc(universityLocationHostelRef, { isAvailable: newAvailability });
        console.log(`Public reference for hostel ${hostelId} availability toggled to ${newAvailability}.`);

        const index = this.hostels.findIndex((h) => h.id === hostelId);
        if (index !== -1) {
          this.hostels[index].isAvailable = newAvailability;
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
     * Updates an existing hostel's details.
     * Added caretakerUid to the public update to ensure it's always there.
     */
    async updateHostel(caretakerUid: string, hostelId: string, universityId: string, locationId: string, newData: Partial<Hostel>) {
      this.loading = true;
      this.error = null;
      try {
        const hostelRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
        await updateDoc(hostelRef, newData);
        console.log(`Hostel ${hostelId} updated successfully in caretaker's collection.`);

        const updatePublicData: { [key: string]: any } = {};

        if (newData.name !== undefined) updatePublicData.name = newData.name;
        if (newData.price !== undefined) updatePublicData.price = newData.price;
        if (newData.hostelType !== undefined) updatePublicData.hostelType = newData.hostelType;
        if (newData.isAvailable !== undefined) updatePublicData.isAvailable = newData.isAvailable;
        // Ensure caretakerUid is always present in the public record on update
        updatePublicData.caretakerUid = caretakerUid;

        if (newData.imageUrls !== undefined) {
          if (newData.imageUrls && newData.imageUrls.length > 0) {
            updatePublicData.primaryImageUrl = newData.imageUrls[0];
          } else {
            updatePublicData.primaryImageUrl = '';
          }
        }

        const publicRef = doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId);

        if (Object.keys(updatePublicData).length > 0) {
          await updateDoc(publicRef, updatePublicData);
          console.log(`Public reference for hostel ${hostelId} updated.`);
        }

        await this.fetchCaretakerHostels(caretakerUid);
      } catch (error: any) {
        console.error('Error updating hostel:', error);
        this.error = 'Failed to update hostel: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Deletes a hostel and its corresponding Firestore reference.
     * IMPORTANT: Image deletion from Cloudinary is complex from the frontend directly without an API Secret.
     * For production, this should ideally be handled via a secure backend/serverless function.
     */
    async deleteHostel(caretakerUid: string, universityId: string, locationId: string, hostelId: string, imageUrls: string[] = []) { // Added default empty array for imageUrls
      this.loading = true;
      this.error = null;
      try {
        // --- CLOUDINARY IMAGE DELETION WARNING ---
        console.warn("Cloudinary image deletion requires secure server-side logic (e.g., via a backend/serverless function). Skipping direct image deletion from frontend for security reasons. Images will remain in Cloudinary unless manually deleted.");
        console.log("Image URLs that would ideally be deleted:", imageUrls);
        // --- END CLOUDINARY IMAGE DELETION WARNING ---

        // 1. Delete the actual hostel document from the caretaker's subcollection
        const hostelDocRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
        await deleteDoc(hostelDocRef);
        console.log(`Main hostel document ${hostelId} deleted successfully.`);

        // 2. Delete the reference from the University/Location's 'hostels' subcollection
        const universityLocationHostelRef = doc(
          db,
          `Universities/${universityId}/locations/${locationId}/hostels`,
          hostelId
        );
        await deleteDoc(universityLocationHostelRef);
        console.log(`Public reference for hostel ${hostelId} deleted successfully.`);

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

    /**
     * Resets the store's state to its initial values. (No change here)
     */
    $reset() {
      this.caretakerProfile = null;
      this.hostels = [];
      this.loading = false;
      this.error = null;
      this.addHostelSuccess = false;
    }
  },
});
