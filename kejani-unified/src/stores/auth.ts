// src/stores/auth.ts
import { defineStore } from 'pinia';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseAuthUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'; // Import updateDoc
import { db } from '../firebase/config';
import router from '../router';
import { useCaretakerStore } from './caretakerStore';

interface User {
  uid: string;
  name: string | null;
  email: string | null;
  role?: string;
  phoneNumber?: string | null;
  accessPin?: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: true,
    error: null as string | null,
  }),

  actions: {
    async fetchUser(): Promise<void> {
      this.loading = true;
      this.error = null;
      const auth = getAuth();

      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            this.user = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous',
              email: firebaseUser.email,
            };

            try {
              const userDocRef = doc(db, 'users', firebaseUser.uid);
              const userSnap = await getDoc(userDocRef);

              let userRole = 'student'; // Default
              let userPhoneNumber: string | null = firebaseUser.phoneNumber || null;
              let userAccessPin: string | null = null;

              if (!userSnap.exists()) {
                // If user document doesn't exist (should not happen often with this flow,
                // as loginWithGoogle or signupWithEmailPassword would have created it)
                // Default to student and proceed to console or ask for info again.
                // For this requirement, we assume initial signup created a full profile.
                console.warn('User document not found during fetchUser for:', firebaseUser.uid);
                await setDoc(userDocRef, {
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                    role: userRole,
                    createdAt: serverTimestamp(),
                    phoneNumber: null,
                    accessPin: null,
                });
                console.log('Created default user profile for fetched user.');
              } else {
                const data = userSnap.data();
                userRole = data.role || 'student';
                userPhoneNumber = data.phoneNumber || null;
                userAccessPin = data.accessPin || null;
                console.log('User document loaded from Firestore. Role:', userRole);
              }

              if (this.user) {
                this.user.role = userRole;
                this.user.phoneNumber = userPhoneNumber;
                this.user.accessPin = userAccessPin;
              }

              if (userRole === 'caretaker') {
                if (firebaseUser.uid && firebaseUser.email && this.user?.name) {
                  const caretakerStore = useCaretakerStore();
                  await caretakerStore.setupCaretakerProfile(
                    firebaseUser.uid,
                    firebaseUser.email,
                    this.user.name,
                    this.user.phoneNumber
                  );
                } else {
                  console.warn('Missing essential data for caretaker profile setup during fetchUser.');
                  this.error = 'Caretaker data incomplete. Please complete your profile.'; // If data is truly missing after this flow, it's an error.
                }
              }

              // Direct to relevant dashboard based on role
              if (this.user?.role === 'caretaker') {
                  router.push('/caretaker');
              } else if (this.user?.role === 'admin') {
                  router.push('/admin');
              } else {
                  router.push('/console');
              }

            } catch (firestoreError: any) {
              console.error('Error fetching/creating user document in Firestore:', firestoreError);
              this.error = 'Failed to load user profile: ' + firestoreError.message;
              this.user = null;
              router.push('/login'); // Redirect to login on critical error
            }

          } else {
            this.user = null;
            console.log('No user logged in. User state cleared.');
            if (router.currentRoute.value.path !== '/login' && router.currentRoute.value.path !== '/signup') {
               router.push('/login');
            }
          }
          this.loading = false;
          unsubscribe();
          resolve();
        });
      });
    },

    async signupWithEmailPassword(
      email: string,
      password: string,
      role: string,
      displayName: string | null = null,
      phoneNumber: string | null = null,
      accessPin: string | null = null
    ) {
      this.loading = true;
      this.error = null;
      const auth = getAuth();

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Update Firebase Auth profile with displayName if provided
        if (displayName && firebaseUser) {
          await updateProfile(firebaseUser, { displayName: displayName });
        }

        // Create user document in Firestore with ALL provided details
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(userDocRef, {
          email: firebaseUser.email,
          name: displayName,
          role: role,
          createdAt: serverTimestamp(),
          phoneNumber: phoneNumber,
          accessPin: accessPin,
        });

        // Update local Pinia state
        this.user = {
          uid: firebaseUser.uid,
          name: displayName || firebaseUser.email || 'Anonymous',
          email: firebaseUser.email,
          role: role,
          phoneNumber: phoneNumber,
          accessPin: accessPin,
        };

        // Redirect based on the chosen role
        if (role === 'caretaker') {
          const caretakerStore = useCaretakerStore();
          await caretakerStore.setupCaretakerProfile(
            firebaseUser.uid,
            firebaseUser.email || '',
            displayName || '',
            phoneNumber || ''
          );
          router.push('/caretaker');
        } else if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/console');
        }

        console.log('User signed up with email/pass and profile created:', firebaseUser.uid, 'Role:', role);

      } catch (error: any) {
        this.error = error.message;
        console.error('Signup error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async loginWithGoogle(
        role: string, // Now compulsory from form
        displayName: string | null = null, // Now compulsory for caretaker
        phoneNumber: string | null = null, // Now compulsory for caretaker
        accessPin: string | null = null // Now compulsory for admin/caretaker
    ) {
      this.loading = true;
      this.error = null;
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      try {
        const result = await signInWithPopup(auth, provider);
        const firebaseUser = result.user;

        // Immediately update Firebase Auth profile with displayName from form if available
        // This is important because Google might not provide it or user might want to override.
        if (displayName && firebaseUser) {
            await updateProfile(firebaseUser, { displayName: displayName });
        }

        this.user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || displayName || firebaseUser.email?.split('@')[0] || 'Anonymous',
          email: firebaseUser.email
        };

        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          // NEW USER via Google: Create their profile using the data PROVIDED BY THE FORM
          await setDoc(userDocRef, {
            email: firebaseUser.email,
            name: displayName || firebaseUser.displayName || null, // Prioritize form's display name
            role: role, // Use the role selected on the form
            createdAt: serverTimestamp(),
            phoneNumber: phoneNumber, // Use the phone number from the form
            accessPin: accessPin, // Use the access PIN from the form
          });
          console.log('New user document created in Firestore for Google login with all form data.');
        } else {
          // EXISTING USER logging in with Google: Update their existing profile with new form data
          // This assumes the user is using this signup form to potentially update their role/details
          await updateDoc(userDocRef, {
            email: firebaseUser.email, // Keep email, but update other fields
            name: displayName || firebaseUser.displayName || null, // Prioritize form's display name
            role: role, // Update role based on form selection
            phoneNumber: phoneNumber, // Update phone number based on form
            accessPin: accessPin, // Update access PIN based on form
            // createdAt is not updated
          });
          console.log('Existing user profile updated in Firestore after Google login.');
        }

        // Update local Pinia state to reflect the final state from Firestore/form
        if (this.user) {
          this.user.role = role;
          this.user.phoneNumber = phoneNumber;
          this.user.accessPin = accessPin;
          this.user.name = displayName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous';
        }

        // Redirect based on the chosen role
        if (role === 'caretaker') {
          const caretakerStore = useCaretakerStore();
          // Ensure caretaker profile is set up with the provided details
          await caretakerStore.setupCaretakerProfile(
            firebaseUser.uid,
            firebaseUser.email || '',
            this.user.name, // Use the name from the updated user object
            phoneNumber || ''
          );
          router.push('/caretaker');
        } else if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/console');
        }

        console.log('Logged in with Google, UID:', firebaseUser.uid, 'Final Role:', role);
      } catch (error: any) {
        this.error = error.message;
        console.error('Google login/signup error:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logOut() {
      this.loading = true;
      try {
        await signOut(getAuth());
        this.user = null;
        const caretakerStore = useCaretakerStore();
        caretakerStore.$reset();
        console.log('User logged out. All relevant stores reset.');
        router.push('/login');
      } catch (error: any) {
        console.error('Logout error:', error);
        this.error = 'Failed to log out: ' + error.message;
      } finally {
        this.loading = false;
      }
    },

    isLoggedIn(): boolean {
      return !!this.user;
    }
  },
});