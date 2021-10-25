import { useStore } from 'vuex';
import store from '@/store';

export default () => {
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
    openSlider,
    showSubSlider,
  }
}
