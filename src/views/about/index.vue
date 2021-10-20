<template>
  <div>
    <input type="text">
    {{ num }}
    <button @click="fn">num ++</button>
  </div>
</template>

<script lang='ts'>
import { ref } from 'vue';
export default {
  name: 'About',
  setup() {
    const num = ref(0);
    const fn = () => num.value ++;
    
    return {
      num,
      fn
    }
  }
}
</script>
