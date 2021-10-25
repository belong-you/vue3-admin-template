import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default () => {
  const $router = useRouter();
  const $store = useStore();
  
  const newRoutes = ref();
  const role = $store.state.user.role;
  const { routes } = $router.options

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === 'Layout') {
      newRoutes.value = routes[i].children;
      continue;
    }
  }

  // 递归处理侧边栏要显示的路由
  function dispose(routes: any) {
    for (let i = 0; i < routes.length; i++) {
      const meta = routes[i].meta;
      if (meta === undefined || meta === null) continue;
      if (meta?.roles) {
        const flag = meta.roles.includes(role);
        if (!flag) routes[i].hidden = true;
      }
      if (routes[i].children) {
        dispose(routes[i].children);
      }
    }
    return routes;
  }

  return {
    routes: dispose(newRoutes),
  }
}