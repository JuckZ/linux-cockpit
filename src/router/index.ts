/*
 * @Author: Juck
 * @Date: 2020-03-14 09:32:42
 * @LastEditTime: 2020-04-11 14:46:26
 * @LastEditors: Juck
 * @Description: 
 * @FilePath: \linux-cockpit\src\router\index.ts
 * @Juck is coding...
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/platform/apps/Login/Index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    beforeEnter: (to: any, from: any, next: any) => {
      // 将登录状态存到cookie或者session中或者localStorage
      // console.log(this)

      next()
    },
    children: [
      {
        path: '/shell',
        component: () => import('@/platform/apps/Shell/Index.vue'),
        meta: {
          keepAlive: true,
          requireAuth: true
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/platform/apps/Login/Index.vue'),
        meta: {
          keepAlive: true,
          requireAuth: false
        },
      },
      {
        path: '/fileManager',
        component: () => import('@/platform/apps/FileManager/Index.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/notfound',
        component: () => import('@/platform/apps/NotFound/Index.vue'),
        meta: {
          keepAlive: true
        },
      }
    ],
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  //   meta: {
  //     keepAlive: true,
  //   },
  // },

  // {
  //   path: '/*',
  //   name: 'notfound',
  //   component: () => import('@/platform/apps/NotFound/Index.vue'),
  //   meta: {
  //     keepAlive: true,
  //   },
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to: any, from: any, next: any) => {
  // TODO:怎样获取Login组件的isLogined状态，并以此验证登录
  // if(to.path === '/login' && )
  // 如果需要验证并且未登录，则提示该操作需要先登录，然后跳转到登录页面
  // localStorage存储登录状态
  if(to.meta.requireAuth == true && !sessionStorage.getItem('isLogined')) {
    alert('需要登录的页面')
    next('/login')
  }
  // 如果已经登录的状态去访问登录页面，则直接跳到桌面
  // if(to.path === '/login' && sessionStorage.getItem('isLogined')) {
  //   alert('已经登录')
  //   next('/')
  // }
  // 其他情况默认跳转即可
  next()
})

export default router
