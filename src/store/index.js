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
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
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
            image: data.user.image,
            isAdmin: data.user.isAdmin
          })
          return true
        } catch(error) {
          console.log('error', error)
          console.error('無法獲取使用者資訊')
          return false
        }
      }
  },
  modules: {
  }
})
