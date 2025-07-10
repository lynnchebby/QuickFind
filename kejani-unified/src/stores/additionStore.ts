// services/firestoreService.js
import { doc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config.js' // ✅ CORRECT
import { defineStore } from 'pinia'

// Define the type for a University
interface university {
  id: string
  name: string // Assuming universities have a name field
}

// Function to add a new university with custom document ID (universityId)
export const useUniversityStore = defineStore('university', {
  state: () => ({
    universities: [] as university[] // Explicitly define the type as University[]
  }),

  actions: {
    async addUniversity(universityId: string, universityName: any) {
      try {
        console.log('Attempting to add university with ID:', universityId)
        // Reference to the universities collection
        const universityRef = doc(db, 'Universities', universityId)

        // Add a new document with the specified universityId and name
        await setDoc(universityRef, {
          name: universityName
        })

        // Create an empty subcollection called 'locations'
        const locationsRef = collection(universityRef, 'locations')
        // Example: Add an initial placeholder document to the 'location' collection
        await addDoc(locationsRef, {})

        console.log('University and locations collection created successfully')
      } catch (error) {
        console.error('Error adding university:', error)
        throw error
      }
    },

    // function for fetching universities
    async fetchUniversities() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Universities'))
        const universitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || 'Unknown University'
        }))

        console.log('Fetched Universities in store:', universitiesData) // Debugging log

        this.universities = universitiesData // Set the universities322)
        console.log('Fetched Universities 2:', this.universities)
      } catch (error) {
        console.error('Error fetching universities: ', error)
      }
    },

    // Add a new location to the selected university's locations collection
    async addLocation(locationId: string, locationName: string, universityId: string) {
      const locationRef = doc(db, `Universities/${universityId}/locations`, locationId)
      await setDoc(locationRef, { name: locationName })

      // Automatically add a hostels collection with a default document under the new location
      await addDoc(collection(db, `Universities/${universityId}/locations/${locationId}/hostels`), {
        defaultHostelName: 'Default Hostel'
      })
    }
  }
})
