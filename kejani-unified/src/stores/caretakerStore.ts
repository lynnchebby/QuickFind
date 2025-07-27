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
} from 'firebase/firestore';
import { db } from '../firebase/config';

interface Hostel {
  id: string;
  name: string;
  universityId: string;
  locationId: string;
  price: number;
  deposit: number;
  hostelType: string;
  imageUrls: string[];
  caretakerPhoneNumber: string;
  isAvailable: boolean;
  availableRooms?: number;
  caretakerUid: string;
  createdAt?: Date;
}

interface CaretakerProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  createdAt?: Date;
}

const CLOUDINARY_CLOUD_NAME = 'dqny92tgm';
const CLOUDINARY_UPLOAD_PRESET = 'hostel_images';

export const useCaretakerStore = defineStore('caretaker', {
  state: () => ({
    caretakerProfile: null as CaretakerProfile | null,
    hostels: [] as Hostel[],
    loading: false,
    error: null as string | null,
    addHostelSuccess: false,
  }),

  actions: {
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
            phoneNumber,
            createdAt: new Date(),
          });
          this.caretakerProfile = {
            uid: userUid,
            email: userEmail,
            displayName: userDisplayName,
            phoneNumber,
            createdAt: new Date()
          };
        } else {
          const data = docSnap.data();
          this.caretakerProfile = {
            uid: userUid,
            email: data.email,
            displayName: data.displayName,
            phoneNumber: data.phoneNumber || phoneNumber,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
          };
        }
      } catch (err: any) {
        this.error = 'Failed to set up caretaker profile: ' + err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async addHostel(
      caretakerUid: string,
      universityId: string,
      locationId: string,
      hostelName: string,
      caretakerPhoneNumber: string,
      rent: number,
      deposit: number,
      hostelType: string,
      imageFiles: File[],
      availableRooms: number
    ) {
      if (!imageFiles || imageFiles.length === 0) {
        this.error = 'Please select at least one image file.';
        return;
      }

      if (imageFiles.length > 3) {
        this.error = 'You can only upload a maximum of 3 images.';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const trimmedHostelName = hostelName.trim();
        const publicHostelsCollectionRef = collection(db, `Universities/${universityId}/locations/${locationId}/hostels`);
        const querySnapshot = await getDocs(publicHostelsCollectionRef);

        const exists = querySnapshot.docs.some(doc =>
          (doc.data().name || '').toLowerCase() === trimmedHostelName.toLowerCase()
        );

        if (exists) {
          this.error = `A home with the name "${trimmedHostelName}" already exists at this location.`;
          this.loading = false;
          return;
        }

        const imageUrls: string[] = [];
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
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
            throw new Error(errorData.error?.message || 'Image upload failed');
          }

          const data = await response.json();
          imageUrls.push(data.secure_url);
        }

        const caretakerHostelsCollectionRef = collection(db, `caretakers/${caretakerUid}/hostels`);
        const newHostelRef = await addDoc(caretakerHostelsCollectionRef, {
          name: trimmedHostelName,
          universityId,
          locationId,
          caretakerPhoneNumber,
          price: rent,
          deposit,
          hostelType,
          availableRooms,
          imageUrls,
          isAvailable: true,
          caretakerUid,
          createdAt: new Date(),
        });

        const universityLocationHostelRef = doc(
          db,
          `Universities/${universityId}/locations/${locationId}/hostels`,
          newHostelRef.id
        );

        // ✅ This block below was updated to include `caretaker` details
        await setDoc(universityLocationHostelRef, {
          caretakerUid,
          hostelDocId: newHostelRef.id,
          name: trimmedHostelName,
          price: rent,
          deposit,
          hostelType,
          isAvailable: true,
          availableRooms,
          primaryImageUrl: imageUrls[0] || '',
          caretaker: {
            name: this.caretakerProfile?.displayName || '',
            phone: caretakerPhoneNumber || this.caretakerProfile?.phoneNumber || '',
            email: this.caretakerProfile?.email || ''
          }
        });

        await this.fetchCaretakerHostels(caretakerUid);
        this.addHostelSuccess = true;
      } catch (error: any) {
        this.error = 'Failed to add hostel: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchCaretakerHostels(caretakerUid: string) {
      this.loading = true;
      this.error = null;
      try {
        const caretakerHostelsCollectionRef = collection(db, `caretakers/${caretakerUid}/hostels`);
        const querySnapshot = await getDocs(query(caretakerHostelsCollectionRef));

        this.hostels = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(),
        })) as Hostel[];
      } catch (error: any) {
        this.error = 'Failed to fetch your hostels: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

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

        await updateDoc(doc(db, `caretakers/${caretakerUid}/hostels`, hostelId), {
          isAvailable: newAvailability,
        });

        await updateDoc(doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId), {
          isAvailable: newAvailability,
        });

        const index = this.hostels.findIndex(h => h.id === hostelId);
        if (index !== -1) this.hostels[index].isAvailable = newAvailability;
      } catch (error: any) {
        this.error = 'Failed to toggle availability: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateHostel(
      caretakerUid: string,
      universityId: string,
      locationId: string,
      hostelId: string,
      newData: Partial<Hostel> & { imageFiles?: File[] }
    ) {
      this.loading = true;
      this.error = null;
      try {
        const hostelRef = doc(db, `caretakers/${caretakerUid}/hostels`, hostelId);
        const publicRef = doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId);

        const updatePayload: any = { ...newData };
        let imageUrls: string[] | undefined;

        if (newData.imageFiles && newData.imageFiles.length > 0) {
          imageUrls = [];

          for (const file of newData.imageFiles) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', `hostel_images/${caretakerUid}`);

            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
              { method: 'POST', body: formData }
            );

            if (!res.ok) {
              const err = await res.json();
              throw new Error(`Upload failed: ${err.error?.message || res.statusText}`);
            }

            const result = await res.json();
            imageUrls.push(result.secure_url);
          }

          updatePayload.imageUrls = imageUrls;
          delete updatePayload.imageFiles;
        }

        await updateDoc(hostelRef, updatePayload);

        const publicData: any = {};
        if (updatePayload.name) publicData.name = updatePayload.name;
        if (updatePayload.price) publicData.price = updatePayload.price;
        if (updatePayload.hostelType) publicData.hostelType = updatePayload.hostelType;
        if (updatePayload.isAvailable !== undefined) publicData.isAvailable = updatePayload.isAvailable;
        if (updatePayload.availableRooms !== undefined) publicData.availableRooms = updatePayload.availableRooms;
        if (imageUrls && imageUrls.length > 0) publicData.primaryImageUrl = imageUrls[0];
        publicData.caretakerUid = caretakerUid;

        await updateDoc(publicRef, publicData);

        await this.fetchCaretakerHostels(caretakerUid);
      } catch (error: any) {
        this.error = 'Failed to update hostel: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteHostel(caretakerUid: string, universityId: string, locationId: string, hostelId: string, imageUrls: string[] = []) {
      this.loading = true;
      this.error = null;
      try {
        await deleteDoc(doc(db, `caretakers/${caretakerUid}/hostels`, hostelId));
        await deleteDoc(doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelId));

        this.hostels = this.hostels.filter(h => h.id !== hostelId);
      } catch (error: any) {
        this.error = 'Failed to delete hostel: ' + error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    $reset() {
      this.caretakerProfile = null;
      this.hostels = [];
      this.loading = false;
      this.error = null;
      this.addHostelSuccess = false;
    }
  },
});
