import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/workspace',
    children: [
      {
        path: '/workspace',
        name: 'Workspace',
        component: () => import('../views/Workspace.vue')
      },
      {
        path: '/sell',
        name: 'Sell',
        component: () => import('../views/Sell.vue')
      },
      {
        path: '/selection',
        name: 'Selection',
        component: () => import('../views/Selection.vue')
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: '/inventory',
        name: 'Inventory',
        component: () => import('../views/Inventory.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

