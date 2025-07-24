import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import CaretakerDashboard from '@/views/caretaker/CaretakerDashboard.vue'
import TenantViewPage from '@/views/tenant/tenantviewpage.vue' 

const routes = [
  { path: '/', name: 'Login', component: SignIn },
  { path: '/login', name: 'login-page', component: SignIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
  { path: '/admin', name: 'Admin', component: AdminDashboard },
  { path: '/caretaker', name: 'Caretaker', component: CaretakerDashboard },
  { path: '/tenant', name: 'TenantViewing', component: TenantViewPage }, // New route for your tenant-viewing-page
  // { path: '/console', name: 'Console', component: SignIn }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Optional: If you have navigation guards (router.beforeEach) in your setup,
// ensure they correctly use the defined route names (e.g., 'Login' or 'login-page')
// when redirecting. If you're using 'useAuthStore' in your guards, make sure to import it.

export default router
