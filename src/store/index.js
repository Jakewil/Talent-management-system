import { createStore } from 'vuex'

export default createStore({
  state: {
    level:''
  },
  mutations: {
    getLevel(state,val){
      state.level=val
    }
  },
  actions: {
    setLevel(context, value){
      // 修改level的值
      context.commit('getLevel',value)
    },

  },
  getters: {
    // 获取到最终的数据结果
    getLevel(state){
      return state.level
    }
  },
  modules: {
  }
})
