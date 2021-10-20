
interface State {
  hiddenSlider: string[]
  openSlider: string[]
}

const state: State = {
  hiddenSlider: [],  // 要隐藏的菜单组件 name
  openSlider: [],  // 要展开的菜单
}

const mutations = {

  push_slider(state: State, value: string) {
    if (!state.hiddenSlider.includes(value)) {
      state.hiddenSlider.push(value);
    }
  },

  // 重置
  reset_slider(state: State, value: string[]) {
    state.hiddenSlider = value;
  },

  push_openSlider(state: State, value: string) {
    if (!state.openSlider.includes(value)) {
      state.openSlider.push(value);
    }
  },
  remove_openSlider(state: State, value: string) {
    const index = state.openSlider.indexOf(value);
    if (index < 0) return;
    state.openSlider.splice(index, 1);
  },
  reset_openSlider(state: State) {
    state.openSlider.length = 0
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
