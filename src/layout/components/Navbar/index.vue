<template>
  <div class="nav-bar">
    <i class="iconfont" @click="putAwaySlider">&#xe60a;</i>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import store from '@/store';
export default {
  setup() {
    const $store = useStore();

    function putAwaySlider() {
      const putAway = $store.state.slider.putAway
      store.commit('slider/set_putAway', !putAway);
    }
    return {
      putAwaySlider
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar{
  height: 50px;
  background: #eee;
  line-height: 50px;
  i{
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>