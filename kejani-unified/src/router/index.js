import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import CaretakerDashboard from '@/views/caretaker/CaretakerDashboard.vue'
import StudentDashboard from '@/views/student/Console/kejani/kejani2view.vue'

const routes = [
{ path: '/', name: 'Login', component: SignIn },
{ path: '/signup', name: 'SignUp', component: SignUp },
{path: '/reset-password',name: 'ResetPassword', component: ResetPassword },
  { path: '/admin', name: 'Admin', component: AdminDashboard },
  { path: '/caretaker', name: 'Caretaker', component: CaretakerDashboard },
  { path: '/student', name: 'Student', component: StudentDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
