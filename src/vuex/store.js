import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const state = {
  useName: 'liubai',
  userInfo: null,
  budgetId: null,
  filterProjectName: ''
}

const actions = {
  updateBudgetId ({commit, state}, ContractId) {
    commit('setBudgetId', ContractId)
  },
  updateUserInfo ({commit, state}, UserInfo) {
    commit('setUserInfo', UserInfo)
  }
}

const mutations = {
  setBudgetId (state, ContractId) {
    state.budgetId = ContractId
  },
  setUserInfo (state, UserInfo) {
    state.userInfo = UserInfo
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
