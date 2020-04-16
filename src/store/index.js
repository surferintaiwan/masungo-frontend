import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
      async fetchCurrentUser({commit}) {
        try {
          const response = await usersAPI.getCurrentUser()
          const {data, statusText} = response
          if (statusText !== 'OK') {
            throw new Error(statusText)
          }
          commit('setCurrentUser', {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            isAdmin: data.user.isAdmin
          })
          return true
        } catch(error) {
          console.log('error', error)
          console.error('無法獲取使用者資訊')

          // 驗證失敗就觸發登出，讓他把瀏覽器的token跟state裡的token都洗掉。
          commit('revokeAuthentication')
          return false
        }
      }
  },
  modules: {
  }
})
