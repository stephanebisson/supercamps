import { getCurrentUser } from 'vuefire'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CampsView from '@/views/CampsView.vue'
import CampView from '@/views/CampView.vue'
import NewCampView from '@/views/NewCampView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginConfirmView from '@/views/LoginConfirmView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TestView from '@/views/TestView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/camps',
      name: 'camps',
      component: CampsView,
    },
    {
      path: '/camp/:campId',
      name: 'camp',
      props: true,
      component: CampView,
    },
    {
      path: '/newcamp',
      name: 'newcamp',
      component: NewCampView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/loginconfirm',
      name: 'loginconfirm',
      component: LoginConfirmView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { auth: true },
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.auth) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/login',
        query: {
          // we keep the current path in the query so we can
          // redirect to it after login with
          // `router.push(route.query.redirect || '/')`
          redirect: to.fullPath,
        },
      }
    }
  }
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  // to.meta.transition = toDepth < fromDepth ? 'slide-left' : 'slide-right'
})

export default router
