<template>
  <div class="app-wrapper" :class="[$store.state.slider.putAway && 'put-away']">
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
import RouterCache from '@/components/RouterCache/index.vue';
import Slidebar from './components/Slidebar/index.vue';
import Navbar from './components/Navbar/index.vue';
import Logo from './components/Logo/index.vue';
import Tabs from './components/Tabs/index.vue';

import watchSlider from './ts/watch-slider';
import watchLogin from './ts/watch-login';
import disposeRouter from './ts/dispose-router';

export default {
  components: {
    Slidebar,
    Navbar,
    Logo,
    RouterCache,
    Tabs
  },
  setup() {
    return {
      ...disposeRouter(),
      ...watchSlider(),
      ...watchLogin()
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
  &.put-away{
    aside{
      width: 60px;
    }
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