<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-neutral-900 px-4">
    <div class="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white">Sign up</h1>
        <p class="text-sm text-neutral-400 mt-2">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Sign in here</router-link>
        </p>
      </div>

      <div>
        <label for="role" class="block text-sm text-white mb-1">Select Role</label>
        <select
          v-model="role"
          id="role"
          class="form-input"
          required
        >
          <option value="" disabled>Select your role</option>
          <option value="admin">Admin</option>
          <option value="caretaker">Caretaker</option>
          <option value="tenant">Tenant</option>
        </select>
      </div>

      <div v-if="role === 'caretaker'" class="mt-4 space-y-4">
        <div>
          <label for="displayName" class="block text-sm text-white mb-1">Display Name</label>
          <input
            v-model="displayName"
            type="text"
            id="displayName"
            class="form-input"
            :required="role === 'caretaker'"
            placeholder="e.g., Jane Doe"
          />
        </div>
        <div>
          <label for="phoneNumber" class="block text-sm text-white mb-1">Phone Number</label>
          <input
            v-model="phoneNumber"
            type="tel"
            id="phoneNumber"
            class="form-input"
            :required="role === 'caretaker'"
            placeholder="e.g., +254712345678"
          />
        </div>
      </div>

      <div v-if="role === 'admin' || role === 'caretaker'" class="mt-4">
        <label for="accessPin" class="block text-sm text-white mb-1">Set Access PIN</label>
        <input
          v-model="accessPin"
          type="password"
          id="accessPin"
          class="form-input"
          placeholder="Min 3 characters"
          :required="role === 'admin' || role === 'caretaker'"
          minlength="3"
        />
      </div>

      <button
        @click="signUpWithGoogle"
        type="button"
        :disabled="authStore.loading || !role || (role === 'caretaker' && (!displayName || !phoneNumber)) || ((role === 'admin' || role === 'caretaker') && (!accessPin || accessPin.length < 3))"
        class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" class="w-5 h-5" />
        <span v-if="authStore.loading">Signing up...</span>
        <span v-else>Sign up with Google</span>
      </button>

      <div class="flex items-center my-6 text-sm text-neutral-400 before:flex-1 before:border-t before:border-neutral-700 before:mr-3 after:flex-1 after:border-t after:border-neutral-700 after:ml-3">
        or
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="email" class="block text-sm text-white mb-1">Email address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-input"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm text-white mb-1">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-input pr-10"
              required
            />
            <span class="absolute right-3 top-3 text-white cursor-pointer" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm text-white mb-1">Confirm Password</label>
          <div class="relative">
            <input
              :type="showConfirm ? 'text' : 'password'"
              v-model="confirmPassword"
              class="form-input pr-10"
              required
            />
            <span class="absolute right-3 top-3 text-white cursor-pointer" @click="showConfirm = !showConfirm">
              {{ showConfirm ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading || !role || (role === 'caretaker' && (!displayName || !phoneNumber)) || ((role === 'admin' || role === 'caretaker') && (!accessPin || accessPin.length < 3))"
          class="form-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.loading">Signing up...</span>
          <span v-else>Sign up</span>
        </button>
      </form>

      <p v-if="authStore.error" class="text-red-500 text-center mt-4">{{ authStore.error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth'; // Ensure this path is correct

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref('');
const displayName = ref('');
const phoneNumber = ref('');
const accessPin = ref('');

const showPassword = ref(false);
const showConfirm = ref(false);

// Watch for role changes to clear caretaker-specific fields
watch(role, (newRole) => {
  if (newRole !== 'caretaker') {
    displayName.value = '';
    phoneNumber.value = '';
  }
  if (newRole !== 'admin' && newRole !== 'caretaker') {
    accessPin.value = '';
  }
});

// Client-side validation function to avoid repetition
const validateCommonFields = () => {
  if (!role.value) {
    authStore.error = 'Please select a role.';
    return false;
  }
  if (role.value === 'caretaker') {
    if (!displayName.value) {
      authStore.error = 'Display Name is required for caretakers.';
      return false;
    }
    if (!phoneNumber.value) {
      authStore.error = 'Phone Number is required for caretakers.';
      return false;
    }
  }
  if ((role.value === 'admin' || role.value === 'caretaker')) {
    if (!accessPin.value || accessPin.value.length < 3) {
      authStore.error = 'PIN must be at least 3 characters.';
      return false;
    }
  }
  return true;
};


const handleRegister = async () => {
  authStore.error = null;

  if (!validateCommonFields()) return; // Common validation first

  if (password.value !== confirmPassword.value) {
    authStore.error = 'Passwords do not match.';
    return;
  }

  try {
    await authStore.signupWithEmailPassword(
      email.value,
      password.value,
      role.value,
      role.value === 'caretaker' ? displayName.value : null,
      role.value === 'caretaker' ? phoneNumber.value : null,
      (role.value === 'admin' || role.value === 'caretaker') ? accessPin.value : null
    );
  } catch (error) {
    console.error('Registration failed from component:', error);
  }
};

const signUpWithGoogle = async () => {
  authStore.error = null;

  if (!validateCommonFields()) return; // Common validation for Google signup too

  try {
    // Pass the collected fields to the Google sign-up action
    await authStore.loginWithGoogle(
      role.value,
      role.value === 'caretaker' ? displayName.value : null,
      role.value === 'caretaker' ? phoneNumber.value : null,
      (role.value === 'admin' || role.value === 'caretaker') ? accessPin.value : null
    );
  } catch (error) {
    console.error('Google sign-up failed from component:', error);
  }
};
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.form-button {
  @apply w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition;
}
</style>