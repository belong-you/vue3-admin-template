<template>
  <ul 
    class="slide-bar"
    :class="['layer' + String(count)]"
  >
    <li
      v-for="(item, index) in slideList"
      :key="index"
      :class="openSlider.includes(item.name) ? 'open' : ''"
      :style="{lineHeight: itemHeight + 'px'}"
    >
      <router-link :to="{name: item.name}" :style="{textIndent: count + 1 + 'em'}" @click.self="showSubSlider($event, item.name)">
        <i v-if="item.meta.icon" class="icon"></i>
        {{ item.meta.title }}
      </router-link>

      <!-- 组件递归（放在最后，用到了 nextElementSibling 属性） -->
      <Slidebar
        ref="subSlider"
        v-if="item.children && item.children.length > 0"
        :style="{
          height: openSlider.includes(item.name) ? item.children.length * itemHeight + 'px' : '0',
          transform: openSlider.includes(item.name) ? `rotateX(0)` : 'rotateX(90deg)'
        }"
        :list="item.children"
        :count="count + 1"
        :hiddenName="hiddenName"
        :itemHeight="itemHeight"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, getCurrentInstance, watch, ref, Events } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import store from '@/store';
import router from '@/router';
export default {
  name: 'Slidebar',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    count: {  // 组件递归的层数，从 1 开始
      type: Number,
      default: 0
    },
    hiddenName: {  // 要隐藏的菜单
      type: Array,
      default: [''] 
    },
    itemHeight: {  // 每项菜单的高度
      type: Number,
      default: 32
    },
  },
  setup() {
    // 处理路由
    const current: any = getCurrentInstance();
    const list = computed(() => current.ctx.list);
    const slideList = ref();

    initMenu();

    // 初始化菜单
    function initMenu() {
      slideList.value = [];
      list.value.filter((val: any, index: number) => {
        
        // 设置隐藏的组件不进行展示
        if (val.meta.hidden) return;

        // 直接显示子组件
        if (val.meta.alwaysShow) {
          slideList.value.splice(index, 0, ...val.children);
          val.meta.hidden = true;
        }

        // 重新整理下有用的属性
        slideList.value.push({
          path: val.redirect || val.path,
          meta: val.meta,
          name: val.name,
          component: val.component,
          children: val.children,
        })

      })
    }


    // 监听父组件传过来要隐藏的组件name值
    watch(
      () => current.ctx.hiddenName,
      (newValue, oldValue) => {
        hiddenMenu(newValue);
      }
    )

    // 需要隐藏哪些组件，把组件名给我
    function hiddenMenu(names: string[]) {
      list.value.filter((val: any, index: number) => {
        if (names.includes(val.name)) list.value[index].meta.hidden = true;
      })
      initMenu()
    }


    const $route = useRoute();
    const $store = useStore();

    const openSlider = $store.state.slider.openSlider;
    
    // 点击展开侧边栏
    function showSubSlider(e: any, name: string) {
      if (e.target.parentNode.className === 'open') {
        setTimeout(() => {
          store.commit('slider/remove_openSlider', name);
        }, 0)
      } else {
        store.commit('slider/push_openSlider', name);
      }
    }


    return {
      slideList,
      routePath: $route.path,
      openSlider,
      showSubSlider,
    }
  }
}
</script>

<style lang='scss' scoped>
.slide-bar{
  // padding-left: 16px;
  li{
    a{
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #ccc;
    }
    .slide-bar{
      height: 0;
      // overflow: hidden;
      transform: rotateX(90deg);
      transform-origin: top center;
      transition: height .3s linear, transform .3s linear;
    }
    &.open > .slide-bar{
      height: auto;
      transform: rotateX(0);
    }
  }
  .router-link-exact-active{
    color: white;
  }
  &.layer0 > li{
    > .router-link-active{
      background: #666;
    }
  }
}
</style>