import Layout from '@/layout/index.vue';
import { getCookie } from '@/utils/cookie';
import Home from '@/views/home/index.vue';

export default {
  path: '/',
  name: 'Layout',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: Home,
      meta: { title: '首页', icon: '&#xe64f;', affix: true },
    },
    {
      path: 'server',
      name: 'Server',
      component: () => import('../views/server/index.vue'),
      meta: { title: '服务器', icon: '&#xe60b;', affix: true },
      children: [
        {
          path: 'cpu',
          name: 'ServerCpu',
          meta: { title: 'cpu' },
          component: () => import('../views/server/Cpu.vue'),
        },
      ]
    },
    {
      path: 'about',
      name: 'About',
      component: () => import('../views/about/index.vue'),
      meta: { title: '关于', roles: ['admin', 'visitor'] },
    },
    {
      path: 'role-manage',
      name: 'RoleManage',
      component: () => import('../views/role-manage/index.vue'),
      meta: { title: '菜单分配', icon: '&#xe623;', roles: ['admin'] },
    },
    {
      path: 'users',
      name: 'User',
      component: () => import('../views/user/User.vue'),
      meta: { title: '一级导航', icon: '&#xe638;', roles: ['admin'] },
      children: [
        {
          path: '',
          name: 'UserHome',
          meta: { title: '二级导航1' },
          component: () => import('../views/user/UserHome.vue'),
        },
        {
          path: 'posts',
          name: 'UserPosts',
          meta: { title: '二级导航2' },
          redirect: '/users/posts/test',
          component: () => import('../views/user/UserPoste.vue'),
          children: [
            {
              path: 'test',
              name: 'UserTest',
              meta: { title: '三级导航1' },
              component: () => import('../views/user/test.vue'),
            },
            {
              path: 'test2',
              name: 'UserTest2',
              meta: { title: '三级导航2' },
              component: () => import('../views/user/test2.vue'),
            }
          ]
        },
      ]
    },
  ]
}
