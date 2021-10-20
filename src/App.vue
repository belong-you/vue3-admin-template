<template>
  <router-view />
</template>

<script lang="ts">
import Layout from '@/layout/index.vue';
import Login from '@/views/Login.vue';
import { getCurrentInstance, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  components: {
    Login,
    Layout
  },
  setup() {
    const current = getCurrentInstance();
    const global: any = current?.appContext.config.globalProperties;
    // c(global.$env)

    return {
    }
  }
}
</script>
