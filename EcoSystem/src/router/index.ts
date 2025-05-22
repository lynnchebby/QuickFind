import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { type IStaticMethods } from 'preline/preline'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/productsView.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/loginView.vue')
    },

    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/signupView.vue')
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('../views/teamView.vue')
    },
    {
      path: '/console',
      name: 'console',
      component: () => import('../views/console/consoleView.vue')
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore()
      //   if (!authStore.isAuthenticated) {
      //     next('/login') // Redirect if not authenticated
      //   } else {
      //     next() // Allow access if authenticated
      //   }
      // }
    },
    {
      path: '/kejani',
      name: 'kejani',
      component: () => import('../views/console/kejani/kejani2View.vue')
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore()
      //   if (!authStore.isAuthenticated) {
      //     next('/login') // Redirect if not authenticated
      //   } else {
      //     next() // Allow access if authenticated
      //   }
      // }
    }
  ]
})
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit()
    }, 100)
  }
})

export default router
