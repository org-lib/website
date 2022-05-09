import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Pie from '@/components/1024pie.vue'
import NotFound from '@/components/common/NotFound.vue'
import About from '@/components/common/About.vue'
import HomePay from '@/views/HomePay.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/pie'
  // },
  {
    path: '/',
    name: 'pie',
    component: Pie
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
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  routes
})

export default router
