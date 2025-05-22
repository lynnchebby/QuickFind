import { createRouter, createWebHistory } from 'vue-router'

import { type IStaticMethods } from 'preline/preline'
import { useAuthStore } from '@/stores/auth'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/loginView.vue')
    },
    {
      path: '/console',
      name: 'console',
      component: () => import('../views/homeView.vue'),
      meta: { requiresAuth: true } // Add meta field for authentication
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Ensure authStore user is loaded before checking
  authStore.fetchUser()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is not logged in
    if (!authStore.isLoggedIn()) {
      // Redirect to login page
      next({ name: 'login' })
    } else {
      // Proceed to the requested route
      next()
    }
  } else {
    // Proceed if the route doesn't require authentication
    next()
  }
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit()
    }, 100)
  }
})

export default router
