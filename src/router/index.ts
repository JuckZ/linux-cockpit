import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/platform/apps/Login/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Desktop',
    component: () => import('@/platform/apps/Desktop/Index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/desktop',
    name: 'Desktop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '@/platform/apps/Desktop/Index.vue'
      ),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/*',
    name: 'notfound',
    component: () => import('@/platform/apps/NotFound/Index.vue'),
    meta: {
      keepAlive: true,
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
