import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import env from '~/env_variable';
import layout from './slidebar';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  layout,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/views/not-found/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(env.BASE_ROUTE_URL),
  routes,
})

export default router
