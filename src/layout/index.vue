<template>
  <div class="app-wrapper">
    <aside>
      <Logo />
      <Slidebar :list="routes" :hiddenName="compName" />
    </aside>
    <section>
      <Navbar class="nav" />
      <Tabs />

      <!-- transition 动画要求切换 view 必须是单个标签 -->
      <transition name="slide-fade" mode="out-in">
        <RouterCache class="view" />
      </transition>

    </section>
  </div>
  
</template>

<script lang='ts'>
import Slidebar from './Slidebar/index.vue';
import Navbar from './Navbar/index.vue';
import Logo from './Logo/index.vue';
import RouterCache from '@/components/RouterCache/index.vue';
import Tabs from './Tabs/index.vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watch } from 'vue';

export default {
  components: {
    Slidebar,
    Navbar,
    Logo,
    RouterCache,
    Tabs
  },
  setup() {
    const $store = useStore();
    const role = $store.state.user.role;
    const $router = useRouter();
    const $route = useRoute();
    const newRoutes = ref();
    const { routes } = $router.options
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].name === 'Layout') {
        newRoutes.value = routes[i].children;
        continue;
      }
    }

    // 监听要隐藏的菜单，发生变化即重新渲染
    const compName = ref();
    watch(
      () => $store.state.slider.hiddenSlider,
      (newValue) => {
        compName.value = newValue;
      },
      { deep: true }
    );


    (async () => {
      const token = $store.state.user.token;
      if (!token) {
        $router.replace('/login');
      }
    })()
    // 监听状态，处理登录状况
    watch(
      () => $store.state.user.token,
      (value) => {
        if (!value) {
          const redirectHref = $route.path;
          $router.replace(`/login?redirect=${redirectHref}`);
        }
      }
    )

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
      compName,
    }
  }
}
</script>

<style lang='scss' scoped>
.app-wrapper{
  display: flex;
  aside, section{
    height: 100vh;
  }
  aside{
    width: 210px;
  }
  aside, .nav{
    background: #404040;
    color: white;
  }
  section{
    width: 100%;
  }
}

.view{
  width: calc(100% - 20px);
  padding: 10px;
  box-sizing: border-box;
}

.slide-fade-enter-active {
  transition: all .4s ease-out;
}

.slide-fade-leave-active {
  transition: all .4s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>