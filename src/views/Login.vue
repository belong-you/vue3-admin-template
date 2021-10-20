<template>
  <div class="logo">
    <input v-model="name">
    <input v-model="pass">
    <button @click="logIn">登录</button>
  </div>
</template>

<script lang='ts'>
import store from '@/store';
import { VALID } from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('');
    const pass = ref('');

    const $router = useRouter();
    function logIn() {
      const token = '121345dsadasffjdiojfl;sad546546633';
      store.commit('user/set_token', { type: VALID, payload: token });
      $router.replace('/home');
    }

    return {
      name,
      pass,
      logIn,
    }
  }
}
</script>
<style lang="scss" scoped>
.logo{
  text-align: center;
}
</style>