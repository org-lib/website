import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ShieldAgent from '@/components/ShieldAgent.vue'
import NotFound from '@/components/common/NotFound.vue'
import About from '@/components/common/About.vue'
import Login from '@/components/common/login.vue'
import Regist from '@/components/common/regist.vue'
import Settings from '@/components/common/settings.vue'
import HomePay from '@/views/HomePay.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/shieldAgent'
  },
  {
    path: '/shieldAgent',
    name: 'shieldAgent',
    component: ShieldAgent
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Settings
  },
  {
    path: '/upgrade',
    name: 'PayHome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomePay
  },
  {
    path: '/:all(.*)',
    name: 'NotFound',
    // component: () => import(/* webpackChunkName: "not_found" */ '../views/NotFound.vue')
    component: NotFound
  },
  {
    path: '/notfound',
    name: 'NotFound',
    // component: () => import(/* webpackChunkName: "not_found" */ '../views/NotFound.vue')
    component: NotFound
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  routes
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     const token = localStorage.getItem('Authorization')
//     if (token === null || token === '') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })
export default router
