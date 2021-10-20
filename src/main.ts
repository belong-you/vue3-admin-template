import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './styles/index.scss';
import env from '~/env_variable';
import { requset2 } from '@/api/request';

declare const window: any;
const { ['log'] : c } = console;
window.c = c;

const app = createApp(App).use(router).use(store);
app.config.globalProperties.$env = env;

app.mount('#app');



const role = store.state.user.role;

routerGuard(role);

// requset2().then((res: any) => {
  
//   if (res.code == 200) {
//     const config = res.data;
    
//     router.getRoutes().forEach((val: any) => {
//       const meta = config[val.name];

//       // 重新设置权限
//       if (meta) {
//         val.meta = Object.assign(val.meta, meta);
//       }
      
//       if (meta?.disable) {
//         meta.roles = [Symbol('该页面已被禁用')];  // 设置一个后端不可能设置的角色
//       }

//       if (meta?.roles && !meta.roles.includes(role)) {
//         // 需要隐藏的菜单
//         store.commit('slider/push_slider', val.name);
//         // 删除没有权限的tabs
//         store.commit('tabs/remove_page', { pageName: val.name, pageTitle: val.meta.title });
//       } else {
//         store.commit('slider/push_slider', '');  // 在上面条件不成立的条件下保证数据刷新，侧边栏才会发生变化
//       }

//     });

//   }
  
//   routerGuard(role);

// })

function routerGuard(role: string) {
  
  router.beforeEach((to, from, next) => {
    
    to.matched.forEach((val: any) => {
      if (val.path === '/') return;
      store.commit('slider/push_openSlider', val.name);  // 要打开的侧边栏
    })

    const { roles, noCache, title }: any = to.meta;
  
    // 根据角色设置缓存 tabs
    if (!noCache && to.name && title) {
      store.commit('tabs/add_page', { pageName: to.name, pageTitle: title });
    }
    
    if (!roles) {
      next();  // 没有设置 roles，默认具有所有权限
    } else {
      roles.includes(role) && next();
    }

  })

}