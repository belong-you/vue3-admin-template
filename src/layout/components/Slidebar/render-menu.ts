import { computed, getCurrentInstance, watch, ref } from 'vue';

export default () => {

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

  // 需要隐藏哪些组件，把组件名给我
  function hiddenMenu(names: string[]) {
    list.value.filter((val: any, index: number) => {
      if (names.includes(val.name)) list.value[index].meta.hidden = true;
    })
    initMenu()
  }

  // 监听父组件传过来要隐藏的组件name值
  watch(
    () => current.ctx.hiddenName,
    (newValue, oldValue) => {
      hiddenMenu(newValue);
    }
  )

  return {
    slideList,
  }
}
