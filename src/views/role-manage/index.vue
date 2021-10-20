<template>
  <ul>菜单权限分配
    <li v-for="item in roleData" :key="item.name">
      <span>页面名称：{{ item.title }}</span>
      <span>是否禁用：{{ item.disable ? '是' : '否'}}</span>
      <span>角色权限：{{ Boolean(item.roles) ? item.roles : 'all' }}</span>
      <span>是否在侧边栏展示：{{ item.hidden ? '是' : '否' }}</span>
      <p>{{ item }}</p>
    </li>
  </ul>
</template>

<script>
import { requset2 } from '@/api/request'
import { ref } from 'vue'
export default {
  setup() {
    const roleData = ref([]);
    requset2().then(res => {
      const obj = res.data;
      for (const prop in obj) {
        const value = Object.assign(obj[prop], { name: prop })
        roleData.value.push(value);
      }
    })

    return {
      roleData
    }
  }
}
</script>

<style lang="scss" scoped>
li{
  line-height: 2;
}
span{
  display: inline-block;
  width: 260px;
  margin-right: 20px;
}
p{
  color: #999;
}
</style>>
