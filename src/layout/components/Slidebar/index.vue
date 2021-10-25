<template>
  <ul 
    class="slide-bar"
    :class="['layer' + String(count), $store.state.slider.putAway && count == 0 && 'put-away']"
  >
    <li
      v-for="(item, index) in slideList"
      :key="index"
      :class="openSlider.includes(item.name) ? 'open' : ''"
      :style="{lineHeight: itemHeight + 'px'}"
    >
      <router-link :to="{name: item.name}" :style="{textIndent: count + 1 + 'em'}" @click.self="showSubSlider($event, item.name)">
        <i v-if="item.meta.icon" class="icon iconfont" v-html="item.meta.icon"></i>
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
import renderMenu from './render-menu';
import menuOnClick from './menu-onclick';

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
      default: 40
    },
  },
  setup() {
    return {
      ...renderMenu(),
      ...menuOnClick(),
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
  .icon{
    display: inline-block;
    width: 24px;
    text-indent: 0;
    text-align: center;
  }
  &.layer0 > li{
    > .router-link-active{
      background: #666;
    }
  }
}
.slide-bar.put-away{
  > li{
    font-size: 0;
    position: relative;
    i{
      width: 100%;
    }
    &:hover{
      .layer1{
        display: block;
      }
    }
  }
  .slide-bar{
    width: 200px;
    height: auto !important;
    transform: rotateX(0) !important;
    z-index: 9999;
  }
  .layer1{
    li{
      font-size: 16px;
    }
    position: absolute;
    top: 0;
    left: 0;
    background: #404040;
    transform: translateX(58px) !important;
    display: none;
  }
}
</style>