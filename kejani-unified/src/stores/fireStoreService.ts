// services/firestoreService.js
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config.js' // ✅ CORRECT


// Fetch all universities
export const fetchUniversities = async () => {
  const universitiesCollection = collection(db, 'Universities')
  const universitiesSnapshot = await getDocs(universitiesCollection)
  return universitiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Fetch locations by university ID
export const fetchLocationsByUniversity = async (universityId: any) => {
  const locationsCollection = collection(db, `Universities/${universityId}/locations`)
  const locationsSnapshot = await getDocs(locationsCollection)
  return locationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Fetch hostels by location ID
export const fetchHostelsByLocation = async (universityId: any, locationId: undefined) => {
  const hostelsCollection = collection(
    db,
    `Universities/${universityId}/locations/${locationId}/hostels`
  )
  const hostelsSnapshot = await getDocs(hostelsCollection)
  if (hostelsSnapshot.empty) {
    console.log('No hostels found in this location.')
  }
  return hostelsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
