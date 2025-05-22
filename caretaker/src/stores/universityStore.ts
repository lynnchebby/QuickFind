// firestoreStore.js
import { defineStore } from 'pinia'
import { getFirestore, collection, doc, getDocs, setDoc } from 'firebase/firestore' // Firestore functions
import { db } from '../main' // Firebase configuration

export const universityStore = defineStore('UniversityStore', {
  state: () => ({
    universities: [],
    locations: []
  }),
  actions: {
    async getUniversities() {
      const universityCollectionRef = collection(getFirestore(), 'Universities')
      const universitySnapshot = await getDocs(universityCollectionRef)
      return universitySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },

    async getLocations(universityId: any) {
      const locationCollectionRef = collection(
        getFirestore(),
        `Universities/${universityId}/locations`
      )
      const locationSnapshot = await getDocs(locationCollectionRef)
      return locationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },

    async addNewHostel(universityId: any, locationId: any, hostelName: string, hostelData: any) {
      const hostelRef = doc(
        getFirestore(),
        `universities/${universityId}/locations/${locationId}/hostels`,
        hostelName
      )
      await setDoc(hostelRef, hostelData) // Use hostelName as the document ID
    }
  }
})
