import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CampsView from '@/views/CampsView.vue'
import CampView from '@/views/CampView.vue'
import NewCampView from '@/views/NewCampView.vue'
import LoginView from '@/views/LoginView.vue'

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
      path: '/camp/:campName',
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  // to.meta.transition = toDepth < fromDepth ? 'slide-left' : 'slide-right'
})

export default router
