<template>
  <div>
    home
    <button @click="lognOut">退出登录</button>
  </div>
</template>

<script lang='ts'>
import store from '@/store';
import { OVERDUE } from '@/store/modules/user';

export default {
  setup() {
    function lognOut() {
      store.commit('user/set_token', { type: OVERDUE });
    }

    return {
      lognOut,
    }
  }
}
</script>

<style>

</style>