<template>
  <ul class="clearfix tabs">
    <li v-for="item in noCaches" :key="item.name">
      <router-link :to="{name: item.name}">{{ item.title }}</router-link>
    </li>
    <li v-for="(item, index) in pageNames" :key="item" @contextmenu="rightMenu($event, item, pageTitles[index])">
      <router-link :to="{name: item}">{{ pageTitles[index] }}</router-link>
      <span class="close" @click="closeTab(item, pageTitles[index])"></span>
    </li>
  </ul>
  
  <div v-show="isMenu" class="mask" @click.self="isMenu = false">
    <ul class="menu" :style="{top: menuTop + 'px', left: menuLeft + 'px'}">
      <li @click="closeOwn">关闭</li>
      <li @click="closeAll">关闭全部</li>
      <li @click="closeOther">关闭其他</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import store from '@/store';
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const router = useRouter();
    const { pageNames, pageTitles, noCaches } = useStore().state.tabs;


    const menuTop = ref(0);  // 菜单坐标
    const menuLeft = ref(0);
    const isMenu = ref(false);  // 是否显示菜单

    const name = ref('');
    const title = ref('');
    
    // 关闭标签
    const closeTab = (pageName: string, pageTitle: string) => {
      store.commit('tabs/remove_page', { pageName, pageTitle });
      const len = pageNames.length;
      let lastName = '';

      if (len === 0) lastName = noCaches[noCaches.length - 1].name;
      else lastName = pageNames[len - 1];

      router.replace({ name: lastName });
    }

    // 关闭自个儿
    const closeOwn = () => {
      closeTab(name.value, title.value);
      isMenu.value = false;
    }

    // 关闭全部
    const closeAll = () => {
      store.commit('tabs/clear_tabs');
      isMenu.value = false;
      router.replace({ name: 'Home' });
      store.commit('slider/reset_openSlider');
    }

    // 关闭其他
    const closeOther = () => {
      store.commit('tabs/clear_tabs');
      store.commit('tabs/add_page', { pageName: name.value, pageTitle: title.value })
      isMenu.value = false;
      router.replace({ name: name.value });
    }
    
    // 右键菜单
    const rightMenu = (e: MouseEvent, pageName: string, pageTitle: string) => {
      e.preventDefault();
      menuTop.value = e.clientY;
      menuLeft.value = e.clientX;
      isMenu.value = true;
      name.value = pageName;
      title.value = pageTitle;
    }

    return {
      pageNames,
      pageTitles,
      noCaches,
      closeTab,
      closeOwn,
      closeAll,
      closeOther,
      rightMenu,
      menuTop,
      menuLeft,
      isMenu
    }
  }
}

</script>

<style lang="scss" scoped>
.tabs{
  height: 40px;
  line-height: 40px;
  li{
    float: left;
    padding: 0 12px;
    position: relative;
  }
  .router-link-exact-active{
    & + .close{
      display: block;
    }
  }
  .close{
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    cursor: pointer;
    &::before, &::after{
      content: '';
      position: absolute;
      top: 4px;
      width: 100%;
      height: 2px;
      background: #666;
    }
    &::after{
      transform: rotate(45deg);
    }
    &::before{
      transform: rotate(-45deg);
    }
  }
}

.mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.menu{
  position: fixed;
  padding: 4px 10px;
  background: white;
  box-shadow: 0 5px 5px rgba(0,0,0,.4);
  border-radius: 5px;
  font-size: 14px;
  li{
    line-height: 1.6;
    cursor: pointer;
  }
}
</style>