// src/stores/auth.ts
import { defineStore } from 'pinia';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'; // getFirestore added for explicit db access
import { db } from '../firebase/config'; // Ensure path is correct for your Firebase config
import router from '../router';
import { useCaretakerStore } from './caretakerStore'; // Import the caretaker store

// Define a simple User interface for type safety
interface User {
  uid: string;
  name: string | null;
  email: string | null;
  role?: string; // Add role here
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null, // Type the user state
    loading: true,
    error: null as string | null,
  }),

  actions: {
    /**
     * Initializes authentication state, fetches user details, and sets up caretaker profile if applicable.
     * This should be called once when the app starts.
     */
    fetchUser() {
      this.loading = true;
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => { // Made async to await Firestore operations
        if (user) {
          // Set basic user info from Firebase Auth
          this.user = {
            uid: user.uid,
            name: user.displayName || 'Anonymous',
            email: user.email,
          };

          // Fetch user role from Firestore 'users' collection
          try {
            const userDocRef = doc(db, 'users', user.uid); // Use imported db
            const userSnap = await getDoc(userDocRef);

            let userRole = 'student'; // Default role

            if (!userSnap.exists()) {
              // If user document doesn't exist, create it with default role
              await setDoc(userDocRef, {
                email: user.email,
                role: userRole,
                createdAt: new Date(),
              });
              console.log('New user document created in Firestore with default role.');
            } else {
              // Use existing role
              userRole = userSnap.data().role || 'student';
              console.log('User document loaded from Firestore. Role:', userRole);
            }

            // Update local user state with the role
            this.user.role = userRole;

            // --- IMPORTANT: Call caretakerStore action if user is a caretaker ---
            if (userRole === 'caretaker' && user.email && user.displayName) {
              const caretakerStore = useCaretakerStore();
              await caretakerStore.setupCaretakerProfile(user.uid, user.email, user.displayName);
            }

          } catch (firestoreError: any) {
            console.error('Error fetching/creating user document in Firestore:', firestoreError);
            this.error = 'Failed to load user profile: ' + firestoreError.message;
          }

        } else {
          this.user = null; // No user logged in
        }
        this.loading = false;
      });
    },

    /**
     * Handles Google Sign-In and redirects based on user role.
     */
    async loginWithGoogle() {
      this.loading = true;
      this.error = null;
      const provider = new GoogleAuthProvider();

      try {
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Set local state immediately for responsiveness
        this.user = {
          uid: user.uid,
          name: user.displayName || 'Anonymous',
          email: user.email
        };

        // Check/create user document in Firestore and get role
        const userDocRef = doc(db, 'users', user.uid); // Use imported db
        const userSnap = await getDoc(userDocRef);

        let role = 'student'; // default

        if (!userSnap.exists()) {
          // Create document if it doesn't exist (e.g., first-time login)
          await setDoc(userDocRef, {
            email: user.email,
            role: role,
            createdAt: new Date(),
          });
          console.log('New user document created in Firestore for new login.');
        } else {
          // Use saved role
          const data = userSnap.data();
          role = data.role || 'student';
        }

        // Update local user state with the determined role
        if (this.user) { // Ensure user is not null
            this.user.role = role;
        }


        // --- IMPORTANT: Call caretakerStore action if user is a caretaker ---
        if (role === 'caretaker' && user.email && user.displayName) {
          const caretakerStore = useCaretakerStore();
          await caretakerStore.setupCaretakerProfile(user.uid, user.email, user.displayName);
          router.push('/caretaker'); // Redirect caretaker to their specific dashboard
        } else if (role === 'admin') {
          router.push('/admin'); // Redirect admin
        } else {
          router.push('/console'); // Default for students or other roles
        }

        console.log('Logged in with UID:', user.uid, 'Role:', role);
      } catch (error: any) {
        this.error = error.message;
        console.error('Login error:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Logs out the current user.
     */
    async logOut() {
      this.loading = true;
      try {
        await signOut(getAuth());
        this.user = null; // Clear user state
        // You might want to clear other store states here if they depend on user
        router.push('/'); // Redirect to home page
      } catch (error: any) {
        console.error('Logout error:', error);
        this.error = 'Failed to log out: ' + error.message;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Checks if a user is currently logged in.
     * @returns {boolean} True if a user is logged in, false otherwise.
     */
    isLoggedIn(): boolean {
      return !!this.user;
    }
  },
  // Ensure Pinia-persisted state doesn't conflict if you're manually managing in fetchUser
  // persist: true // Consider if you truly need this given fetchUser's onAuthStateChanged
});