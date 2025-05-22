import { defineStore } from 'pinia'
import { collection, collectionGroup, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '../main' // Import Firestore config

export const useCaretakerStore = defineStore('caretaker', {
  state: () => ({
    hostels: [] as Array<any>, // Store for hostels managed by the caretaker
    loading: false,
    error: null as string | null,
    imageUrls: [] as string[]
  }),
  actions: {
    // Add a hostel to Firestore using the hostel name as the document ID
    async addHostel(
      hostelName: string,
      caretakerId: string,
      selectedUniversity: string,
      selectedLocation: string,
      caretakerNumber: string,
      rent: number,
      deposit: number,
      hostelType: string,
      images: string | any[]
    ) {
      if (!images || images.length < 3) {
        alert('Please select 3 images.')
        return
      }
      try {
        const hostelDocRef = doc(
          db,
          `Universities/${selectedUniversity}/locations/${selectedLocation}/hostels`,
          hostelName
        )
        const storage = getStorage()

        // Upload images to Firebase Storage
        this.imageUrls = [] // Reset image URLs before upload
        for (const file of images) {
          const imageRef = storageRef(storage, `caretakers/${caretakerId}/${file.name}`)
          await uploadBytes(imageRef, file)
          const downloadURL = await getDownloadURL(imageRef)
          this.imageUrls.push(downloadURL)
        }

        await setDoc(hostelDocRef, {
          name: hostelName, // Name of the hostel, same as document ID
          caretakerId: caretakerId, // The ID of the caretaker adding the hostel
          universityId: selectedUniversity, // The university ID
          locationId: selectedLocation, // The location ID
          phoneNumber: caretakerNumber, // Caretaker's phone number
          price: rent, // Rent amount
          deposit: deposit, // Deposit amount
          houseType: hostelType, // Type of hostel (e.g., single, double, etc.)
          images: this.imageUrls // Store image URLs
        })

        console.log('Hostel added successfully with name as document ID:', hostelName)
      } catch (error) {
        console.error('Error adding hostel: ', error) // Handle any errors
      }
    },

    async fetchCaretakerHostels(caretakerId: string) {
      console.log('Fetching hostels for caretaker:', caretakerId) // Debugging log
      this.loading = true
      this.error = null

      try {
        // Firestore collection group query to find hostels across all universities and locations
        const q = query(
          collectionGroup(db, 'hostels'), // Search across all "hostels" subcollections
          where('caretakerId', '==', caretakerId) // Match caretaker ID
        )

        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          console.log('No hostels found for this caretaker')
        } else {
          console.log(
            'Hostels found:',
            querySnapshot.docs.map((doc) => doc.data())
          )
        }

        // Map the hostels and store them in the state
        this.hostels = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Hostel document ID
          ...doc.data() // Hostel data
        }))
      } catch (error) {
        console.error('Error fetching hostels:', error)
        this.error = 'Failed to fetch hostels' // Set an error message
      } finally {
        this.loading = false
      }
    }
  }
})
