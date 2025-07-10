// src/stores/universityStore.ts

import { defineStore } from 'pinia'
import { getFirestore, collection, doc, getDocs, setDoc } from 'firebase/firestore'

export const universityStore = defineStore('UniversityStore', {
  state: () => ({
    universities: [],
    locations: []
  }),
  actions: {
    async getUniversities() {
      const db = getFirestore()
      const universityCollectionRef = collection(db, 'Universities')
      const universitySnapshot = await getDocs(universityCollectionRef)
      return universitySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },

    async getLocations(universityId: string) {
      const db = getFirestore()
      const locationCollectionRef = collection(db, `Universities/${universityId}/locations`)
      const locationSnapshot = await getDocs(locationCollectionRef)
      return locationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },

    async addNewHostel(universityId: string, locationId: string, hostelName: string, hostelData: any) {
      const db = getFirestore()
      const hostelRef = doc(db, `Universities/${universityId}/locations/${locationId}/hostels`, hostelName)
      await setDoc(hostelRef, hostelData)
    }
  }
})
