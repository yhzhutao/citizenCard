import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userNumber: "",
    activeValue:'first',
    solutionId:'',
    switchs:0
  },
  mutations: {
    userInfo(state, n) {
      state.userNumber = n
    },
    changeValue(state,n){
      state.activeValue = n
    },
    changeSolutionId(state,n){
      state.solutionId = n
    },
    changeSwitch(state,n){
      state.switchs = n
    }
  },
  actions: {},
  getters: {},
  modules: {}
})

export default store
